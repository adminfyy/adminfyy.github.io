/**
 * 仓库界面
 * Created by lkx on 2015/10/29.
 *
 */


var wareHouseLayer = baseLayer.extend({
    _ui:0,
    _template:null,
    _currentSleleteType:0, //0:道具 1:装备 2:贵重物品
    _currOptType:0, //0:选择 1:批量分解
    _textEmpty:null,
    _waitDrop:false,

    _itemList:[],
    _hideItemList:[],
    _itemIndex:0,
    _lastMuban:null,

    ctor : function(){
        this._super();
        this._basename = "wareHouse";

        this._ui = 0;
        this._ui_list = null;
        this._template = null;
        this._currentSleleteType = 0;
        this._itemList = [];
        this._hideItemList = [];
        this.init();
    },

    init : function() {
        cc.log("warehouse init");
        if (!this._super())
            return false;
        this._ui = this.load_ui("uiWarehouse.json");
        if (!this._ui)
            return false;
        this.addChild(this._ui);

        this._ui_list = WidgetDig(this._ui,"main/list");
        this._template = WidgetDig(this._ui, "main/list/template");
        this.setRetain(this._template, "uitmpl");
        this.setRetain(this._ui_list, "uitmpl");
        for(var i=1;i<=4;i++)
            WidgetDig(this._template, "btnMain"+i).setVisible(false);

        WidgetDig(this._ui, "main/class/btnBase/text").setString(tj.cfg.get("text_on_ui/wareHouse/item"));
        WidgetDig(this._ui, "main/class/btnWeapon/text").setString(tj.cfg.get("text_on_ui/wareHouse/equip"));
        WidgetDig(this._ui, "main/class/btnValuable/text").setString(tj.cfg.get("text_on_ui/wareHouse/valuable"));
        WidgetDig(this._ui, "main/text/textRight").setVisible(false);
        WidgetDig(this._ui, "main/text/textLeft").setVisible(false);

        WidgetDig(this._ui, "set/btnClosed/text").setString(tj.cfg.get("text_on_ui/close"));
        WidgetDig(this._ui, "set/btnUse/text").setString(tj.cfg.get("text_on_ui/wareHouse/decompose"));

        this._textEmpty = new ccui.Text(tj.cfg.get("text/warehouse/empty"),tj.cfg.get("designdata/design_fontName"),25);
        this._textEmpty.setPosition(cc.p(cc.winSize.width/2-50,cc.winSize.height/2));
        WidgetDig(this._ui,"main").addChild(this._textEmpty);

        return true;
    },

    onEnter : function() {
        this._super();
        tj.wsconnection.addGrp(msgac["Storage_drop"], msgac["Storage_break_equip"], this.process_ac.bind(this), this.get_scene_name());

        //this._currentSleleteType = 0;
        this.setBtnState();

        this.refreshScene();
        this.refreshBtnNew();
        this._waitDrop = false;
    },

    onExit : function() {
        this._super();
        this._ui_list.removeAllChildren(true);
        this._itemList = [];
        this._hideItemList = [];
        this._itemIndex = 0;
        this._lastMuban = null;
        this._push_item = null;
        this._push_time = 0;
    },

    refreshBtnNew:function(){
        WidgetDig(this._ui, "main/class/btnBase/lock").setVisible(false);
        WidgetDig(this._ui, "main/class/btnWeapon/lock").setVisible(false);
        WidgetDig(this._ui, "main/class/btnValuable/lock").setVisible(false);
        var new_i = tj.mainData.getClientData("new_i");
        for( var i in new_i) {
            var id = new_i[i];
            var num = tj.mainData.getItemNum(id);
            if(num <= 0)
                continue;
            var itemclass = tj.mainData.getItemClass(id);
            if(itemclass == itemClass.item){
                if(!tj.mainData.isStorageItemType(id))
                    continue;
                var iteminfo = tj.mainData.getItemInfo(id);
                if (this.isEmptyObject(iteminfo)) {
                    cc.log("warehouse iteminfo = null! itemid: " + itemid);
                    continue;
                }
                if (iteminfo.type == itemType.valuables)
                    WidgetDig(this._ui, "main/class/btnValuable/lock").setVisible(true);
                else
                    WidgetDig(this._ui, "main/class/btnBase/lock").setVisible(true);
            }else if(itemclass == itemClass.equip)
                WidgetDig(this._ui, "main/class/btnWeapon/lock").setVisible(true);
        }
    },

    setBtnState: function () {
        if(this._currentSleleteType == 0){
            WidgetDig(this._ui, "main/class/btnBase").setTouchEnabled(false);
            WidgetDig(this._ui, "main/class/btnWeapon").setTouchEnabled(true);
            WidgetDig(this._ui, "main/class/btnValuable").setTouchEnabled(true);

            WidgetDig(this._ui, "main/class/btnBase").setHighlighted(true);
            WidgetDig(this._ui, "main/class/btnWeapon").setHighlighted(false);
            WidgetDig(this._ui, "main/class/btnValuable").setHighlighted(false);
            WidgetDig(this._ui, "main/text/textRight").setVisible(false);

        }else if(this._currentSleleteType == 1){
            WidgetDig(this._ui, "main/class/btnBase").setTouchEnabled(true);
            WidgetDig(this._ui, "main/class/btnWeapon").setTouchEnabled(false);
            WidgetDig(this._ui, "main/class/btnValuable").setTouchEnabled(true);

            WidgetDig(this._ui, "main/class/btnBase").setHighlighted(false);
            WidgetDig(this._ui, "main/class/btnWeapon").setHighlighted(true);
            WidgetDig(this._ui, "main/class/btnValuable").setHighlighted(false);
            WidgetDig(this._ui, "main/text/textRight").setVisible(true);
        }
        else if(this._currentSleleteType == 2){
            WidgetDig(this._ui, "main/class/btnBase").setTouchEnabled(true);
            WidgetDig(this._ui, "main/class/btnWeapon").setTouchEnabled(true);
            WidgetDig(this._ui, "main/class/btnValuable").setTouchEnabled(false);

            WidgetDig(this._ui, "main/class/btnBase").setHighlighted(false);
            WidgetDig(this._ui, "main/class/btnWeapon").setHighlighted(false);
            WidgetDig(this._ui, "main/class/btnValuable").setHighlighted(true);
            WidgetDig(this._ui, "main/text/textRight").setVisible(false);
        }

        this._currOptType = 0;
        WidgetDig(this._ui, "set/btnUse").setHighlighted(false);
    },

    setOptType:function(opt){
        if(this._currOptType == opt)
            this._currOptType = 0;
        else
            this._currOptType = opt;
        switch(this._currOptType){
            case 0: //查看
                WidgetDig(this._ui, "set/btnUse").setHighlighted(false);
                this.refreshItemAll();
                break;
            case 1: //批量分解
                WidgetDig(this._ui, "set/btnUse").setHighlighted(true);
                this.refreshItemAll();
                break;
        }
    },

    isEmptyObject: function (obj) {
        for (var name in obj){
            return false;
        }
        return true;
    },

    refreshScene:function(){
        this._ui_list.removeAllChildren(true);
        this._textEmpty.setVisible(false);
        this._itemList = [];
        this._hideItemList = [];
        this._itemIndex = 0;
        this._push_item = null;
        this._push_time = 0;

        var tempList;
        var iteminfo = null;
        switch (this._currentSleleteType){
            case 0:
            case 2:
                tempList = tj.mainData.getStorage_item();
                for(var id in tempList) {
                    var num = tempList[id];
                    if (num <= 0)
                        continue;
                    var itemid = parseInt(id);
                    iteminfo = tj.mainData.getItemInfo(itemid);
                    if (this.isEmptyObject(iteminfo)) {
                        cc.log("warehouse iteminfo = null! itemid: " + itemid);
                        continue;
                    }
                    if (iteminfo.type == itemType.Blueprint || iteminfo.type == itemType.fireBar || iteminfo.type == itemType.tent)
                        continue;
                    if (this._currentSleleteType == 0 && iteminfo.type == itemType.valuables)
                        continue;
                    if (this._currentSleleteType == 2 && iteminfo.type != itemType.valuables)
                            continue;
                    this.addItem(iteminfo, num);
                }
                break;
            case 1:
                tempList = tj.mainData.getStorage_equip();
                var equips = [];
                for(id in tempList) {
                    num = tempList[id];
                    if (num <= 0)
                        continue;
                    itemid = parseInt(id);
                    iteminfo = tj.mainData.getEquipByid(itemid);
                    equips.push(iteminfo);
                }
               equips.sort(function(a,b){
                    if(a.Proficiency == b.Proficiency){
                        if(a.Type == b.Type)
                            return a.GroupId < b.GroupId;
                        return a.Type < b.Type;
                    }
                    return a.Proficiency < b.Proficiency;
                });
                for(var i in equips) {
                    iteminfo = equips[i];
                    this.addItem(iteminfo, 1);
                }
                this.refreshMaxEquip();
        }

        if(this._itemIndex == 0)
            this._textEmpty.setVisible(true);
    },

    refreshMaxEquip:function(){
        var tempList = tj.mainData.getStorage_equip();
        var equips_count = 0;
        for(var id in tempList) {
            var num = tempList[id];
            if (num <= 0)
                continue;
            equips_count++;
        }
        var maxEquip = 30;
        if(tj.mainData.main.equip_max_num)
            maxEquip = tj.mainData.main.equip_max_num;
        WidgetDig(this._ui, "main/text/textRight").setString(tj.cfg.get("text_on_ui/wareHouse/equipcount").format(equips_count, maxEquip));
        WidgetDig(this._ui, "main/text/textRight").setColor(cc.color.WHITE);
        if(equips_count > maxEquip)
            WidgetDig(this._ui, "main/text/textRight").setColor(cc.color.RED);
    },

    addItem:function(iteminfo, num, item){
        if(!iteminfo)
            return;

        var v_muBan = this._lastMuban;
        var btnMain = null;
        if(!item){
            if(this._hideItemList.length){
                btnMain = this._hideItemList.pop();
            }else{
                if(this._itemIndex%4 == 0){
                    v_muBan = this._template.clone();
                    this._ui_list.pushBackCustomItem(v_muBan);
                }
                var item_idx = this._itemIndex % 4 + 1;
                btnMain = WidgetDig(v_muBan, "btnMain" + item_idx);
            }
        }
        else
            btnMain = item;

        var itemid = iteminfo.id;
        var itemname = "";
        var icon = "";
        var ficon = "";
        var textName = WidgetDig(btnMain, "portraits/textName");
        var textNum = WidgetDig(btnMain, "portraits/textNum");
        var uiIcon = WidgetDig(btnMain, "portraits/icon");
        var uiLock = WidgetDig(btnMain, "portraits/lock");
        btnMain.setEnabled(true);
        textName.setColor(cc.color("#FFFFFF"));
        textNum.setString("");
        if (this.isItemMode()) {
            itemname = iteminfo.name;
            textNum.setString("x"+num);
            icon = iteminfo.icon;
            ficon = iteminfo.frameicon;
        }
        else if (this._currentSleleteType == 1) {
            itemname = iteminfo.Name;
            icon = iteminfo.Icon;
            ficon = iteminfo.FrameIcon;
        }

        btnMain.itemid = itemid;
        if(this._itemIndex%4 == 0)
            btnMain.muban = v_muBan;
        btnMain.index = this._itemIndex;
        if(itemname)
            textName.setString(itemname);
        if (icon)
            uiIcon.loadTexture(icon, ccui.Widget.PLIST_TEXTURE);
        if(ficon)
            WidgetDig(btnMain, "portraits/level").loadTexture(ficon, ccui.Widget.PLIST_TEXTURE);

        btnMain.setVisible(true);
        uiLock.setVisible(false);
        if(tj.mainData.clientDataHave("new_i", itemid)) {
            uiLock.setVisible(true);
            btnMain.isnew = true;
        }

        if (this.isItemMode() && this._currOptType == 1)
        {
            if(iteminfo.canBeUsed)
                textName.setColor(cc.color.WHITE);
            else {
                textName.setColor(cc.color.GRAY);
                btnMain.setEnabled(false);
            }
            textNum.setString("x"+num);
        }
        this._itemList.push(btnMain);
        this._itemIndex++;
        this._lastMuban = v_muBan;
    },

    removeItem:function(item){
        this._itemIndex = item.index;

        var temp = [];
        for(var i=this._itemIndex; i<this._itemList.length;i++) {
            var it = this._itemList[i];
            temp.push(it);
        }

        //删除 移除对象及后面对象的item
        this._itemList.splice(this._itemIndex, temp.length);

        for(i=0;i<temp.length-1;++i) {
            var curritem = temp[i];
            var item_next = temp[i+1];
            var nextiteminfo = tj.mainData.getItemInfo(item_next.itemid);
            var next_num = tj.mainData.getItemNum(item_next.itemid);
            this.addItem(nextiteminfo, next_num, curritem);
        }

        var lastitem = temp.pop();
        this._hideItemList.push(lastitem);
        lastitem.setVisible(false);
    },

     getItem:function(itemid){
        for(var i in this._itemList){
                var mu = this._itemList[i];
            if(mu.itemid == itemid)
                return mu;
        }
        return null;
    },

    refreshItem:function(id){
        this._push_item = null;
        if(typeof (id) == "string")
            id = parseInt(id);

        if(typeof (id) == "number") {
            var itemid = id;
            var item = this.getItem(itemid);
        }
        else {
            item = id;
            itemid = id.itemid;
        }

        var num = tj.mainData.getItemNum(itemid);
        var iteminfo = null;
        if(this.isItemMode())
            iteminfo = tj.mainData.getItemInfo(itemid);
        else
            iteminfo = tj.mainData.getEquipByid(itemid);

        if(item && iteminfo){
            var textName = WidgetDig(item,"portraits/textName");
            textName.setColor(cc.color.WHITE);
            item.setEnabled(true);
            if(num == 0)
                this.removeItem(item);
            else{
                if(this.isItemMode()){
                    var textNum = WidgetDig(item, "portraits/textNum");
                    textNum.setString("x"+num);
                }
                if (this.isItemMode() && this._currOptType == 1)
                {
                    if(iteminfo.canBeUsed)
                        textName.setColor(cc.color.WHITE);
                    else {
                        textName.setColor(cc.color.GRAY);
                        item.setEnabled(false);
                    }
                    textNum.setString("x"+num);
                }
            }
        }else{
            this.addItem(iteminfo, num);
        }
    },

    refreshItemAll:function(){
        for(var i in this._itemList) {
            var mu = this._itemList[i];
            this.refreshItem(mu);
        }
    },

    process_ac : function(doc) {
        var msg_id = doc[0];
        var data = doc[1];
        switch (msg_id) {
            case msgac["Storage_use_item"]:
                switch (data.ret){
                    case 0:
                        if(this._curr_popLayer)
                            this._curr_popLayer.set_release();
                        var str = "";
                        var str2 = "";
                        if(data.iteminfo){
                            if(data.iteminfo.coin) {
                                tj.mainData.addCoin(data.iteminfo.coin);
                                str += tj.cfg.get("text/manor/Gold") + "+ " + data.iteminfo.coin + " ";
                            }
                            if(data.iteminfo.soul) {
                                tj.mainData.addSoul(data.iteminfo.soul.add);
                                str += tj.cfg.get("text/manor/Soul") + "+ " + data.iteminfo.soul.add + " ";
                            }
                            if(data.iteminfo.items) {
                                for (var i in data.iteminfo.items) {
                                    var id = parseInt(i);
                                    var num = data.iteminfo.items[id];
                                    var name = tj.mainData.getItemName(id);
                                    var itemclass = tj.mainData.getItemClass(id);
                                    if(num > 0)
                                        str += name + "+ " + num + " ";

                                    if (itemclass == itemClass.resource) {
                                        var mainres = tj.mainData.getResinfoById(id);
                                        if(num > 0)
                                            mainres.add(num);
                                        else
                                            str2 = tj.cfg.get("text/warehouse/resfull").format(name);

                                        if(data.iteminfo.require_num != data.iteminfo.usenum)
                                            str2 = tj.cfg.get("text/warehouse/resfull").format(name);
                                    }
                                    else {
                                        tj.mainData.addStroageItem(id, num);
                                        this.refreshItem(id);
                                    }
                                }
                            }
                            if(data.iteminfo.useitem) {
                                tj.mainData.subStroageItem(data.iteminfo.useitem, data.iteminfo.usenum);
                                this.refreshItem(data.iteminfo.useitem);
                                //str += tj.mainData.getItemName(data.iteminfo.useitem) + "-1 ";
                            }
                            createMainNoticeBox(str + str2);
                            tj.wsconnection.pushmsg(msgac["Main_refresh_resource"]);
                        }
                        break;
                    case 1:
                        if(this._curr_popLayer)
                            this._curr_popLayer.noticetext_add(tj.cfg.get("text/warehouse/inTheMap"));
                        else
                            this.noticetext_add(tj.cfg.get("text/warehouse/inTheMap"));
                        break;
                    case 3:
                        if(this._curr_popLayer)
                            this._curr_popLayer.noticetext_add(tj.cfg.get("text/warehouse/no_use"));
                        else
                            this.noticetext_add(tj.cfg.get("text/warehouse/no_use"));
                        break;
                    case 20:
                        if(this._curr_popLayer)
                            this._curr_popLayer.noticetext_add(tj.cfg.get("text/warehouse/numIsNotRight"));
                        else
                            this.noticetext_add(tj.cfg.get("text/warehouse/numIsNotRight"));
                        break;
                    case -1:
                        if(this._curr_popLayer)
                            this._curr_popLayer.noticetext_add(tj.cfg.get("text/warehouse/usefailed"));
                        else
                            this.noticetext_add(tj.cfg.get("text/warehouse/usefailed"));
                        break;
                }
                break;
            case msgac["Storage_break_equip"]:
                ret = data.ret;
                switch(ret) {
                    case 0:
                        if(this._curr_popLayer)
                            this._curr_popLayer.set_release();
                        if(data.iteminfo){
                            if(data.iteminfo.items){
                                var str = "";
                                var str2 = "";
                                var str3 = "";
                                var itemInfo = data.iteminfo.items;
                                for (var i in itemInfo) {
                                    var id = parseInt(i);
                                    var num = itemInfo[i];
                                    var name = tj.mainData.getItemName(id);
                                    if(num > 0)
                                        str = str + name +" + "+ num.toString();
                                    if (id > 0 && id <= 5) {
                                        var mainres = tj.mainData.getResinfoById(id);
                                        if(mainres)
                                            mainres.add(num);
                                        if(num <=0)
                                            str2 = tj.cfg.get("text/warehouse/resfull").format(name);
                                    }
                                    else {
                                        tj.mainData.addStroageItem(id, num);
                                        this.refreshItem(id);
                                    }
                                }
                                if(data.iteminfo.coin){
                                    var coin = data.iteminfo.coin;
                                    if(coin){
                                        tj.mainData.setCoinNum(tj.mainData.getCoinNum() + data.itemInfo.coin);
                                        str3 = tj.cfg.get("text/warehouse/goldadd") + coin.toString();
                                    }
                                }
                                this.noticetext_add(tj.cfg.get("text/warehouse/breakSuccess") + str + str2 + str3);
                                tj.mainData.removeStroageEquips(data.iteminfo.useitem);
                                this.refreshItem(data.iteminfo.useitem);
                                this.refreshMaxEquip();
                            }
                            tj.wsconnection.pushmsg(msgac["Main_refresh_resource"]);
                        }
                        break;
                    case 1:
                        if(this._curr_popLayer)
                            this._curr_popLayer.noticetext_add(tj.cfg.get("text/warehouse/inTheMap"));
                        else
                            this.noticetext_add(tj.cfg.get("text/warehouse/inTheMap"));
                        break;
                    case 20:
                        if(this._curr_popLayer)
                            this._curr_popLayer.noticetext_add(tj.cfg.get("text/warehouse/numIsNotRight"));
                        else
                            this.noticetext_add(tj.cfg.get("text/warehouse/numIsNotRight"));
                        break;
                    case -1:
                        if(this._curr_popLayer)
                            this._curr_popLayer.noticetext_add(tj.cfg.get("text/warehouse/failed"));
                        else
                            this.noticetext_add(tj.cfg.get("text/warehouse/failed"));
                        break;
                }
                break;
            case msgac["Storage_drop"]:
                var rdata = data.data;
                var ret = data.ret;
                switch(ret) {
                    case 0:
                        if(this._curr_popLayer)
                            this._curr_popLayer.set_release();

                        var ItemName = tj.mainData.getItemName(data.id);
                        this.noticetext_add(tj.cfg.get("text/warehouse/dropSuccess").format(ItemName));
                        if(this.isItemMode()) {
                            var bagc = data.bagweight;
                            if(bagc > 0)
                                tj.mainData.subBagItem(data.id, 1);
                            else {
                                var num = tj.mainData.getItemNum(data.id);
                                tj.mainData.subStroageItem(data.id, num);
                            }
                        }else if (this._currentSleleteType == 1){
                            tj.mainData.removeStroageEquips(data.id, 0);
                            this.refreshMaxEquip();
                        }
                        this.refreshItem(data.id);
                        return;
                        break;
                    case 1:
                        if(this._curr_popLayer)
                            this._curr_popLayer.noticetext_add(tj.cfg.get("text/atelierlessitems"));
                        else
                            this.noticetext_add(tj.cfg.get("text/atelierlessitems"));
                        break;
                    case 2:
                        if(this._curr_popLayer)
                            this._curr_popLayer.noticetext_add(tj.cfg.get("text/noneItems"));
                        else
                            this.noticetext_add(tj.cfg.get("text/noneItems"));
                        break;
                    case 3:
                        if(this._curr_popLayer)
                            this._curr_popLayer.noticetext_add(tj.cfg.get("text/bagnoitem"));
                        else
                            this.noticetext_add(tj.cfg.get("text/bagnoitem"));
                        break;
                    case 4:
                        if(this._curr_popLayer)
                            this._curr_popLayer.noticetext_add(tj.cfg.get("text/strogenoItem"));
                        else
                            this.noticetext_add(tj.cfg.get("text/strogenoItem"));
                        break;
                }
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
                    this._push_item = btn;
                    this._push_time = new Date();
                    break;
            }
        }else if (type == ccui.Widget.TOUCH_ENDED) {
            switch(btn.getName()){
                case "btnClosed":
                    this.set_release();
                    if( tj.mainData.getClientData("new_i").length > 0){
                        tj.mainData.clientDataClear("new_i");
                        tj.wsconnection.pushmsg(msgac["Main_refresh_new"]);
                    }
                    break;
                case "btnBase":
                    this._currentSleleteType = 0;
                    this.setBtnState();
                    this.refreshScene();
                    break;
                case "btnWeapon":
                    this._currentSleleteType = 1;
                    this.setBtnState();
                    this.refreshScene();
                    break;
                case "btnValuable":
                    this._currentSleleteType = 2;
                    this.setBtnState();
                    this.refreshScene();
                    break;
                case "btnUse": //批量分解
                    this.setOptType(1);
                    break;
                case "btnMain1":
                case "btnMain2":
                case "btnMain3":
                case "btnMain4":
                    this._push_item = null;
                    this._push_time = 0;
                    var itemid = btn.itemid;
                    if(btn.isnew){
                        WidgetDig(btn, "portraits/lock").setVisible(false);
                        tj.mainData.removeClientData("new_i", itemid);
                        tj.wsconnection.pushmsg(msgac["Main_refresh_new"]);
                        btn.isnew = false;
                        this.refreshBtnNew();
                    }
                    if(this._waitDrop)
                        break;
                    switch(this._currOptType){
                        case 0:
                            this._curr_popLayer = createNoteBoxCard(this, itemid, box_card_from_t.warehouse);
                            break;
                        case 1:
                            if(this.isItemMode()){
                                this.use_item(itemid, 1);
                            }else if(this._currentSleleteType == 1){
                                var equip = tj.mainData.getEquipByid(itemid);
                                if(equip && equip.Proficiency >= 4){
                                    var str = tj.cfg.get("text/warehouse/disassemblyEquip");
                                    this._curr_popLayer = createMsgBox2(this, str, function(tag){
                                        if (tag == 0)
                                            tj.wsconnection.setMsg(msgac["Storage_break_equip"], {"id": itemid});
                                        return true;
                                    }, 2);
                                }else
                                    tj.wsconnection.setMsg(msgac["Storage_break_equip"], {"id": itemid});
                            }
                            break;
                    }
                    break;
            }
        }
    },

    use_item:function(itemid, num){
        if(tj.mainData.cheak_itemuse_out(itemid)){
            var resname = tj.mainData.getItemOutResName(itemid);
            var str = tj.cfg.get("text/warehouse/itemuseOut").format(resname);
            this._curr_popLayer = createMsgBox2(this, str, function(tag){
                if (tag == 0)
                    tj.wsconnection.setMsg(msgac["Storage_use_item"], {"id": itemid, "num":num});
                return true;
            }, 2);
        }else{
            var iteminfo = tj.mainData.getItemInfo(itemid);
            if(iteminfo && iteminfo.itemLv >= 5){
                str = tj.cfg.get("text/warehouse/disassemblyItem");
                this._curr_popLayer = createMsgBox2(this, str, function(tag){
                    if (tag == 0)
                        tj.wsconnection.setMsg(msgac["Storage_use_item"], {"id": itemid, "num":num});
                    return true;
                }, 2);
            }else
                tj.wsconnection.setMsg(msgac["Storage_use_item"], {"id": itemid, "num":num});
        }
    },

    update: function (dt) {
        this._super();
        if(!this.isItemMode())
            return;
        if(this._push_item != null)
        {
            var btn = this._push_item;
            var time = this._push_time;
            var nowTime = new Date();
            var diff = nowTime - time;
            if(diff <= tj.cfg.get("designdata/configNum/noticeItemDel"))
                return;
            //if(this._curr_popLayer != null)
            //    return;
            switch (btn.getName()){
                case "btnMain1":
                case "btnMain2":
                case "btnMain3":
                case "btnMain4":
                    this._waitDrop = true;
                    var self = this;
                    var itemid = btn.itemid;
                    var iteminfo = tj.mainData.getItemInfo(itemid);
                    if(!iteminfo.canBeUsed){
                        self._waitDrop = false;
                        break;
                    }
                    var str = tj.cfg.get("text/warehouse/useAll").format(iteminfo.name);
                    var num = tj.mainData.getItemNum(itemid);
                    this._curr_popLayer = createMsgBox2(this, str, function(tag){
                        if (tag == 0) {
                            self.use_item(itemid, num);
                        }
                        self._waitDrop = false;
                        self._curr_popLayer = null;
                        return true;
                    }, 2);
                    this._push_item = null;
                    this._push_time = 0;
                    break;
            }
        }
    },

    isItemMode:function(){
        if(this._currentSleleteType == 1)
            return false;
        return true;
    }
});


createWareHouseLayer = function(parent){
    var pRet = new wareHouseLayer();
    if (pRet && pRet.init()){
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
