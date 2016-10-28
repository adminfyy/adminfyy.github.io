/**
 * Created by likx on 2015/12/17.
 */

var select_t = {"bag" : 0, "food": 1, "valuable":2,"recast":3};

var selectBagLayer = baseLayer.extend({
    _ui: 0,
    _ui_list: null,
    _template: null,
    _cb: null,
    _bagc:0,
    _bagmax:0,
    _type:0,
    _auto_use_itemid:0,
    _btn_list:[],

    _help_pro:0,        //新手引导 烹饪 本地保存进度

    ctor: function (select_t) {
        this._super();
        this._basename = "selectbag";
        this._type = select_t;
        this._auto_use_itemid = 0;
        this._btn_list = [];
        this._help_pro = 0;
        this._push_item = null;
    },

    init: function (bagc,bagmax) {
        if (!this._super())
            return false;
        this._ui = this.load_ui("cardBag.json");
        if (!this._ui)
            return false;
        this.addChild(this._ui);
        this.create_control();

        this._template = WidgetDig(this._ui, "main/list/template");
        // this._template.retain();
        this.setRetain(this._template, "uitmpl");
        for(var i=1;i<=4;i++)
            WidgetDig(this._template, "btnMain"+i).setVisible(false);
        WidgetDig(this._ui, "main/list/template").removeFromParent(false);


        WidgetDig(this._ui, "set/btnClosed/text").setString(tj.cfg.get("text_on_ui/close"));
        WidgetDig(this._ui, "main/class/btnClear/text").setString(tj.cfg.get("text_on_ui/wareHouse/all"));
        WidgetDig(this._ui, "main/class/btnValuable/text").setString(tj.cfg.get("text_on_ui/wareHouse/valuable"));

        WidgetDig(this._ui, "main/class/btnValuable/lock").setVisible(false);
        WidgetDig(this._ui, "main/class/btnClear/lock").setVisible(false);

        this._ui_list = WidgetDig(this._ui,"main/list");

        if( this._type == select_t["bag"]) {
            this._bagc = bagc;
            this._bagmax = bagmax;
            tj.wsconnection.addGrp(msgac["Storage_drop"], msgac["Storage_drop"], this.process_ac.bind(this), this.get_scene_name());
        }
        else if(this._type == select_t.food){
            WidgetDig(this._ui, "main/text/textRight").setVisible(false);
            WidgetDig(this._ui, "main/class").setVisible(false);
            tj.wsconnection.addGrp(msgac["Map_camp_cook"], msgac["Map_camp_cook"], this.process_ac.bind(this), this.get_scene_name());
        }else if(this._type == select_t.recast){
            this._recastCb = bagc;
            WidgetDig(this._ui, "main/text/textRight").setVisible(false);
            WidgetDig(this._ui, "main/class").setVisible(false);
        }

        this.refresh_bag();
        this.refreshHelp();
        tj.wsconnection.addGrp(msgac["Bag_refresh_weight"], msgac["Bag_refresh_weight"], this.process_ac.bind(this), this.get_scene_name());
        tj.wsconnection.addGrp(msgac["Pick_food"], msgac["Pick_food"], this.process_ac.bind(this), this.get_scene_name());
        tj.wsconnection.addGrp(msgac["Pick_info"], msgac["Pick_info"], this.process_ac.bind(this), this.get_scene_name());
        tj.wsconnection.addGrp(msgac["Pick_done"], msgac["Pick_done"], this.process_ac.bind(this), this.get_scene_name());

        return true;
    },

    refreshHelp:function(){
        if(this._helphand)
            this._helphand.stop();

        var hc = tj.mainData.getClientData("help_camp");
        switch (hc) {
            case 3:
                WidgetDig(this._ui, "set/btnClosed").setEnabled(false);
                var btn = this._btn_list[0];
                if (btn) {
                    this.load_helphand(btn, "click");
                    this._helphand.setpos(60, 60);
                }
                break;
        }
        switch (this._help_pro ){
            case 1:
                var note = createNoteBox(this, tj.cfg.get("text/help/camp3"), form_t.castleLayer);
                note.setPos(375, 620);
                break;
            case 2:
                note = createNoteBox(this, tj.cfg.get("text/help/camp4"), form_t.castleLayer);
                note.setPos(375, 620);
                break;
        }
    },

    on_touch_Ended: function () {
        this._super();
        switch (this._help_pro ){
            case 1:
                this._help_pro = 2;
                this.refreshHelp();
                break;
            case 2:
                WidgetDig(this._ui, "set/btnClosed").setEnabled(true);
                break;
        }
    },

    update: function (dt) {
        this._super();
        if(this._push_item != null && this._auto_use_itemid == 0)
        {
            var btn = this._push_item;
            var time = this._push_time;
            var nowTime = new Date();
            var diff = nowTime - time;
            if(diff <= tj.cfg.get("designdata/configNum/noticeItemDel"))
                return;
            switch (btn.getName()){
                case "btnMain1":
                case "btnMain2":
                case "btnMain3":
                case "btnMain4":
                    this._auto_use_itemid = btn.itemID;
                    this.useFood(btn.itemID);
                    this._push_item = null;
                    this._push_time = 0;
                    WidgetDig(this._ui, "set/btnClosed").setEnabled(false);
                    WidgetDig(this._ui, "set/btnClosed/text").setColor(cc.color.GRAY);
                    break;
            }
        }
    },

    stop_autofood:function(){
        WidgetDig(this._ui, "set/btnClosed").setEnabled(true);
        WidgetDig(this._ui, "set/btnClosed/text").setColor(cc.color.WHITE);
        this._auto_use_itemid = 0;
    },

    refresh_bag:function(){
        this._ui_list.removeAllChildren();
        this._push_item = null;

        var tempList;
        if( this._type == select_t.bag){
            tempList = tj.mainData.main.bags;
            WidgetDig(this._ui, "main/class/btnClear").setHighlighted(true);
            WidgetDig(this._ui, "main/class/btnValuable").setHighlighted(false);
        }
        if( this._type == select_t.valuable){
            tempList = tj.mainData.getItemsByType(itemType.valuables);
            WidgetDig(this._ui, "main/class/btnClear").setHighlighted(false);
            WidgetDig(this._ui, "main/class/btnValuable").setHighlighted(true);
        }
        else if(this._type == select_t.food) {
            tempList = tj.mainData.getBagItemsByType(itemType.Food);
        }else if(this._type == select_t.recast){
            var equipIdList = tj.mainData.getStorage_equip();
            var recastEquips = {};
            for(var id in equipIdList) {
                var num = equipIdList[id];
                if (num <= 0)
                    continue;
                var itemid = parseInt(id);
                var iteminfo = tj.mainData.getEquipByid(itemid);
                if(iteminfo.Recasting == 1) {
                    recastEquips[id] = num;
                }
            }
            tempList = recastEquips;
        }

        var idx = 0;
        var v_muBan = null;
        for(var id in tempList) {
            var num = tempList[id];
            if (num <= 0)
                continue;

            if(idx%4 == 0){
                v_muBan = this._template.clone();
                this._ui_list.pushBackCustomItem(v_muBan);
            }

            var item_idx = idx % 4 + 1;
            var itemid = parseInt(id);
            var itemname = tj.mainData.getItemName(itemid);
            var btnMain = WidgetDig(v_muBan, "btnMain" + item_idx);
            btnMain.itemID = itemid;
            var textName = WidgetDig(btnMain, "portraits/textName");
            var textNum = WidgetDig(btnMain, "portraits/textNum");
            var uiIcon = WidgetDig(btnMain, "portraits/icon");
            WidgetDig(btnMain, "portraits/lock").setVisible(false);
            //this.setContentString(textName,itemname);
            if(itemname)
                textName.setString(itemname);
            textNum.setString("x"+num);
            var icon = tj.mainData.getItemIcon(itemid);
            if (icon)
                uiIcon.loadTexture(icon, ccui.Widget.PLIST_TEXTURE);
            var frameicon = tj.mainData.getItemFrameIcon(itemid);
            if(frameicon)
                WidgetDig(btnMain, "portraits/level").loadTexture(frameicon, ccui.Widget.PLIST_TEXTURE);
            btnMain.setVisible(true);
            this._btn_list.push(btnMain);
            idx++;
        }
        var textRight = WidgetDig(this._ui, "main/text/textRight");
        this.setContentString(textRight, tj.cfg.get("text_on_ui/hero/weight").format(this._bagc, this._bagmax));
    },

    process_ac : function(doc) {
        var msg_id = doc[0];
        var data = doc[1];
        switch (msg_id) {
            case msgac["Map_camp_cook"]:
                var ret = data.ret;
                switch (ret) {
                    case 0:
                        var id = data.id;
                        var num = data.num;
                        tj.mainData.subBagItem(id, num);
                        this.refresh_bag();
                        break;
                    case 1:
                        this.noticetext_add(tj.cfg.get("text/map/nocamping"));
                        break;
                    case 2:
                        this.noticetext_add(tj.cfg.get("text/warehouse/numIsNotRight"));
                        break;
                    case 3:
                        //this.noticetext_add(tj.cfg.get("text/map/noInmap"));
                        break;
                }
                break;
            case msgac["Bag_refresh_weight"]:
                if(data.hasOwnProperty("bagc"))
                    this._bagc = data.bagc;
                if(data.hasOwnProperty("bagmax"))
                    this._bagmax = data.bagmax;
                this.refresh_bag();
                break;
            case msgac["Pick_food"]:
                var itemname = tj.mainData.getItemName(data.id);
                createMainNoticeBox(itemname + "+" + data.num);
                tj.mainData.setItemNumToBag(data.id, data.sum);
                tj.wsconnection.pushmsg(msgac["Bag_refresh_weight"],{"bagc": data.curw, "bagmax":data.maxw});
                if(this._auto_use_itemid){
                    var num = tj.mainData.getBagItemNum(this._auto_use_itemid);
                    if(num)
                        this.useFood(this._auto_use_itemid);
                    else
                        this.stop_autofood();
                }
                break;
            case msgac["Pick_info"]:
                this.stop_autofood();
                break;
            case msgac["Pick_done"]:
                break;
        }
    },

    defaultTouchButton : function(btn, type) {
        if(type == ccui.Widget.TOUCH_BEGAN) {
            switch (btn.getName()) {
                case "btnMain1":
                case "btnMain2":
                case "btnMain3":
                case "btnMain4":
                    if(this._type == select_t.food){
                        if(tj.mainData.getClientData("help_camp") == 3)
                            break;
                        this._push_item = btn;
                        this._push_time = new Date();
                    }
                    break;
            }
        }else if(type == ccui.Widget.TOUCH_CANCELED){
            switch (btn.getName()) {
                case "btnMain1":
                case "btnMain2":
                case "btnMain3":
                case "btnMain4":
                    this._push_item = null;
                    this._push_time = 0;
                    break;
            }
        }else if (type == ccui.Widget.TOUCH_ENDED) {
            switch(btn.getName()){
                case "btnClosed":
                    this.set_release();
                    break;
                case "btnClear":
                    WidgetDig(this._ui, "main/class/btnClear").setHighlighted(true);
                    WidgetDig(this._ui, "main/class/btnValuable").setHighlighted(false);
                    if(this._type == select_t.bag)
                        break;
                    this._type = select_t.bag;
                    this.refresh_bag();
                    break;
                case "btnValuable":
                    WidgetDig(this._ui, "main/class/btnValuable").setHighlighted(true);
                    WidgetDig(this._ui, "main/class/btnClear").setHighlighted(false);
                    if(this._type == select_t.valuable)
                        break;
                    this._type = select_t.valuable;
                    this.refresh_bag();
                    break;
                case "btnMain1":
                case "btnMain2":
                case "btnMain3":
                case "btnMain4":
                    this._push_item = null;
                    this._push_time = 0;
                    if(this._auto_use_itemid)
                        break;
                    var itemid = btn.itemID;
                    if(this._type == select_t.bag || this._type == select_t.valuable)
                        this._curr_popLayer = createNoteBoxCard(this, itemid, box_card_from_t.bag);
                    else if(this._type == select_t.food){
                        this.useFood(itemid);
                        btn.setEnabled(false);
                    }else if(this._type == select_t.recast){
                        if(typeof(this._recastCb) == "function"){
                            var info = {};
                            info.itemId = itemid;
                            this._recastCb(info);
                            this.set_release();
                        }
                    }
                    break;
            }
        }
    },

    useFood:function(itemid){
        var time = tj.cfg.get("designdata/loadingbox_cook");
        var text = tj.cfg.get("text_on_ui/map/cooking");
        if(this._auto_use_itemid)
            text = tj.cfg.get("text_on_ui/map/autocooking");
        this._curr_popLayer = createLoadingBoxLayer(this, text, time, this.callbackLoadBox.bind(this), itemid, true);
    },

    callbackLoadBox:function(itemid, cancel){
        if(cancel) {
            this.stop_autofood();
            this.refresh_bag();
        }
        else{
            tj.wsconnection.setMsg(msgac["Map_camp_cook"], {"id": itemid, "num": 1});
            if(tj.mainData.getClientData("help_camp") == 3){
                tj.mainData.setClientData("help_camp", 4);
                this._help_pro = 1;
                this.refreshHelp();
            }
        }
    }
});

function createBagSelect(parent, select_t, bagc, bagmax) {
    var pRet = new selectBagLayer(select_t);
    if (pRet && pRet.init(bagc, bagmax)) {
        var z = -1;
        var childs = parent.getChildren();
        for (var i = 0; i < childs.length; ++i) {
            if (childs[i].getLocalZOrder() > z)
                z = childs[i].getLocalZOrder();
        }
        pRet.setLocalZOrder(9999999);
        pRet._tjParent = parent;
        parent.addChild(pRet);
        return pRet;
    } else if (pRet) {
        delete pRet;
        return false;
    }
    return true;
}
/**
 * Created by likx on 2015/12/17.
 */
