/**
 * Created by likx on 2016/8/12.
 */

var agreementLayer = baseLayer.extend({

    ctor: function (cb) {
        this._super();
        this._basename = 'agreement';
        this._cb = cb;
    },

    init: function () {
        if (!this._super())
            return false;
        this._ui = this.load_ui("uiTextAgreement.json");
        if (!this._ui)
            return false;
        this.addChild(this._ui);

        this._scroll = WidgetDig(this._ui, "scrol");
        this._text = WidgetDig(this._scroll, "text");
        //this._scroll.addEventListener(this.scrollEvent, this);

        //WidgetDig(this._ui, "set/btnYes").setEnabled(false);
        WidgetDig(this._ui, "set/btnYes/text").setString(tj.cfg.get("text_on_ui/ut/agree"));
        //WidgetDig(this._ui, "set/btnYes/text").setColor(cc.color.GRAY);
        WidgetDig(this._ui, "set/btnClosed/text").setString(tj.cfg.get("text_on_ui/ut/refuse"));

        var agreement = "";

        if (cc.tj.ACTIVE === true) {
            switch (cc.tj.PTYPE) {
                case P_TYPE_WID:
                    var BG = WidgetDig(this._ui, "BG");
                    if (BG !== null) {
                        BG.setScale(BG.getScale() / cc.tj.SCALE);
                    }
                    break;
            }
        }

        cc.loader.loadTxt("res/agreement.txt", function(a,b) {
            ar = b;
            this._text.setFontSize(20);
            var size = this._text.getSize();
            var container = this._scroll.getInnerContainer();
            container.setContentSize(size.width, 15400);
            this._text.setContentSize(size.width, 15400);
            this._text.setPosition(0, 15400);
            this._text.setString(ar);
            container.setPosition(0, 15400);
            this._scroll.scrollToTop(0, 0);
        }.bind(this));

        return true;
    },

    scrollEvent: function (sender, type) {
        var that = sender.mainlayer;
        switch (type) {
            case ccui.ScrollView.EVENT_SCROLL_TO_BOTTOM:
                WidgetDig(this._ui, "set/btnYes").setEnabled(true);
                WidgetDig(this._ui, "set/btnYes/text").setColor(cc.color.WHITE);
                break;
            default:
                break;
        }
    },

    onEnter: function () {
        this._super();
    },

    onExit: function () {
        this._super();
    },

    defaultTouchButton: function (btn, type) {
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN: //按下
                break;

            case ccui.Widget.TOUCH_ENDED: //放开
                switch (btn.name) {
                    case 'btnClosed':
                        if(this._cb)
                            this._cb(0);
                        this.set_release();
                        break;
                    case "btnYes":
                        if(this._cb)
                            this._cb(1);
                        this.set_release();
                        break;
                }
                break;
        }
    }
});

createAgreementLayer = function(parent, cb){
    var pRet = new agreementLayer(cb);
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
