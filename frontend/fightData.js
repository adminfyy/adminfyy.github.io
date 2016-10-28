/**
 * Created by faps on 2016/2/18.
 */

/**@const BUFF闪烁剩余时间**/ BUFF_BLINK_TIME = 3;
/**@const monster type normal **/ MON_NORMAL = 0;
/**@const monster type elite **/ MON_ELITE = 1;
/**@const monster type boss **/ MON_BOSS = 2;
/**@const army type **/ T_ENEMY = 1;
/**@const army type **/ T_SELF = 0;

function Buff(id, unit_hash, time) {
    var attr = {
        hash: '',
        unit_hash: '',
        id: 0,
        name: '',
        type: 0,
        to: 0,
        icon: 'buffZhuoshang.png',
        time: 0 //剩余时间:单位毫秒
    };
    this.unit_hash = unit_hash || '';
    var info = null;
    if(id) {
        info = tj.dbdata.getrow("status", id);
    }
    if(info) {
        for(var j in info) {
            if(attr.hasOwnProperty(j)) {
                this[j] = info[j];
            }
        }
        this.hash = unit_hash + '_'+ id;
        this.type = info.buffType || 0;
        this.to = info.buffTo || 0;
        this.time = time;
        //this.icon = attr.icon;
        this.setCD(time);
    }
}

Buff.prototype.setCD = function(time){
    this._cdtime = 0;
    if (time > 0) {
        this._cdtime = time;
    }
};

Buff.prototype.runCD = function(dt) {
    if (this._cdtime == -99999){
        return;

    }
    this._cdtime -= dt;
    if(this._cdtime <= BUFF_BLINK_TIME * 1000) {
        fightData.sendMsg(msgac["FightUI_buff_blink"], this);
        this._cdtime = -99999
    }
};

function Skill(data) {
    var attr = {
        hash: '',
        unit_hash: '',
        id: 0,
        name: '',
        type: 0,
        icon: 'buffZhuoshang.png',
        animation: '',
        soundeffect: '',
        target: 0,
        ignore: 0,
        buffId: 0,
        buffTime: 0,
        buffChance: 0,
        dmgMod: 0
    };

    for(var j in data) {
        if(attr.hasOwnProperty(j)) {
            this[j] = data[j];
        }
    }
    this.buffTime = (parseInt(this.buffTime)||0) * 1000; //单位转换为: 毫秒
    //this.icon = attr.icon;
}

function FightUnit(data) {

    var attr = {
        camp: T_ENEMY, //战斗单位所属阵营：T_self玩家，T_enemy敌对
        hash: null,
        buffs: {}, //buff
        active_skill: 0, //默认选中的技能
        skills: {}, //可用技能
        daze_ms: 0, //发呆时长: ms

        auto: 0, //自动战斗
        id: 0,
        idx: 0, //在队伍中的位置，索引
        job: 0, //职业
        tid: 0, //英雄种族模板表(racetemplate)id
        mon_type: 0, //怪物类型 0-普通 1-精英 2-boss
        icon: 'airen.png', //头像
        figure: 'yamaxun.json',//形象
        race: 0, //种族
        name: '', //显示名称
        maxhp: 0, //最大生命值
        curhp: 0, //当前生命值
        maxcd: 10, //冷却时长
        cd: 0, //冷却剩余时间
        side: 0, //所属阵营: 0: 我方 1:敌方
        dead: 0, //是否死亡
        buff: [] //buff 原数据
    };


    for(var i in attr) {
        this[i] = attr[i];
    }
    for(var j in data) {
        if(attr.hasOwnProperty(j)) {
            this[j] = data[j];
        }
    }
    this['portrait'] = {}; //动画形象属性
    this['is_hero'] = false; //是否玩家的英雄战斗单位
    this['hash'] = fightData.makeUnitHash(this); //this.side+'_'+this.id+'_'+this.idx;

    if(data.dead!=undefined && data.dead==1) {
        //阵亡
        // this.goDead();
    }else{
        var unit_info = null;
        var skill_id_arr = [];
        if(this.job) {
            //英雄
            unit_info = tj.dbdata.getbysql("job", "where (id == " + (this.job) + ")")[0];
            if(!unit_info) {
                throw new customException("FightUnit: job not found(id=" + this.job+")", "FightUnit() >> fightData.js ");
            }
            if(this['tid']) {
                var tinfo = tj.dbdata.getrow("racetemplate", this['tid']);
                this['race'] = tinfo.race;
                this['icon'] = tinfo.protraits;
                this['figure'] = tinfo.figure;
            }
            this.is_hero = true;
        }else{
            //怪物
            this.is_hero = false;
            unit_info = tj.dbdata.getbysql("monster", "where (id == " + (this.id) + ")")[0];
            if(unit_info) {
                this['race'] = unit_info['race'];
                this['figure'] = unit_info['figure'];
            }else{
                throw new customException("FightUnit: monster not found(id="+this.id+")", "FightUnit() >> fightData.js ");
            }
        }

        //技能
        if(unit_info) {
            skill_id_arr = [unit_info.move1, unit_info.move2, unit_info.move3];
            for (var s in skill_id_arr) {
                var sid = skill_id_arr[s];
                var skill_info = tj.dbdata.getrow("skill", sid);
                //cc.log("skill "+ sid + " : ", skill_info.name, skill_id_arr, unit_info);
                if(skill_info) {
                    var hash = this['hash']+'_'+sid;
                    skill_info.hash = hash;
                    skill_info.unit_hash = this['hash'];
                    this.skills[hash] = new Skill(skill_info);
                    if (this.active_skill == 0) {
                        this.active_skill = hash;
                    }
                }
            }
        }

        //buff
        if(data.buff) {
            for(var bi in data.buff) {
                this.setBuff(data.buff[bi].buff_id, data.buff[bi].buff_time);
            }
        }
    }
}

/**
 * 施放技能
 * @param {string} skill_hash 技能hash
 * @param {string/array} target 目标hash / [hash, hash, ...]
 */
FightUnit.prototype.castSkill = function(skill_hash, target) {
    var skill = this.skills[skill_hash];
    var unit = fightData.getUnit(target);
    if(skill && unit) {
        if(this.canCast()) {
            this.resetCD();

            //使用技能
            //c->s param={"idx":己方单位(0,1,2,3), "skill":技能id, "target":(0,1,2,3)作用目标}
            //失败才返回 s->c param={"ret":1没有该单位 2单位无法操作 3cd未冷却 4技能不存在 5:目标不存在 6:目标已经死亡, 7晕眩中 8攻击非嘲讽目标, "idx":, "skill":, "target":,"cd":}
            fightData.sendMsg(msgac["Fight_use_skill"], {
                "id": this.id,
                "idx": this.idx,
                "skill": skill.id,
                "target": unit.idx
            });
        }else{
            //todo: 正在施法 或 已阵亡
        }
    }
};

FightUnit.prototype.activeSkill = function(skill_hash) {
    var skill = this.skills[skill_hash];
    if(skill instanceof Skill) {
        this.active_skill = skill_hash;
    }
};

/**
 * 使战斗单位发呆
 * @param dizzy_ms 发呆时长: ms
 * @param remain_ms 剩余cd: ms
 */
FightUnit.prototype.daze = function(dizzy_ms, remain_ms) {
    var per = 100 - this.getCDPercent();
    //var o_maxcd = this.maxcd;
    //var o_cd = this.cd;
    this.maxcd = Math.round(((remain_ms - dizzy_ms) /per)*100); //新的cd长度
    this.setCD(remain_ms - dizzy_ms); //剩余cd时长
    //cc.log(">>> 发呆: ", dizzy_ms, "percent:", per.toFixed(2), "old_cd:", o_maxcd, o_cd, " new_cd:", this.maxcd, this.cd);
    this.daze_ms = dizzy_ms;
};
FightUnit.prototype.getCDPercent = function() {
    var r = 0;
    if (this.cd > 0 && this.maxcd > 0) {
        r = (this.cd / this.maxcd) * 100;
    }
    r = parseInt(r) || 0;
    if(r < 0) {
        r = 0;
    }
    if(r > 100) {
        r = 100;
    }
    return Math.abs(100 - r);
};
FightUnit.prototype.getCD = function() {
    return this.cd;
};
FightUnit.prototype.setCD = function(cd) {
    this.cd = cd;
    if(cd==0 || this.cd<=0) {
        this.cd = 0;
    }
};
FightUnit.prototype.runCD = function(cd) {
    if(this.daze_ms>0) {
        this.daze_ms -= cd;
        if(this.daze_ms>0) {
            return this.cd;
        }else{
            cd = Math.abs(this.daze_ms);
            this.daze_ms = 0;
        }
    }
    this.cd -= cd;
    if(cd==0 || this.cd<=0) {
        this.cd = 0;
    }
    return this.cd;
};
FightUnit.prototype.resetCD = function() {
    this.cd = this.maxcd;
};
FightUnit.prototype.getBuff = function(buff_id) {
    return this.buffs[this['hash']+'_'+buff_id];
};
FightUnit.prototype.setBuff = function(buff_id, buff_time) {
    var nb = null;
    if(buff_id) {
        nb = new Buff(buff_id, this.hash, buff_time);
        if(nb.id) {
            this.buffs[this['hash'] + '_' + buff_id] = nb;
            fightData.sendMsg(msgac["FightUI_buff"], nb);
        }
    }
    return nb;
};
FightUnit.prototype.removeBuff = function(buff_id) {
    delete this.buffs[this['hash']+'_'+buff_id];
};
FightUnit.prototype.updateBuff = function(dt) {
    for (var i in this.buffs) {
        this.buffs[i].runCD(dt);
    }
};
FightUnit.prototype.getAllBuff = function() {
    return this.buffs;
};
FightUnit.prototype.getSkill = function(skill_id) {
    return this.skills[this.hash+'_'+skill_id] || null;
};
FightUnit.prototype.getAllSkill = function() {
    return this.skills;
};
FightUnit.prototype.say = function() {

};
FightUnit.prototype.getHPPercent = function() {
    var r = 0;
    if(this.curhp>0 && this.maxhp>0) {
        r = (this.curhp / this.maxhp) * 100;
    }
    return r;
};
FightUnit.prototype.getHP = function() {
    return this.curhp;
};
FightUnit.prototype.setHP = function(hp) {
    this.curhp = hp;
};
FightUnit.prototype.goDead = function() {
    this.setCD(0);
    this.dead = 1;
    fightData.sendMsg(msgac["FightUI_unit_dead"], this.hash);
};
FightUnit.prototype.isReady = function() {
    return (!this.isDead() && !this.isCDing() && !this.isDaze() && !this.isAutoFight() && !this.isInjured());
};
FightUnit.prototype.isDaze = function() {
    return (this.daze_ms>0);
};
FightUnit.prototype.isInjured = function() {
    return (this.curhp<1);
};
FightUnit.prototype.isDead = function() {
    return this.dead;
};
FightUnit.prototype.isCDing = function() {
    return (this.cd>0);
};
FightUnit.prototype.isHero = function() {
    return this.is_hero;
};
FightUnit.prototype.isFriendly = function() {
    return (this.camp==T_SELF);
};
FightUnit.prototype.canCast = function() {
    return (!this.isDead() && !this.isCDing());
};
FightUnit.prototype.getPortrait = function() {
    var res = RES_PATH + "animation/";
    if(this.isHero()) {
        if(this.figure=='') {
            res += "monster/renleinanzhanshi.json";
        }else {
            res += "monster/" + this.figure;
        }
    } else {
        if(this.figure=='') {
            res += "monster/anDijing.json";
        }else{
            res += "monster/" + this.figure;
        }
    }
    return res;
};
FightUnit.prototype.setPortraitAttr = function(key, value) {
    this.portrait[key] = value;
};
FightUnit.prototype.getPortraitAttr = function() {
    return this.portrait;
};
FightUnit.prototype.getMonsterType = function() {
    return this.mon_type;
};
FightUnit.prototype.autoFight = function(a) {
    this.auto = (a)?true:false;
    fightData.sendMsg(msgac["Fight_auto"], {auto: this.auto, id: this.id});
};
FightUnit.prototype.isAutoFight = function() {
    return (this.auto)?true:false;
};

var fightData = {
    FIGHT_MODE_NORMAL: 0,
    FIGHT_MODE_TEST: 1,
    FIGHT_MODE_SIMULATE: 2,

    _fight_mode: null,
    is_start: false,
    is_test: false,
    is_simulate: false, //模拟战斗？
    is_training: false, //新手训练？
    training_step: 0, //训练步骤
    operation_method: 0, //0:自动切换英雄 1:手动切换
    my_team: [],
    enemy_team: [],
    my_nick: '',
    enemy_nick: '',
    units: {},
    active_select: [],  //活跃的选择列表
    def_skill_info: {}, //上次选的技能
    time_ms: 120000, //战斗剩余时间:默认120秒

    //<<
    pvp: false,
    enter: false,

    init: function () {
        this.clear();
    },

    //供连接判断是否需要回到登陆界面
    needRelogin: function () {
        // if (this.enter === true && this.pvp === false)
        if (this.enter == true){
            return true
        }
        return false
    },

    //设置当前是否已经进入战斗场景
    setEneterPK: function (f) {
        this.enter = f;
    },

    clear: function () {
        this.my_team = [];
        this.enemy_team = [];
        for (var i in this.units) {
            delete this.units[i];
        }
        this.units = {};
        this.is_start = false;
        this.is_test = false;
        this.is_simulate = false;
        this.is_training = false;
    },

    setMode: function(mode) {
        this._fight_mode = mode;
    },

    fill: function (data) {
        this.clear();
        this.bid = data.bid;
        this.training_step = tj.mainData.getClientData("help")[6] || 0;
        this.is_training = (this.training_step != 3 && data.bid == 1); //练习战役
        this.pvp = data.pvp;
        if(this._fight_mode) {
            switch(this._fight_mode) {
                case this.FIGHT_MODE_TEST: //测试
                    this.is_test = true;
                    this.is_simulate = false;
                    break;
                case this.FIGHT_MODE_SIMULATE: //模拟
                    this.is_test = true;
                    this.is_simulate = true;
                    break;
                case this.FIGHT_MODE_NORMAL: //正常
                default:
                    this.is_test = false;
                    this.is_simulate = false;
                    break;
            }
            this._fight_mode = null;
        }
        var infos = data.infos;
        for (var d in infos) {
            var p = infos[d];
            var team = null;
            var fights = p.fights;
            var camp = (p.uid == tj.mainData.uid) ? T_SELF : T_ENEMY;
            if (camp == T_SELF) {
                //玩家信息
                this.my_nick = p.nick;
                team = this.my_team;
                this.def_skill_info = tj.local.getLocalStorageData('fight_hero_def_skill');
                if (!(this.def_skill_info instanceof Object)) {
                    this.def_skill_info = {};
                }
            } else {
                this.enemy_nick = p.nick;
                team = this.enemy_team;
            }

            for (var i in fights) {
                var u = fights[i];
                u.side = p.side;
                u.camp = camp;
                var unit = new FightUnit(u);
                if (this.def_skill_info.hasOwnProperty(u.id)) {
                    unit.activeSkill(unit.hash + '_' + this.def_skill_info[u.id]); //上次选中的技能
                }
                team.push(unit);
                this.units[unit.hash] = unit;
            }
        }

        //玩家英雄排序
        this.my_team.sort(function (a, b) {
            return a.id > b.id;
        });
        var hero_arr = this.pvp ? tj.mainData.getArenaTeam(false) : tj.mainData.getBattleHero();
        var sort_team = [];
        for (var i in hero_arr) {
            for (var k in this.my_team) {
                if (hero_arr[i] == this.my_team[k].id) {
                    sort_team.push(this.my_team[k]);
                }
            }
        }
        if ((sort_team instanceof Array) && sort_team.length > 0) {
            this.my_team = sort_team;
        }
        this.initPortraitAttr();
    },

    getTrainingData: function () {
        return this.training_step;
    },

    setTrainingData: function (n) {
        this.training_step = n;
        tj.mainData.setClientDataValue("help", 6, n);
        if (n == 0) {
            this.is_training = true;
        }
    },

    nextTraining: function () {
        this.training_step++;
        if (this.training_step > 3) {
            this.training_step = 3;
        }
        this.setTrainingData(this.training_step);
    },

    isStart: function () {
        return this.is_start;
    },

    isTraining: function () {
        return this.is_training;
    },

    isPvP: function () {
        return this.pvp
    },

    isTest: function () {
        return this.is_test;
    },

    isSimulate: function() {
        return this.is_simulate;
    },

    go: function (id) {
        this.setMode(this.FIGHT_MODE_NORMAL);
        if (id == undefined) {
            id = 1;
        }
        tj.wsconnection.setMsg(777, {'id': id});
    },

    test: function (id) {
        this.setMode(this.FIGHT_MODE_TEST);
        if (id == undefined) {
            id = 1;
        }
        tj.wsconnection.setMsg(888, {'id': id});
    },

    /**
     * 开始战斗
     */
    start: function () {
        this.sendMsg(msgac["Fight_start"]);
    },

    end: function() {
        this.sendMsg(msgac["FightUI_win"], {});
    },

    /**
     * 撤退
     */
    retreat: function () {
        //
    },

    /**
     * 获取英雄列表
     */
    getHeroList: function () {
        return this.my_team;
    },

    getAliveHeroList: function () {
        var re = [];
        for (var i in this.my_team) {
            if (!this.my_team[i].isDead()) {
                re.push(this.my_team[i]);
            }
        }
        return re;
    },

    getEnemyList: function () {
        return this.enemy_team;
    },

    initPortraitAttr: function () {
        //设置动画形象的属性
        var winSize = cc.director.getWinSize();
        var containW = winSize.width;

        //友方
        for (var i in this.my_team) {
            var heroUnit = this.my_team[i];
            heroUnit.setPortraitAttr('scale', 1.5);
            heroUnit.setPortraitAttr('location', cc.p(0.5, -1.35));
            if(heroUnit.race == 2) {
                heroUnit.setPortraitAttr('location', cc.p(0.5, -0.9));
            }
            heroUnit.setPortraitAttr('zorder', -1);
        }

        //敌方
        this.enemy_team.sort(function (a, b) {
            return a.idx > b.idx;
        });
        //cc.log(this.enemy_team);
        var posy = [0.14, 0.14, 0.17];
        var nums = [0, 0, 0];
        for (var i in this.enemy_team) {
            nums[this.enemy_team[i].mon_type]++;
        }
        var space = [];
        space[0] = nums[0] == 0 ? 0 : containW / nums[0];
        space[1] = nums[1] == 0 ? 0 : containW / nums[1];
        space[2] = nums[2] == 0 ? 0 : containW / nums[2];
        var sums = [nums[0], nums[1], nums[2]];
        for (var i in this.enemy_team) {
            var enemyUnit = this.enemy_team[i];
            var mt = enemyUnit.mon_type;
            var offset = nums[mt] % 2;
            var x = space[mt] * (sums[mt] - nums[mt]) + space[mt] / 2;
            nums[mt]--;
            var y = winSize.height * posy[mt] - (offset * 15);
            enemyUnit.setPortraitAttr('location', cc.p(x, y));
            var zorder = 0;
            switch (mt) {
                case MON_BOSS:
                    zorder = 100;
                    break;
                case MON_ELITE:
                    zorder = 200;
                    break;
                case MON_NORMAL:
                    zorder = 300;
                    break;
            }
            enemyUnit.setPortraitAttr('zorder', zorder + (offset * 10));
        }
    },

    getUnit: function (hash) {
        if (typeof hash == "string") {
            var seg_arr = hash.split('_');
            if (seg_arr.length > 3) {
                //skill hash
                return this.units[this._getUnitHashFormSkillHash(hash)];
            } else {
                //unit hash
                return this.units[hash];
            }
        }
        return null;
    },

    getUnitBySkillHash: function (skill_hash) {
        return this.getUnit(this._getUnitHashFormSkillHash(skill_hash));
    },

    makeUnitHash: function (fightUnit) {
        return fightUnit.side + '_' + fightUnit.id + '_' + fightUnit.idx;
    },

    _skillHashToId: function (skill_hash) {
        var seg_arr = skill_hash.split('_');
        if (seg_arr.length == 4) {
            return seg_arr[3];
        }
        return 0;
    },

    _getUnitHashFormSkillHash: function (skill_hash) {
        var unit_hash = '';
        if(skill_hash) {
            var seg_arr = skill_hash.toString().split('_');
            if (seg_arr.length >= 3) {
                unit_hash = seg_arr.slice(0, 3).join('_');
            }
        }else{
            cc.warn('skill info not found hash:'+skill_hash);
        }
        return unit_hash;
    },

    getSkill: function (skill_hash) {
        var skill = null;
        if(skill_hash) {
            var skill_id = this._skillHashToId(skill_hash);
            var unit_hash = this._getUnitHashFormSkillHash(skill_hash);
            if (skill_id && unit_hash) {
                var unit = this.getUnit(unit_hash);
                if (unit instanceof FightUnit) {
                    skill = unit.getSkill(skill_id);
                }
            }
        }
        return skill;
    },

    activeSkill: function (skill_hash) {
        var skill = null;
        var skill_id = this._skillHashToId(skill_hash);
        var unit_hash = this._getUnitHashFormSkillHash(skill_hash);
        if (skill_id && unit_hash) {
            var unit = this.getUnit(unit_hash);
            if (unit instanceof FightUnit) {
                skill = unit.getSkill(skill_id);
                if (skill instanceof Skill) {
                    unit.active_skill = skill_hash;
                    this.def_skill_info[unit.id] = skill.id;
                    tj.local.saveLocalStorageData('fight_hero_def_skill', this.def_skill_info);
                }
            }
        }
        return skill;
    },

    deleteDefaultSkillData: function(del_hero_id) {
        //删除一个英雄的技能选择信息
        var tmp_def_skill_info = tj.local.getLocalStorageData('fight_hero_def_skill');
        if(!(tmp_def_skill_info instanceof Object)) {
            tmp_def_skill_info = {};
        }
        if(tmp_def_skill_info.hasOwnProperty(del_hero_id)) {
            delete tmp_def_skill_info[del_hero_id];
        }
        tj.local.saveLocalStorageData('fight_hero_def_skill', tmp_def_skill_info);
    },

    registerMsg: function () {
        tj.wsconnection.removeGrp("fightData");
        tj.wsconnection.addGrp(msgac["Fight_start"], msgac["Fight_pause_pve"], this.receiveMsg.bind(this), "fightData");
        // tj.wsconnection.addGrp(msgac["Fight_info"], msgac["Fight_info"], this.receiveMsg.bind(this), "fightData");
    },

    registerMsgMapback: function () {
        tj.wsconnection.addGrp(msgac["Map_back"], msgac["Map_back"], this.receiveMsg.bind(this), "fightData");
    },

    sendMsg: function (msg, data, f) {
        var send_data = {};

        if (msg < 10000) {
            //app msg
            switch (msg) {
                case msgac["FightUI_start"]:
                    break;
                case msgac["FightUI_unit_attack"]:
                    send_data = data;
                    break;
                case msgac["FightUI_log"]:
                    send_data = {
                        msg: data
                    };
                    break;
                case msgac["FightUI_pop_msg"]:
                    send_data = {
                        msg: data
                    };
                    break;
                case msgac["FightUI_buff"]:
                    send_data = data;
                    break;
                case msgac["FightUI_buff_clear"]:
                    send_data = data;
                    break;
                case msgac["FightUI_unit_dead"]:
                    send_data = {
                        hash: data
                    };
                    break;
                case msgac["FightUI_unit_update"]:
                    send_data = data;
                    break;
                case msgac["FightUI_win"]:
                    send_data = data;
                    break;
                case msgac["FightUI_lost"]:
                    send_data = data;
                    break;
                default:
                    send_data = data;
                    break;
            }
            tj.wsconnection.pushmsg(msg, send_data, f); //app消息

        } else {
            //net msg
            switch(msg) {
                case msgac["Fight_start"]:
                    if(this.is_simulate && fightSimulate) {
                       //开始模拟战斗
                       fightSimulate.start();
                       return;
                    }
                    break;

                case msgac["Fight_auto"]:
                    send_data = data;
                    cc.log("----------- set auto:", data);
                    break;
                case msgac["Fight_use_skill"]:
                    if(this.is_simulate && fightSimulate) {
                        //模拟战斗时的技能消息处理
                        fightSimulate.castSkill(data);
                        return;
                    }else{
                        delete data.id;
                    }
                    send_data = data;
                    break;
            }

            tj.wsconnection.setMsg(msg, send_data); //网络消息
        }
        // cc.log("--- fight send msg:", getAcInfo(msg), send_data);
    },

    receiveMsg: function (obj) {
        var ac = obj[0];
        var data = obj[1];
        //cc.log("fightData receiveMsg:", getAcInfo(ac), data);

        switch (ac) {
            case msgac["Map_back"]:
                if(data.ret==0 && data.type==1) {
                    //收到服务器的通知，战败回城
                    this.sendMsg(msgac["FightUI_back_city"]);
                    tj.collect_script_stat(collect_type.COLLECT_BACKCITY);
                }
                break;
            case msgac["Fight_info"]: //战斗信息
                //cc.log('--- fight data: ', data);
                break;
            case msgac["Fight_start"]: //开始
                switch(data.ret) {
                    case 0:
                        cc.log("--- fight start ---", this.bid);

                    case 3:
                        this.is_start = true;
                        this.sendMsg(msgac["FightUI_start"]);
                        if(data.pvptime) {
                            this.time_ms = data.pvptime;
                            this.sendMsg(msgac["FightUI_show_timer"]);
                        }
                        break;

                    default:
                        cc.log("--- fight start err: ", data);
                        break;
                }
                break;
            case msgac["Fight_end"]: //结束
                cc.log("--- fight end --- ", this.bid, "start:", this.isStart(),  data);
                //pvp中uid字段代表输的一方的uid
                try {
                    if (!this.isStart()) {
                        return;
                    }
                    var st = -1;
                    if (data) {
                        if (data.uid !== undefined) {
                            //pvp 战斗结果
                            switch (data.uid) {
                                case 0:
                                    st = 0;
                                    break;
                                case -1:
                                    break;
                                case tj.mainData.uid:
                                    st = 2;
                                    break;
                                default:
                                    st = 1;
                                    break;
                            }
                        } else {
                            st = (data.loseside.toString() == "1") ? 1 : 2; //pve 战斗结果: 1=胜
                        }
                        data.msg = tmp_msg;

                        switch (parseInt(st)) {
                            case 0: //平局
                                this.sendMsg(msgac["FightUI_draw"], data, true);
                                break;
                            case 1: //胜利
                                this.sendMsg(msgac["FightUI_win"], data, true);
                                break;
                            case 2: //战败
                                this.sendMsg(msgac["FightUI_lost"], data, true);
                                break;
                            default: //错误
                                this.sendMsg(msgac["FightUI_err"], data, true);
                                break;
                        }
                    }
                }catch(e) {
                    tj.sendErrLog(e, 'fightEnd err.', data);
                    this.sendMsg(msgac["FightUI_err"], data, true); //遇到错误退出
                }
                break;
            case msgac["Fight_auto"]: //自动
                if (data.ret == 0) {
                    //this.auto = data.auto;
                } else {
                    cc.log("--- fight set auto fail:", data.ret);
                }
                break;
            case msgac["Fight_use_skill"]: //施放技能
                //使用技能
                //cc.log("--- fight cast skill fail:", data);
                //"ret":1没有该单位 2单位无法操作 3cd未冷却 4技能不存在 5:目标不存在 6:目标已经死亡, 7晕眩中 8攻击非嘲讽目标, "idx":, "skill":, "target":,"cd":
                if(data) {
                    if([1, 4].indexOf(data.ret)>-1) {
                        this.sendMsg(msgac["FightUI_pop_msg"], "施放技能失败: " + data.id + ", " + data.ret);
                    }
                    data.side = 0;
                    var unit = this.getUnit(this.makeUnitHash(data)); //施法者
                    if (unit) {
                        //施法失败，恢复cd
                        unit.setCD(data.cd);
                    }
                }
                break;
            case msgac["Fight_skill_ret"]: //技能结果
                //cc.log("--- fight skill result:", data);
                if (data.uid) {
                    var tmp_msg = '';
                    var hash = this.makeUnitHash(data);
                    var unit = this.getUnit(hash); //施法者
                    if (!(unit instanceof FightUnit)) {
                        //无效战斗单位
                        return;
                    }
                    var unit_skill = unit.getSkill(data.skill_id); //技能
                    if (!(unit_skill instanceof Skill)) {
                        //无效技能
                        cc.warn('skill info not found id:'+ data.skill_id);
                        return;
                    }

                    ///unit.setCD(data.cd);
                    unit.maxcd = data.cd;
                    unit.resetCD(); //重置施法者CD

                    if (data.targets) {
                        var targets_hash = [];
                        for (var k in data.targets) {
                            //遍历技能影响的目标
                            var target_data = data.targets[k];
                            var target_unit = this.getUnit(this.makeUnitHash(target_data));
                            if (!(target_unit instanceof FightUnit)) {
                                //无效目标
                                continue;
                            }

                            //cc.log("skill ret: ", unit.name+"("+(unit.isFriendly()?unit.id:unit.id+':'+unit.idx)+")", unit_skill.name + "(" + unit_skill.id + ")", target_unit.name+"("+(target_unit.isFriendly()?target_unit.id:target_unit.id+':'+target_unit.idx)+")", target_unit.getHP());

                            targets_hash.push(target_unit.hash);

                            //buff
                            if (target_data.buff) {
                                if(target_data.buff.remain_sec) {
                                    target_unit.daze((target_data.buff.dizzy_sec || 0), target_data.buff.remain_sec);
                                }
                                target_unit.setBuff(target_data.buff.buff_id, target_data.buff.buff_time); //给目标加上buff
                            }

                            //技能效果
                            var affect = target_data.affect;
                            if (affect) {
                                if (target_unit.hash == hash) {
                                    //对自己施法
                                    target_unit.setHP(affect.tarhp);
                                    if (affect.value != 0) {
                                        this.sendMsg(msgac["FightUI_unit_update"], {hash: target_unit.hash, hp_str: affect.value});
                                    }
                                } else {
                                    //对目标施法
                                    if (affect.hit) {
                                        //命中目标
                                        target_unit.setHP(affect.tarhp);
                                        this.sendMsg(msgac["FightUI_unit_update"], {hash: target_unit.hash, crit: affect.crit, hp_str: affect.value});
                                        if (affect.tarhp == 0 && affect.dead == 0) {
                                            //重伤
                                        } else {
                                            //普通
                                            if (affect.steal) {
                                                //技能附带吸血
                                                if (data.curhp) {
                                                    //为施法者加HP
                                                    unit.setHP(data.curhp);
                                                }
                                                this.sendMsg(msgac["FightUI_unit_update"], {hash: unit.hash, hp_str: affect.steal});
                                            }
                                            if (affect.counter) {
                                                if (data.curhp) {
                                                    //施法者被反伤减HP
                                                    unit.setHP(data.curhp);
                                                }
                                                this.sendMsg(msgac["FightUI_unit_update"], {hash: unit.hash, hp_str: affect.counter});
                                            }
                                            if (affect.dead) {
                                                //目标被弄死了
                                                target_unit.goDead();
                                            }
                                        }
                                    } else {
                                        //未命中
                                        this.sendMsg(msgac["FightUI_unit_update"], {hash: target_unit.hash, hp_str: 'Miss'});
                                    }
                                } //if target==xx
                            }
                        } //end for
                        //通知UI发动攻击
                        this.sendMsg(msgac["FightUI_unit_attack"], {caster: unit.hash, skill: unit_skill.hash, targets: targets_hash});
                    } //end if targets

                    if(data.dead) {
                        //施法者可能在施放技能时被反伤致死
                        unit.goDead();
                    }
                }
                break;
            case msgac["Fight_buff_ret"]: //buff效果
                //cc.log("--- fight buff result:", data);
                if (data.buffs) {
                    var tmp_msg = '';
                    var hash = this.makeUnitHash(data);
                    var unit = this.getUnit(hash);
                    if (!(unit instanceof FightUnit)) {
                        //无效战斗单位
                        return;
                    }

                    for (var i in data.buffs) {
                        var b = data.buffs[i];
                        var buff = unit.getBuff(b.buff_id);
                        if (!(buff instanceof Buff)) {
                            //无效buff
                            cc.warn("buff info not found id:"+ b.buff_id);
                            continue;
                        }
                        if (b.dead) {
                            //目标阵亡
                            unit.goDead();
                        }
                        if (b.buff_time == 0 || b.dead) {
                            //buff到期或目标阵亡
                            unit.removeBuff(b.buff_id);
                            if(b.remain_sec!=undefined) {
                                unit.daze((b.dizzy_sec || 0), b.remain_sec); //buff移除减速效果
                            }
                            //clear buff
                            this.sendMsg(msgac["FightUI_buff_clear"], buff);//unit.hash+"_"+ b.buff_id);
                        }
                        if (b.curhp != undefined) {
                            //血量
                            unit.setHP(b.curhp);
                            this.sendMsg(msgac["FightUI_unit_update"], {hash: hash, hp_str: b.value});
                        }
                    }
                }
                break;

            case msgac["Fight_cd_update"]: //更新CD
                if(data.id) {
                    var hash = this.makeUnitHash(data);
                    var unit = this.getUnit(hash); //施法者
                    if (!(unit instanceof FightUnit)) {
                        //无效战斗单位
                        return;
                    }
                    unit.maxcd = data.cd;
                    unit.resetCD();
                }
                break;

            case msgac["Fight_pause_pve"]:
                if(!this.isPvP()) {
                    this.sendMsg(msgac["FightUI_break"], {});
                }
                break;
            default:
                break;
        } //end switch ac
    },

    simulate: function(bid) {
        this.setMode(this.FIGHT_MODE_SIMULATE);
        var that = this;
        try {
            cc.loader.loadJs("src/frontend/fightSimulate.js", function() {
                try {
                    fightSimulate.init(bid);
                    tj.pushScene(new cc.TransitionFade(1.5, createScene(fightLayer)));
                } catch (e) {}
            });
        }catch(e){
            cc.warn("not found fight simulator.");
        }
    }

};
