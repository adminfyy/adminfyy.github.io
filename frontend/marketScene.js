/**
 * 市场界面
 * Created by fudq on 2015/12/8.
 */

var marketLayer = baseLayer.extend({
    _ui:null,
    _outCity:0,
    _current_selectType:0,
    _nextRefreshTime:0,
    _nextManualRefreshTime:0,
    _template:null,
    _uitextTime:null,
    _showList:null,
    _mubanList:[],
    _second:0,
    _push_item:null,
    _push_time:0,
    _push_pos:null,
    ctor: function () {
        this._super();
        this.init();
        this._mubanList = [];
        this._basename = "market";
        return true;
    },

    init: function () {
        if (!this._super())
            return false;

        this._ui = this.load_ui("uiMarket.json");
        if (!this._ui)
            return false;
        this.addChild(this._ui);

        this._push_item = null;
        this._push_time = 0;

        //去掉按钮
        var btnRight = WidgetDig(this._ui, "title/btnRight");
        if(btnRight)
            btnRight.removeFromParent(true);

        var btnLeft = WidgetDig(this._ui, "title/btnLeft");
        if(btnLeft)
            btnLeft.removeFromParent(true);

        this._template = WidgetDig(this._ui,"main/list/good");
        // this._template.retain();
        this.setRetain(this._template, "uitmpl")
        this._template.removeFromParent(true);
        WidgetDig(this._ui,"main/list").removeAllChildren();

        this._uitextTime = WidgetDig(this._ui, "main/bar/textTime");
        this._uitextTime.setString("");
        this._uiloadingbar = WidgetDig(this._ui, "main/bar/Loading");
        this._uiloadingbar.setPercent(0);
        this.refreshTimeBar();

        WidgetDig(this._ui, "set/btnGem/text").setString(tj.cfg.get("text_on_ui/market/btnGem"));
        WidgetDig(this._ui, "set/btnMarket/text").setString(tj.cfg.get("text_on_ui/market/btnMarket"));
        WidgetDig(this._ui, "set/btnRefresh/text").setString(tj.cfg.get("text_on_ui/market/btnRefresh"));
        this.setContentString(WidgetDig(this._ui,"set/btnClosed/text"), tj.cfg.get("text_on_ui/close"));

        return true;
    },

    onEnter : function() {
        this._super();
        tj.wsconnection.addGrp(msgac["Market_list_trans"], msgac["Market_buy"], this.process_ac.bind(this), this.get_scene_name());

        this.initScene();
        this.refreshTimeBar();
        //时钟动画
        playUIAnimate(this._ui, "main/bar/anTime", true);
     },

    onExit : function() {
        this._super();
        WidgetDig(this._ui,"main/list").removeAllChildren();
        this._mubanList = [];
        this._push_item = null;
        this._push_time = 0;
    },

    initScene: function () {
        this._push_item = null;
        this._push_time = 0;
        this.refreshUI();
        this.setBtnState(0);
    },

    refreshUI:function(){
        var playerGold = tj.mainData.getCoinNum();
        var playerGem = tj.mainData.getGemNum();
        WidgetDig(this._ui, "main/text/textRight").setString(tj.cfg.get("text/market/gold").format(playerGold.toString()));
        WidgetDig(this._ui, "main/text/textLeft").setString(tj.cfg.get("text/market/diamond").format(playerGem.toString()));
    },

    on_ws_reopen: function () {
        this.initScene();
    },

    refreshTimeBar:function(){
        var now = new Date();
        var reFreshTime = new Date(tj.mainData.getMarketList().auto_t);
        var diff = reFreshTime - now;
        var change = tj.gameClock.millisecond2StringAddHours(diff);
        this._uitextTime.setString(change);
        var left_sec = (diff) / 1000;
        var aDayToSec = tj.mainData.getMarketList().auto_intervel_secs;
        var percent = (left_sec / aDayToSec) * 100;
        percent = Math.min(percent, 100);
        percent = Math.max(percent,0);
        this._uiloadingbar.setPercent(percent);
    },

    update: function (dt) {
        this._super();
        this._second = this._second + dt;
        if(this._second >= 1){
            this._second = 0;
            this.refreshTimeBar();
        }

        if(this._push_item != null){
            var btn = this._push_item;
            var time = this._push_time;
            var pos2 = this._push_item.convertToWorldSpace(this._push_item.getPosition());
            if(!pos2){
                return;
            }
            var dis = this.getDistance(pos2, this._push_pos);
            if(dis > tj.cfg.get("designdata/configNum/clickDis"))
            {
                this._push_item = null;
                this._push_pos = 0;
            }else{
                var nowTime = new Date();
                var diff = nowTime - time;
                if(diff <= tj.cfg.get("designdata/configNum/clickTime"))
                    return;
                switch (btn.getName()){
                    case "add":
                        this.addCount(btn);
                        break;
                    case "min":
                        this.minCount(btn);
                        break;
                }
            }
        }
    },
    addCount:function(btn){
        var str = WidgetDig(btn.getParent(),"textNum").getString();
        var nowNum = parseInt(str.split("/")[0]);
        var maxNum = parseInt(str.split("/")[1]);
        if(nowNum >= maxNum){
            this._push_item = null;
            this._push_time = 0;
            this._push_pos = 0;
            this.noticetext_add(tj.cfg.get("text/market/not_enough"));
            return;
        }
        nowNum = nowNum + 1;
        this.refresh_price_num(btn, nowNum, maxNum);
    },
    minCount: function (btn) {
        var str = WidgetDig(btn.getParent(),"textNum").getString();
        var nowNum = parseInt(str.split("/")[0]);
        var maxNum = parseInt(str.split("/")[1]);
        if(nowNum <= 1){
            return;
        }
        nowNum = nowNum - 1;
        this.refresh_price_num(btn, nowNum, maxNum);
    },

    refresh_price_num:function(btn, nowNum, maxNum){
        var price = this.getItemById(btn.getTag(), this._showList, "Id").Price * nowNum;
        if(this._current_selectType == 0){
            if(tj.mainData.getCoinNum() < price)
                WidgetDig(btn.getParent().getParent(),"textDemand").setColor(cc.color.RED);
            else
                WidgetDig(btn.getParent().getParent(),"textDemand").setColor(cc.color.WHITE);
        }else if(this._current_selectType == 1){
            if(tj.mainData.getGemNum() < price)
                WidgetDig(btn.getParent().getParent(),"textDemand").setColor(cc.color.RED);
            else
                WidgetDig(btn.getParent().getParent(),"textDemand").setColor(cc.color.WHITE);
        }
        WidgetDig(btn.getParent().getParent(),"textDemand").setString(tj.cfg.get("text/market/price1").format(price.toString()));

        this.setContentString(WidgetDig(btn.getParent(),"textNum"), nowNum.toString() + "/" + maxNum.toString());
    },

    showList: function (beforce) {
        //get List
        if(this._current_selectType == 0){
            this._showList = tj.mainData.getMarketList().shopitems;
        }else if(this._current_selectType == 1){
            this._showList = tj.mainData.getMarketList().gemshopitems;
        }

        this._push_item = null;
        //removechild
        if(beforce){
            WidgetDig(this._ui,"main/list").removeAllChildren();
            this._mubanList = [];
        }

        //showList
        for(var i in this._showList) {
            var price = this._showList[i].Price;
            var Store = this._showList[i].Store;
            var showid = this._showList[i].Id;

            var v_muBan = this.getShowMuban(showid);
            if(!v_muBan){
                v_muBan = this._template.clone();
                if (!v_muBan)
                    continue;
                v_muBan.showid = showid;
                WidgetDig(this._ui,"main/list").pushBackCustomItem(v_muBan);
                this._mubanList.push(v_muBan);
            }

            if(this._current_selectType == 0){
                WidgetDig(v_muBan,"more/icon").loadTexture(RES_ICON_PROP_PATH + "resGold.png", ccui.Widget.PLIST_TEXTURE);
            }else if(this._current_selectType == 1){
                WidgetDig(v_muBan,"more/icon").loadTexture(RES_ICON_PROP_PATH + "resGem.png", ccui.Widget.PLIST_TEXTURE);
            }

            var infoList = this.getItemById(showid, tj.dbdata._all["item"], "id");
            if(infoList == null){
                cc.log("market::showList infolist null!");
                continue;
            }
            var icon = tj.mainData.getItemIcon( showid);
            if(icon)
                WidgetDig(v_muBan,"btnMain/portraits/icon").loadTexture(icon, ccui.Widget.PLIST_TEXTURE);
            var ficon = tj.mainData.getItemFrameIcon( showid);
            if(ficon)
                WidgetDig(v_muBan,"btnMain/portraits/level").loadTexture(ficon, ccui.Widget.PLIST_TEXTURE);
            WidgetDig(v_muBan,"btnMain/text/textName").setString(infoList["name"]);
            WidgetDig(v_muBan,"btnMain/text/textExplain").setString(infoList["info"]);
            if(this._current_selectType == 0){
                if(tj.mainData.getCoinNum() < price)
                    WidgetDig(v_muBan,"more/textDemand").setColor(cc.color("#FF0000"));
                else
                    WidgetDig(v_muBan,"more/textDemand").setColor(cc.color.WHITE);
            }else if(this._current_selectType == 1){
                if(tj.mainData.getGemNum() < price)
                    WidgetDig(v_muBan,"more/textDemand").setColor(cc.color("#FF0000"));
                else
                    WidgetDig(v_muBan,"more/textDemand").setColor(cc.color.WHITE);
            }

            if(Store == 0){
                price = 0;
                WidgetDig(v_muBan,"more/num/textNum").setString("0" + "/" + Store.toString());
                WidgetDig(v_muBan,"more/textDemand").setString(tj.cfg.get("text/market/price1").format(price.toString()));
                WidgetDig(v_muBan,"btnBuy/text").setColor(cc.color("#FF0000"));
                this.setContentString(WidgetDig(v_muBan,"btnBuy/text"), tj.cfg.get("text/market/sellOut"));
                WidgetDig(v_muBan,"btnBuy").setTouchEnabled(false);
            }else{
                WidgetDig(v_muBan,"more/num/textNum").setString("1" + "/" + Store.toString());
                WidgetDig(v_muBan,"more/textDemand").setString(tj.cfg.get("text/market/price1").format(price.toString()));
                WidgetDig(v_muBan,"btnBuy").setTouchEnabled(true);
            }

            WidgetDig(v_muBan,"btnBuy").setTag(showid);
            WidgetDig(v_muBan,"btnMain").setTag(showid);

            var add = WidgetDig(v_muBan,"more/num/add");
            //var addIcon = new cc.Sprite();
            //addIcon.setTexture("res/art/ui/icon/iconModifiedAdd.png");
            //add.addChild(addIcon);
            //addIcon.setPosition(cc.p(add.getContentSize().width/2,add.getContentSize().height/2));
            add.setTag(showid);
            var min = WidgetDig(v_muBan,"more/num/min");
            //var minIcon = new cc.Sprite();
            //minIcon.setTexture("res/art/ui/icon/iconModifiedMin.png");
            //min.addChild(minIcon);
            //minIcon.setPosition(cc.p(min.getContentSize().width/2,min.getContentSize().height/2));
            min.setTag(showid);

             var size =  WidgetDig(this._template, "btnMain").getContentSize();
            WidgetDig(v_muBan,"btnMain").setContentSize(size);
            size =  WidgetDig(this._template, "btnBuy").getContentSize();
            WidgetDig(v_muBan,"btnBuy").setContentSize(size);
            size =  WidgetDig(this._template, "more/num/add").getContentSize();
            WidgetDig(v_muBan,"more/num/add").setContentSize(size);
            size =  WidgetDig(this._template, "more/num/min").getContentSize();
            WidgetDig(v_muBan,"more/num/min").setContentSize(size);
        }
    },

    getShowMuban:function(showid){
        for(var i in this._mubanList){
            var mu = this._mubanList[i];
            if(mu.showid == showid)
                return mu;
        }
        return null;
    },

    defaultTouchButton : function(btn, type) {
        if (type == ccui.Widget.TOUCH_BEGAN){
            switch (btn.getName()){
                case "add":
                case "min":
                    this._push_item = btn;
                    this._push_time = new Date();
                    this._push_pos = btn.convertToWorldSpace(btn.getPosition());
                    break;
            }
        } else if ( type == ccui.Widget.TOUCH_CANCELED){
            this._push_item = null;
            this._push_time = 0;
            this._push_pos = 0;
        } else if ( type == ccui.Widget.TOUCH_MOVED){
            if(btn != null){
                var pos2 = btn.convertToWorldSpace(btn.getPosition());
                if(pos2){
                    var dis = this.getDistance(pos2, this._push_pos);
                    if(dis > tj.cfg.get("designdata/configNum/clickDis")) {
                        this._push_item = null;
                    }
                }
            }
        } else if (type == ccui.Widget.TOUCH_ENDED) {
            switch (btn.getName()){
                case "btnClosed":
                    // this.removeFromParent(true);
                    // Market_Layer = null;
                    this.set_release();
                    break;
                case "btnMarket":
                    this.setBtnState(0);
                    break;
                case "btnGem":
                    this.setBtnState(1);
                    break;
                case "btnRefresh":
                    var that = this;
                    var playerLaterRefreshTime = tj.mainData.getMarketList().manual_t;
                    var playerRefreshCount = tj.mainData.getMarketList().n;
                    var now = new Date();
                    var nextRefreshTime = new Date(playerLaterRefreshTime);
                    if((now - nextRefreshTime) < 0){
                        var diff = nextRefreshTime - now;
                        this.noticetext_add(tj.cfg.get("text/market/notRightTime").format(tj.gameClock.millisecond2StringAddHours(diff)));
                        return;
                    }
                    var refreshInfo = this.getRefreshFeeByCount(playerRefreshCount);
                    var gl = new useGemLayer(function () {
                        return useGemLayer.buildCoinOrGemData(refreshInfo);
                    }, function (v) {
                        cc.log("useGemLayer return:", typeof(v), v);
                        switch (v) {
                            case 0: //金币
                                tj.wsconnection.setMsg(msgac["Market_refresh"], {"opt":1});
                                break;
                            case 1: //宝石
                                tj.wsconnection.setMsg(msgac["Market_refresh"], {"opt":2});
                                break;
                            default:
                                break;
                        }
                    });
                    that.addChild(gl);
                    gl._tjParent = that;
                    break;
                case "btnMain":
                    this._curr_popLayer = createNoteBoxCard(this, btn.getTag());
                    break;
                case "add":
                    this.addCount(btn);
                    this._push_item = null;
                    this._push_time = 0;
                    this._push_pos = 0;
                    break;
                case "min":
                    this.minCount(btn);
                    this._push_item = null;
                    this._push_time = 0;
                    this._push_pos = 0;
                    break;
                case "btnBuy":{
                    var ItemId = btn.getTag();
                    var str = WidgetDig(btn.getParent(),"more/num/textNum").getString();
                    var nowNum = parseInt(str.split("/")[0]);
                    var id;
                    if(this._outCity == 0){
                        if(this._current_selectType == 0){
                            id = 0;
                        }else if (this._current_selectType == 1){
                            id = 1;
                        }
                    }else{
                        if(this._current_selectType == 0){
                            id = 100;
                        }else if (this._current_selectType == 1){
                            id = 101;
                        }
                    }
                    if(nowNum <= 0){
                        this.noticetext_add(tj.cfg.get("text/market/noNum"));
                        return;
                    }
                    tj.wsconnection.setMsg(msgac["Market_buy"], {"id": id, "itemid": ItemId,"cnt": nowNum, "jewel":this._current_selectType});
                }break;
                default :
                    break;
            }
        }
    },
    getJewelRateById: function (id) {
        for(var i in tj.dbdata._all["resproduce"]){
            if(tj.dbdata._all["resproduce"][i]["id"] == id){
                return tj.dbdata._all["resproduce"][i]["jewelRate"];
            }
        }
        return 0;
    },
    getRefreshFeeByCount : function (count) {
        for(var i in tj.dbdata._all["marketfee"]){
            var times = tj.dbdata._all["marketfee"][i]["times"];
            if(times == (count + 1))
                return tj.dbdata._all["marketfee"][i];
        }
        return null;
    },
    getItemById: function (Itemid ,list,str) {
        for(var i = 0 ; i< list.length; i ++) {
            var id = list[i][str];
            if(id == Itemid)
                return list[i];
        }
        return null;
    },

    setBtnState: function (state) {
        this._current_selectType = state;
        if(this._current_selectType == 0){
            WidgetDig(this._ui,"set/btnMarket").setTouchEnabled(false);
            WidgetDig(this._ui,"set/btnMarket").setHighlighted(true);
            WidgetDig(this._ui,"set/btnGem").setTouchEnabled(true);
            WidgetDig(this._ui,"set/btnGem").setHighlighted(false);
            this.showList(true);
        }else if(this._current_selectType == 1) {
            WidgetDig(this._ui,"set/btnMarket").setTouchEnabled(true);
            WidgetDig(this._ui,"set/btnMarket").setHighlighted(false);
            WidgetDig(this._ui,"set/btnGem").setTouchEnabled(false);
            WidgetDig(this._ui,"set/btnGem").setHighlighted(true);
            this.showList(true);
        }
    },

    process_ac : function(doc) {
        var msg_id = doc[0];
        var data = doc[1];
        switch (msg_id) {
            case msgac["Market_list_trans"]:
                this.refreshUI();
                this.showList(true);
                break;
            case msgac["Market_buy"]:
                var rdata = data.data;
                var ret = data.ret;
                switch(ret)
                {
                    case 0:
                        if(rdata.coincost)
                            tj.mainData.setCoinNum(rdata.coincost.left);
                        if(rdata.gemcost)
                            tj.mainData.setGemNum(rdata.gemcost.left);
                        this.refreshUI();
                        var addNum;
                        var totalID;
                        if(rdata.pos == "storage"){
                            if(rdata.item){
                                addNum = rdata.item.delta;
                                totalID = rdata.item.id;
                                tj.mainData.setItemNum(rdata.item.id, rdata.item.total)
                            }
                            if(rdata.equip){
                                addNum = rdata.equip.length;
                                totalID = rdata.item.id;
                                for(var i in rdata.equip){
                                    var equipInfo = rdata.equip[i];
                                    var id = equipInfo.id;
                                    var eqId = equipInfo.eqid;
                                    var equip = null;
                                    totalID = eqId;
                                    equip.id = id;
                                    equip.eqid = eqId;
                                    tj.mainData.updateEquipInfo(equip);
                                }
                            }
                        }else if (rdata.pos == "bag"){
                            if(rdata.item){
                                addNum = rdata.item.delta;
                                totalID = rdata.item.id;
                                tj.mainData.setItemNumToBag(rdata.item.id, rdata.item.total)
                            }
                            if(rdata.equip){
                                addNum =  rdata.equip.length;
                                for(var i in rdata.equip){
                                    var equipInfo = rdata.equip[i];
                                    var id = equipInfo.id;
                                    var eqId = equipInfo.eqid;
                                    var equip = null;
                                    totalID = eqId;
                                    equip.id = id;
                                    equip.eqid = eqId;
                                    tj.mainData.updateEquipInfoToBag(equip);
                                }
                            }
                        }
                        tj.mainData.changeMarketStoreByID(totalID, this._current_selectType, addNum);
                        var str = tj.mainData.getItemName(totalID) + " +" + addNum;
                        this.noticetext_add(tj.cfg.get("text/market/success") + " " + str);
                        this.showList();
                        break;
                    case 1:
                        this.noticetext_add(tj.cfg.get("text/market/noneID"));
                        break;
                    case 2:
                        this.noticetext_add(tj.cfg.get("text/market/noneItem"));
                        break;
                    case 3:
                        this.noticetext_add(tj.cfg.get("text/market/sellOut"));
                        break;
                    case 4:
                        this.noticetext_add(tj.cfg.get("text/market/noWeight"));
                        break;
                    case 10:
                        this.noticetext_add(tj.cfg.get("text/market/noGold"));
                        break;
                    case 11:
                        this.noticetext_add(tj.cfg.get("text/market/noGem"));
                        break;
                }
                break;
            case msgac["Market_refresh"]:
                var ret = data.ret;
                switch(ret) {
                    case 0:
                        tj.mainData.setMarketList(data);
                        var res = data;
                        if(res.coincost)
                            tj.mainData.setCoinNum(res.coincost.left);
                        if(res.gemcost)
                            tj.mainData.setGemNum(res.gemcost.left);

                        this.refreshUI();
                        this.noticetext_add(tj.cfg.get("text/market/successGetList"));
                        this.showList(true);
                        break;
                    case 5:
                        this.noticetext_add(tj.cfg.get("text/market/notTime"));
                        break;
                    case 7:
                        this.noticetext_add(tj.cfg.get("text/market/wrongSelect"));
                        break;
                    case 10:
                        this.noticetext_add(tj.cfg.get("text/market/noRes"));
                        break;
                }
                break;
            default :
                break;
        }
    }
});


createMarketLayer = function (parent) {
    var pRet = new marketLayer();
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



