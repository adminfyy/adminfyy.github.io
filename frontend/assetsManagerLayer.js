/**
 * Created by likx on 2015/10/9.
 */

var failCount = 0;
var maxFailCount = 3;

var AssetsManagerLoaderScene = cc.Scene.extend({
    _am:null,
    _progress:null,
    _percent:0,
    _loadingBar : null,
    _loadingBarBG: null,
    _loadingText: null,
    _updateActive:false,
    //_percentByFile : 0,
    //_fileLoadingBar:null,

    load_ui: function (ui_short_name) {
        var fname = "res/art/" + ui_short_name;
        return ccs._load(fname);
    },

    load_scene: function (scene_name) {
        var node_ui, node_scene;
        var scene_config = "res/art/" + "sc" + scene_name + ".json";
        try {
            var obj = ccs.load(scene_config);
            node_scene = obj.node;
        } catch (e) {
            cc.log("baseLayer::load_scene :" + e);
        }
        if (!node_scene) {
            cc.log("baseLayer.load_scene - failed to load scene " + scene_name + "'s config " + scene_config);
            return -1;
        }

        node_ui = node_scene.getChildByName("UI");
        this.addChild(node_scene);

        return node_ui;
    },

    run:function(){
        var self = this;
        cc.loader.loadJson("res/config.json", function(error, data){
            configData = data;

            var res = ["res/art/scLoading.json", "res/art/uiLoadingRelease.json"];
            cc.loader.load(res, function () {
                var layer = new cc.Layer();
                var ui = this.load_scene("Loading");
                // var p = ui.getParent();
                ui.removeFromParent();
                // var BG = p.getChildByName("BG");
                layer.addChild(ui);
                layer._ui = ui;
                if (!layer)
                    return false;
                this.addChild(layer);
                if (cc.tj.ACTIVE === true) {
                    switch (cc.tj.PTYPE) {
                        case P_TYPE_WID:
                            // BG.setAnchorPoint(cc.p(0.5, 0.6));
                            // BG.setScale(cc.tj.SCALE);
                            layer.setAnchorPoint(cc.p(0.5, 0));
                            layer.setScale(cc.tj.SCALE);
                            var A = WidgetDig(layer, "Loading/A");
                            if (A !== null) {
                                A.setScale(A.getScale() / cc.tj.SCALE);
                            }
                            var UBG = WidgetDig(this, "Loading/BG");
                            if (UBG !== null) {
                                UBG.setScale(UBG.getScale() / cc.tj.SCALE);
                            }
                            break;
                    }
                }

                var releaseinfoLayer = this.load_ui("uiLoadingRelease.json");
                if (releaseinfoLayer)
                    layer.addChild(releaseinfoLayer);

                 if (cc.tj.ACTIVE === true) {
                    switch (cc.tj.PTYPE) {
                        case P_TYPE_WID:
                            var BG = WidgetDig(releaseinfoLayer, "BG");
                            if (BG !== null) {
                                BG.setScale(BG.getScale() / cc.tj.SCALE);
                            }
                            break;
                    }
                }

                this.schedule(function(){
                    releaseinfoLayer.removeFromParent();
                    this.init(layer);
                }.bind(this), 1, false);
            }.bind(self));
        });
        cc.director.runScene(this);
    },

    init:function(layer){
        if (!this._super())
            return false;

        var btn = ccui.helper.seekWidgetByName(layer._ui, "btn");
        btn.setVisible(false);

        var id = ccui.helper.seekWidgetByName(layer._ui, "id");
        id.setVisible(false);

        cc.loader.loadJs("src/common/tjjsb.js"); // 不在初始化列表中的js文件，比如tools
        cc.tj.Language = jsb.fileUtils.getStringFromFile("clang") || cc.sys.language;
        cc.log("language: "+cc.tj.Language);

        this._progress = ccui.helper.seekWidgetByName(layer._ui, "textStar");
        flickerEffect(this._progress, true);
        this._progress.string = CFGJSON.get("text/assets/update");
        this._loadingBar = ccui.helper.seekWidgetByName(layer._ui, "loading");
        this._loadingBar.setVisible(false);
        this._loadingBarBG = ccui.helper.seekWidgetByName(layer._ui, "barBG");
        this._loadingBarBG.setVisible(false);
        this._loadingText = ccui.helper.seekWidgetByName(layer._ui, "text");
        this._loadingText.setVisible(false);

        var storagePath = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "./");
        storagePath += "update";
        cc.log("------------SearchPath0: " + jsb.fileUtils.getSearchPaths());

        this._am = new jsb.AssetsManager("res/project.manifest", storagePath);
        this._am.retain();

        if (!this._am.getLocalManifest().isLoaded())
        {
            var s = "LocalManifest failed, update skipped.";
            cc.log(s);
            var that = this;
            var msgbox = createAssetsBox(layer, s, function(tag){
                that.loadGame();
                return true;
            },1);
        }
        else
        {
            var that = this;
            var listener = new jsb.EventListenerAssetsManager(this._am, function(event) {
                var code = event.getEventCode();
                cc.log("AssetMgr: event "+code);
                switch (event.getEventCode()){
                    case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                        cc.log("No local manifest file found, skip assets update.");
                        that.loadGame();
                        break;
                    case jsb.EventAssetsManager.UPDATE_PROGRESSION:
                        that._percent = event.getPercent();
                        //that._percentByFile = event.getPercentByFile();
                        cc.log("update percent " + Math.ceil(that._percent) + "%");
                        //cc.log("update percentByFile " + Math.ceil(that._percentByFile) + "%");
                        var msg = event.getMessage();
                        if (msg) {
                            cc.log(msg);
                        }
                        break;
                    case jsb.EventAssetsManager.NEW_VERSION_FOUND:
                        cc.log("new version found.");
                        var datMani = loadLocalManifest("project.manifest.temp") || loadLocalManifest("project.manifest");
                        if (datMani) {
                            if (datMani.hasOwnProperty("nu") && datMani["nu"]==cc.tj.BuildVer) {
                                cc.log("no update for this version:" + cc.tj.BuildVer);
                                that.unschedule(that.updateProgress);
                                that.loadGame();
                                break;
                            }
                        }
                        var msg = event.getMessage();
                        var parm = msg.split(",");
                        var version = parm[0];
                        var fsize = parm[1];
                        var ask = CFGJSON.get("text/assets/ask").format(version, (fsize/1024/1024).toFixed(2));
                        if(fsize > 0){
                            var p = that._am.getRemoteManifest().getManifestFileUrl().replace(/(.*\/)[^/]+/,"$1");
                            cc.log("get updateinfo: "+p+"updateinfo."+cc.tj.Language);
                            tjjsb.httpRequest({url:p+"updateinfo."+cc.tj.Language}, function(obj){
                                // cc.log(JSON.stringify(obj));
                                if (obj.success && obj.statusCode==200) {
                                    if (!obj.body.replace(/\n/g,"").match(/^\s*<.*>\s*$/))
                                        ask += "\n\n"+obj.body;
                                }
                                var msgbox = createAssetsBox(layer, ask, function(tag){
                                    if (tag == 1){
                                        that.unschedule(that.updateProgress);
                                        that.loadGame();
                                    }else {
                                        that._am.update();
                                        that._updateActive = true;
                                    }
                                    return true;
                                },cc.sys.platform==cc.sys.WIN32?2:1);        // 手机上必须更新
                            },1);
                        }
                        else
                            that.loadGame();
                        break;
                    case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
                    case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                        cc.log("Fail to download manifest file, update skipped.");
                        var str = CFGJSON.get("text/assets/manifestfail") +"\n" + that.genEventInfoStr(event,1);
                        var msgbox = createAssetsBox(layer, str, function(tag){
                            if (cc.sys.platform==cc.sys.WIN32) {
                                that.loadGame();
                                return true;
                            }
                            else {
                                cc.loader.loadJs("src/sdk/SDKTools.js"); // 不在初始化列表中的js文件
                                cc.loader.loadJs("src/sdk/SysUtil.js"); // 不在初始化列表中的js文件
                                cc.director.end();
                                SysUtil.exit();
                                return false;
                            }
                        },1);
                        break;
                    case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                        cc.log("ALREADY_UP_TO_DATE. v" + cc.tj.BuildVer +", "+ that._am.getLocalManifest().getVersion());
                        that.loadGame();
                        break;
                    case jsb.EventAssetsManager.UPDATE_FINISHED:
                        cc.log("Update finished. v" + cc.tj.BuildVer +", "+ that._am.getLocalManifest().getVersion());
                        that._progress.string = CFGJSON.get("text/assets/finished") ;
                        that.unschedule(that.updateProgress);
                        that.schedule(that.loadGame, 1, false);
                        break;
                    case jsb.EventAssetsManager.UPDATE_FAILED:
                        cc.log("Update failed. " + event.getMessage());
                        failCount++;
                        if (failCount < maxFailCount)
                        {
                            that._am.downloadFailedAssets();
                        }
                        else
                        {
                            cc.log("Reach maximum fail count, exit update process. "+CFGJSON.get("text/assets/otherfailed"));
                            that._progress.string = CFGJSON.get("text/assets/otherfailed");
                            that.unschedule(that.updateProgress);
                            // that.schedule(that.loadGame, 1, false);
                        }
                        break;
                    case jsb.EventAssetsManager.ERROR_UPDATING:
                        var str = that.genEventInfoStr(event)
                        cc.log("Asset update error: " + str);
                        if (event.getCURLECode() === -10) { // invalid md5 checksum
                            maxFailCount = 1;
                        }
                        var msgbox = createAssetsBox(layer, str, function(tag){
                            // that.loadGame();
                            return true;
                        },1);
                        break;
                    case jsb.EventAssetsManager.ERROR_DECOMPRESS:
                        var str = that.genEventInfoStr(event)
                        cc.log(str);
                        var msgbox = createAssetsBox(layer, str, function(tag){
                            // that.loadGame();
                            cc.loader.loadJs("src/sdk/SDKTools.js"); // 不在初始化列表中的js文件
                            cc.loader.loadJs("src/sdk/SysUtil.js"); // 不在初始化列表中的js文件
                            cc.director.end();
                            SysUtil.exit();
                            return false;
                        },1);
                        break;
                    default:
                        break;
                }
            });

            cc.eventManager.addListener(listener, 1);
            this._am.checkUpdate();
        }

        this.schedule(this.updateProgress, 0.3);
    },

    loadGame:function(){
        var searchPath = (jsb.fileUtils ? jsb.fileUtils.getSearchPaths() : "./");
        // 移除重复路径
        searchPath = searchPath.filter(function(el, i, a) { return i === a.indexOf(el);});
        // 移除RES目录
        searchPath = searchPath.filter(function(el, i, a) { var idx = el.indexOf("res"); if (idx !== -1 && idx === el.length - 4) return false; else return true;})
        cc.log("------------SearchPath1: " + searchPath);
        jsb.fileUtils.setSearchPaths(searchPath);
        // 记录更新后版本号
        cc.tj.UpdateVer = this._am.getLocalManifest().getVersion();
        var s_log = "VER "+cc.tj.BuildVer +", "+ cc.tj.UpdateVer;
        if (this._am.getRemoteManifest()) {
            //getRemoteManifest是指upadte/project.manifest中记录的远程manifest，并非服务器上的manifest......
            s_log += ", "+this._am.getRemoteManifest().getManifestFileUrl()+":"+this._am.getRemoteManifest().getVersion();
        }
        cc.log(s_log);
        // 检查是否版本审核中
        cc.tj.isReviewChk=false;
        // 此时version.manifest应该还未删除，且是本次重新下载的
        var verMani = loadLocalManifest("version.manifest");
        if (verMani) {
            if (verMani.hasOwnProperty("nu") && verMani["nu"]==cc.tj.BuildVer) {
                cc.tj.isReviewChk = true;
            }
        }
        cc.log("revCheck: "+cc.tj.isReviewChk);

        cc.sys.cleanScript("src/sdk/SDKTools.js");
        cc.sys.cleanScript("src/sdk/SysUtil.js");
        cc.sys.cleanScript("src/common/tjjsb.js");
        cc.sys.cleanScript("src/frontend/assetsBox.js");
        cc.loader.release("res/art/uiUpdate.json");
        cc.loader.loadJs("src/frontend/assetsBox.js");
        cc.loader.loadJs(["src/common/jsList.js"], function(){
            cc.loader.loadJs(jsList, function(){
                if(ReflectUtil && typeof(ReflectUtil.jsLoadSuccess) == "function") {
                    ReflectUtil.jsLoadSuccess();
                }
                cc.director.runScene(new initScene());
            });
        });
    },

    updateProgress:function(dt){
        this._loadingBar.setPercent(this._percent);
        //this._fileLoadingBar.setPercent(this._percentByFile);
        if(this._updateActive){
            this._loadingBar.setVisible(true);
            this._loadingBarBG.setVisible(true);
            this._loadingText.setVisible(true);
            this._loadingText.string = Math.ceil(this._percent) + "%";
            this._progress.string = CFGJSON.get("text/assets/dowloading");
        }
        //else
        //    this._progress.string = CFGJSON.get("text/assets/update");
    },

    onExit:function(){
        this._super();
        cc.log("AssetsManager::onExit");

        if(this._am)
            this._am.release();
    },

    genEventInfoStr:function(event, flag) {
        var str = "";
        if (flag==1) {
            str += "("
        }
        var s1=CFGJSON.get("text/curlcode/"+event.getCURLMCode());
        if (s1) {
            str += s1+": ";
        }
        str += event.getMessage()
            + " &AS:" + event.getAssetId()
            + " &EC" + event.getEventCode()
            + " &CE" + event.getCURLECode()
            + " &CM" + event.getCURLMCode()
        ;
        if (flag==1) {
            str += ")"
        }
        cc.log(str);
        return str;
    }
});

function flickerEffect(w, forever){
    if(!w)
        return;
    w.stopAllActions();
    w.setVisible(true);
    w.setOpacity(0);
    var e0 = new cc.FadeIn(0.5);
    var d1 = new cc.DelayTime(0.5);
    var e1 = new cc.FadeOut(0.5);
    var d2 = new cc.DelayTime(0.5);
    var q = cc.sequence(e0, d1, e1, d2);
    if(forever)
        q = cc.repeatForever(q);
    w.runAction(q);
};