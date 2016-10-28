/**
 * Created by lkx on 2015/11/20.
 * 招募英雄
 */


var recruitLayer = baseLayer.extend({
    _ui:null,
    _uitextTime:null,
    _uiloadingbar:null,
    _hlist:[],   //英雄数据表
    _goodheroA:0,
    _goodheroS:0,

    ctor : function(){
        this._basename = "recruit";
        this._goodheroA = 0;
        this._goodheroS = 0;
        this._super();
    },

    init : function() {
        if (!this._super())
            return false;
        var origin = cc.director.getVisibleOrigin();
        this._ui = this.load_ui("uiTavernRecruit.json");
        if (!this._ui)
            return false;

        this.addChild(this._ui);

        this._uitextTime = WidgetDig(this._ui, "main/heros/bar/textTime");
        this._uiloadingbar = WidgetDig(this._ui, "main/heros/bar/Loading");

        this.setContentString( WidgetDig(this._ui, "set/btnRefresh/text"),tj.cfg.get("text_on_ui/refresh"));

        for (var i=1; i<=3; ++i) {
            var uihero = WidgetDig(this._ui, "main/heros/list/hero" + i);
            if (uihero) {
                uihero.setVisible(false);
                WidgetDig(uihero, "portraits").setVisible(true);
            }
        }
        //时钟动画
        var ant = WidgetDig(this._ui, "main/heros/bar/anTime");
        var action = ant.actionManager.getActionByTag(ant.getTag(), ant);
        action.gotoFrameAndPlay(0);

        tj.wsconnection.setMsg(msgac["Tavern_list"]);
        tj.wsconnection.addGrp(msgac["Tavern_list"], msgac["Tavern_recruit"], this.process_ac.bind(this), this.get_scene_name());
        tj.wsconnection.addGrp(msgac["Layer_refresh_help"], msgac["Layer_refresh_help"], this.process_ac.bind(this), this.get_scene_name());

        tj.mainData.getTavern().load_refreshed = false;

        //explain
        WidgetDig(this._ui, "explain/title/text").setString(tj.cfg.get("text_on_ui/pub/explainTitle"));
        var rowc = tj.dbdata.getbysql("rateinfo",  "where (lv == '" + tj.mainData.getTavern().tavern_lv +"')")[0];
        var rown = tj.dbdata.getbysql("rateinfo",  "where (lv == '" + (tj.mainData.getTavern().tavern_lv+1) +"')")[0];
        var probability = "";
        var explainNext = tj.cfg.get("text_on_ui/pub/explainNext");
        if(rown){
            var nd = explainNext.format(rown.d);
            var nc = explainNext.format(rown.c);
            var nb = explainNext.format(rown.b);
            var na = explainNext.format(rown.a);
            var ns = explainNext.format(rown.s);
            var nss = explainNext.format(rown.ss);
            probability = tj.cfg.get("text_on_ui/pub/explainProbability").format(rowc.d, nd, rowc.c, nc, rowc.b, nb, rowc.a, na, rowc.s, ns, rowc.ss, nss);
        }else
            probability = tj.cfg.get("text_on_ui/pub/explainProbability").format(rowc.d, "", rowc.c, "", rowc.b, "", rowc.a, "", rowc.s, "", rowc.ss, "");
        WidgetDig(this._ui, "explain/probability").setString(probability);
        WidgetDig(this._ui, "explain/tag").setString(tj.cfg.get("text_on_ui/pub/tips"));

        this.refreshHelp();
        return true;
    },

    process_ac : function(doc){
        var msg_id = doc[0];
        var data = doc[1];
        switch(msg_id){
            case msgac["Tavern_list"]:
                tj.recruit_refresh_times = data.n;
                if(tj.mainData.getClientData("help")[4] !== 1){
                    WidgetDig(this._ui, "set/btnRefresh").setEnabled(true);
                    WidgetDig(this._ui, "set/btnRefresh").color = cc.color("#FFFFFF");
                }
                tj.mainData.next_hero_refreshtime = new Date(data.t);
                if(data.coincost) {
                    tj.mainData.setCoinNum(data.coincost.left);
                    this.noticetext_add(tj.cfg.get("text_on_ui/coin") + data.coincost.delta);
                }
                else if(data.gemcost) {
                    tj.mainData.setGemNum(data.gemcost.left);
                    this.noticetext_add(tj.cfg.get("text_on_ui/jewe") + data.gemcost.delta);
                }else if(data.itemcost){
                    tj.mainData.setItemNum(data.itemcost.id, data.itemcost.left);
                    var itemname = tj.mainData.getItemName(data.itemcost.id);
                    this.noticetext_add(itemname + " " +  data.itemcost.delta);
                }

                this._hlist = data.h;
                this._goodheroA = 0;
                this._goodheroS = 0;
                tj.mainData.updateOptionHero(data.h);
                var i = 0;
                for (var  h in this._hlist){
                    var uihero = WidgetDig(this._ui, "main/heros/list/hero"+(i+1));
                    uihero.setVisible(true);
                    var hero = this._hlist[h];
                    if(hero && !hero.Recruited)
                    {
                        WidgetDig(uihero, "btnMore").setTouchEnabled(true);
                        WidgetDig(uihero, "portraits").setVisible(true);
                        WidgetDig(uihero, "portraits/star").setVisible(true);
                        WidgetDig(uihero, "text").setVisible(true);
                        WidgetDig(uihero, "btnMore/textGrowth").setVisible(true);
                        WidgetDig(uihero, "btnMore/textProfession").setVisible(true);
                        WidgetDig(uihero, "btnMore").heroidx = i;
                        WidgetDig(uihero, "btnMore").heroid = hero.Id;
                        WidgetDig(uihero, "btnMore").Tid = hero.Tid;
                        this.setContentString(WidgetDig(uihero, "btnMore/textName"), hero.Name);
                        WidgetDig(uihero, "btnMore/textName").setColor(hero.Color);
                        WidgetDig(uihero, "btnMore/textProfession").setString(hero.JobName);
                        WidgetDig(uihero, "btnMore/textProfession").setColor(hero.Color);
                        WidgetDig(uihero, "portraits/star").loadTexture(hero.StarIcon, ccui.Widget.PLIST_TEXTURE);
                        WidgetDig(uihero, "portraits/level").loadTexture(hero.FrameIcon, ccui.Widget.PLIST_TEXTURE);
                        WidgetDig(uihero, "portraits/icon").loadTexture(hero.Portraits, ccui.Widget.PLIST_TEXTURE);
                        WidgetDig(uihero, "btnMore/textGrowth").setString(tj.cfg.get("text_on_ui/growup")+hero.RatingsName);
                        WidgetDig(uihero, "btnMore/textGrowth").setColor(hero.Color);
                        //goodhero 1 A级英雄没点不再提醒 2 A级英雄已点不再提醒 3 S级英雄
                        if(hero.Ratings == 4){
                            if(tj.local.getLocalStorageData("recruitA"))
                                this._goodheroA = 1;
                            else
                                this._goodheroA = 2;
                        }
                        else if(hero.Ratings >= 5)
                            this._goodheroS = 1;

                        WidgetDig(uihero, "text").setVisible(false);
                    }else{
                        this.setContentString(WidgetDig(uihero, "btnMore/textName"), tj.cfg.get("text/pub/null_table"));
                        WidgetDig(uihero, "btnMore/textName").setColor(cc.color.WHITE);
                        WidgetDig(uihero, "portraits").setVisible(false);
                        WidgetDig(uihero, "text").setVisible(false);
                        WidgetDig(uihero, "btnMore/textGrowth").setVisible(false);
                        WidgetDig(uihero, "btnMore/textProfession").setVisible(false);
                        WidgetDig(uihero, "btnMore").setTouchEnabled(false);
                    }
                    i++;
                }
                break;
            case msgac["Tavern_recruit"]:
                var index = data.idx;
                var p = data.p;
                var ret = data.ret;
                switch(ret)
                {
                    case 0:
                    {
                        var uihero = WidgetDig(this._ui, "main/heros/list/hero" + (index+1));
                        if (uihero)
                            uihero.setVisible(false);
                        if(p == 0)
                            tj.mainData.setCoinNum(data.ext.left);
                        else
                            tj.mainData.setGemNum(data.ext.left);
                        tj.mainData.updataHero(data.hero);
                        tj.wsconnection.pushmsg(msgac["Layer_refresh_hero"], {"force":1});
                        tj.wsconnection.pushmsg(msgac["Pub_refresh_ui"]);
                        createMainNoticeBox(tj.cfg.get("text/pub/recruit_succ").format(data.hero.Name));

                        tj.mainData.addClientData("new_h", data.hero.Id);
                    }break;
                    case 1:
                        this.noticetext_add(tj.cfg.get("text/notrecruit"));
                        break;
                    case 10:
                        this.noticetext_add(tj.cfg.get("text/heroerr"));
                        break;
                    case 20:
                        this.noticetext_add(tj.cfg.get("text/herofull"));
                        break;
                    case 30:
                        var msg = tj.cfg.get("text/notgold");
                        if(p == 1)
                            msg = tj.cfg.get("text/notdiamond");
                        this.noticetext_add(msg, true);
                        break;
                }
                if(tj.mainData.getClientData("help")[4] == 1) {
                    //if(ret == 0 || ret == 20){
                        tj.mainData.setClientDataValue("help", 4, 2);
                        this.refreshHelp();
                    //}
                }
                if(this._curr_popLayer && this._curr_popLayer.get_scene_name() == "cardhero")
                    this._curr_popLayer.set_release();
                break;
            case msgac["Tavern_refresh"]:
                var ret = data.ret;
                var require_coins = data.ret;
                WidgetDig(this._ui, "set/btnRefresh").setEnabled(true);
                WidgetDig(this._ui, "set/btnRefresh").color = cc.color("#FFFFFF");
                if(ret == 10) {
                    var msg = '';
                    msg = (data.opt==1)?tj.cfg.get("text/notgold"):tj.cfg.get("text/notdiamond");
                    if(msg) {
                        this.noticetext_add(msg);
                    }
                }
                break;
            case msgac["Layer_refresh_help"]:
                this.refreshHelp();
                break;
        }
    },

    on_ws_reopen:function(){
        tj.wsconnection.setMsg(msgac["Tavern_list"]);
    },

    defaultTouchButton : function(btn, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            if (btn.getName() == "btnClosed"){
                this.set_release();
            }
            else if(btn.getName() == "btnMore"){
                var id = btn.heroid>0?btn.heroid:btn.heroidx;
                this._curr_popLayer = createCardHeroLayer(this, id, heroCard_t.recruit);
                if(this._curr_popLayer)
                    tj.waitrecruit = true;
            }
            else if(btn.getName() == "btnRefresh"){
                if(this._goodheroA == 1 || this._goodheroS == 1){
                    var s = tj.cfg.get("text/tavern/good_hero");
                    var msgbox = createMsgBox2(this, s, function(tag){
                        if(tag == 0)
                            this.tavernRefresh(true);
                        else if(tag == 1){
                            tj.local.saveLocalStorageData("recruitA", false);
                            this._goodheroA = 2;
                            this.tavernRefresh(true);
                        }
                        return true;
                    }.bind(this));
                    msgbox.add_btn(tj.cfg.get("text_on_ui/ok"), 0, 3);
                    if(this._goodheroA == 1)
                        msgbox.add_btn(tj.cfg.get("text_on_ui/noremind"), 1, 3);
                    msgbox.add_btn(tj.cfg.get("text_on_ui/cancel"), 2);
                }
                else if(this._goodheroA == 2)
                    this.tavernRefresh(true);
                else
                    this.tavernRefresh(false);
            }
        }
    },

    tavernRefresh:function(force){
        var s1 = tj.cfg.get("text/tavern/refresh_hero");
        var row = tj.dbdata.getbysql("tavernfee",  "where (times == '" + (tj.recruit_refresh_times+1) +"')")[0];
        if(!row){
            var rows = tj.dbdata.gettable("tavernfee");
            row = tj.dbdata.getbysql("tavernfee",  "where (times == '" + rows.length +"')")[0];
        }
        var needname1 = tj.cfg.get("text_on_ui/coin");
        var needname2 = tj.cfg.get("text_on_ui/jewe");
        var needstr1 = tj.cfg.get("text/tavern/pay").format(row["coinCost"], needname1);
        var needstr2 = tj.cfg.get("text/tavern/pay").format(row["gemCost"], needname2);
        var msgbox = createMsgBox2(this, s1, function(tag){
            if (tag == 0)
                tj.wsconnection.setMsg(msgac["Tavern_refresh"], {"opt":1, "forace":force});
            else if(tag == 1)
                tj.wsconnection.setMsg(msgac["Tavern_refresh"], {"opt":2, "forace":force});
            else if(tag == 2)
                tj.wsconnection.setMsg(msgac["Tavern_refresh"], {"opt":3, "forace":force});
            if(tag != 3){
                WidgetDig(this._ui, "set/btnRefresh").setEnabled(false);
                WidgetDig(this._ui, "set/btnRefresh").color = cc.color("#888888");
            }
            return true;
        }.bind(this));
        msgbox.add_btn(needstr1, 0);
        msgbox.add_btn(needstr2, 1);
        //招募劵
        var legend_coupon_id = tj.cfg.getAttr("designdata/itemID", "legend_coupon", "");
        if(tj.mainData.getItemNum(legend_coupon_id) > 0){
            var needstr3 = tj.cfg.get("text/tavern/pay_coupon").format(tj.mainData.getItemName(legend_coupon_id));
            msgbox.add_btn(needstr3, 2);
        }
        msgbox.add_btn(tj.cfg.get("text_on_ui/cancel", ""), 3);
    },

    lockUI:function(lock){
        WidgetDig(this._ui, "set/btnClosed").setEnabled(!lock);
        WidgetDig(this._ui, "set/btnRefresh").setEnabled(!lock);
    },

    refreshHelp:function() {
        if (this._helphand)
            this._helphand.stop();
        this.lockUI(false);

        if(tj.mainData.isHelpDone())
            return;

        //新手（酒馆阶段）
        if(tj.mainData.getClientData("help")[4]==1) {
            this.lockUI(true);

            var note = createNoteBox(this, tj.cfg.get("text/help/pub3"), form_t.castleLayer);
            note.setPos(375, 550);
        }else if(tj.mainData.getClientData("help")[4]==2) {
            this.lockUI(true);

            var btn = WidgetDig(this._ui, "set/btnClosed");
            btn.setEnabled(true);
            var btnworld = btn.convertToWorldSpace(cc.p(0, 0));
            pos = this._ui.convertToNodeSpace(btnworld);
            pos.x += btn.getContentSize().width/2;
            pos.y += btn.getContentSize().height/2;
            this.load_helphand(this, "click");
            this._helphand.setpos(pos.x, pos.y);
        }
    },

    update : function(delta) {
        this._super();

        if(this._uitextTime)
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


    onExit:function(){
        this._super();
        if(tj.mainData.getClientData("help")[4] == 2){
            tj.wsconnection.pushmsg(msgac["Layer_refresh_help"]);
        }
        tj.waitrecruit = false;
    }
});


createRecruitLayer = function(parent){
    var pRet = new recruitLayer();
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
 * Created by likx on 2015/11/20.
 */
