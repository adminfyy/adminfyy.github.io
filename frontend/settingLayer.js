/**
 * 游戏设置
 * Created by faps on 2016/6/3.
 */

// 每次分享，随机加上该内容项，避免重复被拒
var SHARE_RANDOM_CONTENT = ["^ ^", " ", ""];

var mk_vry = 2016092221;

// 记录来自服务器的显示按钮信息
var settingBtnsFromServer = [];

var settingLayer = baseLayer.extend({
    _lang: [],
    _hide_t: 0, //记录点击隐藏gm的次数,达到5次时请求gm
    _click_time: 0, //记录上一次点击隐藏gm的时间，两次点击超过1.5s即重置hide_t
    _cs_info: '',
    _allBtnTypes : ["class","other","map"],

    ctor: function() {
        this._super();
        this._basename = "setting";
    },

    init: function() {
        if (!this._super())
            return false;
        this._ui = this.load_ui("uiSet.json");
        if (!this._ui)
            return false;
        this.addChild(this._ui);

        this._lang = tj.cfg.get("text/setting");

        //按钮
        WidgetDig(this._ui, "list/data1/textName").setString(this._lang["progress"]); //选择进度
        WidgetDig(this._ui, "list/data2/textName").setString(this._lang["language"]); //切换语言
        WidgetDig(this._ui, "list/data3/textName").setString(this._lang["about"]); //关于我们
        WidgetDig(this._ui, "list/data4/textName").setString(this._lang["statistics"]); //数据统计

        //条
        WidgetDig(this._ui, "sound/sliderMusic").addEventListener(this.musicVolumeChange, this);
        WidgetDig(this._ui, "sound/sliderSound").addEventListener(this.effectVolumChange, this);

        //隐藏没有实现的功能按钮
        WidgetDig(this._ui, "list/data2").removeFromParent();

        //默认隐藏全部小按钮
        for(var i in this._allBtnTypes){
            var type = this._allBtnTypes[i];
            var s_area = WidgetDig(this._ui, type,false);
            var s_btns = [];
            if (s_area) {
                s_btns = s_area.getChildren();
                for (var i in s_btns) {
                    var bn = s_btns[i].name;
                    var txt = s_btns[i].getChildByName("text");
                    if(txt) {
                        txt.setString(this._lang["small_btns"][bn]);
                    }
                    s_btns[i].setVisible(false);
                }
            }
        }

        //关闭按钮
        WidgetDig(this._ui, "set/btnClosed/text").setString(this._lang["close"]);
        WidgetDig(this._ui, "class/btnShare/gem").setVisible(false);

        //gm设置
        tj.wsconnection.addGrp(msgac["GM_request"], msgac["GM_set"], this.process_ac.bind(this), this.get_scene_name());
        tj.wsconnection.addGrp(msgac["Statistics_info"], msgac["Statistics_info"], this.process_ac.bind(this), this.get_scene_name());

        //兑换码消息
        tj.wsconnection.addGrp(msgac["Verify_cdkey"], msgac["Verify_cdkey"], this.process_ac.bind(this), this.get_scene_name());
        //移动速度消息
        tj.wsconnection.addGrp(msgac["Map_mv_speedup"], msgac["Map_mv_speedup"], this.process_ac.bind(this), this.get_scene_name());

        var text = WidgetDig(this._ui, "text");
        text.addTouchEventListener(this.defaultTouchButton, this);

        this.refreshBtnMove();

        return true;
    },

    refreshBtnMove:function(){
        var icon = WidgetDig(this._ui, "other/btnMove/icon");
        var tex = "ui/icon/class/classMove1.png";
        if(tj.mainData.main.mv_mutiple == 2)
            tex = "ui/icon/class/classMove2.png";
        icon.loadTexture(tex, ccui.Widget.PLIST_TEXTURE);
    },

    onEnter: function() {
        this._super();

        //显示按钮
        var show_btns = tj.mainData.main.settingbuttons || ''; // "btnGamecenter,btnPush,btnThumb,btnMoregame,btnShare,btnStatistics";
        if (show_btns) {
            var b_arr = show_btns.split(',');
            if (b_arr.length > 0) {
                if(b_arr[0] == '*') {
                    b_arr = [];
                    for(var flag in this._allBtnTypes){
                        var type = this._allBtnTypes[flag];
                        var typeUI = WidgetDig(this._ui, type);
                        if(typeUI){
                            var btns = typeUI.getChildren();
                            if (btns) {
                                for (var k in btns) {
                                    b_arr.push(btns[k].name);
                                }
                            }
                        }
                    }
                }
                for (var i in b_arr) {
                    for(var flag in this._allBtnTypes) {
                        var type = this._allBtnTypes[flag];
                        var btn = WidgetDig(this._ui, type + "/" + b_arr[i],false);
                        if(btn) {
                            btn.setVisible(true);
                        }
                    }
                    settingBtnsFromServer.push(b_arr[i]);
                }
            }
            // 苹果审核人员不受后台控制，一直是显示状态
            if(cc.tj.isReviewChk){
                // 录像按钮
                WidgetDig(this._ui, "other/btnVideo").setVisible(true);
            }
            if(!SDKTools.isNativeSupport33250() || replayBox_force_hide){
                WidgetDig(this._ui, "other/btnVideo").setVisible(false);
            }
            for(var flag in this._allBtnTypes) {
                var type = this._allBtnTypes[flag];
                var typeUI = WidgetDig(this._ui, type);
                if(typeUI){
                    formation(typeUI, 10, 'center', 0, true);
                }
            }
        }

        // 地图近期掉落装备按钮处理
        if(settingBtnsFromServer.indexOf("btnDrop") != -1){
            var btnDrop = WidgetDig(this._ui, "map/btnDrop");
            if(btnDrop){
                btnDrop.setVisible(tj.isInMap);
            }
            var typeUI = WidgetDig(this._ui, "map");
            if(!tj.isInMap && typeUI){
                formation(typeUI, 10, 'center', 0, true);
            }
        }

        //文本
        //"customer_service": "iOS官方3群 278220547",
        var ver = cc.tj.UpdateVer;
        if(isNaN(ver) || ver==null || ver==undefined || ver<0) {
            ver = 1.0;
        }
        var mv = parseInt(ver);
        var sv = Math.round((ver * 100) - mv*100);
        var txt = this._lang["version"].format(mv+'.0.'+sv, cc.tj.BuildVer) + this._lang["user_id"].format(tj.mainData.uid);
        if (tj.setting.hasOwnProperty("qqgroup")) {
            txt += tj.setting.qqgroup + "\n";
        }
        if (tj.setting.hasOwnProperty("other")) {
            txt += tj.setting.other + "\n";
        }
        WidgetDig(this._ui, "text/qq").setString(txt);

        var audio_setting = tj.audio.loadSoundSetting();
        cc.log(audio_setting);
        this.musicState(audio_setting[0]);
        this.soundState(audio_setting[1]);

        WidgetDig(this._ui, "sound/sliderSound").setPercent(tj.audio.getEffectVolume() * 100);
        WidgetDig(this._ui, "sound/sliderMusic").setPercent(tj.audio.getMusicVolume() * 100);

        this.refreshShareUI();
        this.refreshVedioUI();
        tj.wsconnection.addGrp(msgac["Share_result"], msgac["Share_result"], this.process_ac.bind(this), this.get_scene_name());
    },

    onExit: function() {
        this._super();
        tj.audio.saveSoundSetting();
    },

    refreshShareUI: function() {
        var shareInfo = getNextShareInfo();
        SDKTools.sdkLog("shareInfo", shareInfo);
        if (shareInfo.hasGem == 1) {
            WidgetDig(this._ui, "class/btnShare/gem").setVisible(true);
            WidgetDig(this._ui, "class/btnShare/gem/text").setString("+" + shareInfo.addGem);
        } else {
            WidgetDig(this._ui, "class/btnShare/gem").setVisible(false);
        }
    },

    refreshVedioUI : function(){
        var replayBoxData = tj.mainData.getClientData(clientData_key_replayBox);
        var vedioText = WidgetDig(this._ui,"other/btnVideo/text");
        if(replayBoxData && replayBoxData.visible && vedioText){
            vedioText.setString(tj.cfg.get("vedioRecorder/hide"));
        }else{
            vedioText.setString(tj.cfg.get("vedioRecorder/show"));
        }
    },

    musicVolumeChange: function(obj, type) {
        var old_val = tj.audio.getMusicVolume();
        var val = parseFloat(obj.getPercent() / 100).toFixed(2);
        //cc.log('musicVolumeChange:', arguments, obj.getPercent(), val);
        tj.audio.setMusicVolume(val);
        if (old_val == 0 && val > 0) {
            tj.audio.resumeMusic();
        }
    },

    effectVolumChange: function(obj, type) {
        var val = parseFloat(obj.getPercent() / 100).toFixed(2);
        //cc.log('effectVolumChange:', arguments, obj.getPercent(), val);
        tj.audio.setEffectVolume(val);
    },

    musicState: function(mute) {
        if (mute) {
            WidgetDig(this._ui, "sound/btnMusicOff").setVisible(true);
            WidgetDig(this._ui, "sound/btnMusic").setVisible(false);
        } else {
            WidgetDig(this._ui, "sound/btnMusic").setVisible(true);
            WidgetDig(this._ui, "sound/btnMusicOff").setVisible(false);
        }
        tj.audio.setMusicMute(mute);
    },

    soundState: function(mute) {
        if (mute) {
            WidgetDig(this._ui, "sound/btnSoundOff").setVisible(true);
            WidgetDig(this._ui, "sound/btnSound").setVisible(false);
        } else {
            WidgetDig(this._ui, "sound/btnSound").setVisible(true);
            WidgetDig(this._ui, "sound/btnSoundOff").setVisible(false);
        }
        tj.audio.setEffectMute(mute);
    },

    showCdkey: function() {
        //兑换码
        var that = this;
        var cdkLayer = new inputUIDLayer(function(re){
            cc.log('cdkLayer return:', re);
            if(re=='') {
                that.noticetext_add(that._lang['cdk_input'], 1);
                return false;
            }else{
                tj.wsconnection.setMsg(msgac["Verify_cdkey"], {cdkey: re});
            }
        });
        cdkLayer.init(input_type.code, '');
        this.addChild(cdkLayer);
    },

    defaultTouchButton: function(btn, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            var name = btn.getName();
            cc.log('settingLayer.defaultTouchButton: ', name);
            switch (name) {
                case 'btnMusicOff':
                    this.musicState(false);
                    tj.audio.resumeMusic();
                    break;
                case 'btnMusic':
                    this.musicState(true);
                    break;
                case 'btnSoundOff':
                    this.soundState(false);
                    break;
                case 'btnSound':
                    this.soundState(true);
                    break;
                case 'btnClosed':
                    this.set_release();
                    break;
                case 'text':
                    var now = tj.gameClock.elapsed();
                    if (now - this._click_time > 300) {
                        this._hide_t = 0;
                    }
                    this._hide_t++;
                    this._click_time = now;
                    if (this._hide_t > 1) {
                        this._hide_t = 0;
                        tj.wsconnection.setMsg(msgac["GM_request"], {});
                    }
                    break;
                case "btnShare":
                    createShareLayer(this, this.shareWithPlat.bind(this));
                    break;
                case "btnThumb":
                    if (tj.mainData.main.hasOwnProperty("client_comment_url")) {
                        SysUtil.hyperLink("" + tj.mainData.main.client_comment_url);
                    }
                    break;
                case "btnGamecenter":
                    ChannelSDK.getInstance().callCommonPlatform({
                        "action": SDKAction.Achievement_OPEN
                    });
                    break;
                case "data1": //进度
                    createDataSelect(this);
                    break;
                case "data3": //关于
                    var about = new aboutLayer();
                    about.init();
                    this.addChild(about);
                    break;
                case "data4":// 个人资料
                    if(!this._isRequestPersonInfo) {
                        this._isRequestPersonInfo = true;
                        tj.wsconnection.setMsg(msgac["Statistics_info"], {});
                    }
                    break;
                case "btnTest":
                    // 测试服申请
                    var url = "http://dxcb2.taojingame.com/tester.php";
                    if(tj.mainData.main.hasOwnProperty("tester_url")){
                        url = tj.mainData.main.tester_url;
                    }
                    var value = hex_md5(tj.mainData.uid + "" + mk_vry);
                    SysUtil.hyperLink(url+"?md5="+value+"&uid="+tj.mainData.uid);
                    break;
                case "btnVideo":
                    var scene = cc.director.getRunningScene();
                    if(scene && typeof(scene.switchReplayBoxVisible) === "function") {
                        scene.switchReplayBoxVisible();
                    }
                    this.refreshVedioUI();
                    break;
                case "btnCDK": //兑换码
                    this.showCdkey();
                    break;
                case "btnMove":
                    var mut = 1;
                    if(tj.mainData.main.mv_mutiple == 1)
                        mut = 2;
                    tj.wsconnection.setMsg(msgac["Map_mv_speedup"], {"mutiple": mut});
                    break;
                case "btnDrop":
                    createMapDropLayer(this);
                    break;
                default:
                    this.noticetext_add("此功能暂未开放");
                    break;
            }
        }
    },

    shareWithPlat: function(plat) {
        // iOS:
        // 微信分享只用到title，image，url
        // 微博分享使用iOS自带框架，只用到content，image，url
        // qq分享content长度超过50，超过的部分会被“...查看全文”代替
        var s_plat = "";
        if (plat == "btnWeixin") {
            s_plat = "wechat";
        } else if (plat == "btnWeibo") {
            s_plat = "weibo";
        } else if (plat == "btnQQ") {
            s_plat = "qq";
        } else {
            s_plat = "";
        }
        if (s_plat == "") {
            return;
        }
        if (!tj.mainData.main.hasOwnProperty("share")) {
            return;
        }

        this.pop_noticemsg(tj.cfg.get("share/sharing"),true);

        var shareInfos = tj.mainData.main.share;

        var params = {};
        params.action = SDKAction.SOCIAL_SHARE;

        var rC = Math.floor(Math.random() * shareInfos.Contents.length);
        if (rC >= shareInfos.Contents.length) {
            rC = shareInfos.Contents.length - 1;
        }
        if (rC <= 0) {
            rC = 0;
        }
        params.content = shareInfos.Contents[rC];

        // 增加随机内容
        var rIndex = Math.floor(Math.random() * SHARE_RANDOM_CONTENT.length);
        if (rIndex >= SHARE_RANDOM_CONTENT.length) {
            rIndex = SHARE_RANDOM_CONTENT.length - 1;
        }
        if (rIndex <= 0) {
            rIndex = 0;
        }
        params.content = params.content + SHARE_RANDOM_CONTENT[rIndex];

        params.title = shareInfos.Title;
        params.plat = s_plat;
        params.image = shareInfos.Url_pic;

        var weiboPics = [];
        var channelParams = tj.mainData.main.share.Ch;
        for(var i in channelParams){
            var ch = channelParams[i];
            if(ch.Name == "sharepics"){
                var sharePics = ch.P;
                for(var j in sharePics){
                    var item = sharePics[j];
                    if(s_plat == "qq" && item.Name == "qq"){
                        params.image = item.Val;
                        break;
                    }
                    if(s_plat == "wechat" && item.Name == "weixin"){
                        params.image = item.Val;
                        break;
                    }
                    if(item.Name == "weibo"){
                        weiboPics.push(item.Val);
                    }
                }
                break;
            }
        }
        if(s_plat == "weibo" && weiboPics.length > 0){
            var picSum = weiboPics.length;
            var rw = Math.floor(Math.random()*picSum);
            if(rw >= picSum){
                rw = picSum - 1;
            }
            if(rw <= 0){
                rw = 0;
            }
            params.image = weiboPics[rw];
        }

        params.url = shareInfos.Url_link;
        if (s_plat == "wechat") {
            params.title = params.content;
        }
        ChannelSDK.getInstance().callCommonPlatform(params, BridgeSDKController.shareCallback.bind(BridgeSDKController));
    },

    process_ac: function(doc) {
        var msg_id = doc[0];
        var data = doc[1];
        switch (msg_id) {
            case msgac["GM_request"]:
                if (data.ret == 0) {
                    var layout = new gmBox(data.sets);
                    this.addChild(layout);
                    this.process_adjust();
                }
                break;

            case msgac["GM_set"]:
                break;
            case msgac["Statistics_info"]:
                createPersonalInfoLayer(this, data);
                this._isRequestPersonInfo = false;
                break;

            case msgac["Share_result"]:
                this.refreshShareUI();
                var msg = "";
                var st = data.status;
                if(typeof(st) == "string"){
                    st = parseInt(data.status);
                }
                switch(st){
                    case -1:
                        msg = tj.cfg.get("share/sharing");
                        break;
                    case 0:
                        msg = tj.cfg.get("share/dayFirstSuccess").format(data.del);
                        break;
                    case 1:
                        msg = tj.cfg.get("share/success");
                        break;
                    case 2:
                        var plat = "";
                        if(data.plat == "weibo"){
                            plat = tj.cfg.get("share/weibo");
                        }
                        msg = tj.cfg.get("share/noLogin").format(plat);
                        break;
                    case 3:
                        msg = tj.cfg.get("share/cancel");
                        break;
                    case 4:
                        if(BridgeSDKController.isShareParamsInit) {
                            msg = tj.cfg.get("share/fail");
                        }else{
                            msg = tj.cfg.get("share/initError");
                        }
                        break;
                    case 5:
                        msg = tj.cfg.get("share/noClient");
                        break;
                    default:
                        msg = tj.cfg.get("share/fail");
                        break;
                }
                this.pop_noticemsg(msg,true);
                break;

            case msgac["Verify_cdkey"]:
                var msg = '';
                if(data) {
                    if(data.ret<-1) {
                        //-2,-3,-4,-5,-6 连接验证服务器错误(-x顺便在括号里写出错误码方便反馈给客服)，
                        msg = "连接验证服务器错误("+data.ret+")";
                    }
                    switch(data.ret) {
                        case 0: //发东西
                            if (data.items) {
                                for (var i in data.items) {
                                    var items = data.items[i];
                                    tj.mainData.addStroageItem(items.id, items.num); //发礼品
                                    msg = tj.mainData.getItemName(items.id) + ' +' + items.num;
                                    this.noticetext_add(msg);
                                }
                                msg = '';
                            }
                            break;
                        case 1: //没这个码
                            msg = this._lang["cdk_not_exist"];
                            break;
                        case -1: //-1 cdkey为空,
                            msg = this._lang["cdk_empty"];
                            break;
                        case 5: //cdkey已被自己使用
                            msg = this._lang["cdk_used_self"];
                            break;
                        case 6: //cdkey已被使用
                            msg = this._lang["cdk_used"];
                            break;
                        case 10: //cdkey过期
                            msg = this._lang["cdk_expried"];
                            break;
                        case 15: //已领取过同一批cdkey中的一个
                            msg = this._lang["cdk_samecate"];
                            break;
                    }
                    if(msg) {
                        this.noticetext_add(msg);
                    }
                }
                cc.log("Verify_cdkey: ", data, typeof data.ret);
                break;
            case msgac["Map_mv_speedup"]:
                if(tj.mainData.main.mv_mutiple == 1)
                    tj.mainData.main.mv_mutiple = 2;
                else
                    tj.mainData.main.mv_mutiple = 1;
                tj.mainData.main.map_mv_speed_ms = data.map_mv_speed_ms;
                tj.wsconnection.pushmsg(msgac["Map_move_speed"]);
                this.refreshBtnMove();
                break;
            default:
                break;
        }
    }
});

var gmBox = ccui.Layout.extend({
    _data: null,
    ctor: function(data) {
        this._data = data;
        this._super();
        this.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        this.setBackGroundColor(cc.color(128, 128, 128));
        winSize = cc.director.getWinSize();
        this.setContentSize(cc.size(winSize.width, winSize.height * 2));
        this.setAnchorPoint(0.5, 0);
        this.setPosition(winSize.width * 0.5, 0);
        this.setSwallowTouches(true);
        this.setTouchEnabled(true);

        var sets = ["开关", "面包不消耗", "伤害必杀", "命中100%", "上buff100%", "减伤99%", "必闪", "buff免疫", "金币钻石1亿", "必中敌方buff", "先发制人", "无限视野"];
        var posy = 0;
        var winSize = cc.director.getWinSize();
        for (var i in sets) {
            var t = new ccui.Text(sets[i] + " :", "", 35);
            var b = new ccui.Button();
            b.setTitleFontSize(35);
            var f = this._data[i];
            b.setTitleText(f == 0 ? "关闭" : "开启");
            b.setUserData([i, f]);
            b.setColor(new cc.color(0, 0, 0));
            t.setColor(new cc.color(0, 0, 0));
            this.addChild(t);
            this.addChild(b);
            posy = winSize.height / cc.tj.SCALE - 100 * (parseInt(i) + 1);
            t.setPosition(winSize.width * 0.2, posy);
            b.setPosition(winSize.width * 0.8, posy);
            b.addTouchEventListener(this.defaultTouchButton.bind(this), this);

        }
        var b = new ccui.Button();
        b.setTitleFontSize(45);
        b.setTitleText("确认并关闭");
        b.setName("close");
        b.setColor(new cc.color(0, 0, 0));
        b.setPosition(winSize.width * 0.5, posy - 100);
        this.addChild(b);
        b.addTouchEventListener(this.defaultTouchButton.bind(this), this);
    },
    defaultTouchButton: function(btn, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            var name = btn.getName();
            var data = btn.getUserData();
            if (name == "close") {
                cc.log(this._data);
                tj.wsconnection.setMsg(msgac["GM_set"], {
                    "sets": this._data
                });
                this.removeFromParent(true);
                return;
            }
            var f = data[1] ^ 1;
            btn.setTitleText(f == 0 ? "关闭" : "开启");
            data[1] = f;
            btn.setUserData(data);
            this._data[parseInt(data[0])] = f;
        }
    },
    onEnter: function() {
        this._super();
    }
});