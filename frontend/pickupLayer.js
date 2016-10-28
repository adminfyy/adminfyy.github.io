/**
 * Created by likx on 2016/3/14.
 */

var pickupLayer = baseLayer.extend({
    _ui: 0,
    _ui_baglist: null,
    _ui_droplist: null,
    _ui_bagtmpl: null,
    _ui_droptmpl:null,
    _bagc:0,
    _bagmax:0,
    _dropItems:null,
    _bagItemList:[],
    _dropItemList:[],
    _cb:null,

    _btnBagList:[],
    _btnDropList:[],
    _hideBagBtnList:[],
    _hideDropBtnList:[],
    _bagItemIndex:0,
    _dropItemIndex:0,
    _lastBagMuban:null,
    _lastDropMuban:null,

    ctor: function () {
        this._super();
        this._basename = "pickup";
        this.init();
    },

    setData : function(bagc,bagmax,items,cb){
        //设置数据
        if (bagc !== undefined) {
            this._bagc = bagc;
            this._bagmax = bagmax;
            this._dropItems = items;
            this._cb = cb;
        }
        //同时清除重置相关变量
        this._bagItemList = [];
        this._dropItemList = [];
        this._btnBagList = [];
        this._btnDropList = [];
        this._hideBagBtnList = [];
        this._hideDropBtnList = [];
        this._bagItemIndex = 0;
        this._dropItemIndex = 0;
        this._lastBagMuban = null;
        this._lastDropMuban = null;
        this._push_item = null;
        this._push_time = 0;
    },

    init: function () {
        if (!this._super())
            return false;
        this._ui = this.load_ui("uiLoot.json");
        if (!this._ui)
            return false;
        this.addChild(this._ui);

        this._ui_baglist = WidgetDig(this._ui, "main/bag/list");
        this._ui_bagtmpl = WidgetDig(this._ui, "main/bag/list/template");
        this.setRetain(this._ui_bagtmpl, "uitmpl");
        this._ui_droplist = WidgetDig(this._ui, "main/drop/list");
        this._ui_droptmpl = WidgetDig(this._ui, "main/drop/list/template");
        this.setRetain(this._ui_droptmpl, "uitmpl");
        this._ui_baglist.removeAllChildren();
        this._ui_droplist.removeAllChildren();
        for(var i=1;i<=4;i++) {
            WidgetDig(this._ui_droptmpl, "btnMain" + i).setVisible(false);
            WidgetDig(this._ui_bagtmpl, "btnMain"+i).setVisible(false);
        }
        
        WidgetDig(this._ui, "set/btnPick/text").setString(tj.cfg.get("text_on_ui/map/lootall"));
        WidgetDig(this._ui, "set/btnClosed/text").setString(tj.cfg.get("text_on_ui/close"));

        return true;
    },

    onEnter : function(){
        this._super();
        WidgetDig(this._ui, "set/btnPick").setEnabled(false);
        WidgetDig(this._ui, "set/btnPick").setColor(cc.color.GRAY);
        this.refresh_weight();
        for(var i in this._dropItems){
            var item = this._dropItems[i];
            if(item.b >0){
                var itemb = {};
                itemb.id = item.id;
                itemb.num = item.b;
                this._bagItemList.push(itemb);
            }
            if(item.p >0){
                if(item.hasOwnProperty("eid"))
                    tj.mainData.addEquipInfo(item.id, item.eid, item.attr);
                var itemp = {};
                itemp.id = item.id;
                itemp.num = item.p;
                itemp.weight = tj.mainData.getItemWeight(item.id);
                this._dropItemList.push(itemp);
            }
        }
        this.refreshPickCloseBtn();
        tj.wsconnection.addGrp(msgac["Pick_one"], msgac["Pick_one"], this.process_ac.bind(this), this.get_scene_name());
        tj.wsconnection.addGrp(msgac["Pick_done"], msgac["Pick_done"], this.process_ac.bind(this), this.get_scene_name());
    },

    onEnterTransitionDidFinish:function(){
        this._super();
        this.refresh_bag_item();
        this.refresh_drop_item();
        WidgetDig(this._ui, "set/btnPick").setEnabled(true);
        WidgetDig(this._ui, "set/btnPick").setColor(cc.color.WHITE);

    },

    onExit:function(){
        this._super();
        this.setData();
        this._ui_baglist.removeAllChildren();
        this._ui_droplist.removeAllChildren();
        this._push_item = null;
        this._push_time = 0;
    },

    //set_release:function(){
    //    this._super();
    //}

    refresh_weight:function(){
        var uiText = WidgetDig(this._ui, "text/textRight");
        this.setContentString(uiText, tj.cfg.get("text_on_ui/hero/weight").format(this._bagc, this._bagmax));
        if(this._bagc > this._bagmax)
            uiText.setColor(cc.color.RED);
        else
            uiText.setColor(cc.color.WHITE);
    },

    get_drop_item_count:function(id){
        for(var i in this._dropItemList) {
            var item = this._dropItemList[i];
            if(item.id == id)
                return item.num;
        }
        return 0;
    },

    addUIItem:function(where, itemid, num, btn){
        var v_muBan = null;
        var btnMain = null;
        var ui_list = null;
        var ui_tmpl = null;
        var btn_list = null;
        var hideitem_list = null;
        var itemidx = 0;
        if(where == "bag") {
            v_muBan = this._lastBagMuban;
            ui_list = this._ui_baglist;
            ui_tmpl = this._ui_bagtmpl;
            btn_list = this._btnBagList;
            hideitem_list = this._hideBagBtnList;
            itemidx = this._bagItemIndex;
        }
        else if(where == "drop"){
            v_muBan = this._lastDropMuban;
            ui_list = this._ui_droplist;
            ui_tmpl = this._ui_droptmpl;
            btn_list = this._btnDropList;
            hideitem_list = this._hideDropBtnList;
            itemidx = this._dropItemIndex;
        }
        if(!btn){
            if(hideitem_list.length){
                btnMain = hideitem_list.pop();
            }else{
                if(itemidx%4 == 0){
                    v_muBan = ui_tmpl.clone();
                    ui_list.pushBackCustomItem(v_muBan);
                }
                var item_idx = itemidx % 4 + 1;
                btnMain = WidgetDig(v_muBan, "btnMain" + item_idx);
            }
        }
        else
            btnMain = btn;

        var itemname = tj.mainData.getItemName(itemid);
        var textName = WidgetDig(btnMain, "portraits/textName");
        var textNum = WidgetDig(btnMain, "portraits/textNum");
        var uiIcon = WidgetDig(btnMain, "portraits/icon");
        btnMain.setEnabled(true);
        btnMain.itemid = itemid;
        btnMain.index = itemidx;
        btnMain.num = num;
        if(itemname)
            textName.setString(itemname);
        textNum.setString("x"+num);
        var icon = tj.mainData.getItemIcon(itemid);
        var ficon = tj.mainData.getItemFrameIcon(itemid);
        if (icon)
            uiIcon.loadTexture(icon, ccui.Widget.PLIST_TEXTURE);
        if(ficon)
            WidgetDig(btnMain, "portraits/level").loadTexture(ficon, ccui.Widget.PLIST_TEXTURE);
        btnMain.setVisible(true);
        btn_list.push(btnMain);

        if(where == "bag") {
            this._lastBagMuban = v_muBan;
            this._bagItemIndex++;
            btnMain.opt = 1;
        }
        else if(where == "drop"){
            this._lastDropMuban = v_muBan;
            this._dropItemIndex++;
            btnMain.opt = 2;
        }
    },

    removeUIItem:function(where, btn){
        var itemidx = 0;
        var btn_list = null;
        var hideitem_list = null;
        if(where == "bag") {
            btn_list = this._btnBagList;
            hideitem_list = this._hideBagBtnList;
            itemidx = this._bagItemIndex = btn.index;
        }
        else if(where == "drop"){
            btn_list = this._btnDropList;
            hideitem_list = this._hideDropBtnList;
            itemidx = this._dropItemIndex = btn.index;
        }

        var temp = [];
        for(var i=itemidx; i<btn_list.length;i++) {
            var it = btn_list[i];
            temp.push(it);
        }

        //删除 移除对象及后面对象的item
        btn_list.splice(itemidx, temp.length);

        for(i=0;i<temp.length-1;++i) {
            var curritem = temp[i];
            var item_next = temp[i+1];
            this.addUIItem(where, item_next.itemid, item_next.num, curritem);
        }

        var lastitem = temp.pop();
        hideitem_list.push(lastitem);
        lastitem.setVisible(false);
    },

    getUIItem:function(where, itemid){
        var btn_list = null;
        if(where == "bag")
            btn_list = this._btnBagList;
        else if(where == "drop")
            btn_list = this._btnDropList;
        for(var i in btn_list){
            var mu = btn_list[i];
            if(mu.itemid == itemid)
                return mu;
        }
        return null;
    },

    refreshUIItem:function(where, id, num){
        if(typeof (id) == "string")
            id = parseInt(id);

        if(typeof (id) == "number") {
            var itemid = id;
            var btn = this.getUIItem(where, itemid);
        }
        else {
            btn = id;
            itemid = id.itemid;
        }

        if(btn){
            var textName = WidgetDig(btn,"portraits/textName");
            if(num == 0)
                this.removeUIItem(where, btn);
            else{
                var textNum = WidgetDig(btn, "portraits/textNum");
                textNum.setString("x"+num);
                btn.num = num;
            }
        }else{
            this.addUIItem(where, itemid, num);
        }
    },

    add_bag_item:function(id, num){
        //金币特殊处理
        if(id == 10 || id == 9){
            var num = this.get_drop_item_count(id);
            tj.wsconnection.setMsg(msgac["Pick_one"], {"id": id});
            return num;
        }
        var iteminfo = tj.mainData.getItemInfo(id);
        if(!iteminfo)
            return 0;

        if(iteminfo.type == itemType.valuables || iteminfo.type == itemType.Blueprint){
            var item_c = this.get_drop_item_count(id);
            tj.wsconnection.setMsg(msgac["Pick_one"], {"id": id});
            return item_c;
        }

        var add_c = num;
        var w = tj.mainData.getItemWeight(id);
        if(add_c > 0 && w > 0){
            //if(num > 0){
                var bag_sp = this._bagmax - this._bagc;
                add_c = Math.floor(bag_sp/w);
                if(add_c > num)
                    add_c = num;
            //}
            if(add_c <= 0)
                return 0;
        }

        var del = this._bagc - this._bagmax;
        if (add_c < 0 && del > 0 && id === 1) {
            //丢食物时才进行一次性丢弃
            add_c = -del;
        }

        var find = false;
        var dirty = false;
        for(var i in this._bagItemList){
            var bitem = this._bagItemList[i];
            if(bitem.id == id) {
                if (add_c < 0) {
                    if (bitem.num < Math.abs(add_c)) {
                        add_c = -bitem.num;
                    }
                }
                bitem.num += add_c;
                if(bitem.num <= 0) {
                    this._bagItemList.splice(i, 1);
                    var btn = this.getUIItem("bag", bitem.id);
                    this.removeUIItem("bag", btn);
                }
                else
                    this.refreshUIItem("bag", bitem.id, bitem.num);
                find = true;
                break;
            }
        }
        if(!find && num > 0){
            var item = {};
            item.id = id;
            item.num = add_c;
            this._bagItemList.push(item);
            this.addUIItem("bag", item.id, item.num);
        }
        this._bagc += w * add_c;
        return add_c;
    },

    add_drop_item:function(id, num){
        var find = false;
        for(var i in this._dropItemList){
            var ditem = this._dropItemList[i];
            if(ditem.id == id) {
                ditem.num += num;
                if(ditem.num <= 0) {
                    this._dropItemList.splice(i, 1);
                    var btn = this.getUIItem("drop", ditem.id);
                    this.removeUIItem("drop", btn);
                } else
                    this.refreshUIItem("drop",ditem.id, ditem.num );
                find = true;
                break;
            }
        }
        if(!find && num>0){
            var item = {};
            item.id = id;
            item.num = num;
            item.weight =  tj.mainData.getItemWeight(item.id);
            this._dropItemList.push(item);
            this.addUIItem("drop", item.id, item.num);
        }
    },

    refresh_bag_item:function(){
        for(var i in this._bagItemList) {
            var item = this._bagItemList[i];
            if(!tj.mainData.haveItemInfo(item.id))
                continue;
            this.addUIItem("bag", item.id, item.num);
        }
    },

    refresh_drop_item:function(){
        this._dropItemList.sort(this.sort_weight);
        for(var i in this._dropItemList) {

            var item = this._dropItemList[i];
            if(!tj.mainData.haveItemInfo(item.id))
                continue;
            this.addUIItem("drop", item.id, item.num);
        }
    },

    sort_weight:function(a,b)
    {
        return a.weight > b.weight;
    },

    pick_all:function(){
        var pick_items = [];
        var bagfull = false;
        for(var i in this._dropItemList) {
            var item = this._dropItemList[i];
            var add_c = this.add_bag_item(item.id, item.num);
            if(add_c > 0){
                var pitem = {};
                pitem.id = item.id;
                pitem.add_c = add_c;
                pick_items.push(pitem);
            }
            if(add_c < item.num)
                bagfull = true;
        }
        for(var j in pick_items) {
            pitem = pick_items[j];
            this.add_drop_item(pitem.id, -pitem.add_c)
        }
        this.refresh_weight();
        return bagfull;
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
        }else if(type == ccui.Widget.TOUCH_CANCELED){
            this._push_item = null;
            this._push_time = 0;
            switch (btn.getName()) {
                case "btnMain1":
                case "btnMain2":
                case "btnMain3":
                case "btnMain4":

                    if (this._curr_popLayer)
                        this._curr_popLayer.set_release();
                    break;
            }
        }else if (type == ccui.Widget.TOUCH_ENDED) {
            this._push_item = null;
            this._push_time = 0;
            switch(btn.getName()){
                case "btnClosed":
                    var hasPro = false;
                    for(var i in this._dropItemList) {
                        var item = this._dropItemList[i];
                        var iteminfo = tj.mainData.getItemInfo(item.id);
                        if (iteminfo && (iteminfo.itemLv >= 5 || iteminfo.Proficiency >= 5) )
                            hasPro = true;
                    }
                    if(hasPro){
                        var str = tj.cfg.get("text/pickup/confirmClose");
                        this._curr_popLayer = createMsgBox2(this, str, function(tag){
                            if (tag == 0)
                                this.send_pick_done();
                            return true;
                        }.bind(this) , 2);
                    }else
                        this.send_pick_done();
                    break;
                case "btnMain1":
                case "btnMain2":
                case "btnMain3":
                case "btnMain4":
                    if(this._curr_popLayer)
                        break;
                    var itemid = btn.itemid;
                    if(btn.opt == 1) {          //丢弃
                        var num = 1;
                        var n = this.add_bag_item(itemid, -1);
                        if (n < 0) {
                            //如果是丢弃，根据实际丢弃的值来增加拾取栏数量
                            num = -n
                        }
                        this.add_drop_item(itemid, num);
                        this.refresh_weight();
                    }else if(btn.opt == 2){     //拾取
                        var add_c = this.add_bag_item(itemid, 1);
                        if(add_c > 0){
                            this.add_drop_item(itemid, -add_c);
                            this.refresh_weight();
                        }else
                            createMainNoticeBox(tj.cfg.get("text/pickup/bagfull"));
                    }
                    break;
                case "btnPick":
                    var bagfull = this.pick_all();
                    if(!bagfull)
                        this.send_pick_done();
                    else
                        createMainNoticeBox(tj.cfg.get("text/pickup/bagfull"));
                    break;
            }
        }
    },

    send_pick_done:function(){
        var param = {};
        for(var i in this._bagItemList) {
            var bitem = this._bagItemList[i];
            if(!param.hasOwnProperty(bitem.id))
                param[bitem.id] = [];
            param[bitem.id][0] = bitem.num;
            param[bitem.id][1] = 0;
        }
        for(i in this._dropItemList) {
            var pitem = this._dropItemList[i];
            if(!param.hasOwnProperty(pitem.id))
                param[pitem.id] = [];
            param[pitem.id][0] = param[pitem.id][0]?param[pitem.id][0]:0;
            param[pitem.id][1] = pitem.num;
        }
        tj.wsconnection.setMsg(msgac["Pick_done"], param);
    },

    process_ac : function(doc) {
        var msg_id = doc[0];
        var data = doc[1];
        switch (msg_id) {
            case msgac["Pick_one"]:
                var ret = data.ret;
                switch (ret) {
                    case 0:
                        var itemname = tj.mainData.getItemName(data.id);
                        if(data.id == 10) {
                            tj.wsconnection.pushmsg(msgac["Main_refresh_resource"]);
                            createMainNoticeBox(tj.cfg.get("text/pickup/get").format(itemname, data.del, data.sum));
                        }else if(data.id == 9) {
                            createMainNoticeBox(tj.cfg.get("text/pickup/get").format(itemname, data.del, data.sum));
                        }else{
                            createMainNoticeBox(itemname + "+" + data.del);
                        }
                        tj.mainData.setItemNum(data.id, data.sum);
                        break;
                    case 1:
                        this.noticetext_add(tj.cfg.get("text/pickup/failed"));
                        break;
                    case 2:
                        this.noticetext_add(tj.cfg.get("text/pickup/less"));
                        break;
                    case 3:
                        this.noticetext_add(tj.cfg.get("text/pickup/bagfull"));
                        break;
                }
                break;
            case msgac["Pick_done"]:
                this._push_item = null;
                this._push_time = 0;
                var ret = data.ret;
                cc.log("pickupLayer process_ac Pick_done ret = " + ret);
                if(data.hasOwnProperty("curweight"))
                    this._bagc = data.curweight;
                if(data.hasOwnProperty("maxweight"))
                    this._bagmax = data.maxweight;
                switch (ret) {
                    case 0:
                        for(var i in data.items) {
                            var obj = data.items[i];
                            if (obj.hasOwnProperty("einfo"))
                                tj.mainData.updateEquipInfoToBag(obj.einfo);
                            else
                                tj.mainData.setBagItemNum(obj.id, obj.num);
                        }
                        for(var i in data.auto) {
                            var obj = data.auto[i];
                            var itemname = tj.mainData.getItemName(obj.id);
                            createMainNoticeBox(itemname + "+" + obj.num);
                            tj.mainData.setItemNum(obj.id, obj.sum);
                        }
                        this.set_release();
                        if(this._cb)
                            this._cb();
                        break;
                    case 1:
                        createMainNoticeBox(tj.cfg.get("text/pickup/bagfull"));
                        break;
                    case 2:
                        createMainNoticeBox(tj.cfg.get("text/pickup/nopicking"));
                        tj.log("pick done status error, force release pick Layer");
                        this.set_release();
                        if(this._cb)
                            this._cb();
                        break;
                }
                tj.wsconnection.pushmsg(msgac["Bag_refresh_weight"],{"bagc": data.curweight, "bagmax":data.maxweight});
                break;
        }
    },

    update: function (dt) {
        this._super();
        if(this._push_item != null)
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
                    this.removeCurrPopLayer();
                    this._curr_popLayer = createNoteBoxCard(this, btn.itemid);
                    this._push_item = null;
                    this._push_time = 0;
                    break;
            }
        }
    },

    refreshPickCloseBtn:function(){
        var dropWeightSum = 0;
        for(var i in this._dropItemList) {
            var item = this._dropItemList[i];
            var w = tj.mainData.getItemWeight(item.id);
            if(w > 0 && item.num > 0){
                dropWeightSum = dropWeightSum + item.num*w;
            }
        }

        var pSize = WidgetDig(this._ui, "set/btnPick").getParent().getContentSize();
        var pickBtn =  WidgetDig(this._ui, "set/btnPick");
        var pickBtnBG = WidgetDig(this._ui, "set/btnPick/BG");
        var pickBtnHeight = WidgetDig(this._ui, "set/btnPick").getContentSize().height;
        var pickBtnBGHeight = WidgetDig(this._ui, "set/btnPick/BG").getContentSize().height;
        if(this._bagc + dropWeightSum <= this._bagmax){
            WidgetDig(this._ui, "set/btnClosed").setVisible(false);
            pickBtn.setContentSize(pSize.width,pickBtnHeight);
            pickBtnBG.setContentSize(pickBtn.getContentSize().width*0.96,pickBtnBGHeight);
        }else{
            WidgetDig(this._ui, "set/btnClosed").setVisible(true);
            pickBtn.setContentSize(pSize.width*0.5,pickBtnHeight);
            pickBtnBG.setContentSize(pickBtn.getContentSize().width*0.94,pickBtnBGHeight);
        }
        pickBtnBG.setPositionX(pickBtn.getContentSize().width*0.5);
        WidgetDig(this._ui, "set/btnPick/text").setPositionX(pickBtn.getContentSize().width*0.5);
    }
});

function createPickupLayer(parent, bagc, bagMax, items, cb) {
    var pRet = LayerCacheMgr.getInstance().getLayer("pickup");
    if (pRet.getParent() !== null) {
        pRet.removeFromParent();
    }
    // var pRet = new pickupLayer();
    if (pRet) {
        pRet.setData(bagc, bagMax, items, cb);
        var z = -1;
        var childs = parent.getChildren();
        for (var i = 0; i < childs.length; ++i) {
            if (childs[i].getLocalZOrder() > z)
                z = childs[i].getLocalZOrder();
        }
        pRet.setLocalZOrder(z+1);
        pRet._tjParent = parent;
        parent.addChild(pRet);
        return pRet;
    } else if (pRet)
        delete pRet;
    return null;
}
