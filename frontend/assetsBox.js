/**
 * Created by likx on 2016/2/25.
 */

var RES_PATH = "res/art/";
/**@const */ var o_button = "[object Button]";
/**@const */ var o_text = "[object Text]";

/**
 * 逐级获取相应控件
 * @param {ccui} widget起始节点
 * @param {String} path资源路径
 * @returns
 */
function WidgetDig(widget, path) {
    if (!widget)
        return 0;
    paths = path.split("/");
    if (paths.length == 0){
        cc.assert("get widget path error:" + path);
    } else {
        var obj = widget;
        for(var i = 0; i < paths.length; i++){
            if(!obj)
                return null;
            obj = obj.getChildByName(paths[i]);
        }
        return obj;
    }
};

/**
 * String对象的格式化功能
 */
String.prototype.format = function(){
    var args = arguments;
    str = this;
    for(var x in args) {
        str = str.replace(/\%(\w)/,args[x]);
    }
    return str;
};

var assetsBoxLayer = cc.Layer.extend({
    _basename:"assetsBox",
    _btn_texts : [],
    _url:null,
    _released:false,  //标记本layer是否已经被移除

    _moveCount : 0,

    ctor: function (f) {
        this._super();
        this._cb = f;
        this._btn_texts = [];
        this._url = null;
        this._moveCount = 0;
        this.bind()
    },

    get_scene_name:function(){
        return this._basename;
    },

    //初始化
    init: function (str, type) {
        if (!this._super()) {
            return false;
        }
        this._ui = this.load_ui("uiUpdate.json");

        if(!this._ui){
            cc.log("assetsBoxLayer load_ui failed!");
            return false;
        }
        this.addChild(this._ui);

        var uiMain = WidgetDig(this._ui, "main");
        WidgetDig(this._ui, "BG").setTouchEnabled(false);
        WidgetDig(this._ui, "main").setTouchEnabled(false);
        var uiText = WidgetDig(this._ui, "main/text");

        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            target          : uiText,
            swallowTouches  : false,
            onTouchBegan: function (touch, event) {
                this._moveCount = 0;
                return true;
            }.bind(this),
            onTouchMoved : this.onTouchMoved.bind(this),
            onTouchEnded:this.onTouchEnd.bind(this)
        });
        cc.eventManager.addListener(listener, uiText);

        this._p_xuanxiang = WidgetDig(this._ui, "main/list");
        this._tmpl = WidgetDig(this._ui, "main/list/btnOption");
        if (!this._tmpl)
            return false;

        this._tmpl.retain();
        this._tmpl.removeFromParent(true);
        var msg = WidgetDig(this._ui,"main/text/text");
        if (!msg)
            return false;

        var scrollBar = WidgetDig(this._ui, "main/text");
        if(scrollBar && scrollBar.hasOwnProperty("setScrollBarEnabled"))
            scrollBar.setScrollBarEnabled(false);

        // 调整文本内容与滚动区域相适应
        var h = this.getTextHeightWithWidget(msg,str);
        if(h <= scrollBar.getContentSize().height){
            h = scrollBar.getContentSize().height;
        }
        var size = msg.getContentSize();
        var container = scrollBar.getInnerContainer();
        container.setContentSize(container.getContentSize().width,h);
        msg.setPositionY(h);
        msg.setContentSize(size.width,h);
        scrollBar.jumpToPercentVertical(0);

        msg.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
        //msg.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_TOP);
        msg.setString(str);

        if (type == 1) {
            if (!this.add_btn(CFGJSON.get("text_on_ui/ok")))
                return false;
        } else if (type == 2){
            if (!this.add_btn(CFGJSON.get("text_on_ui/ok")))
                return false;
            if (!this.add_btn(CFGJSON.get("text_on_ui/cancel")))
                return false;
        }else if(type == 3){
            if (!this.add_btn(CFGJSON.get("pay/payText")))
                return false;
            if (!this.add_btn(tj.cfg.get("text_on_ui/close")))
                return false;
        }else if(type == 4){
            if (!this.add_btn(tj.cfg.get("text_on_ui/close")))
                return false;
        }

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

        var patt = RegExp(/<(http:\/\/.*)>/);
        var pp = patt.exec(str);
        if (pp && pp.length >=2)
            this._url = pp[1];

        return  true;
    },

    onTouchMoved : function(){
        this._moveCount++;
    },

    onTouchEnd : function(pTouch, pEvent) {
        if(this._moveCount >= 5){
            return;
        }
        try{
            if(this._url){
                cc.loader.loadJs("src/sdk/SDKTools.js");
                cc.loader.loadJs("src/sdk/SysUtil.js");
                SysUtil.hyperLink(this._url);
            }
        }catch (e) {
            cc.log("baseLayer::load_scene :" + e);
            tj.sendErrLog(e, this.get_scene_name()+".onTouchEnd: "+ e.message, ['url:' + this._url]);
        }
    },

    getTextHeightWithWidget : function(widget,str){
        if(!widget){
            return 0;
        }
        var temp = widget.clone();
        var lineinfo = this.setContentString(temp,str);

        var font = widget.getFontName();
        var fontsize = widget.getFontSize();
        if (!str || !widget) {
            return 0;
        }
        var _txt = new cc.LabelTTF();
        _txt.setFontName(font);
        _txt.setFontSize(fontsize);
        _txt.setString(str);
        _txt._setBoundingWidth(widget.getContentSize().width);
        var h =_txt.getContentSize().height;
        _txt = null;

        var ph = lineinfo.height*lineinfo.count;

        return Math.max(h,ph);
    },

    setContentString: function (text, string) {
        var strarr = string.split("\n");
        var olds = text.getContentSize();
        text.ignoreContentAdaptWithSize(true);
        var theight = 0;
        var line = 0;
        text.setString(strarr[0] + "\nabc");
        var dline = text.getContentSize().height;
        for (var i in strarr) {
            text.setString(strarr[i]);
            var news = text.getContentSize();
            theight = theight < news.height ? news.height : theight;
            var mm = Math.ceil(news.width / olds.width);
            if(mm == 0)
                mm = 1;
            line += mm;
        }
        var lineheight = dline - theight;
        var lmargin = dline - 2 * lineheight;
        text.ignoreContentAdaptWithSize(false);
        text.setContentSize(cc.size(olds.width, lineheight * line + lmargin));
        text.setString(string);
        var lineinfo = {};
        lineinfo.height = lineheight;
        lineinfo.count = line;
        return lineinfo;
    },

    load_ui: function (ui_short_name) {
        var fname = RES_PATH + ui_short_name;
        if (!cc.loader.getRes(fname)) {
            res = [fname];
            cc.loader.load(res, function () {
                cc.log("asstesBoxLayer::load_ui : load ui json done!");
                this.init();
            }.bind(this));
            return -1;
        }
        var w = ccs._load(fname);
        var that = this;
        var travelnode = function (node, layer) {
            type = node._className;
            var str = node.toString();
            if (type == "Button" || str == o_button) {
                node.addTouchEventListener(layer.prv_defaultTouchButton, layer);
            }
            if (type == "Text" || str == o_text) {
                node.setFontName(CFGJSON.get("designdata/design_fontName"));
            }
            var childs = node.getChildren();
            for (var c in childs) {
                travelnode(childs[c], layer);
            }
        };
        if (w)
            travelnode(w, this);

        return w;
    },

    /**
     * 默认的按钮点击处理函数
     * @param {ccui.btn}                object
     * @param {ccui.Widget.Touchtype}    type
     */
    prv_defaultTouchButton: function (object, type) {
        var btn = object;
        var str = btn.toString();
        if (btn._className != "Button" && str != o_button) {
            return;
        }
        this.defaultTouchButton(btn, type);

    },

    defaultTouchButton: function (btn, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            if (this._cb(btn.getTag()))
                this.set_release();
        }
    },

    add_btn : function(txt, tag){
        tag = tag >= 0 ? tag : -1;
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
            var w_txt_size = w_txt.getTextAreaSize();
            w_txt_size.width = w.getContentSize().width * w.getScale() * 0.9;
            w_txt_size.height = 0;
            //w_txt.setTextAreaSize(w_txt_size);
            w_txt.setString(txt);
            if (w_txt.getContentSize().height > w.getContentSize().height * w.getScale() * 0.9)
                w_txt.setFontSize(w_txt.getFontSize() );
        }
        this._btn_texts.unshift(txt);
        return true;
    },

    set_release : function(){
        if(!this._released) {
            this._released = true;
            this.removeFromParent();
            this._tmpl.release();
        }
        G_AssetBox = null;
    }
});

var G_AssetBox = null;
function createAssetsBox(parent, str, f, type){
    //唯一化处理
    if (G_AssetBox) {
        G_AssetBox.set_release();
        G_AssetBox = null;
    }
    var pRet = new assetsBoxLayer(f);
    if (pRet && pRet.init(str, type)){
        var z = -1;
        var childs = parent.getChildren();
        for(var i = 0; i < childs.length; ++i){
            if (childs[i].getLocalZOrder() > z)
                z = childs[i].getLocalZOrder();
        }
        pRet.setLocalZOrder(9999999);
        parent.addChild(pRet);
        G_AssetBox = pRet;
        return pRet;
    }else if (pRet)
        delete pRet;
    return null;
};
