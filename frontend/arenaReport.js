/**
 * Created by likx on 2016/10/17.
 */

var arenaReportLayer = baseLayer.extend({
    _cb : null,
    _us_tpl:null,
    _us_list:null,
    _en_tpl:null,
    _en_list:null,
    _herotpl_list:[],
    _rewards:null,

    ctor: function (data) {
        this._super();
        this._basename = 'arenaReport';
        this._herotpl_list = [];
    },

    init: function () {
        if (!this._super())
            return false;
        this._ui = this.load_ui("uiPKEnd.json");
        if (!this._ui)
            return false;
        this.addChild(this._ui);
        this.setVisible(false);

        this._us_list = WidgetDig(this._ui, "main/us/list");
        this._us_tpl = WidgetDig(this._ui, "main/us/list/template");
        this.setRetain(this._us_tpl, "uitmpl");
        this._us_list.removeAllChildren(true);

        this._en_list = WidgetDig(this._ui, "main/enemy/list");
        this._en_tpl = WidgetDig(this._ui, "main/enemy/list/template");
        this.setRetain(this._en_tpl, "uitmpl");
        this._en_list.removeAllChildren(true);

        var areateam = tj.mainData.getArenaTeam();
        this._herotpl_list = [];
        for(var i in areateam) {
            var heroid = areateam[i];
            var heroinfo = tj.mainData.getOwnHeroById(heroid);
            if(!heroinfo)
                continue;
            var p2 = this.createHeroBtn(this._us_tpl, heroinfo);
            WidgetDig(p2, "btnMain").enemy = false;
            WidgetDig(p2, "btnMain").heroid = heroid;
            if(p2)
                this._us_list.pushBackCustomItem(p2);
        }

        tj.wsconnection.addGrp(msgac["Arena_end_infos"], msgac["Arena_end_infos"], this.process_ac.bind(this), this.get_scene_name());

    },



    show:function(cb){
        this._cb = cb;
        this.setVisible(true);
        //tj.wsconnection.setMsg(msgac["Arena_end_infos"]);
    },

    process_ac : function(doc) {
        var msg_id = doc[0];
        var data = doc[1];
        switch (msg_id) {
            case msgac["Arena_end_infos"]:
                if(data.ret == 0){
                    for(var i in data.heros){
                        var hero = data.heros[i];

                        var equips = data.heros[i].Equips;
                        for(var i in equips){
                            var equip = equips[i];
                            tj.mainData.addRankEquipInfo(equip);
                        }
                        tj.mainData.addRankingHero(hero);

                        var p2 = this.createHeroBtn(this._en_tpl, hero);
                        WidgetDig(p2, "btnMain").enemy = true;
                        WidgetDig(p2, "btnMain").heroid = hero.Id;
                        if(p2)
                            this._en_list.pushBackCustomItem(p2);
                    }

                    WidgetDig(this._ui, "main/enemy/text/oppIntegral").setString(data.info.tnick);
                    WidgetDig(this._ui, "main/enemy/text/text").setString(tj.cfg.get("text/pvp/point2").format(data.info.tpoint));
                    WidgetDig(this._ui, "main/us/text/oppIntegral").setString(data.info.nick);
                    var delp = data.info.delp>0?"+"+data.info.delp:data.info.delp;
                    WidgetDig(this._ui, "main/us/text/text").setString(tj.cfg.get("text/pvp/point2").format(data.info.point+data.info.delp) + "（"+delp+"）");

                    var result_str = "";
                    switch (data.info.result){
                        case 0:
                            result_str = tj.cfg.get("text/fight/victory");
                            break;
                        case 1:
                            result_str = tj.cfg.get("text/fight/draw");
                            break;
                        case 2:
                            result_str = tj.cfg.get("text/fight/lost");
                            break;
                    }
                    WidgetDig(this._ui, "main/ready/textTime").setString(result_str);

                    for(i in data.alives){
                        var hid = data.alives[i];
                        var tpl = this.get_hero_tpl(hid);
                        if(tpl){
                            var btnMain = WidgetDig(tpl, "btnMain/portraits/icon");
                            btnMain.setColor(cc.color('#FFFFFF'));
                            cc.log("cc.color('#FFFFFF')" + " " + hid);
                        }
                    }

                    //rewards
                    this._rewards = data.info;
                    this.schedule(this.showRewards.bind(this), 1, false);
                }
                break;
            default :
                return 0;
        }
    },

    showRewards:function(){
        for (var i in this._rewards.rewards) {
            var reward = this._rewards.rewards[i];
            //tj.mainData.addStroageItem(reward.id, reward.num); //加奖励物品
            var msg = tj.mainData.getItemName(reward.id) + ' +' + reward.num;
            this.noticetext_add(msg, true);
        }
        var point = tj.cfg.get("text/pvp/point") + ' ' + ((this._rewards.delp > 0) ? '+' + this._rewards.delp.toString() : this._rewards.delp.toString());
        this.noticetext_add(point, true);
    },

    createHeroBtn:function(tpl, hero){
        var p2 = tpl.clone();
        if (!p2)
            return null;
        p2.heroid = hero.Id;
        WidgetDig(p2, "btnMain/portraits/icon").setColor(cc.color('#808080'));
        var p3 = WidgetDig(p2, "btnMain/portraits");
        var row = tj.dbdata.getrow("racetemplate", hero.Tid);
        if(row){
            var ratings = row["ratings"];
            var frameIcon = "ui/icon/iconLevel" + ratings + ".png";
            WidgetDig(p3, "level").loadTexture(frameIcon, ccui.Widget.PLIST_TEXTURE);
            var headPortraitIcon = row["protraits"];
            if (!headPortraitIcon)
                var portraits = "ui/icon/iconUnlock.png";
            else
                portraits = "ui/icon/heros/" + headPortraitIcon;
            WidgetDig(p3, "icon").loadTexture(portraits, ccui.Widget.PLIST_TEXTURE);
        }
        row = tj.dbdata.getrow("job", hero.Job);
        if(row) {
            var jobLv = row["jobLv"];
            var starIcon = "ui/icon/iconStar" + jobLv + ".png";
            WidgetDig(p3, "star").loadTexture(starIcon, ccui.Widget.PLIST_TEXTURE);
            //WidgetDig(p3, "occ").setString(row.name);
        }
        this._herotpl_list.push(p2);
        return p2;
    },

    get_hero_tpl:function(heorid){
        for(var i in this._herotpl_list){
            var tpl = this._herotpl_list[i];
            if(tpl.heroid == heorid)
                return tpl;
        }
        return null;
    },

    onExit: function () {
        this._super();
        this.unscheduleAllCallbacks();
    },

    defaultTouchButton: function (btn, type) {
        cc.log(btn.name);
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN: //按下
                break;

            case ccui.Widget.TOUCH_ENDED: //放开
                switch (btn.name) {
                    case 'btnClosed':
                        this.set_release();
                        if(this._cb)
                            this._cb();
                        break;
                    case "btnMain":
                        if(btn.enemy)
                            this._curr_popLayer = createCardHeroLayer(this, btn.heroid, heroCard_t.rank);
                        else
                            this._curr_popLayer = createCardHeroLayer(this, btn.heroid, heroCard_t.check);
                        break;
                }
                break;

            case ccui.Widget.TOUCH_CANCELED:  //取消
                break;
        }
    }
});
