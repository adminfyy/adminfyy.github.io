/**
 * Created by faps on 2016/8/11.
 */

var aboutLayer = baseLayer.extend({

    ctor: function () {
        this._super();
        this._basename = 'about';
    },

    init: function () {
        if (!this._super())
            return false;
        this._ui = this.load_ui("uiAbout.json");
        if (!this._ui)
            return false;
        this.addChild(this._ui);
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
                        this.removeFromParent();
                        break;
                }
                break;

            case ccui.Widget.TOUCH_CANCELED:  //取消
                break;
        }
    }
});
