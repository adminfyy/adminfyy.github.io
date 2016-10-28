/**
 * Created by likx on 2016/3/2.
 */

var loginLayer = baseLayer.extend({
    _cb:null,
    _tfAaccount:null,
    _tfPassword:null,
    _cursor: null,

    ctor: function (cb) {
        this._super();
        this._basename = "login";
        this._cb = cb;
    },

    init: function () {
        if (!this._super())
            return false;
        var origin = cc.director.getVisibleOrigin();
        this._ui = this.load_ui("uiLogin.json");
        if (!this._ui)
            return false;
        this.addChild(this._ui);

        this._tfAaccount = WidgetDig(this._ui, "login/account");
        this._tfPassword = WidgetDig(this._ui, "login/password");

        this._tfAaccount.addEventListener(this.textFieldEvent, this);
        this._tfPassword.addEventListener(this.textFieldEvent, this);

        this.setContentString(WidgetDig(this._ui, "set/btnGhost/text"), tj.cfg.get("text_on_ui/visitor"));
        this.setContentString(WidgetDig(this._ui, "set/btnRes/text"), tj.cfg.get("text_on_ui/res"));
        this.setContentString(WidgetDig(this._ui, "set/btnYes/text"), tj.cfg.get("text_on_ui/ok"));

        WidgetDig(this._ui, "textWarning").setVisible(false); //健康游戏...

        var accout = tj.local.getDefaultUid();
        var password = tj.local.getDefaultPassword();
        if(accout && password){
            this._tfAaccount.setString(accout);
            this._tfPassword.setString(password);
            if(cc.sys.isNative) {
                // WidgetDig(this._ui, "set/btnRes").setVisible(false);
                // WidgetDig(this._ui, "set/btnGhost").setVisible(false);
            }
        }

        ////
        //var s9 = new ccui.Scale9Sprite();
        //s9.initWithSpriteFrameName("ui/imgLoginText.png", cc.rect(5, 5, 5, 5));
        //var ebox = new cc.EditBox(cc.size(400, 40), s9);
        //ebox.setAnchorPoint(cc.p(0.5, 0.5));
        //ebox.setInputFlag(cc.EDITBOX_INPUT_FLAG_SENSITIVE);
        //ebox.setInputMode(cc.EDITBOX_INPUT_MODE_ANY);
        //ebox.setString('abcdefghijklmn0123456789');
        //ebox.setPosition(cc.p(260, 40));
        //ebox.setFont(tj.cfg.get('designdata/design_fontName'), 22);
        //ebox.setColor(cc.color('#FFFFFF'));
        //ebox.setFontColor(cc.color('#FFFFFF'));
        //ebox.setDelegate(this);
        //WidgetDig(this._ui, "login").addChild(ebox);

        return true;
    },

    onEnter: function() {
        this._super();
        this._cursor = new tj.textCursor();
    },

    onExit: function() {
        this._super();
        if(this._cursor) {
            this._cursor.remove();
        }
    },

    textFieldEvent: function (sender, type) {
        //cc.log('textFieldEvent:', sender._name, type);
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

    //<<
    defaultTouchButton : function(btn, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            switch (btn.getName()){
                case "btnGhost":
                    this._cb(0, "", 0);
                    this.set_release();
                    break;
                case "btnYes":
                case "btnRes":
                    var ltype = 0;
                    if (btn.getName() == "btnYes")
                        ltype = 1;

                    var account = this._tfAaccount.getString();
                    var password = this._tfPassword.getString();
                    if (account === "" || password === "") {
                        this.noticetext_add(tj.cfg.get("text/login/null"));
                        return;
                    }
                    tj.local.setDefaultPassword(password);
                    this._cb(account, password, ltype);
                    this.set_release();
                    break;
            }

        }
    },
    //<<
    process_ac: function (doc) {
        var msg_id = doc[0];
        var data = doc[1];
        switch(msg_id){
            default:
                break;
        }
    }
});

createLoginLayer = function(parent, cb){
    var pRet = new loginLayer(cb);
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