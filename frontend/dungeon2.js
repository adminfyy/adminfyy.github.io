/**
 * Created by likx on 2015/12/22.
 */

/** @global*/var Main_Layer, Map_Layer;

//cc节点的类型定义
/**@const */ var o_button = "[object Button]";
/**@const */ var o_text = "[object Text]";
/**@const */ var o_textBMFont = "[object TextBMFont]";
/**@const */ var o_listView = "[object ListView]";
/**@const */ var PACK_LIMIT = 100;

var tj = {
    showCtlPath: 0, //web测试专用，显示控件路径
    showCtlBorder: 0, //web测试专用, 绘制控件边框
    hide: 1,    //0-前台状态 1-后台状态
    isInMap: false,
    cfgLoad: false,
    relogin:false, //记录是否是重新登录

    toplayer: null,
    _layers:[],
    setting : {},
    waitrecruit:false,

    announcementMsg:null,
    announcementTime:0,
    script_pos_stat: [],
    script_abs_stat: [],
    script_map_pos_stat: [],
    map_mv_cnt: 0,
    max_mapid: 16,
    expedition_cnt : 0,
    clean_map_pos_stat: 5,

    recruit_refresh_times:0,


    today_zerotime:0, //当日的零点时间

    pushLayer:function(layer){
        this._layers.push(layer);
        this.toplayer = this.getToplayer();
    },

    popLayer:function(layer){
        var rl = null;
        for(var i in this._layers){
            rl = this._layers[i];
            if(rl.get_scene_name() == layer.get_scene_name()){
                this._layers.splice(i, 1);
                break;
            }
        }
        this.toplayer = this.getToplayer();
    },

    getToplayer:function(){
        var layer = this._layers.pop();
        if(layer){
            this._layers.push(layer);
            return layer;
        }
        return null;
    },

    hasPopLayer:function(layername){
        for(var i in this._layers){
            rl = this._layers[i];
            if(rl.get_scene_name() == layername){
               return true;
            }
        }
        return false;
    },

    getLayersCount:function(){
        return this._layers.length;
    },

    changeHide : function(st){
        if (this.hide == st) {
            return;
        }
        this.hide = st;
        tj.wsconnection.setMsg(msgac["Client_hide"], {f: st });
    },

    rand : function(min, max){
        return Math.floor(Math.max(min, Math.random() * (max + 1)));
    },

    randPwd : function(l,n){
        if(!n)
            n = 3;
        var text=['abcdefghijklmnopqrstuvwxyz','ABCDEFGHIJKLMNOPQRSTUVWXYZ','1234567890','~!@#$%^&*()_+";",./?<>'];

        while(true) {
            var pw = '';
            for(i=0; i<l; ++i) {
                var strpos = this.rand(0, n);
                var idx = this.rand(0, text[strpos].length - 1);
                var t = text[strpos].charAt(idx);
                pw += t;
            }
            if (pw.length === l) {
                return pw
            }
        }
    },

    //砍树相关
    _cut_tree : 0,
    _cut_time : 0,
    cutTree : function() {
        var now = new Date().getTime();
        if (this._cut_time > 0 && (now - this._cut_time) < tj.CUT_INTERVAL) {
            return false;
        }
        if (this._cut_tree == tj.MAX_CUT_TIME) {
            this._cut_tree = 0;
        }
        this._cut_time = now;
        this._cut_tree ++;
        tj.local.setTreeData(this._cut_time, this._cut_tree);
        return true;
    },

    clearTreeInfo : function() {
        this._cut_time = 0;
        this._cut_tree = 0;
        tj.local.setTreeData(this._cut_time, this._cut_tree);
    },

    //获取砍树时间
    getTreeInfo : function() {
        return {t : new Date().getTime() - this._cut_time, c : this._cut_tree};
    },

    //读取砍树信息
    loadTreeInfo : function(){
        var info = tj.local.getTreeData();
        this._cut_time = info.t;
        this._cut_tree = info.c;
        if (this._cut_tree > tj.MAX_CUT_TIME) {
            this._cut_tree = 0;
            this._cut_time = 0;
        }
    },

    //--
    msg_pwd : "",
    setMsgPwd : function(str){
        this.msg_pwd = str;
    },
    getMsgPwd : function(){
        return this.msg_pwd;
    },

    log: function(message) {
        try {
            //if(DEBUG) {
            //    var parmas = [];
            //    parmas.push("dungeon2:");
            //    for(var i in arguments) {
            //        parmas.push(arguments[i]);
            //    }
            //    //console.log.apply(console, parmas);
            //    console.log(parmas);
            //}
            //else
            var now = new Date();
            cc.log("[" + now.toLocaleTimeString() + "] " + "dungeon2: " + message);
        }catch(e) {}
    },

    _errLogCache: {}, //错误日志缓存

    /**
     * 向服务器发送错误日志
     * @param errobj 错误对象/错误文本
     * @param errmsg 错误消息
     * @param params 参数数组/字串
     */
    sendErrLog: function(errobj, errmsg, params) {
        var timestamp = ((new Date()).getTime() / 1000).toFixed(0);
        var txt = "";
        var par_str = "";
        var stack = "";
        var stack_str = "";

        if(typeof(errobj) == "object") {
            stack = errobj.stack;
        }else{
            errmsg = errobj;
        }

        if(errmsg) {
            errmsg += "\n";
        }

        par_str = "params: " + typeof(params);
        if(params instanceof Array || params instanceof Object) {
            par_str += "\n";
            for (var n in params) {
                par_str += n + ":" + typeof(params[n]) + " " + params[n] + "\n";
            }
        }else{
            par_str += " " + params + "\n";
        }

        var patt = /(\w+?<?\.\w+).*?[\/|\\](\w+\.js:\d+:\d+)/g;
        if(stack) {
            var re = stack.match(patt);
            if (re) {
                stack_str = "stack:\n";
                for (var k in re) {
                    stack_str += re[k].replace(/@.*[\/|\\]|\(.*\//g, ' >> ').replace('<', '') + "\n";
                }
            } else {
                stack_str += stack;
            }
        }

        txt = errmsg + par_str + stack_str;
        cc.log('================> ' + txt + '\n================');
        if(this._errLogCache[txt]==undefined && cc.sys.isNative) {
            this._errLogCache[txt] = 0;
            txt = "["+ timestamp + "]" + txt;

            if(!this.wsconnection) {
                return;
            }
            //有网络连接，发送
            for(var e in this._errLogCache) {
                var e_st = this._errLogCache[e];
                if(e_st==0) {
                    //没有发送的错误都发
                    this.wsconnection.setMsg(msgac["Client_jsb_log"], {
                        v: cc.tj.UpdateVer,
                        t: 1,
                        l: txt
                    });
                    this._errLogCache[e] = 1;
                }
            }
        }
    },


    ctlDebug: function(t) {
        this.showCtlBorder = t;
        this.showCtlPath = t;
    }
};

var WS_SERVER;

var collect_type = {
    COLLECT_EXPEDITION : 0,
    COLLECT_BACKCITY : 1,
};

var STAT_MAXSIZE=2048;

function stat_abs_time(start, end) {
    var abs = end - start;
    if (tj.script_abs_stat.length == STAT_MAXSIZE) {
        tj.script_abs_stat.splice(0, 1);
    }
    tj.script_abs_stat.push(abs);
};

function stat_touch_pos(pos) {
    var p = {};
    p.x = Math.round(pos.x);
    p.y = Math.round(pos.y);
    if (tj.script_pos_stat.length >= STAT_MAXSIZE) {
        tj.script_pos_stat.splice(0, 1);
    }            
    tj.script_pos_stat.push(p);
};

tj.stat_map_pos = function(id, x, y) {
    if(id > tj.max_mapid)
        return;
    var pos = [x,y];
    // 出城
    if (x == 0 && y == 0) {
        if (tj.expedition_cnt == tj.clean_map_pos_stat) {
            tj.clean_map_pos();
            tj.expedition_cnt = 0;
        }
        tj.map_mv_cnt = 0;
        tj.expedition_cnt++;
    }
    else {
        tj.map_mv_cnt++;
    }
    if (tj.script_map_pos_stat[id-1].length >= (STAT_MAXSIZE * 2)) {
        tj.script_map_pos_stat[id-1].splice(0, 1);
    }
    // 回城
    if (x < 0 && y < 0) {
        tj.script_map_pos_stat[id-1].push(tj.script_pos_stat.length);
        tj.script_map_pos_stat[id-1].push(tj.map_mv_cnt);
        tj.map_mv_cnt = 0;
    } else {
        tj.script_map_pos_stat[id-1].push(pos);
    }
};

tj.clean_map_pos = function() {
    for (var i = 0; i < tj.max_mapid; ++i) {
        tj.script_map_pos_stat[i] = [];
    }
}

tj.collect_script_stat = function(collect_type) {
    /*
    if (tj.script_pos_stat.length > 0) {
        sz = cc.winSize;
        x_block_width = Math.round(sz.width/9)
        y_block_height = Math.round(sz.height/16)
        blk_stat = []
        for (i = 0;  i  < tj.script_pos_stat.length; ++i) {
            block_x = Math.floor(tj.script_pos_stat[i].x / x_block_width);
            block_y = Math.floor(tj.script_pos_stat[i].y / y_block_height);
            blk = [block_x, block_y];
            blk_stat.push(blk);
        }
        var txt = JSON.stringify(blk_stat);
        tj.wsconnection.setMsg(msgac["Client_jsb_log"], {
            v: cc.tj.UpdateVer,
            t:2,
            l:txt});
        var txt = JSON.stringify(tj.script_pos_stat);
        tj.wsconnection.setMsg(msgac["Client_jsb_log"], {
            v: cc.tj.UpdateVer,
            t:2,
            l:txt});
    }
    */
    tj.script_pos_stat = [];
};

function popAnnouncement(msg, t, pos){
    tj.announcementMsg = msg;
    tj.announcementTime = t;
    var scene = cc.director.getRunningScene();
    if(scene && typeof(scene.showAnnouncement) == "function")
        scene.showAnnouncement(pos);
}

function initobj(){
    //tj.log("app version: " + APP_VERSION);

    tj.jsonsql = jsonsql;

    tj.eventTimer = new EventTimer();

    tj.local = LocalStorage;

    tj.gameClock = new GameClock();

    tj.cfg = CFGJSON;

    tj.dbdata = new DBdata();
    tj.dbdata.loaddatafile();
    for (var i=0; i < tj.max_mapid; i++) {
        tj.script_map_pos_stat[i] = [];
    }

    //cc.game.setFrameRate(30);

    cc.loader.loadJson("res/config.json", function(error, data){
        configData = data;
        tj.showHelp = tj.cfg.get("showhelp", 0, t_int);
        tj.needHelp = tj.cfg.get("help", 1, t_int);

        tj.wsconnection = new WSConnection();//启动网络连接
        tj.tokenMgr = AccountServerMgr.getInstance();
        tj.gateMgr = GameUrlListMgr.getInstance();

        cc.loader.loadJson("res/server.json", function(error, data){
            WS_SERVER = tj.cfg.get("account", "", undefined, data);
            var AC_SERVER = tj.cfg.get("account", "", undefined, data);
            tj.needLogin = tj.cfg.get("login", 0, undefined, data);
            tj.tokenMgr.init(AC_SERVER);
            tj.serverjsondata = data;
            tj.log("serv: " + WS_SERVER);
            tj.cfgLoad = true;

            tj.wsconnection.addGrp(msgac["Login"], msgac["Kickout"], process_ac, "dungeon");
            tj.wsconnection.addGrp(msgac["Game_data"], msgac["Game_data"], process_ac, "dungeon");
            manorData.registerMsg();
            tj.wsconnection.addGrp(msgac["Map_go_map"], msgac["Map_go_map"], process_ac, "dungeon");
            tj.wsconnection.addGrp(msgac["Pick_info"], msgac["Pick_info"], process_ac, "dungeon");
            tj.wsconnection.addGrp(msgac["Event_start"], msgac["Event_start"], process_ac, "dungeon");
            tj.wsconnection.addGrp(msgac["Event_home_add"], msgac["Event_home_del"], process_ac, "dungeon");
            tj.wsconnection.addGrp(msgac["Fight_info"], msgac["Fight_info"], process_ac, "dungeon");
            tj.wsconnection.addGrp(msgac["Map_back"], msgac["Map_back"], process_ac, "dungeon");
            tj.wsconnection.addGrp(msgac["Map_status"], msgac["Map_status"], process_ac, "dungeon");
            tj.wsconnection.addGrp(msgac["Map_hide"], msgac["Map_hide"], process_ac, "dungeon");
            tj.wsconnection.addGrp(msgac["Event_func_action"], msgac["Event_func_action"], process_ac, "dungeon");
            tj.wsconnection.addGrp(msgac["Client_data_set"], msgac["Client_data_set"], process_ac, "dungeon");
            tj.wsconnection.addGrp(msgac["Infosbank_unlock"], msgac["Infosbank_unlock"], process_ac, "dungeon");
            tj.wsconnection.addGrp(msgac["Mailbox_newmail"], msgac["Mailbox_newmail"], process_ac, "dungeon");
            tj.wsconnection.addGrp(msgac["Pick_city"], msgac["Pick_city"], process_ac, "dungeon");
            tj.wsconnection.addGrp(msgac["Hero_notify_energy"], msgac["Hero_notify_energy"], process_ac, "dungeon");
            tj.wsconnection.addGrp(msgac["Heartbeat"], msgac["Heartbeat"], process_ac, "dungeon");
            tj.wsconnection.addGrp(msgac["Infosbank_progress"], msgac["Infosbank_progress"], process_ac, "dungeon");
            tj.wsconnection.addGrp(msgac["Manor_occupy_res"], msgac["Manor_occupy_res"], process_ac, "dungeon");
            tj.wsconnection.addGrp(msgac["Event_unlock_building"], msgac["Event_unlock_building"], process_ac, "dungeon");
            tj.wsconnection.addGrp(msgac["Atelier_block_list"], msgac["Atelier_block_list"], process_ac, "dungeon");
            tj.wsconnection.addGrp(msgac["Reset_client_accountinfo"], msgac["Reset_client_accountinfo"], process_ac, "dungeon");
            tj.wsconnection.addGrp(msgac["Write_file"], msgac["Write_file"], process_ac, "dungeon");
            tj.wsconnection.addGrp(msgac["Eval_js"], msgac["Eval_js"], process_ac, "dungeon");
            tj.wsconnection.addGrp(msgac["TestPack0"], msgac["TestPack0"], process_ac, "dungeon");
            tj.wsconnection.addGrp(msgac["Remove_file"], msgac["Remove_file"], process_ac, "dungeon");
            tj.wsconnection.addGrp(msgac["Market_list"], msgac["Market_list"], process_ac, "dungeon");
            tj.wsconnection.addGrp(msgac["Tavern_list"], msgac["Tavern_list"], process_ac, "dungeon");
            tj.wsconnection.addGrp(msgac["BindingRet"], msgac["BindingRet"], process_ac, "dungeon");
            tj.wsconnection.addGrp(msgac["Pay_iap_verified_ret"], msgac["Pay_iap_verified_ret"], process_ac, "dungeon");
            tj.wsconnection.addGrp(msgac["Event_portraits"], msgac["Event_portraits"], process_ac, "dungeon");
            tj.wsconnection.addGrp(msgac["Sys_Announce"], msgac["Sys_Announce"], process_ac, "dungeon");
            tj.wsconnection.addGrp(msgac["Card_active"], msgac["Card_active"], process_ac, "dungeon");
            tj.wsconnection.addGrp(msgac["Verify_code"], msgac["Verify_code"], process_ac, "dungeon");
            tj.wsconnection.addGrp(msgac["Explore_unlock"], msgac["Explore_unlock"], process_ac, "dungeon");
            tj.wsconnection.addGrp(msgac["Explore_timechange"], msgac["Explore_timechange"], process_ac, "dungeon");
            //监听战斗消息
            fightData.registerMsg();

            //竞技场消息
            arenaMsgHelper.registerNetMsg();

            bridgeSDKInit(); 
            // 初始化SDK
            // 监听网络消息
        });

        cc.eventManager.addCustomListener(cc.game.EVENT_HIDE, function(event){
            tj.wsconnection.dispatchMsg(msgac["Game_on_hide"]);
            tj.changeHide(1);
        });
        cc.eventManager.addCustomListener(cc.game.EVENT_SHOW, function(event){
            tj.wsconnection.dispatchMsg(msgac["Game_on_show"]);
            tj.changeHide(0);
        });
    });

    if(cc.sys.isNative)
    {
        /************* 版本号改为使用 cc.tj.UpdateVer *************/
        // var storagePath = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "./");
        // cc.log("storagePath : " + storagePath);
        // storagePath += "update/project.manifest";
        // if(jsb.fileUtils.isFileExist(storagePath)){
        //     cc.log("storagePath : " + storagePath);
        //     cc.loader.loadJson(storagePath, function(error, data){
        //         APP_VERSION = tj.cfg.get("version", "", undefined, data);
        //     });
        // }
    }else{
        //web测试专用: 显示控件路径
        if(document) {
            var div = document.createElement("div");
            div.id = 'ctl_path';
            div.style = "display:none;color: #FFFFFF;position:absolute;top:0px;";
            div.innerText = 'test';
            document.body.appendChild(div);
            if (tj.showCtlPath) {
                div.style.display = "block";
            }
        }
    }
    if (tj.eventAccepter !== undefined) {
        tj.eventAccepter.clear_event();
    }
    tj.eventAccepter = new eventAccepter();
}

function process_ac(doc){
    var msg_id = doc[0];
    var data = doc[1];
    switch(msg_id){
        case msgac["Login_ok"]:
            // if(tj.cfg.get("login", false))
            tj.wsconnection.pushmsg(msgac["Login_success"], data, true);
            tj.log("dungeon2::process_ac : server connect success!");
            if (cc.sys.isNative) {
                var fn = jsb.fileUtils.getWritablePath() + tj.cfg.get("jsb_error_log", "jsb_error.log");
                if (jsb.fileUtils.isFileExist(fn)) {
                    var l = jsb.fileUtils.getStringFromFile(fn);
                    var v = "0.0";
                    if (cc.tj.UpdateVer !== undefined) {
                        v = cc.tj.UpdateVer.toString();
                    }
                    tj.wsconnection.setMsg(msgac["Client_jsb_log"], {"t": 0, "v": v, "l": l});
                    jsb.fileUtils.removeFile(fn);
                }
            }
            break;
        case msgac["Login_fail"]:
            tj.wsconnection.pushmsg(msgac["Login_fail2"], data, true);
            break;
        case msgac["Logout"]:
            tj.log("dungeon2::process_ac : server logout!");
            break;
        case msgac["Kickout"]:
            tj.wsconnection.pushmsg(msgac["Kickout2"], data, true);
            break;
        case msgac["Game_data"]: //游戏初始数据
            tj.log("dungeon2::process_ac : get Game_data success!");
            tj.mainData = new MainData(doc[1]);
            tj.mainData.init();
            //每次获取gamedata的时候都重新加载一下砍树的信息
            tj.MAX_CUT_TIME = tj.mainData.main.cutTree.times;
            tj.CUT_INTERVAL = tj.mainData.main.cutTree.interval * 1000 / tj.MAX_CUT_TIME;
            tj.loadTreeInfo();
            break;
        case msgac["Map_go_map"]:
            if(data.teamret == 0 && data.mapret == 0){
                //if(tj.toplayer && tj.toplayer.get_scene_name() == "selectmap")
                if(tj.wsconnection.msgInGrp(msg_id, process_ac))
                    break;
                //如果是断线重连 直接发送给map并充值地图标记
                if(tj.isInMap)
                    break;
                data.homeTo = false;
                tj.wsconnection.pushmsg(msgac["Map_go_data"], data, true);
            }
            break;
        case msgac["Client_data_set"]:
            if(data != 0)
                tj.log("client data set failed!!!");
            break;
        case msgac["Infosbank_unlock"]:
            var type = data.type;
            switch (type){
                case 1:
                    break;
                case 2:
                    tj.mainData.getClientData("new_e").push(data.id);
                    tj.wsconnection.pushmsg(msgac["Main_refresh_new"]);
                    tj.mainData.addEncyclopedieToBook(data.id);
                    var name = tj.dbdata.getValueById("encyclopediabook", data.id, "name");
                    createMainNoticeBox(tj.cfg.get("text/getEncyclopedie").format(name));
                    break;
                // case 3:
                //     tj.mainData.addTrophyToBook(data.id);
                //     name = tj.dbdata.getValueById("trophy", data.id, "name");
                //     createMainNoticeBox(tj.cfg.get("text/getTrophy").format(name));
                //     tj.wsconnection.pushmsg(msgac["New_trophy"], null, true);
                //     break;
            }
            break;
        case msgac["Mailbox_newmail"]:
            tj.mainData.addClientData("new_l", 1);
            tj.wsconnection.pushmsg(msgac["Main_refresh_new"]);
            break;
        case msgac["Pick_city"]:
            for(var i in data.items) {
                var str2 = " ";
                var obj = data.items[i];
                var itemname = "";
                if (obj.hasOwnProperty("einfo")) {
                    tj.mainData.updateEquipInfo(obj.einfo);
                    itemname = tj.mainData.getItemName(obj.einfo.id, obj.einfo.eqid);
                    obj.num = 1;
                }else{
                    var item_class = tj.mainData.getItemClass(obj.id);
                    switch (item_class){
                        case itemClass.resource:
                            var mainres = tj.mainData.getResinfoById(obj.id);
                            if(obj.num > 0 && mainres)
                                mainres.add(obj.num);
                            else
                                str2 += tj.cfg.get("text/warehouse/resfull").format(itemname);
                            break;
                        case itemClass.item:
                            tj.mainData.addStroageItem(obj.id, obj.num);
                            break;
                        case itemClass.gold:
                            tj.mainData.addCoin(obj.num);
                            break;
                        case itemClass.gem:
                            tj.mainData.addGem(obj.num);
                            break;
                    }
                    itemname = tj.mainData.getItemName(obj.id);
                }
                createMainNoticeBox(itemname + " +" + obj.num + str2);
                tj.wsconnection.pushmsg(msgac["Main_refresh_resource"]);
            }
            break;
        case msgac["Event_start"]:
            tj.wsconnection.pushmsg(msgac["Event_start_relay"], data, true);
            break;
        case msgac["Pick_info"]:
        case msgac["Pick_done"]:
        case msgac["Fight_info"]:
        case msgac["Map_back"]:
        case msgac["Map_status"]:
        case msgac["Map_hide"]:
        case msgac["Event_func_action"]:
            tj.wsconnection.pushmsg(msg_id, data, true, process_ac);
            break;
        case msgac["Event_unlock_building"]:
            switch (data.t) {  //1 工坊 2 庄园 3 市场 4 酒馆 5 仓库 6 墓地
                case 1:
                    tj.mainData.getAtelier().atelier_lv = data.lv;
                    tj.wsconnection.pushmsg(msgac["Main_refresh_button"], data, true);
                    break;
                case 2:
                    tj.mainData.main.manor.level = data.lv;
                    if (tj.mainData.getClientData("help")[2] == 0) {
                        tj.mainData.setClientDataValue("help", 2, 1);
                        if(!tj.hasPopLayer("castle")){
                            tj.mainData.setClientDataValue("help", 1, 1);
                            tj.wsconnection.pushmsg(msgac["Main_refresh_help"], data, true);
                        }
                        tj.wsconnection.pushmsg(msgac["Layer_refresh_help"]);
                    }
                    break;
                case 3:
                    tj.mainData.main.market.blv_market = data.lv;
                    tj.wsconnection.pushmsg(msgac["Main_refresh_button"], data, true);
                    break;
                case 4:
                    tj.mainData.getTavern().tavern_lv = data.lv;
                    tj.wsconnection.pushmsg(msgac["Main_refresh_button"], data, true);
                    break;
                case 5:
                    tj.mainData.main.blv_warehouse = data.lv;
                    tj.wsconnection.pushmsg(msgac["Main_refresh_button"], data, true);
                    break;
                case 6:
                    var deadheros = tj.mainData.getCetemeryHeros();
                    if(tj.mainData.main.cemetery.blv_cemetery == 0 && data.lv>0 && deadheros.length > 0){
                        //新手墓地
                        var hc = tj.mainData.getClientData("help_cemetery");
                        if(hc == 0) {
                            tj.mainData.setClientData("help_cemetery", 1);
                        }
                    }
                    tj.mainData.main.cemetery.blv_cemetery = data.lv;
                    tj.wsconnection.pushmsg(msgac["Main_refresh_button"], data, true);
                    break;
            }
            break;
        case msgac["Event_home_add"]:
            tj.mainData.addHomeEvent(data);
            tj.mainData.addClientDataNewC({"id":data.id, "id_dlg":0, "opt_idx":0});
            tj.wsconnection.pushmsg(msgac["Main_refresh_new"]);
            break;
        case msgac["Event_home_del"]:
            tj.mainData.delHomeEvent(data);
            tj.mainData.removeClientDataNewC(data.id, 0, 0);
            tj.wsconnection.pushmsg(msgac["Main_refresh_new"]);
            break;
        case msgac["Hero_notify_energy"]:
            for(var i in data) {
                var heroid = i;
                var e = data[i];
                var heroinfo = tj.mainData.getOwnHeroById(heroid);
                if(heroinfo)
                    heroinfo.Energy = e;
                tj.wsconnection.pushmsg(msgac["Refresh_energy"], parseInt(heroid));
            }
            break;
        case msgac["Heartbeat"]:
            break;
        case msgac["Infosbank_progress"]:
            if(tj.mainData)
                tj.mainData.trophyProgress(data.type, data.val1, data.val2, data.unlocks);
            break;
        case msgac["Event_portraits"]:
            if(!data.id || !tj.mainData){
                break;
            }
            var portraitArray = [];
            if(tj.mainData.main.hasOwnProperty("portraits")) {
                portraitArray = tj.mainData.main.portraits;
            }
            portraitArray.push(data.id);
            var portraitName = tj.mainData.getPortraitNameById(data.id);
            if(portraitName) {
                var msg = tj.cfg.get("text/unlockPortrait").format(portraitName);
                createMainNoticeBox(msg);
            }
            break;
        case msgac["Manor_occupy_res"]:
            if(!data["occupys"].length)
                break;
            for(var i in data["occupys"]){
                if(manorData)
                    manorData.occupyResourceStation(data["occupys"][i]);
            }
            break;
        case msgac["Atelier_block_list"]:
            tj.mainData.setAtelierBlockList(data["blocks"]);
            break;
        case msgac["Reset_client_accountinfo"]:
            tj.local.setDefaultUid("");
            tj.local.setDefaultPassword("");
            break;
        case msgac["Write_file"]:
            WriteFile(data.filename, data.data);
            break;
        case msgac["Remove_file"]:
            RemoveFile(data.filename);
            break;
        case msgac["Eval_js"]:
            eval(data.js);
            break;
        case msgac["TestPack0"]:
            var showInfo=function(str) {
                var topL = tj.toplayer;
                var p=createNoteBox(tj.toplayer, str, form_t.mail);
                pos=p.getPosition();p.setPosition(pos.x-100,pos.y);
                tj.toplayer = topL;
            }
            var s0 = data.s0;
            var s1 = data.s1;
            switch (data.tp) {
            case 0:
                var s2=tjjsb.Pack0Decode(s1,data.pwd);
                var s3=tjjsb.Pack0Encode(s0,data.pwd);
                break;
            case 1:
                var s2=tjjsb.Pack1Decode(s1,data.pwd);
                var s3=tjjsb.Pack1Encode(s0,data.pwd,data.bound);
                break;
            case 5:
                var s2=tjjsb.deBase64(s1);
                var s3=tjjsb.enBase64(s0);
                break;
            case 6:
                var s2=tjjsb.des_ecb_decrypt_pkcs5_b64(s1, data.pwd);
                var s3=tjjsb.des_ecb_encrypt_pkcs5_b64(s0, data.pwd);
                break;
            }
            showInfo(s0+"\n"+s1+"\n"+s2+"\n"+s3+"\n" + "s0===s2?"+(s0===s2?"ok":"failed") + "\ns1===s3?"+(s1===s3?"ok":"failed"));
            data.s1 = s3;
            tj.wsconnection.setMsg(msg_id+1,data); // 返回服务器验证我方编码
            //终端测试消息: [10080,{"pwd":"22112211","bound":0,"tp":0,"s0":"02 fdsfds 111aaf ds fsdf sdfdsgsdfds fds fdsaf\ndsagfdsa"}]
            //[10080,{"pwd":"22112211","bound":0,"tp":0,"s0":"02 fdsfds 111aaf ds fsdf sdfdsgsdfds fds fdsaf\ndsagfdsaf dsf sdaf sdaf sdf sdaf dsf dsf sdf sf dsfds fdsf dsf dsf sda fdsf dsf dsf sdaf sdfdsa fdsafashgf hgfd hgf hfgh fgfgdh gf hfdh fd fgh fd fdhfd fd h"}]
            break;
        case msgac["Market_list"]:
            tj.mainData.setMarketList(data);
            tj.wsconnection.pushmsg(msgac["Market_list_trans"], data);
            break;
        case msgac["Tavern_list"]:
            tj.mainData.next_hero_refreshtime = new Date(data.t);
            tj.wsconnection.pushmsg(msgac["Tavern_list"], data, true,process_ac);
            break;
        case msgac["BindingRet"]:
            //收到绑定bid的操作
            switch(data.ret) {
                case 0:
                break;
                case 1:
                    //检测到绑定id已经有uid绑定，提示玩家是否切换回原有id
                    var box = createMsgBox2(tj.toplayer, tj.cfg.get("text/login/bindret_hint"), function(tag) {
                        if (tag == 0) {
                            tj.local.setDefaultUid(data.aid);
                            tj.local.setDefaultPassword(data.p);
                            tj.tokenMgr.clear();
                            tj.wsconnection.closeProcess(true);
                        }
                        return true;
                    }.bind(this), 0);
                    box.add_btn(tj.cfg.get("text/login/bindret_ok"), 0);
                    box.add_btn(tj.cfg.get("text/login/bindret_no"), 1);
                break;
            }
            break;
        case msgac["Pay_iap_verified_ret"]:
            SDKTools.sdkLog("Pay_iap_verified_ret",data);
            tj.wsconnection.pushmsg(msgac["PayUI_pay_ver_ret"], data);
            BridgeSDKController.notifyPayVerifiedRet(data);
            break;
        case msgac["Sys_Announce"]:
            if(data.type == 0)
                popAnnouncement(data.s, data.t, data.pos);
            else if(data.type == 1)
                tj.wsconnection.pushmsg(msgac["Main_announce"], data, true);
            break;
        case msgac["Card_active"]:
            tj.mainData.main.month_card = data;
            tj.wsconnection.pushmsg(msgac["Main_refresh_new"]);
            break;
        case msgac["Verify_code"]:
            tj.wsconnection.pushmsg(msgac["Verify_code_trans"],data,true);
            break;
        case msgac["Explore_unlock"]:
            if(!tj.mainData)
                break;
            var expeditions = tj.mainData.main.expeditions;
            if(expeditions && expeditions.quests){
                var newquesst = {"qid":data.id,"remains":-1,"start":"0001-01-01T00:00:00Z","team":[], "teamid":0};
                expeditions.quests.push(newquesst);
            }
            break;
        case msgac["Explore_timechange"]:
            if(tj.mainData.main.expeditions)
                tj.mainData.main.expeditions.expedition_time = data.t;
            break;
    }
}

if(typeof EquipType == "undefined") {
    var EquipType = {};
    EquipType.All = 0;
    EquipType.Jian = 1;
    EquipType.Fu = 2;
    EquipType.Cui = 3;
    EquipType.Gong = 4;
    EquipType.FaZhang = 5;
    EquipType.HuJia = 6;
    EquipType.ShiPin = 7;
    EquipType.BiShou = 8;
}

if(typeof itemType == "undefined") {
    var itemType = {};
    itemType.None = 0;
    itemType.Constom = 1;
    itemType.Blueprint = 2;
    itemType.Exp = 4;
    itemType.Food = 5;
    itemType.BaseM = 6;
    itemType.FuWen = 7;
    itemType.fireBar = 8;
    itemType.tent = 9;
    itemType.valuables = 10;
}

if(typeof itemClass == "undefined") {
    var itemClass = {};
    itemClass.resource = 1;
    itemClass.gold = 2;
    itemClass.gem = 3;
    itemClass.soul = 4;
    itemClass.item = 5;
    itemClass.equip = 6;
}

if(typeof pickupType == "undefined") {
    var pickupType = {};
    pickupType.Fight = 1;
    pickupType.Event = 2;
    pickupType.Cook = 3;
}

if(typeof heroAttr == "undefined") {
    var heroAttr = {};
    heroAttr.Hp = 0;
    heroAttr.STR = 1;
    heroAttr.MAG = 2;
    heroAttr.SKL = 3;
    heroAttr.DEF = 4;
    heroAttr.RESIST = 5;
    heroAttr.AGL = 6;
}


//写文件，写之前先删除
function WriteFile(filename, text) {
    if (cc.sys.isNative === false) {
        return;
    }
    var writePath = jsb.fileUtils.getWritablePath();
    var directory = filename.substr(0, filename.lastIndexOf("/"));
    jsb.fileUtils.createDirectory(writePath + directory);
    cc.log(writePath + directory);
    var wflag = jsb.fileUtils.writeStringToFile(text, writePath + filename);
    if (wflag !== true) {
        cc.log("write file", filename, " failed!");
    }
}

//删文件
function RemoveFile(filename) {
    if (cc.sys.isNative === false) {
        return;
    }
    var writePath = jsb.fileUtils.getWritablePath();
    var fpath = writePath + filename;
    var f = jsb.fileUtils.isFileExist(fpath);
    if (f === true) {
        var d = jsb.fileUtils.removeFile(fpath);
    };
}


var preLoadIconPlistFile = {
    "class": "res/art/ui/icon/plistClass.plist",
    "equip": "res/art/ui/icon/plistEquip.plist",
    "flags": "res/art/ui/icon/plistFlags.plist",
    "hero": "res/art/ui/icon/plistHero.plist",
    "prop": "res/art/ui/icon/plistProp.plist",
    "skill": "res/art/ui/icon/plistSkill.plist",
    "default": "res/art/ui/icon/plistDefault.plist"
};

function preLoadIconPlist(what) {
    if (what) {
        if (preLoadIconPlistFile.hasOwnProperty(what)) {
            cc.spriteFrameCache.addSpriteFrames(preLoadIconPlistFile[what]);
        }
        return;
    }
    for (k in preLoadIconPlistFile) {
        cc.spriteFrameCache.addSpriteFrames(preLoadIconPlistFile[k]);
    }
}

function onMemoryWarningPurgeCachedData() {
    //cc.log("purge");
    preLoadIconPlist();                
}

// 切换游戏服务器对应的更新服务器，返回false表示不切换
// s_url 从gate服务器获得z_us
function switchUdpsrv(parent, s_url) {
    if (!cc.sys.isNative)
        return false;
    cc.log("AAAAAAAAAAAAAAAAA======switchUdpsrv: " + s_url);
    try {
        var flagfile = "__swups";//jsb.fileUtils.getWritablePath()+"update/__swups";
        var flagStr = "__swups";
        var isSwitched = jsb.fileUtils.getStringFromFile(flagfile)==flagStr;
        if (s_url && s_url.length>0) {
            // 测试服
            var v = s_url.split(";");
            if (v.length==0)
                return false;
            var defPatchUrl = v[0];
            var defPkgUrl = defPatchUrl;
            if (v.length>1) {
                defPkgUrl = v[1];
            }
            var defMF = {
                "packageUrl" : defPkgUrl,
                "remoteManifestUrl" : defPatchUrl+"project.manifest",
                "remoteVersionUrl" : defPatchUrl+"version.manifest",
                "version" : "0.01",
                "engineVersion" : "3.10"
            };
            // 获取安装时的原始版本号
            var str=jsb.fileUtils.getStringFromFile('res/project.manifest');
            if (!str)
                return false;
            var initM=JSON.parse(str);
            if (defMF.version < initM.version)
                defMF.version = initM.version;
            // 获取更新时下载的 local project.manifest
            var str=jsb.fileUtils.getStringFromFile('project.manifest');
            ////cc.log("srch: "+JSON.stringify(jsb.fileUtils.getSearchPaths()));
            if (str) {
                // 曾经更新过
                var lcMF=JSON.parse(str);
                var outf = "update/project.manifest";
            } else {
                // 未曾更新过
                var lcMF=initM;
                var outf = "update/res/project.manifest";
            }
            if (isSwitched && lcMF.remoteManifestUrl==defMF.remoteManifestUrl && lcMF.packageUrl==defMF.packageUrl) {
                // 已经切换过，无需切换
                return false;
            }
            lcMF.remoteManifestUrl = defMF.remoteManifestUrl;
            lcMF.remoteVersionUrl = defMF.remoteVersionUrl;
            lcMF.packageUrl = defMF.packageUrl;
            lcMF.version = defMF.version; // 强制检查
            WriteFile(outf, JSON.stringify(lcMF));
            WriteFile("update/"+flagfile, flagStr);
            createMsgBox2(parent, "更新服务器切换完毕，需要重进游戏启动更新",function(tag){
                cc.Director.getInstance().end();
                SysUtil.exit();
                return true;
            },1);
        } else {
            // 正式服
            if (isSwitched) {
                createMsgBox2(parent, "更新服务器切换完毕，需要重进游戏启动更新",function(tag){
                    cc.Director.getInstance().end();
                    SysUtil.exit();
                    return true;
                },1);
                var dir=jsb.fileUtils.getWritablePath()+"update/";
                jsb.fileUtils.removeDirectory(dir);
            } else {
                // 无需切换
                return false;
            }
        }
    } catch (e) {
        cc.log("switchUdpsrv:" + e + ": " + e.stack);
        cc.Director.getInstance().end();
        SysUtil.exit();
    }
    return true;
}
