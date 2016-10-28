/**
 * 战斗界面
 * Created by faps on 2015/12/25.
 */


/**
 * director popScene ovirride
 * @param  {[type]} t     duration
 * @param  {[type]} trans cc.TransAnimation
 */
if (!cc.sys.isNative) {
    cc.director.popScene = function(t, trans){
        // cc.assert(cc.director._runningScene, cc.director._LogInfos.Director_popScene);
        cc.director._scenesStack.pop();
        var c = cc.director._scenesStack.length;
        if (c === 0)
            cc.director.end();
        else {
            cc.director._sendCleanupToScene = true;
            if (trans !== undefined) {
                cc.director._nextScene = new trans(t, cc.director._scenesStack[c - 1]);
            } else {
                cc.director._nextScene = cc.director._scenesStack[c - 1];
            }
        }
    }
}
tj.lastScene = null;
tj.pushScene = function(scene){
    if (cc.sys.isNative) {
        tj.lastScene = cc.director.getRunningScene();
        tj.lastScene.retain();
        cc.director.runScene(scene);
    } else {
        cc.director.pushScene(scene);
    }
};
tj.popScene = function(t, trans) {
    if (cc.sys.isNative) {
        if (tj.lastScene) {
            if (t !== undefined && trans !== undefined) {
                cc.director.runScene(new trans(t, tj.lastScene));
            } else {
                cc.director.runScene(tj.lastScene);
            }
            tj.lastScene.release();
            tj.lastScene = null;
        }
    } else {
        cc.director.popScene(t, trans);
    }
};
tj.removePushedScene = function() {
    if (cc.sys.isNative) {
        if(tj.lastScene) {
            tj.lastScene.release();
            tj.lastScene = null;
        }
    }else{
        cc.director._scenesStack.pop();
    }
}


var fightLayer = baseLayer.extend({
    _ui: null,
    _ui_team : null,
    _lang: null, //语言包
    _update_dt: 0, //帧计时
    _bgMusic: '', //背景音乐
    _units: {}, //所有战斗单位方块
    _heros: {}, //英雄方块
    _enemies: {}, //敌对方块
    _portrait: {}, //怪物形象、动画
    _curr_hero: null, //当前选择的英雄
    _curr_hero_hash: null,
    _curr_skill: null, //当前选择的技能
    _curr_skill_hash: null,
    _buffs: {}, //buff方块
    _taunts: {}, //拥有嘲讽buff的单位
    _animation_loading_state: {}, //动画加载完成标志
    _is_start: false, //战斗开始标志
    _animation_cache: {},
    _enterfinish: false, //进入完毕标志
    _updateUI_done: false, //updateUI是否执行完毕
    _need_to_rm : {},
    _btn_test: null,
    _fightTimer: null, //pvp计时器
    _selector_flag: '_select', //选择点名称后缀
    _selectors: {},

    _skill_hero_cache : [], // 用于push英雄对应skill的列表进去的缓存管理

    _pvpReport:null,  //pvp战报

    _adjustScale: function(mode) {
        switch(mode) {
            case 0:
                if(cc.tj.ACTIVE === true) {
                    switch (cc.tj.PTYPE) {
                        case P_TYPE_WID:
                            this.setScale(this._old_scale);
                            break;
                    }
                }
                break;
            case 1:
            default:
                if(cc.tj.ACTIVE === true) {
                    switch (cc.tj.PTYPE) {
                        case P_TYPE_WID:
                            this.setScale(cc.tj.SCALE);
                            break;
                    }
                }
                break;
        }
    },

    ctor : function() {
        this._super();
        this._need_to_rm = {};
        this._basename = "PK";

        this._units =  {};
        this._heros =  {};
        this._enemies =  {};
        this._portrait =  {};
        this._curr_hero =  null;
        this._curr_hero_hash =  null;
        this._curr_skill =  null;
        this._curr_skill_hash =  null;
        this._buffs =  {};
        this._taunts =  {};
        this._animation_loading_state =  {};
        this._is_start =  false;
        this._animation_cache =  {};
        this._enterfinish =  false;
        this._updateUI_done =  false;
        this._btn_test =  null;
        this._fightTimer =  null;
        this._selector_flag =  '_select';
        this._selectors =  {};
        this._skill_hero_cache  =  [];
        this._pvpReport = null;

        this.init();
    },

    init : function () {
        cc.log('fight init');

        if (!this._super()) {
            return false;
        }
        //origin = cc.director.getVisibleOrigin();

        //加载ui
        if (this.load_scene(this.get_scene_name()) == -1)
            return false;
        if (!this._rcImpt.ui)
            return false;
        this._ui = this._rcImpt.ui;
        this._scene = this._rcImpt.node_scene;
        if (!this._ui)
            return false;

        //添加ui到界面
        //this._ui = this.load_ui("uiPK.json");
        //this.addChild(this._ui);

        //读取本地化语言文本信息
        this._lang = tj.cfg.get('text/fight');

        //更新界面
        this._ui_team = WidgetDig(this._ui, "TEAM");

        //战斗背景音乐
        this._bgMusic = RES_PATH + "sound/bgm/DarkEpic.mp3";

        this.setRetain(this._ui, "uitmpl");
        this.setRetain(this._ui_team, "uitmpl");

        //功能测试按钮
        var btn = new ccui.Button();
        btn.name = "btn_test";
        btn.setTitleFontSize(20);
        btn.setPosition(700, 300);
        btn.setTitleText("end");
        btn.addTouchEventListener(this.defaultTouchButton, this);
        btn.setVisible(false);
        this.addChild(btn, 999);
        this._btn_test = btn;

        this._boss_tmpl = WidgetDig(this._ui, "boss/hero1");
        this._boss_tmpl.setVisible(false);
        this.setRetain(this._boss_tmpl, "uitmpl");

        //pvp战斗计时器
        this._fightTimer = WidgetDig(this._ui, "textTime/textSkill");
        this._pvpName = WidgetDig(this._ui, "textTime/textName");

        //buff模板
        this._buff_tpl = WidgetDig(this._ui_team, "heros/hero1/buff/buff1");
        this._boss_buff_tpl = WidgetDig(this._ui, "boss/hero1/buff/buff1");
        this.setRetain(this._buff_tpl, "uitmpl");
        this.setRetain(this._boss_buff_tpl, "uitmpl");

        //技能列表
        //var sn = WidgetDig(this._ui, "textSkill/textSkill");
        //this._skill_intro = this._makeSkillRichText(sn, '');//'#x00FF00#多彩测试');
        //sn.setString('');
        this._skill_area = WidgetDig(this._ui, "skill");
        this._skill_tpl = WidgetDig(this._ui, "skill/btnSkill1");
        // this._skill_tpl.retain();
        this.setRetain(this._skill_tpl, "uitmpl");
        this._skill_tpl.removeFromParent(false);
        this._skill_area.removeAllChildren();

        //我方英雄列表
        this._team_area = WidgetDig(this._ui_team, "heros");
        this._hero_tpl = WidgetDig(this._ui_team, "heros/hero1");
        // this._hero_tpl.retain();
        this.setRetain(this._hero_tpl, "uitmpl");
        this._hero_tpl.removeFromParent(false);
        this._team_area.removeAllChildren();

        //敌方英雄列表
        this._enemy_area = WidgetDig(this._ui, "enemy");
        this._enemy_tpl = WidgetDig(this._ui, "enemy/hero1");
        // this._enemy_tpl.retain();
        this.setRetain(this._enemy_tpl, "uitmpl");
        this._enemy_tpl.removeFromParent(false);
        this._enemy_area.removeAllChildren();

        this._old_scale = this.getScale();
        if(cc.tj.ACTIVE === true) {
            switch (cc.tj.PTYPE) {
                case P_TYPE_WID:
                    this.setAnchorPoint(cc.p(0.5, 0));
                    this.setScale(cc.tj.SCALE);
                    // var BG = WidgetDig(this, "PK/BG");
                    // if (BG) {
                    //     BG.setScale(1 / cc.tj.SCALE);
                    // }
                    break;
            }
        }

        return true;
    },

    clear: function() {
        this._units = {};
        this._heros = {};
        this._enemies = {};
        for (var i in this._portrait) {
            var obj = this._portrait[i];
            if (!obj) {
                cc.log("portrait null ~~", i);
            }
            if (obj && obj.keep) {
                continue;
            }
            delete this._portrait[i];
        }
        // this._portrait = {};
        this._curr_hero = null;
        this._curr_hero_hash = null;
        this._curr_skill = null;
        this._curr_skill_hash = null;
        this._buffs = {};
        this._taunts = {};
        this._animation_loading_state = {};
        this._animation_cache = {};
        this._selectors = {};
        if(this._pvpReport){
            this._pvpReport.set_release();
            this._pvpReport = null;
        }

        //状态标志位<<
        this._is_start = false;
        this._enterfinish = false;
        this._updateUI_done = false;
    },

    //接口:清除技能缓存
    //每次有新的skill 进行keep的时候调用,传入英雄的id和idx进行缓存，当缓存队列已经满了（8个）后.把第一个添加进去的删掉。放进新的
    //返回true代表已经有动画
    addSkillCache : function(hash){
        var unit = fightData.getUnitBySkillHash(hash);
        if (!unit.isFriendly()) {
            return;
        }
        var ss = hash.split("_");
        var id = ss[1];
        var idx = ss[2];
        for (var i in this._skill_hero_cache) {
            var cache = this._skill_hero_cache[i];
            if (cache.id == id) {
                //如果已经已经有该英雄的id，判断idx是否一致，不一致的时候修改原有idx,并且调整_portait里面的键值对
                if (cache.idx != idx) {
                    this.delSkillPortrait("0_%s_%s".format(cache.id, cache.idx), unit, "0_%s_%s".format(id, idx));
                    var cacheh = this._skill_hero_cache.splice(i, 1);
                    this._skill_hero_cache.push(cacheh[0]);
                    cache.idx = idx;
                    return true;
                }
                return false;
            }
        }
        if (this._skill_hero_cache.length >= 8) {
            //如果已经达到最大值，删除队列第一个的相关信息
            var cache = this._skill_hero_cache.shift();
            this.delSkillPortrait("0_%s_%s".format(cache.id, cache.idx), cache.unit);
        }
        this._skill_hero_cache.push({id:id, idx:idx, unit:unit});
        return false;
    },

    //删除或者替换_portrait上的hash
    delSkillPortrait : function(hash, unit, change){
        var skills = unit.getAllSkill();
        for (var i in skills) {
            var shash = "skill_" + hash + "_" + skills[i].id;
            var nhash = "skill_" + change + "_" + skills[i].id;
            if (change !== undefined) {
                this._portrait[nhash] = this._portrait[shash];
            } else {
                var w = this._portrait[shash];
                if (!w) {
                    cc.log("w null================", shash, unit.hash, change);
                    return;
                }
                if (w.node) {
                    w.node.removeFromParent();
                    this.setRelease(w.node, "skillani");
                    this.setRelease(w.action, "skillani");
                }
            }
            delete this._portrait[shash];
        }
    },

    registerMsg: function() {
        tj.wsconnection.removeGrp("FightUI");
        tj.wsconnection.addGrp(msgac["FightUI_start"], msgac["FightUI_back_city"], this.receiveMsg.bind(this), "FightUI");
    },

    receiveMsg: function(obj) {
        //cc.log("fightLayer receiveMsg:", obj);
        var ac = obj[0];
        var data = obj[1];

        switch(ac) {
            case msgac["FightUI_start"]:
                if(fightData.isPvP()){
                    this._pvpReport = new arenaReportLayer();
                    this._pvpReport.init();
                    this.addChild(this._pvpReport);
                }
                break;

            case msgac["FightUI_show_timer"]:
                if(this._fightTimer) {
                    this._fightTimer.setString(tj.gameClock.millisecond2String(Math.round(fightData.time_ms)));
                    this._fightTimer.setVisible(true);
                }
                break;

            case msgac["FightUI_back_city"]:
                //战败，回城（全灭）
                tj.mainData.battleHero2Cemetery();

                //新手（回城阶段）
                if (tj.mainData.getClientData("help")[1] == 0) {
                    trans2scene(cc.TransitionFade, createScene(transHelpLayer), tj.cfg.get("designdata/transition_time_dead"));
                    break;
                }
                this.noticetext_add(tj.cfg.get("text/die_kill"));
                tj.removePushedScene();
                trans2scene(cc.TransitionFade, createScene(mainLayer), tj.cfg.get("designdata/transition_time_dead"));
                break;

            case msgac["FightUI_pop_msg"]:
                cc.log("pop_msg", data);
                this.noticetext_add(data.msg, false, 0);
                //this.log(data.msg);
                break;

            case msgac["FightUI_win"]:
                if(!fightData.isPvP()) {
                    if (data.heros) {
                        for (var i in data.heros) {
                            var herodata = data.heros[i];
                            if (herodata.dead) {
                                tj.mainData.ownHero2Cemetery(herodata.id);
                            }
                        }
                    }
                    if (data.exp) {
                        this.noticetext_add(this._lang["exp"].format(data.exp));
                    }
                    tj.wsconnection.pushmsg(msgac["MapUI_fight_end"], data, true);
                    this.exit(true, this._lang['victory']);
                }else{
                    this.exit(true, this._lang['victory']);
                }
                break;

            case msgac["FightUI_lost"]:
                this.exit(false, this._lang['lost']);
                break;

            case msgac["FightUI_draw"]:
                this.exit(false, this._lang['draw']);
                break;

            case msgac["FightUI_break"]:
                this.exit(true, this._lang['pvp']);
                break;

            case msgac["FightUI_err"]:
                this.exit(true, '');
                break;

            case msgac["FightUI_buff"]: //获得buff
                this.createBuff(data);
                this.showBuff(data.unit_hash, data);
                var fightUnit = fightData.getUnit(data.unit_hash);
                if(fightUnit instanceof FightUnit){
                    if(fightUnit.isDaze() && this._curr_hero_hash==fightUnit.hash) {
                        this.clearHero(); //当前英雄已眩晕,清除选中状态
                    }
                }
                break;

            case msgac["FightUI_buff_clear"]: //清除buff
                this.clearBuff(data);
                if(data.type==1) {
                    //眩晕buff结束
                    cc.log(' clear buff:', data);
                    this.stateUnit(data.unit_hash);
                    var fightUnit = fightData.getUnit(data.unit_hash);
                    if(fightUnit instanceof FightUnit) {
                        if(fightUnit.isReady()) {
                            this.playCDShine(fightUnit.hash);
                        }
                    }
                }
                break;

            case msgac["FightUI_buff_blink"]:
                this.blinkBuff(data);
                break;

            case msgac["FightUI_unit_dead"]: //英雄或怪物阵亡
                var fightUnit = fightData.getUnit(data.hash);
                if(fightUnit instanceof FightUnit) {
                    var self = this;
                    this.playAnimate(fightUnit.hash, 'dead', false, function(hash){
                        var w = self._portrait[hash];
                        if(w) {
                            w.node.setVisible(false);
                        }
                    });
                    this.deadUnit(fightUnit);
                }
                break;

            case msgac["FightUI_unit_update"]: //更新战斗单位更新
                var fightUnit = fightData.getUnit(data.hash);
                if(fightUnit instanceof FightUnit) {
                    this.updateUnit(fightUnit);
                    if(data.hp_str!=0) {
                        this.showHP(data.hash, data.hp_str, data.crit);
                    }
                }
                break;

            case msgac["FightUI_unit_attack"]: //战斗单位攻击
                var that = this;
                var fightUnit = fightData.getUnit(data.caster);
                if(fightUnit) {
                    var skill_to_all_target = false;
                    var target_str = '';
                    //施法者形象动画
                    this.playAnimate(fightUnit.hash, 'attack', false, function (hash) {
                        that.playAnimate(hash, 'standby', true);
                    });

                    //技能音效
                    if(data.skill) {
                        var skill = fightData.getSkill(data.skill);
                        if(skill instanceof Skill) {
                            if(skill.icon && fightUnit.isFriendly()) {
                                //技能提示
                                this.showSkill(skill.hash, fightUnit.hash);
                            }
                            if(skill.soundeffect) {
                                tj.audio.playEffect(RES_PATH + "sound/se/" + skill.soundeffect, false);
                            }else{
                                cc.log('not found skill(id:'+skill.id+') effect:'+ skill.soundeffect);
                            }
                        }
                        if(skill.target==1 || skill.target==3) {
                            skill_to_all_target = true;
                            if((fightUnit.isFriendly() && skill.target==1) || (!fightUnit.isFriendly() && skill.target==3)) {
                                target_str = 'all_enemy';
                            }else{
                                target_str = 'all_hero';
                            }
                        }
                    }

                    //技能动画
                    if(skill_to_all_target) {
                        this.playSkillAnimate(target_str, skill.hash||'');
                    }

                    //目标形象动画
                    for(var i in data.targets) {
                        var targetUnit = fightData.getUnit(data.targets[i]);
                        if(targetUnit == undefined)
                            break;
                        if(!skill_to_all_target) {
                            //单体目标，播放攻击技能动画
                            //cc.log('FightUI_unit_attack: ', targetUnit.hash);
                            this.playSkillAnimate(targetUnit.hash, skill.hash||'');
                        }
                        if(targetUnit.isDead()) {
                            //单位阵亡，播放被攻击和阵亡动画
                            this.playAnimate(targetUnit.hash, 'hurt', false, function(hash){
                                that.playAnimate(hash, 'dead', false, function(hash2){
                                    var w = that._portrait[hash2];
                                    if(w) {
                                        w.node.setVisible(false);
                                    }
                                });
                            });
                        }else{
                            if(fightUnit.isFriendly() == targetUnit.isFriendly()) {
                                //目标为队友单位
                                return;
                            }
                            //cc.log(targetUnit.hash + ' hurt animate.');
                            this.playAnimate(targetUnit.hash, 'hurt', false, function(hash){
                                that.playAnimate(hash, 'standby', true);
                            });
                        }
                    }
                }
                break;
        }
    },

    exit: function(alive, str) {
        //退出场景的相关处理
        this.clearHero();
        cc.audioEngine.stopMusic(); //停止战斗背景音乐
        //this.showEndText(str, function(){
        //    fightData.is_start = false;
        //    if (fightData.isPvP() && this._pvpReport){
        //        this._pvpReport.show(function(){
        //            tj.popScene(1, cc.TransitionFade);
        //        });
        //    }
        //    else if(alive)
        //        tj.popScene(1, cc.TransitionFade);
        //}.bind(this));


        //this.showEndText(str, function(){
        //    fightData.is_start = false;
        //    if (alive) {
        //        tj.popScene(1, cc.TransitionFade);
        //    } else {
        //        if(fightData.isPvP()) {
        //            tj.popScene(1, cc.TransitionFade);
        //        }
        //    }
        //});


        if(fightData.isPvP()) {
            this.schedule(function(){
                if (this._pvpReport)
                    this._pvpReport.show(function(){
                        tj.popScene(1, cc.TransitionFade);
                    });
            }, 0.8, false);
        }else{
            this.showEndText(str, function(){
                fightData.is_start = false;
                if (alive)
                    tj.popScene(1, cc.TransitionFade);
            });
        }
    },

     //战斗结束文字提示效果
    showEndText: function(str, cb) {
        var self = this;
        if(str=='') {
            if(typeof cb == "function"){
                cb();
            }
            return;
        }
        var w = new ccui.Text(str, tj.cfg.get("designdata/design_fontName"), 100);
        this.addChild(w);
        var font_eff = tj.cfg.get("noticebox/fonteffect", 0, t_int);
        var col = new cc.Color(255, 10, 200, 255);
        var offset = cc.size(0, 0);
        w.enableShadow(col, offset, 0.5);
        var col = new cc.Color(10, 10, 10, 255);
        w.enableOutline(col, 2)
        var col = new cc.Color(200, 10, 200, 255);
        w.enableGlow(col);
        var visibleSize = cc.director.getVisibleSize();
        var origin = cc.director.getVisibleOrigin();
        var center = cc.p(origin.x + visibleSize.width/2, origin.y + 50 + visibleSize.height/2);
        w.setPosition(center);
        w.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        w.setTextVerticalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        var sztxt = visibleSize;
        sztxt.width -= 100;
        sztxt.height = 0;
        w.setTextAreaSize(sztxt);
        w.setVisible(true);
        var scale = w.getScale();
        w.setScale(0);
        var e0 = new cc.ScaleTo(0.1, 1.4);
        var e1 = new cc.ScaleTo(0.5, scale);
        var e2 = new cc.DelayTime(0.5);
        var f = cc.callFunc(function(){
            w.removeFromParent(true);
            if(typeof cb == "function") {
                cb();
            }
        }, this);

        var q = cc.sequence(e0, e1, e2, f);
        w.runAction(q);
    },

    checkReady: function() {
        if(this._updateUI_done && this._enterfinish && this.isReady()) {
            this.initSelector(); //更新选择器位置
            this.initCDShine();
            if(!fightData.isStart()) {
                fightData.start();
            }
        }
    },

    isReady: function() {
        //UI准备就绪?
        var r = true;
        for(var i in this._animation_loading_state) {
            if(!this._animation_loading_state[i]) {
                r = false;
                break;
            }
        }
        return r;
    },

    update: function(dt) {
        this._super();

        this._update_dt += dt;

        if(fightData.isStart()) {
            for (var i in fightData.units) {
                var fightUnit = fightData.units[i];

                if(!fightUnit.isDead() && fightUnit.curhp > 0) {
                    //活着的、非重伤 单位
                    if (fightUnit.isFriendly()) {
                        //友方单位
                        var last_cd = fightUnit.getCD();
                        var now_cd = fightUnit.runCD(dt * 1000); //走cd
                        if(!fightUnit.isAutoFight() && !fightUnit.isDaze()) {
                            if (last_cd > 0 && now_cd <= 0) {
                                //完成cd
                                this.playCDShine(fightUnit.hash);
                                //cc.log(fightUnit.name + ' is ready.' , fightUnit.hash, this._curr_hero_hash);
                                if (this._curr_hero == null) {
                                    //没有选中英雄，自动选择CD完成的这个英雄
                                    //cc.log('update, cd is ok hero=', fightUnit.hash);
                                    this.activeHero(fightUnit.hash);
                                    this.startTraining(); //战斗教学
                                } else if (this._curr_hero_hash == fightUnit.hash) {
                                    //当前英雄是被选中的，更新技能列表
                                    this.listSkill(fightUnit);
                                }
                                this.stateUnit(fightUnit.hash, true);
                            } else if (now_cd <= 0) {
                                //cd 一直ok的
                                //cc.log(fightUnit.name + ' alway is ready.' , fightUnit.hash, this._curr_hero_hash);
                                if (this._curr_hero == null) {
                                    //没有选择英雄，默认选个
                                    //cc.log('update, change hero=', fightUnit.hash);
                                    this.activeHero(fightUnit.hash);
                                    this.startTraining(); //战斗教学
                                }
                            }
                        }

                    } else {
                        //敌对单位
                        fightUnit.runCD(dt * 1000); //走cd
                    }
                    //更新CD条
                    this.updateUICdBar(fightUnit);
                    //更新buff
                    fightUnit.updateBuff(dt * 1000);
                }
            }
        }

        //战斗计时
        if(fightData.time_ms>0) {
            fightData.time_ms -= dt * 1000;
        }

        //每秒执行一次
        if(this._update_dt>1) {
            this._update_dt--;

            //更新战斗计时器显示
            if(fightData.time_ms>0) {
                this._fightTimer.setString(tj.gameClock.millisecond2String(Math.round(fightData.time_ms)));
            }
        }
    },

    updateUI: function() {
        if (!this._ui)
            return false;

        // this._tt = (new Date).getTime();

        //cc.log(' --- start load ui:', (new Date).getTime() - this._tt , 'ms');

        var ui_root = this._ui;
        var that = this;

        //背景
        var bg = this._scene.getChildByName("BG");
        var bgf = "pkArena.jpg";
        if(fightData.isPvP()) {
            bgf = "pkArena.jpg"; //pvp背景
        }else {
            bgf = "pkField.jpg";
            var map_id = 0;
            if (Map_Layer instanceof cc.Node) {
                map_id = Map_Layer.getCurrentMapId();
                if (map_id > 0) {
                    bgf = tj.dbdata.getValueById("mapunlock", map_id, 'battleground');
                }
            }
        }
        bg.loadTexture(RES_PATH + "animation/res/scene/" + bgf, ccui.Widget.LOCAL_TEXTURE);


        //名字
        if(fightData.isPvP()) {
            this._pvpName.setVisible(true);
            this._pvpName.setString(this._lang['vs'].format(fightData.my_nick, fightData.enemy_nick));
        }else{
            this._pvpName.setVisible(false);
        }

        //选择点
        var selector_res = RES_PATH + "animation/attack/select.json";
        var selector_hash = 'selector_preload';
        that._animation_loading_state[selector_hash] = false;
        this.loadAnimate(selector_res, function (w) {
            if (w.node && w.action) {
                //只是预加载一下
                that._animation_loading_state[selector_hash] = true;
                that.checkReady();
            }
        });

        //cc.log(' --- select point:', (new Date).getTime() - this._tt , 'ms');

        //CD完成效果
        var cd_res = RES_PATH + "animation/other/pkCD.json";
        var cd_hash = 'cd_preload';
        that._animation_loading_state[cd_hash] = false;
        this.loadAnimate(cd_res, function (w) {
            if (w.node && w.action) {
                //只是预加载一下
                that._animation_loading_state[cd_hash] = true;
                that.checkReady();
            }
        });

        //我方
        var hero_arr = fightData.getHeroList();
        var that = this;
        for(var i in hero_arr) {
            var heroUnit = hero_arr[i];
            var hero_panel = this.createUnit(this._team_area, this._hero_tpl, heroUnit); //名称、血条、cd等
            this.createPortrait(heroUnit, hero_panel, function(node, _fightUnit) {
                //node.setColor(cc.color('#606060'));
                that.createCDShine(_fightUnit.hash);
                that.createSelector(_fightUnit.hash);
            }); //创建人物形象
            this.loadSkillAnimate(heroUnit.getAllSkill()); //加载技能动画
        }
        formation(this._team_area, 0, 'center', 0); //横向居中对齐

        //cc.log(' --- load hero:', (new Date).getTime() - this._tt , 'ms');

        //敌方
        var enemy_arr = fightData.getEnemyList();
        var portrait_area = WidgetDig(ui_root, "monster");
        for(var j in enemy_arr) {
            var enemyUnit = enemy_arr[j];
            if (enemyUnit.mon_type == MON_BOSS) {
                this.createUnit(this._enemy_area, null, enemyUnit);
            } else {
                this.createUnit(this._enemy_area, this._enemy_tpl, enemyUnit);
            }
            this.createPortrait(enemyUnit, portrait_area, function(node, _fightUnit) {
                that.createSelector(_fightUnit.hash);
            }); //创建怪物形象
            this.loadSkillAnimate(enemyUnit.getAllSkill()); //技能动画
        }
        formation(this._enemy_area, 0, 'avg', 0, false); //横向居中对齐

        this._test_log('updateUI');

        // cc.log(' --- load enemy:', (new Date).getTime() - this._tt , 'ms');

        this._updateUI_done = true;
        this.checkReady();
    },

    loadAnimate: function(res, callback) {
        var that = this;
        var o = that._animation_cache[res];
        if(o) {
            if (o.f) {
                callback(ccs.load(res, RES_PATH));
            }else{
                o.calls.push(callback);
            }
            return;
        }else{
            o = {f: 0, calls: [callback]};
            that._animation_cache[res] = o;
        }

        var loader_callback = function(res) {
            if(that._animation_cache[res]) {
                for(var i in that._animation_cache[res].calls) {
                    var cb = that._animation_cache[res].calls[i];
                    var w = ccs.load(res, RES_PATH);
                    cb(w);
                }
            }
        };

        cc.loader.load(res, (function(res) {
            if(res.indexOf('.json')>-1) {
                return function() {
                    cc.loader.loadJson(res, function (err, json) {
                        if (!err) {
                            var val = json.Content.Content.UsedResources || [];
                            for (var k in val) {
                                if (val[k].indexOf('.plist') > -1) {
                                    var p = processPath(cc.path.join(cc.path.dirname(res), val[k]));
                                    //cc.log(' >>>>>> ', p);
                                    cc.spriteFrameCache.addSpriteFrames(p);
                                }
                            }
                            o.f = 1;
                            loader_callback(res);
                        }
                    });
                };
            }else {
                return function () {
                    o.f = 1;
                    loader_callback(res);
                };
            }
        })(res));
    },

    playAnimate: function(hash, animate, loop, cb) {
        var portait = this._portrait[hash];
        if(portait) {
            portait.node.stopAllActions();
            portait.action.pause();
            if (animate != "") {
                portait.action.play(animate, loop);
            } else {
                portait.action.gotoFrameAndPlay(0, portait.action.getDuration(), 0, loop);
            }
            if(typeof cb != "function") {
                cb = function(){};
            }
            var callback = function() {
                //portait.node.stopAllActions();
                //portait.node.stopAction(portait.action);
                cb(hash);
            };
            portait.action.setLastFrameCallFunc(callback);
            portait.node.runAction(portait.action);
        }
    },

    loadSkillAnimate: function(skill_arr) {
        var that = this;
        var skill_path = RES_PATH + "animation/attack/";
        for(var s in skill_arr) {
            var skill = skill_arr[s];
            if(!skill.animation) {
                cc.log("skill animation err:", skill.id, skill.name);
                skill.animation = "attack.json";
            }
            if (this._portrait["skill_" + skill.hash] !== undefined) {
                continue;
            }
            if (this.addSkillCache(skill.hash)) {
                return;
            }
            try {
                //skill.animation = "plistShoot.json";
                //console.log('loadSkillAnimate:', skill.id, skill.animation, fightData.getUnit(fightData._getUnitHashFormSkillHash(skill.hash)).hash);
                this.loadAnimate(skill_path + skill.animation, (function(_skill) {
                    return function (w) {
                        if (w.node && w.action) {
                            var node = w.node;
                            var action = w.action;
                            var hash = 'skill_' + _skill.hash;
                            var grp = "ani";
                            var unit = fightData.getUnitBySkillHash(_skill.hash);
                            if (unit && unit.isFriendly()) {
                                grp = "skillani";
                                w.keep = true;
                            }
                            that.setRetain(node, grp);
                            that.setRetain(action, grp);
                            // node.retain();
                            // action.retain();
                            that._portrait[hash] = w;
                            //var portrait_area = WidgetDig(that._ui, "monster");
                            node.stopAllActions();
                            that.addChild(node);
                            node.visible = false;
                            //that.playSkillAnimate(fightData._getUnitHashFormSkillHash(skill.hash), skill.id);

                            //cc.log('loadSkillAnimation: ' + skill.animation + ' ' + hash + ' ' + skill.name);
                        } else {
                            cc.log('>>> loadSkillAnimation faild: ' + skill_path + skill.animation);
                        }
                    };
                })(skill));
            }catch(e){
                cc.log("loadSkillAnimation err:", skill.id, skill.name, skill.animation);
            }
        }
    },

    playSkillAnimate: function(target_hash, skill_hash, cb) {
        var zorder = 99;
        var pos = cc.p(0,0);
        switch(target_hash) {
            case 'all_enemy':
                var monster_area = WidgetDig(this._ui, "monster");
                pos = monster_area.getPosition(); //;this._enemy_area
                pos.y += (monster_area.height / 4) * 3;
                break;

            case 'all_hero':
                pos = this._team_area.getPosition();
                pos.y += 100;
                break;

            default:
                var portait = this._portrait[target_hash];
                if (portait && portait.node) {
                    var c = portait.node;
                    zorder = c.getLocalZOrder() + 1;
                    //var p = c.convertToWorldSpace(WidgetDig(c, 'attack').getPosition());
                    var sel = this._portrait[this.getSelectorHash(target_hash)];
                    if(sel && sel.node) {
                        pos = sel.node.getPosition();
                    }
                }
                break;
        }
        //cc.log('playSkillAnimate: pos=', pos, target_hash, skill_id);

        var light = this._portrait['skill_' + skill_hash];
        if (light) {
            var op = (Math.random()*100<50)?-1:1;
            var op2 = (Math.random()*100<50)?-1:1;
            var rp = cc.p(Math.round(Math.random()*30)*op, Math.round(Math.random()*30)*op2);
            light.node.setLocalZOrder(zorder);
            light.node.setPosition(cc.pAdd(pos, rp));
            light.node.visible = true;
            light.node.stopAllActions();
            light.action.pause();
            light.action.gotoFrameAndPlay(0, light.action.getDuration(), 0, false);

            //var ps = ccui.helper.seekWidgetByName(light.node, 'plist');
            var ps = WidgetDig(light.node, 'an/plist', false);
            if(ps) {
                //播放粒子
                ps.stopSystem();
                ps.resetSystem();
            }
            if (typeof cb != "function") {
                cb = function () {
                };
            }
            var callback = function () {
                light.node.stopAllActions();
                light.node.visible = false;
                var ps = WidgetDig(light.node, 'an/plist', false);
                if(ps) {
                    ps.stopSystem();
                }
                cb();
            };
            light.action.setLastFrameCallFunc(callback);
            light.node.runAction(light.action);
        }
    },

    startTraining: function() {
        //教学

        if(!fightData.isTraining()) {
            return;
        }
        if(!this._helphand) {
            this.load_helphand(this, "click");
        }else{
            this._helphand.play("click", true);
        }
        var pos = cc.p(100, 100);
        var t = fightData.getTrainingData();
        switch (parseInt(t)) {
            case 0: //教攻击
                var enemy_arr = fightData.getEnemyList();
                if(enemy_arr.length>0) {
                    var hash = enemy_arr[0].hash;
                    for(var i in enemy_arr) {
                        if(!enemy_arr[i].isDead()) {
                            hash = enemy_arr[i].hash;
                            break;
                        }
                    }
                    hash = this.getSelectorHash(hash);
                    var select_point = this._portrait[hash];
                    if(!select_point) {
                        return;
                    }
                    var flag = select_point.node;
                    if(this._helphand) {
                        pos = flag.getPosition();
                        this._helphand.setpos(pos.x, pos.y - 10);
                        var str = this._lang['step1'];
                        this._curr_popLayer = createNoteBox(this, str, form_t.manor, null);
                        this._curr_popLayer.transIn(N_TRANS_IN_ANI, N_TRANS_IN_TIEM, {
                            ease: N_TRANS_IN_EASE,
                            any: 0.6
                        });
                    }
                }
                break;

            case 1: //教选技能
                var skill2 = this._skill_area.children[1];
                if(skill2 && this._helphand) {
                    var p1 = skill2.getPosition();
                    pos = this._skill_area.convertToWorldSpace(p1);
                    pos = cc.pAdd(pos, cc.p(0, skill2.height/2));
                    this._helphand.setpos(pos.x, pos.y);
                    var str = this._lang['step2'];
                    this._curr_popLayer = createNoteBox(this, str, form_t.manor, null);
                    this._curr_popLayer.transIn(N_TRANS_IN_ANI, N_TRANS_IN_TIEM, {
                        ease: N_TRANS_IN_EASE,
                        any: 0.6
                    });
                }
                break;

            case 2: //教开启自动战斗
                var hero_arr = fightData.getAliveHeroList();
                if(hero_arr.length>0) {
                    var hash = hero_arr[0].hash;
                    var p = this._heros[hash];
                    if(p==null) {
                        return;
                    }
                    var btn = WidgetDig(p, 'btnAuto');
                    if (btn) {
                        pos = btn.getParent().convertToWorldSpace(btn.getPosition());
                        btn.setGlobalZOrder(1);
                    }
                    if (this._helphand) {
                        this._helphand.setpos(pos.x, pos.y + 20);
                        this._helphand.setRotationX(180);
                        var str = this._lang['step3'];
                        this._curr_popLayer = createNoteBox(this, str, form_t.manor, null);
                        //this._curr_popLayer.setGlobalZOrder(2);
                        this._curr_popLayer.transIn(N_TRANS_IN_ANI, N_TRANS_IN_TIEM, {
                            ease: N_TRANS_IN_EASE,
                            any: 0.6
                        });
                    }
                }
                break;

            default:
                this._helphand.stop();
                break;
        }
    },

    finishiTraining: function() {
        if(fightData.isTraining()) {
            fightData.nextTraining();
            if(this._helphand) {
                this._helphand.stop();
            }
        }
    },

    showHP: function(hash, hp, crit) {
        //var fightUnit = fightData.getUnit(hash);
        var select = this._portrait[this.getSelectorHash(hash)];
        if (select) {
            var _fontsize = 40;
            var hp_str = '';
            var color_str = '#FFFFFF';
            var stroke_color = '#EEEEEE';
            if (hp > 0) {
                hp_str = "+" + hp;
                color_str = '#1BFF00';
                stroke_color = '#004909';
            }else if (hp < 0) {
                hp_str = "-" + Math.abs(hp);
                color_str = '#FF0000';
                stroke_color = '#4A0000';
            }else if(hp==0) {
                hp_str = "0";
            }else{
                _fontsize = 26;
                hp_str = this._lang["miss"];
            }
            var sc = 0;
            if(crit) {
                sc = 1;
                color_str = '#FFA500';
            }
            var p = select.node.getPosition();
            p.x = p.x + Math.floor(Math.random() * 100 + -50);
            p.y = p.y + Math.floor(Math.random() * 30 + -30);
            var p2 = cc.pAdd(p, cc.p(Math.floor(Math.random() * 100 + -50), 150));
            var fontDef = {
                fontName : tj.cfg.get("designdata/design_fontName"),
                fontSize : _fontsize,
                fillStyle : cc.color(color_str),
                strokeEnabled : true,
                strokeStyle : cc.color(stroke_color),
                shadowEnabled: true,
                shadowOffsetX: cc.color("#000000"),
                shadowOffsetY: cc.size(2, -2),
                shadowOpacity: 1.0
            };
            this.textAnimate(hp_str, fontDef, sc, p, p2);
        }
    },

    showBuff: function(hash, buff) {
        var select = this._portrait[this.getSelectorHash(hash)];
        if (select) {
            var str = buff.name;
            var color_str = '#FF0000';
            var stroke_color = '#4A0000';
            if (buff.to == 0) {
                color_str = '#1BFF00';
                stroke_color = '#004909';
            }
            var p = select.node.getPosition();
            p.y += 120;
            //p.x = p.x + Math.floor(Math.random() * 100 + -50);
            //p.y = p.y + Math.floor(Math.random() * 30 + -30);
            //var p2 = cc.pAdd(p, cc.p(Math.floor(Math.random() * 100 + -50), 150));
            var fontDef = {
                fontName : tj.cfg.get("designdata/design_fontName"),
                fontSize : 30,
                fillStyle : cc.color(color_str),
                strokeEnabled : true,
                strokeStyle : cc.color(stroke_color),
                shadowEnabled: true,
                shadowOffsetX: cc.color("#000000"),
                shadowOffsetY: cc.size(2, -2),
                shadowOpacity: 1.0
            };
            this.textAnimate(str, fontDef, 0, p, p);
        }
    },

    showSkill: function(skill_hash, unit_hash) {
        var skill_tip = new ccui.ImageView();
        var skill = fightData.getSkill(skill_hash);
        var hero = this._heros[unit_hash] || null;
        if(skill && hero) {
            skill_tip.loadTexture(RES_ICON_SKILL_PATH+skill.icon, ccui.Widget.PLIST_TEXTURE);
            skill_tip.setAnchorPoint(0, 0);
            skill_tip.setScale(0.6, 0.6);
            var w = skill_tip.width * skill_tip.getScaleX();
            var h = skill_tip.height * skill_tip.getScaleY();
            var select = this._portrait[this.getSelectorHash(unit_hash)];

            //渐隐
            skill_tip.setPosition(cc.p(10, hero.height-60));
            var ac = cc.sequence(cc.fadeOut(1), cc.callFunc(function(){ skill_tip.removeFromParent(); }));
            hero.addChild(skill_tip);

            //上滑
            //var p = hero.getParent().convertToWorldSpace(hero.getPosition());
            //skill_tip.setPosition(cc.p(p.x+(hero.width-w)/2, p.y+(hero.height-h*3)));
            //var ac = cc.spawn(
            //    cc.moveTo(1.5, p.x+(hero.width-w)/2, p.y+hero.height+h),
            //    cc.sequence(
            //        cc.fadeOut(1.4),
            //        cc.callFunc(function(){ skill_tip.removeFromParent(); })
            //    )
            //);
            //this.addChild(skill_tip);

            skill_tip.runAction(ac);
        }
    },

    textAnimate: function(txt, fontDef, useScale, startPosition, endPosition) {
        var fDef = {
            fontName: tj.cfg.get("designdata/design_fontName"),
            fontSize: 30
        };
        if(fontDef == undefined) {
            fontDef = new cc.FontDefinition();
            fontDef = cc.extend(fontDef, fDef);
        }else if(typeof(fontDef)=="string") {
            fDef.fontName = fontDef;
            fontDef = new cc.FontDefinition();
            fontDef = cc.extend(fontDef, fDef);
        }else{
            var tmpDef = new cc.FontDefinition();
            fontDef = cc.extend(tmpDef, fontDef);
        }

        //var label = new cc.LabelTTF(txt, fontDef);
        //label.setTextDefinition(fontDef);
        var label = new cc.LabelTTF(txt, fontDef.fontName, fontDef.fontSize);
        var _t = (new Date).getTime();
        this._need_to_rm['txt_'+_t] = label;
        label.setColor(fontDef.fillStyle);
        label.enableStroke(fontDef.strokeStyle, 1);
        label.enableShadow(fontDef.shadowOffsetX, fontDef.shadowOffsetY, fontDef.shadowOpacity, null);
        label.setLocalZOrder(1000);
        var that = this;
        var cb = cc.callFunc(function(){
            that._need_to_rm['txt_'+_t] = null;
            label.removeFromParent();
        }, this);
        label.setPosition(startPosition);
        var fade = cc.fadeOut(1.5);
        var move = cc.moveTo(1.5, endPosition);
        var sp = cc.spawn(fade, move);
        if(useScale) {
            var scale = cc.scaleTo(0.05, 6);
            var scale2 = cc.scaleTo(0.2, 1.5);
            sp = cc.spawn(fade, move, cc.sequence(scale, scale2));
        }
        var seq = cc.sequence(sp, cb);
        label.runAction(seq);
        this.addChild(label);
    },

    createPortrait: function(fightUnit, container, callback) {
        //创建人物形象动画
        var that = this;
        that._animation_loading_state[fightUnit.hash] = false;

        if(fightUnit.isDead()){
            that._animation_loading_state[fightUnit.hash] = true;
            that.checkReady();
            return;
        }
        var res = fightUnit.getPortrait(); //动画路径
        this.loadAnimate(res, (function(_fightUnit) {
            return function(w) {
                if(w.node && w.action) {
                    var node = w.node;
                    var action = w.action;
                    that.setRetain(node, "ani");
                    that.setRetain(action, "ani");

                    container.addChild(node);
                    that._portrait[_fightUnit.hash] = w;
                    that.playAnimate(_fightUnit.hash, 'standby', true);

                    var attr = fightUnit.getPortraitAttr();
                    if(attr.scale) {
                        node.setScale(attr.scale);
                    }
                    if(attr.location) {
                        var x = 0;
                        var y = 0;
                        var size = container.getSize();
                        x = (attr.location.x<1) ? size.width * attr.location.x : attr.location.x;
                        y = (attr.location.y<1) ? size.height * attr.location.y : attr.location.y;
                        node.setPosition(x, y);

                        //cc.log("createPortrait: ", _fightUnit, size, x, y);
                    }
                    if(attr.zorder) {
                        node.setLocalZOrder(attr.zorder);
                    }
                    if(attr.opacity) {
                        node.setOpacity(attr.opacity);
                    }

                    that._animation_loading_state[_fightUnit.hash] = true;
                    that.checkReady();
                    //cc.log('createPortrait callback:', _fightUnit.hash , that._animation_loading_state[_fightUnit.hash]);
                    if(callback instanceof Function) {
                        callback(node, _fightUnit);
                    }
                }else{
                    //cc.log('createPortrait faild: '+res);
                }
            };
        })(fightUnit));
    },

    createUnit : function(coninter, tpl, fightUnit) {
        var that = this;
        var ctl = null;
        if (tpl) {
            ctl = tpl.clone();
            coninter.addChild(ctl);
        } else {
            ctl = WidgetDig(this._ui, "boss/hero1");
            ctl.setVisible(true);
        }
        // ctl.retain();
        this.setRetain(ctl, "units");

        var hash = fightUnit.hash;
        ctl.setUserData(hash);
        this._units[hash] = ctl;

        if(fightUnit.isFriendly()) {
            //英雄
            this._heros[hash] = ctl;
            WidgetDig(ctl, 'btnHero').setUserData("hero:"+hash);
            WidgetDig(ctl, 'btnHero/select').visible = false;
            WidgetDig(ctl, 'btnHero/grayed').visible = false;
            var btn_auto = WidgetDig(ctl, 'btnAuto');
            btn_auto.setUserData(hash);
            btn_auto.setGlobalZOrder(1);
            this.showAutoFightTip(hash, fightUnit.isAutoFight());
        }else{
            //怪物
            this._enemies[hash] = ctl;
            WidgetDig(ctl, 'btnHero').setUserData("monster:"+hash);
        }

        //buff
        WidgetDig(ctl, 'buff').removeAllChildren();
        var buffs = fightUnit.getAllBuff();
        if(buffs) {
            for(var bi in buffs) {
                var buff_data = buffs[bi];
                if(buff_data) {
                    this.createBuff(buff_data);
                }
            }
        }

        //cc.log("createUnit tag: ", ctl.tag, hash);
        if (tpl) {
            var size = WidgetDig(tpl, 'btnHero').getContentSize();
            WidgetDig(ctl, 'btnHero').setContentSize(size);
        }

        //ctl.setEnabled(false);
        this.updateUnit(fightUnit);
        this.updateUICdBar(fightUnit);
        return ctl;
    },



    /**
     *  返回node动画节点的最大宽度和高度.
     */
    //<<
    getNodeSize : function(node) {
        var Hmax = 0, Hmin = 0, Wmax = 0, Wmin = 0;
        var childs = node.getChildren();
        for (var i in childs){
            var hmax = childs[i].y + childs[i].height / 2;
            var hmin = childs[i].y - childs[i].height / 2;
            Hmax = hmax > Hmax ? hmax : Hmax;
            Hmin = hmin < Hmin ? hmin : Hmin;
            var wmax = childs[i].x + childs[i].width / 2;
            var wmin = childs[i].x - childs[i].width / 2;
            Wmax = wmax > Wmax ? wmax : Wmax;
            Wmin = wmin < Wmin ? wmin : Wmin;
        }
        return {
            width : Wmax - Wmin,
            height: Hmax - Hmin
        };
    },

    updateUnit: function(fightUnit) {
        //更新战斗单位：血量、阵亡?
        var ctl = this._units[fightUnit.hash];
        //cc.log("------ updateUnit:", fightUnit);
        if(ctl && (fightUnit instanceof FightUnit)) {
            var ctl_hero = WidgetDig(ctl, 'btnHero');
            if(!ctl_hero) {
                return;
            }
            WidgetDig(ctl_hero, "textName").setString(fightUnit.name);
            var hp = fightUnit.getHP();
            var hp_percent = Math.ceil(fightUnit.getHPPercent());
            var hp_bar = WidgetDig(ctl_hero, "barHp");
            hp_bar.setPercent(hp_percent);

            if(fightUnit.isFriendly()) {
                var st = WidgetDig(ctl_hero, "status");
                if (fightUnit.isDead()) {
                    this.deadUnit(fightUnit);
                    if(st) {
                        st.stopAllActions();
                        st.visible = false;
                    }
                }else{
                    WidgetDig(ctl_hero, "textHp").setString(hp);
                    //ctl_hero.setColor(cc.color("#FFFFFF"));
                    if (hp == 0) {
                        WidgetDig(ctl_hero, 'textHp').setString(this._lang["injured"]);
                        if (this._curr_hero_hash == fightUnit.hash) {
                            //当前英雄重伤时取消选中状态
                            this.clearHero();
                        }
                    }
                    if (st) {
                        if(hp_percent < 20) {
                            //低于20%血量，开始红闪
                            var ac = cc.repeatForever(cc.sequence(cc.fadeTo(0.5, 30), cc.fadeTo(0.5, 225)));
                            // ac.retain();
                            st.runAction(ac);
                            st.visible = true;
                        }else {
                            st.stopAllActions();
                            st.visible = false;
                        }
                    }
                }
                this.stateUnit(fightUnit.hash);
            }else{
                if(!fightUnit.isDead()) {
                    WidgetDig(ctl_hero, "textHp").setString(hp);
                }else{
                    this.deadUnit(fightUnit);
                }
            }
        }
    },

    deadUnit: function(fightUnit) {
        if(fightUnit) {
            var unit = this._units[fightUnit.hash];
            if (unit === undefined) {
                return;
            }
            unit.setEnabled(false);

            if(fightUnit.isDead()) {
                //战斗单位阵亡
                this.updateSelector(); //清理选择器
                this.updateUICdBar(fightUnit);
                if(!fightUnit.isFriendly()) {
                    //敌方阵亡
                    unit.setVisible(false);
                }else{
                    //我方阵亡
                    //WidgetDig(unit, 'btnHero/grayed').visible = true;
                    WidgetDig(unit, 'btnHero/textHp').setString(this._lang['dead']);
                    this.showAutoFightTip(fightUnit.hash, false);

                    if(this._curr_hero_hash==fightUnit.hash) {
                        //当前英雄阵亡，清除选中状态
                        this.clearHero();
                    }
                }

                //buff清理
                var buffs = fightUnit.getAllBuff();
                if(buffs) {
                    for(var k in buffs) {
                        this.clearBuff(buffs[k]);
                    }
                }
            }
        }
    },

    /**
     * 启用/禁用 英雄单位
     * @param {string / array} hashes
     * @param {bool} state
     */
    stateUnit: function(hashes, state) {
        var fightUnits = [];
        if(cc.isString(hashes)) {
            fightUnits.push(fightData.getUnit(hashes));
        }else if(cc.isArray(hashes)) {
            for(var k in hashes) {
                fightUnits.push(fightData.getUnit(hashes[k]));
            }
        }else{
            return;
        }
        var color = '#FFFFFF';
        var st = state;
        for(var i in fightUnits) {
            var fightUnit = fightUnits[i];
            if(!(fightUnit instanceof FightUnit)) {
                continue;
            }
            if(!fightUnit.isFriendly()) {
                continue;
            }
            if(st==undefined) {
                //cc.log(fightUnit.name, 'st: dead=', fightUnit.isDead(), ' CDing=', fightUnit.isCDing(), ' Daze=', fightUnit.isDaze() , ' Auto=', fightUnit.isAutoFight(), ' InJured=', fightUnit.isInjured());
                st = fightUnit.isReady();
            }
            var unit_animate = this._portrait[fightUnit.hash];
            if(!unit_animate) {
                continue;
            }
            var unit = this._units[fightUnit.hash];
            if(!(unit instanceof cc.Node)) {
                continue;
            }
            //if(st) {
            //    color = '#FFFFFF';
            //}else{
            //    color = '#606060'; //灰色遮罩
            //}
            //unit_animate.node.setColor(cc.color(color));
            if(!st) {
                this.clearCDShine(fightUnit.hash);
            }
            WidgetDig(unit, 'btnHero').setEnabled(st);
        }
    },

    createBuff: function(buffData) {
        //生成buff
        //cc.log("fightLayer create buff:", buffData);
        var unit = this._units[buffData.unit_hash];
        if(buffData && unit){
            var fightUnit = fightData.getUnit(buffData.unit_hash);
            if(!(fightUnit instanceof FightUnit)) {
                return;
            }
            var _buff = null;
            if(fightUnit.getMonsterType()==MON_BOSS) {
                _buff = this._boss_buff_tpl.clone();
            }else{
                _buff = this._buff_tpl.clone();
            }
            var space = Math.ceil(_buff.width * _buff.getScaleX() / 5);

            // _buff.retain();
            this.setRetain(_buff, "ani");
            var size = this._buff_tpl.getContentSize();
            _buff.setContentSize(size);
            try {
                _buff.loadTexture(RES_ICON_SKILL_PATH+buffData.icon, ccui.Widget.PLIST_TEXTURE);
            } catch(e) {
                cc.log('createBuff:', e);
            }
            _buff.setUserData(fightUnit.name + ' ' + buffData.name);
            if(!fightUnit.isFriendly() && buffData.type==2) {
                //怪物获得嘲讽buff
                this._taunts[fightUnit.hash] = unit;
                this.activeSkill(this._curr_skill_hash);
            }
            var buff_hash = buffData.hash;
            var buff_item = this._buffs[buff_hash];
            if(buff_item!=undefined) {
                buff_item.stopAllActions();
                buff_item.removeFromParent();
            }
            this._buffs[buff_hash] = _buff;
            var buff_area = WidgetDig(unit, 'buff');
            buff_area.addChild(_buff);
            formation(buff_area, space, 'left');
            //}else{
            //    buff_item.stopAllActions();
            //    buff_item.runAction(cc.fadeTo(0.5, 225));
            //}
        }
    },

    clearBuff: function(buffData) {
        if(buffData) {
            var buff_item = this._buffs[buffData.hash];
            if(buff_item) {
                if(buffData.type==2) {
                    //移除失去嘲讽buff的单位
                    delete this._taunts[buffData.unit_hash];
                    this.activeSkill(this._curr_skill_hash);
                }
                var buff_area = buff_item.getParent();
                buff_item.removeFromParent();
                delete this._buffs[buffData.hash];
                if (buff_area){
                    var space = Math.ceil(buff_item.width * buff_item.getScaleX() / 5);
                    formation(buff_area, space, 'left');
                }
            }
            //cc.log("clearBuff: ", buffData.hash, this._buffs);
        }
    },

    blinkBuff: function(buffData) {
        if (buffData) {
            var that = this;
            var buff_item = this._buffs[buffData.hash];
            if(buff_item) {
                //var ac = new cc.Blink(BUFF_BLINK_TIME, BUFF_BLINK_TIME * 2);
                var ac = cc.sequence(cc.repeat(cc.sequence(cc.fadeTo(0.5, 30), cc.fadeTo(0.5, 225)), BUFF_BLINK_TIME), cc.fadeTo(0.5, 0), cc.callFunc(function(){
                    if(buff_item) {
                        //cc.log("blinkBuff: remove buff item", buffData.hash);
                        var p = buff_item.getParent();
                        buff_item.removeFromParent();
                        var space = Math.ceil(buff_item.width * buff_item.getScaleX() / 5);
                        formation(p, space, 'left');
                    }
                }));
                // this.setRetain(ac, "ani");
                //ac.retain();
                buff_item.runAction(ac);
                //cc.log("blinkBuff: ", buffData.hash);
            }
        }
    },

    initCDShine: function() {
        this._adjustScale(0);
        for(var i in this._heros) {
            var unit = this._heros[i];
            var cd_bar = WidgetDig(unit, 'btnHero/barCd');
            var cd_hash = i+'_cd';
            if(this._portrait[cd_hash] == undefined) {
                continue;
            }
            var cd_node = this._portrait[cd_hash].node;
            var upos = cd_bar.getParent().convertToWorldSpace(cd_bar.getPosition());
            cd_node.setPosition(upos);
        }
        this._adjustScale(1);
    },

    createCDShine: function(unit_hash) {
        var cd_res = RES_PATH + "animation/other/pkCD.json";
        var cd_hash = unit_hash+'_cd';
        var that = this;
        that._animation_loading_state[cd_hash] = false;
        this.loadAnimate(cd_res, function (w) {
            if (w.node && w.action) {
                that._portrait[cd_hash] = w;
                w.node.stopAllActions();
                w.node.setVisible(false);
                that.addChild(w.node);
                that._animation_loading_state[cd_hash] = true;
                that.checkReady();

                that.setRetain(w.node, 'ani');
                that.setRetain(w.action, 'ani');
            }
        });
    },

    playCDShine: function(unit_hash) {
        //cd
        var unit = this._heros[unit_hash];
        var cd_hash = unit_hash+'_cd';
        if(this._portrait[cd_hash] == undefined) {
            return;
        }
        var cd_node = this._portrait[cd_hash].node;
        //var cd_ac = this._portrait['cd_preload'].action;
        cd_node.setVisible(true);
        this.playAnimate(cd_hash, '', false, function(){
            cc.log('---- cd animate.');
        });
    },

    clearCDShine: function(unit_hash) {
        var cd_hash = unit_hash+'_cd';
        if(this._portrait[cd_hash] == undefined) {
            return;
        }
        var cd_node = this._portrait[cd_hash].node;
        cd_node.stopAllActions();
        cd_node.setVisible(false);
    },

    activeHero: function(unit_hash) {
        //选中英雄
        //cc.log('activeHero: ', unit_hash, ' curr:', this._curr_hero_hash);
        var fightUnit = fightData.getUnit(unit_hash);
        var unit_item = this._heros[unit_hash];
        var actived = null;
        if(fightUnit.isFriendly() && unit_item) {
            this._curr_hero = unit_item;
            this._curr_hero_hash = unit_hash;
            for(var i in this._heros) {
                if(i==unit_hash) {
                    actived = unit_hash;
                    if(!fightUnit.isAutoFight()) {
                        WidgetDig(this._heros[i], 'btnHero/select').visible = true;
                        this.listSkill(fightUnit);
                    }else{
                        WidgetDig(this._heros[i], 'btnHero/select').visible = false;
                    }
                }else{
                    WidgetDig(this._heros[i], 'btnHero/select').visible = false;
                }
            }
        }
        return actived;
    },

    clearHero: function() {
        //清除英雄选中状态
        if(this._curr_hero) {
            this._curr_hero.setHighlighted(false);
            WidgetDig(this._curr_hero, 'btnHero/select').visible = false;
            this.stateUnit(this._curr_hero_hash, false);
        }
        this._curr_hero = null;
        this._curr_hero_hash = null;
        this._curr_skill = null;
        this._curr_skill_hash = null;
        this._skill_area.removeAllChildren();

        this.updateSelector();
    },

    listSkill: function(fightUnit) {
        //列出英雄的技能
        if(fightUnit.isAutoFight()) {
            return;
        }
        var skills = fightUnit.getAllSkill();
        var active_skill = fightUnit.active_skill;
        this._skill_area.removeAllChildren();
        var enable = fightUnit.canCast();
        for(var i in skills) {
            var skill_data = skills[i];
            var skill_btn = this._skill_tpl.clone();
            var size = this._skill_tpl.getContentSize();
            skill_btn.setContentSize(size);
            skill_btn.setUserData("skill:"+i);
            var val = this.getSkillVal(skill_data.hash);
            var txt_ctl = WidgetDig(skill_btn, 'text');
            var skill_name = WidgetDig(skill_btn, 'textName');
            var border = WidgetDig(skill_btn, 'prompt');
            if(border) {
                border.setVisible(false);
                switch(skill_data.target) {
                    case 0: //自身
                    case 1: //敌方全体
                    case 3: //我方全体
                        border.setVisible(true);
                        break;
                }
            }
            if(skill_name) {
                skill_name.setString(skill_data.name);
            }
            if(txt_ctl) {
                txt_ctl.setString(val);
                if (skill_data.type == 3) {
                    txt_ctl.setColor(cc.color("#1BFF00"));
                } else {
                    txt_ctl.setColor(cc.color("#FF0000"));
                }
            }
            this._skill_area.addChild(skill_btn);
            try {
                WidgetDig(skill_btn, "icon").loadTexture(RES_ICON_SKILL_PATH+skill_data.icon, ccui.Widget.PLIST_TEXTURE);
            } catch(e) {
                cc.log('listSkill error.');
            }

            if(enable) {
                skill_btn.setColor(cc.color('#FFFFFF'));
            }else{
                skill_btn.setColor(cc.color('#888888'));
            }
        }
        this.activeSkill(active_skill);
        formation(this._skill_area, 20);
    },

    _getLangText: function(tpl, lang, vars) {
        var str = tpl.replace(/\{(\w+)\}/g, function(match, w) {
            return (lang[w]!=undefined)?lang[w]:'';
        }).replace(/\[(\w+)\]/g, function(match, w){
            return (vars[w]!=undefined)?vars[w]:'';
        });
        return str;
    },

    _getBuffChanceExplain: function (buffChance) {
        var buffChanceList = tj.cfg.get("designdata/buffChance");
        for(var i in buffChanceList){
            var chanceJustice = buffChanceList[i];
            if(buffChance <= chanceJustice){
                return tj.cfg.get("designdata/levelExplain")[i];
            }
        }
        return tj.cfg.get("designdata/levelExplain")[3];
    },

    getSkillIntro: function(skill_hash) {
        //技能简介
        var skill = fightData.getSkill(skill_hash);
        // cc.log("getSkillIntro:", skill_hash, skill);
        if(!(skill instanceof Skill)) {
            return '';
        }
        var fightUnit = fightData.getUnitBySkillHash(skill_hash);
        if(!(fightUnit instanceof FightUnit)) {
            return '';
        }
        var heroInfo = tj.mainData.getOwnHeroById(fightUnit.id);
        if(!heroInfo) {
            return '';
        }

        var buff = null;
        if(skill.buffId) {
            buff = new Buff(skill.buffId, '', skill.buffTime);
            //cc.log(buff);
        }

        var _lang = tj.cfg.get("text/skillExplain"); //技能文本
        var targetType = _lang["skillTarget"];
        var dc = "#xFFFFFF#"; //默认文本色
        var red = "#xFF0000#";
        var green = "#x00FF00#";
        var str = "";
        str += dc + "#y26#" + skill.name + " #y22#";

        var strdamage = 1;//Math.ceil(Math.random() * 100); //tmp

        switch(skill.type) {
            case 0: //加buff
                if(buff instanceof Buff) {
                    str += this._getLangText(_lang['cast_buff'], _lang, {
                        target: targetType[skill.target],
                        buffname: buff.name,
                        bufftime: green + Math.floor(buff.time/1000) + dc
                    });
                }
                break;

            case 1: //物理攻击
            case 2: //魔法攻击

                var t_intro = '';
                var buffstr = '';
                var tauntstr = '';
                if(skill.type==1) {
                    t_intro = _lang['physical_attack'];
                    strdamage = Math.max(1, Math.round((heroInfo.SelfAttr.Str + heroInfo.EquipAttr.Str) * skill.dmgMod / 100 + heroInfo.EquipAttr.Power));
                }else{
                    t_intro = _lang['magic_attack'];
                    strdamage = Math.max(1, Math.round((heroInfo.SelfAttr.Mag + heroInfo.EquipAttr.Mag) * skill.dmgMod / 100 + heroInfo.EquipAttr.Power));
                }
                if(skill.ignore == 1) {
                    tauntstr = _lang["nochaos"];
                }
                if(buff instanceof Buff) {
                    buffstr = dc + this._getLangText(_lang['chance_buff'], _lang, {
                        buffchance: this._getBuffChanceExplain(skill.buffChance),
                        buffname: buff.name,
                        bufftime: green + Math.floor(buff.time/1000) + dc
                    });
                }
                str += this._getLangText(t_intro, _lang, {
                    target: targetType[skill.target],
                    hurt: red + strdamage.toString() + dc,
                    //taunt: tauntstr,
                    buffintro: buffstr
                });
                break;

            case 3: //治疗
                strdamage = (heroInfo.SelfAttr.Mag + heroInfo.EquipAttr.Mag) * skill.dmgMod/100 + heroInfo.EquipAttr.Power;
                var hv = 0;
                if(heroInfo.EquipAttr.HealVal>0) {
                    hv = Math.max(1, Math.round(heroInfo.EquipAttr.HealVal / 100 * strdamage));
                }
                strdamage = Math.max(1, Math.round(strdamage)) + hv;
                if(buff instanceof Buff) {
                    buffstr = dc + this._getLangText(_lang['must_buff'], _lang, {
                        buffname: buff.name,
                        bufftime: green + Math.floor(buff.time/1000) + dc
                    });
                }
                str += this._getLangText(_lang['cast_heal'], _lang, {
                    target: targetType[skill.target],
                    heal: green + strdamage.toString() + dc,
                    buffintro: buffstr
                });
                break;

            case 4: //被动技能
                break;
        }
        if(buff) {
            delete buff;
        }
        // cc.log('getSkillIntro: val=', strdamage);

        return str;
    },

    _makeSkillRichText: function(ctl, text) {
        //生成技能简介使用的富文本控件
        var myRichText = ccui.RichText.extend({
            ctor: function() {
                // cc.log('myRichText ctor.');
                this._super();
            },
            _elements: [],
            setContent: function(txt) {
                this.clearContent();
                if(txt=='') {
                    return;
                }
                if(arguments[1]) {
                    fontSize = arguments[1];
                }else{
                    fontSize = 24;
                }
                if(arguments[2]) {
                    fontColor = arguments[2];
                }else{
                    fontColor = "#FFFFFF";
                }
                var strList = tj.mainData.convertStrToList2(txt, fontSize, fontColor);
                for(var i in strList) {
                    var tempDic = strList[i];
                    for(var key in tempDic){
                        var color = key;
                        var txt = tempDic[key][1];
                        var fontSize = tempDic[key][0];
                        var re = new ccui.RichElementText(parseInt(i)+1, cc.color(color), 255, txt, tj.cfg.get("designdata/design_fontName"), fontSize);
                        this.pushBackElement(re);
                        this._elements.push(re);
                    }
                }
                this.formatText();
            },

            clearContent: function() {
                for(var i in this._elements) {
                    this.removeElement(this._elements[i]);
                }
                this._elements = [];
                this.formatText();
            }
        });

        var ot = ctl;
        var fontSize = ot.getFontSize();
        var fontColor = cc.colorToHex(ot.getColor());
        var richText = new myRichText();
        richText.setContent(text, fontSize, fontColor);
        //richText.ignoreContentAdaptWithSize(false);
        richText.width = ot.getContentSize().width;
        richText.formatText();
        var size2 = richText.getContentSize();
        ot.getParent().addChild(richText);
        richText.setAnchorPoint(ot.getAnchorPoint());
        var pos = ot.getPosition();
        //if(cc.sys.isNative) {
        //    pos.y += size2.height;
        //}
        richText.setPosition(pos.x, pos.y+20);
        return richText;
    },

    getSkillVal: function(skill_hash) {
        var skill = fightData.getSkill(skill_hash);
        // cc.log("getSkillIntro:", skill_hash, skill);
        if(!(skill instanceof Skill)) {
            return '';
        }
        var fightUnit = fightData.getUnitBySkillHash(skill_hash);
        if(!(fightUnit instanceof FightUnit)) {
            return '';
        }
        var heroInfo = tj.mainData.getOwnHeroById(fightUnit.id);
        if(!heroInfo) {
            return '';
        }

        var strdamage = 1;//Math.ceil(Math.random() * 100); //tmp

        switch(skill.type) {
            case 0: //加buff
                strdamage = '';
                break;

            case 1: //物理攻击
            case 2: //魔法攻击
                if(skill.type==1) {
                    strdamage = Math.max(1, Math.round((heroInfo.SelfAttr.Str + heroInfo.EquipAttr.Str) * skill.dmgMod / 100 + heroInfo.EquipAttr.Power));
                }else{
                    strdamage = Math.max(1, Math.round((heroInfo.SelfAttr.Mag + heroInfo.EquipAttr.Mag) * skill.dmgMod / 100 + heroInfo.EquipAttr.Power));
                }
                break;
            case 3: //治疗
                strdamage = (heroInfo.SelfAttr.Mag + heroInfo.EquipAttr.Mag) * skill.dmgMod/100 + heroInfo.EquipAttr.Power;
                var hv = 0;
                if(heroInfo.EquipAttr.HealVal>0) {
                    hv = Math.max(1, Math.round(heroInfo.EquipAttr.HealVal / 100 * strdamage));
                }
                strdamage = Math.max(1, Math.round(strdamage)) + hv;
                break;
        }

        return strdamage;
    },

    activeSkill: function(skill_hash) {
        //选中技能
        if(skill_hash==null) {
            return;
        }
        var fightUnit = fightData.getUnitBySkillHash(skill_hash);
        if(!(fightUnit instanceof FightUnit)) {
            return;
        }
        if(fightUnit.isDead() || fightUnit.isDaze()) {
            return;
        }
        var skill = fightData.activeSkill(skill_hash);
        if(!(skill instanceof Skill)) {
            return;
        }
        var skill_btns = this._skill_area.getChildren();
        for(var i in skill_btns) {
            var skill_btn = skill_btns[i];
            var ud = skill_btn.getUserData();
            var ud_k = '';
            if(ud) {
                ud = ud.split(":") || ['', ''];
                ud_k = ud[1];
            }else{
                continue;
            }
            WidgetDig(skill_btn, 'select').visible = false;
            if(ud_k!=skill_hash) {
                continue;
            }
            WidgetDig(skill_btn, 'select').visible = true;
            this._curr_skill = skill_btn;
            this._curr_skill_hash = skill_hash;
            this.updateSelector();
        }
    },

    castSkill: function(target_hash) {
        //放技能
        var heroUnit = fightData.getUnit(this._curr_hero_hash);
        if (heroUnit instanceof FightUnit) {
            heroUnit.castSkill(this._curr_skill_hash, target_hash);
            if (fightData.operation_method == 0) {
                this.clearHero();
            } else {
                this.listSkill(heroUnit);
            }
        }
        this.updateSelector();
    },

    _isAliveUnit: function(hash) {
        var fightUnit = fightData.getUnit(hash);
        return (fightUnit instanceof FightUnit) && !fightUnit.isDead();
    },

    /**
     * 获取技能目标
     *
     */
    _getSkillTargetHash: function() {
        var skill = fightData.getSkill(this._curr_skill_hash); //技能信息
        if(!(skill instanceof Skill)) {
            return [];
        }
        var unit_hash_arr = [];
        switch(skill.type) {
            case 0 : //加buff
                switch(skill.target) {
                    case 0: //自己
                        unit_hash_arr.push(skill.unit_hash);
                        break;

                    case 1: //敌方全体
                    case 2: //敌方单体
                        for(var h in this._enemies) {
                            if(this._isAliveUnit(h)) {
                                unit_hash_arr.push(h);
                            }
                        }
                        break;

                    case 3: //我方全体
                    case 4: //我方单体
                        for(var h in this._heros) {
                            if(this._isAliveUnit(h)) {
                                unit_hash_arr.push(h);
                            }
                        }
                        break;
                    default:
                        break;
                }
                break;

            case 3 : //治疗
                switch(skill.target) {
                    case 0: //自己
                        unit_hash_arr.push(skill.unit_hash);
                        break;
                    case 3: //我方全体
                    case 4: //我方单体
                        for(var h in this._heros) {
                            if(this._isAliveUnit(h)) {
                                unit_hash_arr.push(h);
                            }
                        }
                        break;
                    default:
                        break;
                }
                break;

            case 1: //物理攻击
            case 2: //魔法攻击
                //根据当前英雄选中的技能判断显示可攻击的目标，是否嘲讽，是否无视嘲讽，是否全体攻击
                if(!isEmptyObject(this._taunts) && skill.target != 1 && skill.ignore != 1) {
                    for (var h in this._taunts) {
                        if(this._isAliveUnit(h)) {
                            unit_hash_arr.push(h);
                        }
                    }
                }else{
                    for(var h in this._enemies) {
                        if(this._isAliveUnit(h)) {
                            unit_hash_arr.push(h);
                        }
                    }
                }
                break;

            default:
                break;
        }
        return unit_hash_arr;
    },

    /**
     * 创建选择器
     */
    //<<
    createSelector : function(hash) {
        var res = RES_PATH + "animation/attack/select.json";
        var that = this;
        var selector_hash = that.getSelectorHash(hash);
        that._animation_loading_state[selector_hash] = false;
        this.loadAnimate(res, (function(_hash) {
            return function (w) {
                if (w.node && w.action) {
                    //在unit动画上添加选择动画
                    var node = w.node;
                    var action = w.action;
                    if (that._portrait[_hash] === undefined) {
                        return;
                    }
                    var mon_ani = that._portrait[_hash].node;
                    var attack = mon_ani.getChildByName("attack");
                    if (!attack) {
                        return;
                    }
                    that.setRetain(node, "ani");
                    that.setRetain(action, "ani");
                    var unit = fightData.getUnit(_hash);
                    if(!(unit instanceof FightUnit)) {
                        return;
                    }
                    var location = mon_ani.convertToWorldSpace(attack.getPosition());
                    that.addChild(node);
                    that._selectors[selector_hash] = node;
                    that._animation_loading_state[selector_hash] = true;
                    that.checkReady();
                    if (unit.isFriendly()) {
                        //如果是己方单位，y位置设成统一固定高度
                        location.y = 130;
                    }
                    node.setGlobalZOrder(0);
                    node.setVisible(false);
                    node.setPosition(location.x, location.y);
                    that._portrait[selector_hash] = w;
                    that.playAnimate(selector_hash, '', true);
                    that._listenSelectorAniButton_1(node, _hash);
                    //cc.log('createSelector callback:', _hash, location.x, location.y);
                } else {
                    //cc.log('createSelector faild: '+res);
                }
            }
        })(hash));
    },

    _listenSelectorAniButton_1 : function(node, hash){
        // 监听选择动画上的触摸事件
        var btn = WidgetDig(node, "btn");
        btn.addTouchEventListener(this.prv_defaultTouchButton, this);
        btn.setUserData({hash:hash})
    },

    /**
     * 传入unit hash 获取选择动画的hash
     * @param  {[string]} hash [description]
     * @return {[string]}      [description]
     */
    //<<
    getSelectorHash : function(hash) {
        return hash + this._selector_flag;
    },

    /**
     * 更新选择器的显示
     */
    updateSelector : function() {
        //隐藏所有选择器
        for(var sh in this._selectors) {
            if(this._selectors[sh] instanceof cc.Node) {
                this._selectors[sh].setVisible(false);
            }
        }
        var unit_hash_arr = this._getSkillTargetHash();
        if(unit_hash_arr.length<1) {
            return;
        }

        for (var i in unit_hash_arr) {
            var hash = unit_hash_arr[i];
            if(!this._isAliveUnit(hash)) {
                continue;
            }
            var selector_hash = this.getSelectorHash(hash);
            var w = this._portrait[selector_hash];
            if(!w) {
                this.createSelector(hash); //不存在就创建一个选择器
                w = this._portrait[selector_hash];
            }
            if(w) {
                w.node.setVisible(true);
            }
        }
    },

    //初始化选择器位置
    initSelector: function() {
        this._adjustScale(0);
        for(var i in this._units) {
            var ani = this._portrait[i];
            if(!ani) {
                continue;
            }
            ani = ani.node;
            var attack = ani.getChildByName('attack');
            if (!attack) {
                continue;
            }
            var ts = this._portrait[this.getSelectorHash(i)];
            if(ts) {
                var attack_pos = ani.convertToWorldSpace(attack.getPosition());
                ts.node.setPosition(attack_pos);
                //cc.log('pos: ', i, attack_pos, ts.node.getPosition());
            }else{
                cc.log('not found selector: ', i);
            }
        }
        this._adjustScale(1);
    },

    updateUICdBar: function(fightUnit) {
        var ui_root = this._ui;

        //cd进度条
        var unit_item = this._units[fightUnit.hash];
        if(fightUnit instanceof FightUnit && unit_item) {
            var p = parseInt(fightUnit.getCDPercent()) || 0;
            WidgetDig(unit_item, 'btnHero/barCd').setPercent(p);
        }
    },

    showAutoFightTip: function(hash, show) {
        var ctl = this._units[hash];
        var fightUnit = fightData.getUnit(hash);


        //WidgetDig(ctl, 'btnAuto').setVisible(false);
        var ta = WidgetDig(ctl, 'btnAuto/select');
        var name = WidgetDig(ctl, 'btnHero/textName');
        var auto_btn = WidgetDig(ctl, 'btnAuto');
        auto_btn.setVisible(false);
        if(!ctl || !ta || !name || fightData.isPvP()) {
            return;
        }
        auto_btn.setVisible(true);
        if(!(fightUnit instanceof FightUnit) || !show) {
            ta.stopAllActions();
            ta.setVisible(false);
            ta.setOpacity(255);
            name.stopAllActions();
            name.setColor(cc.color('#FFFFFF'));
            name.setOpacity(255);
            return;
        }
        if(show) {
            //ta.setString(this._lang['auto']);
            //ta.enableShadow(cc.color('#000000'), cc.size(2, -2), 2);
            //ta.enableOutline(cc.color('#102010'), 2);
            ta.setVisible(true);
            var ac = cc.repeatForever(cc.sequence(cc.fadeTo(0.5, 30), cc.fadeTo(0.5, 225)));
            ta.runAction(ac);

            name.setColor(cc.color('#00E3FF'));
            name.runAction(ac.clone());
        }
    },

    _test_log: function(seg) {
        return;
        cc.log('--------------', seg , '--------------');
        cc.log('_enterfinish:', this._enterfinish);
        cc.log('_is_start:', this._is_start);
        cc.log('_units:', this._units);
        cc.log('_heros:', this._heros);
        cc.log('_enemies:', this._enemies);
        cc.log('_portrait:', this._portrait);
        cc.log('_buffs:', this._buffs);
        cc.log('_taunts:', this._taunts);
        cc.log('_animation_loading_state:', this._animation_loading_state);
        cc.log('_animation_cache:', this._animation_cache);
        cc.log('_need_to_rm:', this._need_to_rm);
        cc.log('_selectors:', this._selectors);
        cc.log('-------------- end ', seg , '--------------');
    },

    onEnterTransitionDidFinish : function() {
        //cc.log(' ==== onEnterTransitionDidFinish');
        this._super();
        this._enterfinish = true;
        this.checkReady();

        cc.log(' --- used time:', (new Date).getTime() - this._tt , 'ms');
    },

    onEnter : function() {
        //cc.log(' ==== onEnter.');
        this._tt = (new Date).getTime();
        cc.log(' onenter time:', this._tt);
        this._test_log('onEnter');
        this._super();
        this._fightTimer.setVisible(false);
        this.scheduleOnce(this.updateUI, 0.5);
        //this.updateUI();

        //监听UI消息
        this.registerMsg();
        tj.audio.playMusic(this._bgMusic, true, true);

        //功能测试按钮
        if(this._btn_test) {
            this._btn_test.setVisible(fightData.is_test);
        }
        fightData.setEneterPK(true);
        fightData.registerMsgMapback();
    },

    onExitTransitionDidStart : function() {
        this._super();
        fightData.setEneterPK(false);
    },

    onExit: function() {
        this._test_log('onExit');
        this._super();

        //教学
        if (this._helphand) {
            this._helphand.release();
            this._helphand = null;
        }

        //离开时清除所有动画
        for (var i in this._portrait) {
            var obj = this._portrait[i];
            if (!obj) {
                cc.log("portrait null -----", i);
            }
            if (obj && obj.keep) {
                obj.node.setVisible(false);
                continue;
            }
            if (obj) {
                obj.node.removeFromParent(true);
            }
        }
        //把boss_tmpl重新加回到boss_area里
        this._boss_tmpl.removeFromParent(false);
        this._boss_tmpl.setVisible(false);
        var boss = WidgetDig(this._ui, "boss");
        if (boss) {
            boss.addChild(this._boss_tmpl);
        }
        //把skill_area,enemy_area,team_area的子节点都摘除掉
        this._skill_area.removeAllChildren(true);
        this._enemy_area.removeAllChildren(true);
        this._team_area.removeAllChildren(true);

        //把需要remove的节点统统rm
        for (var i in this._need_to_rm) {
            if(this._need_to_rm[i]) {
                this._need_to_rm[i].removeFromParent();
                this._need_to_rm[i] = null;
            }
        }
        this._need_to_rm = {};
        this.clear();
    },

    defaultTouchButton : function(btn, type){
        var that = this;
        var ud = btn.getUserData() || '';
        var btn_type, btn_hash;
        if (typeof ud == "string") {
            btn_type = ud.split(":")[0] || '';
            btn_hash = ud.split(":")[1] || '';
        }
        //战斗没开始前，其它按钮不可用
        if(!fightData.is_start) {
            //cc.log('fight not start.');
            return false;
        }

        switch(type) {
            case ccui.Widget.TOUCH_BEGAN: //按下
                break;

            case ccui.Widget.TOUCH_ENDED: //放开
                //cc.log('btn_up: ', btn_type, btn_hash);
                if(btn_hash) {
                    switch(btn_type) {
                        case "hero":
                            var fightUnit = fightData.getUnit(btn_hash);
                            if(!(fightUnit instanceof FightUnit) || fightUnit.isDead() || fightUnit.isAutoFight() || fightUnit.isInjured()) {
                                return;
                            }
                            if (this._curr_skill_hash) {
                                var skill = fightData.getSkill(this._curr_skill_hash);
                                if (skill.target == 3 || skill.target == 4) {
                                    return;
                                }
                            }
                            this.activeHero(btn_hash);
                            break;

                        case "skill":
                            var skill = fightData.getSkill(btn_hash);
                            this.activeSkill(btn_hash);
                            var targets = this._getSkillTargetHash();
                            if(targets.length>1 &&(skill.target == 2 || skill.target == 4)) {
                                //单体技能选择目标
                                this.activeSkill(btn_hash);
                            }else{
                                this.activeSkill(btn_hash);
                                if(targets.length>0) {
                                    this.castSkill(targets[0]);
                                }
                            }
                            if (fightData.getTrainingData() != 2) {
                                this.finishiTraining();
                            }
                            break;

                    }
                }

                switch(btn.name) {
                    case "btn":
                        //光圈按钮
                        var hash = btn.getUserData().hash;
                        //cc.log(hash);
                        this.castSkill(hash);
                        if(fightData.getTrainingData()!=2) {
                            this.finishiTraining();
                        }
                        break;

                    case "btn_test":
                        //测试用
                        /*
                        //var el = fightData.getEnemyList();
                        var el = fightData.getAliveHeroList();
                        var buffid_arr = [1,3,4,5,6,7,8];
                        for(var i in el) {
                            for(var num=0; num<=2; num++) {
                                var rnd = Math.floor(Math.random() * buffid_arr.length-1);
                                var buff_id = buffid_arr[rnd];
                                var t = (Math.random()*12+3)*1000;
                                el[i].setBuff(buff_id, t);
                                if(buff_id==1) {
                                    el[i].daze(t, el[i].getCD());
                                }
                            }
                        }
                        /**/
                        if(fightData.is_simulate) {
                            this.exit(1, '');
                        }
                        fightData.test(0);
                        /**/
                        break;

                    case "btnAuto":
                        if(fightData.isPvP()) {
                            return;
                        }
                        var hash =  btn.getUserData();
                        var fightUnit = fightData.getUnit(hash);
                        if((fightUnit instanceof FightUnit) && fightUnit.isFriendly()) {
                            var a = fightUnit.isAutoFight();
                            fightUnit.autoFight(!a);
                            this.showAutoFightTip(hash, !a);
                            this.finishiTraining();
                            //WidgetDig(btn, 'select').visible = (fightData.auto);
                            if(!a) {
                                this.stateUnit(fightUnit.hash, false); // 禁用英雄
                            }
                            if(fightUnit.hash==this._curr_hero_hash) {
                                this.clearHero();
                            }
                        }
                        break;
                }
                break;

            case ccui.Widget.TOUCH_CANCELED:  //取消, 按下后移出按钮区域放开(某些控件)
                break;
        }
    }
});