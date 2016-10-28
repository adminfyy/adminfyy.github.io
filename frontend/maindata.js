/**
 * Created by likx on 2015/11/27.
 */


var MainData = function(maindata){

    this.main = maindata;
    this.next_hero_refreshtime = 0;
    this.unLockBlueprintList = [];
    this.item_info = {};
    this.equip_info = {};
    this.rank_equip_info = {}; //排行榜英雄装备信息
    this.ranking_heros = [];

    this.nick = maindata.Nick;
    this.uid = maindata.Uid;
    this._animation_cache = {};

    this.sellProductsArray = [];
    this._arena_team_key = 'arenaTeam';

    this.init = function(){
        manorData.init();
        manorData.fill(this.main.manor); //庄园数据
        this.main.manor = manorData;

        this.next_hero_refreshtime = new Date(this.getTavern().refresh_time);
        tj.log("uid = " + this.main.Uid);

        for (var i in this.main.equip_info) {
            var equip = this.main.equip_info[i];
            this.queryEquipInfo(equip);
            this.equip_info[equip.id] = equip;
        }

        for (var h in this.main.tavern.heros) {
            var hero = this.main.tavern.heros[h];
            this.queryHeroInfo(hero);
        }
        this.sortHeros(this.main.tavern.heros);

        for (h in this.main.tavern.optionheros) {
            hero = this.main.tavern.optionheros[h];
            this.queryHeroInfo(hero);
        }

        for (h in this.main.cemetery.dead_heros) {
            hero = this.main.cemetery.dead_heros[h];
            this.queryHeroInfo(hero);
        }
        this.sortHeros(this.main.cemetery.dead_heros);

        //this.queryStorageItemInfo();
        this.unlockBlueprint(); //获取解锁蓝图ID

        this.clientDataClear("new_l");
        if(this.main.mailbox.unread)
            this.addClientData("new_l", this.main.mailbox.unread);

        if(this.main.sell_products != undefined){
            this.sellProductsArray = this.main.sell_products;
            this.sellProductsArray.sort(function(a,b){
                return a.Price > b.Price;
            });
        }

        tj.eventTimer.add_itval_timer("1001", 1000, true, this.update.bind(this));

        //断线重连后 刷新当前场景
        var p = tj.toplayer;
        while(p && p.on_ws_reopen){
            p.on_ws_reopen();
            p = p.getParent();
        }

        tj.changeHide(0);

        tj.gamedata_load = true;

        if (this.main.hasOwnProperty("setting")) {
            for (var p in this.main.setting) {
                tj.setting[p] = this.main.setting[p];
            }
        }

        tj.wsconnection.pushmsg(msgac["Game_data_rec_success"]);

        //地图设施保存信息优化
        var local_facis  = tj.local.getLocalStorageData("faci");
        if(local_facis && local_facis.length){
            var map_facis = [];
            for(var i in local_facis) {
                var faci = local_facis[i];
                if(!map_facis.hasOwnProperty(faci.mapid))
                    map_facis[faci.mapid] = [];
                map_facis[faci.mapid].push(faci);
            }

            for(i in map_facis){
                var mapid = i;
                tj.local.saveLocalStorageData("faci_map"+mapid, map_facis[i]);
            }
            tj.local.saveLocalStorageData("faci", []);
        }

        //竞技场奖励
        if (this.main.hasOwnProperty("arena")) {
            if(this.main.arena.reward >= 0)
                tj.mainData.setClientData('arena_reward', 1);
        }

        //挂机时间
        var expeditions = tj.mainData.main.expeditions;
        if(expeditions){
            for (var i in expeditions.quests) {
                var quest = expeditions.quests[i];
                quest.state = 0;
                if(quest.remains > 0){
                    var now = new Date();
                    quest.endtime = new Date(now.valueOf() + quest.remains*1000);
                    quest.state = 1;
                }else if(quest.remains == 0)
                    quest.state = 2;
            }
            expeditions.quests.sort(function(a,b){
                return a.qid > b.qid;
            });
        }
        return null;
    };

    this.update = function(){
        var now = new Date();
        var maketRefreshTime = new Date(this.getMarketList().auto_t);
        var diff = maketRefreshTime - now;
        if(diff<=0) {
            tj.wsconnection.setMsg(msgac["Market_list"]);
            this.getMarketList().auto_t = new Date(now.valueOf() + 2 * 60 * 1000);
        }

        var pubReFreshTime = new Date(this.next_hero_refreshtime);
        var diffPub = pubReFreshTime - now;
        if(diffPub<=0){
            if(tj.waitrecruit){
                cc.log("wait recruit!");
            }else{
                this.next_hero_refreshtime = new Date(now.valueOf() + 2 * 60 * 1000);
                tj.wsconnection.setMsg(msgac["Tavern_list"]);
                tj.mainData.getTavern().load_refreshed = true;
            }
        }

        //当天零点判定
        if(tj.today_zerotime == 0){
            var date = new Date();
            date.setHours(23);
            date.setMinutes(59);
            date.setSeconds(59);
            date.setMilliseconds(999);
            tj.today_zerotime = date;
        }else{
            var lefttime = tj.today_zerotime - now;
            //cc.log("update " + Math.floor(lefttime/1000));
            if(lefttime <= 0){
                tj.today_zerotime = 0;
                var month_card = tj.mainData.main.month_card;
                if(tj.mainData.main.expeditions)
                    tj.mainData.main.expeditions.expedition_time = tj.mainData.main.expeditions.daily_t;
                if(month_card && month_card.remain_days > 0){
                    month_card.remain_days --;
                    month_card.get = false;
                    tj.wsconnection.pushmsg(msgac["Main_refresh_new"]);
                    //挂机时间重置
                    if(tj.mainData.main.expeditions){
                        tj.mainData.main.expeditions.expedition_time = tj.mainData.main.expeditions.vip_daily_t;
                    }
                }
            }
        }

        //if(tj.toplayer){
        //    var name = tj.toplayer.get_scene_name();
        //    cc.log("current toplayer is " + name + " " + tj.getLayersCount());
        //}else
        //    cc.log("tj.toplayer null!!!");
    };

    this.getClientData = function(key){
        if(this.main.client_data == undefined)
            this.main.client_data = {};
        if(!this.main.client_data.hasOwnProperty(key)){
            switch(key){
                case "team": //0~3 英雄id 4 food 5 pick 6 orb
                    var h = new Array(7);
                    h[0]=h[1]=h[2]=h[3]=h[4]=h[5]=h[6]=0;
                    this.main.client_data[key] = h;
                    break;
                case "team2":
                case "team3":
                    var h = new Array(4);
                    h[0]=h[1]=h[2]=h[3]=0;
                    this.main.client_data[key] = h;
                    break;
                case "select_team":
                    this.main.client_data[key] = "team";
                    break;
                case "help":
                    var h = new Array(7);
                    //0:地图 1:主城 2:城堡 3:庄园 4:酒馆 5: 6:战斗
                    var d = 100;
                    if(tj.needHelp)
                        d = 0;
                    h[0]=h[1]=h[2]=h[3]=h[4]=h[5]=h[6]=d;
                    this.main.client_data[key] = h;
                    this.sendClientData(key);
                    break;
                case "help_done":
                case "help_cemetery":  //新手墓地
                case "help_camp":      //新手扎营
                    this.main.client_data[key] = 0;
                    break;
                case "new_e":  //城堡新百科
                case "new_c":  //城堡新事件
                case "new_a":  //工坊新蓝图
                case "new_m":  //庄园新模块
                case "new_i":  //新道具 装备
                case "new_l":  //新邮件
                case "new_t":  //新成就
                case "new_h":  //新英雄
                    h = [];
                    this.main.client_data[key] = h;
                    break;
                case "faci":    //地图已探设施记录
                    h = [];
                    this.main.client_data[key] = h;
                    break;
                default :
                    return "";
            }
        }
        return this.main.client_data[key];
    };

    this.setClientData = function(key, v){
        this.main.client_data[key] = v;
        if(key == "help" || key == "help_cemetery" || key == "help_camp" || key == "select_team"){
            this.sendClientData(key);
        }
    };

    this.setClientDataValue = function(key, idx, v){
        if(idx > this.main.client_data[key].length)
            return;
        this.main.client_data[key][idx] = v;
        if(key == "help" || key == "help_cemetery" || key == "help_camp"){
            this.sendClientData(key);
        }
    };

    this.sendClientData = function(key){
        var n = {};
        n[key] = this.getClientData(key);
        tj.wsconnection.setMsg(msgac["Client_data_set"],n);
    };

    this.addClientDataObj = function(key, obj ){
        //this.removeClientData(key, obj.id);
        var datas = this.getClientData(key);
        for( var i in datas) {
            var data = datas[i];
            if(data instanceof Object) {
                if (data.id == obj.id) {
                    data = obj;
                    return;
                }
            }
        }
        datas.push(obj);
        this.sendClientData(key);
    };

    this.addClientData = function(key, id){
        if(this.clientDataHave(key, id))
            return;
        var news = this.getClientData(key);
        news.push(id);
    };

    this.removeClientData = function(key, id){
        var datas = this.getClientData(key);
        var idx = -1;
        for( var i in datas){
            var data = datas[i];
            if(data instanceof Object) {
                if (data.id == id)
                    idx = i;
            }else if(data == id)
                idx = i;
        }
        if(idx >=0)
            datas.splice(idx, 1);
    };

    this.addClientDataNewC = function(obj){
        var news = this.getClientData("new_c");
        news.push(obj);
        this.sendClientData("new_c");
    };

    this.removeClientDataNewC = function(id, id_dlg, opt_idx){
        var datas = this.getClientData("new_c");
        var idx = -1;
        for( var i in datas){
            var data = datas[i];
            if(data.id_dlg == undefined)
                data.id_dlg = 0;
            if(data.opt_idx == undefined)
                data.opt_idx = 0;
            if (data == id || (data.id == id && data.id_dlg == id_dlg && data.opt_idx == opt_idx)){
                idx = i;
                break;
            }
        }
        if(idx >=0){
            datas.splice(idx, 1);
            this.sendClientData("new_c");
        }
    };

    this.clientDataHave = function(key, id){
        var datas = this.getClientData(key);
        for( var i in datas){
            var data = datas[i];
            if(data instanceof Object) {
                if (data.id == id)
                    return true;
            }else if(data == id)
                return true;
        }
        return false;
    };

    this.clientDataHaveNewC = function(id, id_dlg, opt_idx){
        var datas = this.getClientData("new_c");
        for( var i in datas){
            var data = datas[i];
            if(data.id_dlg == undefined)
                data.id_dlg = 0;
            if(data.opt_idx == undefined)
                data.opt_idx = 0;
            if (data.id == id && data.id_dlg == id_dlg && data.opt_idx == opt_idx)
                return true;
        }
        return false;
    };

    this.clearClinetDataNewCByEvtOption = function(id_evn, id_dlg, opt_idxs){
        var datas = this.getClientData("new_c");
        var idx = -1;
        for( var i in datas){
            var data = datas[i];
            if (data.id == id_evn && data.id_dlg == id_dlg){
                for(var j in opt_idxs){
                    var opt_idx = opt_idxs[j];
                    if(opt_idx == data.opt_idx)
                        return;
                }
                idx = i;
                break;
            }
        }
        if(idx >=0){
            datas.splice(idx, 1);
            this.sendClientData("new_c");
            tj.wsconnection.pushmsg(msgac["Main_refresh_new"]);
            tj.wsconnection.pushmsg(msgac["Layer_refresh_help"]);
        }
    };

    this.clientDataClear = function(key){
        this.main.client_data[key] = [];
        if(key == "new_c")
            this.sendClientData("new_c");
    };

    this.isHelpDone = function(){
        var h = tj.mainData.getClientData("help_done");
        return h>0;
    };

    this.unlockBlueprint = function () {
        this.unLockBlueprintList = [];
        for(var strId in this.main.storage_item){
            var itemId = parseInt(strId);
            var itemInfo = this.getItemInfo(itemId);
            if(itemInfo == null)
                continue;

            if(itemInfo["type"] == itemType.Blueprint){
                var unlockId = itemInfo["val"];
                if (unlockId !== 0)
                    this.unLockBlueprintList.push(unlockId);
            }
        }
    };

    this.checkUnlockBlueprint = function(itemid){
        var itemInfo = this.getItemInfo(itemid);
        if(itemInfo == null) {
            cc.log("maindata.checkUnlockBlueprint: not found item, id=", itemid);
            return;
        }

        if(itemInfo["type"] == itemType.Blueprint){
            var unlockId = itemInfo["val"];
            var have = false;
            for(var i in this.unLockBlueprintList){
                var uid = this.unLockBlueprintList[i];
                    if(uid == unlockId)
                        have = true;
            }
            if (unlockId !== 0 && !have) {
                this.unLockBlueprintList.push(unlockId);
                this.addClientData("new_a", unlockId);
                tj.wsconnection.pushmsg(msgac["Main_refresh_new"]);
            }
        }
    };

    ////////pay
    this.getSellProductById = function(pId){
        for(var i in this.sellProductsArray){
            var p = this.sellProductsArray[i];
            if(p.Id == pId){
                return this.sellProductsArray[i];
                break;
            }
        }
        return null;
    };

////////res
    this.getResinfoByName = function(name) {
        return this.main.manor.getResDataByName(name);
    };

    this.getResinfoById = function(id) {
        return this.main.manor.getResDataById(id);
    };

    this.getResNumById = function(id) {
        var resData = this.getResinfoById(id);
        return resData.capacity || 0;
    };

    this.getResinfos = function() {
       //return this.main.manor.resinfo;
        var arr = [];
        for(var k in this.main.manor.res_data) {
            arr.push(this.main.manor.res_data[k]);
        }
        return arr;
    };
    this.getMaxResNumById = function(id){
        for(var k in this.main.manor.res_data) {
            var ResId = this.main.manor.res_data[k].id;
            if(ResId == id){
                return this.main.manor.res_data[k].max_capacity;
            }
        }
    },

    this.getResNums = function(){
        var re = {};
        for(var k in this.main.manor.res_data) {
            re[k] = this.main.manor.res_data[k].capacity;
        }
        return re;
    },

    this.getCoinNum = function(){
        return this.main.coin_num;
    };

    this.setCoinNum = function(num){
        tj.wsconnection.pushmsg(msgac["Main_refresh_resource"]);
        return this.main.coin_num = num;
    };

    this.addCoin = function(num){
        tj.wsconnection.pushmsg(msgac["Main_refresh_resource"]);
        return this.main.coin_num += num;
    };

    this.addGem = function(num){
        tj.wsconnection.pushmsg(msgac["Main_refresh_resource"]);
        return this.main.gem_num += num;
    };

    this.getGemNum = function(){
        return this.main.gem_num;
    };

    this.setGemNum = function(num){
        tj.wsconnection.pushmsg(msgac["Main_refresh_resource"]);
        return this.main.gem_num = num;
    };

    this.subGemNum = function(num){
        tj.wsconnection.pushmsg(msgac["Main_refresh_resource"]);
        this.main.gem_num -= Math.abs(num);
        return this.main.gem_num;
    };
///////pub hero
    this.getTavern = function(){
        return this.main.tavern;
    };

    this.addSoul = function (num) {
        this.main.tavern.Exp += num;
        if(this.main.tavern.Exp <= 0)
            this.main.tavern.Exp = 0;
        return this.main.tavern.Exp;
    };

    this.getSoul = function(){
      return this.main.tavern.Exp;
    };

    this.getOwnHeros = function(){
        return this.main.tavern.heros;
    };

    this.sortHeros = function(heors){
        heors.sort(function(a,b){
            if(a.Power == b.Power){
                if(a.JobLv == b.JobLv){
                    if(a.Lv == b.Lv){
                        if(a.Ratings == b.Ratings)
                            return a.Id < b.Id;
                        return a.Ratings < b.Ratings;
                    }
                    return a.Lv < b.Lv;
                }
                return a.JobLv < b.JobLv;
            }
            return a.Power < b.Power;
        });
        //heors.sort(function(a,b){
        //    return a.Power < b.Power;
        //});
    };

    this.getOwnHeroById = function(id){
        var heros = this.main.tavern.heros;
        for (var h in heros) {
            var hero = heros[h];
            if(hero.Id == id)
                return hero;
        }
        return null;
    };

    this.getDeadHeroById = function (id) {
        var heros = this.main.cemetery.dead_heros;
        for (var h in heros) {
            var hero = heros[h];
            if(hero.Id == id)
                return hero;
        }
        return null;
    };

    this.getBattleHero = function(){
        var select_team = this.getClientData("select_team");
        var data = this.getClientData(select_team);
        var heros = [];
        for(var i=0;i<4;i++){
            heros.push(data[i]);
        }
        return heros;
    };

    this.removeBattleHero = function(heroid, send){
        //移除出征队列
        var t = ["team", "team2", "team3"];
        for(var i in t){
            var data = this.getClientData(t[i]);
            var find = -1;
            for(var j=0;j<4;j++){
                var id = data[j];
                if(id == heroid){
                    find = parseInt(j);
                    break;
                }
            }
            if(find >= 0){
                data.splice(find, 1);
                data.splice(3, 0, 0);
                if(send)
                    this.sendClientData(t[i]);
            }
        }
    };

    this.getBattleHeroInfo = function(){
        var select_team = this.getClientData("select_team");
        var data = this.getClientData(select_team);
        var heros = [];
        for(var i=0;i<4;i++){
            var id = data[i];
            var info = this.getOwnHeroById(id);
            if(info)
                heros.push(info);
        }
        return heros;
    };

    this.battleHeroIsNull = function(){
        var select_team = this.getClientData("select_team");
        var data = this.getClientData(select_team);
        for(var i=0;i<4;i++){
            var id = data[i];
            if(id > 0)
                return false;
        }
        return true;
    };

    this.isHeroInTeam = function(heroid, team){
        var data = this.getClientData(team);
        for(var i=0;i<4;i++) {
            var id = data[i];
            if(id == heroid)
                return true;
        }
        return false;
    };

    this.isHeroInPvpTeam = function(heroid){
        var data = this.getArenaTeam();
        for(var i=0;i<4;i++) {
            var id = data[i];
            if(id == heroid)
                return true;
        }
        return false;
    };

    this.isHeroInMop = function(heroid){
        var expeditions = tj.mainData.main.expeditions;
        if(!expeditions)
            return false;
        for(var i in expeditions.quests) {
            var quest = expeditions.quests[i];
            if(quest && quest.team && quest.team.length > 0){
                for (var h in quest.team){
                    if(heroid == quest.team[h])
                        return true;
                }
            }
        }
        return false;
    };

    this.setBattleHero = function(heroids){
        var select_team = this.getClientData("select_team");
        var data = this.getClientData(select_team);
        for(var i in heroids) {
            var id = heroids[i];
            data[i] = id;
        }
        this.sendClientData(select_team);
    };

    this.getBattleTeamId = function(){
        var select_team = tj.mainData.getClientData("select_team");
        switch (select_team){
            case "team":
                return 1;
                break;
            case "team2":
                return 2;
                break;
            case "team3":
                return 3;
                break;
        }
        return 0;
    };

    this.isTeamInMop = function(teamid){
        if(!this.main.expeditions)
            return false;
        for(var i in this.main.expeditions.quests) {
            var quest = this.main.expeditions.quests[i];
            if (quest.teamid == teamid)
                return true;
        }
    };

    this.select_hero_inmop =  function () {
        var data = this.getBattleHero();
        for(var i in data) {
            var hid = data[i];
            if(this.isHeroInMop(hid))
                return true;
        }
        return false;
    };
    /**
     * 验证和格式化队伍
     * @param {array} arr
     * @param {int} len default=4
     * @param {bool} ignore_dead 是否排除阵亡英雄 default=true
     * @return {array}
      */
    this._formatTeam = function(arr) {
        var len = arguments[1] || 4;
        var ignore_dead = (arguments[2]==undefined) ? true : arguments[2];
        var re = [];
        for(var i in arr) {
            var hid = arr[i];
            if(parseInt(hid)>0 && this.getOwnHeroById(hid)) {
                re.push(parseInt(hid));
            }
            if(!ignore_dead) {
                if(parseInt(hid)>0 && this.getDeadHeroById(hid)) {
                    re.push(parseInt(hid));
                }
            }
        }
        re = arrayPad(re, len, 0);
        return re;
    };

    /**
     * 获取竞技场队伍
     * @param {bool} ignore_dead_hero 是否排除阵亡英雄 default=true
     * @return {array}
      */
    this.getArenaTeam = function() {
        var ignore_dead_hero = (arguments[0]==undefined) ? true : arguments[0];
        return this._formatTeam(this.getClientData(this._arena_team_key), 4, ignore_dead_hero);
    };

    /**
     * 设置竞技场队伍
     * @param {array} new_team
     * @return {array} 返回验证后有效的数据
     */
    this.setArenaTeam = function(new_team) {
        var _team = this._formatTeam(new_team);
        this.setClientData(this._arena_team_key, _team);
        this.sendClientData(this._arena_team_key);
        //cc.log("setArenaTeam:", this._team);
        return _team;
    };

    this.getArenaHeroInfo = function(){
        var data = this.getClientData(this._arena_team_key);
        var heros = [];
        for(var i=0;i<4;i++){
            var id = data[i];
            var info = this.getOwnHeroById(id);
            if(info)
                heros.push(info);
        }
        return heros;
    };

    this.clearTeam = function(select_team, heroid){
        var team = this.getClientData(select_team);
        var find = -1;
        for(var i=0;i<4;i++){
            var id = team[i];
            if(id == heroid){
                find = parseInt(i);
                break;
            }
        }
        if(find >= 0){
            team.splice(find, 1);
            team.splice(3, 0, 0);
            //this.sendClientData(select_team);
            return true;
        }
        return false;
    };

    this.getOptionHeroByIdx = function(idx){
        return this.main.tavern.optionheros[idx];
    };

    this.getRankingHeroById = function(id){
        var heros = this.ranking_heros;
        for (var h in heros) {
            var hero = heros[h];
            if(hero.Id == id)
                return hero;
        }
        return null;
    };

    this.queryHeroInfo =function(hero){
        if(hero == null) return;
        var row = tj.dbdata.getrow("job", hero.Job);
        if(row){
            hero.Slot1 = row["slot1"];
            hero.JobName = row["name"];
            hero.JobLv = row["jobLv"];
            hero.Move1 = row["move1"];
            hero.Move2 = row["move2"];
            hero.Move3 = row["move3"];
            hero.JobInfo = row["info"];
            hero.Buff_Attr = 0;
        }
        row = tj.dbdata.getrow("racetemplate", hero.Tid);
        if(row){
            hero.Race = row["race"];
            hero.RaceName = tj.cfg.getAttr("designdata/race", "r"+hero.Race);
            hero.Ratings = row["ratings"];
            hero.RatingsName = tj.cfg.getAttr("designdata/race", "rat"+hero.Ratings);
            hero.Color = cc.color(tj.cfg.get("designdata/rankColors")[hero.RatingsName] || '#FFFFFF');
            hero.FrameIcon = "ui/icon/iconLevel" + hero.Ratings + ".png";
            hero.StarIcon = "ui/icon/iconStar" + hero.JobLv + ".png";
            var  headPortraitIcon = row["protraits"];
            if(!headPortraitIcon)
                hero.Portraits = "ui/icon/iconUnlock.png";
            else
                hero.Portraits = "ui/icon/heros/" + headPortraitIcon;
            hero.Figure = RES_PATH + "animation/monster/" + row["figure"];

            hero.Hp_Max = hero.Hp_now = 0;
            if(hero.hasOwnProperty('SelfAttr') && hero.hasOwnProperty('EquipAttr')) {
                hero.Hp_Max = (hero.SelfAttr.Hp + hero.EquipAttr.Hp) * 10;
            }else if(hero.hasOwnProperty('Stat')){
                hero.Hp_Max = hero.Stat.Hp;
                var style = tj.dbdata.getValueById("job", hero.Job, "style");
                var rowpower = tj.dbdata.getrow("combatpower", style);
                var power = rowpower.hp * hero.Stat.Hp;
                power += rowpower.str * hero.Stat.Str;
                power += rowpower.mag * hero.Stat.Mag;
                power += rowpower.skl * hero.Stat.Skl;
                power += rowpower.def * hero.Stat.Def;
                power += rowpower.duc * hero.Stat.Resist;
                power += rowpower.agl * hero.Stat.Agl;
                power += rowpower.power * hero.Stat.Power;
                power += rowpower.hitRate * hero.Stat.hitRate;
                power += rowpower.dodgeRate * hero.Stat.dodgeRate;
                power += rowpower.critRate * hero.Stat.critRate;
                power += rowpower.healVal * hero.Stat.healVal;
                hero.Power = Math.floor(power);
            }
        }

        if(typeof(hero) == "object")
            this.refreshHeroEquipAttr(hero);
    };

    this.dismissHero = function(id){
        var name = "";
        var heros = this.main.tavern.heros;
        var index = -1;
        for (var h in heros) {
            var hero = heros[h];
            if(hero.Id == id){
                index = h;
                name = hero.Name;
            }
        }
        if(index >= 0)
            this.main.tavern.heros.splice(index, 1);

        this.removeBattleHero(id, true);
        this.setArenaTeam(this.getArenaTeam()); //更新竞技场队伍
        return name;
    };

    this.updataHero = function(heroinfo){
        var heros = this.main.tavern.heros;
        var index = -1;
        for (var h in heros) {
            var hero = heros[h];
            if(hero.Id == heroinfo.Id)
                index = h;
        }
        this.queryHeroInfo(heroinfo);
        if(index >= 0){
            this.main.tavern.heros.splice(index, 1, heroinfo);
        }
        else
            this.main.tavern.heros.push(heroinfo);

        this.sortHeros(this.main.tavern.heros);
    };

    this.updateOptionHero = function(newHeros){
        this.main.tavern.optionheros = [];
        for (var  h in newHeros) {
            var hero = newHeros[h];
            this.queryHeroInfo(hero);
            this.main.tavern.optionheros.push(hero);
        }
    };

    this.getHeroGem2Energy = function(hero){
        var ge = (100 - hero.Energy) / this.main.tavern.gem_2_energy;
        return Math.ceil(ge);
    };

    this.getAllHeroGem2Energy = function(heros){
        var heroinfos = [];
        if(heros == undefined)
            heroinfos = this.main.tavern.heros;
        else{
            for(var i in heros){
                var id = heros[i];
                if(id > 0)
                    heroinfos.push(this.getOwnHeroById(id));
            }
        }
        var e = 0;
        for (var h in heroinfos) {
            var hero = heroinfos[h];
            e += 100 - hero.Energy;
        }
        var ge = e / this.main.tavern.gem_2_energy;
        return  Math.ceil(ge);
    };

    //return 0(can uplevel) 1(need Uprank) 2(top levle)
    this.getHeroUprankState = function(heroinfo){
        var jobstep = tj.dbdata.getValueById("job", heroinfo.Job, "jobLv");
        var row = tj.dbdata.getbysql("experience",  "where (lv == '" + heroinfo.Lv +"')")[0];
        var needexperience = row["step"+jobstep];
        if(needexperience == 0){
            if(jobstep == 5)
                return 2;
            else
                return 1;
        }
        return 0;
    };

    this.getHeroUpgradeExp = function(heroinfo){
        var jobstep = tj.dbdata.getValueById("job", heroinfo.Job, "jobLv");
        var row = tj.dbdata.getbysql("experience",  "where (lv == '" + heroinfo.Lv +"')")[0];
        var step = "step"+jobstep;
        if(row.hasOwnProperty(step))
            return row[step];
        return 0;
    };

    this.getHeroCurrentAttr = function(hero, attr){
        var curr_attr = 0;
        switch(attr){
            case heroAttr.Hp:
                if(hero.Stat)
                    curr_attr = hero.Stat.Hp;
                else
                    curr_attr = hero.SelfAttr.Hp + hero.EquipAttr.Hp;
                break;
            case heroAttr.STR:
                if(hero.Stat)
                    curr_attr = hero.Stat.Str;
                else
                    curr_attr = hero.SelfAttr.Str + hero.EquipAttr.Str;
                break;
            case heroAttr.MAG:
                if(hero.Stat)
                    curr_attr = hero.Stat.Mag;
                else
                    curr_attr = hero.SelfAttr.Mag + hero.EquipAttr.Mag;
                break;
            case heroAttr.SKL:
                if(hero.Stat)
                    curr_attr = hero.Stat.Skl;
                else
                    curr_attr = hero.SelfAttr.Skl + hero.EquipAttr.Skl;
                break;
            case heroAttr.DEF:
                if(hero.Stat)
                    curr_attr = hero.Stat.Def;
                else
                    curr_attr = hero.SelfAttr.Def + hero.EquipAttr.Def;
                break;
            case heroAttr.RESIST:
                if(hero.Stat)
                    curr_attr = hero.Stat.Resist;
                else
                    curr_attr = hero.SelfAttr.Resist + hero.EquipAttr.Resist;
                break;
            case heroAttr.AGL:
                if(hero.Stat)
                    curr_attr = hero.Stat.Agl;
                else
                    curr_attr = hero.SelfAttr.Agl + hero.EquipAttr.Agl;
                break;
            case heroAttr.Power:
                if(hero.Stat)
                    curr_attr = hero.Stat.Power;
                else
                    curr_attr = hero.EquipAttr.Power;
                break;
        }
        if(attr > 0 && hero.Buff_Attr == attr)
            curr_attr += Math.floor(curr_attr * (tj.cfg.get("designdata/joke_buff")/100));
        return curr_attr;
    };

    this.refreshHeroEquipAttr = function(heroid){
        if(typeof( heroid) == "object")
            var hero = heroid;
        else
            hero = this.getOwnHeroById(heroid);
        if(!hero){
            cc.log("maindata.refreshHeroEquipAttr: not found hero, id=", heroid);
            return;
        }

        if(!hero.EquipAttr)
            hero.EquipAttr = {};
        //保存刷新前的装备属性
        var srcAttr = {};
        for(var i in hero.EquipAttr){
            srcAttr[i] = hero.EquipAttr[i]
        }
        hero.EquipAttr.Hp = 0;
        hero.EquipAttr.Str = 0;
        hero.EquipAttr.Mag = 0;
        hero.EquipAttr.Skl = 0;
        hero.EquipAttr.Def = 0;
        hero.EquipAttr.Resist = 0;
        hero.EquipAttr.Agl = 0;
        hero.EquipAttr.Power = 0;
        hero.EquipAttr.Coinbonus = 0;
        hero.EquipAttr.Expbonus = 0;
        hero.EquipAttr.HitRate =0;
        hero.EquipAttr.DodgeRate = 0;
        hero.EquipAttr.HealVal = 0;
        hero.EquipAttr.CritRate = 0;
        for (var j in hero.Slot){
            var equipid = hero.Slot[j];
            if(equipid){
                var equip = this.getEquipByid(equipid);
                if(!equip) {
                    cc.log("maindata.refreshHeroEquipAttr: not found equip, id="+ equipid);
                    continue;
                }
                if(this.equipTypeIsWeapon(equip.Type))
                    hero.EquipAttr.Power += equip.Val;
                hero.EquipAttr.Hp += equip.Hp;
                hero.EquipAttr.Str += equip.Str;
                hero.EquipAttr.Mag += equip.Mag;
                hero.EquipAttr.Skl += equip.Skl;
                hero.EquipAttr.Def += equip.Def;
                hero.EquipAttr.Resist += equip.Resist;
                hero.EquipAttr.Agl += equip.Agl;
                hero.EquipAttr.Coinbonus += equip.Coinbonus;
                hero.EquipAttr.Expbonus += equip.Expbonus;
                hero.EquipAttr.HitRate += equip.HitRate;
                hero.EquipAttr.DodgeRate += equip.DodgeRate;
                hero.EquipAttr.HealVal += equip.HealVal;
                hero.EquipAttr.CritRate += equip.CritRate;
            }
        }
        if(hero.SelfAttr)
            hero.Hp_Max = (hero.SelfAttr.Hp + hero.EquipAttr.Hp)*10;

        //计算刷新前后属性差值
        return {
            hp: hero.EquipAttr.Hp - srcAttr.Hp,
            str: hero.EquipAttr.Str - srcAttr.Str,
            mag : hero.EquipAttr.Mag - srcAttr.Mag,
            skl : hero.EquipAttr.Skl - srcAttr.Skl,
            def : hero.EquipAttr.Def - srcAttr.Def,
            resist : hero.EquipAttr.Resist - srcAttr.Resist,
            agl : hero.EquipAttr.Agl - srcAttr.Agl
        }
    };

    this.battleHero2Cemetery = function(){
        var heors = this.getBattleHero();
        for (var i in heors){
            var heroid = heors[i];
            this.ownHeroDead(heroid);
            this.removeBattleHero(heroid, false);
        }
        this.sendClientData("team");
        this.sendClientData("team2");
        this.sendClientData("team3");
    };

    this.ownHeroDead = function(heroid){
        var heroinfo = this.getOwnHeroById(heroid);
        if(!heroinfo)
            return;

        this.main.cemetery.dead_heros.push(heroinfo);
        this.sortHeros(this.main.cemetery.dead_heros);
        if(this.main.cemetery.blv_cemetery > 0){
            //新手墓地
            var hc = tj.mainData.getClientData("help_cemetery");
            if(hc == 0) {
                tj.mainData.setClientData("help_cemetery", 1);
            }
        }

        for(var i = 0; i < this.main.tavern.heros.length; i++ ){
            var Id = this.main.tavern.heros[i].Id;
            if(heroid == Id){
                this.main.tavern.heros.splice(i,1);
                break;
            }
        }
    };

    this.ownHero2Cemetery = function(heroid){
        this.ownHeroDead(heroid);
        this.removeBattleHero(heroid, true);
    };

    this.getAtelier = function () {
        return this.main.atelier;
    };

    this.getAtelierForgeInfo = function(){
        var str = "";
        var forge_lv = this.main.atelier.forge_skill_lv;
        var forge_lv_exp = this.main.atelier.forge_lv_exp;
        if(forge_lv != undefined && forge_lv_exp != undefined){
            var row = tj.dbdata.getbysql("forgeskillexp",  "where (lv == '" + forge_lv +"')")[0];
            var row2 = tj.dbdata.getbysql("forgeskillexp",  "where (lv == '" + (forge_lv+1) +"')")[0];
            var currlv = nextlv = "";
            if(row.power > 1)
                currlv += "- " + tj.cfg.get("text_on_ui/atelier/power+").format(Math.round((row.power-1) * 100)) + "\n";
            if(row.def > 1)
                currlv += "- " + tj.cfg.get("text_on_ui/atelier/def+").format(Math.round((row.def-1) * 100)) + "\n";
            if(row.resist > 1)
                currlv += "- " + tj.cfg.get("text_on_ui/atelier/resist+").format(Math.round((row.resist-1) * 100)) + "\n";
            if(row.hp > 1)
                currlv += "- " + tj.cfg.get("text_on_ui/atelier/hp+").format(Math.round((row.hp-1) * 100)) + "\n";
            if(row.str > 1)
                currlv += "- " + tj.cfg.get("text_on_ui/atelier/str+").format(Math.round((row.str-1) * 100)) + "\n";
            if(row.mag > 1)
                currlv += "- " + tj.cfg.get("text_on_ui/atelier/mag+").format(Math.round((row.mag-1) * 100)) + "\n";
            if(row.skl > 1)
                currlv += "- " + tj.cfg.get("text_on_ui/atelier/skl+").format(Math.round((row.skl-1) * 100)) + "\n";
            if(row.agl > 1)
                currlv += "- " + tj.cfg.get("text_on_ui/atelier/agl+").format(Math.round((row.agl-1) * 100)) + "\n";
            if(currlv=="")
                currlv = tj.cfg.get("text_on_ui/atelier/none")  + "\n";
            if(row2){
                if(row2.power > row.power)
                    nextlv += tj.cfg.get("text_on_ui/atelier/power+").format(Math.round((row2.power-row.power) * 100)) + "\n";
                if(row2.def > row.def)
                    nextlv += tj.cfg.get("text_on_ui/atelier/def+").format(Math.round((row2.def-row.def) * 100)) + "\n";
                if(row2.resist > row.resist)
                    nextlv += tj.cfg.get("text_on_ui/atelier/resist+").format(Math.round((row2.resist-row.resist) * 100)) + "\n";
                if(row2.hp > row.hp)
                    nextlv += tj.cfg.get("text_on_ui/atelier/hp+").format(Math.round((row2.hp-row.hp) * 100)) + "\n";
                if(row2.str > row.str)
                    nextlv += tj.cfg.get("text_on_ui/atelier/str+").format(Math.round((row2.str-row.str) * 100)) + "\n";
                if(row2.mag > row.mag)
                    nextlv += tj.cfg.get("text_on_ui/atelier/mag+").format(Math.round((row2.mag-row.mag) * 100)) + "\n";
                if(row2.skl > row.skl)
                    nextlv += tj.cfg.get("text_on_ui/atelier/skl+").format(Math.round((row2.skl-row.skl) * 100)) + "\n";
                if(row2.agl > row.agl)
                    nextlv += tj.cfg.get("text_on_ui/atelier/agl+").format(Math.round((row2.agl-row.agl) * 100)) + "\n";
            }
            str = tj.cfg.get("text_on_ui/atelier/proficiency1").format(forge_lv);
            if(row.exp)
                str += tj.cfg.get("text_on_ui/atelier/proficiency2").format(Math.floor(forge_lv_exp), row.exp);
            else
                str += "\n";
            str += tj.cfg.get("text_on_ui/atelier/proficiency3").format(currlv);
            if(row2)
                str += tj.cfg.get("text_on_ui/atelier/proficiency4").format(nextlv);
            return str;
        }
    };

    this.setAtelierBlockList = function(blocks) {
        this.main.atelier.blocks = blocks;
    };

    this.pushAtelierBlockId = function(bp_id) {
        if (Array.isArray(this.main.atelier.blocks)) {
            this.main.atelier.blocks.push(bp_id);
        }
    };

    this.addRankingHero = function(heroinfo){
        var heros = this.ranking_heros;
        var index = -1;
        for (var h in heros) {
            var hero = heros[h];
            if(hero.Id == heroinfo.Id)
                index = h;
        }
        this.queryHeroInfo(heroinfo);
        if(index >= 0){
            this.ranking_heros.splice(index, 1, heroinfo);
        }
        else
            this.ranking_heros.push(heroinfo);
    };


///////pub equip
    this.getStorage_equip = function () {
        return this.main.storage_equip;
    };

    this.getEquipByid= function(id){
        if(id <= 0)
            return null;
        if(this.equip_info.hasOwnProperty(id))
            return this.equip_info[id];
        if(this.rank_equip_info.hasOwnProperty(id))
            return this.rank_equip_info[id];
        //tj.wsconnection.setMsg(msgac["Client_jsb_log"], {
        //    v: cc.tj.UpdateVer,
        //    t: 1,
        //    l: "maindata getEquipByid info=null id= " + id
        //});
        return null;
    };

    this.getRankEquipByid= function(id){
        if(id <= 0)
            return null;
        if(this.rank_equip_info.hasOwnProperty(id))
            return this.rank_equip_info[id];

        return null;
    };

    this.getStorageEquipsByType= function(type){
        if(type == EquipType.All)
            return this.main.storage_equip;
        else{
            var elist = [];
            for (var eid in this.main.storage_equip) {
                var havenum = this.main.storage_equip[eid];
                if(havenum > 0){
                    var equip = this.getEquipByid(eid);
                    if(equip && equip.Type == type)
                        elist.push(equip);
                }
            }
            return elist;
        }
    };

    this.isStorageEquip = function(id){
        return this.main.storage_equip.hasOwnProperty(id) && this.main.storage_equip[id] > 0;
    };

    this.addStroageEquips= function(id){
        this.main.storage_equip[id] = 1;
    };

    this.removeStroageEquips= function(id){
        for (var eid in this.main.storage_equip) {
            if(eid == id){
                delete this.main.storage_equip[eid];
                this.removeClientData("new_i", id);
                tj.wsconnection.pushmsg(msgac["Main_refresh_new"]);
                break;
            }
        }
    };

    this.queryEquipInfo = function(equip){
        var row = null;
        if(equip.eqid <10000){
            row = tj.dbdata.getrow("equipattribute", equip.eqid);
        }else if(equip.eqid >= 10000){
            row = tj.dbdata.getrow("equipment", equip.eqid);
            equip.Val = row["val"];
            equip.Agl = row["agl"];
            equip.Def = row["def"];
            equip.Hp = row["hp"];
            equip.Mag = row["mag"];
            equip.Resist = row["resist"];
            equip.Skl = row["skl"];
            equip.Str = row["str"];
            equip.HitRate = row["hitRate"];
            equip.DodgeRate = row["dodgeRate"];
            equip.HealVal = row["healVal"];
            equip.CritRate = row["critRate"];
            equip.ImmuTag = row["immuTag"];
            equip.Info = row["info"];
            equip.Coinbonus = 0;
            equip.Expbonus = 0;
        }
        equip.Name = row["name"];
        equip.Type = row["type"];
        equip.Icon = "ui/icon/equip/" + row["icon"];
        equip.Proficiency = row["proficiency"];
        equip.GroupId = row["groupId"];
        equip.Weight = row["weight"];
        equip.Unpack = row["unpack"];
        equip.Recasting = row["recasting"];
        equip.RecastingFee = row["recastingFee"];
        equip.RecastingCoin = row["recastingCoin"];
        if(!equip.BuffDuc)
            equip.BuffDuc = 0;

        equip.Slot = -1;
        equip.Owner = 0;
        var heros = this.main.tavern.heros;
        for (var i in heros) {
            var hero = heros[i];
            for (var j in hero.Slot){
                if(equip.id == hero.Slot[j]){
                    equip.Owner = hero.Id;
                    equip.Slot = parseInt(j);
                }
            }
        }
        heros = this.main.cemetery.dead_heros;
        for (i in heros) {
            hero = heros[i];
            for (j in hero.Slot){
                if(equip.id == hero.Slot[j]){
                    equip.Owner = hero.Id;
                    equip.Slot = parseInt(j);
                }
            }
        }
        equip.FrameIcon = "ui/icon/iconLevel" + equip.Proficiency + ".png";

        var tstr = tj.cfg.getAttr("designdata/equipType", "t" + equip.Type);
        equip.Info = tj.cfg.get("text_on_ui/equip/level").format(equip.Proficiency, tstr);
        equip.InfoColor = cc.color(155, 205, 225, 255);
    };

    this.updateEquipInfo = function(new_equip){
        this.queryEquipInfo(new_equip);
        this.equip_info[new_equip.id] = new_equip;
        this.addStroageEquips(new_equip.id);

        this.addClientData("new_i", new_equip.id);
        tj.wsconnection.pushmsg(msgac["Main_refresh_new"]);
    };

    this.updateEquipInfoToBag = function(new_equip){
        this.queryEquipInfo(new_equip);
        this.equip_info[new_equip.id] = new_equip;
        this.main.bags[new_equip.id] = 1;
    };

    this.addEquipInfo = function(id, eqid, attr){
        var equip = {};
        equip.id = id;
        equip.eqid = eqid;
        if(attr){
            equip.Val = attr.Val;
            equip.Agl = attr.Agl;
            equip.Def = attr.Def;
            equip.Hp = attr.Hp;
            equip.Mag = attr.Mag;
            equip.Resist = attr.Resist;
            equip.Skl = attr.Skl;
            equip.Str = attr.Str;
            equip.HitRate = attr.HitRate;
            equip.DodgeRate = attr.DodgeRate;
            equip.HealVal = attr.HealVal;
            equip.CritRate = attr.CritRate;
            equip.ImmuTag = attr.ImmuTag;
            equip.Coinbonus = attr.Coinbonus;
            equip.Expbonus = attr.Expbonus;
        }
        this.queryEquipInfo(equip);
        this.equip_info[equip.id] = equip;
    };

    this.addEquipInfo2 = function(equip){
        this.queryEquipInfo(equip);
        this.equip_info[equip.id] = equip;
    };

    this.addRankEquipInfo = function(equip){
        this.queryEquipInfo(equip);
        this.rank_equip_info[equip.id] = equip;
    };

    this.getMarketList = function () {
        return this.main.market;
    };

    this.get_mapid = function(){
        return this.main.mapid;
    };

    this.changeMarketStoreByID = function (id, type, num) {
        if(type ==0){
            for (var i in this.main.market.shopitems){
                if(this.main.market.shopitems[i].Id == id){
                    this.main.market.shopitems[i].Store = this.main.market.shopitems[i].Store - num;
                }
            }
        }else if(type == 1){
            for (var i in this.main.market.gemshopitems){
                if(this.main.market.gemshopitems[i].Id == id){
                    this.main.market.gemshopitems[i].Store = this.main.market.gemshopitems[i].Store - num;
                }
            }
        }
    };

    this.setMarketList = function (data) {
        this.main.market.shopitems = data.s;
        this.main.market.gemshopitems = data.g;
        this.main.market.auto_t = data.auto_t;
        this.main.market.manual_t = data.manual_t;
        this.main.market.n = data.n;
    };

    this.getCetemeryHeros = function(){
        return this.main.cemetery.dead_heros;
    };

    this.removeDeadHeroFromListById = function (deadHeroId) {
        for(var i = 0; i < this.main.cemetery.dead_heros.length; i++ ){
            var Id = this.main.cemetery.dead_heros[i].Id;
            if(deadHeroId == Id){
                this.main.cemetery.dead_heros.splice(i,1);
                return true;
            }
        }
        return false;
    };

///////item
    this.getStorage_item = function (){
        return this.main.storage_item;
    };

    this.setItemNum = function (id, num) {
        var itemclass = this.getItemClass(id);
        switch (itemclass){
            case itemClass.resource:
                var mainres = this.getResinfoById(id);
                if(mainres)
                    mainres.set(num);
                break;
            case itemClass.gold:
                this.setCoinNum(num);
                break;
            case itemClass.gem:
                this.setGemNum(num);
                break;
            case itemClass.soul:
                this.main.tavern.Exp = num;
                break;
            case itemClass.item:
                if(num > 0){
                    if(!this.main.storage_item.hasOwnProperty(id) || this.main.storage_item[id] == 0){
                        this.checkUnlockBlueprint(id);
                        if (this.isStorageItemType(id)){
                            this.addClientData("new_i", id);
                            tj.wsconnection.pushmsg(msgac["Main_refresh_new"]);
                        }
                    }
                    this.main.storage_item[id] = num;
                }else if (num == 0) {
                    delete this.main.storage_item[id];
                    this.removeClientData("new_i", id);
                    tj.wsconnection.pushmsg(msgac["Main_refresh_new"]);
                }
                break;
            case itemClass.equip:
                break;
        }
        return true;
    };

    this.isStorageItemType = function(id){
        var type = tj.dbdata.getValueById("item", id, "type");
        switch (type){
            case  itemType.Food:
            case  itemType.Constom:
            case  itemType.FuWen:
            case  itemType.valuables:
                return true;
            case  itemType.Blueprint:
            case  itemType.Exp:
            case  itemType.BaseM:
            case  itemType.fireBar:
            case  itemType.tent:
                return false;
        }
        return false;
    };

    this.setItemNumToBag = function (id, num) {
        this.main.bags[id] = num;
        return true;
    };

    this.addStroageItem =function(id, num){
        if(this.main.storage_item.hasOwnProperty(id))
            this.main.storage_item[id] += num;
        else {
            this.main.storage_item[id] = num;
            if(num) {
                this.checkUnlockBlueprint(id);
                if (this.isStorageItemType(id)){
                    this.addClientData("new_i", id);
                    tj.wsconnection.pushmsg(msgac["Main_refresh_new"]);
                }
            }
        }
    };

    this.subStroageItem =function(id, num){
        if(this.main.storage_item.hasOwnProperty(id.toString()))
            this.main.storage_item[id] -= num;
    };

    this.getItemsByType = function(type){
        var elist = {};
        for(var id in this.main.storage_item) {
            var num = this.main.storage_item[id];
            if (num <= 0)
                continue;
            var itemid = parseInt(id);
            var itype = tj.dbdata.getValueById("item", itemid, "type");
            if (itype == type){
                elist[id] = num;
            }
        }
        return elist;
    };

    this.getItemInfo = function(id){
        id = parseInt(id);
        var iclass = this.getItemClass(id);
        if(iclass == itemClass.equip)
            return this.getEquipByid(id);
        if(this.item_info.hasOwnProperty(id))
            return this.item_info[id];

        var item = {};
        var row = tj.dbdata.getrow("item", id);
        if(row){
            item.id = id;
            item.name = row.name;
            item.type = row.type;
            item.icon = "ui/icon/prop/" + row.icon;
            item.itemLv = row.itemLv;
            item.frameicon = "ui/icon/iconLevel" + row.itemLv + ".png";
            item.weight = row.weight;
            item.canBeUsed = row.canBeUsed;
            item.canBeDrop = row.canBeDrop;
            item.val = row.val;
            item.info = row.info;
            this.item_info[id] = item;
        }
        return item;
    };

    this.addBagItem = function(id, num){
        if(this.main.bags.hasOwnProperty(id.toString()))
            this.main.bags[id] += num;
        else
            this.main.bags[id] = num;
    };

    this.subBagItem = function(id, num){
        if(!this.main.bags.hasOwnProperty(id))
            return false;
        var left = this.main.bags[id];
        left -= num;
        this.main.bags[id] = Math.max(left, 0);
        this.main.bags[id] = left;
        return true;
    };

    this.setBagItemNum = function(id, num){
        this.main.bags[id] = num;
    };

    this.getBagItemNum = function(id){
        if(this.main.bags && this.main.bags.hasOwnProperty(id))
            return this.main.bags[id];
        return 0;
    };

    this.bag2Storage = function(items, equips){
        for(var id in items){
            var num = items[id];
            if(id> 0 && id <= 5){
                var mainres = this.getResinfoById(parseInt(id));
                if(mainres)
                    mainres.add(num);
            }
            else
                this.addStroageItem(id, num);

        }
        for(var idq in equips) {
            this.addStroageEquips(idq);
            this.addClientData("new_i", idq);
            tj.wsconnection.pushmsg(msgac["Main_refresh_new"]);
        }
    };

    this.storage2Bag = function(bags){
        for(var id in bags){
            var num = bags[id];
            if(id> 0 && id <= 5){
                var mainres = this.getResinfoById(parseInt(id));
                if(mainres)
                    mainres.sub(num);
            }
            else
                this.subStroageItem(id, num);
        }
    };

    this.getBagItemsByType = function(type){
        var elist = {};
        for(var id in this.main.bags) {
            var num = this.main.bags[id];
            if (num <= 0)
                continue;
            var itemid = parseInt(id);
            var itype = tj.dbdata.getValueById("item", itemid, "type");
            if (itype == type){
                elist[id] = num;
            }
        }
        return elist;
    };

    this.getBagEquipByType = function(type){
        var elist = [];
        for(var id in this.main.bags) {
            var num = this.main.bags[id];
            if (num <= 0)
                continue;
            var itemid = parseInt(id);
            if(this.getItemClass(itemid) == itemClass.equip){
                var equip = this.getEquipByid(itemid);
                if(equip && equip.Type == type)
                    elist.push(equip);
            }
        }
        return elist;
    };

    this.getBestEquip = function(type, job, slot_equipid, eliminate_equipid){
        var best_equip = null;
        var best_power = 0;
        var equips = this.getStorageEquipsByType(type);
        if(slot_equipid){
            var sequip = this.getEquipByid(slot_equipid);
            if(sequip)
                equips.unshift(sequip);
        }
        for(var i in equips){
            var equip = equips[i];

            var style = tj.dbdata.getValueById("job", job, "style");
            var row = tj.dbdata.getrow("combatpower", style);
            var power = row.hp * (equip.Hp);
            power += row.str * (equip.Str);
            power += row.mag * (equip.Mag);
            power += row.skl * (equip.Skl);
            power += row.def * (equip.Def);
            power += row.duc * (equip.Resist);
            power += row.agl * (equip.Agl);
            power += row.power * (equip.Val);
            power += row.hitRate * equip.HitRate;
            power += row.dodgeRate * equip.DodgeRate;
            power += row.critRate * equip.CritRate;
            power += row.healVal * equip.HealVal;
            power = Math.floor(power);
            equip.JobPower = power;
            if(best_power && best_power >= power)
                continue;
            if(equip.id == eliminate_equipid)
                continue;
            best_equip = equip;
            best_power = power;
        }

        if(best_equip)
            return best_equip.id;
        return 0;
    };

    this.getItemClass = function(id){
        if(id> 0 && id <= 5)
            return itemClass.resource;
        else if(id == 9)
            return itemClass.soul;
        else if(id == 10)
            return itemClass.gold;
        else if(id == 11)
            return itemClass.gem;
        else if(id > 5 && id < 10000)
            return itemClass.item;
        else
            return itemClass.equip;
    };

    this.getItemName = function(id){
        var iclass = this.getItemClass(id);
        var name = "";
        switch(iclass){
            case itemClass.resource:
                name = tj.dbdata.getValueById("resproduce", id, "name");
                break;
            case itemClass.gold:
                name = tj.cfg.get("text/manor/Gold");
                break;
            case itemClass.gem:
                name = tj.cfg.get("text/manor/Gem");
                break;
            case itemClass.soul:
                name = tj.cfg.get("text/manor/Soul");
                break;
            case itemClass.item:
                var iteminfo = this.getItemInfo(id);
                if(iteminfo)
                    name = iteminfo.name;
                break;
            case itemClass.equip:
                var equip = this.getEquipByid(id);
                if(equip)
                    name = equip.Name;
                break;
        }
        return name;
    };

    this.getPortraitNameById = function(id){
        if(id) {
            var item = tj.dbdata.getrow("portrait", id);
            if(item && item.name) {
                return item.name;
            }
        }
        return "";
    };

    this.getItemNum = function(id, eid){
        var iclass = this.getItemClass(id);
        var num = 0;
        switch(iclass){
            case itemClass.resource:
                num = this.getResNumById(id);
                break;
            case itemClass.gold:
                num = this.getCoinNum();
                break;
            case itemClass.gem:
                num = this.getGemNum();
                break;
            case itemClass.soul:
                num = this.getSoul();
                break;
            case itemClass.item:
                num = 0;
                for (var  h in this.main.storage_item) {
                    var itemNum = this.main.storage_item[h];
                    if(parseInt(h) == id){
                        num = itemNum;
                        break;
                    }
                }
                break;
            case itemClass.equip:
                num = this.isStorageEquip(id)?1:0;
                break;
        }
        return num;
    };

    this.haveItemInfo = function(id){
        var iclass = this.getItemClass(id);
        switch(iclass){
            case itemClass.resource:
            case itemClass.gold:
            case itemClass.gem:
            case itemClass.soul:
                return true;
            case itemClass.item:
                var row = tj.dbdata.getrow("item", id);
                return row != 0;
            case itemClass.equip:
                var equip = this.getEquipByid(id);
                if(equip)
                    return true;
                return false;
        }
    };

    this.getItemExplain = function(id, eid){
        var iclass = this.getItemClass(id);
        var info = "";
        switch(iclass){
            case itemClass.resource:
                info = tj.dbdata.getValueById("resproduce", id, "info");
                break;
            case itemClass.gold:
            case itemClass.gem:
            case itemClass.soul:
                info = "";
                break;
            case itemClass.item:
                //info = tj.dbdata.getValueById("item", id, "info");
                var iteminfo = this.getItemInfo(id);
                if(iteminfo)
                    info = iteminfo.info;
                break;
            case itemClass.equip:
                var equip = this.getEquipByid(id);
                if(equip)
                    info = equip.Info;
                break;
        }
        return info;
    };

    this.getItemWeight = function(id, eid){
        var iclass = this.getItemClass(id);
        var weight = 0;
        switch(iclass){
            case itemClass.resource:
                weight = 1;
                break;
            case itemClass.gold:
            case itemClass.gem:
            case itemClass.soul:
                break;
            case itemClass.item:
                var iteminfo = this.getItemInfo(id);
                if(iteminfo)
                    weight = iteminfo.weight;
                break;
            case itemClass.equip:
                var equip = this.getEquipByid(id);
                if(equip)
                    weight = equip.Weight;
                break;
        }
        return weight;
    };

    this.getItemIcon = function(id){
        id = parseInt(id);
        var iclass = this.getItemClass(id);
        var icon = null;
        switch(iclass){
            case itemClass.resource:
                switch (id){
                    case 1:
                        icon = RES_ICON_PROP_PATH + "resFood.png";
                        break;
                    case 2:
                        icon = RES_ICON_PROP_PATH + "resWood.png";
                        break;
                    case 3:
                        icon = RES_ICON_PROP_PATH + "resIron.png";
                        break;
                    case 4:
                        icon = RES_ICON_PROP_PATH + "resCrystal.png";
                        break;
                    case 5:
                        icon = RES_ICON_PROP_PATH + "resMithril.png";
                        break;
                }
                break;
            case itemClass.gold:
                icon = RES_ICON_PROP_PATH + "resGold.png";
                break;
            case itemClass.gem:
                icon = RES_ICON_PROP_PATH + "resGem.png";
                break;
            case itemClass.soul:
                icon = RES_ICON_PROP_PATH + "resSoul.png";
                break;
            case itemClass.item:
                //var res = tj.dbdata.getValueById("item", id, "icon");
                //if(res)
                //    icon = "ui/icon/prop/" + res;
                var iteminfo = this.getItemInfo(id);
                if(iteminfo)
                    icon = iteminfo.icon;
                break;
            case itemClass.equip:
                var equip = this.getEquipByid(id);
                if(equip)
                    icon = equip.Icon;
                break;
        }
        return icon;
    };

    this.getItemFrameIcon = function(id){
        var iclass = this.getItemClass(id);
        var icon = null;
        switch(iclass){
            case itemClass.item:
                //icon = "ui/icon/iconLevel" + tj.dbdata.getValueById("item", id, "itemLv") + ".png";
                var iteminfo = this.getItemInfo(id);
                if(iteminfo)
                    icon = iteminfo.frameicon;
                break;
            case itemClass.equip:
                var equip = this.getEquipByid(id);
                if(equip)
                    icon = equip.FrameIcon;
                break;
            default :
                return "ui/icon/iconLevel.png";
        }
        return icon;
    };

    this.getItemCanBeUsed = function(id){
        var iclass = this.getItemClass(id);
        switch(iclass){
            case itemClass.resource:
            case itemClass.gold:
            case itemClass.gem:
            case itemClass.soul:
                return false;
            case itemClass.item:
                var item = this.getItemInfo(id);
                if(item)
                    return item.canBeUsed;
                return false;
            case itemClass.equip:
                return true;
        }
    };

    this.isItemValuables = function(itemid){
        var iteminfo = this.getItemInfo(itemid);
        return iteminfo.type == itemType.valuables;
    };

    this.addEncyclopedieToBook = function (id) {
        if (this.main.encyclopedie.indexOf(id) === -1) {
            this.main.encyclopedie.push(id);
        }
    };

    this.isTrophyReach = function(tid){
        for (var t in this.main.trophy) {
            var td = this.main.trophy[t];
            if (td.id == tid)
                return true;
        }
        return false;
    };

    this.trophyHaveNew = function(){
        for (var t in tj.mainData.main.trophy) {
            var td = tj.mainData.main.trophy[t];
            if(td.get == 0)
                return true;
        }
        return false;
    };

    this.trophyProgress = function (type,val1, val2, unlocks) {
        for (var t in this.main.trophy_pro) {
            var tp = this.main.trophy_pro[t];
            if(type == 4){
                if(tp.type == type && tp.val1 == val1)
                    tp.val2 = val2;
            }else{
                if(tp.type == type)
                    tp.val1 = val1;
            }
        }
        var f = false;
        for (var i in unlocks) {
            var tid = unlocks[i];
            if (tid > 0 && !this.isTrophyReach(tid)) {
                var o = {
                    id : tid,
                    get: 0
                };
                var row = tj.dbdata.getrow("trophy", tid);
                this.main.trophy.push(o);
                createMainNoticeBox(tj.cfg.get("text/trophy/trophyReach").format(row.name));
                tj.wsconnection.pushmsg(msgac["SDK_trophy_unlock"], {id : tid}, true);
                f = true;
            }
        }
        if (f) {
            //this.addClientData("new_t", 1);
            //this.sendClientData("new_t");
            tj.wsconnection.pushmsg(msgac["Main_refresh_new"]);
        }

        // var rows = tj.dbdata.gettable("trophy");
        // for (var i in rows) {
        //     var row = rows[i];
        //     var reach = false
        //     var o = {};
        //     o.id = row.id;
        //     o.get = 0;
        //     if(type == 4){
        //         if(row.type == type && row.val1 == val1 && val2 >=row.val2)
        //             reach = true;
        //     }else{
        //         if(row.type == type && val1 >=row.val1)
        //             reach = true;
        //     }

        //     if(reach && !this.isTrophyReach(row.id)){
        //         tj.mainData.main.trophy.push(o);
        //         tj.toplayer.noticetext_add(tj.cfg.get("text/trophy/trophyReach").format(row.name));
        //     }
        // }
    };

    //event
    this.addHomeEvent = function(data){
        if(this.main.homeevent_list)
            this.main.homeevent_list.push(data);
    };

    this.delHomeEvent = function(data){
        if(!this.main.homeevent_list)
            return;
        for(var i = 0; i < this.main.homeevent_list.length; i++ ){
            var id = this.main.homeevent_list[i].id;
            if(data.id == id){
                this.main.homeevent_list.splice(i,1);
                break;
            }
        }
    };

    //animation
    this.loadAnimate = function(res, callback) {
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
    };
    /**
     * 获得多彩字体
     * @category 公用函数
     * @param str （格式：#x颜色##y字号#text 例："#x00FF00##y20#敌方单体#xFFFFFF##y20#造成#x556723##y20#256#xFFFFFF##y20#点物理伤害\n“）
     * @return obj （richText 控件）
     */
    this.getColorText = function (str,size,color) {
        var richText = new ccui.RichText();
        var strList = this.convertStrToList2(str,size,color);
        for(var i in strList){
            var tempDic = strList[i];
            for(var key in tempDic){
                var color = key;
                var text = tempDic[key][1];
                var fontSize = tempDic[key][0];
                var re = new ccui.RichElementText(i+1, cc.color(color), 255, text, tj.cfg.get("designdata/design_fontName"), fontSize);
                //var re = new ccui.RichElementText(i+1, new cc.FontDefinition({
                //    fontName: tj.cfg.get("designdata/design_fontName"),
                //    fontSize: fontSize,
                //    fillStyle: cc.color(color),
                //    strokeEnabled: true,
                //    strokeStyle: cc.color("#3E2300"),
                //    lineWidth: 2
                //}), 255, text, tj.cfg.get("designdata/design_fontName"), fontSize);
                richText.pushBackElement(re);
            }
        }
        return richText;
    };

    /**
     * 获得多彩字体的列表格式
     * @category 转化函数
     * @param str （格式：#x颜色##y字号#text 例："#x00FF00##y20#敌方单体#xFFFFFF##y20#造成#x556723##y20#256#xFFFFFF##y20#点物理伤害\n“）
     * @return list （return []）
     */
    this.convertStrToList = function (str) {
        var strlist = [];
        var rs = str.split(/#x/g);
        for(var i in rs){
            var str2 = rs[i];
            var rs2 = str2.split(/##y/g);
            if(rs2.length > 1){
                var color = "#"+rs2[0];
                var fontSize = parseInt(rs2[1].split(/#/g)[0]);
                var text = rs2[1].split(/#/g)[1];
                var textList = text.split("\n");
                if(textList.length > 1){
                    for(var j in textList){
                        if(j == textList.length - 1){
                            var tempDic = {};
                            var text1 = textList[j];
                            if(text1 == ""|| text1 == '')
                                continue;
                            tempDic[color] = [fontSize,text1];
                            strlist.push(tempDic);
                        }else{
                            var tempDic = {};
                            var text1 = textList[j];
                            tempDic[color] = [fontSize,text1];
                            strlist.push(tempDic);
                            var tempDic2 = {};
                            tempDic2[color] = [fontSize,"\n"];
                            strlist.push(tempDic2);
                        }
                    }
                }else{
                    var tempDic = {};
                    tempDic[color] = [fontSize,text];
                    strlist.push(tempDic);
                }
            }
        }
        return strlist;
    };
    /**
     * 获得多彩字体的列表格式
     * @category 转化函数
     * @param str （格式：#x颜色##y字号#text 例："#x00FF00##y20#敌方单体#xFFFFFF##y20#造成#x556723##y20#256#xFFFFFF##y20#点物理伤害\n“）
     * @return list （return []）
     */
    this.convertStrToList2 = function (str , size, color) {
        var strlist = [];
        var s = /#x([A-F,\d]{6})#|#y(\d+)#|\n/g;
        var index = 0;
        var tempSize = size;
        var tempColor = color;
        do{
            var rs = s.exec(str);
            if(rs == null) {
                if(index >= str.length)
                    break;
                var text = this.getStrText(str, index, str.length);
                var tempDic = {};
                tempDic[tempColor] = [parseInt(tempSize),text];
                strlist.push(tempDic);
                break;
            }else{
                if(rs.index == index) {
                    if(rs[0] == "\n"){
                        var tempDic = {};
                        tempDic[tempColor] = [parseInt(tempSize),"\n"];
                        strlist.push(tempDic);
                    }
                    if(rs[1] != undefined && rs[0][1] == "x")
                        tempColor = (rs[1] == "000001")?color:("#"+rs[1]);

                    if(rs[2] != undefined && rs[0][1] == "y")
                        tempSize = (rs[2] == "00")?size:rs[2];

                    index = index + rs[0].length;
                }else{
                    var text = this.getStrText(str, index, rs.index);
                    var tempDic = {};
                    tempDic[tempColor] = [parseInt(tempSize),text];
                    strlist.push(tempDic);
                    index = index + text.length;
                    if(rs[0] == "\n"){
                        var tempDic1 = {};
                        tempDic1[tempColor] = [parseInt(tempSize),"\n"];
                        strlist.push(tempDic1);
                    }
                    if(rs[1] != undefined && rs[0][1] == "x")
                        tempColor = (rs[1] == "000001")?color:("#"+rs[1]);

                    if(rs[2] != undefined && rs[0][1] == "y")
                        tempSize = (rs[2] == "00")?size:rs[2];

                    index = index + rs[0].length;
                }
            }
        }while(1);

        return strlist;
    };

    this.getStrText = function (str, a, b) {
        var str1 = "";
        for(var i = a; i < b ; i++){
            str1 += str[i];
        }
        return str1;
    };

    this.cheak_itemuse_out = function(itemid){
        var iclass = this.getItemClass(itemid);
        var iteminfo = this.getItemInfo(itemid);
        if(!iteminfo)
            return false;
        var unpack_id = 0;
        if(iclass == itemClass.item)
            unpack_id = iteminfo.val;
        else if(iclass == itemClass.equip)
            unpack_id = iteminfo.Unpack;

        var row = tj.dbdata.getrow("chests", unpack_id);
        var resType = row.resType;
        if(row && this.getItemClass(resType) == itemClass.resource){
            var resData = this.getResinfoById(resType);
            if((resData.capacity + row.resMax) > resData.max_capacity)
                return true;
        }
        return false;
    };

    this.getItemOutResName = function(itemid) {
        var iclass = this.getItemClass(itemid);
        var iteminfo = this.getItemInfo(itemid);
        if(!iteminfo)
            return false;
        var unpack_id = 0;
        if(iclass == itemClass.item)
            unpack_id = iteminfo.val;
        else if(iclass == itemClass.equip)
            unpack_id = iteminfo.Unpack;

        var row = tj.dbdata.getrow("chests", unpack_id);
        var resType = row.resType;
        if (row && this.getItemClass(resType) == itemClass.resource) {
            return this.getItemName(resType);
        }
        return '';
    };

    this.equipTypeIsWeapon = function(equipType){
        return !(equipType == EquipType.HuJia || equipType == EquipType.ShiPin);
    };

    this.getArenaData = function() {
        return this.main.arena;
    };

    this.updateArenaData = function(data) {
        this.main.arena = mergeObj(this.main.arena, data);
    };

    this.getSkillIntro = function(skillId, skillOwnerAttr, equipAttr, additionAttr) {
        try {
            var defAttr = {
                "Power": 0,
                "Hp": 0,
                "Str": 0,
                "Mag": 0,
                "Skl": 0,
                "Def": 0,
                "Resist": 0,
                "Agl": 0,
                "HealVal": 0
            };
            var attrMap = {
                0: "Hp",
                1: "Str",
                2: "Mag",
                3: "Skl",
                4: "Def",
                5: "Resist",
                6: "Agl"
            };
            var skillData = tj.dbdata.getrow("skill", skillId);
            if (!skillData) {
                return '';
            }

            skillOwnerAttr = mergeObj(defAttr, skillOwnerAttr);
            equipAttr = mergeObj(defAttr, equipAttr);
            additionAttr = mergeObj(defAttr, additionAttr);

            //cc.log('getSkillIntro: ', equipAttr.Power, 1+equipAttr.HealVal * 0.01);

            var str = "";
            var dfc = "#xFFFFFF#";
            var red = "#x900000#";
            var green = "#x00FF00#";
            var _lang = tj.cfg.get("text/skillExplain");
            var buffText = _lang["buffText"];
            var targetList = _lang["skillTarget"];
            var targets = targetList[skillData.target];
            var buffData = null;
            var buffName = '';
            var buffInfo = '';
            var strdamage = 0;
            var dmgMod = skillData.dmgMod / 100;
            if (skillData.buffId > 0) {
                buffData = tj.dbdata.getrow("status", skillData.buffId);
                buffName = buffData.name;

                //buff描述
                var tmp = _lang["buffText"][buffData.infoType];
                if (tmp) {
                    var srcAttrName = _lang["attrNameText"][buffData.val2];
                    var srcAttrVal = 0;
                    var srcAttr = attrMap[buffData.val2] || '';
                    if(srcAttr) {
                        srcAttrVal = skillOwnerAttr[srcAttr] + equipAttr[srcAttr] + additionAttr[srcAttr];
                    }
                    var srcAttrRate = buffData.val3 / 100;
                    //cc.log(skillOwnerAttr, equipAttr, additionAttr);
                    //cc.log("srcAttrName:", srcAttrName, " srcAttr:", srcAttr, " srcAttrVal:", srcAttrVal, " rate:", srcAttrRate);
                    var attrName = _lang["attrNameText"][buffData.val4];
                    var val = buffData.val1;
                    var bufc = (buffData.buffTo == 0) ? green : red;
                    buffInfo = tmp.parseVar({
                        buffname: buffName,
                        bufftime: green + skillData.buffTime + dfc,
                        valcount: bufc + (val + Math.round(srcAttrVal * srcAttrRate)) + dfc,
                        val: val,
                        rate: srcAttrRate,
                        srcattrname: srcAttrName,
                        attrname: attrName
                    });
                }
            }

            //冷却时间
            var cdInfo = '';
            if (skillData.cdPenalty != 0) {
                var cdc = dfc;
                var opr = '';
                if (skillData.cdPenalty > 0) {
                    cdc = red;
                    opr = _lang['add'];
                } else {
                    cdc = green;
                    opr = _lang['sub'];
                }
                cdInfo = _lang["cdText"].parseVar({
                    opr: opr,
                    cdtime: cdc + Math.abs(skillData.cdPenalty).toString() + dfc
                });
            }

            //技能名称、LV
            str = dfc + "#y29#" + _lang["title"].parseVar({
                    skillname: skillData.name,
                    level: _lang["lv"] + skillData.skillLv
                });
            str += "\n \n#y00#";
            switch (skillData.type) {
                case 0: //加buff
                    //技能描述
                    str += _lang["castBuffText"].parseVar({
                        target: targets,
                        buffname: buffName
                    });
                    //buff说明
                    if (buffData == null) {
                        cc.log("--- skillIntro: buffData is null");
                    } else {
                        str += buffInfo;
                    }
                    //CD
                    str += cdInfo;
                    break;

                case 1: //物理攻击
                case 2: //魔法攻击
                    var txt = '';
                    var nws = 0;
                    if(skillData.type==2) {
                        txt = _lang['magicText'];
                        strdamage = (skillOwnerAttr.Mag + equipAttr.Mag + additionAttr.Mag) * dmgMod + equipAttr.Power;
                        strdamage = Math.max(1, Math.round(strdamage));
                        nws = (skillOwnerAttr.Mag + equipAttr.Mag + additionAttr.Mag) * dmgMod;
                        nws = Math.max(1, Math.round(nws));
                    }else{
                        txt = _lang['physicalText'];
                        strdamage = (skillOwnerAttr.Str + equipAttr.Str + additionAttr.Str) * dmgMod + equipAttr.Power;
                        strdamage = Math.max(1, Math.round(strdamage));
                        nws = (skillOwnerAttr.Str + equipAttr.Str + additionAttr.Str) * dmgMod
                        nws = Math.max(1, Math.round(nws));
                    }
                    //机率buff
                    var buffintro = '';
                    if (skillData.buffChance) {
                        var buff_txt = (skillData.buffTarget==0)?_lang["chanceBuffText"]:_lang["chanceBuffText2"];
                        buffintro = buff_txt.parseVar({
                            rate: skillData.buffChance,
                            buffname: buffName
                        });
                    }
                    //武器
                    var wp_str = '';
                    if (equipAttr.Power > 0) {
                        wp_str = _lang["weaponText"].parseVar({
                            val: nws,
                            power:  equipAttr.Power
                        });
                    }
                    //预计伤害
                    str += txt.parseVar({
                        target: targets,
                        hurt: red + strdamage.toString() + dfc + wp_str,
                        buffintro: buffintro
                    });
                    if (buffData != null) {
                        str += buffInfo;
                    }
                    //命中
                    str += _lang["hitText"].parseVar({rate: skillData.val});
                    //暴击
                    str += _lang["critText"].parseVar({rate: skillData.critRate});
                    //吸血
                    if(skillData.drainRate) {
                        str += _lang["drainText"].parseVar({rate: skillData.drainRate});
                    }
                    //种族克制
                    if(skillData.supVal) {
                        var race = '';
                        var race_arr = tj.cfg.get("designdata/race");
                        var race_idx = parseInt(skillData.supRace) - 1;
                        race = (race_arr[race_idx]) ? race_arr[race_idx] : '';
                        str += _lang["raceRestrain"].parseVar({rate: skillData.supVal, race: race});
                    }
                    //CD
                    str += cdInfo;
                    //无视嘲讽
                    if (skillData.ignore == 1) {
                        str += _lang["ignoreTaunt"];
                    }

                    break;

                case 3: //治疗
                    strdamage = ((skillOwnerAttr.Mag + equipAttr.Mag + additionAttr.Mag) * dmgMod + equipAttr.Power);
                    strdamage = Math.max(1, Math.round(strdamage));

                    strdamage *= (1 + equipAttr.HealVal * 0.01);//治疗量
                    strdamage = Math.max(1, Math.round(strdamage));

                    var nws = strdamage - equipAttr.Power; //不加武器威力的治疗量
                    nws = Math.max(1, Math.round(nws));

                    //附加buff
                    var buffintro = '';
                    if (skillData.buffChance) {
                        buffintro = _lang["mastBuffText"].parseVar({
                            buffname: buffName
                        });
                    }
                    //武器
                    var wp_str = '';
                    if (equipAttr.Power > 0) {
                        wp_str = _lang["weaponText"].parseVar({
                            val: nws,
                            power:  equipAttr.Power
                        });
                    }
                    //治疗
                    str += _lang["healText"].parseVar({
                        target: targets,
                        heal: green + strdamage.toString() + dfc,
                        weaponpower: wp_str,
                        buffintro: buffintro
                    });
                    //buff说明
                    if (buffData != null) {
                        str += buffInfo;
                    }
                    //CD
                    str += cdInfo;
                    break;

                default:
                    break;
            }
            //技能扯谈语
            str += "\n \n" + dfc + "#y19#" + skillData.info;
            return str;
        }catch(e){
            cc.log(e);
            return '';
        }
    };
};