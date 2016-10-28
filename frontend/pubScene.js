/**
 * Created by lkx on 2015/11/19.
 * 酒馆
 */


var pubLayer = baseLayer.extend({
    _ui:0,
    _p_herolist : null,
    _p_heromuban : null,
    _p_anMop:null,
    _uitextTime:null,
    _uiloadingbar:null,
    _currUprankid:0,
    _uiHeros:[],

    ctor : function(){
        this._super();
        this._basename = "pub";
        this.init();
    },

    init : function() {
        if (!this._super())
            return false;
        var origin = cc.director.getVisibleOrigin();
        this._ui = this.load_ui("uiTavern.json");
        if (!this._ui)
            return false;

        this.addChild(this._ui);
        this.create_control();

        //去掉按钮
        var btnRight = WidgetDig(this._ui, "title/btnRight");
        if(btnRight)
            btnRight.removeFromParent(true);

        var btnLeft = WidgetDig(this._ui, "title/btnLeft");
        if(btnLeft)
            btnLeft.removeFromParent(true);

        WidgetDig(this._ui, "set/btnUpgrade/text").setString(tj.cfg.get("text_on_ui/pub/btnUpgrade"));
        WidgetDig(this._ui, "set/btnRecruit/text").setString(tj.cfg.get("text_on_ui/pub/btnRecruit"));
        WidgetDig(this._ui, "set/btnClosed/text").setString(tj.cfg.get("text_on_ui/close"));


        this._p_herolist = WidgetDig(this._ui, "main/list");
        this._p_heromuban = WidgetDig(this._ui, "main/list/template");
        this._p_anMop = WidgetDig(this._ui, "main/list/template/mop/anMop");
        this.setRetain(this._p_heromuban, "uitmpl");
        this.setRetain(this._p_herolist, "uitmpl");
        this._p_herolist.removeAllChildren(true);

        return true;
    },

    on_ws_reopen:function(){
        this.refreshHero();
        this.refreshUi();
    },

    onEnter : function(){
        this._super();
        tj.wsconnection.addGrp(msgac["Tavern_dismiss"], msgac["Tavern_upgrade"], this.process_ac.bind(this), this.get_scene_name());
        tj.wsconnection.addGrp(msgac["Layer_refresh_hero"], msgac["Pub_refresh_ui"], this.process_ac.bind(this), this.get_scene_name());
        tj.wsconnection.addGrp(msgac["Pub_refresh_new"], msgac["Pub_refresh_new"], this.process_ac.bind(this), this.get_scene_name());
        tj.wsconnection.addGrp(msgac["Hero_recover_all"], msgac["Hero_recover_all"], this.process_ac.bind(this), this.get_scene_name());
        //tj.wsconnection.addGrp(msgac["Refresh_energy"], msgac["Refresh_energy"], this.process_ac.bind(this), this.get_scene_name());
        tj.wsconnection.addGrp(msgac["Layer_refresh_help"], msgac["Layer_refresh_help"], this.process_ac.bind(this), this.get_scene_name());
        playUIAnimate(this._ui, "main/bar/anTime", true); //时钟动画
        this.refreshHero(true);
        this.refreshUi();
        this.refreshHelp();
    },

    onExit : function(){
        this._super();
        this._p_herolist.removeAllChildren(true);
        this._uiHeros = [];
        tj.mainData.clientDataClear("new_h");

        if(tj.mainData.getClientData("help")[4] == 6){
            tj.mainData.setClientDataValue("help", 4, 7);
            tj.mainData.setClientDataValue("help", 1, 5);
            tj.wsconnection.pushmsg(msgac["Main_refresh_help"]);
        }

        var hKey = "effectHeroRefreshTime";
        if(tj.mainData.getClientData(hKey) == 1) {
            tj.mainData.setClientData(hKey, 0);
            tj.mainData.sendClientData(hKey);
        }
        tj.mainData.getTavern().load_refreshed = false;
        tj.waitrecruit = false;
    },

    on_touch_Ended: function () {
        var help = tj.mainData.getClientData("help")[4];
        switch (help){
            case 0:
                tj.mainData.setClientDataValue("help", 4, 1);
                this.refreshHelp();
                break;
            case 2:
                tj.mainData.setClientDataValue("help", 4, 3);
                this.refreshHelp();
                break;
            case 5:
                tj.mainData.setClientDataValue("help", 4, 6);
                this.lockUI(false);
                break;
        }
    },

    lockUI:function(lock){
        var heros =  this._p_herolist.getChildren();
        for(var i in heros){
            var hly = heros[i];
            hly.setEnabled(!lock);
        }
        WidgetDig(this._ui, "set/btnClosed").setEnabled(!lock);
        WidgetDig(this._ui, "set/btnUpgrade").setEnabled(!lock);
        WidgetDig(this._ui, "set/btnRecruit").setEnabled(!lock);
    },

    refreshHelp:function(){
        if(this._helphand)
            this._helphand.stop();
        this.lockUI(false);

        if(tj.mainData.isHelpDone())
            return;

        //新手（酒馆阶段）
        var help = tj.mainData.getClientData("help")[4];
        switch (help){
            case 0:
                this.lockUI(true);
                var note = createNoteBox(this, tj.cfg.get("text/help/pub1"), form_t.castleLayer);
                note.setPos(375, 620);
                break;
            case 1:
                this.lockUI(true);
                var btn = WidgetDig(this._ui, "set/btnRecruit");
                btn.setEnabled(true);
                var btnworld = btn.convertToWorldSpace(cc.p(0, 0));
               var  pos = this._ui.convertToNodeSpace(btnworld);
                pos.x += btn.getContentSize().width/2;
                pos.y += btn.getContentSize().height/2 + 10;
                this.load_helphand(this, "click");
                this._helphand.setpos(pos.x, pos.y);
                note = createNoteBox(this, tj.cfg.get("text/help/pub2"), form_t.castleLayer);
                note.setPos(375, 620);
                break;
            case 2:
                this.lockUI(true);
                note = createNoteBox(this, tj.cfg.get("text/help/pub4"), form_t.castleLayer);
                note.setPos(375, 620);
                break;
            case 3:
                this.lockUI(true);
                note = createNoteBox(this, tj.cfg.get("text/help/pub5"), form_t.castleLayer);
                note.setPos(375, 620);
                var heros =  this._p_herolist.getChildren();
                if(heros.length){
                    heros[0].setEnabled(true);
                    btn = WidgetDig(heros[0], "serial");
                    btnworld = btn.convertToWorldSpace(cc.p(0, 0));
                    pos = this._ui.convertToNodeSpace(btnworld);
                    pos.x += btn.getContentSize().width/2;
                    pos.y += btn.getContentSize().height/2 + 10;
                    this.load_helphand(this, "click");
                    this._helphand.setpos(pos.x, pos.y);
                }else{
                    tj.mainData.setClientDataValue("help", 4, 4);
                    this.refreshHelp();
                }
                break;
            case 4:
                this.lockUI(true);
                note = createNoteBox(this, tj.cfg.get("text/help/pub7"), form_t.castleLayer);
                note.setPos(375, 620);
                tj.mainData.setClientDataValue("help", 4, 5);
                break;
        }
    },

    refreshHero:function(farce){
        WidgetDig(this._ui, "main/textEmpty").setVisible(false);
        var heros = tj.mainData.getTavern().heros;
        if(heros.length == 0) {
            WidgetDig(this._ui, "main/textEmpty").setVisible(true);
            WidgetDig(this._ui, "main/textEmpty").setString(tj.cfg.get("text/tavern/noheros"));
            return;
        }

        if(farce){
            this._p_herolist.removeAllChildren(true);
            this._uiHeros = [];
        }

        var havenew = false;
        for (var h in heros){
            var hero = heros[h];
            var p2 = this.getUiHero(hero.Id);
            if(!p2){
                p2 = this._p_heromuban.clone();
                if (!p2)
                    return false;
                this._p_herolist.pushBackCustomItem(p2);
                this._uiHeros.push(p2);
            }

            var size =  WidgetDig(this._p_heromuban, "btnMain").getContentSize();
            WidgetDig(p2, "btnMain").setContentSize(size);
            p2.heroid = hero.Id;
            p2.job = hero.Job;

            WidgetDig(p2, "btnMain/portraits/star").loadTexture(hero.StarIcon, ccui.Widget.PLIST_TEXTURE);
            WidgetDig(p2, "btnMain/portraits/level").loadTexture(hero.FrameIcon, ccui.Widget.PLIST_TEXTURE);
            WidgetDig(p2, "btnMain/portraits/icon").loadTexture(hero.Portraits, ccui.Widget.PLIST_TEXTURE);
            WidgetDig(p2, "btnMain/text/textName").setString(hero.Name + tj.cfg.get("text_on_ui/dot") + hero.JobName);
            WidgetDig(p2, "btnMain/text/textExplain").setString(tj.cfg.get("text_on_ui/level") + hero.Lv);
            //WidgetDig(p2, "btnMain/text/textSP").setString(tj.cfg.get("text_on_ui/SP") + hero.Energy);
            WidgetDig(p2, "btnMain/text/textScore").setString(tj.cfg.get("text_on_ui/score") + hero.Power);
            WidgetDig(p2, "lock").setVisible(false);
            if(tj.mainData.clientDataHave("new_h", hero.Id)){
                p2.isnew = havenew = true;
                WidgetDig(p2, "lock").setVisible(true);
            }

            //equip
            this.refreshEquip(p2, hero);

            //英雄编队标记
            WidgetDig(p2, "serial").setTouchEnabled(false);
            WidgetDig(p2, "serial/iconTeamA").setVisible(false);
            WidgetDig(p2, "serial/iconTeamB").setVisible(false);
            WidgetDig(p2, "serial/iconTeamC").setVisible(false);
            WidgetDig(p2, "serial/iconTeamPVP").setVisible(false);
            WidgetDig(p2, "serial/iconTeamMop").setVisible(false);
            if(tj.mainData.isHeroInTeam(hero.Id, "team"))
                WidgetDig(p2, "serial/iconTeamA").setVisible(true);
            if(tj.mainData.isHeroInTeam(hero.Id, "team2"))
                WidgetDig(p2, "serial/iconTeamB").setVisible(true);
            if(tj.mainData.isHeroInTeam(hero.Id, "team3"))
                WidgetDig(p2, "serial/iconTeamC").setVisible(true);
            if(tj.mainData.isHeroInMop(hero.Id))
                //WidgetDig(p2, "serial/iconTeamMop").setVisible(true);
                this.create_heromoping_ani(p2);
        }

        if(havenew)
            this._p_herolist.scrollToBottom(1, false);

        //pvp英雄标记
        var areateam = tj.mainData.getArenaTeam();
        var idx = 0;
        for(var i in areateam){
            var heroid = areateam[i];
            var uihero  = this.getUiHero(heroid);
            if(uihero)
                WidgetDig(uihero, "serial/iconTeamPVP").setVisible(true);
        }
    },

    create_heromoping_ani:function(p2){
        var pos = this._p_anMop.getPosition();
        var parent = WidgetDig(p2,"mop");
        parent.removeAllChildren(true);
        tj.mainData.loadAnimate(RES_ANIMATION + "other/anMop.json", function(portait){
            cc.log("other/anMop.json");
            portait.node.stopAllActions();
            portait.action.gotoFrameAndPlay(0, portait.action.getDuration(), true);
            portait.node.runAction(portait.action);
            portait.node.setPosition(pos);
            parent.addChild(portait.node);
            //portait.node.setName("anMop");
        });
    },

    refreshEquip:function(p2, heroinfo){
        var btn_name = ["weapon", "shield", "assist","other"];
        var equip_type = [heroinfo.Slot1, EquipType.HuJia, EquipType.ShiPin, EquipType.ShiPin];
        for(var i=0;i<4;i++){
            WidgetDig(p2, "equip").setTouchEnabled(false);
            var uiEquipBtn = WidgetDig(p2, "equip/" + btn_name[i]);
            uiEquipBtn.equipType = equip_type[i];
            var equip_id = heroinfo.Slot[i];
            var uiEquipIcon = WidgetDig(uiEquipBtn, "icon");
            var uiEquipFIcon = WidgetDig(uiEquipBtn, "level");
            var uiAdd = WidgetDig(uiEquipBtn, "add");
            uiEquipBtn.equipID = equip_id;
            uiEquipBtn.slotIndex = i;
            uiEquipFIcon.setVisible(false);
            uiAdd.setVisible(false);
            var equip = tj.mainData.getEquipByid(equip_id);
            if(equip) {
                uiEquipIcon.loadTexture(equip.Icon, ccui.Widget.PLIST_TEXTURE);
                uiEquipFIcon.loadTexture(equip.FrameIcon, ccui.Widget.PLIST_TEXTURE);
                uiEquipFIcon.setVisible(true);
            }else{
                switch(btn_name[i]){
                    case "weapon":
                        var texname = null;
                        switch (uiEquipBtn.equipType){
                            case  EquipType.Jian:
                                texname = "ui/icon/equip/equipSword.png";
                                break;
                            case EquipType.Fu:
                                texname = "ui/icon/equip/equipAxe.png";
                                break;
                            case EquipType.Cui:
                                texname = "ui/icon/equip/equipHammer.png";
                                break;
                            case EquipType.Gong:
                                texname = "ui/icon/equip/equipPistol.png";
                                break;
                            case EquipType.FaZhang:
                                texname = "ui/icon/equip/equipStaff.png";
                                break;
                            case EquipType.BiShou:
                                texname = "ui/icon/equip/equipDagger.png";
                                break;
                        }
                        break;
                    case "shield":
                        texname = "ui/icon/equip/armorCoat.png";
                        break;
                    case "assist":
                    case "other":
                        texname = "ui/icon/equip/accessoryRing.png";
                        break;
                }
                uiEquipIcon.loadTexture(texname, ccui.Widget.PLIST_TEXTURE);
                //check can equip
                var equips = tj.mainData.getStorageEquipsByType(uiEquipBtn.equipType);
                var canEquip = equips.length > 0;
                //if(tj.isInMap){
                //    if(this._operateType == heroCard_t.camp) {
                //        equips = tj.mainData.getBagEquipByType(uiEquipBtn.equipType);
                //        if(equips.length <= 0)
                //            canEquip = false;
                //    }else
                //        canEquip = false;
                //}
                if(canEquip) {
                    uiAdd.setVisible(true);
                    flickerEffect(uiAdd, true);
                }
            }
            uiEquipBtn.setTouchEnabled(false);
            uiEquipBtn.setEnabled(false);
        }
    },

    getUiHero:function(heroid){
        for(var i in this._uiHeros){
            var uihero = this._uiHeros[i];
            if(uihero.heroid == heroid)
                return uihero;
        }
        return null;
    },

    removeUiHero:function(heroid){
        var uihero = null;
        for(var i in this._uiHeros){
            var uihero = this._uiHeros[i];
            if(uihero.heroid == heroid){
                this._uiHeros.splice(i, 1);
                break;
            }
        }
        if(uihero)
            this._p_herolist.removeChild(uihero);
    },

    //refreshEnergy:function(id){
    //    if(id == 0){
    //        for(var i in this._uiHeros){
    //            var uihero = this._uiHeros[i];
    //            var heroinfo = tj.mainData.getOwnHeroById(uihero.heroid);
    //            if(heroinfo)
    //                WidgetDig(uihero, "btnMain/text/textSP").setString(tj.cfg.get("text_on_ui/SP") + heroinfo.Energy);
    //        }
    //    }else{
    //        var heroinfo = tj.mainData.getOwnHeroById(id);
    //        var uihero = this.getUiHero(id);
    //        if(uihero && heroinfo)
    //            WidgetDig(uihero, "btnMain/text/textSP").setString(tj.cfg.get("text_on_ui/SP") + heroinfo.Energy);
    //    }
    //},

    refreshUi:function(){
        var heros = tj.mainData.getTavern().heros;
        this._uitextTime = WidgetDig(this._ui, "main/bar/textTime");
        this._uiloadingbar = WidgetDig(this._ui, "main/bar/Loading");
        WidgetDig(this._ui, "title/textLevel").setString(tj.cfg.get("text_on_ui/Lv")+tj.mainData.getTavern().tavern_lv);
        this.setContentString(WidgetDig(this._ui, "main/text/textLeft"), tj.cfg.get("text_on_ui/Exp")+tj.mainData.getTavern().Exp);
        var row = tj.dbdata.getbysql("tavern",  "where (lv == '" + tj.mainData.getTavern().tavern_lv +"')")[0];
        if(row)
            WidgetDig(this._ui, "main/text/textRight").setString(tj.cfg.get("text_on_ui/Hero")+ heros.length +"/"+row["heroNumbers"]);
        else
            WidgetDig(this._ui, "main/text/textRight").setString(tj.cfg.get("text_on_ui/Hero")+ 0 +"/"+ 0);
    },

    defaultTouchButton : function(btn, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            switch (btn.getName()) {
                case "btnClosed":
                    this.set_release();
                    break;
                case "btnRecruit":
                    this._curr_popLayer = createRecruitLayer(this);
                    if(this._helphand)
                        this._helphand.stop();
                    break;
                case "btnUpgrade":
                    var s1 = tj.cfg.get("text/tavernupgrad");
                    var row_o = tj.dbdata.getbysql("tavern", "where (lv == '" + (tj.mainData.getTavern().tavern_lv) + "')")[0];
                    var row_u = tj.dbdata.getbysql("tavern", "where (lv == '" + (tj.mainData.getTavern().tavern_lv + 1) + "')")[0];
                    if (row_u == undefined)
                        this.noticetext_add(tj.cfg.get("text/toplevel"));
                    else {
                        var that = this;
                        var res_id = row_u.cost1; //需要的资源id
                        var need_num = row_u.val1; //需要的资源数量
                        var add_hero = row_u.heroNumbers - row_o.heroNumbers;
                        var add_jobLvLimit = row_u.jobLvLimit - row_o.jobLvLimit;
                        var r1 = "";
                        var r2 = "";
                        var r3 = "";
                        if(add_hero){
                            r1 = tj.cfg.get("text/tavern/upgrade_tip1").format(add_hero);
                        }
                        if (add_jobLvLimit) {
                            var joblvname = tj.cfg.getAttr("designdata/jobLv", "lv" + row_u.jobLvLimit);
                            r2 = tj.cfg.get("text/tavern/upgrade_tip2").format(joblvname, row_u.jobLvLimit);
                        }
                        if (row_u.lvLimit != row_o.lvLimit && row_u.jobLvLimit == row_o.jobLvLimit )
                            r3 = tj.cfg.get("text/tavern/upgrade_tip3").format(row_u.lvLimit - row_o.lvLimit);
                        var result_text = tj.cfg.get("text/tavern/resource_upgrade_tip").format(r1, r2, r3);
                        var ul = new upgradeLayer(function () {
                            return upgradeLayer.buildData(res_id, need_num, result_text);
                        }, function (v) {
                            cc.log('upgradeLayer return:', typeof(v), v);
                            switch (v) {
                                case 0: //升级
                                    tj.wsconnection.setMsg(msgac["Tavern_upgrade"], {"gem": 0});
                                    return false;
                                case 1: //使用宝石
                                    var gl = new useGemLayer(function () {
                                        var jewelRate = tj.dbdata.getValueById("resproduce", res_id, "gemRate");
                                        return useGemLayer.buildData(res_id, need_num, jewelRate);
                                    }, function (v) {
                                        switch (v) {
                                            case 0: //全额宝石
                                                tj.wsconnection.setMsg(msgac["Tavern_upgrade"], {"gem": 2});
                                                break;
                                            case 1: //宝石补齐
                                                tj.wsconnection.setMsg(msgac["Tavern_upgrade"], {"gem": 1});
                                                break;
                                            default:
                                                break;
                                        }
                                    });
                                    that.addChild(gl);
                                    //gl._tjParent = that;
                                    return false;
                                default:
                                    return true;
                            }

                        });
                        this.addChild(ul);
                        ul._tjParent = that;
                        this._curr_popLayer = ul;
                    }
                    break;
                case "btnMain":
                    var hid = btn.getParent().heroid;
                    this._curr_popLayer = createCardHeroLayer(this, hid, heroCard_t.pub);
                    break;
                case "btnRefresh":
                    var g = tj.mainData.getAllHeroGem2Energy();
                    if(g <= 0)
                        this.noticetext_add(tj.cfg.get("text/pub/spfull"));
                    else{
                        str = tj.cfg.get("text/tavern/spAllAsk").format(g);
                        this._curr_popLayer = createMsgBox2(this, str, function(tag){
                            if (tag == 0)
                                tj.wsconnection.setMsg(msgac["Hero_recover_all"]);
                            return true;
                        }, 2);
                    }
                    break;
            }
        }
    },

    update : function(delta) {
        this._super();
        //
        //if(this._uitextTime && tj.mainData.getTavern().load_refreshed){
        //    this._uitextTime.setString(tj.cfg.get("text/newhero"));
        //}
        //else
        if(tj.mainData.next_hero_refreshtime && this._uitextTime)
        {
            var now = new Date();
            var str = tj.gameClock.millisecond2StringAddHours(tj.mainData.next_hero_refreshtime - now);
            this._uitextTime.setString(str);
            var left_sec = (tj.mainData.next_hero_refreshtime - now) / 1000;
            var percent = (left_sec / tj.mainData.getTavern().refresh_interval_secs * 100) || 0;
            percent = Math.min(percent, 100);
            this._uiloadingbar.setPercent(percent);
        }
    },

    process_ac : function(doc){
        var msg_id = doc[0];
        var data = doc[1];
        switch(msg_id){
            case msgac["Tavern_upgrade"]:
                var rdata = data.data;
                var ret = data.ret;
                switch(ret){
                    case 0:{
                        if(this._curr_popLayer)
                            this._curr_popLayer.set_release();
                        for (var  i in rdata.resources) {
                            var res = rdata.resources[i];
                            var mainres = tj.mainData.getResinfoById(parseInt(i));
                            if(mainres)
                                mainres.set(res.left);
                        }
                        if(rdata.gemcost){
                            tj.mainData.setGemNum(rdata.gemcost.left);
                        }
                        tj.mainData.getTavern().tavern_lv = rdata.lv;
                        this.refreshUi();
                        createMainNoticeBox(tj.cfg.get("text/tavernupgradsucc").format(rdata.lv.toString()));
                    }break;
                    case 11:
                        this.noticetext_add(tj.cfg.get("text/notdiamond"));
                        break;
                    case 1:
                        this.noticetext_add(tj.cfg.get("text/lessfood"));
                        break;
                    case 2:
                        this.noticetext_add(tj.cfg.get("text/lesswood"));
                        break;
                    case 3:
                        this.noticetext_add(tj.cfg.get("text/lessiron"));
                        break;
                    case 4:
                        this.noticetext_add(tj.cfg.get("text/notdiamond"));
                        break;
                    case 5:
                        this.noticetext_add(tj.cfg.get("text/lessmithril"));
                        break;
                    case 10:
                        this.noticetext_add(tj.cfg.get("text/notgold"));
                        break;
                    case 100:
                        this.noticetext_add(tj.cfg.get("text/toplevel"));
                        break;
                }
                break;
            case msgac["Tavern_dismiss"]:
                var ret = data.ret;
                var heroid = data.id;
                if(this._curr_popLayer)
                    this._curr_popLayer.set_release();
                switch(ret)
                {
                    case 0:
                        var heroName = tj.mainData.dismissHero(heroid);
                        this.removeUiHero(heroid);
                        tj.mainData.getTavern().Exp = data.data.exp;
                        this.refreshUi();
                        this.noticetext_add(tj.cfg.get("text/dismisshero").format(heroName));
                        if(data.data.d_exp)
                            this.noticetext_add(tj.cfg.get("text/getExp").format(data.data.d_exp));
                        if(data.data.legacy)
                            tj.mainData.addStroageItem(rdata.legacy, 1);
                        var re_eq = data.data.re_eq;
                        for(var i in re_eq){
                            tj.mainData.addStroageEquips(re_eq[i]);
                        }
                        if(this._curr_popLayer) {
                            this._curr_popLayer.set_release(true);
                        }
                        this.refreshHero();
                        fightData.deleteDefaultSkillData(heroid); //删除此英雄最后选择的技能信息
                        break;
                    case 10:
                        this.noticetext_add(tj.cfg.get("text/equipnotoff"));
                        break;
                }
                break;
            case msgac["Layer_refresh_hero"]:
                if(data && data.force)
                    this.refreshHero(true);
                else
                    this.refreshHero();
                break;
            case msgac["Pub_refresh_ui"]:
                this.refreshUi();
                break;
            case msgac["Hero_recover_all"]:
                switch(data.ret) {
                    case 0:
                        var heros = tj.mainData.getOwnHeros();
                        var e = 0;
                        for (var h in heros) {
                            var hero = heros[h];
                            hero.Energy = 100;
                        }
                        //this.refreshEnergy(0);
                        tj.mainData.setGemNum(data.gemcost.left);
                        var gemid = tj.cfg.getAttr("designdata/itemID", "gemid");
                        this.noticetext_add(tj.mainData.getItemName(gemid) + " " + data.gemcost.delta);
                        break;
                    case -1:
                        this.noticetext_add(tj.cfg.get("text/notdiamond"));
                        break;
                }
                break;
            case msgac["Layer_refresh_help"]:
                this.refreshHelp();
                break;
            case msgac["Pub_refresh_new"]:
                heroid = data;
                var uihero = this.getUiHero(heroid);
                if(uihero){
                    uihero.isnew = false;
                    WidgetDig(uihero, "lock").setVisible(false);
                }
                break;
        }
    }
});


createPubLayer = function(parent){
    var pRet = new pubLayer();
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
/**
 * Created by likx on 2015/11/19.
 */
