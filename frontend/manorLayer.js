/**
 * 庄园
 * Created by faps on 2015/10/20.
 */


/**
 * 庄园资源数据
 * @param  {int} id
 * @param  {string} name 资源英文名称
 */
function manorResData(id, name) {
    this.id = id;
    this.name = name;
    this.text = '';
    this.info = '';
    this.level = 1; //资源生产等级
    this.max_level = 15; //最高等级
    this.yield = 0; //产量
    this.capacity = 0; //容量
    this.max_capacity = 0; //最大容量
    this.worker = 0; //工人数量
    this.max_worker = 0; //工人上限
    this.occupys = []; //资源站[id,id]
    this.cost = 0; //生产时消耗食物的数量
}

/**
 * 给生产岗位增加一个工人
 */
manorResData.prototype.addWorker = function () {
    //cc.log(this.name + ' addworker:', this.worker, manorData.worker_num);
    manorData.changeWorker(this.id, 1);
};

/**
 * 从生产岗位减少一个工人
 */
manorResData.prototype.subWorker = function () {
    //cc.log(this.name + ' subworker:', this.worker, manorData.worker_num);
    manorData.changeWorker(this.id, -1);
};

/**
 * 获得资源
 * @param {int} num 数量
 * @return {int} 总量
 */
manorResData.prototype.add = function(num) {
    this.capacity += parseInt(num) || 0;
    if(this.capacity>this.max_capacity) {
        this.capacity = this.max_capacity;
    }
    manorData.onResChange(this);
    return this.capacity;
};

/**
 * 消耗资源
 * @param  {int} num 数量
 * @return {int} 剩余数量
 */
manorResData.prototype.sub = function(num) {
    this.capacity -= parseInt(num) || 0;
    if(this.capacity<0) {
        this.capacity = 0;
    }
    manorData.onResChange(this);
    return this.capacity;
};

/**
 * 取资源库存
 * @returns {int}
 */
manorResData.prototype.get = function() {
    return this.capacity;
};

/**
 * 设置资源库存
 * @param {int} num 库存数量
 * @returns {int}
 */
manorResData.prototype.set = function(num) {
    this.capacity = parseInt(num) || 0;
    if(this.capacity<0) {
        this.capacity = 0;
    }
    if(num>this.max_capacity) {
        this.capacity = this.max_capacity
    }
    manorData.onResChange(this);
    return this.capacity;
};

/**
 * 取库存上限值
 * @returns {int}
 */
manorResData.prototype.getMax = function() {
    return this.max_capacity;
};

/**
 * 资源仓库是否已满
 * @return {bool} true: 满
 */
manorResData.prototype.isFull = function() {
    return (this.capacity >= this.max_capacity);
};

/**
 * 占领一个新的资源站
 * @param  {int} resource_station_id 资源站id
 */
manorResData.prototype.occupyResourceStation = function(resource_station_id) {
    manorData.occupyResourceStation(resource_station_id);
};


/**
 * 庄园数据
 * @type {Object}
 */
var manorData = {
    level: 1, //庄园等级
    worker_num: 0, //空闲工人数
    worker_total: 0, //工人总数
    produce_timestamp: 0, //最后一次收到生产消息的本地时间戳
    produce_cycle: 10, //生产频率：秒
    next_produce: null, //下次生产时间，n秒后
    res_idx: ['', 'food', 'wood', 'iron', 'crystal', 'mithril'],
    res_data: {},
    _merge_msg: false,
    _msg_arr: [],
    _loop_update: 0,

    setMergeMsg: function(t) {
        this._merge_msg = t;
        if(!t) {
            this.showMergeMsg();
        }
    },

    mergeMsg : function(obj) {
        var find = false;
        for(var i in this._msg_arr) {
            var mo = this._msg_arr[i];
            if(mo.name==obj.name) {
                find = true;
                mo.num += obj.num;
                this._msg_arr[i] = mo;
            }
        }
        if(!find) {
            this._msg_arr.push(obj);
        }
    },

    showMergeMsg: function() {
        var lang = tj.cfg.get("text/manor");
        if(Main_Layer && this._msg_arr.length) {
            for(var k in this._msg_arr) {
                var o = this._msg_arr[k];
                var str = lang[o.name] + " +" + o.num;
                if(o.num>0) {
                    tj.wsconnection.pushmsg(msgac["ManorProduce_notice"], str);
                }
            }
            this._msg_arr = [];
        }
        this._merge_msg = false;
    },

    onResChange: function(resData) {
        tj.wsconnection.pushmsg(msgac["Main_refresh_resource"], {}); //通知主界面更新
    },

    init: function() {
        var lang = tj.cfg.get("text/manor");
        for(var k in this.res_idx) {
            var n = this.res_idx[k];
            if(n) {
                var resData = new manorResData(parseInt(k), n);
                resData.text = lang[n] || n;
                if(n=='food') {
                    resData.level = 1;
                    resData.occupys = [1];
                }
                this.res_data[n] = resData;
            }
        }
        //cc.log(this.res_data);
    },

    getResName: function(id) {
        return (this.res_idx[id])?this.res_idx[id]:'';
    },

    getResId: function(res_name) {
        var id = 0;
        for(var i in this.res_idx) {
            if(res_name==this.res_idx[i]) {
                id = i;
            }
        }
        return id;
    },

    registerMsg: function() {
        //tj.wsconnection.addGrp(msgac["Game_data"], msgac["Game_data"], this.receiveMsg.bind(this), "manordata");
        tj.wsconnection.addGrp(sc_manor_start, sc_manor_end, this.receiveMsg.bind(this), 'manordata');
        tj.wsconnection.addGrp(msgac["Game_on_show"], msgac["Game_on_hide"], this.receiveMsg.bind(this), 'manordata');
    },

    /**
     * 向服务器发送请求
     * @param  {int} msg_type 参考msgac里的消息号
     * @param  {string} res_name 资源名称
     * @param  {int} gem 使用宝石: 0否，1:补齐资源, 2:全价宝石
     */
    sendMsg: function(msg_type, res_name, gem) {
        switch(msg_type) {
            case msgac['Manor_upgrade']: //招募工匠
                tj.wsconnection.setMsg(msgac['Manor_upgrade'], {
                    "gem": gem
                });
                break;

            case msgac['Manor_edit_worker']: //修改工匠配置
                var resData = this.getResDataByName(res_name);
                if(resData) {
                    //var r = (Math.random()*10);
                    //if(r>6) {
                    //    cc.log('________ no send worker.');
                    //    break;
                    //}
                    tj.wsconnection.setMsg(msgac['Manor_edit_worker'], {
                        id: parseInt(resData.id),
                        num: parseInt(resData.worker)
                    });
                }
                break;

            case msgac['Manor_up_res']: //升级资源库
                var resData = this.getResDataByName(res_name);
                if(resData) {
                    tj.wsconnection.setMsg(msgac['Manor_up_res'], {
                        "id": resData.id,
                        "gem": gem
                    });
                }
                break;

            case msgac['ManorUI_update']: //更新ui
                tj.wsconnection.pushmsg(msg_type, {});
                break;

            default:
                break;
        }
    },

    /**
     * 服务器消息处理
     * @param  {object} obj 服务器返回的数据
     */
    receiveMsg: function(obj) {
        //cc.log('manorData.receiveMsg: ', obj);

        var data = obj[1]; //数据
        switch (obj[0]) {
            case msgac["Game_on_hide"]: //游戏进入后台
                this.setMergeMsg(true);
                break;
            case msgac["Game_on_show"]: //游戏恢复显示
                this.setMergeMsg(false);
                break;

            case msgac["Manor_produce"]: //庄园生产
                this.update(data);
                break;

            case msgac["Manor_upgrade"]: //升级庄园: 招募工人
                //cc.log("net Manor_upgrade: ", data);
                if(data.ret!=1) {
                    var msg = "";
                    switch(data.ret) {
                        case 0:
                            msg = tj.cfg.get("text/manor/error");
                            break;
                        case 2:
                            msg = tj.cfg.get("text/manor/level_top_limit");
                            break;
                        case 3:
                            msg = tj.cfg.get("text/manor/resource_not_enough");
                            break;
                        case 4:
                            msg = tj.cfg.get("text/manor/gem_not_enough");
                            break;
                    }
                    tj.wsconnection.pushmsg(msgac["ManorUI_pop_msg"], {
                        msg: msg
                    });
                }else{
                    //招募成功
                    this.recruit(data);
                }
                break;

            case msgac["Manor_info"]: //庄园信息更新
                //cc.log('Manor_info:', data);
                if(data && data.hasOwnProperty('resinfo')) {
                    var srv_free_worker = data.free_worker;
                    for (var i in data.resinfo) {
                        var res = data.resinfo[i];
                        var resData = this.getResDataById(res.id);
                        if (resData.worker != res.worker_num) {
                            //工人数与服务器不同
                            if(resData.worker<res.worker_num || srv_free_worker-(resData.worker-res.worker_num)>=0) {
                                //cc.warn('res worker:', resData.name, resData.worker, res.worker_num);
                                //减少分配或工人数足够分配，重发配置给服务器
                                this.worker_num = parseInt(srv_free_worker-(resData.worker-res.worker_num));
                                this.sendMsg(msgac['Manor_edit_worker'], resData.name);
                            }else{
                                //工人数可能不够分配，使用服务器的工人数
                                resData.worker = parseInt(res.worker_num);
                            }
                        }
                    }
                    this._loop_update = 0;
                    this.updateYield();
                    this.sendMsg(msgac['ManorUI_update'], {});
                }
                break;

            case msgac["Manor_edit_worker"]: //分配工人
                if(data.ret==1) {
                    //教学
                    if(tj.mainData.getClientData("help")[3] == 1 && data.worker >= 5){
                        tj.mainData.setClientDataValue("help", 3, 2);
                        tj.wsconnection.pushmsg(msgac["Layer_refresh_help"]);
                    }
                }

                var resData = this.getResDataById(data.id);
                if(this.worker_num!=data.free_population) {
                    //工人数不正常
                    //cc.warn('worker err:', this.worker_num, data.free_population);
                    this.worker_num = parseInt(data.free_population);

                    if(!this._loop_update) {
                        this._loop_update = 1;
                        tj.wsconnection.setMsg(msgac['Manor_info'], {});
                    }
                }
                this.updateYield();
                this.sendMsg(msgac['ManorUI_update'], {});

                break;

            case msgac['Manor_up_res']: //升级资源库
                if(data.ret!=1) {
                    var msg = "";
                    switch(data.ret) {
                        case 0:
                            msg = tj.cfg.get("text/manor/error");
                            break;
                        case 2:
                            msg = tj.cfg.get("text/manor/level_top_limit");
                            break;
                        case 3:
                            msg = tj.cfg.get("text/manor/resource_not_enough");
                            break;
                        case 4:
                            msg = tj.cfg.get("text/manor/gem_not_enough");
                            break;
                    }
                    tj.wsconnection.pushmsg(msgac["ManorUI_pop_msg"], {
                        msg: msg
                    });
                }else{
                    //资源库升级成功
                    this.upgradeRes(data);
                }
                break;

            default:
                break;
        }

        tj.wsconnection.pushmsg(msgac["ManorUI_update"], {}); //通知庄园界面更新
        tj.wsconnection.pushmsg(msgac["Main_refresh_resource"], {}); //通知主界面更新
    },

    /**
     * 更新最后生产时间
     * @private
     */
    _setLastProduceTime: function() {
        this.produce_timestamp = (new Date()).getTime();
    },

    /**
     * 填充庄园数据
     * @param  {object} data 服务器返回的manor数据
     */
    fill: function(data) {
        //cc.log('manorData fill:', data.remain_seconds);

        this._setLastProduceTime();
        this.level = parseInt(data.manor_level) || 0;
        this.worker_num = parseInt(data.free_worker) || 0;
        this.worker_total = parseInt(data.max_worker) || 0;
        this.next_produce = Math.abs(parseInt(data.remain_seconds)) || 30;
        this.produce_cycle = Math.max(1, this.next_produce-2); //初始生产周期-掉大概的延时
        if(data.resinfo) {
            for(var r in data.resinfo) {
                var res = data.resinfo[r];
                var resData = this.getResDataById(res.id);
                //cc.log("fillManorData: ", res.id, this.res_idx[res.id], resData, this.res_data);
                if(resData) {
                    var re = tj.dbdata.getbysql(resData.name+"storage", " order by lv desc limit 1");
                    if(re[0] && re[0]['lv']) {
                        resData.max_level = re[0]['lv'];
                    }
                    resData.level = parseInt(res.storage_lv) || 0;
                    resData.yield = parseInt(res.worker_num) || 0;
                    resData.capacity = parseInt(res.storage) || 0;
                    resData.max_capacity = parseInt(res.maxstorage) || 0;
                    resData.worker = parseInt(res.worker_num) || 0;
                    resData.max_worker = parseInt(res.worker_max) || 0;
                    resData.occupys = res.occupys || [];
                    var cost = tj.dbdata.getValueById("resproduce",  res.id, "cost");
                    resData.cost = (parseInt(cost)>0)?parseInt(cost):0;
                    //var info = tj.dbdata.getValueById("resproduce",  res.id, "info");
                    //resData.info = info?info:'';

                    //新内容提示
                    if(tj.mainData.clientDataHave("new_m", resData.id))
                        resData.isnew = true;
                }
            }
            this.updateYield();
        }

    },

    /**
     * 更新庄园数据
     */
    update: function(data) {
        //cc.log('manorData update:', data.remain_seconds);
        this._setLastProduceTime();
        this.next_produce = data.remain_seconds;
        this.produce_cycle = data.remain_seconds;
        if(data.respro.length) {
            var time_step = 500;
            var delta = 1000;
            for(var k in data.respro) {
                var res = data.respro[k];
                var resData = this.getResDataById(res.id);
                //cc.log("updateManorData: ", res, resData);
                if(resData) {
                    resData.capacity = parseInt(res.sum) || 0;
                    if(resData.capacity>resData.max_capacity) {
                        resData.capacity = parseInt(resData.max_capacity);
                    }
                    if(res.delta>0) {
                        this.mergeMsg({name: resData.name, num: res.delta});
                    }
                    if(!this._merge_msg) {
                        this.showMergeMsg();
                    }
                }
            }
        }
    },

    /**
     * 招募工匠
     * @param {object} data
     */
    recruit: function (data) {
        if(data) {
            if(data.lv == this.level) {
                return;
            }
            this.level = data.lv; //庄园等级
            this.worker_total = data.max_population; //更新工匠总数
            this.worker_num = data.free_population; //更新空闲工匠数
            if (data.gemcost) {
                tj.mainData.subGemNum(data.gemcost); //消耗宝石
            }
            for (var i in data.costs) {
                var num = data.costs[i];
                if(num)
                    this.getResDataById(i).sub(num); //消耗资源
            }
            if(parseInt(data.lv)>1) {
                tj.wsconnection.pushmsg(msgac["ManorUI_pop_msg"], {
                    msg: tj.cfg.get("text/manor/recruit_succeed").format(5)
                });
            }
        }
    },

    /**
     * 升级资源库
     * @param {object} data
     */
    upgradeRes: function(data) {
        if(data) {
            var resData = this.getResDataById(data.id);
            if (resData && data.maxstorage) {
                resData.level = data.lv;
                resData.max_capacity = data.maxstorage;
                if (data.gemcost) {
                    tj.mainData.subGemNum(data.gemcost); //消耗宝石
                }
                for (var i in data.costs) {
                    var num = data.costs[i];
                    if(num)
                        this.getResDataById(i).sub(num); //消耗资源
                }
                tj.wsconnection.pushmsg(msgac["ManorUI_pop_msg"], {
                    msg: tj.cfg.get("text/manor/resource_upgrade_succeed")
                });
                //todo: 成功音效
            }
        }
    },

    /**
     * 统计已在岗工人数
     */
    countWorker: function() {
        var n = 0;
        for(var k in this.res_data) {
            n += this.res_data[k].worker;
        }
        return n;
    },

    /**
     * 分配工人
     * @param  {number} res_id 资源id
     * @param  {number} num      1:加, -1:减
     */
    changeWorker: function(res_id, num) {
        var resData = this.getResDataById(res_id);
        //cc.log('changeWorker:', res_name, num);
        if(resData) {
            //var working_num = this.countWorker();
            if(num>0) {
                if(this.worker_num-1>=0 && resData.worker+1<=resData.max_worker) {
                    resData.worker++;
                    this.worker_num--;
                }
            }else if(num<0) {
                if(resData.worker-1>=0 && this.worker_num+1<=this.worker_total) {
                    resData.worker--;
                    this.worker_num++;
                }
            }
            this.updateYield();
        }
    },

    /**
     * 更新产量信息
     */
    updateYield: function() {
        var food_depletion = 0;
        //除食物之外的资源计算食物消耗
        for(var i=5; i>1; i--) {
            var resData = this.getResDataById(i);
            if(resData) {
                resData.yield = resData.worker;
                food_depletion += parseInt(resData.cost) * parseInt(resData.worker);
            }
        }
        var food = this.getResDataById(1);
        food.yield = food.worker - food_depletion; //食物产量
    },

    /**
     * 占领一个资源站
     * @param {int} resource_station_id 资源站id
     */
    occupyResourceStation: function(resource_station_id) {
        var station_info = tj.dbdata.getrow("resposition", parseInt(resource_station_id));
        if(station_info) {
            var resData = this.getResDataById(station_info["type"]);
            var has_id = false;
            if(resData.occupys.length>0) {
                for(var i in resData.occupys) {
                    if(resData.occupys[i]==resource_station_id) {
                        has_id = true;
                    }
                }
            }
            if(!has_id) {
                //占领新的资源站，增加工人岗位上限
                resData.occupys.push(resource_station_id);
                resData.max_worker += parseInt(station_info["posNum"]) || 0;
                tj.wsconnection.pushmsg(msgac["ManorUI_update"], {});
                //新内容提示
                resData.isnew = true;
                tj.mainData.addClientData("new_m", resData.id);
                tj.wsconnection.pushmsg(msgac["Main_refresh_new"]);
            }
        }
    },

    /**
     * 生产时间倒计时，减掉n秒
     */
    countDownProduce: function(n) {
        if(this.next_produce==null || isNaN(this.next_produce) || this.next_produce<0) {
            this.next_produce = this.produce_cycle;
        }
        //cc.log("countDownProduce:", this.next_produce);
        n = (n==undefined)?1:parseInt(n);
        this.next_produce = this.produce_cycle - n;
    },

    /**
     * 取下次生产时间，是几秒后
     * @return {object} {second: 0(秒), percent: 1(百分比)}
     */
    getNextProduce: function() {
        var sec = this.next_produce;
        if(isNaN(sec) || sec<0) {
            sec = this.produce_cycle;
        }
        return {second: sec, percent: Math.round(sec/this.produce_cycle*100) };
    },

    getResDataById: function(id) {
        var re = null;
        var resName = this.res_idx[id];
        if(resName) {
            re = this.res_data[resName];
        }
        return re;
    },

    getResDataByName: function(name) {
        var re = null;
        if(this.res_data[name]) {
            re = this.res_data[name];
        }
        return re;
    }

};


/**
 * 庄园界面
 */
var manorLayer = baseLayer.extend({
    _ui: null,
    _res_area: null,
    _res_tpl: null,
    _update_dt: 0,
    _lang: null,
    _continuous_time: 0.5, //单位：秒
    _continuous_dt: 0,
    _continuous_opt: null,
    _send_setting: '',
    _send_dt: 0,
    _template_food:null,
    _template_wood:null,
    _template_iron:null,
    _template_crystal:null,
    _template_mithril:null,
    _training_step: 0,
    _helpmove:false,

    ctor : function() {
        this._super();
        this._basename = "manor";
        this.init();
    },

    _gts : function() {
        return (new Date()).getTime()/1000;
    },

    init : function () {
        if (!this._super()) {
            return false;
        }
        //加载ui
        this._ui = this.load_ui("uiManor.json");

        if (!this._ui)
            return false;

        this.create_control();
        //去掉按钮
        var btnRight = WidgetDig(this._ui, "title/btnRight");
        if(btnRight)
            btnRight.removeFromParent(true);

        var btnLeft = WidgetDig(this._ui, "title/btnLeft");
        if(btnLeft)
            btnLeft.removeFromParent(true);

        var ui_root = this._ui;

        this._continuous_time = (parseInt(tj.cfg.get("designdata/configNum/clickTime"))/1000).toFixed(2);

        //读取本地化语言文本信息
        this._lang = tj.cfg.get("text/manor");

        //资源仓库
        this._res_area = WidgetDig(ui_root, "main/list");
        this._res_tpl = WidgetDig(ui_root, "main/list/food");
        // this._res_tpl.retain();
        this.setRetain(this._res_tpl, "uitmpl");
        this._res_area.removeAllChildren();
        //this.updateUI();

        //时钟时间
        WidgetDig(ui_root, "main/bar/textTime").setString(this._lang["gather_time"].format(''));

        //关闭按钮
        WidgetDig(ui_root, "set/btnClosed/text").setString(tj.cfg.get("text_on_ui/close"));

        //添加ui到界面
        this.addChild(ui_root);

        return true;
    },

    onEnter : function(){
        this._super();
         //监听UI消息
        this.registerMsg();
        this.createResItemOrder(this.getOrderResIds());
        this.updateUI();
        this.updateUILV();
        playUIAnimate(this._ui, "main/bar/anTime", true); //时钟动画
        this.refreshHelp();

        //var node1 = ccs.sceneReader.createNodeWithSceneFile("res/art/scPK.json");//创建场景
        //this.addChild(node1, 1, 1);//把场景添加到当前layer，
        //ccs.actionManager.playActionByName("startMenu_1.json", "Animation1");//设置ui的动画

        //粒子动画测试 -----------------
        /*if(!this._ps_test) {
            this._ps_test = true;
            var that = this;
            var ps = new cc.ParticleFire(300);
            that.__ps = ps;
            var btn = WidgetDig(that._ui, "main/list/wood");
            btn.setOpacity(255);
            ps.texture = cc.textureCache.addImage('res/art/map/mine.png');
            ps.setPosition(btn.getParent().convertToWorldSpace(cc.pAdd(btn.getPosition(), cc.p(90, -90))));
            that.addChild(ps);
            var woodData = manorData.getResDataById(2);
            var woodnum = woodData.capacity;
            var woodmax = woodData.max_capacity;
            var substep = Math.round(woodnum / 52);
            var capacity_str = that._lang["capacity"];
            that.schedule(function(){
                var capacity_label = ccui.helper.seekWidgetByName(btn, "textExplain");
                woodnum -= substep;
                capacity_label.setString(capacity_str.format(woodnum, woodmax));
                capacity_label.color = cc.color("#FFFFFF");
            }, 0.02, 50);
            that.scheduleOnce(function () {
                var ac = cc.sequence(cc.callFunc(function () {
                    ps.stopSystem();
                }), cc.delayTime(2), cc.callFunc(function () {
                    that.removeChild(ps);
                    delete that.__ps;
                    that.noticetext_add("【庄园】着火了...");
                    that.noticetext_add("损失了不少木材");
                }));
                btn.runAction(ac);
            }, 3);
        }*/
        //cc.loader.load("res/art/animation/attack/snowfire.plist", function(res) {
        //    var ps2 = new cc.ParticleSystem("res/art/animation/attack/snowfire.plist");
        //    ps2.setAutoRemoveOnFinish(true);
        //    //ps.texture = cc.textureCache.addImage('res/art/map/mine.png');
        //    ps2.setPosition(cc.p(200, 860));
        //    that.addChild(ps2);
        //});
        //----------------------------
    },

    onExit: function() {
        this._super();
        this._res_area.removeAllChildren();
        this.unscheduleAllCallbacks();

        if(tj.mainData.getClientData("help")[3]==5) {
            tj.mainData.setClientDataValue("help", 3, 6);
            tj.mainData.setClientDataValue("help", 1, 3);
            tj.wsconnection.pushmsg(msgac["Main_refresh_help"]);
        }
    },

    createResItemOrder: function(id_arr) {
        //按id数组创建资源仓库
        if(id_arr) {
            this._res_area.removeAllChildren();
            for (var i in id_arr) {
                var resData = manorData.getResDataById(id_arr[i]);
                var resItem = this._res_tpl.clone();
                //resItem.setTag(this._res_tpl.getTag()+(parseInt(i)*1000));
                resItem.setContentSize(this._res_tpl.getContentSize());
                resItem.name = resData.name;
                var icon = WidgetDig(resItem, "btnMain/portraits/icon");
                icon.loadTexture(this.getResIcon(resData.name), ccui.Widget.PLIST_TEXTURE);
                this._res_area.addChild(resItem);
            }
        }
    },

    getOrderResIds: function() {
        //按资源id排序，无资源站的排后面
        var sarr = [];
        var harr = [];
        for(var item in manorData.res_data) {
            var resData = manorData.res_data[item];
            if(resData.occupys.length) {
                sarr.push(resData.id);
            }else{
                harr.push(resData.id);
            }
        }
        return sarr.sort().concat(harr);
    },

    getResIcon: function(res_name) {
        //图标
        return "ui/icon/prop/res"+ res_name.toLowerCase().replace(/(\w)/, function(v) { return v.toUpperCase(); }) +".png";
    },

    registerMsg: function() {
        tj.wsconnection.addGrp(msgac["ManorUI_pop_msg"], msgac["ManorUI_update"], this.receiveMsg.bind(this), this.get_scene_name());
        tj.wsconnection.addGrp(msgac["Layer_refresh_help"], msgac["Layer_refresh_help"], this.receiveMsg.bind(this), this.get_scene_name());
        tj.wsconnection.addGrp(msgac["ManorProduce_notice"], msgac["ManorProduce_notice"], this.receiveMsg.bind(this), this.get_scene_name());
    },

    receiveMsg: function(obj) {
        //cc.log("manorLayer receiveMsg:", obj);
        var ac = obj[0];
        var data = obj[1];

        switch(ac) {
            case msgac["ManorUI_pop_msg"]:
                //this.pop_noticemsg(data.msg);
                createMainNoticeBox(data.msg);
                break;
            case msgac["ManorUI_update"]:
                this.updateUI();
                this.updateUILV();
                break;
            case msgac["Layer_refresh_help"]:
                this.refreshHelp();
                break;
            case msgac["ManorProduce_notice"]:
                this.noticetext_add(data);
                break;
        }
    },

    update: function(dt) {
        this._super();
        this._update_dt += dt;

        //每秒执行一次
        if(this._update_dt>1) {
            this._update_dt--;

            //生产时间减1秒
            var now = (new Date()).getTime();
            var t = Math.floor((now - manorData.produce_timestamp)/1000); //距离最后生产多久了：秒?
            //cc.log('manor time left:', t);
            manorData.countDownProduce(t);

            //进度条
            this.updateUIProcessBar(manorData.getNextProduce());
        }

        //长按+-按钮
        if(this._continuous_opt) {
            this._continuous_dt += dt;
            if (this._continuous_dt > this._continuous_time) {
                //this._continuous_dt -= 0.10;
                this._setWorker();
                this.updateUILV();
            }
        }else{
            this._continuous_dt = 0;
        }

        //发送工人分配
        if(this._send_setting) {
            this._send_dt += dt;
            if(this._send_dt > 0.2) {
                manorData.sendMsg(msgac['Manor_edit_worker'], this._send_setting);
                this._send_setting = '';
                this._send_dt = 0;
            }
        }else{
            this._send_dt = 0;
        }
    },

    updateUI: function() {
        if (!this._ui)
            return false;

        //招募按钮
        var recruit_btn = WidgetDig(this._ui, "set/btnRecruit/text");
        recruit_btn.setString(this._lang["recruit"]);
        this.setContentString(recruit_btn, this._lang['recruit']);

        //更新界面显示 庄园等级和工人数量
        this.updateUILV();

        //资源库
        for (var item in manorData.res_data) {
            this.updateUIResItem(manorData.res_data[item]);
        }
    },

    updateUILV: function() {
        var ui_root = this._ui;

        //庄园等级
        //ccui.helper.seekWidgetByName(ui_root, "textLevel").setString(this._lang["lv"] + manorData.level);

        //工人数
        ccui.helper.seekWidgetByName(ui_root, "textRight").setString(this._lang["artisan"] + manorData.worker_num);// + "/" + manorData.worker_total);

    },

    updateUIResItem: function(itemData) {
        var ui_root = this._ui;
        var resItem = ccui.helper.seekWidgetByName(ui_root, itemData.name);
        //resItem.setTag(itemData.id * 10000);
        //cc.log("updateUIResItem: ", itemData.name);

        //资源名称
        var name_str = this._lang[itemData.name];
        ccui.helper.seekWidgetByName(resItem, "textName").setString(name_str.format(itemData.level));

        //资源说明
        //var restip_str = this._lang[itemData.name+"_tip"];
        //ccui.helper.seekWidgetByName(resItem, "textExplain").setString(restip_str);

        //产量
        this.updateUIResYield(itemData.name);

        //储量
        var capacity_str = this._lang["capacity"];
        var capacity_label = ccui.helper.seekWidgetByName(resItem, "textExplain");
        capacity_label.setString(capacity_str.format(itemData.capacity, itemData.max_capacity));
        if(itemData.capacity==itemData.max_capacity) {
            capacity_label.color = cc.color(220,0,0); //红
        }else{
            capacity_label.color = cc.color("#FFFFFF"); //白
        }

        //工人分配数量
        ccui.helper.seekWidgetByName(resItem, "textNum").setString(itemData.worker + "/" + itemData.max_worker);

        //是否拥有资源站
        if(itemData.occupys.length<1) {
            //resItem.color = cc.color("#4D4D4D");
            //resItem.enabled = false;
            resItem.visible = false;
        }else{
            resItem.visible = true;
        }

        //升级按钮文本
        var lable_upgrade = WidgetDig(resItem, "btnUpgrade/text");
        lable_upgrade.setString(this._lang['res_upgrade']);
        this.setContentString(lable_upgrade, this._lang['res_upgrade']);
        WidgetDig(resItem, "btnUpgrade").setVisible((itemData.level != itemData.max_level));

        //设置按钮tag
        ccui.helper.seekWidgetByName(resItem, "add").rn = "btn_add_worker_" + itemData.name; //工人加
        ccui.helper.seekWidgetByName(resItem, "min").rn = "btn_sub_worker_" + itemData.name; //工人减
        ccui.helper.seekWidgetByName(resItem, "btnUpgrade").rn = "btn_res_upgrade_" + itemData.name; //升级储量
        ccui.helper.seekWidgetByName(resItem, "btnMain").rn = "btn_res_info_" + itemData.name; //资源站列表

        //ccui.helper.seekWidgetByName(resItem, "btnMain").enabled = false;
        ccui.helper.seekWidgetByName(resItem, "lock").setVisible(false);
        if(itemData.isnew)
            ccui.helper.seekWidgetByName(resItem, "lock").setVisible(true);
    },

    updateUIResYield: function(res_name) {
        //更新资源产量
        var itemData = manorData.getResDataByName(res_name);
        var ui_root = this._ui;
        var resItem = ccui.helper.seekWidgetByName(ui_root, res_name);
        if(itemData && resItem) {
            var yield_str = this._lang["yield"];
            var yield_label = ccui.helper.seekWidgetByName(resItem, "textSP");
            yield_label.setString(yield_str.format((itemData.yield >= 0 ? '+' : ''), itemData.yield));
            if (itemData.yield == 0) {
                yield_label.visible = false;
            } else {
                yield_label.visible = true;
                if (itemData.yield < 0) {
                    yield_label.color = cc.color(220, 0, 0); //红
                } else {
                    yield_label.color = cc.color("#FFFFFF"); //白
                }
            }
        }
    },

    updateUIProcessBar: function(next_produce) {
        var ui_root = this._ui;
        var percent = parseInt(Math.round(next_produce.percent)) || 0;
        var sec = next_produce.second;

        //进度条背景
        WidgetDig(ui_root, "main/bar/Loading").setPercent(percent);
        if(sec<10) {
            sec = '0' + sec;
        }
        //ccui.helper.seekWidgetByTag(ui_root, 1446).setString(this._lang["gather_time"].format("00:" + sec));
        ccui.helper.seekWidgetByName(ui_root, 'textTime').setString(("%s").format("00:" + sec));
    },

    showRecruit: function() {
        //招募
        var that = this;
        var upgrade_info = tj.dbdata.getbysql("manor",  "where (lv == " + (manorData.level+1) +")")[0];
        if(upgrade_info==undefined || upgrade_info["cost1"]==0) {
            that.noticetext_add(that._lang["worker_top_limit"]);
        }else{
            var res_id = upgrade_info.cost1; //需要的资源id
            var need_num = upgrade_info.val1; //需要的资源数量
            var result_text = that._lang['recruit_tip'].format(5); //升级成功后得到什么
            var gemRate = tj.dbdata.getValueById("resproduce", res_id, "gemRate"); //宝石兑换资源的比例

            var ul = new upgradeLayer(function () {
                return upgradeLayer.buildData(res_id, need_num, result_text, "manorRecruit");
            }, function (v) {
                cc.log('upgradeLayer return:', typeof(v), v);
                switch (v) {
                    case 0: //升级
                        manorData.sendMsg(msgac['Manor_upgrade'], "", 0); //资源升级
                        break;
                    case 1: //使用宝石
                        var gl = new useGemLayer(function () {
                            return useGemLayer.buildData(res_id, need_num, gemRate, 'manorRecruitGem');
                        }, function (v) {
                            cc.log("useGemLayer return:", typeof(v), v);
                            switch (v) {
                                case 0: //全额宝石
                                    manorData.sendMsg(msgac['Manor_upgrade'], "", 2);
                                    break;
                                case 1: //宝石补齐
                                    manorData.sendMsg(msgac['Manor_upgrade'], "", 1);
                                    break;
                                default:
                                    break;
                            }
                        });
                        that.addChild(gl);
                        gl._tjParent = that;
                        that._curr_popLayer = gl;
                        break;
                    default:
                        break;
                }
                return true; //true 关闭招募层
            });
            that.addChild(ul);
            ul._tjParent = that;
        }
    },

    showResUpgrade: function(res_name) {
        //升级资源库，增加工匠上限
        var that = this;
        var upgrade_resData = manorData.getResDataByName(res_name);
        var upgrade_info = tj.dbdata.getbysql(res_name + "storage", "where (lv == " + (upgrade_resData.level+1) + ")")[0];
        if(upgrade_info==undefined || upgrade_info["cost1"]==0) {
            that.noticetext_add(that._lang["level_top_limit"]);
        }else{
            var res_id = upgrade_info.cost1; //需要的资源id
            var need_num = upgrade_info.val1; //需要的资源数量;
            var result_text = that._lang['resource_upgrade_tip'].format(that._lang[res_name], upgrade_info.capacity); //升级成功后得到什么
            var gemRate = tj.dbdata.getValueById("resproduce", res_id, "gemRate"); //宝石兑换资源的比例
            //var need_res_name = manorData.getResName(upgrade_info.cost1);

            var ul = new upgradeLayer(function () {
                return upgradeLayer.buildData(res_id, need_num, result_text);
            }, function (v) {
                cc.log('upgradeLayer return:', typeof(v), v);
                switch (v) {
                    case 0: //升级
                        manorData.sendMsg(msgac['Manor_up_res'], res_name, 0); //资源升级
                        break;
                    case 1: //使用宝石
                        var gl = new useGemLayer(function () {
                            return useGemLayer.buildData(res_id, need_num, gemRate);
                        }, function (v) {
                            cc.log("useGemLayer return:", typeof(v), v);
                            switch (v) {
                                case 0: //全额宝石
                                    manorData.sendMsg(msgac['Manor_up_res'], res_name, 2);
                                    break;
                                case 1: //宝石补齐
                                    manorData.sendMsg(msgac['Manor_up_res'], res_name, 1);
                                    break;
                                default:
                                    break;
                            }
                        });
                        that.addChild(gl);
                        gl._tjParent = that;
                        break;
                    default:
                        break;
                }
                return true; //true 关闭升级层
            });
            that.addChild(ul);
            ul._tjParent = that;
        }
    },

    showResourceTip: function(res_name) {
        //资源消耗产出提示
        var resData = manorData.getResDataByName(res_name);
        if(resData instanceof manorResData) {
            var _lang = this._lang;
            var str = '';
            if(resData.cost<1) {
                str = _lang["output"] + _lang[res_name] + "+1";
            }else{
                str = _lang["expend"] + _lang["food"] + "-" + resData.cost + "\n"+ _lang["output"] + _lang[resData.name] + "+1";
            }
            if(str) {
                //str = resData.info + "\n\n" + str;
                this._curr_popLayer = createNoteBox(this, str, form_t.manor, null);
                return this._curr_popLayer;
            }
        }
        return null;
    },

    _setWorker: function() {
        if(this._continuous_opt) {
            //cc.log("_setWorker:", this._continuous_opt);
            var res_name = this._continuous_opt.res; //资源名
            var opt = this._continuous_opt.opt; //操作;
            var resData = manorData.getResDataByName(res_name);
            if(opt=="+") {
                resData.addWorker();
                if (resData.worker > 0 && resData.worker >= resData.max_worker) {
                    this.noticetext_add(this._lang["worker_full"]);
                    this._continuous_opt = null;
                }
            }else{
                resData.subWorker();
                if(resData.worker<=0) {
                    this._continuous_opt = null;
                }
            }
            this.updateUIResYield('food');
            this.updateUIResItem(resData);
        }
    },

    lockUI:function(lock){
        WidgetDig(this._ui, "main/list").setEnabled(!lock);
        WidgetDig(this._ui, "set/btnClosed").setEnabled(!lock);
        WidgetDig(this._ui, "main/list/food/more/num/min").setEnabled(!lock);
        WidgetDig(this._ui, "main/list/food/more/num/add").setEnabled(!lock);
        WidgetDig(this._ui, "main/list/food/btnUpgrade").setEnabled(!lock);
        WidgetDig(this._ui, "main/list/food/btnMain").setEnabled(!lock);
        WidgetDig(this._ui, "set/btnRecruit").setEnabled(!lock);
    },

    refreshHelp:function(){
        if(this._helphand)
            this._helphand.stop();
        this.lockUI(false);

        if(tj.mainData.isHelpDone())
            return;

        //新手（庄园阶段）
        if(tj.mainData.getClientData("help")[3]==0) {
            this.lockUI(true);

            var note = createNoteBox(this, tj.cfg.get("text/help/manor1"), form_t.castleLayer);
            note.setPos(375, 620);
        }else if(tj.mainData.getClientData("help")[3]==1) {
            note = createNoteBox(this, tj.cfg.get("text/help/manor2"), form_t.castleLayer);
            note.setPos(375, 620);

            this.load_helphand(this, "click");
            var add = WidgetDig(this._ui, "main/list/food/more/num/add");
            var addworld = add.convertToWorldSpace(cc.p(0, 0));
            var pos = this.convertToNodeSpace(addworld);
            pos.x += add.getContentSize().width/2;
            pos.y += add.getContentSize().height/2;
            this._helphand.setpos(pos.x, pos.y);
            this.lockUI(true);
            WidgetDig(this._ui, "main/list").setEnabled(true);
            WidgetDig(this._ui, "main/list/food/more/num/add").setEnabled(true);
        }else if(tj.mainData.getClientData("help")[3]==2){
            this.load_helphand(this, "default");
            var bar = WidgetDig(this._ui, "main/bar");
            var barworld = bar.convertToWorldSpace(cc.p(0, 0));
            pos = this._ui.convertToNodeSpace(barworld);
            pos.x += bar.getContentSize().width/2;
            pos.y += bar.getContentSize().height/2;
            this._helphand.moveto(pos, 1);
            this._helpmove = true;
            this.schedule(this.help_move_done, 1);
            this.lockUI(true);
            note = createNoteBox(this, tj.cfg.get("text/help/manor3"), form_t.castleLayer)
            note.setPos(375, 100);
        }else if(tj.mainData.getClientData("help")[3]==3){
            this.lockUI(true);
            var btn = WidgetDig(this._ui, "set/btnRecruit");
            btn.setEnabled(true);
            var btnworld = btn.convertToWorldSpace(cc.p(0, 0));
            pos = this._ui.convertToNodeSpace(btnworld);
            pos.x += btn.getContentSize().width/2;
            pos.y += btn.getContentSize().height/2;
            this.load_helphand(this, "default");
            this._helphand.moveto(pos, 1, "click");
            this._helpmove = true;
            this.schedule(this.help_move_done, 1);
            note = createNoteBox(this, tj.cfg.get("text/help/manor4"), form_t.castleLayer)
            note.setPos(375, 100);
        }else if(tj.mainData.getClientData("help")[3]==4){
            if(this._curr_popLayer == null){
                note = createNoteBox(this, tj.cfg.get("text/help/manor5"), form_t.castleLayer)
                note.setPos(375, 620);
            }
            tj.mainData.setClientDataValue("help", 3, 5);
        }
    },

    help_move_done:function(){
        this._helpmove = false;
    },

    on_touch_Ended: function () {
        if(this._helpmove)
            return;
        if(tj.mainData.getClientData("help")[3]==0) {
            tj.mainData.setClientDataValue("help", 3, 1);
            this.refreshHelp();
        }else if(tj.mainData.getClientData("help")[3]==2){
            tj.mainData.setClientDataValue("help", 3, 3);
            this.refreshHelp();
        }
    },

    defaultTouchButton : function(btn, type){
        var that = this;
        var res_name = (btn["rn"]?btn["rn"]:"").toString().split('_')[3] || '';
        var resData = null;

        //cc.log(btn.parent.parent.name, btn.name, btn.rn, type);

        switch(type) {
            case ccui.Widget.TOUCH_BEGAN: //按下
                switch(btn.rn) {
                    case 'btn_add_worker_food':
                    case 'btn_add_worker_wood':
                    case 'btn_add_worker_iron':
                    case 'btn_add_worker_mithril':
                    case 'btn_add_worker_crystal':
                        //资源add按钮按下, 加值
                        this._send_setting = '';
                        this._send_dt = 0;

                        this._continuous_opt = {opt:"+", res:res_name};
                        this._setWorker();
                        this.updateUILV();
                        break;

                    case 'btn_sub_worker_food':
                    case 'btn_sub_worker_wood':
                    case 'btn_sub_worker_iron':
                    case 'btn_sub_worker_mithril':
                    case 'btn_sub_worker_crystal':
                        //资源sub按钮按下, 减值
                        this._send_setting = '';
                        this._send_dt = 0;

                        this._continuous_opt = {opt:"-", res:res_name};
                        this._setWorker();
                        this.updateUILV();
                        break;

                    default:
                        break;
                }
                break;

            case ccui.Widget.TOUCH_ENDED: //放开
                switch(btn.name) {
                    case 'btnClosed':
                        //this.visible = false;
                        this.set_release();
                        if( tj.mainData.getClientData("new_m").length > 0){
                            tj.mainData.clientDataClear("new_m");
                            tj.wsconnection.pushmsg(msgac["Main_refresh_new"]);
                        }
                        for (var item in manorData.res_data) {
                            var resdata = manorData.res_data[item];
                            resdata.isnew = false;
                        }
                        break;

                    case 'btnRecruit': //招募
                        this.showRecruit();
                        if(this._helphand)
                            this._helphand.stop();
                        break;
                    default:
                        break;
                }
                switch(btn.rn) {
                    case 'btn_add_worker_food':
                    case 'btn_add_worker_wood':
                    case 'btn_add_worker_iron':
                    case 'btn_add_worker_mithril':
                    case 'btn_add_worker_crystal':
                    case 'btn_sub_worker_food':
                    case 'btn_sub_worker_wood':
                    case 'btn_sub_worker_iron':
                    case 'btn_sub_worker_mithril':
                    case 'btn_sub_worker_crystal':
                        //资源add,sub 按钮释放, 发送请求
                        if(res_name) {
                            //this._setWorker();
                            this._continuous_opt = null;
                            this._continuous_dt = 0;

                            this._send_setting = res_name;
                            //manorData.sendMsg(msgac['Manor_edit_worker'], res_name);
                        }
                        break;
                    case 'btn_res_upgrade_food':
                    case 'btn_res_upgrade_wood':
                    case 'btn_res_upgrade_iron':
                    case 'btn_res_upgrade_mithril':
                    case 'btn_res_upgrade_crystal':
                        //资源升级按钮
                        if(res_name) {
                            this.showResUpgrade(res_name);
                        }
                        break;

                    case 'btn_res_info_food':
                    case 'btn_res_info_wood':
                    case 'btn_res_info_iron':
                    case 'btn_res_info_mithril':
                    case 'btn_res_info_crystal':
                        //资源消耗和产出
                        if(res_name) {
                            var layer = that.showResourceTip(res_name, btn.getParent());
                            var p = btn.getParent();
                            var bp = btn.getPosition();
                            bp.y = -90;
                            var pos = p.convertToWorldSpace(bp);
                            this.convertToNodeSpace(pos);
                            var box = WidgetDig(layer._ui, "box");
                            layer.transIn(N_TRANS_IN_ANI, N_TRANS_IN_TIEM, {
                                ease: N_TRANS_IN_EASE,
                                any: (pos.y+260)/cc.director.getWinSize().height
                            });
                            box.setPosition(pos);
                        }
                        break;

                    default:
                        break;
                }
                if(btn.rn){
                    var resdata = manorData.getResDataByName(res_name);
                    if(resdata.isnew){
                        var resItem = ccui.helper.seekWidgetByName(this._ui, res_name);
                        ccui.helper.seekWidgetByName(resItem, "lock").setVisible(false);
                        tj.mainData.removeClientData("new_m", resdata.id);
                        tj.wsconnection.pushmsg(msgac["Main_refresh_new"]);
                        resdata.isnew = false;
                    }
                }
                break;
            case ccui.Widget.TOUCH_CANCELED:  //取消, 按下后移出按钮区域放开(某些控件)
                //cc.log('touch cancel:', res_name);
                if(res_name) {
                    this._continuous_opt = null;
                    this._continuous_dt = 0;
                    this._send_setting = res_name;
                }
                break;
        }
    }

});
