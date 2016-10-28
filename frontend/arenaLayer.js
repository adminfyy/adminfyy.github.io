/**
 * Created by faps on 2016/7/25.
 */

var arenaLayer = baseLayer.extend({
    _team: [], //竞技场队伍
    _next_level: null,

    ctor: function () {
        this._super();
        this._basename = "arena";
        this.init();
    },

    init: function() {
        if (!this._super())
            return false;
        this._ui = this.load_ui("uiMainPVP.json");
        if (!this._ui)
            return false;

        this._lang = tj.cfg.get("text/pvp");
        this.addChild(this._ui);
    },

    onEnter: function () {
        this._super();
        tj.wsconnection.addGrp(msgac["ArenaUI_data_update"], msgac["ArenaUI_data_update"], this.process_ac.bind(this), this.get_scene_name());
        tj.wsconnection.addGrp(msgac["ArenaUI_note_box"], msgac["ArenaUI_note_box"], this.process_ac.bind(this), this.get_scene_name());

        this._team = tj.mainData.getArenaTeam();
        //cc.log('ArenaTeam:', this._team);
        this.updateUI();
        this.showPunish();

        tj.mainData.setClientData('new_arena', 0);
        tj.mainData.sendClientData('new_arena');
        tj.wsconnection.pushmsg(msgac["Main_refresh_new"], {}, true);
    },

    onExit: function () {
        this._super();
    },

    get_scene_name: function() {
        return "arena";
    },

    create_hero_ani: function(btnHero, figure) {
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

    _getRankColor: function(rank_id) {
        var color = '#FFFFFF';
        var rankColors = tj.cfg.get("designdata/rankColors");
        var id2Rank = {1:'D', 2:'C', 3:'B', 4:'A', 5:'S', 6:'S', 7:'S', 8:'S'};
        if(id2Rank[rank_id]) {
            color = rankColors[id2Rank[rank_id]] || color;
        }
        return cc.color(color);
    },

    updateUI: function() {
        var info = tj.mainData.getArenaData();
        WidgetDig(this._ui, 'materials/btnReward/text').setString(this._lang['getReward']);
        var btnReward = WidgetDig(this._ui, 'materials/btnReward');
        if(btnReward) {
            btnReward.setVisible(info.reward>-1);
        }

        var level_info = tj.dbdata.getrow('rankingsetting', info.division);
        var next_level_info = tj.dbdata.getrow('rankingsetting', info.division + 1);
        //cc.log('>>>>> arean info:', level_info, next_level_info);
        var infoTextArea = WidgetDig(this._ui, 'materials/btnMain/text');
        infoTextArea.getParent().setEnabled(false);
        infoTextArea.getChildByName("textExplain").setString(this._lang['level']);
        infoTextArea.getChildByName("textName").setString('-');
        infoTextArea.getChildByName("textState").setString(this._lang['score']);
        infoTextArea.getChildByName("textNum").setString(0);
        if(level_info) {
            //当前阶梯和积分
            infoTextArea.getChildByName("textName").setString(level_info.name);
            infoTextArea.getChildByName("textName").setColor(this._getRankColor(level_info.id));
            infoTextArea.getChildByName("textNum").setString(info.point);
        }

        var panelTextArea = WidgetDig(this._ui, 'materials/Panel_20');
        var nt1 = panelTextArea.getChildByName('textNext');
        if(next_level_info) {
            var nt2 = null;
            if(this._next_level == null) {
                this._next_level = nt1.clone();
                nt1.getParent().addChild(this._next_level);
                this._next_level.setContentSize(nt1.getContentSize());
                this._next_level.enableOutline(cc.color('#000000'), 1);
                this._next_level.enableShadow(cc.color('#000000'), cc.size(2, -2), 0);
            }
            nt2 = this._next_level;

            //下一阶信息
            var need_score = next_level_info.pointsLow - info.point;
            var nt = this._lang['upLevel'].format(need_score, '');// next_level_info.name);
            if(need_score==0) {
                nt = '';
            }
            nt1.setString(nt);
            nt1.ignoreContentAdaptWithSize(true);
            nt2.setString(next_level_info.name);
            nt2.ignoreContentAdaptWithSize(true);
            nt2.setColor(this._getRankColor(next_level_info.id));
            nt2.setPosition(cc.pAdd(nt1.getPosition(), cc.p((nt1.width+nt2.width)/2, 0)));
        }else{
            nt1.setVisible(false);
        }
        //其它提示
        var txt = this._lang['dayText'].format(info.daily_match);
        if(info.daily_match==0) {
            txt = this._lang['noneText'];
        }
        if(info.daily_match<info.punishs) {
            txt += this._lang['needText'].format(info.punishs - info.daily_match);
        }else if(info.daily_match>=info.norewards) {
            txt += this._lang['expText'];
        }
        panelTextArea.getChildByName('textNext_0').setString(txt);

        //一些按钮
        var btn_ch = WidgetDig(this._ui, 'main/heros/btnReplace');
        btn_ch.setEnabled(!arenaMsgHelper.isMatch());
        btn_ch.setColor((arenaMsgHelper.isMatch())?cc.color('#888888'):cc.color('#FFFFFF'));
        btn_ch.getChildByName("text").setString(this._lang['choose_hero']);
        WidgetDig(this._ui, 'set/btnExplain/text').setString(this._lang['role']);
        WidgetDig(this._ui, 'set/btnHistory/text').setString(this._lang['history']);
        if(info.matching) {
            this.setButtonStatus(WidgetDig(this._ui, 'set/btnGo/text'), this._lang['matching'], 1, '#00FF00');
        }else {
            this.setButtonStatus(WidgetDig(this._ui, 'set/btnGo/text'), this._lang['match'], 0);
        }
        WidgetDig(this._ui, 'set/btnClosed/text').setString(this._lang['leave']);

        //英雄形象
        this.updateHero();
    },

    updateHero: function() {
        var data = this._team;
        for(var i in [0, 0, 0, 0]) {
            var btnHero = WidgetDig(this._ui, "main/heros/list/btnHero" + (parseInt(i)+1));
            btnHero.heroId = 0;
            btnHero.setEnabled(false);
            var textSelect = WidgetDig(btnHero,"textSelect");
            var textProfession = WidgetDig(btnHero,"textProfession");
            var portraits = WidgetDig(btnHero,"portraits");
            textSelect.setString(tj.cfg.get("text_on_ui/team/noselect"));
            textSelect.setColor(cc.color.WHITE);
            textProfession.setVisible(false);
            portraits.setVisible(false);

            var hid = data[i] || 0;
            if(!hid) {
                continue;
            }
            var heroinfo = tj.mainData.getOwnHeroById(hid);
            if(!heroinfo) {
                continue;
            }

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
            }
        }
    },

    doMatch: function() {
        var btnText = WidgetDig(this._ui, 'set/btnGo/text');
        if(arenaMsgHelper.isMatch()) {
            this.setButtonStatus(btnText, this._lang['match'], 0);
            arenaMsgHelper.cancelMatch();
        }else{
            var team = tj.mainData.getArenaTeam();
            var valid_team = false;
            for(var i in team) {
                if(team[i]>0) {
                    valid_team = true;
                    break;
                }
            }
            if(!valid_team) {
                this.noticetext_add(tj.cfg.get("text/pvp/teamErr"));
                return;
            }
            if(tj.mainData.nick == "") {
                this._curr_popLayer = createInputNameLayer(this, function (name) {
                    if(name != "") {
                        tj.mainData.nick = name;
                        arenaMsgHelper.doMatch();
                        this.setButtonStatus(btnText, this._lang['matching'], 1, '#00FF00');
                    }else{
                        this.noticetext_add(this._lang['quit']);
                    }
                }.bind(this));
            }else{
                arenaMsgHelper.doMatch();
                this.setButtonStatus(btnText, this._lang['matching'], 1, '#00FF00');
            }
        }
    },

    showPunish: function() {
        var k = 'Arena_punish';
        var v = tj.local.getLocalStorageData(k);
        var msg = '';
        if(v && v.hasOwnProperty('days') && v.hasOwnProperty('del')) {
            msg = this._lang["punish"].format(v.del);
        }
        if(msg) {
            tj.local.saveLocalStorageData(k, null);
            this._curr_popLayer = createNoteBox(this, msg, form_t.arena, null);
        }
    },

    showNote: function(msg) {
        this._curr_popLayer = createNoteBox(this, msg, form_t.arena, null);
    },

    setButtonStatus: function(btn, msg, state, color) {
        if(!color) {
            color = "#FFFFFF";
        }
        btn.setColor(cc.color(color));
        btn.stopAllActions();
        if(!state) {
            btn.runAction(cc.fadeIn(0.5));
        }else{
            var ac = cc.repeatForever(cc.sequence(cc.fadeTo(0.5, 30), cc.fadeTo(0.5, 225)));
            btn.runAction(ac);
        }
        btn.setString(msg);
    },

    defaultTouchButton: function (btn, type) {
        //cc.log(btn.name, type);
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN: //按下
                break;

            case ccui.Widget.TOUCH_ENDED: //放开
                switch(btn.name) {
                    case 'btnClosed':
                        //this.removeFromParent();
                        this.set_release();
                        break;

                    case "btnHero1":
                    case "btnHero2":
                    case "btnHero3":
                    case "btnHero4":
                        if(btn.heroId) {
                            this._curr_popLayer = createCardHeroLayer(this, btn.heroId, heroCard_t.pvp);
                        }
                        break;

                    case 'btnReplace': //选择英雄
                        var that = this;
                        this._curr_popLayer = createHeroSelect(this, function(_team) {
                            that._team = tj.mainData.setArenaTeam(_team);
                            that.updateHero();
                        }, this._team, select_hero_t.pvp);
                        break;

                    case 'btnGo': //匹配
                        this.doMatch();
                        WidgetDig(this._ui, 'main/heros/btnReplace').setEnabled(!arenaMsgHelper.isMatch());
                        break;

                    case 'btnExplain': //规则
                        var msg = this._lang['roleText'];
                        this._curr_popLayer = createNoteBox(this, msg, form_t.arena, null);
                        break;

                    case 'btnReward': //领奖
                        tj.wsconnection.setMsg(msgac["Arena_getreward"], {});
                        tj.mainData.updateArenaData({reward:-1});
                        this.updateUI();
                        break;

                    case 'btnHistory': //领奖
                        this._curr_popLayer = createPvpHistoryLayer(this);
                        break;
                }
                break;

            case ccui.Widget.TOUCH_CANCELED:  //取消
                break;
        }
    },

    process_ac: function (doc) {
        cc.log('process_ac:', doc);
        var msg_id = doc[0];
        var data = doc[1];
        switch (msg_id) {
            case msgac["ArenaUI_data_update"]:
                this.updateUI();
                this.showPunish();
                break;

            case msgac["ArenaUI_note_box"]:
                this.showNote(data.msg);
                break;
        }
    }
});


var arenaMsgHelper = {
    _netMsgFlag : 'arenaNetMsg',
    _UIMsgFlag : 'arenaUIMsg',
    _UIMsgRegistered: false,
    _fightData: null,
    _layer: null,
    _start: false,
    _ready: false,

    setFightData: function(data) {
        this._start = false;
        this._fightData = data;
    },

    setParentUI: function(layer) {
        this._layer = layer;
        this.receivceUIMsg([msgac["ArenaUI_status"], {a:1}]);
    },

    registerNetMsg: function() {
        //网络消息
        this.removeNetMsg();
        tj.wsconnection.addGrp(msgac["Arena_match"], msgac["Arena_getreward"], this.receivceNetMsg.bind(this), this._netMsgFlag);
        //cc.log(' ---- arenaRegisterNetmsg.');
    },

    registerUIMsg: function() {
        //UI消息
        if(this._UIMsgRegistered) {
            return;
        }
        this._UIMsgRegistered = true;
        tj.wsconnection.addGrp(msgac["ArenaUI_status"], msgac["ArenaUI_timer_end"], this.receivceUIMsg.bind(this), this._UIMsgFlag);
        //this.receivceUIMsg([msgac["ArenaUI_status"], {a:1}]);
    },

    receivceNetMsg: function(obj) {
        var ac = obj[0];
        var data = obj[1];
        switch (ac) {
            case msgac["Arena_match"]: //pvp匹配
                var msg = '';
                var m = false;
                switch (data.ret) {
                    case -1:
                        msg = tj.cfg.get("text/pvp/otime");
                        break;
                    case 0:
                        m = true;
                        break;
                    case 1:
                        msg = tj.cfg.get("text/pvp/notOnPos");
                        break;
                    case 2:
                        msg = tj.cfg.get("text/pvp/fighting");
                        break;
                    case 3:
                        m = true;
                        msg = tj.cfg.get("text/pvp/already");
                        break;
                    case 4:
                        msg = tj.cfg.get("text/pvp/teamErr");
                        break;

                    case 6:
                        tj.wsconnection.pushmsg(msgac["ArenaUI_note_box"], {msg:tj.cfg.get("text/pvp/seasonEnd")});
                        break;

                    default:
                        msg = tj.cfg.get("text/pvp/err");
                        break;
                }
                tj.mainData.updateArenaData({matching: m});
                tj.wsconnection.pushmsg(msgac["ArenaUI_data_update"], {}, true); //竞技场数据更新通知
                if (msg) {
                    tj.wsconnection.pushmsg(msgac["ArenaUI_pop_msg"], {msg: msg}, true); //竞技场飘字文本消息
                }
                tj.wsconnection.pushmsg(msgac["ArenaUI_status"], {}, true);
                break;

            case msgac["Arena_match_ret"]: //pvp已经匹配上了
                this._start = true;
                this._ready = false;
                if(data) {
                    tj.wsconnection.pushmsg(msgac["ArenaUI_show_team"], data, true);
                }
                break;

            case msgac["Arena_info"]: //pvp积分更新
                //tj.wsconnection.pushmsg(msg_id, data, true, process_ac);
                ////S->C 竞技场信息 ret和rewards只在pvp结束的时候才有
                //// param={"ret":-1负 0-平局 1-胜, "rewards": 奖励[{"id":,"num":}], "point":竞技场总分,"point_del":增加或者扣除的分数,"division":分段 "winstreak":连胜}
                //Arena_info = 12320
                this._start = false;
                this._ready = false;
                this._fightData = null;
                tj.mainData.updateArenaData({
                    matching: false,
                    daily_match: data.daily_match,
                    point: data.point,
                    division: data.division
                });
                tj.wsconnection.pushmsg(msgac["ArenaUI_data_update"], {}, true);
                var msg = tj.cfg.get("text/pvp/point") + ' ' + ((data.point_del > 0) ? '+' + data.point_del.toString() : data.point_del.toString());
                //tj.wsconnection.pushmsg(msgac["ArenaUI_pop_msg"], {msg: msg}, true);
                if (data.rewards) {
                    for (var i in data.rewards) {
                        var reward = data.rewards[i];
                        tj.mainData.addStroageItem(reward.id, reward.num); //加奖励物品
                        msg = tj.mainData.getItemName(reward.id) + ' +' + reward.num;
                        //tj.wsconnection.pushmsg(msgac["ArenaUI_pop_msg"], {msg: msg}, true);
                    }
                }

                //默认自动再排
                //setTimeout(this.doMatch.bind(this), 3000); //3秒
                break;

            case msgac["Arena_require_check"]: //pvp确认
                tj.wsconnection.setMsg(msgac["Arena_require_check"], {"ret": true}); //自动确认
                break;

            case msgac["Arena_match_quit"]: //退出竞技场
                tj.mainData.updateArenaData({matching: false});
                tj.wsconnection.pushmsg(msgac["ArenaUI_data_update"], {}, true);
                tj.wsconnection.pushmsg(msgac["ArenaUI_status"], {}, true);
                break;

            case msgac["Arena_kickout"]: //踢出pvp队列
                var msg = tj.cfg.get("text/pvp/kickout");
                tj.wsconnection.pushmsg(msgac["ArenaUI_pop_msg"], {msg: msg}, true);
                tj.mainData.updateArenaData({matching: false});
                tj.wsconnection.pushmsg(msgac["ArenaUI_data_update"], {}, true);
                tj.wsconnection.pushmsg(msgac["ArenaUI_status"], {}, true);
                break;

            case msgac["Arena_daily_punish"]:
                //s->c 每日匹配不足惩罚通知 param={"point":惩罚前分数, "truepoint":惩罚后分数, "daily_match":当前每天完成数}
                //Arena_daily_punish = 12338
                tj.mainData.updateArenaData({
                    point: data.truepoint,
                    daily_match: data.daily_match
                });
                if(data.point!=data.truepoint) {
                    var k = 'Arena_punish';
                    var v = tj.local.getLocalStorageData(k);
                    var sum_data = {
                        days: 0,
                        del: data.truepoint - data.point
                    };
                    if (v && v.hasOwnProperty('days') && v.hasOwnProperty('del')) {
                        sum_data.days += v.days;
                        sum_data.del += v.del;
                    }
                    tj.local.saveLocalStorageData(k, sum_data);
                    tj.wsconnection.pushmsg(msgac["ArenaUI_data_update"], {}, true);
                }else{
                    var msg = tj.cfg.get('text/pvp/mn_reset');
                    tj.wsconnection.pushmsg(msgac["ArenaUI_note_box"], {msg: msg}, true);
                }
                break;

            case msgac["Arena_failed"]: //匹配失败
                break;
            case msgac["Arena_unlock"]: //解锁竞技场入口
                tj.mainData.updateArenaData(data);
                tj.mainData.setClientData('new_arena', 1);
                tj.mainData.sendClientData('new_arena');
                tj.wsconnection.pushmsg(msgac["Main_refresh_new"], {}, true);
                tj.wsconnection.pushmsg(msgac["Main_refresh_button"], {}, true);
                break;

            case msgac["Arena_cleardone"]: //竞技场清榜
                tj.mainData.updateArenaData(data);
                var msg = tj.cfg.get('text/pvp/season_reset');
                tj.wsconnection.pushmsg(msgac["ArenaUI_note_box"], {msg:msg}, true);
                tj.wsconnection.pushmsg(msgac["ArenaUI_data_update"], {}, true);
                tj.wsconnection.pushmsg(msgac["Main_refresh_button"], {}, true);

                tj.mainData.setClientData('arena_reward', 1);
                tj.wsconnection.pushmsg(msgac["Main_refresh_new"], {}, true);
                break;

            case msgac["Arena_getreward"]: //领取奖励
                //c->s 领取竞技场清榜奖励 param={}
                //s->c  param={"ret":0成功 1已经领过奖励 2没有奖励 -1奖励配置出错 "rewards":[{id:,num:,sum:}]}
                tj.mainData.setClientData('arena_reward', 0);
                tj.wsconnection.pushmsg(msgac["Main_refresh_new"], {}, true);
                if(data) {
                    var msg = '';
                    switch(data.ret) {
                        case 0: //成功
                            //发奖
                            if (data.rewards) {
                                for (var i in data.rewards) {
                                    var reward = data.rewards[i];
                                    tj.mainData.addStroageItem(reward.id, reward.num); //加奖励物品
                                    msg = tj.mainData.getItemName(reward.id) + ' +' + reward.num;
                                    tj.wsconnection.pushmsg(msgac["ArenaUI_pop_msg"], {msg: msg}, true);
                                }
                                msg = '';
                            }
                            break;

                        case 1: //已领过
                            msg = tj.cfg.get('text/pvp/got_rewards');
                            break;

                        case 2: //没奖
                            msg = tj.cfg.get('text/pvp/no_rewards');
                            break;

                        default: //错误
                            msg = tj.cfg.get('text/pvp/err_rewards');
                            break;
                    }
                    if(msg) {
                        tj.wsconnection.pushmsg(msgac["ArenaUI_pop_msg"], {msg: msg}, true);
                    }
                }
                break;
        }
    },

    receivceUIMsg: function(obj) {
        var ac = obj[0];
        var data = obj[1];
        switch(ac) {
            case msgac["ArenaUI_timer_end"]: //竞技场入场倒计时结束
                if(this._fightData) {
                    fightData.fill(this._fightData);
                    this._fightData = null;
                    tj.pushScene(new cc.TransitionFade(1, createScene(fightLayer)));
                }
                break;

            case msgac["ArenaUI_status"]: //竞技场匹配状态变更
                //cc.log('----------- arenaUI_status: ');
                if(!this._layer) {
                    return;
                }
                cc.log(this._layer._basename);
                if(this._layer.arenaTip) {
                    this._layer.arenaTip();
                }
                break;

            case msgac["ArenaUI_pop_msg"]: //竞技场飘字
                //cc.log("++++++++++++++ ArenaUI_pop_msg: ", data.msg);
                createMainNoticeBox(data.msg);
                break;

            case msgac["ArenaUI_show_team"]: //竞技场对手已匹配，显示信息
                if(!this._layer) {
                    return;
                }
                if(isEmptyObject(data)) {
                    tj.sendErrLog({stack:'receivceUIMsg >> arenaLayer.js'}, 'ArenaUI_show_team: data err.', data);
                    return;
                }
                var layer = this._layer;
                var arenaReady = new arenaReadyLayer(data);
                arenaReady.init();
                layer.addChild(arenaReady);
                var z = -1;
                var childs = layer.getChildren();
                for(var i in childs){
                    if(childs[i].getLocalZOrder() > z){
                        z = childs[i].getLocalZOrder();
                    }
                }
                arenaReady.setLocalZOrder(z);
                //layer._curr_popLayer = arenaReady;
                break;
        }
    },

    removeNetMsg: function() {
        tj.wsconnection.removeGrp(this._netMsgFlag);
    },

    removeUIMsg: function(arenaParentUI) {
        if(arenaParentUI==this._layer) {
            this.setParentUI(null);
            tj.wsconnection.removeGrp(this._UIMsgFlag);
        }
    },

    isMatch: function() {
        return (tj.mainData.main.arena.matching);
    },

    doMatch: function() {
        tj.mainData.setArenaTeam(tj.mainData.getArenaTeam()); //每次排队前排除已阵亡、解雇的英雄。
        tj.wsconnection.setMsg(msgac["Arena_match"], {});
    },

    cancelMatch: function() {
        tj.wsconnection.setMsg(msgac["Arena_match_quit"], {}); //取消匹配
    },

    isArenaFight: function() {
        return this._start;
    },

    aReady: function() {
        this._ready = true;
    },

    isReady: function() {
        return this._ready;
    },

    test: function() {

        var pve = function() {
            cc.log('====== pve');
            tj.wsconnection.dispatchMsg(11300, {
                "bid": 208,
                "infos": [{
                    "fights": {
                        "0": {
                            "auto": true,
                            "buff": [],
                            "cd": 3400,
                            "curhp": 740,
                            "id": 22,
                            "idx": 0,
                            "job": 0,
                            "maxcd": 3400,
                            "maxhp": 740,
                            "mon_type": 0,
                            "name": "腐化行者",
                            "race": 2,
                            "tid": 0
                        },
                        "1": {
                            "auto": true,
                            "buff": [],
                            "cd": 3400,
                            "curhp": 740,
                            "id": 22,
                            "idx": 1,
                            "job": 0,
                            "maxcd": 3400,
                            "maxhp": 740,
                            "mon_type": 0,
                            "name": "腐化行者",
                            "race": 2,
                            "tid": 0
                        },
                        "2": {
                            "auto": true,
                            "buff": [],
                            "cd": 3400,
                            "curhp": 740,
                            "id": 22,
                            "idx": 2,
                            "job": 0,
                            "maxcd": 3400,
                            "maxhp": 740,
                            "mon_type": 0,
                            "name": "腐化行者",
                            "race": 2,
                            "tid": 0
                        }
                    }, "jokebuff": -1, "side": 1, "type": 0, "uid": 0
                }, {
                    "fights": {
                        "0": {
                            "auto": false,
                            "buff": [],
                            "cd": 1800,
                            "curhp": 1400,
                            "id": 163684,
                            "idx": 0,
                            "job": 402,
                            "maxcd": 1800,
                            "maxhp": 1400,
                            "mon_type": 0,
                            "name": "艾莉森",
                            "race": 1,
                            "tid": 65
                        },
                        "1": {
                            "auto": false,
                            "buff": [],
                            "cd": 2500,
                            "curhp": 560,
                            "id": 151689,
                            "idx": 1,
                            "job": 112,
                            "maxcd": 2500,
                            "maxhp": 560,
                            "mon_type": 0,
                            "name": "科瑞",
                            "race": 1,
                            "tid": 85
                        },
                        "2": {
                            "auto": true,
                            "buff": [],
                            "cd": 1700,
                            "curhp": 2620,
                            "id": 163849,
                            "idx": 2,
                            "job": 404,
                            "maxcd": 1700,
                            "maxhp": 2620,
                            "mon_type": 0,
                            "name": "卢维恩",
                            "race": 1,
                            "tid": 88
                        },
                        "3": {
                            "auto": false,
                            "buff": [],
                            "cd": 2000,
                            "curhp": 1790,
                            "id": 151691,
                            "idx": 3,
                            "job": 403,
                            "maxcd": 2000,
                            "maxhp": 1790,
                            "mon_type": 0,
                            "name": "瓦洛卡斯",
                            "race": 1,
                            "tid": 76
                        }
                    }, "jokebuff": 0, "side": 0, "type": 1, "uid": 81
                }],
                "pvp": false
            });
        };

        var arena_match = function() {
            cc.log('====== arena_match');
            tj.wsconnection.dispatchMsg(12310, {
                "m": {
                    "heros": [{"h": 163684, "j": 402, "t": 65}, {
                        "h": 152066,
                        "j": 400,
                        "t": 61
                    }, {"h": 163849, "j": 404, "t": 88}, {"h": 151691, "j": 403, "t": 76}],
                    "nick": "峰叔",
                    "point": 20,
                    "srv": 1,
                    "uid": 81
                },
                "t": {"heros": [{"h": 164753, "j": 11, "t": 65}], "nick": "啊哈", "point": 0, "srv": 1, "uid": 152781},
                "uid": 81
            });
        };

        var pve_pause = function() {
            cc.log('====== pve_pause');
            tj.wsconnection.dispatchMsg(11328, {});
        };

        var pvp = function() {
            cc.log('====== pvp');
            tj.wsconnection.dispatchMsg(11300, {
                "bid": -1,
                "infos": [{
                    "fights": {
                        "0": {
                            "auto": false,
                            "buff": [],
                            "cd": 2200,
                            "curhp": 80,
                            "id": 164753,
                            "idx": 0,
                            "job": 11,
                            "maxcd": 2200,
                            "maxhp": 80,
                            "mon_type": 0,
                            "name": "提雅",
                            "race": 1,
                            "tid": 65
                        }
                    }, "jokebuff": 0, "side": 1, "type": 1, "uid": 152781
                }, {
                    "fights": {
                        "0": {
                            "auto": false,
                            "buff": [],
                            "cd": 1800,
                            "curhp": 1400,
                            "id": 163684,
                            "idx": 0,
                            "job": 402,
                            "maxcd": 1800,
                            "maxhp": 1400,
                            "mon_type": 0,
                            "name": "艾莉森",
                            "race": 1,
                            "tid": 65
                        },
                        "1": {
                            "auto": false,
                            "buff": [],
                            "cd": 3200,
                            "curhp": 2970,
                            "id": 152066,
                            "idx": 1,
                            "job": 400,
                            "maxcd": 3200,
                            "maxhp": 2970,
                            "mon_type": 0,
                            "name": "斯蒂文斯",
                            "race": 1,
                            "tid": 61
                        },
                        "2": {
                            "auto": false,
                            "buff": [],
                            "cd": 1700,
                            "curhp": 2620,
                            "id": 163849,
                            "idx": 2,
                            "job": 404,
                            "maxcd": 1700,
                            "maxhp": 2620,
                            "mon_type": 0,
                            "name": "卢维恩",
                            "race": 1,
                            "tid": 88
                        },
                        "3": {
                            "auto": false,
                            "buff": [],
                            "cd": 2000,
                            "curhp": 1790,
                            "id": 151691,
                            "idx": 3,
                            "job": 403,
                            "maxcd": 2000,
                            "maxhp": 1790,
                            "mon_type": 0,
                            "name": "瓦洛卡斯",
                            "race": 1,
                            "tid": 76
                        }
                    }, "jokebuff": 0, "side": 0, "type": 1, "uid": 81
                }],
                "pvp": true
            });
        };


        (function(){
            setTimeout(pve, 0);
            setTimeout(arena_match, 500);
            setTimeout(pve_pause, 700);
            setTimeout(pvp, 900);
        })();
    }
};