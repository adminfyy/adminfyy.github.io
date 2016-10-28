/**
 * Created by likx on 2015/12/23.
 */

var loadingType={"cook":0, "joke":1, "cure":2};

var loadingBoxLayer = baseLayer.extend({
    _ui: 0,
    _t_begin:0,
    _t_end:0,
    _cb:null,
    _bar:null,
    _uiText:null,
    _close:false,
    _parm1:0,
    _cancel:false,

    ctor: function (cb, parm1, cancel) {
        this._super();
        this._basename = "loadingbox";
        this._beTop = false;
        this._cb = cb;
        this._parm1 = parm1;
        this._cancel = cancel;
    },

    init: function (text, time) {
        if (!this._super())
            return false;
        this.create_control();

        var origin = cc.director.getVisibleOrigin();
        this._ui = this.load_ui("boxLoading.json");
        if (!this._ui)
            return false;
        this.addChild(this._ui);

        this._bar = WidgetDig(this._ui, "bar/Loading");
        this._uiText = WidgetDig(this._ui, "bar/textTime");
        WidgetDig(this._ui, "BG").setOpacity(0);

        this._t_begin = tj.gameClock.elapsed();
        this._t_end = this._t_begin + time * 1000;
        this.setContentString(this._uiText, text, AUTO_STR_IGNORE);

        //switch(this._type){
        //    case loadingType.cook:
        //        this._t_begin = tj.gameClock.elapsed();
        //        this._t_end = this._t_begin + tj.cfg.get("designdata/loadingbox_cook") * 1000;
        //        this._uiText.setString(tj.cfg.get("text_on_ui/map/cooking"));
        //        break;
        //    case loadingType.joke:
        //        this._t_begin = tj.gameClock.elapsed();
        //        this._t_end = this._t_begin + tj.cfg.get("designdata/loadingbox_joke") * 1000;
        //        this._uiText.setString(tj.cfg.get("text_on_ui/map/joke"));
        //        break;
        //    case loadingType.cure:
        //        this._t_begin = tj.gameClock.elapsed();
        //        this._t_end = this._t_begin + tj.cfg.get("designdata/loadingbox_cure") * 1000;
        //        this._uiText.setString(tj.cfg.get("text_on_ui/map/cure"));
        //        break;
        //}
        return true;
    },

    execute:function(){
        this._bar.setPercent(0);
        if (this._cb)
            this._cb(this._parm1, true);
        this.set_release();
    },

    on_touch_Began:function(){
        this._super();
        if(this._cancel)
            this.execute();
    },

    update : function() {
        this._super();

        if(this._close){
            this.set_release();
            return;
        }

        var t_now = tj.gameClock.elapsed();
        if (t_now >= this._t_end){
            this._bar.setPercent(0);
            if (this._cb)
                this._cb(this._parm1, false);
            this._close = true;
        } else {
            var per = 0;
            if (this._t_end > this._t_begin)
                per = 100 - (this._t_end -t_now) * 100 / (this._t_end - this._t_begin);
            this._bar.setPercent(per);
        }
    },

    onEnter : function() {
        this._super();

        self = this;
        cc.Node.prototype.onEnter.call(self);
    },

});

createLoadingBoxLayer = function(parent, text, time, cb, parml, cancel){
    var pRet = new loadingBoxLayer(cb, parml, cancel);
    if (pRet && pRet.init(text, time)){
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