/**
 * Created by likx on 2015/12/2.
 */

var select_hero_t = {"battle" : 0, "pvp": 1};
var selectHeroLayer = baseLayer.extend({
    _ui: 0,
    _p_xuanxiang: null,
    _tmpl: null,
    _p_anMop:null,
    _select_count:0,
    _cb: null,
    _selects: [],
    _select_type:0,

    ctor: function (f, team, type_from) {
        this._super();
        this._basename = "selecthero";
        this._cb = f;
        this._btn_heros = [];
        this._select_type = type_from;
        this._selects = [];
        if(team) {
            var i = 0;
            for(var k in team) {
                if(i>=4) {
                    break;
                }
                this._selects.push(team[k]);
                i++;
            }
        }
    },

    init: function () {
        if (!this._super())
            return false;
        this._ui = this.load_ui("uiSelect.json");
        if (!this._ui)
            return false;
        this.addChild(this._ui);

        this._p_xuanxiang = WidgetDig(this._ui, "main/list");
        this._p_anMop = WidgetDig(this._ui, "main/list/template/btnMain/mop/anMop");
        this._tmpl = WidgetDig(this._ui, "main/list/template");
        this._tmpl.removeFromParent(true);
        this.setRetain(this._tmpl, "uitmpl");
        this._p_xuanxiang.removeAllChildren();


        this.setContentString(WidgetDig(this._ui, "set/btnCancel/text"), tj.cfg.get("text_on_ui/team/cancelSelect"));
        WidgetDig(this._ui, "title/text").setString(tj.cfg.get("text_on_ui/team/select"));

        this.refresh_hero();

        return true;
    },

    refresh_hero:function(){
        var heros = tj.mainData.getOwnHeros();
        if(heros.length <= 0){
            var Text = new ccui.Text(tj.cfg.get("text/team/nomoreHero"), tj.cfg.get("designdata/design_fontName"),25);
            WidgetDig(this._ui,"main").addChild(Text);
            Text.setPosition(cc.p(cc.winSize.width/2-50,cc.winSize.height/2));
            return;
        }

        var select_team = tj.mainData.getClientData("select_team");
        for(var i in heros){
            var hero = heros[i];

            //隐藏出现在其他队伍中的英雄
            //var t = ["team", "team2", "team3"];
            //var hide = false;
            //for(var j in t){
            //    if(t[j] == select_team)
            //        continue;
            //    hide = tj.mainData.isHeroInTeam(hero.Id, t[j]);
            //    if(hide)
            //        break;
            //}
            //if(hide)
            //    continue;

            var p2 = this.get_hero(hero.Id);
            if (!p2){
                p2 = this._tmpl.clone();
                this._p_xuanxiang.pushBackCustomItem(p2);
            }
            var size =  WidgetDig(this._tmpl, "btnMain").getContentSize();
            WidgetDig(p2, "btnMain").setContentSize(size);
            size =  WidgetDig(this._tmpl, "btnMore").getContentSize();
            WidgetDig(p2, "btnMore").setContentSize(size);
            WidgetDig(p2, "imgSerial").setVisible(false);
            WidgetDig(p2, "btnMain/portraits/star").loadTexture(hero.StarIcon, ccui.Widget.PLIST_TEXTURE);
            WidgetDig(p2, "btnMain/portraits/level").loadTexture(hero.FrameIcon, ccui.Widget.PLIST_TEXTURE);
            WidgetDig(p2, "btnMain/portraits/icon").loadTexture(hero.Portraits, ccui.Widget.PLIST_TEXTURE);
            WidgetDig(p2, "btnMain/text/textName").setString(hero.Name+"·" + hero.JobName);
            WidgetDig(p2, "btnMain/text/textExplain").setString(tj.cfg.get("text_on_ui/level") + hero.Lv);
            WidgetDig(p2, "btnMain").heroid = hero.Id;
            WidgetDig(p2, "btnMore").heroid = hero.Id;
            WidgetDig(p2, "btnMore").opt = 1;
            WidgetDig(p2, "btnMain/status").setVisible(false);
            this.setContentString(WidgetDig(p2, "btnMore/text"), tj.cfg.get("text_on_ui/select"));
            p2.heroid = hero.Id;
            WidgetDig(p2, "btnMain/text/textSP").setString(tj.cfg.get("text_on_ui/SP") +hero.Energy);
            WidgetDig(p2, "btnMain/text/textScore").setString(tj.cfg.get("text_on_ui/score") + hero.Power);
            this._btn_heros.push(p2);

            WidgetDig(p2, "btnMain/serial/iconTeamA").setVisible(false);
            WidgetDig(p2, "btnMain/serial/iconTeamB").setVisible(false);
            WidgetDig(p2, "btnMain/serial/iconTeamC").setVisible(false);
            WidgetDig(p2, "btnMain/serial/iconTeamPVP").setVisible(false);
            WidgetDig(p2, "btnMain/serial/iconTeamMop").setVisible(false);
            if(this._select_type == select_hero_t.battle) {
                var kv = {};
                kv["team"] = "iconTeamA";
                kv["team2"] = "iconTeamB";
                kv["team3"] = "iconTeamC";
                for(var t in kv){
                   if (tj.mainData.isHeroInTeam(hero.Id, t))
                        WidgetDig(p2, "btnMain/serial/"+kv[t]).setVisible(true);
                }
                if (tj.mainData.isHeroInMop(hero.Id))
                    //WidgetDig(p2, "btnMain/serial/iconTeamMop").setVisible(true);
                    this.create_heromoping_ani(p2);
            }
            else if (this._select_type == select_hero_t.pvp) {
                if (tj.mainData.isHeroInPvpTeam(hero.Id, "team"))
                    WidgetDig(p2, "btnMain/serial/iconTeamPVP").setVisible(true);
            }
        }

        var select_count = 0;
        for(i in this._selects){
            var heroid = this._selects[i];
            var uihero  = this.get_hero(heroid);
            if(uihero){
                WidgetDig(uihero, "btnMain/status").setVisible(true);
                this.setContentString(WidgetDig(uihero, "btnMore/text"), tj.cfg.get("text_on_ui/cancel"));
                WidgetDig(uihero, "btnMore").opt = 2;
                select_count++;
                var texname = "ui/imgSerialPVP" + select_count + ".png";
                WidgetDig(uihero, "imgSerial").loadTexture(texname, ccui.Widget.PLIST_TEXTURE);
                WidgetDig(uihero, "imgSerial").setVisible(true);
            }
        }
        WidgetDig(this._ui, "set/btnCancel/text").setString(tj.cfg.get("text_on_ui/team/selectDone").format(select_count));
    },

    create_heromoping_ani:function(p2){
        var pos = this._p_anMop.getPosition();
        var parent = WidgetDig(p2,"btnMain/mop");
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

    isInSelect : function(heroid){
        for(var i=0;i<4;i++) {
            var id = this._selects[i];
            if(id == heroid)
                return true;
        }
        return false;
    },

    get_hero:function(heroid){
        for(var i in this._btn_heros){
            var uihero = this._btn_heros[i];
            if(uihero.heroid == heroid)
                return uihero;
        }
        return null;
    },

    defaultTouchButton : function(btn, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            switch (btn.getName()){
                case "btnClosed":
                    this.set_release();
                    break;
                case "btnCancel":
                    this._cb(this._selects);
                    this.set_release();
                    break;
                case "btnMain":
                    var hid = btn.heroid;
                    this._curr_popLayer = createCardHeroLayer(this, hid, heroCard_t.check);
                    break;
                case "btnMore":
                    if(btn.opt == 1) {
                        var add =  this.add_select(btn.heroid);
                        if(!add)
                            this.noticetext_add(tj.cfg.get("text/team/herofull"));
                        else{
                            this.setContentString(WidgetDig(btn, "text"), tj.cfg.get("text_on_ui/cancel"));
                            WidgetDig(btn.getParent(), "btnMain/status").setVisible(true);
                            btn.opt = 2;
                            this.refresh_hero();
                        }
                    }else{
                        this.setContentString(WidgetDig(btn, "text"), tj.cfg.get("text_on_ui/select"));
                        WidgetDig(btn.getParent(), "btnMain/status").setVisible(false);
                        btn.opt = 1;
                        this.del_select(btn.heroid);
                        this.refresh_hero();
                    }
                    break;
            }
        }
    },

    add_select:function(heroid){
        for(var i in this._selects) {
            var hid = this._selects[i];
            if(hid <= 0){
                this._selects[i] = heroid;
                return true;
            }
        }
        return false;
    },

    del_select:function(heroid){
        var find = -1;
        for(var i in this._selects) {
            var hid = this._selects[i];
            if(hid == heroid){
                find = parseInt(i);
                break;
            }
        }
        if(find >= 0){
            this._selects.splice(find, 1);
            this._selects.push(0);
        }
    }
});

function createHeroSelect(parent, f, team, type_from) {
    var pRet = new selectHeroLayer(f, team, type_from);
    if (pRet && pRet.init()) {
        var z = -1;
        var childs = parent.getChildren();
        for (var i = 0; i < childs.length; ++i) {
            if (childs[i].getLocalZOrder() > z)
                z = childs[i].getLocalZOrder();
        }
        pRet.setLocalZOrder(9999999);
        pRet._tjParent = parent;
        parent.addChild(pRet);
        return pRet;
    } else if (pRet)
        delete pRet;
    return null;
}
