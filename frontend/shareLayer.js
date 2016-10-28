
function getNextShareInfo(){
    var shareInfo = {};
    shareInfo.hasGem = 0;
    shareInfo.hint = "";

    if(!tj.mainData.main.hasOwnProperty("share") || !tj.mainData.main.hasOwnProperty("shared_time")){
        return shareInfo;
    }
    shareInfo.addGem = tj.mainData.main.share.Gems;

    var tt = new Date(tj.mainData.main.shared_time);

    var nextDay = new Date();
    nextDay.setTime(tt.getTime());
    nextDay.setHours(0);
    nextDay.setMinutes(0);
    nextDay.setSeconds(0);
    nextDay.setTime(nextDay.getTime()+24*60*60*1000);

    var currentTime = new Date().getTime();
    if(currentTime <= nextDay.getTime()){
        var remainSeconds = (nextDay.getTime()-currentTime)/1000;
        var h = Math.floor(remainSeconds/3600);
        var m = Math.floor((remainSeconds-h*3600)/60);
        var s = Math.floor(remainSeconds-h*3600-m*60);
        var hint = "";
        if(h > 0){
            hint = h + tj.cfg.get("text_on_ui/share/time/h");
        }
        if(m > 0){
            hint = hint + m + tj.cfg.get("text_on_ui/share/time/m");
        }
        if(s > 0){
            hint = hint + s + tj.cfg.get("text_on_ui/share/time/s");
        }
        shareInfo.hasGem = 0;
        shareInfo.hint = hint;
    }else{
        shareInfo.hasGem = 1;
    }
    return shareInfo;
};

var shareLayer = baseLayer.extend({
    ctor : function(parent,f){
        this._super();
        this._cb = f;
        this._basename = "shareLayer";
    },

    init : function(){
        if (!this._super())
            return false;
        this._ui = this.load_ui("boxShare.json");
        if (this._ui == -1)
            return true;
        if (!this._ui)
            return false;
        this.addChild(this._ui);

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

        // 禁用BG层，才能使本层接收得到触摸事件
        WidgetDig(this._ui, "BG").setTouchEnabled(false);

        WidgetDig(this._ui, "class/btnFacebook").setVisible(false);

        WidgetDig(this._ui, "class/btnWeixin/text").setString(tj.cfg.get("text_on_ui/share/wechat"));
        WidgetDig(this._ui, "class/btnWeibo/text").setString(tj.cfg.get("text_on_ui/share/weibo"));
        WidgetDig(this._ui, "class/btnQQ/text").setString(tj.cfg.get("text_on_ui/share/qq"));
        WidgetDig(this._ui, "class/btnClosed/text").setString(tj.cfg.get("text_on_ui/close"));

        formation(WidgetDig(this._ui, "class"),20,"center");

        var shareInfo = getNextShareInfo();
        var hintText = WidgetDig(this._ui, "text");
        hintText.setString("");
        if(shareInfo.hasGem == 1){
             hintText.setVisible(false);
        }else{
            hintText.setVisible(true);
            if(shareInfo.hasOwnProperty("addGem")) {
                hintText.setString(tj.cfg.get("text_on_ui/share/time/hint").format(shareInfo.hint, shareInfo.addGem));
            }
        }

        return true;
    },


    defaultTouchButton : function(btn, type){
        if (type == ccui.Widget.TOUCH_ENDED) {
            if(this._cb){
                this._cb(btn.getName());
            }
            this.set_release();
        }
    },

    onTouchMoved : function(touch,event){
    },

    onTouchEnd : function(touch,event){
        this.set_release();
    }

});

function createShareLayer(parent,f){
    var pRet = new shareLayer(parent,f);
    if (pRet && pRet.init()){
        var z = -1;
        var childs = parent.getChildren();
        for(var i = 0; i < childs.length; ++i){
            if (childs[i].getLocalZOrder() > z)
                z = childs[i].getLocalZOrder();
        }
        pRet.setLocalZOrder(z+1);
        pRet._tjParent = parent;
        parent.addChild(pRet);
        return pRet;
    }else if (pRet)
        delete pRet;
    return null;
};
