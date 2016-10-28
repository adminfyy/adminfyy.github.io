/**
 * Created by likx on 2016/3/9.
 */
var inputNameLayer = baseLayer.extend({
    _ui: 0,
    _cursor: null,
    _photoImage : null,

    ctor: function (cb) {
        this._super();
        this._basename = "inputname";
        this._beTop = false;
        this._cb = cb;
    },

    init: function () {
        if (!this._super())
            return false;
        this._ui = this.load_ui("uiRegister.json");
        if (!this._ui)
            return false;
        this.addChild(this._ui);

        this._input = WidgetDig(this._ui, "login/name");
        this._input.addEventListener(this.tfInputFieldEvent,this);
        this._photoImage = WidgetDig(this._ui,"login/btnMain/icon");

        tj.wsconnection.addGrp(msgac["Badwords_check"], msgac["Nickname_set"], this.process_ac.bind(this), this.get_scene_name());
        tj.wsconnection.addGrp(msgac["ArenaUI_show_team"], msgac["ArenaUI_show_team"], this.process_ac.bind(this), this.get_scene_name());

        return true;
    },

    onEnter: function() {
        this._super();
        this._cursor = new tj.textCursor();

        if(tj.mainData.main.hasOwnProperty("portrait")){
            var portrait = tj.mainData.main.portrait;
            if(portrait){
                var itemInfo = tj.dbdata.getrow("portrait",portrait);
                if(itemInfo && itemInfo.icon){
                    this._photoImage.loadTexture(portrait_icon_pre_path + itemInfo.icon, ccui.Widget.PLIST_TEXTURE);
                }
            }
        }
    },

    onExit: function() {
        this._super();
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
                    var account = this._input.getString();

                    var bytesLength = getBytesLength(account);
                    if(bytesLength > 8*2){
                        this.noticetext_add(tj.cfg.get("text/ranking/nameTooLong"));
                        return;
                    }

                    if(account.trim()=='') {
                        this.noticetext_add(tj.cfg.get("text/ranking/emptyName"));
                    }else {
                        tj.wsconnection.setMsg(msgac["Badwords_check"], account);
                    }
                    break;
                case "btnMain":
                    createPhotoSetLayer(this,this.photoSetCallback.bind(this));
                    break;
                case "btnClosed":
                    this._input.didNotSelectSelf();
                    this.set_release();
                    this._cb("");
                    break;
            }
        }
    },

    photoSetCallback : function(iconId,iconPath){
        if(this._photoImage && iconId){
            if(iconPath) {
                this._photoImage.loadTexture(iconPath, ccui.Widget.PLIST_TEXTURE);
            }
            tj.mainData.main.portrait = iconId;
            tj.wsconnection.setMsg(msgac["Change_portrait"], {"id":iconId});
        }
    },

    process_ac : function(doc) {
        var msg_id = doc[0];
        var data = doc[1];
        switch (msg_id) {
            case msgac["Badwords_check"]:
               if(data.ret == 0){
                   tj.wsconnection.setMsg(msgac["Nickname_set"], data.s0)
               }else{
                   //this._input.setString(data.s1);
                   this.noticetext_add(tj.cfg.get("text/ranking/unableName"));
               }
                break;
            case msgac["Nickname_set"]:
                var name = data;
                if(name == "")
                    this.noticetext_add(tj.cfg.get("text/ranking/unableName"));
                else{
                    this._input.didNotSelectSelf();
                    this._cb(name);
                    this.set_release();
                }
                break;
            case msgac["ArenaUI_show_team"]:
                this._input.didNotSelectSelf();
                break;
        }
    }
});

createInputNameLayer = function(parent, cb){
    var pRet = new inputNameLayer(cb);
    if (pRet && pRet.init()) {
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