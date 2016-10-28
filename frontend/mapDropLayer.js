
var mapDropLayer_mapId = 0;

var mapDropLayer = baseLayer.extend({

    _localText : null,

    _equipList : null,
    _equipItem : null,
    _pageInfo : null,
    _currentPage : 0,   // 当前页面，从0开始
    _maxPage : 0,

    ctor : function(parent){
        this._super();
        this._basename = "mapDropLayer";
        this._currentPage = 0;
        this._maxPage = 0;
    },

    init : function(){
        if (!this._super())
            return false;

        this._ui = this.load_ui("boxDrop.json");
        if (this._ui == -1)
            return true;
        if (!this._ui)
            return false;
        this.addChild(this._ui);

        this.initUI();

        return true;
    },

    initUI : function(){
        this._localText = tj.cfg.get("drop");

        var titleText = WidgetDig(this._ui,"main/title/text");
        var mapName = tj.dbdata.getValueById("mapunlock",mapDropLayer_mapId , "name");
        titleText.setString(this._localText.title.format(mapName));

        this._pageInfo = WidgetDig(this._ui,"main/class/text");
        this._pageInfo.setString(this._localText.pageInfo.format(this._currentPage,this._maxPage));
        WidgetDig(this._ui,"set/btnClosed/text").setString(tj.cfg.get("text_on_ui/close"));

        this._equipList = WidgetDig(this._ui,"main/list");
        this._equipItem = WidgetDig(this._ui,"main/list/template");
        this.setRetain(this._equipItem, "uitmpl");
        this._equipList.removeAllChildren();

    },

    onEnter : function(){
        this._super();

        tj.wsconnection.addGrp(msgac["Map_equip_get_list"], msgac["Map_equip_get_list"], this.process_ac.bind(this), this.get_scene_name());
        tj.wsconnection.addGrp(msgac["Map_equip_get_info"], msgac["Map_equip_get_info"], this.process_ac.bind(this), this.get_scene_name());

        tj.wsconnection.setMsg(msgac["Map_equip_get_list"],{"page":0});
    },

    process_ac: function (doc) {
        var msg_id = doc[0];
        var data = doc[1];
        switch (msg_id) {
            case msgac["Map_equip_get_list"]:
                if(data.ret == 0) {
                    this._currentPage = data.page;
                    this._maxPage = data.max;
                    this._pageInfo.setString(this._localText.pageInfo.format(this._currentPage+1,this._maxPage));
                    this.refreshList(data.list);
                }else if(data.ret == 1){
                    this.noticetext_add(this._localText.mapError);
                }else{
                    this.noticetext_add(this._localText.pageError+data.ret);
                }
                break;
            case msgac["Map_equip_get_info"]:
                if(data.ret == 0){
                    tj.mainData.addEquipInfo2(data.info);
                    this._curr_popLayer = createNoteBoxCard(this, data.info.id, box_card_from_t.map_drop,null,{"swallow":true});
                }else{
                    this.noticetext_add(this._localText.euqipError+data.ret);
                }
                break;
            default :
                break;
        }
    },

    refreshList : function(datas){
        this._equipList.jumpToPercentVertical(0);
        this._equipList.removeAllChildren(true);

        for(var i in datas){
            var item = datas[i];
            var itemUI = this._equipItem.clone();
            this._equipList.pushBackCustomItem(itemUI);
            var itemBtn = WidgetDig(itemUI,"btnMain");
            var equipInfo = tj.dbdata.getrow("equipattribute",item.eid);

            WidgetDig(itemBtn,"text/textName").setString(equipInfo.name);
            WidgetDig(itemBtn,"text/textTime").setString(item.t);
            WidgetDig(itemBtn,"text/textMaster").setString(item.nick);

            WidgetDig(itemBtn,"portraits/star").setVisible(false);
            WidgetDig(itemBtn,"portraits/icon").loadTexture("ui/icon/equip/"+equipInfo.icon, ccui.Widget.PLIST_TEXTURE);
            var frameicon = "ui/icon/iconLevel" + equipInfo.proficiency + ".png";
            if(frameicon)
                WidgetDig(itemBtn,"portraits/level").loadTexture(frameicon, ccui.Widget.PLIST_TEXTURE);

            itemBtn.onlyId = item.id;
        }
    },

    defaultTouchButton : function(btn, type){
        if (type == ccui.Widget.TOUCH_ENDED) {
            switch(btn.getName()){
                case "btnMain":
                    var equip = tj.mainData.getEquipByid(btn.onlyId);
                    if(equip){
                        this._curr_popLayer = createNoteBoxCard(this,btn.onlyId, box_card_from_t.map_drop,null,{"swallow":true});
                    }else {
                        tj.wsconnection.setMsg(msgac["Map_equip_get_info"], {"id": btn.onlyId});
                    }
                    break;
                case "btnUp": // 上一页
                    if(this._currentPage > 0){
                        this._currentPage--;
                        tj.wsconnection.setMsg(msgac["Map_equip_get_list"],{"page":this._currentPage});
                    }
                    break;
                case "btnDown": // 下一页
                    if(this._currentPage < this._maxPage-1){
                        this._currentPage++;
                        tj.wsconnection.setMsg(msgac["Map_equip_get_list"],{"page":this._currentPage});
                    }
                    break;
                case "btnClosed":
                    this.set_release();
                    break;
                default :
                    break;
            }
        }
    }

});

function createMapDropLayer(parent){
    var pRet = new mapDropLayer(parent);
    if (pRet && pRet.init()){
        pRet._tjParent = parent;
        parent.addChild(pRet);
        return pRet;
    }else if (pRet)
        delete pRet;
    return null;
};
