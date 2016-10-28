/**
 * Created by faps on 2016/8/2.
 */

var arenaReadyLayer = baseLayer.extend({

    _data : null,
    _my_data : null,
    _enemy_data : null,
    _times: 5,
    ctor: function (data) {
        this._super();
        this._basename = 'arenaReady';

        this._data = data;
    },

    init: function () {
        if (!this._super())
            return false;
        this._ui = this.load_ui("uiPKReady.json");
        if (!this._ui)
            return false;

        if(this._data && this._data.t) {
            if (this._data['t']['uid'] == tj.mainData.uid) {
                this._my_data = this._data['t'];
                this._enemy_data = this._data['m'];
            } else {
                this._my_data = this._data['m'];
                this._enemy_data = this._data['t'];
            }

            this._hero_tpl = WidgetDig(this._ui, "main/opp/btnHero");
            this.setRetain(this._hero_tpl, "uitmpl");
            //this._hero_tpl.retain();
            this.updateUI();
            this.addChild(this._ui);
        }
    },

    _getDataObj: function(t) {
        var re = {};
        var attrs = ['heros', 'nick', 'point', 'srv', 'tids', 'uid'];
        for(var k in attrs) {
            var key = attrs[k];
            re[key] = this._data[t+key];
        }
        return re;
    },

    _getHeroInfo: function(data) {
        var re = {
            Tid: data.t,
            Job: data.j,
            StarIcon: '',
            FrameIcon: '',
            Portraits: '',
            JobName: ''
        };
        tj.mainData.queryHeroInfo(re);
        return re;
    },

    updateUI : function() {
        //播放音效
        tj.audio.playEffect('res/art/sound/se/MedievalWin.mp3', false);

        var ready_bar = WidgetDig(this._ui, "main/ready");
        if(ready_bar && this._enemy_data && this._my_data) {
            var str = tj.cfg.get("text/pvp/point2");
            WidgetDig(ready_bar, 'textOpp').setString(this._enemy_data.nick); //对手昵称
            WidgetDig(ready_bar, 'oppIntegral').setString(str.format(this._enemy_data.point)); //对手积分

            WidgetDig(ready_bar, 'textUs').setString(this._my_data.nick); //昵称
            WidgetDig(ready_bar, 'usIntegral').setString(str.format(this._my_data.point)); //积分
        }
        this.updateUITimer();
        this.updateUITeam();

        this._timer = setInterval(this.updateUITimer.bind(this), 1000);
    },

    updateUITimer : function() {
        cc.log('timer update', this._times);
        tj.audio.playEffect('res/art/sound/se/countdown.mp3', false);
        WidgetDig(this._ui, "main/ready/textTime").setString(this._times); //倒计时
        if(this._times<=0) {
            arenaMsgHelper.aReady();
            tj.wsconnection.pushmsg(msgac['ArenaUI_timer_end']);
            clearInterval(this._timer);
            this.removeFromParent();
            return;
        }
        this._times--;
    },

    updateUITeam: function() {
        var team_area = WidgetDig(this._ui, "main/opp");
        team_area.removeAllChildren();
        var team_data = this._enemy_data;
        for(var i in team_data.heros) {
            var herodata = team_data.heros[i];
            var heroinfo = this._getHeroInfo(herodata);
            if(heroinfo) {
                team_area.addChild(this.createHeroBtn(heroinfo));
            }
        }
        formation(team_area, 30, 'avg');

        team_area = WidgetDig(this._ui, "main/us");
        team_area.removeAllChildren();
        team_data = this._my_data;
        for(var i in team_data.heros) {
            var herodata = team_data.heros[i];
            var heroinfo = this._getHeroInfo(herodata);
            if(heroinfo) {
                team_area.addChild(this.createHeroBtn(heroinfo));
            }
        }
        formation(team_area, 30, 'avg');
    },

    createHeroBtn: function(info) {
        var btn = this._hero_tpl.clone();
        WidgetDig(btn, "portraits/star").loadTexture(info.StarIcon, ccui.Widget.PLIST_TEXTURE);
        WidgetDig(btn, "portraits/level").loadTexture(info.FrameIcon, ccui.Widget.PLIST_TEXTURE);
        WidgetDig(btn, "portraits/icon").loadTexture(info.Portraits, ccui.Widget.PLIST_TEXTURE);
        WidgetDig(btn, "textPro").setString(info.JobName); //职业
        return btn;
    },

    onEnter: function () {
        this._super();
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
                        this.removeFromParent();
                        break;
                }
                break;

            case ccui.Widget.TOUCH_CANCELED:  //取消
                break;
        }
    }
});
