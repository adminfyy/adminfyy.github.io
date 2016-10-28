
var personalInfoLayer = baseLayer.extend({

    _datas:null,

    _nickText:null,
    _nickBG:null,
    _infoScrollView:null,
    _infoText:null,
    _photoImage:null,

    ctor : function(parent,datas){
        this._super();
        this._basename = "personalInfoLayer";
        this._datas = datas;
    },

    init : function(){
        if (!this._super())
            return false;
        this._ui = this.load_ui("uiSetPhoto.json");
        if (this._ui == -1)
            return true;
        if (!this._ui)
            return false;
        this.addChild(this._ui);

        WidgetDig(this._ui, "photo").setVisible(false);
        WidgetDig(this._ui, "set/btnClosed/text").setString(tj.cfg.get("text_on_ui/close"));

        this._infoScrollView = WidgetDig(this._ui, "statistics");
        this._infoText = WidgetDig(this._ui, "statistics/text");
        this._infoText.setString("");
        this._photoImage = WidgetDig(this._ui, "portraits/btnMain/icon");

        return true;
    },

    onEnter : function(){
        this._super();
        this._nickText = WidgetDig(this._ui, "portraits/btnMain/textName");
        this._nickBG = WidgetDig(this._ui, "portraits/btnMain/BG");
        this._nickBG.setVisible(false);
        this._nickText.setVisible(false);
        if(tj.mainData.nick != undefined && tj.mainData.nick != ""){
            this._nickBG.setVisible(true);
            this._nickText.setVisible(true);
            this._nickText.setString(tj.mainData.nick);
        }

        // 默认头像
        this._photoImage.loadTexture(portrait_icon_default_path, ccui.Widget.PLIST_TEXTURE);

        if(tj.mainData.main.hasOwnProperty("portrait")){
            var portrait = tj.mainData.main.portrait;
            if(portrait){
                var itemInfo = tj.dbdata.getrow("portrait",portrait);
                if(itemInfo && itemInfo.icon){
                    this._photoImage.loadTexture(portrait_icon_pre_path + itemInfo.icon, ccui.Widget.PLIST_TEXTURE);
                }
            }
        }

        this.initUI();
        tj.wsconnection.addGrp(msgac["Change_portrait"], msgac["Change_portrait"], this.process_ac.bind(this), this.get_scene_name());
    },

    photoSetCallback : function(iconId,iconPath){
        if(this._photoImage && iconId){
            if(iconPath) {
                this._photoImage.loadTexture(iconPath, ccui.Widget.PLIST_TEXTURE);
            }
            tj.mainData.main.portrait = iconId;
            tj.wsconnection.setMsg(msgac["Change_portrait"], {"id":iconId});
        }
    },

    process_ac : function(doc) {
        var msg_id = doc[0];
        var data = doc[1];
        switch (msg_id) {
            case msgac["Change_portrait"]:
                if(data.ret != 0){
                    // 头像设置失败
                    tj.mainData.main.portrait = 0;
                }
                break;
            default:
                break;
        }
    },

    defaultTouchButton : function(btn, type){
        if (type == ccui.Widget.TOUCH_ENDED) {
            switch (btn.getName()){
                case "btnClosed":
                    this.set_release();
                    break;
                case "btnMain":
                    createPhotoSetLayer(this,this.photoSetCallback.bind(this));
                    break;
                default :
                    break;
            }
        }
    },

    initUI: function(doc) {
        var data = this._datas;
        if(!data){
            return;
        }
        var str = "";
        str += tj.cfg.get("text/statistics/cut_tree_times") + " :   " + (parseInt(data["cut_tree_times"]) + parseInt(tj._cut_tree)) + "\n";
        str += "\n";

        str += tj.cfg.get("text/statistics/all_dead_times") + " :   " + data["all_dead_times"] + "\n";
        str += tj.cfg.get("text/statistics/starve_times") + " :   " + data["starve_times"] + "\n";
        str += tj.cfg.get("text/statistics/arena_times") + " :   " + data["arena_times"] + "\n";
        str += tj.cfg.get("text/statistics/back_times") + " :   " + data["back_times"] + "\n";
        str += tj.cfg.get("text/statistics/mon_kill") + " :   " + data["mon_kill"] + "\n";
        str += "\n";

        str += tj.cfg.get("text/statistics/exp_add") + " :   " + data["exp_add"] + "\n";
        str += tj.cfg.get("text/statistics/coin_add") + " :   " + data["coin_add"] + "\n";
        str += "\n";
        
        str += tj.cfg.get("text/statistics/move_steps") + " :   " + data["move_steps"] + "\n";
        str += tj.cfg.get("text/statistics/most_damage") + " :   " + data["most_damage"] + "\n";
        str += tj.cfg.get("text/statistics/most_power") + " :   " + data["most_power"] + "\n";
        str += "\n";


        if(data.hasOwnProperty("reg_time")){
            var t = new Date(data["reg_time"]);
            var hint = "%s/%s/%s".format(t.getUTCFullYear(), t.getMonth()+1,t.getDate());
            hint = hint + " ";
            var h = t.getHours();
            hint = hint + (h>9?h:"0"+h) + ":";
            var m = t.getMinutes();
            hint = hint + (m>9?m:"0"+m) + ":";
            var s = t.getSeconds();
            hint = hint + (s>9?s:"0"+s);

            str += tj.cfg.get("text/statistics/reg_time") + " :   " + hint  + "\n";
        }

        if(data.hasOwnProperty("online_time")){
            var onLine = data["online_time"];
            if(onLine > 0){
                var h = Math.floor(onLine/3600);
                var m = Math.floor((onLine-h*3600)/60);
                var hint = "";
                if(h > 0){
                    hint = h + tj.cfg.get("text_on_ui/share/time/h");
                }
                if(m > 0){
                    hint = hint + m + tj.cfg.get("text_on_ui/share/time/m");
                }
                str += tj.cfg.get("text/statistics/online_time") + " :   " + hint + "\n";
            }
        }

        if(data.hasOwnProperty("average_tiem")){
            var dayTime = data["average_tiem"];
            if(dayTime > 0){
                var h = Math.floor(dayTime/3600);
                var m = Math.floor((dayTime-h*3600)/60);
                var hint = "";
                if(h > 0){
                    hint = h + tj.cfg.get("text_on_ui/share/time/h");
                }
                if(m > 0){
                    hint = hint + m + tj.cfg.get("text_on_ui/share/time/m");
                }
                str += tj.cfg.get("text/statistics/day_time") + " :   " + hint + "\n";
            }
        }
            
        var h = getTextHeightWithWidget(this._infoText,str);
        if(h <= this._infoScrollView.getContentSize().height){
            h = this._infoScrollView.getContentSize().height;
        }
        var size = this._infoText.getContentSize();
        var container = this._infoScrollView.getInnerContainer();
        container.setContentSize(size.width,h);

        this._infoText.setPositionY(h);
        this._infoText.setContentSize(size.width,h);
        this._infoScrollView.jumpToPercentVertical(0);
        this._infoText.setVisible(true);
        
        this._infoText.setString(str);
    }

});

function createPersonalInfoLayer(parent,datas){
    var pRet = new personalInfoLayer(parent,datas);
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
