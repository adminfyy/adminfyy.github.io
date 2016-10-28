/**
 * Created by lkx on 2015/11/03.
 * map
 */
/**@const */ var MOVE_EVENT_ACTION_TAG = 10001;
/**@cosnt */ var ZOOM_EVENT_ACTION_TAG = 10000;

/**@cosnt */ var TEAM_HP_ANIMATE_TAG = 20001;
/**@const */ var TAG_BATCH_NODE = 18000;

/**@const */ var TEST = false;
/**@const */ var MIST = true;

/** @global*/var Team_Box = null;


/**@const */

var MapStatus = {"normal" : 1, "inzooming" : 2, "moving" : 3, "drag" : 4, "effect":5};
var AutoMoveStatus = {"none" : 1, "wait" : 2, "auto" : 3, "pause" : 4, "break":5};
var dir_t = {"up" : 0, "down": 1, "left"  : 2, "right" : 3};
var map_state = {"none":0, "faci":1, "fight":2, "camp":3, "pick":4};

var mapLayer = baseLayer.extend({
    _ttmap:null,
    _particle_player:null,
    _animation_campfire:null,
    _warningView:null,
    _maplayer:null,
    _objlayer:null,
    _playlayer:null,
    _flagLayer:null,
    _screenWidth:0,
    _screenHeight:0,
    _gameWorldWidth:0,
    _gameWorldHeight:0,
    _tileSize:0,
    _basicInfo:null,
    _heroinfo:[],
    _p_player : cc.p(0,0),		//玩家当前位置
    _currGrideX:0,
    _currGrideY:0,
    _lookGrideX:0,
    _lookGrideY:0,
    _mapscale:1,
    _move_step_sec:0.6,

    _currentStatus : 1,         //前端当前地图状态
    _autoMoveStatus:1,          //寻路状态

    _visual_field : 0,			//视野范围
    _server_pos:null,
    _blockData:null,
    _mapid:0,
    _slice_infos:[],
    _bagc:0,
    _bagmax:0,
    _overWeightNoteCount:0,     //超重提示计数
    _torchLevel:0,
    _mapState:-1,           //服务器地图状态

    _pickupData:null,
    _cureData:null,
    _jokeData:null,
    _fightData:null,
    _mapbackData:null,

    _cureLoading:false,
    _jokeLoading:false,
    _moveLocked:false,
    _autoLabel:null,
    _mist:null,
    _view:null,
    _mapname:null,
    _bgMusic:null,

    _fighting:false,
    _imageViewMap:null,
    _consume:0,
    _lack_food:0,

    _local_facis:[],
    _push_pos:null,
    _last_push_pos:null,
    _curr_path:[],
    _startP:null,

    _aMaps : null,
    _aBlocks:null,
    _locIcons:null,

    _hinting : false,
    _begincout : 0,

    _draging:false,  //地图拖动状态
    _touchlisten:false,
    _notebox:null,

    _stamp_anis:[],  //地图动画对象集合

    ctor : function(){
        this._super();
        this._basename = "Map";
        Map_Layer = this;
        this._curr_path = [];
        this._overWeightNoteCount = 0;
    },

    init : function() {
        if (!this._super()){
            return false;
        }
        this._bgMusic = RES_PATH+"sound/bgm/FindTheLight.mp3";
        this._imageViewMap = new ccui.ImageView();
        this._imageViewMap.setScale(2,2);
        this.addChild(this._imageViewMap);

        //load scene
        if (this.load_scene(this.get_scene_name()) == -1)
            return false;

        if (!this._rcImpt.ui)
            return false;

        WidgetDig(this._rcImpt.node_scene,"team").removeAllChildren();

        this._warningView = WidgetDig(this._rcImpt.node_scene,"warning");
        this._warningView.setVisible(false);

        WidgetDig(this._rcImpt.ui, "text").setVisible(false);
        WidgetDig(this._rcImpt.ui, "function").setVisible(false);

        WidgetDig(this._rcImpt.ui, "encamp").setVisible(false);

        this.init_map_block();
        this._mapState = -1;

        if (cc.tj.ACTIVE === true) {
            switch (cc.tj.PTYPE) {
                case P_TYPE_WID:
                    var text = WidgetDig(this._rcImpt.ui, "text");
                    if (text !== null) {
                        var pos = text.getPosition();
                        // text.setAnchorPoint(0, 0);
                        text.setScale(cc.tj.SCALE);
                        text.setPosition(pos.x, pos.y * cc.tj.SCALE);
                    }
                    var func = WidgetDig(this._rcImpt.ui, "function");
                    if (func !== null) {
                        var pos = func.getPosition();
                        func.setScale(cc.tj.SCALE);
                        func.setPosition(pos.x, pos.y * cc.tj.SCALE);

                    }
                    var encamp = WidgetDig(this._rcImpt.ui, "encamp");
                    if (encamp !== null) {
                        var pos = encamp.getPosition();
                        encamp.setScale(cc.tj.SCALE);
                        encamp.setPosition(pos.x, pos.y * cc.tj.SCALE);
                    }
                    break;
            }
        }

        if (cc.sys.isNative)
            this.init_listen();

        this._autoLabel = new cc.LabelTTF("", "Arial", 40);
        this._autoLabel.setLocalZOrder(1000);
        this._rcImpt.ui.addChild(this._autoLabel);
        this._autoLabel.setPosition(cc.p(cc.winSize.width/2,cc.winSize.height/2 - 40));

        WidgetDig(this._rcImpt.ui, "ready").setVisible(false); //竞技场提示条
        WidgetDig(this._rcImpt.ui, "text/enemy").setVisible(false);
        return true;
    },

    clear:function(){
        this._curr_path = [];
        this._local_facis = [];
        this._maplayer = null;
        this._objlayer = null;
        this._playlayer = null;
        this._flagLayer = null;
        this._screenWidth = 0;
        this._screenHeight=0;
        this._gameWorldWidth = 0;
        this._gameWorldHeight = 0;
        this._tileSize = 0;
        this._basicInfo = null;
        this._heroinfo = [];
        this._p_player  =  cc.p(0,0);		//玩家当前位置
        this._currGrideX = 0;
        this._currGrideY = 0;
        this._lookGrideX = 0;
        this._lookGrideY = 0;
        this._mapscale = 1;
        this._currentStatus  =  1;         //前端当前地图状态
        this._autoMoveStatus = 1;          //寻路状态
        this._visual_field = 0;			//视野范围
        this._server_pos = null;
        this._mapid = 0;
        this._slice_infos = [];
        this._bagc = 0;
        this._bagmax = 0;
        this._overWeightNoteCount = 0;     //超重提示计数
        this._torchLevel = 0;
        this._mapState = -1;           //服务器地图状态
        this._pickupData = null;
        this._cureData = null;
        this._jokeData = null;
        this._fightData = null;
        this._mapbackData = null;
        this._cureLoading = false;
        this._jokeLoading = false;
        this._moveLocked = false;
        this._mapname = null;
        this._fighting = false;
        this._consume = 0;
        this._lack_food = 0;
        this._push_pos = null;
        this._startP = null;
        this._aMaps = null;
        this._aBlocks = null;
        this._hinting = false;
        this._draging = false;  //地图拖动状态
        this._last_push_pos = cc.p(-1, -1);
        if(this._ttmap) {
            this._ttmap.removeFromParent();
            this._ttmap = null;
        }
        if(this._warningView)
            this._warningView.setVisible(false);
        if(this._autoLabel)
            this._autoLabel.setString("");
        if(this._curr_popLayer){
            this._curr_popLayer.set_release();
            this._curr_popLayer = null;
        }
        if(this._notebox){
            this._notebox.set_release();
            this._notebox = null;
        }
        if(Team_Box)
            Team_Box.hide();
        this.showTopInfoBar(false);
        WidgetDig(this._rcImpt.ui, "encamp").setVisible(false);
        WidgetDig(this._rcImpt.ui, "function/team").setVisible(true);
        WidgetDig(this._rcImpt.ui, "function/encamp").setVisible(true);
        WidgetDig(this._rcImpt.ui, "function/back").setVisible(true);
        WidgetDig(this._rcImpt.ui, "function/pack").setVisible(true);
        WidgetDig(this._rcImpt.ui, "function/set").setVisible(true);

        for(var i in this._stamp_anis) {
            var portait = this._stamp_anis[i];
            portait.node.release();
            portait.action.release();
        }
        this._stamp_anis = [];
        this.close_pickup();
    },

    update_localstorage_faci:function(){
        if(this._basicInfo)
            tj.local.saveLocalStorageData("faci_map"+this._basicInfo.mapid, this._local_facis);
    },

    add_localstorage_faci: function(obj ){
        for( var i in this._local_facis) {
            var data = this._local_facis[i];
            if(data instanceof Object) {
                if (data.id == obj.id) {
                    data = obj;
                    return;
                }
            }
        }
        if(this._local_facis)
            this._local_facis.push(obj);
    },

    remove_localstorage_faci: function(id){
        var idx = -1;
        for( var i in this._local_facis){
            var data = this._local_facis[i];
            if(data instanceof Object) {
                if (data.id == id)
                    idx = i;
            }else if(data == id)
                idx = i;
        }
        if(idx >=0) {
            var ofaci = this._local_facis[idx];
            this._objlayer.setTileGID(0, cc.p(ofaci.X, ofaci.Y));
            this._local_facis.splice(idx, 1);
        }
    },

    init_map_block:function(){
        var self = this;
        cc.loader.loadJson("res/map/mapblock.json", function(error, data){
            //cc.log(data); //data is the json object
            self._blockData = data;

            if(TEST)
                self.drawBlock();
        });

        var locs = tj.dbdata.gettable("locations");
        this._locIcons = {};
        for(var i in locs) {
            var loc = locs[i];
            this._locIcons[loc.id] = loc.icon;
        }
    },

    init_listen : function(){
        if(!this._touchlisten){
            cc.eventManager.addListener({
                event: cc.EventListener.TOUCH_ALL_AT_ONCE,
                onTouchesBegan: this.onTouchesBegan,
                onTouchesMoved: this.onTouchesMoved,
                onTouchesEnded: this.onTouchesEnded
            }, this);
            cc.eventManager.addListener({
                event: cc.EventListener.MOUSE,
                onMouseScroll:this.onMouseScroll
            }, this);
            this._touchlisten = true;
        }
    },

    clear_listen:function(){
        this._touchlisten = false;
    },

    init_process_ac:function(){
        //tj.wsconnection.addGrp(msgac["Map_go_data"], msgac["Map_go_data"], this.process_ac.bind(this), this.get_scene_name());
        //tj.wsconnection.addGrp(msgac["Map_go_map"], msgac["Map_go_map"], this.process_ac.bind(this), this.get_scene_name());
        tj.wsconnection.addGrp(msgac["Bag_refresh_weight"], msgac["Bag_refresh_weight"], this.process_ac.bind(this), this.get_scene_name());
        tj.wsconnection.addGrp(msgac["Map_move"], msgac["Map_client_data"], this.process_ac.bind(this), this.get_scene_name());
        tj.wsconnection.addGrp(msgac["Pick_info"], msgac["Pick_info"], this.process_ac.bind(this), this.get_scene_name());
        tj.wsconnection.addGrp(msgac["Fight_info"], msgac["Fight_info"], this.process_ac.bind(this), this.get_scene_name());
        tj.wsconnection.addGrp(msgac["MapUI_fight_end"], msgac["MapUI_fight_end"], this.process_ac.bind(this), this.get_scene_name());
        tj.wsconnection.addGrp(msgac["Game_on_hide"], msgac["Game_on_hide"], this.process_ac.bind(this), this.get_scene_name());
        tj.wsconnection.addGrp(msgac["GM_func"], msgac["GM_func"], this.process_ac.bind(this), this.get_scene_name());
        tj.wsconnection.addGrp(msgac["MainUI_pay_ver_ret"], msgac["MainUI_pay_ver_ret"], this.process_ac.bind(this), this.get_scene_name());
        tj.wsconnection.addGrp(msgac["Map_stop_auto_move"], msgac["Map_move_speed"], this.process_ac.bind(this), this.get_scene_name());
    },

    initMapSize:function(){
        this._ttmap = new cc.TMXTiledMap();
        this._imageViewMap.addChild(this._ttmap, 0);

        this._particle_player = new cc.ParticleSystem("res/art/map/mine.plist");
        this._particle_player.setPositionType(cc.ParticleSystem.TYPE_RELATIVE);
        var tur = cc.textureCache.addImage("res/art/map/view5x.png");
        this._view = new cc.Sprite();
        this._view.initWithTexture(tur,cc.rect(0,0,126,126));
        this._view.setBlendFunc( cc.SRC_ALPHA ,cc.ONE );
        this._particle_player.addChild(this._view, 0);


        this._animation_campfire = new ccui.Widget();
        var self = this;
        tj.mainData.loadAnimate(RES_ANIMATION + "other/uiEncamp.json", function(portait){
            this._animation_campfire.addChild(portait.node);
            portait.node.stopAllActions();
            portait.action.pause();
            // portait.action.retain();
            // portait.node.retain();
            self.setRetain(portait.node, "ani");
            portait.action.gotoFrameAndPlay(0, portait.action.getDuration(), true);
            this._animation_campfire.runAction(portait.action);
        }.bind(this));

        this._ttmap.addChild(this._particle_player, 150);
        this._ttmap.addChild(this._animation_campfire, 200);

        var mapid = this._basicInfo.mapid;
        var tmxfile = "res/art/map/map" + mapid + ".tmx";
        if(!this._ttmap.initWithTMXFile(tmxfile))
            cc.log("mapScene initMapSize load tmxfile failed! " +  tmxfile);

        this._maplayer = this._ttmap.getLayer("mapLayer");
        this._objlayer = this._ttmap.getLayer("objLayer");
        this._playlayer = this._ttmap.getLayer("playerLayer");
        this._flagLayer = this._ttmap.getLayer("flagLayer");

        this._maplayer.setVisible(false);

        var size = cc.director.getWinSize();
        this._screenWidth = size.width;
        this._screenHeight = size.height;

        var w = this._basicInfo.max_width;
        var h = this._basicInfo.max_height;

        this._ttmap.setMapSize(cc.size(w,h));

        this._maplayer.setLayerSize(cc.size(w,h));
        this._objlayer.setLayerSize(cc.size(w,h));
        this._playlayer.setLayerSize(cc.size(w,h));
        this._flagLayer.setLayerSize(cc.size(w,h));
        this._objlayer.setTileGID(0,cc.p(0,0));
        this._playlayer.setTileGID(0,cc.p(0,0));
        this._flagLayer.setTileGID(0,cc.p(0,0));

        this._begincout = 0;
        this._currentStatus = MapStatus.normal;
        this._autoMoveStatus = AutoMoveStatus.none;
        this._currGrideX = this._currGrideY = this._lookGrideX = this._lookGrideY = 0;
        this._ttmap.stopAllActions();
        this._ttmap.setScale(this._mapscale);

        this._tileSize = this._ttmap.getTileSize().width;
        this._gameWorldWidth = this._ttmap.getMapSize().width * this._tileSize;
        this._gameWorldHeight = this._ttmap.getMapSize().height * this._tileSize;
        var node = new ccui.Widget();
        if(this._ttmap.getLayer("mapLayer1"))
            this._ttmap.addChild(node, 3);
        else
            this._ttmap.addChild(node);
        this._mhint = node;

        this._aMaps = null;
    },

    initUI:function(){
        this._torchLevel = this._basicInfo.troch_level;
        this._bagc = this._basicInfo.bag_curw;
        this._bagmax = this._basicInfo.bag_maxw;

        this._mapid = this._basicInfo.mapid;
        this._mapname = tj.dbdata.getValueById("mapunlock", this._mapid, "name");
        mapDropLayer_mapId = this._mapid;

        //var torchStr = tj.cfg.get("text_on_ui/map/torchLevel") + this._torchLevel;
        //WidgetDig(this._rcImpt.ui, "text/torch").setString(torchStr);

        var weightStr = tj.cfg.get("text_on_ui/hero/weight").format(this._bagc, this._bagmax);
        WidgetDig(this._rcImpt.ui, "text/bag").setString(weightStr);

        WidgetDig(this._rcImpt.ui, "function/encamp/text").setString(tj.cfg.get("text_on_ui/map/camp"));
        WidgetDig(this._rcImpt.ui, "encamp/adventure/text").setString(tj.cfg.get("text_on_ui/map/campCancel"));
        WidgetDig(this._rcImpt.ui, "function/pack/text").setString(tj.cfg.get("text_on_ui/map/bag"));
        WidgetDig(this._rcImpt.ui, "function/back/text").setString(tj.cfg.get("text_on_ui/map/back"));
        WidgetDig(this._rcImpt.ui, "function/back/num").setString(tj.mainData.getItemNum(5000));
        WidgetDig(this._rcImpt.ui, "function/team/text").setString(tj.cfg.get("text_on_ui/map/team"));
        WidgetDig(this._rcImpt.ui, "function/set/text").setString(tj.cfg.get("text_on_ui/map/set"));

        WidgetDig(this._rcImpt.ui, "encamp/treat/text").setString(tj.cfg.get("text_on_ui/map/treat"));
        WidgetDig(this._rcImpt.ui, "encamp/cook/text").setString(tj.cfg.get("text_on_ui/map/cook"));
        //WidgetDig(this._rcImpt.ui, "encamp/change/text").setString(tj.cfg.get("text_on_ui/map/change"));
        //WidgetDig(this._rcImpt.ui, "encamp/fix/text").setString(tj.cfg.get("text_on_ui/map/fix"));
        WidgetDig(this._rcImpt.ui, "encamp/joke/text").setString(tj.cfg.get("text_on_ui/map/joke"));

        WidgetDig(this._rcImpt.ui, "text").setVisible(true);
        WidgetDig(this._rcImpt.ui, "function").setVisible(true);
    },

    lockUI:function(lock){
        WidgetDig(this._rcImpt.ui, "function/encamp").setEnabled(!lock);
        WidgetDig(this._rcImpt.ui, "function/team").setEnabled(!lock);
        WidgetDig(this._rcImpt.ui, "function/pack").setEnabled(!lock);
        WidgetDig(this._rcImpt.ui, "function/back").setEnabled(!lock);
        WidgetDig(this._rcImpt.ui, "encamp/adventure").setEnabled(!lock);
        WidgetDig(this._rcImpt.ui, "encamp/treat").setEnabled(!lock);
        WidgetDig(this._rcImpt.ui, "encamp/cook").setEnabled(!lock);
        WidgetDig(this._rcImpt.ui, "encamp/joke").setEnabled(!lock);
    },

    refreshHelp:function(){
        if(this._helphand)
            this._helphand.stop();
        this.lockUI(false);

        var visibleSize = cc.director.getVisibleSize();
        var origin = cc.director.getVisibleOrigin();
        var centerY = origin.x + visibleSize.height / 2;

        //新手扎营
        var hc = tj.mainData.getClientData("help_camp");
        switch (hc){
            case 1:
                //再次确认触发条件
                var items = tj.mainData.getBagItemsByType(itemType.Food);
                var foodid = tj.cfg.getAttr("designdata/itemID", "foodid");
                var food_num = tj.mainData.getBagItemNum(foodid);
                if(isEmptyObject(items) || food_num > 0 || this._basicInfo.camp_times<= 0){
                    tj.mainData.setClientData("help_camp", 4);
                    break;
                }

                this.lockUI(true);
                this._moveLocked = true;
                var note = createNoteBox(this, tj.cfg.get("text/help/camp1"), form_t.castleLayer);
                note.setPos(375, centerY + 100);
                break;
            case 2:
                items = tj.mainData.getBagItemsByType(itemType.Food);
                if(isEmptyObject(items) || this._basicInfo.camp_times<= 0){
                    tj.mainData.setClientData("help_camp", 4);
                    break;
                }

                this.lockUI(true);
                note = createNoteBox(this, tj.cfg.get("text/help/camp2"), form_t.castleLayer);
                note.setPos(375, centerY + 100);
                var btn_camp = WidgetDig(this._rcImpt.ui, "function/encamp");
                btn_camp.setEnabled(true);
                var btn_campworld = btn_camp.convertToWorldSpace(cc.p(0, 0));
                var pos = this.convertToNodeSpace(btn_campworld);
                pos.x += btn_camp.getContentSize().width/2;
                pos.y += btn_camp.getContentSize().height/2;
                this.load_helphand(this, "click");
                this._helphand.setpos(pos.x, pos.y);
                break;
            case 3:
                items = tj.mainData.getBagItemsByType(itemType.Food);
                if(isEmptyObject(items)){
                    tj.mainData.setClientData("help_camp", 4);
                    break;
                }

                this.lockUI(true);
                var cook_btn = WidgetDig(this._rcImpt.ui, "encamp/cook");
                cook_btn.setEnabled(true);
                var cook_btnworld = cook_btn.convertToWorldSpace(cc.p(0, 0));
                pos = this._rcImpt.ui.convertToNodeSpace(cook_btnworld);
                pos.x += cook_btn.getContentSize().width/2;
                pos.y += cook_btn.getContentSize().height/2;
                this.load_helphand(this, "click");
                this._helphand.moveto(pos, 1, "click");
                break;
        }

        if(tj.mainData.isHelpDone())
            return;

        WidgetDig(this._rcImpt.ui, "function/team").setVisible(true);
        WidgetDig(this._rcImpt.ui, "function/encamp").setVisible(true);
        WidgetDig(this._rcImpt.ui, "function/back").setVisible(true);
        WidgetDig(this._rcImpt.ui, "function/pack").setVisible(true);
        WidgetDig(this._rcImpt.ui, "function/set").setVisible(true);
        if(tj.mainData.getClientData("help")[1] == 0) {
            WidgetDig(this._rcImpt.ui, "function/team").setVisible(false);
            WidgetDig(this._rcImpt.ui, "function/encamp").setVisible(false);
            WidgetDig(this._rcImpt.ui, "function/back").setVisible(false);
            WidgetDig(this._rcImpt.ui, "function/pack").setVisible(false);
            WidgetDig(this._rcImpt.ui, "function/set").setVisible(false);
        }

        //新手（地图阶段）
        if(tj.mainData.getClientData("help")[0] == 0)
            this.effect_firstin(10, 2);
        else if(tj.mainData.getClientData("help")[0] == 1) {
            this.load_helphand(this, "click");
            this._helphand.setpos(375, centerY+100);
            note = createNoteBox(this, tj.cfg.get("text/help/move"), form_t.castleLayer);
            note.setPos(375, centerY + 100);
        }else if(tj.mainData.getClientData("help")[0] == 2){
            this.load_helphand(this, "default");
            var bag = WidgetDig(this._rcImpt.ui, "text");
            var x = bag.getPosition().x+bag.getContentSize().width / 4;
            var y = bag.getPosition().y-bag.getContentSize().height* 3 / 4;
            this._helphand.moveto(cc.p(x-10,y-10), 1);

            note = createNoteBox(this, tj.cfg.get("text/help/back"), form_t.castleLayer);
            note.setPos(375, centerY + 100);
        }
    },

    refresh_foodtext:function(){
        var foodid = tj.cfg.getAttr("designdata/itemID", "foodid");
        var food_num = tj.mainData.getBagItemNum(foodid);
        if(food_num > 0) {
            var foodStr = tj.cfg.get("text_on_ui/map/foodCount") + food_num;
            this._warningView.setVisible(false);
            this._warningView.stopAllActions();
            this._lack_food = 0;
        }
        else {
            if(this._lack_food <= 1)
                foodStr = tj.cfg.get("text_on_ui/map/food1");
            else if(this._lack_food == 2)
                foodStr = tj.cfg.get("text_on_ui/map/food2");
            else if(this._lack_food == 3)
                foodStr = tj.cfg.get("text_on_ui/map/food3");
            else
                foodStr = tj.cfg.get("text_on_ui/map/food4");
            this._warningView.setVisible(true);
            var ac = cc.repeat(cc.sequence(cc.fadeTo(0.5, 30), cc.fadeTo(0.5, 225)), -1);
            this.setRetain(ac, "ac");
            this._warningView.runAction(ac);
        }

        //新手 扎营触发
        if(food_num <= 0 && tj.mainData.getClientData("help_camp") == 0){
            if(tj.mainData.getClientData("help")[1] != 0 && this._basicInfo.camp_times > 0 && !this._moveLocked && tj.toplayer.get_scene_name() == this._basename){
                var items = tj.mainData.getBagItemsByType(itemType.Food);
                if(!isEmptyObject(items)){
                    tj.mainData.setClientData("help_camp", 1);
                    this.refreshHelp();
                }
            }
        }

        WidgetDig(this._rcImpt.ui, "text/food").setString(foodStr);
    },

    refresh_weight:function(calc){
        if(calc){
            this._bagc = 0;
            for(var id in tj.mainData.main.bags) {
                var num = tj.mainData.main.bags[id];
                if(num <= 0)
                    continue;
                var w = tj.mainData.getItemWeight(id);
                this._bagc += num * w;
            }
        }
        var weightStr = tj.cfg.get("text_on_ui/hero/weight").format(this._bagc, this._bagmax);
        WidgetDig(this._rcImpt.ui, "text/bag").setString(weightStr);
        WidgetDig(this._rcImpt.ui, "text/bag").setColor(cc.color.WHITE);
        //超重处理
        if(this._bagc > this._bagmax)
            WidgetDig(this._rcImpt.ui, "text/bag").setColor(cc.color.RED);

        this.refresh_foodtext();
    },

    refresh_position:function(){
        var pos_str = tj.cfg.get("text_on_ui/map/pos").format(this._p_player.x, this._p_player.y);
        var mapinfo = this._mapname + pos_str;
        //WidgetDig(this._rcImpt.ui, "text/map").setString(mapinfo);
        this.setContentString(WidgetDig(this._rcImpt.ui, "text/map"), mapinfo);
    },

    mapAction : function(action){
        //cc.log("------------------------mapAction!-------");
        if(this._currentStatus != MapStatus.effect)
            this._ttmap.stopAllActions();

        this._currGrideX = this._lookGrideX = this._p_player.x;
        this._currGrideY = this._lookGrideY = this._p_player.y;

        var mpos = this.calcMapPos(this._currGrideX, this._currGrideY, false);
        if(action) {
            var actionMoveTo = cc.MoveTo.create(this._move_step_sec, mpos);
            if(this._draging)
                 actionMoveTo = new cc.DelayTime(this._move_step_sec);
            actionMoveTo.setTag(MOVE_EVENT_ACTION_TAG);
            this._ttmap.runAction(actionMoveTo);
            this._currentStatus = MapStatus.moving;
        }
        else
            this._ttmap.setPosition(mpos);

        var mapSizeH = this._ttmap.getMapSize().height;
        var tilesize =  this._ttmap.getTileSize().width;
        var originX = this._currGrideX * tilesize + tilesize/2;
        var originY = (mapSizeH - this._currGrideY) * tilesize - tilesize/2;
        if(action) {
            var actionMoveTo1 = cc.MoveTo.create(this._move_step_sec, cc.p(originX, originY));
            this._particle_player.runAction(actionMoveTo1);
        }else {
            this._particle_player.x = originX;
            this._particle_player.y = originY;
        }
    },

    calcMapPos : function(gridex, gridey, bound){
        var mapSizeH = this._ttmap.getMapSize().height;
        var originX = gridex * this._tileSize + this._tileSize / 2;
        var originY = (mapSizeH - gridey) * this._tileSize - this._tileSize/2;
        var mapX = - (originX - this._screenWidth/4);
        var mapY = - (originY - this._screenHeight/4);

        if (bound){
            //越界复位
            if (mapX > 0)
                mapX = 0;
            if (mapY > 0)
                mapY = 0;
            if (mapX < -(this._gameWorldWidth - this._screenWidth))
                mapX = -(this._gameWorldWidth - this._screenWidth);
            if (mapY < -(this._gameWorldWidth - this._screenHeight))
                mapY = -(this._gameWorldWidth - this._screenHeight);
        }
        return cc.p(mapX, mapY);
    },

    calcMapGride:function(x, y){
        x *= this._mapscale;
        y *= this._mapscale;
        var mapSizeH = this._ttmap.getMapSize().height - 1;
        var gridex = (x - this._tileSize/2)/ this._tileSize;
        var gridey = mapSizeH - (y - this._tileSize/2 ) / this._tileSize;
        return cc.p(Math.round(gridex), Math.round(gridey));
    },

    calcAstar:function(endx, endy){
        if(endx <0 || endx > this._ttmap.getMapSize().width)
            return null;

        if(endy <0 || endy > this._ttmap.getMapSize().height)
            return null;

        if(!this._aMaps.grid.hasOwnProperty(endx) || !this._aMaps.grid[endx].hasOwnProperty(endy))
            return null;

        var start = this._aMaps.grid[this._currGrideX][this._currGrideY];
        var end = this._aMaps.grid[endx][endy];
        if(!start || !end)
            return null;
        return astar.search(this._aMaps, start, end, {closest: 1});
    },

    calcDirpath:function(dir){
        var path = [];
        var px = this._p_player.x;
        var py = this._p_player.y;
        while(1) {
            var point = {};
            switch (dir) {
                case dir_t.up:
                    point.x = px;
                    point.y = --py;
                    break;
                case dir_t.down:
                    point.x = px;
                    point.y = ++py;
                    break;
                case dir_t.left:
                    point.x = --px;
                    point.y = py;
                    break;
                case dir_t.right:
                    point.x = ++px;
                    point.y = py;
                    break;
            }
            if (this.checkBlock(point.x, point.y))
                break;
            path.push(point);
        }
        return path;
    },

    defaultTouchButton : function(btn, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            switch(btn.getName()){
                case "ready": //竞技场提示条
                    arenaMsgHelper.cancelMatch();
                    break;
                case "back":
                    var backcity_id = tj.cfg.getAttr("designdata/itemID", "backcity");
                    var str = "";
                    var b_count = tj.mainData.getItemNum(backcity_id);
                    if(b_count)
                        str = tj.cfg.get("text/map/backcity").format(b_count);
                    else{
                        var gem = tj.dbdata.getValueById("item", backcity_id, "val");
                        str = tj.cfg.get("text/map/backcity_gem").format(gem);
                    }
                    var msgbox = createMsgBox2(this, str, function(tag){
                        switch(tag) {
                            case 0:
                                tj.wsconnection.setMsg(msgac["Map_back"], {"usetype":b_count?0:1});
                                break;
                            case 2:
                                tj.wsconnection.setMsg(msgac["GM_func"], {op:0});
                                break;
                            case 3:
                                tj.wsconnection.setMsg(msgac["GM_func"], {op:1});
                                break;
                            case 4:
                                tj.wsconnection.setMsg(msgac["GM_func"], {op:2});
                                break;
                            case 5:
                                tj.wsconnection.setMsg(msgac["GM_func"], {op:3});
                                break;
                            default:
                                break;
                        }
                        return true;
                    }, 2);
                    //为gm权限添加重置地图的按钮功能
                    if (tj.mainData.main.gmflag == true) {
                        msgbox.add_btn(tj.cfg.get("text/map/resetmap"), 2);
                        msgbox.add_btn(tj.cfg.get("text/map/resetloc"), 3);
                        msgbox.add_btn(tj.cfg.get("text/map/unlockAllMap"), 4);
                        msgbox.add_btn(tj.cfg.get("text/map/clearMist"), 5);
                    }
                    break;
                case "pack":
                    this._curr_popLayer = createBagSelect(this, select_t.bag, this._bagc, this._bagmax);
                    break;
                case "cook":
                    var items = tj.mainData.getBagItemsByType(itemType.Food);
                    if(isEmptyObject(items))
                        this.noticetext_add(tj.cfg.get("text/map/noMorefood"));
                    else
                        this._curr_popLayer = createBagSelect(this, select_t.food);
                    break;
                case "encamp":
                    tj.wsconnection.setMsg(msgac["Map_camp"], {"type":0});
                    break;
                case "team":
                    if(Team_Box)
                        Team_Box.trigger();
                    break;
                case "treat":
                    if(this._basicInfo.cure_times > 0) {
                        var time = tj.cfg.get("designdata/loadingbox_cure");
                        var text = tj.cfg.get("text_on_ui/map/cure");
                        this._curr_popLayer = createLoadingBoxLayer(this, text, time, this.callbackLoadingCure.bind(this));
                        tj.wsconnection.setMsg(msgac["Map_camp_cure"]);
                        this._cureLoading = true;
                    }
                    break;
                case "joke":
                    if(this._basicInfo.buff_times > 0) {
                        time = tj.cfg.get("designdata/loadingbox_joke");
                        text = tj.cfg.get("text_on_ui/map/joking");
                        this._curr_popLayer = createLoadingBoxLayer(this, text, time, this.callbackLoadingJoke.bind(this));
                        tj.wsconnection.setMsg(msgac["Map_camp_buff"]);
                        this._jokeLoading = true;
                    }
                    break;
                case "set":
                    var settings = new settingLayer();
                    settings.init();
                    this._curr_popLayer = settings;
                    this.addChild(settings);
                    break;
                case "btnHero":
                    if(btn.heroId){
                        if(this.isStatus(map_state.camp))
                            this._curr_popLayer = createCardHeroLayer(this, btn.heroId, heroCard_t.camp);
                        else
                            this._curr_popLayer = createCardHeroLayer(this, btn.heroId, heroCard_t.check);
                    }
                    break;
                case "adventure":
                    //if(this._bagc > this._bagmax)
                    //    this.noticetext_add(tj.cfg.get("text/team/weightOver"));
                    //else
                    tj.wsconnection.setMsg(msgac["Map_camp"], {"type": 1});
                    break;
            }
        }
    },

    callbackLoadingCure:function(itemid){
        this._cureLoading = false;
    },

    callbackLoadingJoke:function(itemid){
        this._jokeLoading = false;
    },

    update : function(){
        this._super();

        //if(!tj.isInMap)
        //    return;

        switch(this._currentStatus){
            case MapStatus.inzooming: {
                if (!this._ttmap.getActionByTag(ZOOM_EVENT_ACTION_TAG)){
                    this._currentStatus = MapStatus.normal;
                    this._draging = false;
                    if(this._autoMoveStatus == AutoMoveStatus.wait)
                        this.startAutoMove();
                }
                break;
            }
            case MapStatus.moving : {
                if (!this._ttmap.getActionByTag(MOVE_EVENT_ACTION_TAG)){
                    this._currentStatus = MapStatus.normal;
                    if(this._server_pos && (this._p_player.x != this._server_pos.X || this._p_player.y != this._server_pos.Y)){
                        this._p_player.x = this._server_pos.X;
                        this._p_player.y = this._server_pos.Y;
                        this.mapAction(true);
                        this.stopAutoMove(true);
                        this._server_pos = null;
                        this._moveLocked  = false;
                    }
                }
                break;
            }
        }

        //cc.log("this._currentStatus = " + this._currentStatus);
        if(this._autoMoveStatus == AutoMoveStatus.auto && this._currentStatus == MapStatus.normal)
            this.runAutoMove();

        if (this._entered === true && this._fightData && this._currentStatus != MapStatus.moving && this._hinting === false) {
            if(!arenaMsgHelper.isArenaFight() || arenaMsgHelper.isReady()) {
                fightData.fill(this._fightData);
                tj.pushScene(new cc.TransitionFade(1, createScene(fightLayer)));
                this._fightData = null;
                this.hide_event();
            }
        }

        if(this._cureData && !this._cureLoading){
            switch(this._cureData.ret){
                case 0:
                    this.noticetext_add(tj.cfg.get("text/map/cureSucc"));
                    if(Team_Box)
                        Team_Box.refresh_hero(this._cureData.heroinfo, true);
                    this._basicInfo.cure_times -= 1;
                    if(this._basicInfo.cure_times <= 0)
                        WidgetDig(this._rcImpt.ui, "encamp/treat").setVisible(false);
                    break;
                case 1:
                    this.noticetext_add(tj.cfg.get("text/map/nocamping"));
                    break;
                case 2:
                    this.noticetext_add(tj.cfg.get("text/map/noCureCount"));
                    break;
            }
            this._cureData = null;
        }

        //if(this._jokeData && !this._jokeLoading){
        //    switch(this._jokeData.ret){
        //        case 0:
        //            this.noticetext_add(tj.cfg.get("text/map/jokeSucc"));
        //            var attr = this._jokeData.affected_attr;
        //            if(Team_Box)
        //                Team_Box.buff_attr(attr);
        //            this._basicInfo.buff_times -= 1;
        //            if(this._basicInfo.buff_times <= 0)
        //                WidgetDig(this._rcImpt.ui, "encamp/joke").setVisible(false);
        //            break;
        //        case 1:
        //            this.noticetext_add(tj.cfg.get("text/map/nocamping"));
        //            break;
        //        case 2:
        //        case 3:
        //            this.noticetext_add(tj.cfg.get("text/map/noCureCount"));
        //            break;
        //    }
        //    this._jokeData = null;
        //}

        var pickup = LayerCacheMgr.getInstance().getLayer("pickup");
        if(pickup == null && this._pickupData && this.isStatus(map_state.pick)){
            this.close_pickup();
            createPickupLayer(this, this._pickupData.curweight, this._bagmax, this._pickupData.items);
            this.hide_event();
        }

        if(this._push_time && this._push_pos && this._aMaps) {
            var time = this._push_time;
            var nowTime = new Date();
            var diff = nowTime - time;
            if (diff <= tj.cfg.get("designdata/configNum/pushTime"))
                return;

            if(this._last_push_pos.x != this._push_pos.x || this._last_push_pos.y != this._push_pos.y){
                this.stopAutoMove();
                this._curr_path = this.calcAstar(this._push_pos.x, this._push_pos.y);
                if (!this._curr_path){
                    //cc.log('无路可走');
                    var dir = this.get_dir(this._startP);
                    this._curr_path = this.calcDirpath(dir);
                }
                this.preAutoMove();
                this._last_push_pos = cc.p(this._push_pos.x, this._push_pos.y);
            }
        }

        if(this._ttmap && this._aMaps == null && this._blockData != null){
            this._aMaps = [];
            this._aBlocks = {};
            var that = this;
            var mdata = this._blockData[this._mapid];

            for(var b in mdata) {
                if(!mdata[b].b)
                    continue;
                var bx = mdata[b].x;
                var by = mdata[b].y;
                var tag = (bx + 1) * 100 + (by + 1);
                this._aBlocks[tag] = 1;
            }

            var traveBlock = function (x, y) {
                var tag = (x + 1) * 100 + (y + 1);
                if(that._aBlocks.hasOwnProperty(tag))
                    return true;
                return false;
            };

            var iRow = this._ttmap.getMapSize().width;
            var iCol = this._ttmap.getMapSize().height;
            //for (var i = 0; i < iRow; i++) {
            //    this._aMaps[i] = [];
            //    for (var j = 0; j < iCol; j++) {
            //        var aPoint = {};
            //        aPoint.className = 'block';
            //        aPoint.row = i;
            //        aPoint.col = j;
            //        aPoint.x = i;
            //        aPoint.y = j;
            //        aPoint.val = 0;
            //        if(traveBlock(i, j))
            //            aPoint.val = 1;
            //        this._aMaps[i][j] = aPoint;
            //    }
            //}

            var nodes = [];
            for (var i = 0; i < iRow; i++) {
                var nodeRow = [];
                for (var j = 0; j < iCol; j++) {
                    var isWall = traveBlock(i, j);
                    if(isWall) {
                        nodeRow.push(0);
                    }
                    else {
                        var cell_weight = (0 ? (Math.floor(Math.random() * 3)) * 2 + 1 : 1);
                        nodeRow.push(cell_weight);
                    }
                }
                nodes.push(nodeRow);
            }
            this._aMaps = new Graph(nodes);
        }
    },

    preAutoMove:function(){
        this._autoMoveStatus = AutoMoveStatus.wait;
        for(var i in this._curr_path){
            var p = this._curr_path[i];
            p.over = false;
            if(this._flagLayer)
                this._flagLayer.setTileGID(35,cc.p(p.x, p.y));
        }
        //this._flagLayer.setTileGID(1,cc.p(p.x, p.y));
        this._autoLabel.setString(this._curr_path.length);
    },

    //自动move
    startAutoMove:function(){
        this.unschedule(this.startAutoMove);
        if (this._draging){
            this.zoomIn();
            this._autoMoveStatus = AutoMoveStatus.wait;
            return;
        }
        if(this._autoMoveStatus == AutoMoveStatus.pause){
            this._autoMoveStatus = AutoMoveStatus.wait;
            this.schedule(this.startAutoMove, this._move_step_sec);
            return;
        }
        this._autoMoveStatus = AutoMoveStatus.auto;
        this._last_push_pos = cc.p(-1, -1);
    },

    runAutoMove:function(){
        if(this._flagLayer)
            this._flagLayer.setTileGID(0,cc.p(this._p_player.x, this._p_player.y));

        var left_step = 0;
        for(var i in this._curr_path) {
            var path = this._curr_path[i];
            if(!path.over)
                left_step++;
        }

        if(left_step == 0){
            this.stopAutoMove(true);
            this._autoLabel.setString("");
            return;
        }else
            this._autoLabel.setString(left_step);

        var foodid = tj.cfg.getAttr("designdata/itemID", "foodid");
        if(tj.mainData.getBagItemNum(foodid) <= 0){
            this.stopAutoMove(true);
            return;
        }

        if(this._mapState != map_state.none || this._moveLocked) {
            this.pauseAutoMove();
            return;
        }

        var p = this._curr_path.shift();
        var dir = dir_t.left;
        if (p.x > this._p_player.x)
            dir = dir_t.right;
        else if(p.x < this._p_player.x)
            dir = dir_t.left;
        else if(p.y > this._p_player.y)
            dir = dir_t.down;
        else if(p.y < this._p_player.y)
            dir = dir_t.up;
        this.runMoveAction(dir);
        p.over  = true;
        this._curr_path.push(p);
    },

    stopAutoMove:function(clear){
        this._autoLabel.setString("");
        this._autoMoveStatus = AutoMoveStatus.none;

        for(var i in this._curr_path){
            var p = this._curr_path[i];
            if(this._flagLayer)
                this._flagLayer.setTileGID(0,cc.p(p.x, p.y));
        }
        this._curr_path.length = 0;
        if(clear){
            this._last_push_pos = cc.p(-1, -1);
            this._push_pos = null;
            this._push_time = 0;
        }

        if(this._flagLayer)
            this._flagLayer.setTileGID(0,cc.p(this._p_player.x, this._p_player.y));
    },

    pauseAutoMove:function(){
        if(this._autoMoveStatus != AutoMoveStatus.none)
            this._autoMoveStatus = AutoMoveStatus.pause;
    },

    onEnter : function(){
        this._super();

        var bgm = tj.dbdata.getValueById("mapunlock", this._mapid, "bgm");
        if(bgm) {
            this._bgMusic = RES_PATH+"sound/bgm/"+bgm; //地图背景音乐
            cc.warn('set map bgm:', this._bgMusic, this._mapid);
        }
        //播放背景音乐
        tj.audio.playMusic(this._bgMusic, true, true);

        //web下会再次进入地图会丢失touch监听
        if (!cc.sys.isNative)
            this.init_listen();

        this.init_process_ac();

        this._move_step_sec = 0.3;
        if(tj.mainData.main.map_mv_speed_ms)
            this._move_step_sec = tj.mainData.main.map_mv_speed_ms/1000;

        this.refresh_stamp_ani();

        if(Team_Box)
            Team_Box.clear();

        //竞技场ui消息
        arenaMsgHelper.registerUIMsg();
        //设置竞技场倒计时层的父节点
        arenaMsgHelper.setParentUI(this);
    },

    showTopInfoBar : function(isVisible){
        WidgetDig(this._rcImpt.ui, "text").setVisible(isVisible);
        WidgetDig(this._rcImpt.ui, "function").setVisible(isVisible);
    },

    onEnterTransitionDidFinish : function(){
        this._super();
        this._entered = true;

        this.schedule(this.update_localstorage_faci, 2);

        tj.wsconnection.addGrp(msgac["Map_go_data"], msgac["Map_go_data"], this.process_ac.bind(this), this.get_scene_name());
        tj.wsconnection.addGrp(msgac["Map_go_map"], msgac["Map_go_map"], this.process_ac.bind(this), this.get_scene_name());
    },

    onExit:function(){
        this._super();

        //Map_Layer = null;

        this._entered = false;
        this.update_localstorage_faci();
        this._push_time = 0;
        //this.stopAutoMove();

    },

    arenaTip: function() {
        //更新竞技场状态提示
        var ui = this._rcImpt.ui;
        var arena_tip = WidgetDig(ui, "ready/text");
        if(arena_tip) {
            arena_tip.stopAllActions();
            if(arenaMsgHelper.isMatch()) {
                var ac = cc.repeatForever(cc.sequence(cc.fadeTo(0.8, 30), cc.fadeTo(0.7, 225)));
                arena_tip.runAction(ac);
                arena_tip.setString(tj.cfg.get("text/pvp/matching"));
                WidgetDig(ui, "ready").setVisible(true); //竞技场排队提示
            } else {
                arena_tip.runAction(cc.fadeIn(0.5));
                WidgetDig(ui, "ready").setVisible(false); //竞技场排队提示
            }
        }
    },

    monsterHint : function(posx, posy){
        var tileSize = this._ttmap.getTileSize();
        var mapSize = this._ttmap.getMapSize();
        var x = (posx * tileSize.width) + tileSize.width / 2;
        var y = (mapSize.height - posy) * tileSize.height - tileSize.height / 2;
        // this._ttmap.stopAllActions();
        var node = this._mhint;
        node.setPosition(x, y);
        tj.mainData.loadAnimate(RES_ANIMATION + "other/mapDanger.json", function(portait){
            this._portait = portait;
            node.addChild(portait.node);
            portait.node.stopAllActions();
            portait.action.pause();
            this.setAllRelease("hint");
            this.setRetain(portait.node, "hint");
            this.setRetain(portait.action, "hint");
            portait.action.retain();
            portait.action.setLastFrameCallFunc(function(){
                this._hinting = false;
                portait.node.removeFromParent(true);
            }.bind(this));
            portait.action.gotoFrameAndPlay(0, portait.action.getDuration(), false);
            node.runAction(portait.action);
        }.bind(this));
    },

    effect_firstin:function(tx, ty){
        this._ttmap.stopAllActions();

        var pos1 = this.calcMapPos(tx, ty, false);
        var a = cc.MoveTo.create(2.0, pos1);
        var pos2 = this.calcMapPos(this._p_player.x, this._p_player.y, false);
        var b = cc.MoveTo.create(1.5, pos1);
        var c = cc.MoveTo.create(2.0, pos2);
        var cb = cc.callFunc(function(){
            this._currentStatus = MapStatus.normal;
            //var e = cc.fadeIn(2);
            //WidgetDig(this._rcImpt.ui, "function/pack").runAction(e);
            if(!tj.mainData.getClientData("help")[0]) {
                tj.mainData.setClientDataValue("help", 0, 1);
                this.refreshHelp();
            }
        }, this);
        var q = new cc.Sequence(a, b, c, cb);
        this._ttmap.runAction(q);
        this._currentStatus = MapStatus.effect;

        this.play_stamp_ani("attack/target.json", tx, ty);
        //WidgetDig(this._rcImpt.ui, "function/pack").setOpacity(0);
    },

    play_stamp_ani:function(path, x, y){
        this.remove_stamp_ani(x, y);
        var mapSizeH = this._ttmap.getMapSize().height;
        var tilesize =  this._ttmap.getTileSize().width;
        var originX = x * tilesize + tilesize/2;
        var originY = (mapSizeH - y) * tilesize - tilesize/2;
        tj.mainData.loadAnimate(RES_ANIMATION + path, function(portait){
            portait.tx = x;
            portait.ty = y;
            portait.node.stopAllActions();
            portait.action.pause();
            portait.action.gotoFrameAndPlay(0, portait.action.getDuration(), true);
            portait.node.runAction(portait.action);
            portait.node.retain();
            portait.action.retain();
            portait.node.setPosition(originX, originY);
            this._ttmap.addChild(portait.node, 200);
            this._stamp_anis.push(portait);
        }.bind(this));
    },

    refresh_stamp_ani:function(){
        for(var i in this._stamp_anis){
            var portait = this._stamp_anis[i];
            portait.node.stopAllActions();
            portait.node.runAction(portait.action);
        }
    },

    remove_stamp_ani:function(x, y){
        for(var i in this._stamp_anis){
            var portait = this._stamp_anis[i];
            if(portait && portait.tx == x && portait.ty == y){
                portait.node.stopAllActions();
                portait.node.removeFromParent();
                portait.node.release();
                portait.action.release();
                this._stamp_anis.splice(i, 1);
            }
        }
    },

    process_ac : function(doc) {
        var msg_id = doc[0];
        var data = doc[1];
        switch (msg_id) {
            case msgac["Map_go_data"]:
            case msgac["Map_go_map"]:
                //切换地图
                if(tj.isInMap && this._basicInfo && this._basicInfo.mapid != data.basicinfo.mapid){
                    tj.wsconnection.removeGrp(this.get_scene_name());
                    tj.wsconnection.pushmsg(msg_id, data, true);
                    trans2scene(cc.TransitionFade, createScene(mapLayer), tj.cfg.get("designdata/transition_time_dead"));
                    tj.isInMap = false;
                    //var fo = cc.fadeOut(1.0);
                    //this.runAction(fo);
                    this.setVisible(false);
                    //this.showTopInfoBar(false);
                    this.update_localstorage_faci();
                    this.clear();
                    if(!cc.sys.isNative)
                        Map_Layer.clear_listen();
                    return;
                }

                this.clear();
                this.showTopInfoBar(true);
                tj.isInMap = true;
                this._moveLocked = false;
                var event = WidgetDig(this._rcImpt.node_scene,"event");
                tj.eventAccepter.initScene(event);

                this.stopAutoMove(true);
                cc.log("process_ac Map_go_data ");
                this._basicInfo = data.basicinfo;

                //地图切换的时候 会移除前一个map的监听 这里按照地图id重复监听一次 避免移除时序产生的bug
                tj.wsconnection.removeGrp(this.get_scene_name());
                this._basename = "Map" + this._basicInfo.mapid;
                this.init_process_ac();
                tj.wsconnection.addGrp(msgac["Map_go_data"], msgac["Map_go_data"], this.process_ac.bind(this), this.get_scene_name());
                tj.wsconnection.addGrp(msgac["Map_go_map"], msgac["Map_go_map"], this.process_ac.bind(this), this.get_scene_name());

                this.initUI();
                this.initMapSize();

                //本地保存设施信息
                var facis  = tj.local.getLocalStorageData("faci_map"+this._basicInfo.mapid);
                for(var i in facis) {
                    var ofaci = facis[i];
                    this.add_localstorage_faci(ofaci);
                }
                if(this._local_facis && this._local_facis.length)
                    this.draw_clientdata_faci();
                else{
                    this._local_facis = [];
                    tj.wsconnection.setMsg(msgac["Map_client_data"]);
                }

                //team
                var teambox = WidgetDig(this._rcImpt.node_scene,"team");
                Team_Box = createTeamBoxLayer(teambox, data.heroinfo, this._basicInfo.buff_attr);
                Team_Box.hide();

                this._heroinfo = data.heroinfo;
                if(tj.mainData.battleHeroIsNull()){
                    //将新手英雄放入出征英雄列表
                    var team = tj.mainData.getClientData("team");
                    for(var i in this._heroinfo){
                        var heroid = this._heroinfo[i].id;
                        var index = parseInt(i);
                        team[index] = heroid;
                    }
                    tj.mainData.setClientData("team", team);
                }

                //初始点
                var x = this._basicInfo.player_pos["X"];
                var y = this._basicInfo.player_pos["Y"];
                this._p_player = cc.p(x, y);
                this.refresh_position();

                this._visual_field = data.basicinfo.view;
                this._view.setScale(this._visual_field);

                //mist
                this._mist = cc.textureCache.addImage("res/art/map/mist.png");
                var r=0;
                var mist = data.mist;
                var width = this._basicInfo.max_width;
                for(var my=0;my<mist.length;my++){
                    for(var i=0;i<mist[my].length;i++){
                        var v = mist[my][i];
                        for (bit = 0; bit < 8; ++bit){
                            var mx = i * 8 + bit;
                            r = v & (1 << (8-bit-1));
                            if (r == 0 && mx < width && MIST)
                                this.drawMist(mx, my);
                        }
                    }
                }
                this._maplayer.setVisible(true);

                if(data.hasOwnProperty("sliceinfo") && data.sliceinfo)
                    this._slice_infos = data.sliceinfo.add;
                this.refresh_view_faci();

                if(TEST)
                    this.drawBlock();

                this._mapscale = 0.8;
                if (cc.tj.ACTIVE === true) {
                    this._mapscale *= cc.tj.SCALE;
                }
                this.zooming();
                this.mapAction(false);

                this._mapState = this._basicInfo.map_status;
                this._consume = this._basicInfo.consume;
                this._lack_food = this._basicInfo.lack_food;
                this.refresh_map_state();

                //bag
                tj.mainData.main.bags = data.bags;
                if(data.homeTo)
                    tj.mainData.storage2Bag(data.bags);
                this.refresh_weight(true);
                this.setVisible(true);

                for(var i in data.highligthed){
                    var p = data.highligthed[i];
                    this.play_stamp_ani("attack/target.json", p[1], p[2]);
                }

                //stamp
                //this.play_stamp_ani("attack/target.json", 10, 2);
                //this.refreshHelp();
                break;
            case msgac["Map_back"]:
                switch(data.ret){
                    case 0:
                        var isLive = true;
                        if(data.type == 1) //死亡回城（全灭）  由战斗直接处理回城
                        {
                           //由战斗处理
                            break;
                        }
                        else if(data.type == 2){ //饿死
                            isLive = false;
                            this.pop_noticemsg(tj.cfg.get("text/die_hungry"));
                            //新手（回城阶段）
                            if(tj.mainData.getClientData("help")[1] == 0){
                                trans2scene(cc.TransitionFade, createScene(transHelpLayer), tj.cfg.get("designdata/transition_time_dead"));
                                break;
                            }
                        }
                        else if(data.type == 3){  //宝石
                            if(data.gem){
                                var gnum = tj.mainData.getGemNum();
                                var cost = gnum - data.gem;
                                var gemid = tj.cfg.getAttr("designdata/itemID", "gemid");
                                this.pop_noticemsg(tj.mainData.getItemName(gemid) + " -" + cost);
                                tj.mainData.setGemNum(data.gem);
                                tj.wsconnection.pushmsg(msgac["Main_refresh_resource"]);
                            }
                        }
                        else if(data.type == 4){  //回城卷轴
                            var backcity_id = tj.cfg.getAttr("designdata/itemID", "backcity");
                            tj.mainData.subStroageItem(backcity_id, 1);
                            var bname = tj.mainData.getItemName(backcity_id);
                            this.pop_noticemsg(bname + " -1");
                        }else if(data.type == 5){  //验证失败
                            isLive = false;
                        }

                        tj.stat_map_pos(this._mapid, -1, -1);
                        tj.collect_script_stat(collect_type.COLLECT_BACKCITY);
                        if(isLive) {
                            tj.mainData.bag2Storage(data.bitem, data.bequip);
                            tj.wsconnection.pushmsg(msgac["Main_refresh_resource"]);
                        }else
                            tj.mainData.battleHero2Cemetery();

                        trans2scene(cc.TransitionFade, createScene(mainLayer), tj.cfg.get("designdata/transition_time_dead"));
                        this._moveLocked = true;
                        if(this._animation_campfire){
                            this._animation_campfire.removeFromParent();
                            this._animation_campfire = null;
                        }
                        break;
                    case 1:
                        this.noticetext_add(tj.cfg.get("text/notdiamond"));
                        var mapScene = this;
                        var msgbox = createMsgBox2(this, tj.cfg.get("text/map/outOfGem"), function(tag){
                            if(tag == 0){
                                createGemLayer(mapScene);
                            }
                            return true;
                        },2);
                        break;
                    case 2:
                        this.noticetext_add(tj.cfg.get("text/lessbackcity"));
                        break;
                    case 3:
                        this.noticetext_add(tj.cfg.get("text/map/noInmap"));
                        break;
                    case 4:
                        this.noticetext_add(tj.cfg.get("text/map/in_status"));
                        break;
                }
                break;
            case msgac["Map_move"]:
                if(data.ret > 0){
                    switch(data.ret){
                        case 1:
                        case 2:
                            this.noticetext_add(tj.cfg.get("text/map/map_no_go"));
                            break;
                        case 3:
                            //this.noticetext_add(tj.cfg.get("text/map/map_camp"));
                            break;
                    }
                    this._server_pos = data.pos;
                    var foodid = tj.cfg.getAttr("designdata/itemID", "foodid");
                    tj.mainData.setBagItemNum(foodid, data.food);
                    this.refresh_weight(true);
                }
                else if(data.sliceinfo){
                    for(var a in data.sliceinfo.add){
                        if(data.sliceinfo.add[a])
                            this._slice_infos[a] = data.sliceinfo.add[a];
                    }
                    for(var d in data.sliceinfo.del){
                        var del_idx = data.sliceinfo.del[d];
                        if(del_idx)
                            this._slice_infos[del_idx] = null;
                    }
                    this.refresh_view_faci();
                }
                if (data.food === 0) {
                    this.stopAutoMove(true);
                }
                break;
            case msgac["Map_teleport"]:
                this._p_player.x = data.x;
                this._p_player.y = data.y;
                this.mapAction(true);
                this.stopAutoMove(true);
                this._server_pos = null;
                this._moveLocked  = false;
                if(data.slice){
                    for(a in data.slice.add){
                        if(data.slice.add[a])
                            this._slice_infos[a] = data.slice.add[a];
                    }
                    for(d in data.slice.del){
                        del_idx = data.slice.del[d];
                        if(del_idx)
                            this._slice_infos[del_idx] = null;
                    }
                    this.refresh_view_faci();
                }
                break;
            case msgac["Map_hint_mon"]:
                this._hinting = true;
                this.monsterHint(data.x, data.y);
                break;
            case msgac["Bag_refresh_weight"]:
                if(data.hasOwnProperty("bagc"))
                    this._bagc = data.bagc;
                if(data.hasOwnProperty("bagmax"))
                    this._bagmax = data.bagmax;
                //拾取完后会推送刷新背包容量的消息，在这里同时刷新回城数目
                WidgetDig(this._rcImpt.ui, "function/back/num").setString(tj.mainData.getItemNum(5000));
                this.refresh_weight(false);
                break;
            case msgac["Map_camp"]:
                switch(data.ret){
                    case 0:
                        this._basicInfo.buff_times = data.buff_times;
                        this._basicInfo.cure_times = data.cure_times;
                        if(data.type == 0){
                            this._basicInfo.camp_times--;
                            if(this._basicInfo.camp_times < 0)
                                this._basicInfo.camp_times = 0;
                        }else{
                            if(Team_Box)
                                Team_Box.hide();
                        }
                        this.refresh_map_state();
                        this.stopAutoMove(true);
                        break;
                    case 1:
                        this.noticetext_add(tj.cfg.get("text/map/lesscamp"));
                        break;
                    case 2:
                        this.noticetext_add(tj.cfg.get("text/map/camping"));
                        break;
                    case 3:
                        this.noticetext_add(tj.cfg.get("text/map/picking"));
                        break;
                    case 4:
                        this.noticetext_add(tj.cfg.get("text/map/fighting"));
                        break;
                    case 5:
                        this.noticetext_add(tj.cfg.get("text/map/noInmap"));
                        break;
                    case 6:
                        this.noticetext_add(tj.cfg.get("text/map/nocamping"));
                        break;
                }
                break;
            case msgac["Fight_info"]: //开始战斗
                // if(this._currentStatus == MapStatus.moving || this._entered !== true)
                //     this._fightData = data;
                // else{
                //     cc.log("------- Fight: ", doc);
                //     fightData.fill(data);
                //     //cc.director.pushScene(new fightScene());
                //     tj.pushScene(new cc.TransitionFade(1, createScene(fightLayer)));
                //     // cc.director.pushScene(createScene(fightLayer));
                //     this._fighting = true;
                //     this.hide_event();
                //     //var layer2 = new fightLayer();
                //     //this.addChild(layer2);
                // }
                this._fightData = data;
                if(arenaMsgHelper.isArenaFight()) {
                    if(this._fightData.pvp) {
                        arenaMsgHelper.setFightData(this._fightData);
                    }else{
                        cc.log(' ---- fight err: pve after pvp ', this._fightData);
                    }
                    this._fightData = null;
                }
                break;
            case msgac["Pick_info"]:
                this._pickupData = data;
                if(this.isStatus(map_state.pick)){
                    this.close_pickup();
                    createPickupLayer(this, data.curweight, data.maxweight, data.items, function(){
                        this._pickupData = null;
                    }.bind(this));
                    //this.hide_event();
                }
                break;
            case msgac["Map_status"]:
                this._mapState = data.st;
                if(this._mapState == map_state.none){
                    if(this._autoMoveStatus == AutoMoveStatus.pause){
                        this.schedule(function(){
                            if(this._autoMoveStatus == AutoMoveStatus.pause)
                                this._autoMoveStatus = AutoMoveStatus.auto;
                        }.bind(this), this._move_step_sec, false);
                    }
                    this._moveLocked = false;
                }

                // Map_go_map消息通过 map_go_data 转发后导致消息在状态消息后
                if (this._basicInfo != null) {
                    this.refresh_map_state();
                }
                break;
            case msgac["Map_camp_cure"]:
                this._cureData = data;
                break;
            case msgac["Map_camp_buff"]:
                this._jokeData = data;
                break;
            case msgac["Map_hide"]:
                //data - [id, x, y, hide, slice]
                var id = data[0],
                    x = data[1],
                    y = data[2],
                    hide = data[3],
                    sno =  data[4];

                //stamp
                if(hide == 2)
                    this.play_stamp_ani("attack/target.json",x, y);
                else if(hide == 1)
                    this.remove_stamp_ani(x,y);

                var slice = this._slice_infos[sno];
                if (slice === undefined || slice === null) {
                    return;
                }
                var f = true;
                for (var i in slice) {
                    var faci = slice[i];
                    if (faci.Id == id) {
                        faci.Hide = hide;
                        f = false;
                        break
                    }
                }
                if (f) {
                    slice.push({
                        Id : id,
                        X: x,
                        Y: y,
                        Hide: hide
                    });
                }
                this.refresh_view_faci();
                //this.remove_localstorage_faci(id);
                break;
            case msgac["MapUI_fight_end"]:
                this._fighting = false;
                if(data.loseside == 0 && this._mapbackData) {
                    if(data.gem)
                        tj.mainData.setGemNum(data.gem);
                    //tj.mainData.bag2Storage(data.bitem, data.bequip);

                    this.pop_noticemsg(tj.cfg.get("text/die_kill"));
                    this.setAllRelease();
                    trans2scene(cc.TransitionFade, createScene(mainLayer), tj.cfg.get("designdata/transition_time_dead"));
                }
                if(data.exp)
                    tj.mainData.addSoul(data.exp);
                var heros = [];
                for(var h in data.heros){
                    var hero = data.heros[h];
                    var o = {};
                    o.id = hero.id;
                    o.hp = 0;
                    o.dead = false;
                    if(hero.dead)
                        o.dead = true;
                    if(hero.curhp)
                        o.hp = hero.curhp;
                    heros.push(o);
                }
                if(Team_Box)
                    Team_Box.refresh_hero(heros);
                break;
            case msgac["Map_change_consume"]:
                if(this._basicInfo.mapid == data.id)
                    this._consume = data.num;
                break;
            case msgac["Map_change_hp"]:
                var heros = [];
                for(var h in data){
                    var hero = data[h];
                    heros.push(hero);
                }
                if(Team_Box)
                    Team_Box.refresh_hero(heros, true);
                break;
            case msgac["Game_on_hide"]:
                this.update_localstorage_faci();
                cc.log("Game_on_hide update_localstorage_faci!!!!!" );
                break;
            case msgac["GM_func"]:
                if (data.ret == 0) {
                    this.noticetext_add(tj.cfg.get("text/map/ok"));
                } else {
                    this.noticetext_add(tj.cfg.get("text/map/failed"));
                }
                break;
            case msgac["MainUI_pay_ver_ret"]:
                var box = createMsgBox2(this,data,function(tag){
                    return true;
                },1);
                box.setMsgHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
                break;
            case msgac["Map_stop_auto_move"]:
                if(this._autoMoveStatus != AutoMoveStatus.none){
                    this.stopAutoMove(true);
                }
                break;
            case msgac["Map_move_speed"]:
                if(tj.mainData.main.map_mv_speed_ms)
                    this._move_step_sec = tj.mainData.main.map_mv_speed_ms/1000;
                break;
            case msgac["Map_client_data"]:
                for(var i in data.datas) {
                    var sfaci = data.datas[i];
                    var cfaci = {};
                    cfaci.id = sfaci[0];
                    cfaci.mapid = data.id;
                    cfaci.X = sfaci[1];
                    cfaci.Y = sfaci[2];
                    this.add_localstorage_faci(cfaci);
                }
                this.draw_clientdata_faci();
                break;
        }
    },

    close_pickup:function(){
        //if(this._curr_popLayer && this._curr_popLayer.get_scene_name() == "pickup")
        //    this._curr_popLayer.set_release();
        var pRet = LayerCacheMgr.getInstance().getLayer("pickup");
        if (pRet && pRet.getParent() !== null) {
            pRet.removeFromParent();
        }
    },


    refresh_map_state:function(){
        if(this._basicInfo)
            WidgetDig(this._rcImpt.ui, "function/encamp/num").setString(this._basicInfo.camp_times);
        else
            WidgetDig(this._rcImpt.ui, "function/encamp/num").setString(0);

        WidgetDig(this._rcImpt.ui, "function/encamp").setVisible(true);
        var layoutEncamp = WidgetDig(this._rcImpt.ui, "encamp");
        layoutEncamp.setVisible(false);
        this._animation_campfire.setVisible(false);
        this._particle_player.setVisible(true);
        if(this.isStatus(map_state.camp)){
            this._animation_campfire.setVisible(true);
            this._animation_campfire.setPosition(this._particle_player.getPosition());
            this._particle_player.setVisible(false);
            layoutEncamp.setVisible(true);
            WidgetDig(this._rcImpt.ui, "function/encamp").setVisible(false);

            if(this._basicInfo.cure_times <= 0)
                WidgetDig(layoutEncamp, "treat").setVisible(false);
            else
                WidgetDig(layoutEncamp, "treat").setVisible(true);
            if(this._basicInfo.buff_times <= 0)
                WidgetDig(layoutEncamp, "joke").setVisible(false);
            else
                WidgetDig(layoutEncamp, "joke").setVisible(false);

            var tmpl = WidgetDig(layoutEncamp, "joke");
            formation(layoutEncamp, 20);

            if(Team_Box)
                Team_Box.show(true);

            if(tj.mainData.getClientData("help_camp") == 2){
                tj.mainData.setClientData("help_camp", 3);
            }
        }
        this.refreshHelp();
    },

    refresh_view_faci:function(){
        if(!this._ttmap)
            return;

        var x = this._p_player.x;
        var y = this._p_player.y;

        for(var i in this._local_facis) {
            var ofaci = this._local_facis[i];
            if(ofaci.mapid != this._basicInfo.mapid)
                continue;
            var in_view = this.is_in_view(ofaci.X, ofaci.Y);
            if(in_view) {
                this._objlayer.setTileGID(0, cc.p(ofaci.X, ofaci.Y));
                this._local_facis.splice(i, 1);
            }
        }

        for(var i in this._slice_infos) {
            var facis = this._slice_infos[i];
            for (var j in facis) {
                var id = facis[j].Id;
                var facix = facis[j].X;
                var faciy = facis[j].Y;
                if (facis[j].Hide == 1){
                    this._objlayer.setTileGID(0,cc.p(facix,faciy));
                    this.remove_localstorage_faci(id);
                    continue;
                }
                in_view = this.is_in_view(facix, faciy);
                if(in_view){
                    this.remove_localstorage_faci(id);
                    var icon = this._locIcons[id];
                    if(icon != undefined)
                        this._objlayer.setTileGID(icon,cc.p(facix,faciy));
                    else
                        this.pop_noticemsg("map faci icon error!  faci_id = " + id);
                    var faci = {};
                    faci.id = id;
                    faci.mapid = this._basicInfo.mapid;
                    faci.X = facix;
                    faci.Y = faciy;
                    this.add_localstorage_faci(faci);
                }
            }
        }
    },

    is_in_view:function(fx, fy){
        var x = this._p_player.x;
        var y = this._p_player.y;
        var vf = this._visual_field;

        if(fx > (x+vf) || fx < (x-vf))
            return false;
        if(fy > (y+vf) || fy < (y-vf))
            return false;
        return true;
    },

    draw_clientdata_faci:function(){
        for(var i in this._local_facis){
            var faci = this._local_facis[i];
            if(faci.mapid != this._basicInfo.mapid)
                continue;
            var icon = this._locIcons[faci.id];
            var facix = faci.X;
            var faciy = faci.Y;
            if(icon != undefined)
                this._objlayer.setTileGID(icon,cc.p(facix,faciy));
            else{
                cc.log("map faci icon error!  faci_id = " + faci.id);
                //tj.sendErrLog(e, this.get_scene_name()+" draw_clientdata_faci icon is undefined!!!",  ['faci.id:' + faci.id]);
            }
        }
    },

    check_on_faci:function(){
        var back_id = tj.cfg.get("designdata/map_back_id");
        for(var i in this._slice_infos) {
            var facis = this._slice_infos[i];
            for (var j in facis) {
                if(facis[j].Hide == 1)
                    continue;
                var id = facis[j].Id;
                var x = facis[j].X;
                var y = facis[j].Y;
                if(this._p_player.x == x && this._p_player.y == y && id != back_id){
                    return true;
                }
            }
        }
        return false;
    },

    onTouchesBegan : function(touches, event){
        if(!tj.isInMap)
            return;

        var self = event.getCurrentTarget();
        if(!self._ttmap)
            return;

        if(touches.length >= 2 && self._autoMoveStatus != AutoMoveStatus.auto) {
            self._push_time = 0;
            self.stopAutoMove(true);
        }

        self._startP = touches[0].getLocation();
        if(self._currentStatus == MapStatus.effect)
            return;

        if(self._autoMoveStatus == AutoMoveStatus.auto){
            //self._autoMoveStatus = AutoMoveStatus.break;
            return;
        }

        if (touches.length >= 2){
            var i = 0;
            var movedx = [];
            for (var i in touches){
                var location = touches[i].getLocation();
                movedx.unshift(location);
            }
            self._begincout = distance(movedx[0], movedx[1]);
        }else{
            var convertedLocation = touches[0].getLocation();
            var convertedToNodeLocationMap = self._ttmap.convertToNodeSpace(convertedLocation);
            self._push_pos = self.calcMapGride(convertedToNodeLocationMap.x, convertedToNodeLocationMap.y);

            if(self._currentStatus != MapStatus.moving)
                self._push_time = new Date();
        }
    },

    onTouchesMoved : function(touches, event) {
        if(!tj.isInMap)
            return;

        var self = event.getCurrentTarget();
        if(!self._ttmap)
            return;

        if(self._currentStatus == MapStatus.effect)// || self._currentStatus == MapStatus.moving)
            return;

        if(self._autoMoveStatus == AutoMoveStatus.wait) {
            var convertedLocation = touches[0].getLocation();
            var convertedToNodeLocationMap = self._ttmap.convertToNodeSpace(convertedLocation);
            self._push_pos = self.calcMapGride(convertedToNodeLocationMap.x, convertedToNodeLocationMap.y);
        }

        if(touches.length >= 2 && self._autoMoveStatus != AutoMoveStatus.auto) {
            self._push_time = 0;
            self.stopAutoMove(true);
        }

        var dis = distance(self._startP, touches[0].getLocation());
        if (dis < tj.cfg.get("designdata/mapclick", 0, t_int))
            return;

        if(self._autoMoveStatus == AutoMoveStatus.break){
            self._autoMoveStatus = AutoMoveStatus.auto;
        }

        if (touches.length < 2 ){
            if(self._autoMoveStatus != AutoMoveStatus.wait){
                var diff = touches[0].getDelta();
                var newPos = self._ttmap.getPosition();
                newPos.x = newPos.x + diff.x;
                newPos.y = newPos.y + diff.y;
                //越界复位
                if (newPos.x > self._screenWidth/4)
                    newPos.x = self._screenWidth/4;
                if (newPos.y > self._screenHeight/4)
                    newPos.y = self._screenHeight/4;
                if (newPos.x < -(self._gameWorldWidth - self._screenWidth/4))
                    newPos.x = -(self._gameWorldWidth - self._screenWidth/4);
                if (newPos.y < -(self._gameWorldHeight - self._screenHeight/4))
                    newPos.y = -(self._gameWorldHeight - self._screenHeight/4);
                self._ttmap.setPosition(newPos);
                self._draging = true;
                self._push_time = 0;
            }
        } else if(touches.length >= 2) {
            var location;
            var moved = [];
            for (var i in touches){
                location = touches[i].getLocation();
                moved.unshift(location);
            }

            var endcout = distance(moved[0],moved[1]);
            if (self._begincout == 0)
                self._begincout = endcout;

            self._mapscale = endcout/self._begincout * self._mapscale;

            var min = tj.cfg.get("designdata/mapscalemin", 0.0, t_float);

            if (self._mapscale < min)
                self._mapscale = min;
            if (self._mapscale > 1)
                self._mapscale = 1;

            self._begincout = endcout;
            self.zooming();
            self._push_time = 0;
        }
    },

    onTouchesEnded : function(touches, event) {
        if(!tj.isInMap)
            return;

        var self = event.getCurrentTarget();
        if(!self._ttmap)
            return;

        self._begincout = 0;
        self._push_time = 0;

        if (touches.length >= 2)
            return;

        //新手扎营
        if(tj.mainData.getClientData("help_camp") == 1){
            tj.mainData.setClientData("help_camp", 2);
            self.refreshHelp();
            return;
        }

        if(tj.mainData.getClientData("help_camp") == 2){
            return;
        }

        if( self._autoMoveStatus == AutoMoveStatus.wait){
            if(self._currentStatus == MapStatus.normal){
                self.startAutoMove();
                return;
            }
            if(self._draging)
                self.stopAutoMove(true);
            return;
        }

        if(self._overWeightNoteCount == 0 && (self._bagc > self._bagmax)){
            this._notebox = createNoteBox2(self, tj.cfg.get("text/map/overWeight"), form_t.mail, function(){
                this._notebox = null;
            }.bind(this));
            this._notebox.setPos(375, 720);
            self._overWeightNoteCount++;
            return;
        }

        var nowpos = self._ttmap.getPosition();
        self._lookGrideX = -(nowpos.x - self._screenWidth/4 + self._tileSize/2)/self._tileSize;
        self._lookGrideY = (nowpos.y + self._gameWorldHeight - self._screenHeight/4 - self._tileSize/2)/self._tileSize;

        var prvp = self._startP;
        var nowp = touches[0].getLocation();
        var dis = distance(prvp, nowp);
        stat_touch_pos(nowp);
        if (dis < tj.cfg.get("designdata/mapclick", 0, t_int)){
            if(self._autoMoveStatus == AutoMoveStatus.auto){
                self.stopAutoMove(true);
                //self._autoMoveStatus = AutoMoveStatus.none;
                return;
            }

            if (self._draging){
                self.zoomIn();
                return;
            }

            self.stopAutoMove(true);
            var dir = self.get_dir(nowp);
            self.runMoveAction(dir);
        }
    },

    get_dir:function(nowp){
        var convertedToNodeLocationMap = this._ttmap.convertToNodeSpace(nowp);
        var p = this.calcMapGride(convertedToNodeLocationMap.x, convertedToNodeLocationMap.y);

        p.x -= this._p_player.x;
        p.y -= this._p_player.y;
        var dir = dir_t.left;
        if (Math.abs(p.x) > Math.abs(p.y)){
            if (p.x > 0)
                dir= dir_t.right;
            else
                dir= dir_t.left;
        } else {
            if (p.y > 0)
                dir= dir_t.down;
            else
                dir= dir_t.up;
        }
        return dir;
    },

    onMouseScroll : function(scroll){
        var self = scroll.getCurrentTarget();
        if (scroll.getScrollY() > 0){
            self._mapscale += 0.1;
        } else {
            self._mapscale -= 0.1;
        }
        var min = tj.cfg.get("designdata/mapscalemin", 0.0, t_float);
        if (self._mapscale < min)
            self._mapscale = min;
        if (self._mapscale > 1)
            self._mapscale = 1;
        self.zooming();
    },

    runMoveAction : function(dir){
        //cc.log("------------------------runMoveAction!");
        if(this._moveLocked)
            return;

        if(this._currentStatus != MapStatus.normal)
            return;

        if(!this.isStatus(map_state.none))
        {
            if(this.isStatus(map_state.camp))
                this.noticetext_add(tj.cfg.get("text/map/map_camp"));
            return;
        }

        var x, y;
        var size = this._ttmap.getMapSize();
        var m_x = size.width;
        var m_y = size.height;

        x = this._p_player.x;
        y = this._p_player.y;
        switch(dir){
            case dir_t["up"] : {
                y--;
            }break;
            case dir_t["down"] : {
                y++;
            }break;
            case dir_t["left"] : {
                x--;
            }break;
            case dir_t["right"] :{
                x++;
            }break;
        }
        if(this.checkBlock(x,y, true)){
            this.stopAutoMove(true);
            if(this._flagLayer)
                this._flagLayer.setTileGID(0,cc.p(x,y));
            return;
        }

        if (x >= 0 && x < m_x && y >= 0 && y < m_y){
            for (var i = x - this._visual_field; i <= x + this._visual_field; i++){
                for (var j = y - this._visual_field; j <= y + this._visual_field; j++){
                    this.killMist(i, j);
                }
            }
            this._p_player.x = x;
            this._p_player.y = y;
            tj.stat_map_pos(this._mapid, this._p_player.x, this._p_player.y);
            this.refresh_position();

            if(cc.sys.isMobile)
                tj.audio.playEffect("res/art/sound/se/walk.mp3", false);

            if(this.check_on_faci())
                this._moveLocked = true;

            tj.wsconnection.setMsg(msgac["Map_move"], {"pos":[x,y]});

            var foodid = tj.cfg.getAttr("designdata/itemID", "foodid");
            if(tj.mainData.getBagItemNum(foodid) <=0)
                this._lack_food ++;
            tj.mainData.subBagItem(foodid, this._consume);
            this.refresh_weight(true);
            this.refresh_view_faci();
        }

        if( this._basicInfo.lack_to_death == undefined || this._basicInfo.lack_to_death >= this._lack_food)
            this.mapAction(true);

        //新手（地图阶段）设置
        if(tj.mainData.getClientData("help")[0] == 1){
            tj.mainData.setClientDataValue("help", 0, 2);
            this.refreshHelp();
        }else if(tj.mainData.getClientData("help")[0] == 2){
            tj.mainData.setClientDataValue("help", 0, 3);
            this.refreshHelp();
        }
    },

    zooming : function(){
        if(!this._ttmap)
            return;
        this._tileSize = this._ttmap.getTileSize().width * this._mapscale;
        this._gameWorldWidth = this._ttmap.getMapSize().width * this._tileSize;
        this._gameWorldHeight = this._ttmap.getMapSize().height * this._tileSize;
        var mpos = this.calcMapPos((this._lookGrideX), (this._lookGrideY), false);
        this._ttmap.setPosition(mpos);
        this._ttmap.setScale(this._mapscale);
    },

    zoomIn : function(){
        if(!this._ttmap || this._currentStatus == MapStatus.inzooming)
            return;
        this._currentStatus = MapStatus.inzooming;

        this._begincout = 0;
        this._gameWorldWidth = this._ttmap.getMapSize().width * this._tileSize;
        this._gameWorldHeight = this._ttmap.getMapSize().height * this._tileSize;
        var mpos = this.calcMapPos(this._currGrideX, this._currGrideY, false);
        var actionMove = cc.MoveTo.create(0.3, mpos);
        this._lookGrideX = this._currGrideX;
        this._lookGrideY = this._currGrideY;

        this._ttmap.stopAllActions();
        var f = cc.callFunc(function(){},this);
        var action = cc.spawn(actionMove, f);
        action.setTag(ZOOM_EVENT_ACTION_TAG);
        this._ttmap.runAction(action);
    },

    drawMist:function(x, y) {
        if(!this._mist)
            return;
        var tag = (x + 1) * 100 + (y + 1);
        var img = new cc.Sprite();
        img.initWithTexture(this._mist,cc.rect(0,0,180,180));
        img.setScale(0.55);
        if (this._ttmap.getChildByTag(tag) == null){
            if(this._ttmap.getLayer("mapLayer1"))
                this._ttmap.addChild(img, 4, tag);
            else
                this._ttmap.addChild(img, 1, tag);
        }

        var mapSizeH = this._ttmap.getMapSize().height;

        var originX = x * this._tileSize + this._tileSize/2;
        var originY = (mapSizeH - y) * this._tileSize - this._tileSize/2;

        img.setPosition(cc.p(originX, originY));
        //console.log("drawMist x:" + x + " y:" + y +" originX:"  + originX + " originY:" + originY);
    },

    killMist : function(x, y) {
        //var batch = this._ttmap.getChildByTag(TAG_BATCH_NODE);
        if (x < 0 || y < 0)
            return;
        var tag = (x+1) * 100 + (y+1);
        while (this._ttmap.getChildByTag(tag) != null){
            this._ttmap.removeChildByTag(tag);
        }
    },

    drawBlock:function(){
        if(this._mapid == 0 || this._blockData == null)
            return;
        var mdata = this._blockData[this._mapid];
        for(var b in mdata) {
            if(!mdata[b].b)
                continue;
            var bx = mdata[b].x;
            var by = mdata[b].y;
            if(this._flagLayer)
                this._flagLayer.setTileGID(12,cc.p(bx,by));
        }
    },

    checkBlock:function(x, y, open){
        if(this._mapid == 0 || this._blockData == null)
            return false;
        var mdata = this._blockData[this._mapid];
        for(var b in mdata){
            var bx = mdata[b].x;
            var by = mdata[b].y;
            if(x == bx && y == by){
                if(open && mdata[b].m > 0)
                    this.openBlock(mdata[b].m);
                if(mdata[b].b)
                    return true;
            }
        }
        return false;
    },

    openBlock:function(m){
        if(this._mapid == 0 || this._blockData == null)
            return false;
        var mdata = this._blockData[this._mapid];
        for(var b in mdata){
            if(mdata[b].m == m){
                var bx = mdata[b].x;
                var by = mdata[b].y;
                this.killMist(bx, by);
            }
        }
        return false;
    },


    isStatus:function(status){
        if(status == map_state.none && this._mapState == 0)
            return true;
        return (this._mapState & (1 << status)) != 0;
    },

    haveStatus:function(st, status){
        return (st & (1 << status)) != 0;
    },

    hide_event:function(){
        tj.wsconnection.pushmsg(msgac["Hide_eventcard"]);
    },

    getCurrentMapId: function() {
        return this._mapid;
    }
});