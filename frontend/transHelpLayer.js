/**
 * Created by likx on 2016/4/19.
 */


var transHelpLayer = baseLayer.extend({
    _text:"",

    ctor : function(){
        this._super();
        this._basename = "transhelp";
        this._listener = null;
    },

    init : function(text){
        var self = this;
        if (!this._super())
            return false;
        this._ui = this.load_ui("uiText.json");
        if (this._ui == -1)
            return true;
        if (!this._ui)
            return false;
        this.addChild(this._ui);

        WidgetDig(this._ui, "set/btnClosed").setOpacity(0);
        WidgetDig(this._ui, "set/btnClosed/text").setOpacity(0);

        WidgetDig(this._ui, "text").setTouchEnabled(false);
        WidgetDig(this._ui, "BG").setTouchEnabled(false);

        this._listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                //新手（地图阶段）
                if(tj.mainData.getClientData("help")[0] == 0)
                    cc.director.runScene(new cc.TransitionFade(0.5, createScene(mapLayer)));
                //新手（主城阶段）
                else if(tj.mainData.getClientData("help")[1] == 0)
                    cc.director.runScene(new cc.TransitionFade(0.5, createScene(mainLayer)));
                this._listener.setEnabled(false);
                return true;
            }.bind(this)
        });
        cc.eventManager.addListener(this._listener, this);
        this._listener.setEnabled(false);

        this.showplot();
        return true;
    },

    defaultTouchButton : function(btn, type){
        if (type == ccui.Widget.TOUCH_ENDED){
            this.set_release();
        }
    },

    showplot : function(){
        var self = this;
        var p_pnEnd = WidgetDig(this._ui, "text");
        var p_textEnd = WidgetDig(this._ui, "text/text");
        p_textEnd.setVisible(false);

        //新手（地图阶段）
        if(tj.mainData.getClientData("help")[0] == 0)
            this._text = tj.dbdata.getValueById("plot", 1, "text");
        //新手（主城阶段）
        else if(tj.mainData.getClientData("help")[1] == 0)
            this._text = tj.dbdata.getValueById("plot", 2, "text");

        var lines = this._text.split("\n");
        var height = 0;
        var sz_pnl = p_pnEnd.getContentSize();
        var sz_pnl_height = sz_pnl.height - 200;
        var rowcount = 0;
        var delay = tj.cfg.get("designdata/plotbox_delay");
        for (x = 0; x < lines.length; x++){
            var text = lines[x];
            var uitxt = p_textEnd.clone();
            uitxt.setVisible(true);
            uitxt.setOpacity(0);
            uitxt.setString(text);
            p_pnEnd.addChild(uitxt);
            var sz_txt = uitxt.getContentSize();
            uitxt.setPosition(cc.p(200, sz_pnl_height - height));
            uitxt.setFontSize(26);
            height += sz_txt.height + 10;
            var e1 = new cc.DelayTime(rowcount * delay);
            var e2 = new cc.FadeIn(1);
            var f = new cc.CallFunc(function(){},this);
            var q = new cc.Sequence(e1, e2, f);
            uitxt.runAction(q);
            rowcount++;
        }

        if(this._cb) {
            e1 = new cc.DelayTime(rowcount * delay);
            e2 = new cc.FadeIn(1);
            f = new cc.CallFunc(function () {}, this);
            q = new cc.Sequence(e1, e2, f);
            WidgetDig(this._ui, "set/btnClosed").runAction(q);
            var e3 = new cc.DelayTime(rowcount * delay);
            var e4 = new cc.FadeIn(1);
            var f2 = new cc.CallFunc(function () {
            }, this);
            var q2 = new cc.Sequence(e3, e4, f2);
            WidgetDig(this._ui, "set/btnClosed/text").runAction(q2);
        }else{
            e1 = new cc.DelayTime(rowcount * delay);
            f = new cc.CallFunc(function () {
                self._listener.setEnabled(true);
                self._listener.setSwallowTouches(false);
            }, this);
            q = new cc.Sequence(e1, f);
            this.runAction(q);
        }
    }
});