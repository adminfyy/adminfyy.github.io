/**
 * Created by likx on 2016/8/29.
 */

/**@cosnt */ var TEAM_HP_ANIMATE_TAG = 20001;

var teamBoxLayer = baseLayer.extend({
    _heroinfo:[],
    _teamView:null,
    _teamTmpl:null,
    _show:false,
    _need_to_rm : {},
    _ctlList:{},

    ctor: function(){
        this._super();
        this._basename = "teambox";
        this._beTop = false;
        this.init();
    },

    init:function(){
        if (!this._super())
            return false;

        this._ui = this.load_ui("boxTeam.json");
        if (!this._ui)
            return false;
        this.addChild(this._ui);

        this._teamView = this._ui;
        this._teamTmpl = WidgetDig(this._teamView, "heros/hero1");
        this._teamView.setVisible(false);
        this.setRetain(this._teamView, "uitmpl");
        this.setRetain(this._teamTmpl, "uitmpl");
        var ani = WidgetDig(this._teamTmpl, "animation");
        this.setRetain(ani, "uitmpl");
        replaceNodeWithWidget(ani);

        if (cc.tj.ACTIVE === true) {
            switch (cc.tj.PTYPE) {
                case P_TYPE_WID:
                    var heros = WidgetDig(this._teamView, "heros");
                    if (heros !== null) {
                        heros.setScale(cc.tj.SCALE);
                    }
                    break;
            }
        }
        return true;
    },

    setData:function(heros, buff_attr){
        this._show = false;
        this._heroinfo = [];
        this._ctlList = {};
        if(heros){
            for(var i in heros){
                var hero = heros[i];
                var heroinfo = tj.mainData.getOwnHeroById(hero.id);
                if(heroinfo){
                    heroinfo.Hp_now = hero.hp;
                    heroinfo.Buff_Attr = buff_attr;
                    heroinfo.Battle_Index = this.get_battle_index(hero.id);
                    this._heroinfo.push(heroinfo);
                }
            }
        }
        this._heroinfo.sort(function(a,b){return a["Battle_Index"] > b["Battle_Index"];});
        var team_area = WidgetDig(this._teamView, "heros");
        team_area.removeAllChildren();
        for(var j in this._heroinfo){
            var ctl = this._teamTmpl.clone();
            team_area.addChild(ctl);
            this.setRetain(ctl, "uitmpl");
            var btnHero = WidgetDig(ctl, "btnHero");
            WidgetDig(ctl, "btnAuto").setVisible(false);
            heroinfo = this._heroinfo[j];
            this.create_hero_ani(ctl,heroinfo.Figure);

            //矮人位置
            var portait = WidgetDig(ctl, "animation");
            if(parseInt(heroinfo.Race)==2)
                portait.setPositionY(-210);
            else
                portait.setPositionY(-346.84);
            if(heroinfo){
                btnHero.heroId = heroinfo.Id;
                WidgetDig(btnHero, "textName").setString(heroinfo.Name);
                WidgetDig(btnHero, "textHp").setString(heroinfo.Hp_now);
                WidgetDig(btnHero, "status").setVisible(false);
                WidgetDig(btnHero, "grayed").setVisible(false);
                var percent = heroinfo.Hp_now / heroinfo.Hp_Max * 100;
                percent = Math.min(percent, 100);
                WidgetDig(btnHero, "barHp").setPercent(percent);
                WidgetDig(btnHero, "barCd").setVisible(false);
                WidgetDig(btnHero, "select").setVisible(false);

            }
            WidgetDig(ctl, "buff").setVisible(false);
            //heroinfo.ctl = ctl;
            this._ctlList[heroinfo.Id] = ctl;
        }
        formation(team_area); //横向居中对齐
        return true;
    },

    defaultTouchButton : function(btn, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            switch (btn.getName()) {
                case "btnHero":
                    if(btn.heroId){
                        if(Map_Layer && Map_Layer.isStatus(map_state.camp))
                            this._curr_popLayer = createCardHeroLayer(this, btn.heroId, heroCard_t.camp);
                        else
                            this._curr_popLayer = createCardHeroLayer(this, btn.heroId, heroCard_t.check);
                    }
                    break;
            }
        }
    },

    get_battle_index:function(heroid){
        var data = tj.mainData.getBattleHero();
        for(var i in data){
            var hid = data[i];
            if(hid == heroid)
                return i;
        }
        return -1;
    },

    buff_attr:function(attr){
        for(var i in this._heroinfo){
            var hero = this._heroinfo[i];
            hero.Buff_Attr = attr;
        }
    },

    show:function(t){
        if(t)
            this._teamView.setVisible(t);
        else
            this._teamView.setVisible(this._show);
    },

    hide:function(){
        this._teamView.setVisible(false);
        this._show = false;
    },

    trigger:function(){
        this._show = !this._show;
        this._teamView.setVisible(this._show);
    },

    onExit:function(){
        this._super();
        this._need_to_rm = {};
    },

    refresh_hero:function(heros, animate){
        var get_hero = function (id) {
            for(var j in this._heroinfo){
                var hero = this._heroinfo[j];
                if(hero.Id == id)
                    return hero;
            }
            return null;
        }.bind(this);

        if(heros){
            for(var i in heros){
                var hero = heros[i];
                var heroinfo = get_hero(hero.id);
                if(heroinfo){
                    heroinfo.Hp_delta = hero.hp - heroinfo.Hp_now;
                    heroinfo.Dead = hero.dead;
                    heroinfo.Hp_now = hero.hp;
                }
            }
        }

        for(var j in this._heroinfo){
            heroinfo = this._heroinfo[j];
            //var ctl = heroinfo.ctl;
            var ctl = this._ctlList[heroinfo.Id];
            var btnHero = WidgetDig(ctl, "btnHero");
            if(heroinfo){
                if(heroinfo.Dead)
                    ctl.setVisible(false);
                else{
                    WidgetDig(btnHero, "textName").setString(heroinfo.Name);
                    WidgetDig(btnHero, "textHp").setString(heroinfo.Hp_now);
                    var percent = heroinfo.Hp_now / heroinfo.Hp_Max * 100;
                    percent = Math.min(percent, 100);
                    WidgetDig(btnHero, "barHp").setPercent(percent);
                }
            }
            var animation =  WidgetDig(ctl, "animation");
            if(animation && animation.portait) {
                animation.stopAllActions();
                animation.runAction(animation.portait.action);
            }
        }
        var team_area = WidgetDig(this._teamView, "heros");
        formation(team_area); //横向居中对齐

        //血量变化动画
        if(animate){
            var team_parent = this._teamView.getParent();
            for(var j in this._heroinfo) {
                heroinfo = this._heroinfo[j];
                if(!heroinfo.Dead && heroinfo.Hp_delta != 0){
                    //ctl = heroinfo.ctl;
                    ctl = this._ctlList[heroinfo.Id];
                    var p = cc.p(ctl.getPosition().x + 94, ctl.getPosition().y + 80);
                    var p2 = cc.pAdd(p, cc.p(20, 150));
                    this.hpAnimate(this._teamView, p, p2, heroinfo.Hp_delta, 0);
                    heroinfo.Hp_delta = 0;
                }
            }
        }
    },

    create_hero_ani:function(ctl, figure){
        var animation =  WidgetDig(ctl, "animation");
        animation.removeAllChildren();
        var self = this;
        tj.mainData.loadAnimate(figure, function(portait){
            animation.addChild(portait.node);
            portait.node.stopAllActions();
            portait.action.pause();
            self.setRetain(portait.node, "uitmpl");
            self.setRetain(portait.action, "uitmpl");
            portait.action.play("standby", true);
            animation.runAction(portait.action);
            animation.portait = portait;
        });
    },

    hpAnimate: function(parent, startPosition, endPosition, hp, sc) {
        //var label = new ccui.Text("", RES_PATH + "Font/msyhbd.ttf", 40);
        var label = new cc.LabelTTF("", "Arial", 40);
        this._need_to_rm['txt_'+label.getTag()] = label;
        label.setLocalZOrder(1000);
        if (hp > 0) {
            label.setString("+" + hp);
            label.setColor(cc.color(0, 255, 0, 1));
        }else if (hp < 0) {
            label.setString("-" + Math.abs(hp));
            label.setColor(cc.color(255, 0, 0, 1));
        }else if(hp==0) {
            label.setString("0");
            label.setColor(cc.color(255, 255, 255, 1));
        }else{
            label.setString("Miss");
            label.setColor(cc.color(255, 255, 255, 1));
        }
        var that = this;
        var cb = cc.callFunc(function(){
            that._need_to_rm['txt_'+label.getTag()] = null;
            label.removeFromParent();
        }, this);

        label.setPosition(startPosition);
        var fade = cc.fadeOut(1.5);
        var move = cc.moveTo(1.5, endPosition);
        if(sc) {
            var scale = cc.scaleTo(0.05, 6);
            var scale2 = cc.scaleTo(0.2, 1.5);
            var sp = cc.spawn(fade, move, cc.sequence(scale, scale2));
        }else {
            var sp = cc.spawn(fade, move);
        }
        var seq = cc.sequence(sp, cb);
        label.runAction(seq);
        parent.addChild(label, 0, TEAM_HP_ANIMATE_TAG);
    },

    clear:function(){
        if(this._teamView && this._teamView.getChildByTag(TEAM_HP_ANIMATE_TAG))
            this._teamView.removeChildByTag(TEAM_HP_ANIMATE_TAG, true);
        //把需要remove的节点统统rm
        //for (var i in this._need_to_rm) {
        //    if(this._need_to_rm[i]) {
        //        this._need_to_rm[i].removeFromParent();
        //        this._need_to_rm[i] = null;
        //    }
        //}
        //this._need_to_rm = {};
    }
});

createTeamBoxLayer = function(parent, heros, buff_attr){
    var pRet = LayerCacheMgr.getInstance().getLayer("teambox");
    if (pRet.getParent() !== null) {
        pRet.removeFromParent();
    }
    if (pRet){
        if(heros)
            pRet.setData(heros, buff_attr);
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