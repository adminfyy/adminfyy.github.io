
var portrait_icon_pre_path = "ui/icon/heros/";
var portrait_icon_default_path = portrait_icon_pre_path + "default.png";

var photoSetLayer = baseLayer.extend({

    _photos:null,
    _photoList:null,
    _photoTemplate:null,
    _allPhotos:null,

    ctor : function(parent,f){
        this._super();
        this._cb = f;
        this._basename = "photoSetLayer";
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

        WidgetDig(this._ui, "statistics").setVisible(false);
        WidgetDig(this._ui, "portraits").setVisible(false);
        WidgetDig(this._ui, "set/btnClosed/text").setString(tj.cfg.get("text_on_ui/close"));

        this._photoList = WidgetDig(this._ui, "photo/list");
        this._photoTemplate = WidgetDig(this._ui,"photo/list/template");
        this._photoList.removeChild(this._photoTemplate);

        this._photos = [];
        var commonPhotos = tj.dbdata.getbysql("portrait","where (unlockDefault == 1)");
        if(commonPhotos && commonPhotos.length > 0) {
            for (var i in commonPhotos) {
                this._photos.push(commonPhotos[i].id);
            }
        }
        if(tj.mainData.main.hasOwnProperty("portraits")) {
            var unlockPhotos = tj.mainData.main.portraits;
            if(unlockPhotos && unlockPhotos.length > 0){
                for(var i in unlockPhotos){
                    this._photos.push(unlockPhotos[i]);
                }
            }
        }

        this._allPhotos = tj.dbdata.gettable("portrait");
        if(this._allPhotos.length > 0){
            for(var i in this._allPhotos){
                var item = this._allPhotos[i];
                item.isUnlock = false;
                if(this.isUnlockPhoto(item.id)){
                    item.isUnlock = true;
                }
            }
        }

        if(this._allPhotos.length > 0){
            // 按照id从低到高排序
            this._allPhotos.sort(function(a,b){
                if(typeof(a.id) == "string"){
                    a.id = parseInt(a.id);
                }
                if(typeof(b.id) == "string"){
                    b.id = parseInt(b.id);
                }
                return a.id > b.id;
            });

            // 去除重复
            var filterResult = [];
            for(var i in this._allPhotos){
                var item = this._allPhotos[i];
                if(filterResult.indexOf(item) == -1){
                    filterResult.push(item);
                }
            }
            this._allPhotos = filterResult;
        }

        this.refreshUI();

        return true;
    },

    isUnlockPhoto : function(pId){
        if(this._photos.length <= 0){
            return false;
        }
        for(var i in this._photos){
            if(this._photos[i] == pId){
                return true;
            }
        }
        return false;
    },

    refreshUI : function(){
        if(this._allPhotos.length <= 0){
            return;
        }

        var tempalte = null;
        for(var i in this._allPhotos){
            if(i%4 == 0){
                tempalte = this._photoTemplate.clone();
                this._photoList.pushBackCustomItem(tempalte);
            }
            var itemInfo = this._allPhotos[i];
            if(!itemInfo){
                continue;
            }
            var index = i%4+1;
            var path = portrait_icon_pre_path + itemInfo.icon;
            if(path == "ui/icon/heros/jinglingfashi.png.png"){
                continue;
            }
            var btn = WidgetDig(tempalte,"btnMain"+index);

            btn.iconPath = path;
            btn.iconId = itemInfo.id;
            WidgetDig(btn,"portraits/icon").loadTexture(path,ccui.Widget.PLIST_TEXTURE);
            WidgetDig(btn,"portraits/textName").setString(itemInfo.name);

            btn.cascadeColor = true;
            WidgetDig(btn, "portraits").cascadeColor = true;
            if(itemInfo.isUnlock){
                btn.setEnabled(true);
                btn.setColor(cc.color("#FFFFFF"));
            }else {
                btn.setEnabled(false);
                btn.setColor(cc.color("#808080"));
                WidgetDig(btn,"portraits/textName").setString(tj.cfg.get("text_on_ui/portrait/lock"));
            }

            // 隐藏无用的头像按钮
            if(i == this._allPhotos.length-1 && index < 4){
                for(var j=index+1;j<=4;j++){
                    WidgetDig(tempalte,"btnMain"+j).setVisible(false);
                }
            }
        }
    },

    defaultTouchButton : function(btn, type){
        if (type == ccui.Widget.TOUCH_ENDED) {
            switch(btn.getName()){
                case "btnClosed":
                    this.set_release();
                    break;
                case "btnMain1":
                case "btnMain2":
                case "btnMain3":
                case "btnMain4":
                    if(this._cb){
                        this._cb(btn.iconId,btn.iconPath);
                    }
                    this.set_release();
                    break;
                default:
                    break;
            }
        }
    }

});

function createPhotoSetLayer(parent,f){
    var pRet = new photoSetLayer(parent,f);
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
}
