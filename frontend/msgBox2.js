
var MsgBox2 = baseLayer.extend({
    ctor : function(parent, msg, f, type){
        this._super();
        this._type = type;
        this._msg = msg;
        this._cb = f;
        this._btn_texts = [];
        this._ui  = null;
        this._tmpl = null;
        this._basename = "msgbox";
        this._beTop = false;
        this._forcetime = 0;
    },

    init : function(){
        if (!this._super())
            return false;
        this._ui = this.load_ui("uiApprove.json");
        if (!this._ui)
            return false;
        this.addChild(this._ui);
        this._p_xuanxiang = WidgetDig(this._ui, "list");
        this._tmpl = WidgetDig(this._ui, "list/btnOption");
        if (!this._tmpl)
            return false;
        // this._tmpl.retain();
        this.setRetain(this._tmpl, "uitmpl");
        this._tmpl.removeFromParent(true);
        var msg = WidgetDig(this._ui,"main/text");
        if (!msg)
            return false;

        //msg.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
        //msg.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_TOP);
        msg.setString(this._msg);//this._msg);
        if (this._type == 1) {
            if (!this.add_btn(tj.cfg.get("text_on_ui/ok")))
                return false;
        } else if (this._type == 2){
            if (!this.add_btn(tj.cfg.get("text_on_ui/ok")))
                return false;
            if (!this.add_btn(tj.cfg.get("text_on_ui/cancel")))
                return false;
        }else if(this._type == 3){
            if (!this.add_btn(tj.cfg.get("text_on_ui/ok")))
                return false;
            if (!this.add_btn(tj.cfg.get("text_on_ui/close")))
                return false;
        }
        self = this;

        return true;
    },

    setMsgHorizontalAlignment : function(type){
        if (this._ui === -1) {
            return;
        }
        var msg = WidgetDig(this._ui,"main/text");
        if (!msg) {
            return;
        }
        msg.setTextHorizontalAlignment(type);
    },

    add_btn : function(txt, tag, forcetime){
        tag = tag >= 0 ? tag : -1;
        //this._p_xuanxiang.addChild(this._tmpl);
        var w= this._tmpl.clone();
        if (!w)
            return false;
        this._p_xuanxiang.addChild(w);

        var size =  this._tmpl.getContentSize();
        w.setContentSize(size);


        w.setVisible(true);
        w.setTag(tag < 0 ? this._btn_texts.length : tag);
        var w_txt = WidgetDig(w, "text");
        if (w_txt){
            //if (this._custom_btn_font)
            //	w_txt.setFontName(this._custom_btn_font);
            //if (this._custom_btn_font_scale > 0)
            //	w_txt.setFontSize(w_txt.getFontSize * this._custom_btn_font_scale);
            var w_txt_size = w_txt.getTextAreaSize();
            w_txt_size.width = w.getContentSize().width * w.getScale() * 0.9;
            w_txt_size.height = 0;
            //w_txt.setTextAreaSize(w_txt_size);
            w_txt.setString(txt);
            if (w_txt.getContentSize().height > w.getContentSize().height * w.getScale() * 0.9)
                w_txt.setFontSize(w_txt.getFontSize() );
        }

        this._btn_texts.unshift(txt);

        if(forcetime){
            w.setEnabled(false);
            w_txt.setColor(cc.color.GRAY);
            var now = new Date();
            w.forcetime = forcetime;
            w.text = w_txt.getString();
            //this.schedule(function(){
            //    w.setEnabled(true);
            //    w_txt.setColor(cc.color.WHITE);
            //}.bind(this), forcetime, false);
        }
        //this._tmpl.removeFromParent(true);
        return true;
    },

    update:function(delta){
        this._super();
        var btns =  this._p_xuanxiang.getChildren();
        for(var w in  btns){
            var btn = btns[w];
            if (btn.forcetime > 0) {
                btn.forcetime -= delta;
                var txt = btn.text + " " + "(" + (Math.floor(btn.forcetime)+1) + ")";
                WidgetDig(btn, "text").setString(txt);
            }
            if (btn.forcetime && btn.forcetime<=0) {
                btn.setEnabled(true);
                WidgetDig(btn, "text").setColor(cc.color.WHITE);
                WidgetDig(btn, "text").setString(btn.text);
            }
        }

    },

    onExit: function () {
        this._super();

        if(this._tjParent)
            this._tjParent.onChildLayerRemove();
    },

    defaultTouchButton : function(btn, type){
        if (type == ccui.Widget.TOUCH_ENDED) {
            if (this._cb(btn.getTag()))
                this.set_release();
        }
    },

    reset : function(){
        this._btn_texts = [];
        //this.removeAllChildren(true);
    },
});

function createMsgBox2(parent, msg, f){
    var type = arguments[3] ? arguments[3] : 0;
    //if (Msg_Layer2){
    //    pRet = Msg_Layer2;
    //    pRet._msg = msg;
    //    pRet._cb = f;
    //    pRet._p_xuanxiang.removeAllChildren(true);
    //    //pRet._p_xuanxiang.addChild(pRet._tmpl);
    //    pRet.reset();
    //    var msgb = WidgetDig(pRet._ui,"main/text");
    //    if(msgb)
    //        msgb.setString(msg);
    //    if (type == 1) {
    //        if (!pRet.add_btn(tj.cfg.get("text_on_ui/ok", "")))
    //            return false;
    //    } else if (type == 2){
    //        if (!pRet.add_btn(tj.cfg.get("text_on_ui/ok", "")))
    //            return false;
    //        if (!pRet.add_btn(tj.cfg.get("text_on_ui/cancel", "")))
    //            return false;
    //    }
    //    pRet.setVisible(true);
    //    if (!pRet.getParent())
    //        parent.addChild(pRet);
    //    return pRet;
    //}
    var pRet = new MsgBox2(parent, msg, f, type);
    if (pRet && pRet.init()){
        //Msg_Layer2 = pRet;
        var z = -1;
        var childs = parent.getChildren();
        for(var i = 0; i < childs.length; ++i){
            if (childs[i].getLocalZOrder() > z)
                z = childs[i].getLocalZOrder();
        }
        pRet.setLocalZOrder(9999999);
        pRet._tjParent = parent;
        parent.addChild(pRet);
        return pRet;
    }else if (pRet)
        delete pRet;
    return null;
};/**
 * Created by likx on 2015/12/7.
 */
