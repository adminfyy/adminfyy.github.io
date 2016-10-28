/**
 * Created by likx on 2016/3/21.
 */
var client_data_key_feedbackContacts = "feedbackContacts";

var cardMailBackLayer = baseLayer.extend({
    _ui:0,
    _uiTextField:null,
    _uiTextQQ:null,
    _uiTextTel:null,
    _uitexTTime:null,
    _cursor:null,

    ctor : function(fromLayer){
        this._super();
        this._basename = "mailback";
        this._fromLayer = fromLayer;
    },

    onEnter : function(){
        this._super();
        this._cursor = new tj.textCursor();
    },

    onExit: function() {
        this._super();
        if(this._cursor) {
            this._cursor.remove();
        }
    },

    init : function() {
        if (!this._super())
            return false;

        this._ui = this.load_ui("cardMail.json");
        if (!this._ui)
            return false;
        this.addChild(this._ui);

        this._uiBtnList = WidgetDig(this._ui, "main/list");
        this._uiBtnTemple = WidgetDig(this._ui, "main/list/btnOption");
        //var game_btn = this._uiBtnTemple.clone();
        //this._uiBtnList.pushBackCustomItem(game_btn);
        //game_btn.setName("btnGame");
        //WidgetDig(game_btn, "text").setString(tj.cfg.get("text_on_ui/btnGame"));

        var re_btn = this._uiBtnTemple.clone();
        this._uiBtnList.pushBackCustomItem(re_btn);
        re_btn.setName("btnRecharge");
        WidgetDig(re_btn, "text").setString(tj.cfg.get("text_on_ui/mail/btnRecharge"));

        var cancel_btn = this._uiBtnTemple.clone();
        this._uiBtnList.pushBackCustomItem(cancel_btn);
        cancel_btn.setName("btnCancel");
        WidgetDig(cancel_btn, "text").setString(tj.cfg.get("text_on_ui/close"));

        WidgetDig(this._ui, "main/task/explain/textName").setString(tj.cfg.get("text_on_ui/mail/feedback"));
        WidgetDig(this._ui, "main/list/btnOption/text").setString(tj.cfg.get("text_on_ui/mail/btnGame"));

        this._uiTextField = WidgetDig(this._ui, "main/task/explain/textField");
        this._uiTextField.setPlaceHolder(tj.cfg.get("text_on_ui/mail/please"));
        this._uiTextField.addEventListener(this.tfFieldEvent,this);

        this._uiTextQQ = WidgetDig(this._ui, "main/task/explain/textQQ");
        this._uiTextQQ.setPlaceHolder(tj.cfg.get("text_on_ui/mail/qq"));
        this._uiTextQQ.addEventListener(this.tfFieldEvent,this);

        this._uiTextTel = WidgetDig(this._ui, "main/task/explain/textTel");
        this._uiTextTel.setPlaceHolder(tj.cfg.get("text_on_ui/mail/tel"));
        this._uiTextTel.addEventListener(this.tfFieldEvent,this);

        this._uiTextTime = WidgetDig(this._ui, "main/task/explain/textTime");
        this._uiTextTime.setPlaceHolder(tj.cfg.get("text_on_ui/mail/time"));
        this._uiTextTime.addEventListener(this.tfFieldEvent,this)

        var feedbackContacts = tj.mainData.getClientData(client_data_key_feedbackContacts);
        if(feedbackContacts){
            this._uiTextQQ.setPlaceHolder("");
            this._uiTextQQ.setString(feedbackContacts.qq);
            this._uiTextTel.setPlaceHolder("");
            this._uiTextTel.setString(feedbackContacts.tel);
        }

        if(this._fromLayer && this._fromLayer == "gem"){
            this._uiBtnList.removeChild(this._uiBtnTemple);
            this._uiTextQQ.setVisible(false);
            WidgetDig(this._ui, "main/task/explain/text_0").setVisible(false);
            WidgetDig(this._ui, "main/task/explain/TBGQQ").setVisible(false);

            var moveFunc = function(moveArray,dy){
                for(var i in moveArray){
                    var item = moveArray[i];
                    if(item){
                        item.setPositionY(item.getPositionY()+dy);
                    }
                }
            };

            var moveArray = [];
            moveArray.push(WidgetDig(this._ui, "main/task/explain/text_0_0"));
            moveArray.push(WidgetDig(this._ui, "main/task/explain/textTel"));
            moveArray.push(WidgetDig(this._ui, "main/task/explain/TBGTEL"));
            moveFunc(moveArray,25);

            moveArray.splice(0,moveArray.length);
            moveArray.push(WidgetDig(this._ui, "main/task/explain/text_0_0_0"));
            moveArray.push(WidgetDig(this._ui, "main/task/explain/textTime"));
            moveArray.push(WidgetDig(this._ui, "main/task/explain/TBGTIME"));
            moveFunc(moveArray,15);

        }

        tj.wsconnection.addGrp(msgac["Mailbox_send"], msgac["Mailbox_send"], this.process_ac.bind(this), this.get_scene_name());
        tj.wsconnection.addGrp(msgac["ArenaUI_show_team"], msgac["ArenaUI_show_team"], this.process_ac.bind(this), this.get_scene_name());
        return true;
    },


    tfFieldEvent: function (sender, type) {
        switch (type) {
            case ccui.TextField. EVENT_ATTACH_WITH_IME:
                sender.setPlaceHolder("");
                //this._uiTextField.setString("");
                this._cursor.insertTo(sender);
                break;
            case ccui.TextField. EVENT_DETACH_WITH_IME:
                //this._topDisplayText.setString("detach with IME");
                this._cursor.hidden(sender);
                break;
            case ccui.TextField. EVENT_INSERT_TEXT:
                this._cursor.update();
                break;
            case ccui.TextField. EVENT_DELETE_BACKWARD:
                this._cursor.update();
                break;
            default:
                break;
        }
    },

    defaultTouchButton : function(btn, type) {
        var that = this;
        if (type == ccui.Widget.TOUCH_ENDED) {
            switch(btn.getName())
            {
                case "btnOption":
                case "btnRecharge":
                    var t = btn.getName() == "btnOption"?1:2;
                    var occ_time = this._uiTextTime.getString();
                    var qq = this._uiTextQQ.getString();
                    var tel = this._uiTextTel.getString();
                    var content =this._uiTextField.getString();
                    if(content == "")
                        this.noticetext_add(tj.cfg.get("text/mail/backnull"));
                    else {
                        tj.wsconnection.setMsg(msgac["Mailbox_send"], {
                            "title": "",
                            "content": content,
                            "t": t,
                            "occ_time": occ_time,
                            "qq": qq,
                            "tel": tel
                        });
                        this.setBtnStatus(false);
                    }
                    this._uiTextField.didNotSelectSelf();

                    // 保存玩家填写的联系方式 QQ和电话，供下次反馈自动填写使用
                    var feedbackContacts = {};
                    feedbackContacts.qq = qq;
                    feedbackContacts.tel = tel;
                    tj.mainData.setClientData(client_data_key_feedbackContacts,feedbackContacts);
                    tj.mainData.sendClientData(client_data_key_feedbackContacts);

                    break;
                case "btnCancel":
                    this._uiTextField.didNotSelectSelf();
                    this.set_release();
                    break;
            }
        }
    },

    process_ac : function(doc) {
        var msg_id = doc[0];
        var data = doc[1];
        switch (msg_id) {
            case msgac["Mailbox_send"]:
                switch(data){
                    case 0:
                        this._uiTextField.setString("");
                        this._uiTextField.setPlaceHolder(tj.cfg.get("text_on_ui/mail/please"));
                        //this._uiTextQQ.setString("");
                        //this._uiTextQQ.setPlaceHolder(tj.cfg.get("text_on_ui/mail/qq"));
                        //this._uiTextTel.setString("");
                        //this._uiTextTel.setPlaceHolder(tj.cfg.get("text_on_ui/mail/tel"));
                        this._uiTextTime.setString("");
                        this._uiTextTime.setPlaceHolder(tj.cfg.get("text_on_ui/mail/time"));
                        this.noticetext_add(tj.cfg.get("text/mail/backsucc"));
                        break;
                    case 1:
                    case 2:
                        this.noticetext_add(tj.cfg.get("text/mail/errorback"));
                        break;
                    case 3:
                        this.noticetext_add(tj.cfg.get("text/mail/backnull"));
                        break;
                    case 4:
                        this._uiTextTel.setString("");
                        this._uiTextTel.setPlaceHolder(tj.cfg.get("text_on_ui/mail/tel"));
                        this._cursor.hidden(this._uiTextTel);
                        this.noticetext_add(tj.cfg.get("text/mail/telError"));
                        break;
                    case 5:
                        this.noticetext_add(tj.cfg.get("text/mail/needtel"));
                        break;
                }
                this.setBtnStatus(true);
                break;
            case msgac["ArenaUI_show_team"]:
                this._uiTextField.didNotSelectSelf();
                break;
            default :break;
        }
    },

    setBtnStatus:function(enable){
        if(this._fromLayer != "gem"){
            var btnOption = WidgetDig(this._ui, "main/list/btnOption");
            if(btnOption){
                btnOption.setEnabled(enable);
            }
        }
        var btnRecharge = WidgetDig(this._ui, "main/list/btnRecharge");
        if(btnRecharge){
            btnRecharge.setEnabled(enable);
        }
    }
});


createMailBackLayer = function(parent,fromLayer){
    var pRet = new cardMailBackLayer(fromLayer);
    if (pRet && pRet.init()){
        var z = -1;
        var childs = parent.getChildren();
        for(var i = 0; i < childs.length; ++i){
            if (childs[i].getLocalZOrder() > z)
                z = childs[i].getLocalZOrder();
        }
        pRet.setLocalZOrder(z + 1);
        pRet._tjParent = parent;
        parent.addChild(pRet);
        return pRet;
    } else if (pRet)
        delete pRet;
    return null;
};