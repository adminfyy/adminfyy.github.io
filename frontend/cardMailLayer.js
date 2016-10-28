/**
 * Created by likx on 2016/3/21.
 */

var cardMailLayer = baseLayer.extend({
    _ui:0,
    _uiBtnList:null,
    _uiBtnTemple:null,
    _mailData:[],
    _mailsOption:null,
    _unread:0,

    _btnEmail:null,
    _btnNotice:null,
    _uiNoticeTemple:null,
    _noticeTitles:[],
    _tabFlag:0,         // 1.邮箱  2.公告

    ctor : function( ){
        this._super();
        this._basename = "mail";
        this._mailsOption = {};
    },

    init : function() {
        if (!this._super())
            return false;

        this._ui = this.load_ui("cardMailList.json");
        if (!this._ui)
            return false;
        this.addChild(this._ui);

        WidgetDig(this._ui, "set/btnClear/text").setString(tj.cfg.get("text_on_ui/mail/clear"));
        WidgetDig(this._ui, "set/btnPick/text").setString(tj.cfg.get("text_on_ui/mail/takeall"));
        WidgetDig(this._ui, "set/btnFeedback/text").setString(tj.cfg.get("text_on_ui/mail/feedback"));
        WidgetDig(this._ui, "set/btnClosed/text").setString(tj.cfg.get("text_on_ui/close"));

        this._uiBtnList = WidgetDig(this._ui, "main/list");
        this._uiBtnTemple = WidgetDig(this._ui, "main/list/btnOption");

        this._btnEmail = WidgetDig(this._ui, "main/class/all");
        this._btnNotice = WidgetDig(this._ui, "main/class/history");
        WidgetDig(this._btnEmail,"text").setString(tj.cfg.get("text_on_ui/mail/mail"));
        WidgetDig(this._btnNotice,"text").setString(tj.cfg.get("text_on_ui/mail/notice"));
        this._uiNoticeTemple = this._uiBtnTemple.clone();
        WidgetDig(this._uiNoticeTemple,"btnDelete").setVisible(false);
        WidgetDig(this._uiNoticeTemple,"btnReward").setVisible(false);
        WidgetDig(this._uiNoticeTemple,"text").setVisible(false);
        WidgetDig(this._uiNoticeTemple,"lock").setVisible(false);
        var itemBgLine = WidgetDig(this._uiNoticeTemple,"BGLine");
        var itemBG = WidgetDig(this._uiNoticeTemple,"BG");
        var itemName = WidgetDig(this._uiNoticeTemple,"name");
        itemBgLine.setVisible(false);
        var sizeNotice = this._uiNoticeTemple.getContentSize();
        this._uiNoticeTemple.setContentSize(sizeNotice.width,80);
        itemBG.setContentSize(sizeNotice.width,80);
        itemName.setPositionY(itemName.getPositionY()-50);
        itemBG.setPositionY(itemBG.getPositionY()-20);

        // this._uiBtnTemple.retain();
        this.setRetain(this._uiBtnTemple, "uitmpl");
        this.setRetain(this._uiNoticeTemple, "uitmpl");
        this._uiBtnTemple.removeFromParent();

        this.switchTab(true);
        WidgetDig(this._ui, "main/text/textRight").setVisible(false);

        tj.wsconnection.addGrp(msgac["Mailbox_list"], msgac["Mailbox_del"], this.process_ac.bind(this), this.get_scene_name());
        tj.wsconnection.addGrp(msgac["Mailbox_fetch_attach"], msgac["Mailbox_fetch_all"], this.process_ac.bind(this), this.get_scene_name());
        tj.wsconnection.addGrp(msgac["Faq_title_list"], msgac["Faq_title_list"], this.process_ac.bind(this), this.get_scene_name());
        tj.wsconnection.addGrp(msgac["Faq_title_content"], msgac["Faq_title_content"], this.process_ac.bind(this), this.get_scene_name());

        tj.wsconnection.setMsg(msgac["Mailbox_list"]);

        return true;
    },

    process_ac : function(doc) {
        var msg_id = doc[0];
        var data = doc[1];
        switch (msg_id) {
            case msgac["Mailbox_list"]:
                this._mailData = data.mails;
                this.refresh_mail();
                this.refresh_mail_count();
                break;
            case msgac["Mailbox_read"]:
                switch(data.ret){
                    case 0:
                        this.setMailRead(data.id);
                        var p2 = this._mailsOption[data.id];
                        if(p2) {
                            WidgetDig(p2, "name").setColor(cc.color('#9C9C9C'));
                            WidgetDig(p2, "lock").setVisible(false);
                        }
                        break;
                }
                break;
            case msgac["Mailbox_fetch_attach"]:
                var p2 = this._mailsOption[data.id];
                if(p2) {
                    WidgetDig(p2, "btnReward").setVisible(false);
                    WidgetDig(p2, "btnDelete").setVisible(true);
                    WidgetDig(p2, "lock").setVisible(false);
                }
                switch(data.ret){
                    case 0:
                        this.setGainAttach(data.id);
                        this.setMailRead(data.id);
                        this.gain_attachments(data.data.Attachments);
                        break;
                    case 1:
                    case 2:
                        this.noticetext_add(tj.cfg.get("text/mail/error"));
                        break;
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                        this.noticetext_add(tj.cfg.get("text/mail/bad_attachment"));
                        break;
                }
                break;
            case msgac["Mailbox_del"]:
                p2 = this._mailsOption[data.id];
                if(p2){
                    p2.removeFromParent();
                    if(p2.isnew)
                        this.setMailRead(data.id);
                }
                this.delMail(data.id);
                this.refresh_mail_count();
                break;
            case msgac["Faq_title_list"]:
                this._noticeTitles = data.title_list;
                this.refreshNotices();
                break;
            case msgac["Faq_title_content"]:
                if(data.ret == 0) {
                    var str = data.content;
                    createAssetsBox(this,str,function(tag){
                        return true;
                    },4);
                    //this._curr_popLayer = createNoteBox(this, str, form_t.mail);
                }
                break;
            default :break;
        }
    },

    refreshNotices : function(){
        this._uiBtnList.removeAllChildren();
        for(var i in this._noticeTitles){
            var title = this._noticeTitles[i];
            var uiItem = this._uiNoticeTemple.clone();
            this._uiBtnList.pushBackCustomItem(uiItem);
            uiItem.title = title;
            WidgetDig(uiItem,"name").setString(title);
        }
    },

    on_ws_reopen:function(){
        tj.wsconnection.setMsg(msgac["Mailbox_list"]);
    },

    gain_attachments:function(attachments){
        for(var i in attachments){
            var att = attachments[i];
            switch (att.type){
                case 1://资源
                    var mainres = tj.mainData.getResinfoById(att.id);
                    if(mainres)
                        mainres.add(att.num);
                    tj.wsconnection.pushmsg(msgac["Main_refresh_resource"]);
                    break;
                case 2://金币珠宝
                    var gemid = tj.cfg.getAttr("designdata/itemID", "gemid");
                    var coinid = tj.cfg.getAttr("designdata/itemID", "coinid");
                    if(att.id == coinid)
                        tj.mainData.addCoin(att.num);
                    else
                        tj.mainData.addGem(att.num);
                    break;
                case 3://道具
                    tj.mainData.addStroageItem(att.id, att.num);
                    break;
                case 4://装备
                    var equip = att.equip_info;
                    tj.mainData.addEquipInfo2(equip);
                    att.id = equip.id;
                    break;
            }
            var pop_str = tj.mainData.getItemName(att.id) + " +" + att.num ;
            this.noticetext_add(pop_str);
        }
    },

    refresh_mail:function(ev_info){
        if(this._tabFlag != 1){
            return;
        }
        this._uiBtnList.removeAllChildren();
        for(var i in this._mailData){
            var mail = this._mailData[i];
            var p2= this._uiBtnTemple.clone();
            if (!p2)
                continue;
            this._uiBtnList.pushBackCustomItem(p2);

            var size =  WidgetDig(this._uiBtnTemple, "btnDelete").getContentSize();
            WidgetDig(p2, "btnDelete").setContentSize(size);
            size =  WidgetDig(this._uiBtnTemple, "btnReward").getContentSize();
            WidgetDig(p2, "btnReward").setContentSize(size);
            WidgetDig(p2, "btnReward/text").setVisible(false);

            WidgetDig(p2, "name").setString(mail.Title);
            WidgetDig(p2, "lock").setVisible(false);
            if(mail.Read)
                WidgetDig(p2, "name").setColor(cc.color('#9C9C9C'));
            else{
                this._unread++;
                WidgetDig(p2, "lock").setVisible(true);
                p2.isnew = true;
            }

            var send_time  = new Date(mail.Send_time);
            var d = tj.gameClock.getYMDTime(send_time);
            WidgetDig(p2, "text").setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
            WidgetDig(p2, "text").setString(d);

            var ahments = null;
            if(mail.Attachments instanceof Array) {
                ahments = mail.Attachments[0];
                var attachInfo = "";
                for(var i in mail.Attachments){
                    var attach = mail.Attachments[i];
                    var num = attach.Item_num;
                    if(num < 0){
                        num = -num;
                    }
                    if(num == 0){
                        continue;
                    }
                    var info = tj.mainData.getItemName(attach.Item_id) + " x" + num;
                    attachInfo = attachInfo + info + "\n";
                }
                mail.attachInfo = attachInfo;
            }
            if(ahments && ahments.Item_num > 0){
                var icon = tj.mainData.getItemIcon(ahments.Item_id);
                var ficon = tj.mainData.getItemFrameIcon(ahments.Item_id);
                if(ahments.Item_type == 4){ //装备
                    tj.mainData.addEquipInfo(ahments.Item_id, ahments.Item_id);
                    var equip = tj.mainData.getEquipByid(ahments.Item_id);
                    if(equip) {
                        icon = equip.Icon;
                        ficon = equip.FrameIcon;
                    }
                }
                WidgetDig(p2, "btnReward/icon").loadTexture(icon, ccui.Widget.PLIST_TEXTURE);
                if(ficon)
                    WidgetDig(p2, "btnReward/level").loadTexture(ficon, ccui.Widget.PLIST_TEXTURE);
                mail.attachHasGot = false;
            }else {
                WidgetDig(p2, "btnReward").setVisible(false);
                WidgetDig(p2, "btnDelete").setVisible(true);
                mail.attachHasGot = true;
            }
            p2.mailid = mail.Id;
            this._mailsOption[p2.mailid] = p2;
        }
    },

    refresh_mail_count:function(){
        var mc = tj.cfg.get("text_on_ui/mail/count").format(this._mailData.length);
        WidgetDig(this._ui, "main/text/textRight").setString(mc);
        WidgetDig(this._ui, "main/text/textRight").setVisible(true);

        var mainLayer = WidgetDig(this._ui,"main");
        var emptyTextTag = 666666;
        var emptyText = mainLayer.getChildByTag(emptyTextTag);
        if(this._mailData.length <= 0){
            if(!emptyText){
                emptyText = new ccui.Text(tj.cfg.get("text/mail/empty"),tj.cfg.get("designdata/design_fontName"),25);
                mainLayer.addChild(emptyText);
                emptyText.setPosition(cc.p(mainLayer.getContentSize().width*0.5,mainLayer.getContentSize().height*0.5));
                emptyText.setTag(emptyTextTag);
            }
            emptyText.setVisible(true);
        }else if(emptyText){
            emptyText.setVisible(false);
        }
    },

    defaultTouchButton : function(btn, type) {
        var that = this;
        if (type == ccui.Widget.TOUCH_ENDED) {
            switch(btn.getName())
            {
                case "btnOption":
                    if(this._tabFlag == 1) {
                        var title = ";";
                        var content = "";
                        var time = "";
                        var read = false;
                        var mail = this.getMail(btn.mailid);
                        if (mail) {
                            //title = mail.Title + "\n" + tj.cfg.get("text_on_ui/mail/devideLine");
                            //content = mail.Content;
                            //time = tj.gameClock.getYMDTime(new Date(mail.Send_time));
                            //read = mail.Read;
                            //var str = "#xFFFFFF#"+ title + "\n\r\n";
                            //str += content + "\n";
                            //if (mail.attachInfo) {
                            //    var attachStatus = tj.cfg.get("text_on_ui/mail/noGet");
                            //    if(mail.attachHasGot){
                            //        attachStatus = tj.cfg.get("text_on_ui/mail/hasGot");
                            //    }
                            //    str = str + tj.cfg.get("text_on_ui/mail/devideLine") + "\n";
                            //    str = str + "#x005000#";
                            //    str = str  + tj.cfg.get("text_on_ui/mail/attachInfo").format(attachStatus) + "\n" + mail.attachInfo + "\n";
                            //    str = str + "#xFFFFFF#" + "\n\r\n";
                            //}else{
                            //    str += "\n\r\n";
                            //}
                            //str += time;
                            ////this._curr_popLayer = createNoteBox(this, str, form_t.mail);
                            //this._curr_popLayer = createSkillNoteBox(this,str);
                            createCardMailDetailLayer(this,mail);
                            if (!read)
                                tj.wsconnection.setMsg(msgac["Mailbox_read"], {"id": btn.mailid});
                        }
                    }else if(this._tabFlag == 2 && btn.title){
                        tj.wsconnection.setMsg(msgac["Faq_title_content"],{"t":btn.title});
                    }
                    break;
                case "btnClosed":
                    this.set_release();
                    if(this._unread <= 0) {
                        tj.mainData.clientDataClear("new_l");
                        tj.wsconnection.pushmsg(msgac["Main_refresh_new"]);
                    }
                    break;
                case "btnFeedback":
                    this._curr_popLayer = createMailBackLayer(this);
                    break;
                case "btnReward":
                    tj.wsconnection.setMsg(msgac["Mailbox_fetch_attach"], {"id": btn.parent.mailid});
                    break;
                case "btnDelete":
                    var box = createMsgBox2(this,tj.cfg.get("text_on_ui/mail/deleteHint"),function(tag){
                        if(tag == 0) {
                            tj.wsconnection.setMsg(msgac["Mailbox_del"], {"id":btn.parent.mailid});
                        }
                        return true;
                    },3);
                    box.setMsgHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
                    break;
                case "btnPick":
                    tj.wsconnection.setMsg(msgac["Mailbox_fetch_all"]);
                    break;
                case "btnClear":
                    this.clearRead();
                    break;
                case "all":
                    this.switchTab(true);
                    this.refresh_mail();
                    break;
                case "history":
                    this.switchTab(false);
                    tj.wsconnection.setMsg(msgac["Faq_title_list"]);
                    break;
                default:
                    break;
            }
        }
    },

    switchTab : function(isEmail){
        WidgetDig(this._ui,"set/btnClear").color = cc.color("#ffffff");
        WidgetDig(this._ui,"set/btnClear").setTouchEnabled(true);
        WidgetDig(this._ui,"set/btnPick").color = cc.color("#ffffff");
        WidgetDig(this._ui,"set/btnPick").setTouchEnabled(true);
        var emptyText = WidgetDig(this._ui,"main").getChildByTag(666666);

        if(isEmail){
            this._tabFlag = 1;
            if(this._mailData.length <= 0 && emptyText){
                emptyText.setVisible(true);
            }
        }else{
            this._tabFlag = 2;
            WidgetDig(this._ui,"set/btnClear").color = cc.color("#888888");
            WidgetDig(this._ui,"set/btnClear").setTouchEnabled(false);
            WidgetDig(this._ui,"set/btnPick").color = cc.color("#888888");
            WidgetDig(this._ui,"set/btnPick").setTouchEnabled(false);
            if(emptyText){
                emptyText.setVisible(false);
            }
        }
        WidgetDig(this._ui, "main/text/textRight").setVisible(isEmail);
        this._btnEmail.setTouchEnabled(!isEmail);
        this._btnEmail.setHighlighted(isEmail);
        this._btnNotice.setTouchEnabled(isEmail);
        this._btnNotice.setHighlighted(!isEmail);
    },

    setGainAttach:function(mailId){
        for(var m in this._mailData) {
            var mail = this._mailData[m];
            if(mail.Id == mailId){
                mail.Attachments = [];
                mail.attachHasGot = true;
                break;
            }
        }
    },

    clearRead:function(){
        var attachHint = false;
        var readHint = true;
        for(var m in this._mailData) {
            var mail = this._mailData[m];
            if(mail.Read) {
                readHint = false;
                var ahments = null;
                if(mail.Attachments instanceof Array) {
                    ahments = mail.Attachments[0];
                }
                if(ahments && ahments.Item_num > 0){
                    attachHint = true;
                }else {
                    tj.wsconnection.setMsg(msgac["Mailbox_del"], {"id": mail.Id});
                }
            }
        }
        if(readHint && this._mailData.length > 0){
            this.noticetext_add(tj.cfg.get("text/mail/noReadMail"));
        }
        if(attachHint){
            this.noticetext_add(tj.cfg.get("text/mail/attachHint"));
        }
    },

    delMail:function(id){
        for(var m in this._mailData) {
            var mail = this._mailData[m];
            if(mail && mail.Id == id)
                this._mailData.splice(m,1);
        }
    },

    getMail : function(id){
        for(var m in this._mailData){
            var mail = this._mailData[m];
            if(mail.Id == id)
                return mail;
        }
        return null;
    },

    setMailRead : function(id){
        var mail = this.getMail(id);
        if(mail){
            mail.Read = true;
            this._unread--;
        }
    },

});


createMailLayer = function(parent ){
    var pRet = new cardMailLayer();
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