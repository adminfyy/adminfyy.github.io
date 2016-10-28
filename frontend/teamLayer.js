/**
 * Created by likx on 2015/12/7.
 */

var teamLayer = baseLayer.extend({
    _ui: 0,
    _max_weight:0,
    _bag_weight:0,
    _foodcount:0,
    _pickcount:0,
    _orbcount:0,
    _uiTextWidght:null,

    ctor: function () {
        this._super();
        this._basename = "team";
        this.init();
    },

    init: function () {
        if (!this._super())
            return false;
        var origin = cc.director.getVisibleOrigin();
        this._ui = this.load_ui("uiMainBattle.json");
        if (!this._ui)
            return false;

        this.addChild(this._ui);

        this._uiTextWidght = WidgetDig(this._ui,"main/text/textRight");
        this._uiTextWidght.setTouchEnabled(true);
        this._uiTextWidght.addTouchEventListener(function(object, type){
            this._curr_popLayer = createNoteBox(this, tj.cfg.get("text/team/widghtNopte"), form_t.castleLayer);
        },this);

        WidgetDig(this._ui, "main/heros/btnReplace/text").setString(tj.cfg.get("text_on_ui/team/selectHero"));
        WidgetDig(this._ui, "main/heros/btnRefresh/text").setString(tj.cfg.get("text_on_ui/team/energy"));
        WidgetDig(this._ui, "set/btnClosed/text").setString(tj.cfg.get("text_on_ui/close"));
        WidgetDig(this._ui, "main/heros/btnA/text").setString(tj.cfg.get("text_on_ui/team/1team"));
        WidgetDig(this._ui, "main/heros/btnB/text").setString(tj.cfg.get("text_on_ui/team/2team"));
        WidgetDig(this._ui, "main/heros/btnC/text").setString(tj.cfg.get("text_on_ui/team/3team"));
        WidgetDig(this._ui, "main/heros/mop/textTime").setString(tj.cfg.get("text_on_ui/team/moping"));
        WidgetDig(this._ui, "main/heros/mop").setVisible(false);
        WidgetDig(this._ui, "set/btnMop/text").setString(tj.cfg.get("text_on_ui/team/mop"));


        //清理重复出现在不同队伍中的英雄(保留1队)
        //var team1 = tj.mainData.getClientData("team");
        //var find2 = false;
        //var find3 = false;
        //for(var i=0;i<4;i++){
        //    var id = team1[i];
        //    if(tj.mainData.clearTeam("team2", id))
        //        find2 = true;
        //    if(tj.mainData.clearTeam("team3", id))
        //        find3 = true;
        //}
        //var team2 = tj.mainData.getClientData("team2");
        //for(i=0;i<4;i++){
        //    id = team2[i];
        //    if(tj.mainData.clearTeam("team3", id))
        //        find3 = true;
        //}
        //if(find2)
        //    tj.mainData.sendClientData("team2");
        //if(find3)
        //    tj.mainData.sendClientData("team3");

        return true;
    },

    onEnter : function() {
        this._super();
        tj.wsconnection.addGrp(msgac["Refresh_energy"], msgac["Refresh_energy"], this.process_ac.bind(this), this.get_scene_name());
        tj.wsconnection.addGrp(msgac["Layer_refresh_hero"], msgac["Layer_refresh_hero"], this.process_ac.bind(this), this.get_scene_name());
        tj.wsconnection.addGrp(msgac["Hero_recover_energy"], msgac["Hero_recover_energy"], this.process_ac.bind(this), this.get_scene_name());
        tj.wsconnection.addGrp(msgac["Map_go_map"], msgac["Map_go_map"], this.process_ac.bind(this), this.get_scene_name());
        tj.wsconnection.addGrp(msgac["Unlock_team"], msgac["Unlock_team"], this.process_ac.bind(this), this.get_scene_name());
        tj.wsconnection.addGrp(msgac["Refresh_Team_BtnSet"], msgac["Refresh_Team_BtnSet"], this.process_ac.bind(this), this.get_scene_name());
        tj.wsconnection.addGrp(msgac["Verify_punish"], msgac["Verify_punish"], this.process_ac.bind(this), this.get_scene_name());
        this.initUI();
    },

    initUI : function(){
        var data = tj.mainData.getClientData("team");
        var foodid = tj.cfg.getAttr("designdata/itemID", "foodid");
        var pick_id = tj.cfg.getAttr("designdata/itemID", "pickax", "");
        var orb_id = tj.cfg.getAttr("designdata/itemID", "orb", "");
        var foodNum = tj.mainData.getResNumById(foodid);
        var pickNum = tj.mainData.getItemNum(pick_id);
        var orbNum = tj.mainData.getItemNum(orb_id);
        this._foodcount = data[4];
        if(foodNum < data[4])
            this._foodcount = foodNum;
        this._pickcount =  data[5];
        if(pickNum < data[5])
            this._pickcount = pickNum;
        this._orbcount = data[6];
        if(orbNum < data[6])
            this._orbcount = orbNum;
        this.refresh_hero();
        this.refresh_weight();
        this.refresh_btn_team();
        this.refresh_btn_set();
        this.autoFoodNum();
    },

    onExit : function(){
        this._super();
        this.removeCurrPopLayer();

        var data = tj.mainData.getBattleHero();
        for(var i in data){
            var btnHero = WidgetDig(this._ui, "main/heros/list/btnHero" + (parseInt(i)+1));
            var animation = WidgetDig(btnHero,"portraits/icon/animation");
            animation.removeAllChildren();
        }
    },

    on_ws_reopen:function(){
        this.refresh_hero();
    },

    refresh_hero:function(){
        this._max_weight = 0;
        var data = tj.mainData.getBattleHero();
        for(var i in data){
            var btnHero = WidgetDig(this._ui, "main/heros/list/btnHero" + (parseInt(i)+1));
            btnHero.heroId = 0;
            btnHero.setEnabled(false);
            var textSelect = WidgetDig(btnHero,"textSelect");
            var textProfession = WidgetDig(btnHero,"textProfession");
            var portraits = WidgetDig(btnHero,"portraits");
            var anmop = WidgetDig(btnHero,"anMop");
            textSelect.setString(tj.cfg.get("text_on_ui/team/noselect"));
            textSelect.setColor(cc.color.WHITE);
            textProfession.setVisible(false);
            portraits.setVisible(false);
            anmop.setVisible(false);

            var hid = data[i];
            if(!hid)
                continue;
            var heroinfo = tj.mainData.getOwnHeroById(hid);
            if(btnHero && heroinfo){
                btnHero.setEnabled(true);
                textProfession.setVisible(true);
                portraits.setVisible(true);
                WidgetDig(portraits,"star").loadTexture(heroinfo.StarIcon, ccui.Widget.PLIST_TEXTURE);
                WidgetDig(portraits,"level").loadTexture(heroinfo.FrameIcon, ccui.Widget.PLIST_TEXTURE);
                btnHero.heroId = hid;
                var str = heroinfo.Name + "\n" + tj.cfg.get("text_on_ui/team/name").format(heroinfo.JobName,heroinfo.Lv);
                textProfession.setString(str);
                var sp_text = tj.cfg.get("text_on_ui/team/sp") + heroinfo.Energy;
                textSelect.setString(sp_text);
                heroinfo.teamSelect = true;
                this._max_weight += (heroinfo.SelfAttr.Str + heroinfo.EquipAttr.Str);

                this.create_hero_ani(btnHero,heroinfo.Figure);
                var animation = WidgetDig(btnHero, "portraits/icon/animation");
                if(heroinfo.Race==2) {
                    if(animation){
                        animation.setPositionY(-140);
                    }
                }else{
                    animation.setPositionY(-271.47);
                }

                var curr_teamid = tj.mainData.getBattleTeamId();
                if(!tj.mainData.isTeamInMop(curr_teamid) && tj.mainData.isHeroInMop(hid)){
                    this.create_heromoping_ani(btnHero);
                }
            }
            else{
                var select_team = tj.mainData.getClientData("select_team");
                var team = tj.mainData.getClientData(select_team);
                team[parseInt(i)] = 0;
                tj.mainData.setClientData(select_team, team);
            }
        }
        this.refresh_text();
    },

    create_hero_ani:function(btnHero, figure){
        var self = this;
        WidgetDig(btnHero,"portraits/icon").setTouchEnabled(false);
        var animation = WidgetDig(btnHero,"portraits/icon/animation");
        animation.removeAllChildren();
        tj.mainData.loadAnimate(figure, function(portait){
            self.setRetain(portait.node, "ani");
            portait.node.stopAllActions();
            //portait.action.play("standby", true);
            var dur = 120;
            var sf = Math.floor(Math.random()*dur);
            portait.action.gotoFrameAndPlay(0, dur, sf, true);
            portait.node.runAction(portait.action);
            animation.addChild(portait.node);
        });
    },

    create_heromoping_ani:function(btnHero){
        var animation = WidgetDig(btnHero,"anMop");
        var pos = animation.getPosition();
        var parent = animation.getParent();
        animation.removeFromParent();
        tj.mainData.loadAnimate(RES_ANIMATION + "other/anMop.json", function(portait){
            portait.node.stopAllActions();
            portait.action.gotoFrameAndPlay(0, portait.action.getDuration(), true);
            portait.node.runAction(portait.action);
            portait.node.setPosition(pos);
            parent.addChild(portait.node);
            portait.node.setName("anMop");
        });
    },

    refresh_weight:function(){
        this._bag_weight = 0;

        var foodid = tj.cfg.getAttr("designdata/itemID", "foodid");

        var pick_id = tj.cfg.getAttr("designdata/itemID", "pickax", "");
        var orb_id = tj.cfg.getAttr("designdata/itemID", "orb", "");
        var foodNum = tj.mainData.getResNumById(foodid);
        var pickNum = tj.mainData.getItemNum(pick_id);
        var orbNum = tj.mainData.getItemNum(orb_id);

        WidgetDig(this._ui,"materials/food/textNumber").setString( this._foodcount);
        this._bag_weight +=  this._foodcount;

        WidgetDig(this._ui,"materials/pick/textNumber").setString(this._pickcount + "/" + pickNum);
        pick_id = tj.cfg.getAttr("designdata/itemID", "pickax", "");
        var w = tj.dbdata.getValueById("item", pick_id, "weight");
        this._bag_weight += this._pickcount * w;

        WidgetDig(this._ui,"materials/orb/textNumber").setString(this._orbcount + "/" + orbNum);
        orb_id = tj.cfg.getAttr("designdata/itemID", "orb", "");
        var w = tj.dbdata.getValueById("item", orb_id, "weight");
        this._bag_weight += this._orbcount * w;

        this.refresh_text();
    },

    refresh_text:function(){
        this.setContentString(this._uiTextWidght, tj.cfg.get("text_on_ui/hero/weight").format(this._bag_weight, this._max_weight), AUTO_STR_IGNORE);
        if(this._bag_weight > this._max_weight)
            this._uiTextWidght.setColor(cc.color.RED);
        else
            this._uiTextWidght.setColor(cc.color.WHITE);
    },

    update: function (dt) {
        this._super();
        if(this._push_item != null)
        {
            var btn = this._push_item;
            var time = this._push_time;
            var nowTime = new Date();
            var diff = nowTime - time;
            if(diff <= tj.cfg.get("designdata/configNum/clickTime"))
                return;
            switch (btn.getName()){
                case "btnAdd":
                    var curWeight = this.getCurrentWeight();
                    if(curWeight >= this._max_weight){
                        this._push_item = null;
                        this._push_time = 0;
                        this.pop_noticemsg(tj.cfg.get("text/fullBag"), true);
                    }else{
                        var name = btn.getParent().getName();
                        this.addCount(name);
                    }
                    break;
                case "btnMin":
                    var name = btn.getParent().getName();
                    this.minCount(name);
                    break;
            }
        }
    },

    getCurrentWeight :function(){
        var curWeight = 0;
        curWeight += this._foodcount * 1;

        var pick_id = tj.cfg.getAttr("designdata/itemID", "pickax", "");
        var w = tj.dbdata.getValueById("item", pick_id, "weight");
        curWeight += this._pickcount * w;

        var orb_id = tj.cfg.getAttr("designdata/itemID", "orb", "");
        w = tj.dbdata.getValueById("item", orb_id, "weight");
        curWeight += this._orbcount * w;

        return curWeight;
    },

    autoFoodNum : function(){
        var res = tj.mainData.getResNums();
        var food = this._max_weight - (this._bag_weight - this._foodcount);
        if (res.food < food) {
            food = res.food;
        }
        if (food < 0) {
            food = 0;
        }
        this._foodcount = food;
        WidgetDig(this._ui,"materials/food/textNumber").setString(this._foodcount);
        this.refresh_weight();
    },

    addCount: function (name) {
        switch(name)
        {
            case "food":
                var res = tj.mainData.getResNums();
                var num = 1;
                if((this._foodcount + num) > res.food)
                    this.pop_noticemsg(tj.cfg.get("text/lessfood"), true);
                else{
                    this._foodcount += num;
                    this.set_team_data(this._foodcount, 4);
                    var foodid = tj.cfg.getAttr("designdata/itemID", "foodid");
                    WidgetDig(this._ui,"materials/food/textNumber").setString(this._foodcount);
                }
                break;
            case "pick":
                var pickid = tj.cfg.getAttr("designdata/itemID", "pickax");
                if((this._pickcount+1) > tj.mainData.getItemNum(pickid))
                    this.pop_noticemsg(tj.cfg.get("text/team/lesspick"), true);
                else {
                    this._pickcount++;
                    this.set_team_data(this._pickcount, 5);
                    WidgetDig(this._ui, "materials/pick/textNumber").setString(this._pickcount);
                }
                break;
            case "orb":
                var orbid = tj.cfg.getAttr("designdata/itemID", "orb");
                if((this._orbcount+1) > tj.mainData.getItemNum(orbid))
                    this.pop_noticemsg(tj.cfg.get("text/team/lessorb"), true);
                else {
                    this._orbcount++;
                    this.set_team_data(this._orbcount, 6);
                    WidgetDig(this._ui, "materials/orb/textNumber").setString(this._orbcount);
                }
                break;
        }
        this.refresh_weight();
    },

    minCount: function (name) {
        switch(name)
        {
            case "food":
                var num = 1;
                this._foodcount -= num;
                this._foodcount = Math.max(this._foodcount, 0);
                this.set_team_data(this._foodcount, 4);
                WidgetDig(this._ui,"materials/food/textNumber").setString(this._foodcount);
                break;
            case "pick":
                this._pickcount--;
                this._pickcount = Math.max(this._pickcount, 0);
                this.set_team_data(this._pickcount, 5);
                WidgetDig(this._ui,"materials/pick/textNumber").setString(this._pickcount);
                break;
            case "orb":
                this._orbcount--;
                this._orbcount = Math.max(this._orbcount, 0);
                this.set_team_data(this._orbcount, 6);
                WidgetDig(this._ui,"materials/orb/textNumber").setString(this._orbcount);
                break;
        }
        this.refresh_weight();
    },

    process_ac : function(doc) {
        var msg_id = doc[0];
        var data = doc[1];
        switch (msg_id) {
            case msgac["Refresh_energy"]:
                this.refreshEnergy();
                break;
            case msgac["Layer_refresh_hero"]:
                this.refresh_hero();
                this.autoFoodNum();
                break;
            case msgac["Hero_recover_energy"]:
                switch(data.ret) {
                    case 0:
                        for(var i in data.id_hero){
                            var hid = data.id_hero[i];
                            var heroinfo = tj.mainData.getOwnHeroById(hid);
                            if(heroinfo)
                                heroinfo.Energy = 100;
                        }
                        this.refreshEnergy();
                        tj.mainData.setGemNum(data.gemcost.left);
                        var gemid = tj.cfg.getAttr("designdata/itemID", "gemid");
                        this.noticetext_add(tj.mainData.getItemName(gemid) + " " + data.gemcost.delta);
                        break;
                    case -1:
                        this.noticetext_add(tj.cfg.get("text/iderror"));
                        break;
                    case -2:
                        this.noticetext_add(tj.cfg.get("text/notdiamond"));
                        break;
                }
                break;
            case msgac["Map_go_map"]:
                if(data.teamret == 0 && data.mapret == 0){
                    trans2scene(cc.TransitionFade, createScene(mapLayer), tj.cfg.get("designdata/transition_time_dead"));
                    //this.set_release();
                    data.homeTo = true;
                    tj.wsconnection.pushmsg(msgac["Map_go_data"], data, true);
                }
                else{
                    switch(data.teamret){
                        case 1:
                            this.noticetext_add(tj.cfg.get("text/map/teamrepet"), true);
                            break;
                        case 2:
                            this.noticetext_add(tj.cfg.get("text/map/itemless"), true);
                            break;
                        case 3:
                            this.noticetext_add(tj.cfg.get("text/map/bagFull"), true);
                            break;
                        case 4:
                            this.noticetext_add(tj.cfg.get("text/team/heroLess"), true);
                            break;
                        case 5:
                            this.noticetext_add(tj.cfg.get("text/map/equipLess"), true);
                            break;
                        case 6:
                            this.noticetext_add(tj.cfg.get("text/map/itemOut"), true);
                            break;
                        case 7:
                            this.noticetext_add(tj.cfg.get("text/map/heorerr"), true);
                            break;
                        case 8:
                            this.noticetext_add(tj.cfg.get("text/map/takefood"), true);
                            break;
                        case 9:
                            this.noticetext_add(tj.cfg.get("text/map/mapIsOn"), true);
                            break;
                        case 10:
                            this.noticetext_add(tj.cfg.get("text/map/heroSpLow"), true);
                            break;
                        case 11:
                            this.noticetext_add(tj.cfg.get("text/map/cemetery_exceeded"), true);
                            break;
                        case 12:
                            this.noticetext_add(tj.cfg.get("text/map/err12"), true);
                            break;
                        case 13:
                            this.noticetext_add(tj.cfg.get("text/map/err13"), true);
                            break;
                        case 14:
                            var now = new Date();
                            var deadline = new Date(data.deadline);
                            var diff = deadline - now;
                            var delt = tj.gameClock.millisecond2StringAddHours(diff);
                            this.noticetext_add(tj.cfg.get("text/map/err14").format(delt), true);
                            break;
                    }
                    switch(data.mapret) {
                        case 1:
                            this.noticetext_add(tj.cfg.get("text/map/mapUnlock"));
                            break;
                        case 2:
                            this.noticetext_add(tj.cfg.get("text/map/mapIsOn"));
                            break;
                        //case 3:
                        //    this.noticetext_add(tj.cfg.get("text/map/mapFaile"));
                        //    break;
                    }
                }
                break;
            case msgac["Unlock_team"]:
                switch (data.ret){
                    case 0:
                        tj.mainData.main.extra_team = data.extra;
                        this.refresh_btn_team();
                        if(data.gem){
                            tj.mainData.setGemNum(data.gem_sum);
                            var gemid = tj.cfg.getAttr("designdata/itemID", "gemid");
                            this.noticetext_add(tj.mainData.getItemName(gemid) + " -" + data.gem, true);
                        }
                        break;
                    case 1:
                        this.noticetext_add(tj.cfg.get("text/notdiamond"));
                }
                break;
            case msgac["Refresh_Team_BtnSet"]:
                this.refresh_btn_set();
                break;
            case msgac["Verify_punish"]:
                this.set_release();
                break;
        }
    },

    refreshEnergy:function(){
        for(var i=1; i<=4; ++i) {
            var btnHero = WidgetDig(this._ui, "main/heros/list/btnHero" + i);
            if(btnHero.heroId != 0){
                var heroinfo = tj.mainData.getOwnHeroById(btnHero.heroId);
                if(!heroinfo)
                    continue;
                if(btnHero) {
                    var textSelect = WidgetDig(btnHero, "textSelect");
                    textSelect.setColor(cc.color.WHITE);
                    var sp_text = tj.cfg.get("text_on_ui/team/sp") + heroinfo.Energy;
                    if (heroinfo.Energy < tj.mainData.getTavern().expedition_energy_limit) {
                        sp_text = tj.cfg.get("text_on_ui/team/spLow");
                        textSelect.setColor(cc.color.RED);
                    }
                    textSelect.setString(sp_text);
                }
            }
        }
    },

    defaultTouchButton : function(btn, type) {
        if(type == ccui.Widget.TOUCH_BEGAN){
            switch(btn.getName()){
                case "btnAdd":
                case "btnMin":
                    this._push_item = btn;
                    this._push_time = new Date();
                    break;
            }
        } else if (type == ccui.Widget.TOUCH_ENDED) {
            switch(btn.getName()){
                case "btnClosed":
                    // this.removeFromParent(true);
                    this.set_release();
                    break;
                case "btnHero1":
                case "btnHero2":
                case "btnHero3":
                case "btnHero4":
                    if(btn.heroId)
                        this._curr_popLayer = createCardHeroLayer(this, btn.heroId, heroCard_t.battle);
                    break;
                case "btnReplace":
                    this._curr_popLayer = createHeroSelect(this, this.select_Callback.bind(this), tj.mainData.getBattleHero(), select_hero_t.battle);
                    break;
                case "btnAdd":
                    this._push_item = null;
                    this._push_time = 0;
                    var curWeight = this.getCurrentWeight();
                    if(curWeight < this._max_weight){
                        var name = btn.getParent().getName();
                        this.addCount(name);
                    }else{
                        this.pop_noticemsg(tj.cfg.get("text/fullBag"), true);
                    }
                    break;
                case "btnMin":
                    this._push_item = null;
                    this._push_time = 0;
                    name = btn.getParent().getName();
                    this.minCount(name);
                    break;
                case "btnGo":
                    if(this.select_hero_count() <= 0)
                        this.noticetext_add(tj.cfg.get("text/team/heroLess"));
                    else if(this._bag_weight > this._max_weight)
                        this.noticetext_add(tj.cfg.get("text/team/weightOver"));
                    else if(tj.mainData.select_hero_inmop())
                        this.noticetext_add(tj.cfg.get("text/team/heromoping"));
                    else if(this.select_hero_lowEnergy())
                        this.noticetext_add(tj.cfg.get("text/map/heroSpLow"));
                    else
                        this._curr_popLayer = createMapSelect(this,this.select_mapCallback.bind(this));
                    tj.mainData.sendClientData("team");
                    break;
                case "btnRefresh":
                    var heros = tj.mainData.getBattleHero();
                    var herosTemp = [];
                    for(var i in heros){
                        if(heros[i])
                            herosTemp.push(heros[i]);
                    }
                    var g = tj.mainData.getAllHeroGem2Energy(heros);
                    if(g <= 0)
                        this.noticetext_add(tj.cfg.get("text/pub/spfull"));
                    else{
                        var s1 = tj.cfg.get("text/team/ask").format(g);
                        var msgbox = createMsgBox2(this, s1, function(tag){
                            if (tag == 0)
                                tj.wsconnection.setMsg(msgac["Hero_recover_energy"], {"id_hero": herosTemp});
                            return true;
                        }.bind(this),2);
                    }
                    break;
                case "btnFood":
                    this._curr_popLayer = createNoteBox(this, tj.cfg.get("text/team/foodNote"), form_t.castleLayer);
                    break;
                case "btnPick":
                    this._curr_popLayer = createNoteBox(this, tj.cfg.get("text/team/pickNote"), form_t.castleLayer);
                    break;
                case "btnOrb":
                    this._curr_popLayer = createNoteBox(this, tj.cfg.get("text/team/orbNote"), form_t.castleLayer);
                    break;
                case "btnA":
                    if(tj.mainData.getClientData("select_team") != "team"){
                        tj.mainData.setClientData("select_team", "team");
                        this.refresh_hero();
                        this.refresh_btn_team();
                        this.refresh_btn_set();
                        this.autoFoodNum();
                    }
                    break;
                case "btnB":
                    if(btn.lock){
                        var cost = tj.dbdata.getValueById("teamunlock", 1, "cost");
                        var str = tj.cfg.get("text/team/unlockteam").format(cost);
                        createMsgBox2(this, str, function(tag){
                            if (tag == 0)
                                tj.wsconnection.setMsg(msgac["Unlock_team"]);
                            return true;
                        }.bind(this),2);
                    }else if(tj.mainData.getClientData("select_team") != "team2"){
                        tj.mainData.setClientData("select_team", "team2");
                        this.refresh_hero();
                        this.refresh_btn_team();
                        this.refresh_btn_set();
                        this.autoFoodNum();
                    }
                    break;
                case "btnC":
                    if(btn.lock){
                        cost = tj.dbdata.getValueById("teamunlock", 2, "cost");
                        str = tj.cfg.get("text/team/unlockteam").format(cost);
                        createMsgBox2(this, str, function(tag){
                            if (tag == 0)
                                tj.wsconnection.setMsg(msgac["Unlock_team"]);
                            return true;
                        }.bind(this),2);
                    }else if(tj.mainData.getClientData("select_team") != "team3"){
                        tj.mainData.setClientData("select_team", "team3");
                        this.refresh_hero();
                        this.refresh_btn_team();
                        this.refresh_btn_set();
                        this.autoFoodNum();
                    }
                    break;
                case "btnMop":
                    if(this.select_hero_count() <= 0)
                        this.noticetext_add(tj.cfg.get("text/team/heroLess2"));
                    else
                        this._curr_popLayer = createMopLayer(this);
                    break;
            }
        }
    },

    refresh_btn_team:function(){
        var btnA = WidgetDig(this._ui,"main/heros/btnA");
        var btnB = WidgetDig(this._ui,"main/heros/btnB");
        var btnC = WidgetDig(this._ui,"main/heros/btnC");
        btnA.setHighlighted(false);
        btnB.setHighlighted(false);
        btnC.setHighlighted(false);
        btnA.setTouchEnabled(true);
        btnB.setTouchEnabled(true);
        btnC.setTouchEnabled(true);
        btnB.setColor(cc.color.WHITE);
        btnC.setColor(cc.color.WHITE);
        btnB.lock = false;
        btnC.lock = false;

        if(tj.mainData.main.extra_team == 0){
            btnB.setColor(cc.color.GRAY);
            btnC.setColor(cc.color.GRAY);
            btnB.lock = true;
            btnC.lock = true;
        }
        else if(tj.mainData.main.extra_team == 1){
            btnC.setColor(cc.color.GRAY);
            btnC.lock = true;
        }

        if(tj.mainData.getClientData("select_team") == "team"){
            btnA.setTouchEnabled(false);
            btnA.setHighlighted(true);
        }
        if(tj.mainData.getClientData("select_team") == "team2"){
            btnB.setTouchEnabled(false);
            btnB.setHighlighted(true);
        }
        if(tj.mainData.getClientData("select_team") == "team3"){
            btnC.setTouchEnabled(false);
            btnC.setHighlighted(true);
        }
    },

    refresh_btn_set:function(){
        var btnGo = WidgetDig(this._ui, "set/btnGo");
        var btnMop = WidgetDig(this._ui, "set/btnMop");
        var btnReplace =  WidgetDig(this._ui, "main/heros/btnReplace");
        var btnRefresh = WidgetDig(this._ui, "main/heros/btnRefresh");

        WidgetDig(this._ui, "main/heros/mop").setVisible(false);
        btnGo.setEnabled(true);
        btnGo.color = cc.color("#FFFFFF");
        btnReplace.setEnabled(true);
        btnReplace.color = cc.color("#FFFFFF");
        btnRefresh.setEnabled(true);
        btnRefresh.color = cc.color("#FFFFFF");
        btnMop.setVisible(true);
        formation(WidgetDig(this._ui, "set"), 3.5 , "center");

        var expeditions = tj.mainData.main.expeditions;
        if(expeditions && expeditions.quests.length <=0){
            btnMop.setVisible(false);
            formation(WidgetDig(this._ui, "set"), 50 , "center");
        }

        var curr_teamid = tj.mainData.getBattleTeamId();
        if(tj.mainData.isTeamInMop(curr_teamid)){
            btnGo.setEnabled(false);
            btnGo.color = cc.color("#888888");
            WidgetDig(this._ui, "main/heros/mop").setVisible(true);
            flickerEffect(WidgetDig(this._ui, "main/heros/mop"), true);
            btnReplace.setEnabled(false);
            btnReplace.color = cc.color("#888888");
            btnRefresh.setEnabled(false);
            btnRefresh.color = cc.color("#888888");
        }
    },

    select_Callback: function (heroids) {
        tj.mainData.setBattleHero(heroids);
        this.refresh_hero();
        this.autoFoodNum();
    },

    set_team_data:function(heroid, index){
        var data = tj.mainData.getClientData("team");
        data[index] = heroid;
        tj.mainData.setClientData("team", data);
    },

    select_mapCallback:function(mapid){
        var heros = tj.mainData.getBattleHero();
        var herosTemp = [];
        for(var i in heros){
            if(heros[i])
                herosTemp.push(heros[i]);
        }
        var bags = {};
        var pick_id = tj.cfg.getAttr("designdata/itemID", "pickax", "");
        var orb_id = tj.cfg.getAttr("designdata/itemID", "orb", "");
        if(this._foodcount)
            bags["1"] = this._foodcount;
        if(this._pickcount)
            bags[pick_id.toString()] = this._pickcount;
        if(this._orbcount)
            bags[orb_id.toString()] = this._orbcount;
        if(Main_Layer){
            var list = [];
            var children = Main_Layer.getChildren();
            for (var child in children){
                if(children[child]._basename && children[child]._basename == "noticebox"){
                    children[child].setVisible(false);
                    list.push(children[child]);
                }
            }
            for (var i in list)
                list[i].removeFromParent(true);
        }
        tj.wsconnection.setMsg(msgac["Map_go_map"], {"id":mapid,"type":0, "heros":herosTemp, "bags":bags});
        if (tj._script_chk_ts) {            
            stat_abs_time(tj._script_chk_ts, new Date().getTime());
            tj._script_chk_ts = null;
        }
        tj.stat_map_pos(mapid, 0, 0);
        tj.collect_script_stat(collect_type.COLLECT_EXPEDITION);
    },

    select_hero_count: function () {
        var count = 0;
        var data = tj.mainData.getBattleHero();
        for(var i in data) {
            var hid = data[i];
            if (hid)
                count++;
        }
        return count;
    },

    select_hero_lowEnergy: function () {
        var data = tj.mainData.getBattleHero();
        for(var i in data) {
            var hid = data[i];
            if(hid>0) {
                var heroinfo = tj.mainData.getOwnHeroById(hid);
                if (heroinfo && heroinfo.Energy < tj.mainData.getTavern().expedition_energy_limit)
                    return true;
            }
        }
        return false;
    },
});

createTeamLayer = function(parent){
    var pRet = LayerCacheMgr.getInstance().getLayer("team");
    if (pRet.getParent() !== null) {
        pRet.removeFromParent();
    }
    if (pRet){
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
    }
    return null;
};