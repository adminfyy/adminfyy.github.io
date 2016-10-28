
var cardMailDetailLayer = baseLayer.extend({

    ctor : function(parent,datas){
        this._super();
        this._basename = "cardMailDetailLayer";
        this._datas = datas;
    },

    init : function(){
        if (!this._super())
            return false;

        this._ui = this.load_ui("boxTextAttachment.json");
        if (this._ui == -1)
            return true;
        if (!this._ui)
            return false;
        this.addChild(this._ui);

        this.initUI();

        return true;
    },

    initUI : function(){
        var mail = this._datas;
        WidgetDig(this._ui,"set/btnUse/text").setString(tj.cfg.get("text_on_ui/close"));
        WidgetDig(this._ui,"box/title/text").setString(mail.Title);
        var box = WidgetDig(this._ui,"box");
        var boxBG = WidgetDig(this._ui,"box/BG");

        // 邮件内容
        var scrollView = WidgetDig(this._ui,"box/text");
        var contentText = WidgetDig(this._ui,"box/text/text");
        var content = mail.Content + "\n\n" + tj.gameClock.getYMDTime(new Date(mail.Send_time));
        var h = getTextHeightWithWidget(contentText,content);
        if(h <= scrollView.getContentSize().height){
            h = scrollView.getContentSize().height;
        }
        var size = contentText.getContentSize();
        var container = scrollView.getInnerContainer();
        container.setContentSize(container.getContentSize().width,h);
        contentText.setPositionY(h);
        contentText.setContentSize(size.width,h);
        scrollView.jumpToPercentVertical(0);
        contentText.setString(content);

        // 附件
        if(mail.attachInfo) {
            var attachStatus = tj.cfg.get("text_on_ui/mail/noGet");
            if (mail.attachHasGot) {
                attachStatus = tj.cfg.get("text_on_ui/mail/hasGot");
            }
            var attachInfo = tj.cfg.get("text_on_ui/mail/attachInfo").format(attachStatus);
            WidgetDig(this._ui, "box/attachment").setString(attachInfo);

            var attachList = WidgetDig(this._ui, "box/list");
            var attachTemplate = WidgetDig(this._ui, "box/list/template");
            attachList.removeAllChildren();
            if(mail.Attachments instanceof Array) {
                var attachments = mail.Attachments;
                for(var i in attachments){
                    var attach = attachments[i];
                    var itemUI = attachTemplate.clone();
                    attachList.pushBackCustomItem(itemUI);

                    var icon = tj.mainData.getItemIcon(attach.Item_id);
                    var ficon = tj.mainData.getItemFrameIcon(attach.Item_id);
                    if(attach.Item_type == 4){ //装备
                        tj.mainData.addEquipInfo(attach.Item_id, attach.Item_id);
                        var equip = tj.mainData.getEquipByid(attach.Item_id);
                        if(equip) {
                            icon = equip.Icon;
                            ficon = equip.FrameIcon;
                        }
                    }
                    WidgetDig(itemUI, "btnMain1/portraits/icon").loadTexture(icon, ccui.Widget.PLIST_TEXTURE);
                    if(ficon)
                        WidgetDig(itemUI, "btnMain1/portraits/level").loadTexture(ficon, ccui.Widget.PLIST_TEXTURE);

                    WidgetDig(itemUI, "btnMain1/portraits/textNum").setString("x"+Math.abs(attach.Item_num));
                    WidgetDig(itemUI, "btnMain1/portraits/textName").setString(tj.mainData.getItemName(attach.Item_id));
                    WidgetDig(itemUI, "btnMain1/portraits/lock").setVisible(false);
                    WidgetDig(itemUI, "btnMain1").setEnabled(false);
                }
            }


        }else{
            var dh = 185;
            var size = box.getContentSize();
            box.setContentSize(size.width,size.height-dh);
            box.setPositionY(box.getPositionY()-dh);
            boxBG.setContentSize(size.width,size.height-dh+50);
            boxBG.setPositionY(boxBG.getPositionY()+dh/2-20);
            WidgetDig(this._ui,"box/BGLine").setVisible(false);
            WidgetDig(this._ui,"box/list").setVisible(false);
            WidgetDig(this._ui, "box/attachment").setVisible(false);
        }


    },

    onEnter : function(){
        this._super();
    },

    process_ac: function (doc) {
        var msg_id = doc[0];
        var data = doc[1];
        switch (msg_id) {

            default :
                break;
        }
    },

    defaultTouchButton : function(btn, type){
        if (type == ccui.Widget.TOUCH_ENDED) {
            switch(btn.getName()){
                case "btnUse":
                    this.set_release();
                    break;
                default :
                    break;
            }
        }
    }

});

function createCardMailDetailLayer(parent,datas){
    var pRet = new cardMailDetailLayer(parent,datas);
    if (pRet && pRet.init()){
        pRet._tjParent = parent;
        parent.addChild(pRet);
        return pRet;
    }else if (pRet)
        delete pRet;
    return null;
};
