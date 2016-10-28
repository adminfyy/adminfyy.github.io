/**
 * Created by likx on 2016/3/9.
 */

var rankingLayer = baseLayer.extend({
    _ui: 0,
    _selectType:0,
    _selectPage:0,
    _selectJob:0,
    _max_page:0,
    _showOcc:false,

    ctor: function (bagc,bagmax,items) {
        this._super();
        this._basename = "ranking";
    },

    init: function () {
        if (!this._super())
            return false;
        this._ui = this.load_ui("uiRanking.json");
        if (!this._ui)
            return false;
        this.addChild(this._ui);

        //this.create_control();

        this._p_herolist = WidgetDig(this._ui, "main/list");
        this._p_heromuban = WidgetDig(this._ui, "main/list/template");
        this.setRetain(this._p_heromuban, "uitmpl");
        this.setRetain(this._p_herolist, "uitmpl");
        this._p_herolist.removeAllChildren(true);

        WidgetDig(this._ui, "main/text/textRight").setVisible(false);
        WidgetDig(this._ui, "main/text/textLeft").setVisible(false);

        this._selectType = 0;
        if(tj.mainData.nick == "")
            this._curr_popLayer = createInputNameLayer(this, this.onInputName.bind(this));
        else
            tj.wsconnection.setMsg(msgac["Rank_get_rank"], {"type":this._selectType, "page":this._selectPage});

        tj.wsconnection.addGrp(msgac["Rank_nick_null"], msgac["Rank_get_rank"], this.process_ac.bind(this), this.get_scene_name());

        this.refreshOcc();
        return true;
    },

    on_touch_Ended: function (touches, event) {
        //this.showOccItem(false);
    },

    refreshOcc:function(){
        var jobTyoes = tj.cfg.get("designdata/jobTyoe");
        var list = WidgetDig(this._ui, "main/occ/list");
        var btn_tmp = WidgetDig(this._ui, "main/occ/list/all");
        this.setRetain(btn_tmp, "uitmpl");
        list.removeAllChildren(true);

        if(this._selectJob != 0){
            var p2 = btn_tmp.clone();
            list.pushBackCustomItem(p2);
            WidgetDig(p2, "text").setString(tj.cfg.get("text_on_ui/ut/joball"));
            p2.jobType = 0;
        }
        for(var i in jobTyoes){
            var jobttype = parseInt(i)+1;
            if(jobttype == this._selectJob)
                continue;
            p2 = btn_tmp.clone();
            list.pushBackCustomItem(p2);
            WidgetDig(p2, "text").setString(jobTyoes[i]);
            p2.jobType = jobttype;
        }
        this.showOccItem(false);

        switch (this._selectJob){
            case 0:
                WidgetDig(this._ui, "main/occ/btnOcc/text").setString(tj.cfg.get("text_on_ui/ut/joball"));
                break;
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
                jobTyoes = tj.cfg.get("designdata/jobTyoe");
                WidgetDig(this._ui, "main/occ/btnOcc/text").setString(jobTyoes[this._selectJob-1]);
                break;
        }
    },

    showOccItem:function(show){
        WidgetDig(this._ui, "main/occ/list").setVisible(show);
        this._showOcc = show;
    },

    onInputName : function(name){
        if(name != ""){
            tj.mainData.nick = name;
            if(tj.uidsinfo){
                for(var i in tj.uidsinfo){
                    var info = tj.uidsinfo[i];
                    if(info.Uid == tj.mainData.uid){
                        info.Nick = name;
                    }
                }
            }
            tj.wsconnection.setMsg(msgac["Rank_get_rank"], {"type":this._selectType, "page":this._selectPage});
        }else
            this.set_release();
    },

    defaultTouchButton : function(btn, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            switch(btn.getName()) {
                case "template":
                    if(this._selectType == 0 || this._selectType == 2)
                        this._curr_popLayer = createCardHeroLayer(this, btn.heroid, heroCard_t.rank);
                    else if(this._selectType == 1 && btn.heros.length)
                        this._curr_popLayer = createCardHeroLayer(this, btn.heros, heroCard_t.rank);
                    break;
                case "btnClosed":
                    this.set_release();
                    break;
                case "btnChange":
                    this._selectPage = 0;
                    if(this._selectType == 0 || this._selectType == 2)
                        this._selectType = 1;
                    else{
                        if(this._selectJob > 0)
                            this._selectType = 2;
                        else
                            this._selectType = 0;
                    }
                    tj.wsconnection.setMsg(msgac["Rank_get_rank"], {"type":this._selectType, "p":this._selectJob, "page":this._selectPage});
                    break;
                case "btnBase":
                    if(this._selectPage > 0){
                        this._selectPage--;
                        tj.wsconnection.setMsg(msgac["Rank_get_rank"], {"type":this._selectType, "p":this._selectJob, "page":this._selectPage});
                    }
                    break;
                case "btnValuable":
                    if(this._selectPage < this._max_page-1){
                        this._selectPage++;
                        tj.wsconnection.setMsg(msgac["Rank_get_rank"], {"type":this._selectType, "p":this._selectJob, "page":this._selectPage});
                    }
                    break;
                case "btnOcc":
                    this._showOcc = !this._showOcc;
                    this.showOccItem(this._showOcc);
                    break;
                case "all":
                    if(this._selectJob == btn.jobType)
                        break;
                    this._selectPage = 0;
                    this._selectJob = btn.jobType;
                    this.refreshOcc();
                    if(this._selectJob == 0)
                        this._selectType = 0;
                    else
                        this._selectType = 2;
                    tj.wsconnection.setMsg(msgac["Rank_get_rank"], {"type":this._selectType, "p":this._selectJob, "page":this._selectPage});
                    break;
            }
        }
    },

    refreshBestHero:function(data){
        WidgetDig(this._ui, "main/occ").setVisible(true);
        this.showOccItem(false);
        WidgetDig(this._ui, "title/textLevel").setString(tj.cfg.get("text_on_ui/ut/utbesthero"));
        WidgetDig(this._ui, "main/text/textRight").setVisible(false);
        WidgetDig(this._ui, "main/text/textLeft").setVisible(false);
        this._max_page = data.max_page;
        this._p_herolist.removeAllChildren(true);
        for (var h in data.most_heros) {
            var hero = data.most_heros[h];
            var p2 = this._p_heromuban.clone();
            this._p_herolist.pushBackCustomItem(p2);
            if (!p2)
                return false;

            p2.heroid = hero.Id;
            WidgetDig(p2, "num").setString(parseInt(h)+1);
            if(hero.Unick == "")
                hero.Unick = tj.cfg.get("text_on_ui/ranking/noname");
            if(hero.Uid == tj.mainData.uid){
                hero.Unick = tj.mainData.nick;
                WidgetDig(p2, "BG").setColor(cc.color("#8BFF8B"));
            }
            WidgetDig(p2, "name").setString(hero.Unick);
            var color = cc.color("#FFFFFF");
            switch(hero.Udivision){
                case 1:
                    color = cc.color("#FFFFFF");
                    break;
                case 2:
                    color = cc.color("#65BE65");
                    break;
                case 3:
                    color = cc.color("#6C92F4");
                    break;
                case 4:
                    color = cc.color("#D559D5");
                    break;
                case 5:
                    color = cc.color("#FAC159");
                    break;
            }
            WidgetDig(p2, "name").setColor(color);

            WidgetDig(p2, "score").setString(hero.Power);
            WidgetDig(p2, "textScore").setString(tj.cfg.get("text_on_ui/ut/power"));

            var row = tj.dbdata.getrow("job", hero.Job);
            if(row){
                var jobLv = row["jobLv"];
                var jobname = row["name"];
                WidgetDig(p2, "textName").setString(tj.cfg.get("text_on_ui/team/name").format(hero.Name, jobname));
                var starIcon = "ui/icon/iconStar" + jobLv + ".png";
                WidgetDig(p2, "portraits/star").setVisible(true);
                WidgetDig(p2, "portraits/star").loadTexture(starIcon, ccui.Widget.PLIST_TEXTURE);
            }
            row = tj.dbdata.getrow("racetemplate", hero.Tid);
            if(row){
                var ratings = row["ratings"];
                var frameIcon = "ui/icon/iconLevel" + ratings + ".png";
                WidgetDig(p2, "portraits/level").loadTexture(frameIcon, ccui.Widget.PLIST_TEXTURE);
                var  headPortraitIcon = "ui/icon/iconUnlock.png";
                if(row["protraits"])
                    headPortraitIcon = "ui/icon/heros/" + row["protraits"];
                WidgetDig(p2, "portraits/icon").loadTexture(headPortraitIcon, ccui.Widget.PLIST_TEXTURE);
            }
        }
    },

    refreshPVP:function(data){
        WidgetDig(this._ui, "main/occ").setVisible(false);
        WidgetDig(this._ui, "title/textLevel").setString(tj.cfg.get("text_on_ui/ut/utpvp"));
        WidgetDig(this._ui, "main/text/textRight").setVisible(true);
        WidgetDig(this._ui, "main/text/textLeft").setVisible(true);
        if(data && data.self_rank)
            WidgetDig(this._ui, "main/text/textRight").setString(tj.cfg.get("text_on_ui/ut/selfrank").format(data.self_rank.rank));
        WidgetDig(this._ui, "main/text/textLeft").setString(tj.cfg.get("text_on_ui/ut/selfpoint").format(tj.mainData.main.arena.point));
        this._max_page = data.max_page;
        this._p_herolist.removeAllChildren(true);
        for (var h in data.arena_rank) {
            var team = data.arena_rank[h];
            var p2 = this._p_heromuban.clone();
            this._p_herolist.pushBackCustomItem(p2);
            if (!p2)
                return false;

            p2.uid= team.Uid;
            p2.heros = team.Heros;
            WidgetDig(p2, "num").setString(parseInt(h)+1);
            if(team.Nick == "")
                team.Nick = tj.cfg.get("text_on_ui/ranking/noname");
            if(team.Uid == tj.mainData.uid) {
                team.Nick = tj.mainData.nick;
                WidgetDig(p2, "BG").setColor(cc.color("#00FF00"));
            }
            WidgetDig(p2, "name").setString(team.Nick);

            var pvpLV = "";
            if(team.Division){
                var d_lv = tj.cfg.get("designdata/pvpLv");
                pvpLV = d_lv[team.Division-1];
            }

            var color = cc.color("#FFFFFF");
            switch(team.Division){
                case 1:
                    color = cc.color("#FFFFFF");
                    break;
                case 2:
                    color = cc.color("#65BE65");
                    break;
                case 3:
                    color = cc.color("#6C92F4");
                    break;
                case 4:
                    color = cc.color("#D559D5");
                    break;
                case 5:
                    color = cc.color("#FAC159");
                    break;
                case 6:
                    color = cc.color("#FAC159");
                    break;
                case 7:
                    color = cc.color("#FAC159");
                    break;
            }
            WidgetDig(p2, "textName").setColor(color);
            WidgetDig(p2, "textName").setString(pvpLV);

            WidgetDig(p2, "score").setString(team.Point);
            WidgetDig(p2, "textScore").setString(tj.cfg.get("text_on_ui/ut/point"));
            WidgetDig(p2, "portraits/star").setVisible(false);

            var frameIcon = "ui/icon/iconLevel" + team.Division + ".png";
            WidgetDig(p2, "portraits/level").loadTexture(frameIcon, ccui.Widget.PLIST_TEXTURE);

            WidgetDig(p2, "portraits/icon").loadTexture(portrait_icon_default_path, ccui.Widget.PLIST_TEXTURE);
            if(team.hasOwnProperty("Portrait")){
                var headIconId = team.Portrait;
                if(headIconId > 0){
                    var headItem = tj.dbdata.getrow("portrait",headIconId);
                    if(headItem && headItem.icon) {
                        WidgetDig(p2, "portraits/icon").loadTexture(portrait_icon_pre_path + headItem.icon, ccui.Widget.PLIST_TEXTURE);
                    }
                }
            }
        }
    },

    process_ac : function(doc) {
        var msg_id = doc[0];
        var data = doc[1];
        switch (msg_id) {
            case msgac["Rank_nick_null"]:
                this._curr_popLayer = createInputNameLayer(this, this.onInputName.bind(this));
                break;
            case msgac["Rank_get_rank"]:
                if(data.type)
                    this._selectType = data.type;
                if(this._selectType == 0 || this._selectType == 2)
                    this.refreshBestHero(data);
                else
                    this.refreshPVP(data);
                break;
        }
    }
});

createRankingLayer = function(parent){
    var pRet = new rankingLayer();
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
};