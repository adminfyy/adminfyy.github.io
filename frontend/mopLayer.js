/**
 * Created by likx on 2016/10/18.
 */

var mopLayer = baseLayer.extend({
    _mapList:null,
    _mapMuban:null,
    _portraitsMuban:null,
    _uiMapList:{},
    _update_t:0,

    ctor : function(parent){
        this._super();
        this._basename = "mop";
        this._uiMapList = {};
    },

    init : function() {
        if (!this._super())
            return false;

        this._ui = this.load_ui("uiMop.json");
        if (!this._ui)
            return false;
        this.addChild(this._ui);

        this._mapList = WidgetDig(this._ui, "main/list");
        this._mapMuban = WidgetDig(this._ui, "main/list/map");
        this._portraitsMuban = WidgetDig(this._ui, "main/list/map/hero/portraits");
        this.setRetain(this._mapMuban, "uitmpl");
        this.setRetain(this._portraitsMuban, "uitmpl");
        this._mapList.removeAllChildren(true);

        WidgetDig(this._ui, "main/text/textRight").setString(tj.cfg.get("text_on_ui/mop/select"));
        WidgetDig(this._ui, "set/btnClosed/text").setString(tj.cfg.get("text_on_ui/close"));

        tj.wsconnection.addGrp(msgac["Explore_start"], msgac["Explore_getreward"], this.process_ac.bind(this), this.get_scene_name());
        //tj.wsconnection.addGrp(msgac["Refresh_Mop_time"], msgac["Refresh_Mop_time"], this.process_ac.bind(this), this.get_scene_name());

        this.schedule(this.refresh_time.bind(this), 1);

        this.refreshMap();
        return true;
    },

    refreshMap:function(){
        var expeditions = tj.mainData.main.expeditions;
        if(!expeditions)
            return;
        for(var i in expeditions.quests){
            var quest = expeditions.quests[i];
            var row = tj.dbdata.getrow("exquest", quest.qid);
            if(row){
                var p2 =  this._uiMapList[quest.qid];
                if (!p2){
                    p2 = this._mapMuban.clone();
                    this._mapList.pushBackCustomItem(p2);
                    this._uiMapList[quest.qid] = p2;
                }
                WidgetDig(p2, "btnMain").setEnabled(false);
                WidgetDig(p2, "btnMain/text/textName").setString(row.name);
                WidgetDig(p2, "btnMain/text/textDescribe").setString(row.briefing);
                WidgetDig(p2, "btnMain/text/textTime").setVisible(false);
                WidgetDig(p2, "btnMain/BGD").loadTexture("ui/icon/"+row.mapPicture, ccui.Widget.PLIST_TEXTURE)
                WidgetDig(p2, "team").setVisible(false);
                WidgetDig(p2, "set/btnMop/text").setColor(cc.color.WHITE);
                WidgetDig(p2, "set/btnMop/text").setString(tj.cfg.get("text_on_ui/mop/go"));
                WidgetDig(p2, "set/btnMop").qid = quest.qid;
                WidgetDig(p2, "set/btnMop").opt = 1;
                var herolist = WidgetDig(p2, "hero");
                herolist.removeAllChildren(true);
                if(quest.state > 0){
                    var team = quest.team;
                    for (var h in team){
                        var heroinfo = tj.mainData.getOwnHeroById(team[h]);
                        if(!heroinfo)
                            continue;
                        var p3 = this._portraitsMuban.clone();
                        if (!p3)
                            return false;
                        herolist.pushBackCustomItem(p3);
                        WidgetDig(p3, "star").loadTexture(heroinfo.StarIcon, ccui.Widget.PLIST_TEXTURE);
                        WidgetDig(p3, "level").loadTexture(heroinfo.FrameIcon, ccui.Widget.PLIST_TEXTURE);
                        WidgetDig(p3, "icon").loadTexture(heroinfo.Portraits, ccui.Widget.PLIST_TEXTURE);
                    }
                    WidgetDig(p2, "team").setVisible(true);
                    WidgetDig(p2, "team/text").setString(quest.teamid);

                    this.refresh_uitime(quest, p2);
                    //var sec = tj.gameClock.millisecond2StringAddHours(quest.remains*1000);
                    //WidgetDig(p2, "btnMain/text/textTime").setVisible(true);
                    //WidgetDig(p2, "btnMain/text/textTime").setString(sec);
                    //WidgetDig(p2, "set/btnMop/text").setString(tj.cfg.get("text_on_ui/mop/cancel"));
                    //WidgetDig(p2, "set/btnMop").opt = 2;
                    //if(quest.remains == 0){
                    //    WidgetDig(p2, "set/btnMop/text").setString(tj.cfg.get("text_on_ui/mop/getReward"));
                    //    WidgetDig(p2, "set/btnMop/text").setColor(cc.color.GREEN);
                    //    WidgetDig(p2, "btnMain/text/textTime").setString(tj.cfg.get("text_on_ui/mop/end"));
                    //    WidgetDig(p2, "btnMain/text/textTime").setColor(cc.color.WHITE);
                    //    WidgetDig(p2, "set/btnMop").opt = 3;
                    //}
                }
            }
        }
    },

    refresh_time:function(){
        var expeditions = tj.mainData.main.expeditions;
        if(!expeditions)
            return;
        for(var i in expeditions.quests) {
            var quest = expeditions.quests[i];
            if(quest.endtime){
                var p2 =  this._uiMapList[quest.qid];
                if(!p2)
                    continue;
                this.refresh_uitime(quest, p2);
            }
        }
    },

    refresh_uitime:function(quest, p2){
        if(quest.state == 1){
            var now = new Date();
            var lefttime = quest.endtime - now;
            var str = tj.gameClock.millisecond2StringAddHours(lefttime);
            WidgetDig(p2, "btnMain/text/textTime").setVisible(true);
            WidgetDig(p2, "btnMain/text/textTime").setString(str);
            WidgetDig(p2, "set/btnMop/text").setString(tj.cfg.get("text_on_ui/mop/cancel"));
            WidgetDig(p2, "set/btnMop").opt = 2;
            if(lefttime <= 0) {
                quest.endtime = undefined;
                quest.state = 2;
            }
        }
        if(quest.state == 2){
            WidgetDig(p2, "set/btnMop/text").setString(tj.cfg.get("text_on_ui/mop/getReward"));
            WidgetDig(p2, "set/btnMop/text").setColor(cc.color.GREEN);
            WidgetDig(p2, "btnMain/text/textTime").setVisible(true);
            WidgetDig(p2, "btnMain/text/textTime").setString(tj.cfg.get("text_on_ui/mop/end"));
            WidgetDig(p2, "btnMain/text/textTime").setColor(cc.color.WHITE);
            WidgetDig(p2, "set/btnMop").opt = 3;
        }
    },

    process_ac : function(doc) {
        var msg_id = doc[0];
        var data = doc[1];
        switch (msg_id) {
            case msgac["Explore_start"]:
                switch (data.ret){
                    case 0:
                        if(this._curr_popLayer){
                            this._curr_popLayer.set_release();
                            this._curr_popLayer = null;
                        }
                        var expeditions = tj.mainData.main.expeditions;
                        expeditions.expedition_time = data.cost.left;
                        for(var i in expeditions.quests) {
                            var quest = expeditions.quests[i];
                            if(quest.qid == data.qid){
                                quest.team = data.teams;
                                quest.remains = data.remain;
                                var now = new Date();
                                quest.endtime = new Date(now.valueOf() + data.remain*1000);
                                quest.state = 1;
                                quest.teamid = data.teamid;
                            }
                        }
                        this.refreshMap();
                        tj.wsconnection.pushmsg(msgac["Refresh_Team_BtnSet"]);
                        break;
                    case 1:
                        this.noticetext_add(tj.cfg.get("text/mop/err1"), true);
                        break;
                    case 2:
                        this.noticetext_add(tj.cfg.get("text/mop/err2"), true);
                        break;
                    case 3:
                        this.noticetext_add(tj.cfg.get("text/mop/err3"), true);
                        break;
                    case 4:
                        this.noticetext_add(tj.cfg.get("text/mop/err4"), true);
                        break;
                    case 5:
                        this.noticetext_add(tj.cfg.get("text/mop/err5"), true);
                        break;
                    case 6:
                        this.noticetext_add(tj.cfg.get("text/mop/err6"), true);
                        break;
                    case 7:
                        this.noticetext_add(tj.cfg.get("text/mop/err7"), true);
                        break;
                    case 8:
                        this.noticetext_add(tj.cfg.get("text/mop/err8"), true);
                        break;
                    case 9:
                        this.noticetext_add(tj.cfg.get("text/mop/err9"), true);
                        break;
                }
                break;
            case msgac["Explore_getreward"]:
                switch (data.ret){
                    case 0:
                        expeditions = tj.mainData.main.expeditions;
                        for(i in expeditions.quests) {
                            quest = expeditions.quests[i];
                            if(quest.qid == data.qid){
                                quest.team = null;
                                quest.remains = -1;
                                quest.endtime = undefined;
                                quest.state = 0;
                                quest.teamid = 0;
                            }
                        }
                        for(i in data.gets.equips) {
                            var equip = data.gets.equips[i];
                            tj.mainData.updateEquipInfo(equip);
                        }
                        for(i in data.gets.items) {
                            var item = data.gets.items[i];
                            tj.mainData.setItemNum(item.id, item.sum);
                        }
                        if(data.gets.coin && data.gets.coin.sum > 0)
                            tj.mainData.setCoinNum(data.gets.coin.sum);
                        if(data.gets.exp && data.gets.exp.sum > 0)
                            tj.mainData.getTavern().Exp = data.gets.exp.sum;
                        createMopLootLayer(this, data.gets);
                        this.refreshMap();
                        tj.wsconnection.pushmsg(msgac["Refresh_Team_BtnSet"]);
                        break;
                    case 1:
                        this.noticetext_add(tj.cfg.get("text/mop/err2"), true);
                        break;
                    case 2:
                        this.noticetext_add(tj.cfg.get("text/mop/err10"), true);
                        break;
                    case 3:
                        this.noticetext_add(tj.cfg.get("text/mop/err11"), true);
                        break;
                }
                break;
            //case msgac["Refresh_Mop_time"]:
            //    this.refreshMap();
            //    break;
        }
    },

    onEnter: function(){
        this._super();
    },

    defaultTouchButton : function(btn, type) {
        if(type == ccui.Widget.TOUCH_BEGAN) {

        }else if (type == ccui.Widget.TOUCH_ENDED) {
            switch(btn.getName()){
                case "btnClosed":
                    this.set_release();
                    break;
                case "btnMop":
                    if(btn.opt == 1){
                        if(tj.mainData.select_hero_inmop())
                            this.noticetext_add(tj.cfg.get("text/team/heromoping"));
                        else
                            this._curr_popLayer = createMopApproveLayer(this, btn.qid);
                    }else if(btn.opt == 2){
                        var str = tj.cfg.get("text/mop/cancelask");
                        this._curr_popLayer = createMsgBox2(this, str, function (tag) {
                            if (tag == 0)
                                tj.wsconnection.setMsg(msgac["Explore_getreward"], {"qid": btn.qid});
                            return true;
                        }, 2);
                    }else
                        tj.wsconnection.setMsg(msgac["Explore_getreward"], {"qid": btn.qid});
                    break;
            }
        }
    }
});

function createMopLayer(parent){
    var pRet = new mopLayer();
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
}

