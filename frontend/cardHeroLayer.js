/**
 * 英雄卡
 * Created by lkx on 2015/11/24.
 *
 */
var heroCard_t = {"pub" : 0, "recruit": 1, "check":2, "camp":3, "uprank":4, "battle":5, "rank":6, "pvp":7};
var trans_dir = {"none":0, "left":1, "right":2};

var cardHeroLayer = baseLayer.extend({
    _ui: 0,
    _heroid: 0,
    _heroinfo: null,
    _uprankState: 0,
    _operateType: false,
    _transMove: trans_dir.none,
    _btnUpgrade:null,
    _delattr : null,
    _attrEffects : null,
    _uprankJob:0,
    _old : null,
    _headlist:null,
    _headtmp:null,

    ctor: function (hid, operateType, job) {
        this._super();
        this._basename = "cardhero";
        this.init();
    },

    //缓存后重新打开时的数据重设
    setData : function(hid, operateType, job){
        this._heroid = hid;
        this._operateType = operateType;
        if (job)
            this._uprankJob = job;

        this._headlist.removeAllChildren(true);
        this._headlist.setVisible(false);

        if(this._operateType == heroCard_t.rank){
            //竞技榜英雄列表
            if(Array.isArray(hid) && hid.length > 0) {
                this._headlist.setVisible(true);
                this._heroid = hid[0].hid;
                for (var i in hid) {
                    var p2 = this._headtmp.clone();
                    if (!p2)
                        return;
                    this._headlist.addChild(p2);
                    p2.heroid = hid[i].hid;

                    var tid = hid[i].tid;
                    var row = tj.dbdata.getrow("racetemplate", tid);
                    if(row){
                        var ratings = row["ratings"];
                        var frameIcon = "ui/icon/iconLevel" + ratings + ".png";
                        WidgetDig(p2, "portraits/level").loadTexture(frameIcon, ccui.Widget.PLIST_TEXTURE);
                        var headPortraitIcon = row["protraits"];
                        if (!headPortraitIcon)
                            var portraits = "ui/icon/iconUnlock.png";
                        else
                            portraits = "ui/icon/heros/" + headPortraitIcon;
                        WidgetDig(p2, "portraits/icon").loadTexture(portraits, ccui.Widget.PLIST_TEXTURE);
                    }
                    row = tj.dbdata.getrow("job", hid[i].job);
                    if(row) {
                        var jobLv = row["jobLv"];
                        var starIcon = "ui/icon/iconStar" + jobLv + ".png";
                        WidgetDig(p2, "portraits/star").loadTexture(starIcon, ccui.Widget.PLIST_TEXTURE);
                    }
                }
                formation(this._headlist);
                var h = this._headlist.getChildren();
                h[0].setHighlighted(true);
            }
            else
                this._heroid = hid;
            this._heroinfo = tj.mainData.getRankingHeroById(this._heroid);
            if(!this._heroinfo)
                tj.wsconnection.setMsg(msgac["Rank_get_hero"], {"id": this._heroid});
        }
    },

    init: function () {
        if (!this._super())
            return false;

        this._ui = this.load_ui("cardHero.json",this);
        if (!this._ui)
            return false;
        this.addChild(this._ui);

        this._headlist = WidgetDig(this._ui, "list");
        this._headtmp = WidgetDig(this._ui, "list/btnHero");
        this.setRetain(this._headtmp, "uitmpl");
        this._headlist.removeAllChildren(true);

        //只需要设置一次的ui放在init里
        WidgetDig(this._ui, "main/HP/text").setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        var textMore = WidgetDig(this._ui, "main/textMore");
        textMore.addClickEventListener(this.onMoreClick.bind(this));
        WidgetDig(this._ui, "set/btnClosed/text").setString(tj.cfg.get("text_on_ui/close"));
        WidgetDig(this._ui, "set/btnRecruit/text").setString(tj.cfg.get("text_on_ui/pub/recruit"));
        WidgetDig(this._ui, "set/btnFire/text").setString(tj.cfg.get("text_on_ui/pub/fire"));
        WidgetDig(this._ui, "set/btnUpgrade/text").setString(tj.cfg.get("text_on_ui/pub/upgrade"));
        WidgetDig(this._ui, "AI/btnSet/text").setString(tj.cfg.get("text_on_ui/pub/aiSet"));
        WidgetDig(this._ui, "AI/btnName/text").setString(tj.cfg.get("text/herocard/changeName/text"));

        return true;
    },

    onEnter : function(){
        this._super();
        this._old = null;
        //每次进入herolayer时，因为该layer是缓存的，所以都要重新刷当前的英雄信息和重新监听消息。
        this.initUI();
        tj.wsconnection.addGrp(msgac["Hero_uplv"], msgac["Hero_recover_energy"], this.process_ac.bind(this), this.get_scene_name());
        tj.wsconnection.addGrp(msgac["Refresh_energy"], msgac["Refresh_energy"], this.process_ac.bind(this), this.get_scene_name());
        tj.wsconnection.addGrp(msgac["Rank_get_hero"], msgac["Rank_get_hero"], this.process_ac.bind(this), this.get_scene_name());
        tj.wsconnection.addGrp(msgac["Hero_change_name"], msgac["Hero_change_name"], this.process_ac.bind(this), this.get_scene_name());
    },

    //提供给转职选项设置临时英雄所用，记录当前英雄，设置转职后的英雄数据，刷新ui
    setTempHero : function(hidelayer, hid, operateType, job){
        this._old = {
            hl : hidelayer,
            id : this._heroid,
            op : this._operateType,
            job : this._uprankJob
        };
        this.setData(hid, operateType, job);
        this.initUI();
    },

    //当点击关闭按钮时，如果有设置过临时英雄，应该清除临时英雄信息，把原本的英雄信息置入，并且呼出之前被隐藏的转职选择界面
    clearTempHero : function(){
        if (this._old !== null) {
            this.setData(this._old.id, this._old.op, this._old.job);
            if (this._old.hl && this._old.hl.setVisible) {
                this._old.hl.setVisible(true);
            }
            this.initUI();
            this._old = null;
        }
    },

    //因为缓存缘故，这里是每次进入英雄卡都要执行的根据不同类型显隐控件的方法.
    initUI : function(){
        this.clearUpLvEffect();
        WidgetDig(this._ui, "main").setVisible(false);
        var visibleSize = cc.director.getVisibleSize();
        var origin = cc.director.getVisibleOrigin();
        centerX = origin.x + visibleSize.width / 2;
        centerY = WidgetDig(this._ui, "set/btnClosed").getPosition().y;
        this._btnUpgrade = WidgetDig(this._ui, "set/btnUpgrade");
        var btn_right = WidgetDig(this._ui, "page/btnRight");
        var btn_left = WidgetDig(this._ui, "page/btnLeft");
        var btn_recruit = WidgetDig(this._ui, "set/btnRecruit");
        var btn_upgrade = WidgetDig(this._ui, "set/btnUpgrade");
        var btn_fire = WidgetDig(this._ui, "set/btnFire");
        var equips = WidgetDig(this._ui, "main/equip");
        var btn_ai = WidgetDig(this._ui, "AI");
        var btnName = WidgetDig(this._ui, "AI/btnName");
        var btn_add = WidgetDig(this._ui, "main/SP/btnAdd");
        var btn_close = WidgetDig(this._ui, "set/btnClosed");
        WidgetDig(this._ui, "main/text/level").setVisible(true);

        btn_right.setVisible(false);
        btn_left.setVisible(false);
        btn_recruit.setVisible(true);
        btn_upgrade.setVisible(true);
        btn_fire.setVisible(true);
        equips.setVisible(true);
        btn_ai.setVisible(true);
        btnName.setVisible(false);
        btn_add.setVisible(true);

        //if(tj.mainData.isHeroInMop(this._heroid))
        //    this._operateType = heroCard_t.check;

        switch (this._operateType) {
            case heroCard_t.pub:
                btn_recruit.setVisible(false);
                btn_upgrade.setPosition(cc.p(centerX - 55, centerY));
                btn_fire.setPosition(cc.p(centerX - 230, centerY));
                btn_close.setPosition(cc.p(centerX + 120, centerY));
                btn_right.setVisible(true);
                btn_left.setVisible(true);
                btnName.setVisible(true);
                break;
            case heroCard_t.battle:
            case heroCard_t.pvp:
                btn_recruit.setVisible(false);
                btn_fire.setVisible(false);
                btn_upgrade.setPosition(cc.p(240, 0));
                btn_close.setPosition(cc.p(400, 0));
                btn_right.setVisible(true);
                btn_left.setVisible(true);
                break;
            case heroCard_t.recruit:
                btn_upgrade.setVisible(false);
                btn_fire.setVisible(false);
                btn_recruit.setPosition(cc.p(240, 0));
                btn_close.setPosition(cc.p(400, 0));
                equips.setVisible(false);
                btn_add.setVisible(false);
                btn_ai.setVisible(false);
                break;
            case heroCard_t.check:
                btn_upgrade.setVisible(false);
                btn_fire.setVisible(false);
                btn_recruit.setVisible(false);
                btn_close.setPosition(cc.p(320, 0));
                btn_add.setVisible(false);
                break;
            case heroCard_t.camp:
                btn_upgrade.setVisible(false);
                btn_fire.setVisible(false);
                btn_recruit.setVisible(false);
                btn_close.setPosition(cc.p(320, 0));
                btn_add.setVisible(false);
                btn_right.setVisible(true);
                btn_left.setVisible(true);
                break;
            case heroCard_t.uprank:
                btn_upgrade.setVisible(false);
                btn_fire.setVisible(false);
                btn_recruit.setVisible(false);
                btn_close.setPosition(cc.p(320, 0));
                btn_add.setVisible(false);
                equips.setVisible(false);
                btn_ai.setVisible(false);
                break;
            case heroCard_t.rank:
                btn_upgrade.setVisible(false);
                btn_fire.setVisible(false);
                btn_recruit.setVisible(false);
                btn_close.setPosition(cc.p(320, 0));
                btn_add.setVisible(false);
                btn_ai.setVisible(false);
                break;
        }
        this._attrEffects = [];
        this.refreshHelp();
        return this.refreshHero();
    },

    lockUI:function(lock){
        WidgetDig(this._ui, "set/btnRecruit").setEnabled(!lock);
        WidgetDig(this._ui, "set/btnFire").setEnabled(!lock);
        WidgetDig(this._ui, "set/btnUpgrade").setEnabled(!lock);
        WidgetDig(this._ui, "set/btnClosed").setEnabled(!lock);
    },

    on_ws_reopen:function(){
        this.refreshHero();
    },

    refreshHelp:function(){
        if(this._helphand)
            this._helphand.stop();
        this.lockUI(false);

        if(tj.mainData.isHelpDone())
            return;

        //新手（酒馆阶段）
        var help = tj.mainData.getClientData("help")[4];
        switch (help) {
            case 1:
                var btn = WidgetDig(this._ui, "set/btnRecruit");
                btn.setEnabled(true);
                var btnworld = btn.convertToWorldSpace(cc.p(0, 0));
                pos = this._ui.convertToNodeSpace(btnworld);
                pos.x += btn.getContentSize().width/2;
                pos.y += btn.getContentSize().height/2;
                this.load_helphand(this, "click");
                this._helphand.setpos(pos.x, pos.y);
                break;
            case 3:
                this.lockUI(true);
                btn = WidgetDig(this._ui, "set/btnUpgrade");
                btn.setEnabled(true);
                btnworld = btn.convertToWorldSpace(cc.p(0, 0));
                pos = this._ui.convertToNodeSpace(btnworld);
                pos.x += btn.getContentSize().width/2;
                pos.y += btn.getContentSize().height/2;
                this.load_helphand(this, "click");
                this._helphand.setpos(pos.x, pos.y);
                break;
            case 4:
                this.lockUI(true);
                btn = WidgetDig(this._ui, "set/btnClosed");
                btn.setEnabled(true);
                btnworld = btn.convertToWorldSpace(cc.p(0, 0));
                pos = this._ui.convertToNodeSpace(btnworld);
                pos.x += btn.getContentSize().width/2;
                pos.y += btn.getContentSize().height/2;
                this.load_helphand(this, "click");
                this._helphand.setpos(pos.x, pos.y);
                var note = createNoteBox(this, tj.cfg.get("text/help/pub6"), form_t.castleLayer);
                note.setPos(375, 620);
                break;
        }

    },

    refreshHero:function(){
        this.clearUpLvEffect();
        switch (this._operateType){
            case heroCard_t.pub:
            case heroCard_t.camp:
            case heroCard_t.uprank:
            case heroCard_t.check:
            case heroCard_t.battle:
            case heroCard_t.pvp:
                this._heroinfo = tj.mainData.getOwnHeroById(this._heroid);
                if (!this._heroinfo) {
                    this._heroinfo = tj.mainData.getDeadHeroById(this._heroid);
                    WidgetDig(this._ui, "AI").setVisible(false);
                }
                break;
            case heroCard_t.recruit:
                this._heroinfo = tj.mainData.getOptionHeroByIdx(this._heroid);
                break;
            case heroCard_t.rank:
                this._heroinfo = tj.mainData.getRankingHeroById(this._heroid);
                break
        }
        if (!this._heroinfo)
            return false;

        if(this._operateType == heroCard_t.pub){
            tj.wsconnection.pushmsg(msgac["Pub_refresh_new"], this._heroid);
            tj.mainData.removeClientData("new_h",  this._heroid);
        }

        WidgetDig(this._ui, "main").setVisible(true);

        if(this._operateType == heroCard_t.uprank){
            this.refreshUpRankUi();
            this.refreshUpRankSkill();
        }else{
            this.refreshUi();
            this.refreshSkill();
        }
        this.refreshEquip();
        this.refreshAttr();
        this.refreshEnergy();

        var animation = WidgetDig(this._ui, "main/role/animation");
        animation.removeAllChildren();

        var self = this;
        tj.mainData.loadAnimate(this._heroinfo.Figure, function(portait){
            animation.addChild(portait.node);
            portait.node.stopAllActions();
            portait.action.pause();
            // portait.action.retain();
            // portait.node.retain();
            self.setRetain(portait.node, "ani");
            portait.action.play("standby", true);
            animation.runAction(portait.action);
        });
        return true;
    },

    onMoreClick: function (touch, event) {
        if(!this._heroinfo){
            return true;
        }
        var def = resist = power = hitrate = critrate = dodgerate = healval = 0;
        if(this._heroinfo.Stat){
            def = this._heroinfo.Stat.Def;
            resist = this._heroinfo.Stat.Resist;
            power = this._heroinfo.Stat.Power;
            hitrate = this._heroinfo.Stat.hitRate;
            critrate = this._heroinfo.Stat.critRate;
            dodgerate = this._heroinfo.Stat.dodgeRate;
            healval = this._heroinfo.Stat.healVal;
        }else{
            def = this._heroinfo.SelfAttr.Def + this._heroinfo.EquipAttr.Def;
            resist = this._heroinfo.SelfAttr.Resist + this._heroinfo.EquipAttr.Resist;
            power = this._heroinfo.EquipAttr.Power;
            hitrate = this._heroinfo.EquipAttr.HitRate;
            critrate = this._heroinfo.EquipAttr.CritRate;
            dodgerate = this._heroinfo.EquipAttr.DodgeRate;
            healval = this._heroinfo.EquipAttr.HealVal;
        }
        var num1 = Math.floor((1-1/(1+def*0.02)) * 100);
        var num2 = Math.floor((1-1/(1+resist*0.02)) * 100);
        var str = tj.cfg.get("text/herocard/prop").format(num1+"%", num2+"%", power, hitrate, critrate, dodgerate, healval);
        this._curr_popLayer = createSkillNoteBox(this, str, null);
        return true;
    },

    refreshEnergy:function(ref){
        if(this._operateType == heroCard_t.recruit || this._operateType == heroCard_t.rank){
            WidgetDig(this._ui, "main/SP/bar").setPercent(100);
            WidgetDig(this._ui, "main/SP/text").setString(100);
        }else {
            if(ref)
                this._heroinfo = tj.mainData.getOwnHeroById(this._heroid);
            if(this._heroinfo){
                var e = this._heroinfo.Energy;
                WidgetDig(this._ui, "main/SP/bar").setPercent(e);
                WidgetDig(this._ui, "main/SP/text").setString(e);
            }
        }
    },

    refreshUi:function(){
        WidgetDig(this._ui, "portraits/star").setVisible(true);
        WidgetDig(this._ui, "main/text/grade").setVisible(true);
        WidgetDig(this._ui, "main/text/level").setVisible(true);
        var name_str = tj.cfg.get("text_on_ui/hero/cardName").format(this._heroinfo.Name, this._heroinfo.JobName);
        WidgetDig(this._ui, "main/text/name").setString(name_str);
        WidgetDig(this._ui, "main/text/grade").setString(tj.cfg.get("text_on_ui/score") + this._heroinfo.Power);
        WidgetDig(this._ui, "portraits/star").loadTexture(this._heroinfo.StarIcon, ccui.Widget.PLIST_TEXTURE);

        var level_str = tj.cfg.get("text_on_ui/hero/cardLevel").format(this._heroinfo.Lv);
        WidgetDig(this._ui, "main/text/level").setString(level_str);

        if(this._operateType == heroCard_t.pub || this._operateType == heroCard_t.battle || this._operateType == heroCard_t.pvp) {
            this._uprankState = tj.mainData.getHeroUprankState(this._heroinfo);
            this._btnUpgrade.setVisible(true);
            if (this._uprankState == 0){
                WidgetDig(this._ui, "set/btnUpgrade/text").setString(tj.cfg.get("text_on_ui/pub/upgrade"));
                WidgetDig(this._ui, "set/btnUpgrade/BG_0").setVisible(true);
                WidgetDig(this._ui, "set/btnUpgrade/textNum").setVisible(true);
                this._btnUpgrade.setEnabled(true);
                this._btnUpgrade.color = cc.color("#FFFFFF");

                var need_exp = tj.mainData.getHeroUpgradeExp(this._heroinfo);
                var have_exp = tj.mainData.getSoul();
                if(need_exp > 0){
                    WidgetDig(this._ui, "set/btnUpgrade/textNum").setVisible(true);
                    var texNum = WidgetDig(this._ui, "set/btnUpgrade/textNum");
                    if(have_exp < need_exp)
                        texNum.setColor(cc.color.RED);
                    else
                        texNum.setColor(cc.color.WHITE);
                    this.setContentString(texNum, tj.cfg.get("text_on_ui/expNeed").format(tj.mainData.getSoul(), need_exp));
                    WidgetDig(this._ui, "set/btnUpgrade/textNum").setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
                }else
                    WidgetDig(this._ui, "set/btnUpgrade/textNum").setVisible(false);
            }
            else if (this._uprankState == 1){
                WidgetDig(this._ui, "set/btnUpgrade/text").setString(tj.cfg.get("text_on_ui/pub/uprank"));
                WidgetDig(this._ui, "set/btnUpgrade/BG_0").setVisible(false);
                WidgetDig(this._ui, "set/btnUpgrade/textNum").setVisible(false);
                this._btnUpgrade.setEnabled(true);
                this._btnUpgrade.color = cc.color("#FFFFFF");
            }
            else if (this._uprankState == 2){
                WidgetDig(this._ui, "set/btnUpgrade/text").setString(tj.cfg.get("text_on_ui/pub/upgrade"));
                this._btnUpgrade.setEnabled(false);
                this._btnUpgrade.color = cc.color("#888888");
                WidgetDig(this._ui, "set/btnUpgrade/BG_0").setVisible(false);
                WidgetDig(this._ui, "set/btnUpgrade/textNum").setVisible(false);
            }
        }
        formation(this._btnUpgrade.getParent(), 10, 'center');
    },

    refreshUpRankUi:function(){
        var jobname = tj.dbdata.getValueById("job", this._uprankJob, "name");
        var name_str = tj.cfg.get("text_on_ui/hero/cardName").format(this._heroinfo.Name, jobname);
        WidgetDig(this._ui, "main/text/name").setString(name_str);
        WidgetDig(this._ui, "portraits/star").setVisible(false);
        WidgetDig(this._ui, "main/text/grade").setVisible(false);
        WidgetDig(this._ui, "main/text/level").setVisible(false);
    },

    refreshAttr:function(){
        var str = tj.cfg.get("text_on_ui/str") + tj.mainData.getHeroCurrentAttr(this._heroinfo, heroAttr.STR);
        WidgetDig(this._ui, "main/textMore/power").setString(str);
        var mag = tj.cfg.get("text_on_ui/mag") + tj.mainData.getHeroCurrentAttr(this._heroinfo, heroAttr.MAG);
        WidgetDig(this._ui, "main/textMore/magic").setString(mag);
        var skl = tj.cfg.get("text_on_ui/skl") + tj.mainData.getHeroCurrentAttr(this._heroinfo, heroAttr.SKL);
        WidgetDig(this._ui, "main/textMore/skill").setString(skl);
        var agl = tj.cfg.get("text_on_ui/agl") + tj.mainData.getHeroCurrentAttr(this._heroinfo, heroAttr.AGL);
        WidgetDig(this._ui, "main/textMore/speed").setString(agl);
        var hp = tj.cfg.get("text_on_ui/hp") + tj.mainData.getHeroCurrentAttr(this._heroinfo, heroAttr.Hp);
        WidgetDig(this._ui, "main/textMore/health").setString(hp);
        var def = tj.cfg.get("text_on_ui/def") + tj.mainData.getHeroCurrentAttr(this._heroinfo, heroAttr.DEF);
        WidgetDig(this._ui, "main/textMore/defense").setString(def);
        var resistance = tj.cfg.get("text_on_ui/resist") + tj.mainData.getHeroCurrentAttr(this._heroinfo, heroAttr.RESIST);
        WidgetDig(this._ui, "main/textMore/resistance").setString(resistance);

        var growth = tj.cfg.get("text_on_ui/hero/cardGrow").format(this._heroinfo.RatingsName);
        WidgetDig(this._ui, "main/textMore/growth").setString(growth);
        if(this._heroinfo.Color)
            WidgetDig(this._ui, "main/textMore/growth").setColor(this._heroinfo.Color);

        var hp_now = this._heroinfo.Hp_Max;
        if((this._operateType == heroCard_t.camp || this._operateType == heroCard_t.check) && tj.isInMap) {
            hp_now = this._heroinfo.Hp_now;
        }
        WidgetDig(this._ui, "main/HP/text").setString(hp_now);
        var hpPercent = Math.min(hp_now/this._heroinfo.Hp_Max*100,100);
        WidgetDig(this._ui, "main/HP/bar").setPercent(hpPercent);

        if(this._operateType == heroCard_t.uprank){
            this._delattr = this.getUpRankAttr(this._uprankJob);
            this.heroUpLvEffect();
        }
    },

    refreshSkill:function(){
        var skillIcon1 = tj.dbdata.getValueById("skill", this._heroinfo.Move1, "icon");
        if(isFrameCacheTexture(RES_ICON_SKILL_PATH + skillIcon1))
            WidgetDig(this._ui, "main/skill/btnSkill1/icon").loadTexture(RES_ICON_SKILL_PATH + skillIcon1, ccui.Widget.PLIST_TEXTURE);
        WidgetDig(this._ui, "main/skill/btnSkill1/select").setVisible(false);
        WidgetDig(this._ui, "main/skill/btnSkill1/add").setVisible(false);
        WidgetDig(this._ui, "main/skill/btnSkill1").skillID = this._heroinfo.Move1;

        if(this._heroinfo.Move2){
            var skillIcon2 = tj.dbdata.getValueById("skill", this._heroinfo.Move2, "icon");
            if(isFrameCacheTexture(RES_ICON_SKILL_PATH + skillIcon2))
                WidgetDig(this._ui, "main/skill/btnSkill2/icon").loadTexture(RES_ICON_SKILL_PATH + skillIcon2, ccui.Widget.PLIST_TEXTURE);
            WidgetDig(this._ui, "main/skill/btnSkill2").skillID = this._heroinfo.Move2;
        }
        else
            WidgetDig(this._ui, "main/skill/btnSkill2").setVisible(false);
        WidgetDig(this._ui, "main/skill/btnSkill2/add").setVisible(false);

        if(this._heroinfo.Move3){
            var skillIcon3 = tj.dbdata.getValueById("skill", this._heroinfo.Move3, "icon");
            if(isFrameCacheTexture(RES_ICON_SKILL_PATH + skillIcon3))
                WidgetDig(this._ui, "main/skill/btnSkill3/icon").loadTexture(RES_ICON_SKILL_PATH + skillIcon3, ccui.Widget.PLIST_TEXTURE);
            WidgetDig(this._ui, "main/skill/btnSkill3").skillID = this._heroinfo.Move3;
        }
        else
            WidgetDig(this._ui, "main/skill/btnSkill3").setVisible(false);
        WidgetDig(this._ui, "main/skill/btnSkill3/add").setVisible(false);
    },

    refreshUpRankSkill:function(){
        var skillId1 = tj.dbdata.getValueById("job", this._uprankJob, "move1");
        var skillId2 = tj.dbdata.getValueById("job", this._uprankJob, "move2");
        var skillId3 = tj.dbdata.getValueById("job", this._uprankJob, "move3");
        var skillIcon1 = tj.dbdata.getValueById("skill", skillId1, "icon");
        if(isFrameCacheTexture(RES_ICON_SKILL_PATH + skillIcon1))
            WidgetDig(this._ui, "main/skill/btnSkill1/icon").loadTexture(RES_ICON_SKILL_PATH + skillIcon1, ccui.Widget.PLIST_TEXTURE);
        WidgetDig(this._ui, "main/skill/btnSkill1/select").setVisible(false);
        WidgetDig(this._ui, "main/skill/btnSkill1").skillID = skillId1;

        var skillIcon2 = tj.dbdata.getValueById("skill", skillId2, "icon");
        if(isFrameCacheTexture(RES_ICON_SKILL_PATH + skillIcon2))
            WidgetDig(this._ui, "main/skill/btnSkill2/icon").loadTexture(RES_ICON_SKILL_PATH + skillIcon2, ccui.Widget.PLIST_TEXTURE);
        WidgetDig(this._ui, "main/skill/btnSkill2").skillID = skillId2;

        var skillIcon3 = tj.dbdata.getValueById("skill", skillId3, "icon");
        if(isFrameCacheTexture(RES_ICON_SKILL_PATH + skillIcon3))
            WidgetDig(this._ui, "main/skill/btnSkill3/icon").loadTexture(RES_ICON_SKILL_PATH + skillIcon3, ccui.Widget.PLIST_TEXTURE);
        WidgetDig(this._ui, "main/skill/btnSkill3").skillID = skillId3;
    },

    testUpLv : function(t){
        this._delattr = {"skl":1, "mag":2, "agl": 3, "lv":1};
        // msg = '[10850,{"data":{"d_attr":{"skl":1,"str":1},"d_exp":75,"exp":58947,"hero":{"Id":1112,"Tid":1,"Job":110,"Name":"斯宾塞","Lv":16,"Slot":[0,0,0,0],"Energy":100,"SelfAttr":{"Power":0,"Hp":2501,"Str":2504,"Mag":2500,"Skl":252,"Def":2500,"Resist":2500,"Agl":2501,"Coinbonus":0,"Expbonus":0},"EquipAttr":{"Power":0,"Hp":0,"Str":0,"Mag":0,"Skl":0,"Def":0,"Resist":0,"Agl":0,"Coinbonus":0,"Expbonus":0}}},"ret":0}]'
        for (var i = 0; i < t; i++){
            // this.process_ac(JSON.parse(msg));
            this.heroUpLvEffect();
        }
    },

    clearUpLvEffect : function(){
        for (var i in this._attrEffects) {
            var text = this._attrEffects[i];
            if (text.getParent()) {
                text.removeFromParent(true);
            }
        }
        this._attrEffects = [];
        this.setAllRelease("text");
    },

    getUpRankAttr : function(job){
        return {
            hp: tj.dbdata.getValueById("job", job, "hp"),
            str: tj.dbdata.getValueById("job", job, "str"),
            mag : tj.dbdata.getValueById("job", job, "mag"),
            skl : tj.dbdata.getValueById("job", job, "skl"),
            def : tj.dbdata.getValueById("job", job, "def"),
            resist : tj.dbdata.getValueById("job", job, "resist"),
            agl : tj.dbdata.getValueById("job", job, "agl")
        }
    },

    weaponCompareEffect:function(equipid, oldequipid){
        var newequip = tj.mainData.getEquipByid(equipid);
        var oldequip = tj.mainData.getEquipByid(oldequipid);
        var newval = 0;
        var oldval = 0;
        if(newequip){
            if(!tj.mainData.equipTypeIsWeapon(newequip.Type))
                return;
            newval = newequip.Val;
        }
        if(oldequip){
            if(!tj.mainData.equipTypeIsWeapon(oldequip.Type))
                return;
            oldval = oldequip.Val;
        }

        var plisttexture = null;
        if(oldval > newval)
            plisttexture = "ui/modifiedSkillMin.png";
        else if(oldval < newval)
            plisttexture = "ui/modifiedSkill.png";
        if(plisttexture){
            for(var i=1;i<=3;i++){
                var btnSkill = WidgetDig(this._ui, "main/skill/btnSkill"+i);
                var btnAdd = WidgetDig(btnSkill, "add");
                var skillType = tj.dbdata.getValueById("skill", btnSkill.skillID, "type");
                if(skillType == 0)
                    continue;
                flickerEffect(btnAdd);
                btnAdd.loadTexture(plisttexture, ccui.Widget.PLIST_TEXTURE);
            }
        }
    },

    heroUpLvEffect : function(){
        var tpl = WidgetDig(this._ui, "main/textMore/power");
        var size = tpl.getFontSize() / 2;
        var del2ui = {"agl": "speed", "str": "power", "mag": "magic", "skl": "skill", "hp": "health", "def": "defense", "resist": "resistance", "lv": "level"};
        var idx = 0;
        this.clearUpLvEffect();
        for (var i in this._delattr) {
            var attr = this._delattr[i];
            if (attr === 0) {
                continue;
            }
            var anchor = {
                anchorX: 0,
                anchorY: 1
            };
            var path = "main/textMore";
            if (i === "lv") {
                path = "main/text";
                anchor = {
                    anchorX : 0,
                    anchorY : 0.5
                };
                size += 4;
            }
            var attrT = WidgetDig(this._ui, path + "/" + del2ui[i]);
            var pos = attrT.getPosition();
            if (i === "lv") {
                pos.x -= 50;
            }
            var sign = "   +";
            var color = cc.color(0, 255, 0, 255);
            if(attr < 0){
                sign = "   ";
                color = cc.color.RED;
            }
            var text = new ccui.Text(sign + attr, "", size * 2 - 2);
            this.setRetain(text, "text");
            text.attr(anchor);
            text.setFontName(tj.cfg.get("designdata/design_fontName"));
            var col = new cc.Color(10, 10, 10, 255);
            text.enableOutline(col, 2);
            text.setColor(color);
            var width = (attrT.getString().length - 3) * size + 60;
            text.setPosition(pos.x + width, pos.y);
            this._attrEffects.push(text);
            WidgetDig(this._ui, path).addChild(text);
            text.setOpacity(0);
            var e0 = new cc.FadeIn(0.5);
            var d1 = new cc.DelayTime(1);
            var e1 = new cc.FadeOut(1);
            //var f = cc.callFunc(function(){
            //    this._btnUpgrade.setEnabled(true);
            //    this._btnUpgrade.color = cc.color("#FFFFFF");}
            //    ,this);
            if(this._operateType != heroCard_t.uprank)
                var q = cc.sequence(e0, d1, e1);
            else
                q = cc.sequence(e0, d1);
            text.runAction(q);
            idx++;
        }
    },

    refreshEquip:function(){
        var btn_name = ["weapon", "shield", "assist","other"];
        var equip_type = [this._heroinfo.Slot1, EquipType.HuJia, EquipType.ShiPin, EquipType.ShiPin];
        for(var i=0;i<4;i++){
            var uiEquipBtn = WidgetDig(this._ui, "main/equip/" + btn_name[i]);
            uiEquipBtn.equipType = equip_type[i];
            var equip_id = this._heroinfo.Slot[i];
            var uiEquipIcon = WidgetDig(uiEquipBtn, "icon");
            var uiEquipFIcon = WidgetDig(uiEquipBtn, "level");
            var uiAdd = WidgetDig(uiEquipBtn, "add");
            uiEquipBtn.equipID = equip_id;
            uiEquipBtn.slotIndex = i;
            uiEquipFIcon.setVisible(false);
            uiAdd.setVisible(false);
            var equip = tj.mainData.getEquipByid(equip_id);
            if(this._operateType == heroCard_t.rank)
                equip = tj.mainData.getRankEquipByid(equip_id);
            var canTouch = false;
            if(equip) {
                uiEquipIcon.loadTexture(equip.Icon, ccui.Widget.PLIST_TEXTURE);
                uiEquipFIcon.loadTexture(equip.FrameIcon, ccui.Widget.PLIST_TEXTURE);
                uiEquipFIcon.setVisible(true);
                canTouch = true;
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
                if(this._operateType != heroCard_t.check && this._operateType != heroCard_t.rank){
                    var equips = tj.mainData.getStorageEquipsByType(uiEquipBtn.equipType);
                    var canEquip = equips.length > 0;
                    if(tj.isInMap){
                        if(this._operateType == heroCard_t.camp) {
                            equips = tj.mainData.getBagEquipByType(uiEquipBtn.equipType);
                            canEquip = equips.length > 0;
                        }else
                            canEquip = false;
                    }else
                        canTouch = true;
                    if(canEquip) {
                        uiAdd.setVisible(true);
                        flickerEffect(uiAdd, true);
                        canTouch = true;
                    }
                }
            }
            uiEquipBtn.setEnabled(canTouch);
        }
    },

    process_ac : function(doc){
        var msg_id = doc[0];
        var data = doc[1];
        switch(msg_id){
            case msgac["Hero_uplv"]:
                var ret = data.ret;
                switch(ret){
                    case 0:
                        tj.mainData.getTavern().Exp = data.data.exp;
                        tj.wsconnection.pushmsg(msgac["Pub_refresh_ui"]);

                        tj.mainData.updataHero(data.data.hero);
                        this._delattr = data.data.d_attr;
                        this._delattr["lv"] = 1;
                        tj.wsconnection.pushmsg(msgac["Layer_refresh_hero"],{"force":1});
                        this._heroinfo = tj.mainData.getOwnHeroById(this._heroid);
                        this.refreshUi();
                        this.refreshAttr();
                        this.heroUpLvEffect();
                        break;
                    case 10:
                        this.noticetext_add(tj.cfg.get("text/toplevel"));
                        break;
                    case 20:
                        this.noticetext_add(tj.cfg.get("text/lessexp"));
                        break;
                    case 30:
                        this.noticetext_add(tj.cfg.get("text/pub/overjoblv"));
                        break;
                    case 40:
                        this.noticetext_add(tj.cfg.get("text/pub/overHerolv"));
                        break;
                }
                if(this._uprankState != 2){
                    this._btnUpgrade.setEnabled(true);
                    this._btnUpgrade.color = cc.color("#FFFFFF");
                }
                if(tj.mainData.getClientData("help")[4] == 3){
                    tj.mainData.setClientDataValue("help", 4, 4);
                    this.refreshHelp();
                }
                break;
            case msgac["Hero_uprank"]:
                var ret = data.ret;
                this._btnUpgrade.setEnabled(true);
                this._btnUpgrade.color = cc.color("#FFFFFF");
                switch(ret)
                {
                    case 0:
                        var notice = tj.cfg.get("text/pub/uprankSucc");
                        if(data.data.coins){
                            tj.mainData.setCoinNum(data.data.coins.left);
                            tj.wsconnection.pushmsg(msgac["Main_refresh_resource"]);
                            notice += " " + tj.cfg.get("text_on_ui/coin") + data.data.coins.delta;
                        }
                        if(data.data.item){
                            tj.mainData.setItemNum(data.data.item.id, data.data.item.left);
                            notice += " " + tj.mainData.getItemName(data.data.item.id) + data.data.item.delta;
                        }
                        if(data.data.unload_weapon){
                            tj.mainData.addStroageEquips(data.data.unload_weapon.id);
                            notice += " " + tj.cfg.get("text/herocard/unload_weapon").format(tj.mainData.getItemName(data.data.unload_weapon.id));
                        }
                        this.noticetext_add(notice);

                        tj.mainData.updataHero(data.data.hero);
                        tj.mainData.refreshHeroEquipAttr(data.data.hero.Id);

                        tj.wsconnection.pushmsg(msgac["Layer_refresh_hero"], {"force":1});
                        this._heroinfo = tj.mainData.getOwnHeroById(this._heroid);

                        this.refreshUi();
                        this.refreshSkill();
                        this.refreshAttr();
                        this.refreshEquip();
                        this._delattr = this.getUpRankAttr(this._heroinfo.Job);
                        this.heroUpLvEffect();
                        break;
                    case 10:
                    case 20:
                    case 25:
                        this.noticetext_add(tj.cfg.get("text/pub/uprankFailed"));
                        break;
                    case 30:
                        this.noticetext_add(tj.cfg.get("text/lessChaos"));
                        break;
                    case 40:
                        this.noticetext_add(tj.cfg.get("text/lessItem"));
                        break;
                    case 50:
                        this.noticetext_add(tj.cfg.get("text/notgold"));
                        break;
                    case 60:
                        this.noticetext_add(tj.cfg.get("text/pub/uprank_have_equip"));
                        break;
                    case 70:
                        this.noticetext_add(tj.cfg.get("text/pub/overjoblv"));
                        break;
                }
                break;
            case msgac["Hero_use_equipment"]:
                var ret = data.ret;
                if(this._curr_popLayer)
                    this._curr_popLayer.set_release();
                switch(ret)
                {
                    case 0:
                        var slot = data.data.slot;
                        var eid = data.data.load;
                        var unload_eid = data.data.unload;
                        var id_hero = data.data.id_hero;
                        if(id_hero != this._heroid)
                            break;
                        var equip = tj.mainData.getEquipByid(eid);
                        if(equip) {
                            equip.Owner = this._heroid;
                            equip.Slot = slot;
                        }
                        this._heroinfo.Power = data.data.power;
                        this._heroinfo.Slot[slot] = eid;
                        if(data.hasOwnProperty("weight")) {
                            tj.mainData.subBagItem(eid, 1);
                            if (unload_eid)
                                tj.mainData.addBagItem(unload_eid, 1);
                            tj.wsconnection.pushmsg(msgac["Bag_refresh_weight"],{"bagc": data.weight, "bagmax":data.maxweight});
                        }
                        else{
                            tj.mainData.removeStroageEquips(eid);
                            if (unload_eid)
                                tj.mainData.addStroageEquips(unload_eid);
                        }
                        this._delattr = tj.mainData.refreshHeroEquipAttr(id_hero);
                        this.refreshUi();
                        this.refreshAttr();
                        this.refreshEquip();
                        this.heroUpLvEffect();
                        this.weaponCompareEffect(eid,unload_eid);
                        tj.mainData.sortHeros(tj.mainData.main.tavern.heros);
                        tj.wsconnection.pushmsg(msgac["Layer_refresh_hero"], {"force":1});
                        break;
                    case 10:
                        this.noticetext_add(tj.cfg.get("text/equipSlotErr"));
                        break;
                    case 20:
                        this.noticetext_add(tj.cfg.get("text/equipNotPut"));
                        break;
                    case 22:
                        this.noticetext_add(tj.cfg.get("text/equipNotMate"));
                        break;
                    case 30:
                        this.noticetext_add(tj.cfg.get("text/equipNotTakeOff"));
                        break;
                    case 40:
                        this.noticetext_add(tj.cfg.get("text/equipNotTakeOn"));
                        break;
                }
                break;
            case msgac["Hero_remove_equipment"]:
                var rdata = data.data;
                ret = data.ret;
                if(this._curr_popLayer)
                    this._curr_popLayer.set_release();
                switch(ret) {
                    case 0:
                        id_hero = data.data.id_hero;
                        if(id_hero != this._heroid)
                            break;
                        if(data.hasOwnProperty("weight")) {
                            tj.mainData.addBagItem(rdata.unload, 1);
                            tj.wsconnection.pushmsg(msgac["Bag_refresh_weight"],{"bagc": data.weight, "bagmax":data.maxweight});
                        }
                        else
                            tj.mainData.addStroageEquips(rdata.unload);
                        var hero = tj.mainData.getOwnHeroById(rdata.id_hero);
                        hero.Power = rdata.power;
                        if(hero){
                            for(var h in hero.Slot){
                                if(hero.Slot[h] == rdata.unload)
                                    hero.Slot[h] = 0;
                            }
                        }
                        this._delattr = tj.mainData.refreshHeroEquipAttr(rdata.id_hero);
                        this.refreshUi();
                        this.refreshAttr();
                        this.heroUpLvEffect();
                        this.refreshEquip();
                        this.weaponCompareEffect(0,rdata.unload);
                        tj.mainData.sortHeros(tj.mainData.main.tavern.heros);
                        tj.wsconnection.pushmsg(msgac["Layer_refresh_hero"], {"force":1});
                    break;
                    case 10:
                        this.noticetext_add(tj.cfg.get("text/equipSlotErr"));
                        break;
                    case 20:
                        this.noticetext_add(tj.cfg.get("text/equipNotPut"));
                        break;
                    case 30:
                        this.noticetext_add(tj.cfg.get("text/equipNotTakeOff"));
                        break;
                }
                break;
            case msgac["Hero_recover_energy"]:
                switch(data.ret) {
                    case 0:
                        if(data.id_hero[0] == this._heroid){
                            this._heroinfo.Energy = 100;
                            this.refreshEnergy();
                            tj.mainData.setGemNum(data.gemcost.left);
                            var gemid = tj.cfg.getAttr("designdata/itemID", "gemid");
                            this.noticetext_add(tj.mainData.getItemName(gemid) + " " + data.gemcost.delta);
                            tj.wsconnection.pushmsg(msgac["Layer_refresh_hero"]);
                        }
                        break;
                    case -1:
                        this.noticetext_add(tj.cfg.get("text/iderror"));
                        break;
                    case -2:
                        this.noticetext_add(tj.cfg.get("text/notdiamond"));
                        break;
                }
                break;
            case msgac["Refresh_energy"]:
                var hid = data;
                if(hid == this._heroid)
                    this.refreshEnergy(true);
                break;
            case msgac["Rank_get_hero"]:
                switch (data.ret){
                    case 0:
                        var heroInfo = data.hero;
                        var equips = data.equips;
                        for(var eq in equips){
                            equip = equips[eq];
                            tj.mainData.addRankEquipInfo(equip);
                        }
                        tj.mainData.addRankingHero(heroInfo);
                        this.refreshHero();
                        break;
                    case 1:
                        break;
                }
                break;
            case msgac["Hero_change_name"]:
                var msg = "";
                switch(data.ret){
                    case 0:
                        var hint = tj.cfg.get("text/herocard/changeName/success");
                        if(data.t == 1) {
                            tj.mainData.setCoinNum(data.cost.left);
                            msg = hint + tj.cfg.get("text_on_ui/coin") + data.cost.del;
                        } else if(data.t == 0) {
                            tj.mainData.setGemNum(data.cost.left);
                            msg = hint + tj.cfg.get("text_on_ui/jewe") + data.cost.del;
                        }else{
                            msg = hint;
                        }
                        var hero = tj.mainData.getOwnHeroById(data.id);
                        if(hero) {
                            hero.Name = data.name;
                        }
                        var name_str = tj.cfg.get("text_on_ui/hero/cardName").format(hero.Name, hero.JobName);
                        WidgetDig(this._ui, "main/text/name").setString(name_str);
                        tj.wsconnection.pushmsg(msgac["Layer_refresh_hero"]);
                        break;
                    case 1:
                        msg = tj.cfg.get("text/herocard/changeName/fail1");
                        break;
                    case 2:
                        msg = tj.cfg.get("text/herocard/changeName/fail2");
                        break;
                    case 3:
                        msg = tj.cfg.get("text/herocard/changeName/fail3");
                        break;
                    case 4:
                        msg = tj.cfg.get("text/herocard/changeName/fail4");
                        break;
                    case 5:
                        msg = tj.cfg.get("text/herocard/changeName/fail5");
                        break;
                    default:
                        msg = tj.cfg.get("failDefault").format(data.ret);
                        break;
                }
                this.noticetext_add(msg);
                break;
            default:
                break;
        }
    },

    onEnterTransitionDidFinish : function(){
        this._super();
        if(this._transMove){
            if(this._transMove == trans_dir.left)
                this.transIn("Move", 0.5, {"dir":"left"});
            else if(this._transMove == trans_dir.right)
                this.transIn("Move", 0.5, {"dir":"right"});
        }
    },

    onExit: function() {
        this._super();
        //离开时清空动画和升级特效
        var animation = WidgetDig(this._ui, "main/role/animation");
        animation.removeAllChildren();
        this.clearUpLvEffect();
        var help = tj.mainData.getClientData("help")[4];
        if(help == 1){
            if(this._tjParent)
                this._tjParent.refreshHelp();
        }else if(help == 4) {
            tj.wsconnection.pushmsg(msgac["Layer_refresh_help"]);
        }
        tj.waitrecruit = false;
    },

    defaultTouchButton : function(btn, type) {
        var that = this;
        if (type == ccui.Widget.TOUCH_ENDED) {
            switch(btn.getName())
            {
                case "btnClosed":
                    if (this._old !== null) {
                        this.clearTempHero();
                    } else {
                        this.set_release();
                    }
                    break;
                case "btnFire":
                    if(tj.mainData.isHeroInMop(this._heroid)){
                        this.noticetext_add(tj.cfg.get("text/tavern/mopNoFire"));
                        break;
                    }
                    var str = tj.cfg.get("text/tavern/fireAsk");
                    createMsgBox2(this, str, function(tag){
                        if (tag == 0) {
                            if(that._heroinfo && that._heroinfo.Ratings >= 4){
                                str = tj.cfg.get("text/tavern/fireAskS").format(that._heroinfo.RatingsName);
                                var msgbox = createMsgBox2(that, str, function(tag){
                                    if (tag == 0)
                                        tj.wsconnection.setMsg(msgac["Tavern_dismiss"], {"id": that._heroid});
                                    return true;
                                });
                                msgbox.add_btn(tj.cfg.get("text_on_ui/ok"), 0, 3);
                                msgbox.add_btn(tj.cfg.get("text_on_ui/cancel"), 1);
                            }
                            else
                                tj.wsconnection.setMsg(msgac["Tavern_dismiss"], {"id": that._heroid});
                            //fightData.deleteDefaultSkillData(that._heroid); //删除此英雄最后选择的技能信息
                            //that.set_release();
                        }
                        return true;
                    }, 2);
                    break;
                case "btnUpgrade":
                    if(tj.mainData.isHeroInMop(this._heroid)){
                        this.noticetext_add(tj.cfg.get("text/tavern/mopNoUp"));
                        break;
                    }
                    if (this._uprankState == 0) {
                        tj.wsconnection.setMsg(msgac["Hero_uplv"], {"id": this._heroid});
                        cc.log("cardHeroLayer send Hero_uplv! heroid= " + this._heroid + "heroName= " + this._heroinfo.Name);
                        this._btnUpgrade.setEnabled(false);
                        this._btnUpgrade.color = cc.color("#888888");
                    }
                    else
                        this._curr_popLayer = createUpRankSelect(this, this._heroinfo.Job, 1, this.callbackSelect.bind(this), this._heroinfo.Id);
                    break;
                case "btnRecruit":
                    var index = this._heroid;
                    var s1 = this._heroinfo.Name + "：" + "\n\n";
                    var speech = tj.dbdata.getValueById("racetemplate", this._heroinfo.Tid, "speech")
                    s1 += tj.dbdata.getValueById("racedialog", speech, "cond7");
                    var row = tj.dbdata.getrow("racetemplate", this._heroinfo.Tid);
                    var needstr1 = tj.cfg.get("text_on_ui/coinpay").format(row["basicCost"]);
                    var needstr2 = tj.cfg.get("text_on_ui/gempay").format(row["gemCost"]);
                    var msgbox = createMsgBox2(this, s1, function(tag){
                        if (tag == 0)
                            tj.wsconnection.setMsg(msgac["Tavern_recruit"], {"idx":index,"p":0});
                        else if(tag == 1)
                            tj.wsconnection.setMsg(msgac["Tavern_recruit"], {"idx":index,"p":1});
                        //if(tag != 2)
                        //    that.set_release();
                        return true;
                    });
                    if(row["basicCost"] ==0 && row["gemCost"] == 0)
                        msgbox.add_btn(tj.cfg.get("text_on_ui/ok"), 0);
                    else{
                        msgbox.add_btn(needstr1, 0);
                        msgbox.add_btn(needstr2, 1);
                    }
                    msgbox.add_btn(tj.cfg.get("text_on_ui/cancel", ""), 2);
                    break;
                case "weapon":
                case "shield":
                case "assist":
                case "other":
                    switch (this._operateType){
                        case heroCard_t.pub:
                        case heroCard_t.battle:
                        case heroCard_t.pvp:
                        case heroCard_t.camp:
                            if(btn.equipID == 0) {
                                if(tj.mainData.isHeroInMop(this._heroid)){
                                    this.noticetext_add(tj.cfg.get("text/tavern/mopNoChangeEquip"));
                                    break;
                                }
                                if (!createEquipSelect(this, this._operateType == heroCard_t.camp, btn.equipType, btn.slotIndex, this.selectWeaponCallback.bind(this),
                                        0, this._heroid))
                                {
                                    if( tj.mainData.equipTypeIsWeapon(btn.equipType))
                                        this.noticetext_add(tj.cfg.get("text/tavern/noEquopWeapon"),true);
                                    if( btn.equipType == 6)
                                        this.noticetext_add(tj.cfg.get("text/tavern/noEquopGuard"),true);
                                    if( btn.equipType == 7)
                                        this.noticetext_add(tj.cfg.get("text/tavern/noEquopCollect"),true);
                                }
                            }
                            else {
                                var t = box_card_from_t.herocard;
                                if(this._operateType == heroCard_t.camp)
                                    t = box_card_from_t.herocard_camp;
                                this._curr_popLayer = createNoteBoxCard(this, btn.equipID, t, null, {heroid : this._heroid});
                            }
                            break;
                        case heroCard_t.rank:
                            if(btn.equipID != 0)
                                this._curr_popLayer = createNoteBoxCard(this, btn.equipID, box_card_from_t.herocard_rank);
                            break;
                        default :
                            if(btn.equipID != 0)
                                this._curr_popLayer = createNoteBoxCard(this, btn.equipID);
                    }
                    break;
                case "btnSkill1":
                case "btnSkill2":
                case "btnSkill3":
                    WidgetDig(this._ui, "main/skill/btnSkill1/select").setVisible(false);
                    WidgetDig(this._ui, "main/skill/btnSkill2/select").setVisible(false);
                    WidgetDig(this._ui, "main/skill/btnSkill3/select").setVisible(false);
                    WidgetDig(btn, "select").setVisible(true);

                    var additionAttr = {};
                    if(this._operateType == heroCard_t.uprank) {
                        additionAttr.Str = tj.dbdata.getValueById("job", this._uprankJob, "str");
                        additionAttr.Mag = tj.dbdata.getValueById("job", this._uprankJob, "mag");
                    }
                    if(this._heroinfo){
                        var str = tj.mainData.getSkillIntro(btn.skillID, this._heroinfo.SelfAttr, this._heroinfo.EquipAttr, additionAttr);
                        this._curr_popLayer = createSkillNoteBox(this, str, this.on_notebox_close.bind(this));
                    }
                    break;
                case "btnRight":
                    var heros = [];
                    if(this._operateType == heroCard_t.battle || this._operateType == heroCard_t.camp)
                        heros = tj.mainData.getBattleHeroInfo();
                    else if(this._operateType == heroCard_t.pvp)
                        heros = tj.mainData.getArenaHeroInfo();
                    else
                        heros = tj.mainData.getOwnHeros();
                    this._heroid = this.get_next_heroid(heros, this._heroid);
                    this.refreshHero();
                    break;
                case "btnLeft":
                    heros = [];
                    if(this._operateType == heroCard_t.battle || this._operateType == heroCard_t.camp)
                        heros = tj.mainData.getBattleHeroInfo();
                    else if(this._operateType == heroCard_t.pvp)
                        heros = tj.mainData.getArenaHeroInfo();
                    else
                        heros = tj.mainData.getOwnHeros();
                    this._heroid = this.get_front_heroid(heros, this._heroid);
                    this.refreshHero();
                    break;
                case "btnAdd":
                    var e = this._heroinfo.Energy;
                    if(e >= 100) {
                        this.noticetext_add(tj.cfg.get("text/tavern/spfull"));
                    }else{
                        str = tj.cfg.get("text/tavern/spAsk").format(tj.mainData.getHeroGem2Energy(this._heroinfo));
                        this._curr_popLayer = createMsgBox2(this, str, function (tag) {
                            if (tag == 0)
                                tj.wsconnection.setMsg(msgac["Hero_recover_energy"], {"id_hero": [that._heroid]});
                            return true;
                        }, 2);
                    }

                    //一键穿装备
                    //var btn_name = ["weapon", "shield", "assist","other"];
                    //var eliminate_equipid = 0;
                    //for(var i=0;i<4;i++) {
                    //    var uiEquipBtn = WidgetDig(this._ui, "main/equip/" + btn_name[i]);
                    //    var curr_equipid = this._heroinfo.Slot[i];
                    //    var best_equip_id = tj.mainData.getBestEquip(uiEquipBtn.equipType, this._heroinfo.Job, curr_equipid, eliminate_equipid);
                    //    if(best_equip_id && best_equip_id != curr_equipid){
                    //        if(uiEquipBtn.equipType == EquipType.ShiPin)
                    //            eliminate_equipid = best_equip_id;
                    //        tj.wsconnection.setMsg(msgac["Hero_use_equipment"], {"id_hero": this._heroid, "id_eq":best_equip_id, "slot":i});
                    //    }
                    //}
                    break;
                case "btnSet":
                    this._curr_popLayer = new aiCustomLayer(this._heroinfo);
                    this._curr_popLayer._tjParent = this;
                    this.addChild(this._curr_popLayer);
                    if(this._operateType == heroCard_t.camp || this._operateType == heroCard_t.check){
                        tj.wsconnection.pushmsg(msgac["Map_stop_auto_move"]);
                    }
                    break;
                case "btnHero":
                    this._heroid = btn.heroid;
                    this._heroinfo = tj.mainData.getRankingHeroById(this._heroid);
                    if(!this._heroinfo)
                        tj.wsconnection.setMsg(msgac["Rank_get_hero"], {"id":this._heroid });
                    else
                        this.refreshHero();

                    var btnHeros = this._headlist.getChildren();
                    for(var i in btnHeros)
                        btnHeros[i].setHighlighted(false);
                    btn.setHighlighted(true);
                    break;
                case "btnAnimation":
                    if(this._heroinfo){
                        speech = tj.dbdata.getValueById("racetemplate", this._heroinfo.Tid, "speech");
                        s1 = tj.dbdata.getValueById("racedialog", speech, "cond1");
                        this._curr_popLayer = createNoteBox(this, s1, form_t.skill);
                    }
                    break;
                case "btnName":
                    this._curr_popLayer = createInputUIDLayer(this, input_type.heroName, function(info){
                        tj.wsconnection.setMsg(msgac["Hero_change_name"],info);
                    }, this._heroid);
                    break;
                default:
                    break;
            }
        }
    },

    get_front_heroid:function(heros, heroid){
        for (var h in heros) {
            var hero = heros[h];
            var idx = parseInt(h);
            if(hero.Id == heroid)
            {
                var f_idx = idx-1;
                if(f_idx < 0)
                    f_idx = heros.length-1;
                return heros[f_idx].Id;
            }
        }
        return 0;
    },

    get_next_heroid:function(heros, heroid){
        for (var h in heros) {
            var hero = heros[h];
            var idx = parseInt(h);
            if(hero.Id == heroid)
            {
                var f_idx = idx+1;
                if(f_idx >= heros.length)
                    f_idx = 0;
                return heros[f_idx].Id;
            }
        }
        return 0;
    },

    on_notebox_close:function(){
        WidgetDig(this._ui, "main/skill/btnSkill1/select").setVisible(false);
        WidgetDig(this._ui, "main/skill/btnSkill2/select").setVisible(false);
        WidgetDig(this._ui, "main/skill/btnSkill3/select").setVisible(false);
    },

    selectWeaponCallback: function (equipid, slot) {
        tj.wsconnection.setMsg(msgac["Hero_use_equipment"], {"id_hero": this._heroid, "id_eq":equipid, "slot":slot});
    },

    callbackSelect:function(job){
        if (job > 0)
            this._curr_popLayer =  createUpRankSelect(this, job, 2, this.callbackConfirm.bind(this), this._heroinfo.Id);
        return true;
    },

    callbackConfirm:function(job){
        if (job > 0){
            tj.wsconnection.setMsg(msgac["Hero_uprank"], {"id": this._heroid, "tojob":job});
            this._btnUpgrade.setEnabled(false);
            this._btnUpgrade.color = cc.color("#888888");
        }else
            this._curr_popLayer =  createUpRankSelect(this, this._heroinfo.Job, 1, this.callbackSelect.bind(this), this._heroinfo.Id);
        return true;
    },

    isRecruit:function(){
        return this._operateType == heroCard_t.recruit;
    }

});

createCardHeroLayer = function(parent, hid, operateType, job){
    var pRet = LayerCacheMgr.getInstance().getLayer("cardhero");
    if (pRet.getParent() !== null) {
        pRet.removeFromParent();
    }
    // var pRet = new cardHeroLayer();
    if (pRet){
        pRet.setData(hid, operateType, job);
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
