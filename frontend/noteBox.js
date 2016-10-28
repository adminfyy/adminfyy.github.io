/**
 * Created by likx on 2015/12/21.
 */

var form_t = {"castleLayer":1,"other":2,"skill":3,"main":4, "mail":5, "manor":6, "arena": 7, "statistics": 8, "tips":9};

var noteBox = baseLayer.extend({
    _cb:null,

    ctor : function(parent){
        this._super();
        this._basename = "notebox";
        this._beTop = false;
    },

    init : function(msg, type, callback) {
        if (!this._super())
            return false;

        if(!msg)
            return false;

        this._ui = this.load_ui("boxText.json");
        if (!this._ui)
            return false;
        this.addChild(this._ui);
        this.setGlobalZOrder(2);

        this._cb = callback;

        this._uiText = WidgetDig(this._ui, "box/text");
        WidgetDig(this._ui, "box").setTouchEnabled(false);
        WidgetDig(this._ui, "box/text").setTouchEnabled(false);
        WidgetDig(this._ui, "box/BG").setTouchEnabled(false);

        this._listener = cc.EventListener.create({
            event           : cc.EventListener.TOUCH_ONE_BY_ONE,
            target          : this,
            swallowTouches  : false,
            onTouchBegan    : function (touch, event) {
                return true;
            }.bind(this),
            onTouchEnded    : this.onTouchEnd.bind(this),
            onTouchMoved    : this.onTouchMoved.bind(this)
        });
        cc.eventManager.addListener(this._listener, this);

        switch(type) {
            case form_t.castleLayer:
                this._uiText.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
                this._uiText.setTextVerticalAlignment(cc.TEXT_ALIGNMENT_CENTER);
                this.transIn(N_TRANS_IN_ANI, N_TRANS_IN_TIEM, {
                    ease: N_TRANS_IN_EASE
                });
                break;
            case form_t.mail:
                this._listener.setSwallowTouches(true);
                this.setContentString(this._uiText, msg, AUTO_STR_NEWLINE);
                var size = this._uiText.getContentSize();
                WidgetDig(this._ui, "box/BG").setSize(cc.size(size.width + 50,size.height + 50));
                this._uiText.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
                this._uiText.setTextVerticalAlignment(cc.TEXT_ALIGNMENT_CENTER);
                return true;
            case form_t.statistics:
                this._listener.setSwallowTouches(true);
                this._uiText.setFontSize(28);
                this.setContentString(this._uiText, msg, AUTO_STR_NEWLINE);
                var size = this._uiText.getContentSize();
                WidgetDig(this._ui, "box/BG").setSize(cc.size(size.width + 50,size.height + 100));
                this._uiText.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
                this._uiText.setTextVerticalAlignment(cc.TEXT_ALIGNMENT_CENTER);
                return true;
            case form_t.other:
                this._uiText.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
                this._uiText.setTextVerticalAlignment(cc.TEXT_ALIGNMENT_CENTER);
                break;
            case form_t.skill:
                //var s0 = msg;
                //var ma = "\n";
                //var p = s0.indexOf(ma);
                //var num = 0;
                //while(p>0){
                //    num++;
                //    s0 = s0.substring(p + ma.length+1);
                //    p = s0.indexOf(ma);
                //}
                //var ImgHeight = (num-1)*40 + 120;
                //WidgetDig(this._ui, "box/BG").setSize(cc.size(380,ImgHeight));
                //this._uiText.setContentSize(cc.size(this._uiText.getContentSize().width,ImgHeight));
                this._uiText.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
                this._uiText.setTextVerticalAlignment(cc.TEXT_ALIGNMENT_CENTER);
                this.transIn(N_TRANS_IN_ANI, N_TRANS_IN_TIEM, {
                    ease: N_TRANS_IN_EASE
                });
                break;
            case form_t.main:
                this._uiText.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
                this._uiText.setTextVerticalAlignment(cc.TEXT_ALIGNMENT_CENTER);
                this._uiText.setString(msg);
                break;
            case form_t.manor:
                this._uiText.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
                this._uiText.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                break;
            case form_t.arena:
                this._uiText.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
                this._uiText.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                this.transIn(N_TRANS_IN_ANI, N_TRANS_IN_TIEM, {
                    ease: N_TRANS_IN_EASE
                });
                break;
            case form_t.tips:
                this._listener.setSwallowTouches(true);
                this._uiText.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
                this._uiText.setTextVerticalAlignment(cc.TEXT_ALIGNMENT_CENTER);
                this.transIn(N_TRANS_IN_ANI, N_TRANS_IN_TIEM, {
                    ease: N_TRANS_IN_EASE
                });
                break;
            default:
                break;
        }

        var lineinfo = this.setContentString(this._uiText, msg, AUTO_STR_NEWLINE);
        if(lineinfo.count > 1)
            lineinfo.count++;
        var rowheight = lineinfo.height * lineinfo.count + lineinfo.count * 5;
        var ImageWidth = WidgetDig(this._ui, "box/BG").getContentSize().width;
        WidgetDig(this._ui, "box/BG").setSize(cc.size(ImageWidth,rowheight + 30));
        this._uiText.setContentSize(cc.size(this._uiText.getContentSize().width,rowheight));

        return true;
    },

    autoContentSize:function(msg){
        var totalLength = msg.length;
        var s0 = msg;
        var ma = "\n";
        var p = s0.indexOf(ma);
        var enter_num = 0;
        while(p>=0){
            enter_num++;
            s0 = s0.slice(p+1);
            p = s0.indexOf(ma);
        }

        var imageHeightRow = Math.floor(Math.abs(totalLength)/tj.cfg.get("designdata/configNum/noteLine")) + enter_num;
        var ImgHeight = (imageHeightRow-1)*40 + 90;
        if(totalLength <= 17)
            ImgHeight = 70;

        var ImageWidth = WidgetDig(this._ui, "box/BG").getContentSize().width;
        if(imageHeightRow == 0){
            var s = this._uiText.getFontSize();
            ImageWidth = s * msg.length + 120;
        }

        WidgetDig(this._ui, "box/BG").setSize(cc.size(ImageWidth,ImgHeight));
        this._uiText.setContentSize(cc.size(this._uiText.getContentSize().width,ImgHeight));
    },

    onTouchMoved : function(touches, event){
        this.set_release();
        if(this._cb)
            this._cb();
    },

    onTouchEnd : function(touches, event){
        this.set_release();
        if(this._cb)
            this._cb();
    },

    onEnter: function(){
        this._super();
    },

    setPos:function(posx, posy){
        WidgetDig(this._ui, "box").setPosition(posx, posy);
    }
});

function createNoteBox(parent, msg, type, callback){
    var pRet = new noteBox(parent);
    if (pRet && pRet.init(msg, type, callback)){
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

function createNoteBox2(parent, msg, type, callback){
    var pRet = new noteBox(parent);
    if (pRet && pRet.init(msg, type, callback)){
        pRet.setLocalZOrder(0);
        pRet._tjParent = parent;
        parent.addChild(pRet);
        return pRet;
    } else if (pRet)
        delete pRet;
    return null;
};