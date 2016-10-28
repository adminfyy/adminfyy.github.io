/**
 * Created by likx on 2016/9/21.
 */
var input_type = {"uid":0, "code":1,"heroName":3};
var inputUIDLayer = baseLayer.extend({
    _ui: 0,
    _cursor: null,

    ctor: function (cb) {
        this._super();
        this._basename = "inputuid";
        this._beTop = false;
        this._cb = cb;
    },

    init: function (type, uid) {
        if (!this._super())
            return false;
        this._ui = this.load_ui("boxDelete.json");
        if (!this._ui)
            return false;
        this.addChild(this._ui);

        this._input = WidgetDig(this._ui, "login/name");
        this._input.addEventListener(this.tfInputFieldEvent,this);

        this._type = type;
        this._heroId = uid;

        WidgetDig(this._ui, "set/btnYes/text").setString(tj.cfg.get("text_on_ui/ok"));
        WidgetDig(this._ui, "set/btnClosed/text").setString(tj.cfg.get("text/setting/close"));
        WidgetDig(this._ui, "explain").setVisible(false);

        if(type == input_type.uid)
            WidgetDig(this._ui, "login/text").setString(tj.cfg.get("text/setting/input_uid").format(uid));

        if(type == input_type.code) {
            WidgetDig(this._ui, "login/text").setString(tj.cfg.get("text/setting/cdk_title").format(uid));
            WidgetDig(this._ui, "explain").setVisible(true);
            WidgetDig(this._ui, "explain/title/text").setString(tj.cfg.get("text/setting/cdk_get_title"));
            WidgetDig(this._ui, "explain/probability").setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
            WidgetDig(this._ui, "explain/probability").setString(tj.cfg.get("text/setting/cdk_get_intro"));
        }

        if(type == input_type.heroName){
            WidgetDig(this._ui, "login/text").setString(tj.cfg.get("text/herocard/changeName/title"));
            this._input.setPlaceHolder(tj.cfg.get("text/herocard/changeName/placeHolder"));
        }

        tj.wsconnection.addGrp(msgac["ArenaUI_show_team"], msgac["ArenaUI_show_team"], this.process_ac.bind(this), this.get_scene_name());
        return true;
    },

    onEnter: function() {
        this._super();
        this._cursor = new tj.textCursor();
    },

    onExit: function() {
        this._super();
        if(this._input) {
            this._input.didNotSelectSelf();
        }
        if(this._cursor) {
            this._cursor.remove();
        }
    },

    tfInputFieldEvent: function (sender, type) {
        switch (type) {
            case ccui.TextField.EVENT_ATTACH_WITH_IME:
                sender.setPlaceHolder("");
                sender.setString("");
                this._cursor.insertTo(sender);
                var that = this;
                SysUtil.getContentFromClipboard(function(v) {
                    if(typeof(v)=="string") {
                        sender.setString(v);
                        that._cursor.insertTo(sender);
                    }
                });
                break;
            case ccui.TextField.EVENT_DETACH_WITH_IME:
                //this._topDisplayText.setString("detach with IME");
                this._cursor.hidden(sender);
                break;
            case ccui.TextField.EVENT_INSERT_TEXT:
                this._cursor.update();
                break;
            case ccui.TextField.EVENT_DELETE_BACKWARD:
                this._cursor.update();
                break;
            default:
                break;
        }
    },


    defaultTouchButton : function(btn, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            switch(btn.getName()) {
                case "btnYes":
                    if(this._type == input_type.heroName){
                        this._input.didNotSelectSelf();
                        var newName = this._input.getString();
                        if(!newName){
                            this.noticetext_add(tj.cfg.get("text/herocard/changeName/fail1"));
                            return;
                        }
                        // 判断长度
                        var length = getBytesLength(newName);
                        if(length > 10){
                            this.noticetext_add(tj.cfg.get("text/herocard/changeName/fail2"));
                            return;
                        }
                        // 判断名字是否与原来的一样
                        var heroInfo = tj.mainData.getOwnHeroById(this._heroId);
                        if(newName == heroInfo.Name){
                            this.noticetext_add(tj.cfg.get("text/herocard/changeName/errorSame"));
                            return;
                        }

                        var needstr1 = tj.cfg.get("text_on_ui/coinpay").format(tj.mainData.getTavern().change_name_coin);
                        var needstr2 = tj.cfg.get("text_on_ui/gempay").format(tj.mainData.getTavern().change_name_gem);
                        var self = this;
                        var msgbox = createMsgBox2(this.getParent(), tj.cfg.get("text/herocard/changeName/changeSureMsg"), function(tag){
                            if(tag == 0){
                                if(tj.mainData.getGemNum() < tj.mainData.getTavern().change_name_gem){
                                    this.noticetext_add(tj.cfg.get("text/notdiamond"));
                                    return false;
                                }
                            }
                            if(tag == 1){
                                if(tj.mainData.getCoinNum() < tj.mainData.getTavern().change_name_coin){
                                    this.noticetext_add(tj.cfg.get("text/notgold"));
                                    return false;
                                }
                            }
                            if(tag == 0 || tag == 1) {
                                if (typeof self._cb == "function") {
                                    var info = {};
                                    info.name = newName;
                                    info.t = tag;
                                    info.id = self._heroId;
                                    var r = self._cb(info);
                                    if (r !== false) {
                                        self.set_release();
                                    }
                                }
                            }
                            return true;
                        });
                        msgbox.add_btn(needstr1, 1);
                        msgbox.add_btn(needstr2, 0);
                        msgbox.add_btn(tj.cfg.get("text_on_ui/cancel", ""), 2);
                    }else {
                        var uid = this._input.getString();
                        this._input.didNotSelectSelf();
                        if (typeof this._cb == "function") {
                            var r = this._cb(uid);
                            if (r !== false) {
                                this.set_release();
                            }
                        } else {
                            cc.log('inputUIDLayer: callback is not function, input value: ', uid);
                        }
                    }
                    break;
                case "btnClosed":
                    this._input.didNotSelectSelf();
                    this.set_release();
                    break;
            }
        }
    },

    process_ac : function(doc) {
        var msg_id = doc[0];
        var data = doc[1];
        switch (msg_id) {
            case msgac["ArenaUI_show_team"]:
                this._input.didNotSelectSelf();
                break;
        }
    }
});

createInputUIDLayer = function(parent, type, cb, uid){
    var pRet = new inputUIDLayer(cb);
    if (pRet && pRet.init(type, uid)) {
        var z = -1;
        var childs = parent.getChildren();
        for (var i = 0; i < childs.length; ++i) {
            if (childs[i].getLocalZOrder() > z)
                z = childs[i].getLocalZOrder();
        }
        pRet.setLocalZOrder(9999999);
        pRet._tjParent = parent;
        parent.addChild(pRet);
        return pRet;
    } else if (pRet)
        delete pRet;
    return null;
};