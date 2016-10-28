/**
 * Created by fudq on 2016/4/11.
 */
var skillnoteBox = baseLayer.extend({
    _cb:null,

    ctor : function(){
        this._super();
        this._basename = "skillnotebox";
        this._beTop = false;
    },

    init : function(str, callback) {
        if (!this._super())
            return false;

        this._ui = this.load_ui("boxText.json");
        if (!this._ui)
            return false;
        this.addChild(this._ui);

        var box = WidgetDig(this._ui, "box");
        var bg = WidgetDig(this._ui, "box/BG");
        var txt = WidgetDig(this._ui, "box/text");
        box.setTouchEnabled(false);
        bg.setTouchEnabled(false);
        txt.setTouchEnabled(false);
        txt.setVisible(false);
        //this.setContentString(txt, str, AUTO_STR_NEWLINE);

        var textSize = txt.getContentSize();
        var bgSize = bg.getContentSize();
        var padding = (bgSize.height- textSize.height)/2;

        var fontColor = txt.getColor();
        var msg = tj.mainData.getColorText(str, txt.getFontSize(),fontColor?fontColor:"#FFFFFF");
        msg.setAnchorPoint(cc.p(0.5, 0.5));
        msg.ignoreContentAdaptWithSize(false);
        msg.width = txt.width;
        msg.formatText();

        var size2 = msg.getContentSize();
        bg.setSize(cc.size(bg.width, size2.height + 2*padding));
        box.addChild(msg);
        msg.setParent(box);
        var pos = bg.getPosition();
        if(cc.sys.isNative) {
            pos.y += size2.height;
        }
        msg.setPosition(pos);

        this._listener = cc.EventListener.create({
            event           : cc.EventListener.TOUCH_ONE_BY_ONE,
            target          : this,
            swallowTouches  : true,
            onTouchBegan    : function (touch, event) {
                return true;
            }.bind(this),
            onTouchEnded    : this.onTouchEnd.bind(this),
        });
        cc.eventManager.addListener(this._listener, this);
        this._cb = callback;
        return true;
    },

    onTouchEnd : function(touches, event){
        this.set_release(true);
        if(this._cb)
            this._cb();
        return true;
    },

    onEnter: function(){
        this._super();
        this.transIn(N_TRANS_IN_ANI, N_TRANS_IN_TIEM, {
            ease: N_TRANS_IN_EASE
        });
    }
});

function createSkillNoteBox(parent, msg, callback){
    var pRet = new skillnoteBox(parent);
    if (pRet && pRet.init(msg, callback)){
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