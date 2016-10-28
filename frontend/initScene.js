/**
 * Created by likx on 2015/11/02.
 */

var initLayer = baseLayer.extend({
	_ui: 0,
	_loading_bar: null,
	_cb: null,
	_on_map: false,
	_wait_cfg: false,
	_wait_Agreement:false,
	_loadres: false,
	_load_tips: false,
	_tips_interval: -1,
	_wait_init:false,

	ctor: function() {
		this._basename = "Loading";
		this._super();
		this._wait_Agreement = false;
	},

	init: function() {
		if (!this._super())
			return false;

		if (!cc.sys.isNative){
			if (this.load_scene(this.get_scene_name()) == -1)
				return false;

			if (!this._rcImpt.ui)
				return false;

			WidgetDig(this._rcImpt.ui, "btn").setVisible(false);
			WidgetDig(this._rcImpt.ui, "textStar").setVisible(false);

			var lbar = WidgetDig(this._rcImpt.ui, "loading");
			lbar.setVisible(false);
			if (lbar)
				lbar.setPercent(1);
			this._loading_bar = lbar;
			this._loading_text = WidgetDig(this._rcImpt.ui, "text");
			this._loading_text.setString("0%");

			WidgetDig(this._rcImpt.ui, "id").setVisible(false);
		}

		if (typeof(global_payplat) != "undefined") { // 定义在buildver.js，打包时生成
			cc.tj.payplat = global_payplat;
		} else {
			cc.tj.payplat = "unknown";
		}
		if (typeof(global_channel) != "undefined") { // 定义在buildver.js，打包时生成
			cc.tj.channel = global_channel;
		} else {
			cc.tj.channel = "unknown";
		}


		if(cc.sys.isNative && !tj.local.getFirstinGame()){
			createAgreementLayer(this, function(tag){
				if(tag == 1){
					tj.local.setFirstinGame();
					this.createLoginBox();
				}
				else {
					cc.director.end();
	                SysUtil.exit();
				}
			}.bind(this));

		}else
			this.createLoginBox();

		tj.wsconnection.addGrp(msgac["Login_success2"], msgac["Login_success2"], this.process_ac.bind(this), this.get_scene_name());
		tj.wsconnection.addGrp(msgac["Login_success"], msgac["Login_success"], this.process_ac.bind(this), this.get_scene_name());
		tj.wsconnection.addGrp(msgac["Login_fail2"], msgac["Login_fail2"], this.process_ac.bind(this), this.get_scene_name());
		tj.wsconnection.addGrp(msgac["Kickout2"], msgac["Kickout2"], this.process_ac.bind(this), this.get_scene_name());
		tj.wsconnection.addGrp(msgac["Game_relogin"], msgac["Game_relogin"], this.process_ac.bind(this), this.get_scene_name());
		tj.wsconnection.addGrp(msgac["Game_chooseGameSrv"], msgac["Game_chooseGameSrv"], this.process_ac.bind(this), this.get_scene_name());
		//WidgetDig(this._rcImpt.ui, "textWarning").setVisible(false); //健康游戏...

		this._wait_cfg = true;
		this._wait_init = true;
		//地图标志需重置，否则重登陆可能造成无法监听地图消息的问题
		tj.isInMap = false;

		return 0;
	},

	update: function(delta) {
		if (!this._wait_init) {
			return;
		}

		this._super();

		if (this._loadres === true && tj.gamedata_load === true) {
			if (LayerCacheMgr.getInstance().createLayer() === false) {
				this._loading_bar.setPercent(100);
				this._loading_text.setString("100%")
				tj.load_succ = true;
				this._loadres = false;
			} else {
				var percent = parseInt(this._loading_bar.getPercent());
				if (percent < 50) {
					percent = 50;
				}
				var cache_num = LayerCacheMgr.getInstance().getCount();
				percent += parseInt((50 / cache_num));
				percent = Math.min(percent, 100);
				this._loading_bar.setPercent(percent);
				this._loading_text.setString(percent + "%");
			}
		}

		if (tj.load_succ && tj.gamedata_load === true) {
			//tj.mainData.init();
			tj.audio.init();
			var on_map = tj.mainData.get_mapid() > 0;
			this._cb(on_map);

			//登陆成功init完以后广播游戏开始的消息
			tj.wsconnection.pushmsg(msgac["Game_start"]);
		}
		if (tj.cfgLoad && this._wait_cfg) {
			this._wait_cfg = false;
			var str_id = "user: " + tj.user;
			var str_ser = WS_SERVER;
			var str_v = "v: " + cc.tj.UpdateVer;
			WidgetDig(this._rcImpt.ui, "id/ver").setString(str_v);
			WidgetDig(this._rcImpt.ui, "id/id").setString(str_id);
			WidgetDig(this._rcImpt.ui, "id/service").setString(str_ser);
		}

		if (tj.cfgLoad && (this._tips_interval === -1 || this._tips_interval >= tj.cfg.get("tips/interval", 5))) {
			this._tips_interval = 0;
			var tips = tj.cfg.get("tips/contents");
			var rand = tj.rand(0, tips.length - 1);
			WidgetDig(this._rcImpt.ui, "textStar").setVisible(true);
			this.setContentString(WidgetDig(this._rcImpt.ui, "textStar"), tips[rand]);
		} else if (this._load_tips)
			this._tips_interval += delta;
	},

	createLoginBox: function(auto) {
		// 重回登陆框的消息，要从wsconnection获得此消息结构
		var reloginInfo = {
			f: false,
			str: ""
		};
		if (tj.wsconnection !== undefined) {
			reloginInfo = ReloginMgr.getInstance().getReloginInfo();
		}
		if (reloginInfo.f === true) {
			var box = createMsgBox2(this, reloginInfo.str, function(tag) {
				if (tag == 1){
					var uid = tj.local.getDefaultUid();
					var p = tj.local.getDefaultPassword();
					tj.local.addClearList(uid, p);
					tj.local.setDefaultUid("");
					tj.local.setDefaultPassword("");
				}
				if (reloginInfo.exit) {
	                cc.Director.getInstance().end();
	                SysUtil.exit();
					return true;
				}
				this.createLogin(auto);
				return true;
			}.bind(this), 1);
			if (reloginInfo.can_clear === true) {
				box.add_btn(tj.cfg.get("text/login/reset_aid"), 1);
			}
			box.setMsgHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
		} else {
			this.createLogin(auto);
		}
	},

	createLogin: function(auto) {
		//如果配置为需要登陆框并且websocket连接没有强制自动登陆的话，弹出账号密码输入框
		if (tj.needLogin && !tj.wsconnection.isAuto()) {
			createLoginLayer(this, function(user, pwd, type) {
				tj.tokenMgr.clear();
				tj.tokenMgr.login(user, pwd);
			});
		} else {
			tj.tokenMgr.login();
		}
	},

	/**
	 * 选择游戏服务器列表弹窗
	 * @return {[type]} [description]
	 */
	createSelectGameList: function() {
		var lists = tj.gateMgr.getLists();
		var box = new SrvSelectBox(lists);
		this.addChild(box);
	},

	process_ac: function(doc) {
		var msg_id = doc[0];
		var data = doc[1];
		self = this;
		switch (msg_id) {
			case msgac["Login_success"]:
				self.schedule(self.start_real_loading.bind(self), 1.1, false);
				this._load_tips = true;
				var text = new ccui.Text();
				text.setString("ID:" + data);
				text.setAnchorPoint(cc.p(0,0));
				text.setPosition(0, 12);
				text.setFontSize(22);
				text.setColor(cc.color(125,125,125));
				this.addChild(text);
				break;
			case msgac["Login_fail2"]:
				// this.createLoginBox();
				switch (data) {
					case -1:
						createMainNoticeBox(tj.cfg.get("text/login/unableName"));
						break;
					case -2:
						createMainNoticeBox(tj.cfg.get("text/login/noName"));
						break;
					case -5:
						createMainNoticeBox(tj.cfg.get("text/login/wrongPassword"));
						break;
					default:
						createMainNoticeBox(tj.cfg.get("text/login/logan"));
						break;
				}
				break;
			case msgac["Game_relogin"]:
				tj.load_succ = false;
				tj.gamedata_load = false;
				this._loadres = false;
				this.createLoginBox(data.auto);
				break;
			case msgac["Game_chooseGameSrv"]:
				this.createSelectGameList();
				break;
			default:
				break;
		}
	},

	initWithResources: function(presources, gresources, cb) {
		if (cc.isString(presources))
			presources = [presources];
		this.presources = presources || [];
		if (cc.isString(gresources))
			gresources = [gresources];
		this.gresources = gresources || [];
		this._cb = cb;
	},

	pre_load: function(presources, gresources, cb) {
		if (cc.sys.isNative){
			cc.textureCache.removeAllTextures();
			cc.spriteFrameCache.removeSpriteFrames();
			if (this.load_scene(this.get_scene_name()) == -1)
				return false;

			if (!this._rcImpt.ui)
				return false;

			WidgetDig(this._rcImpt.ui, "btn").setVisible(false);
			WidgetDig(this._rcImpt.ui, "textStar").setVisible(false);

			var lbar = WidgetDig(this._rcImpt.ui, "loading");
			lbar.setVisible(false);
			if (lbar)
				lbar.setPercent(1);
			this._loading_bar = lbar;
			this._loading_text = WidgetDig(this._rcImpt.ui, "text");
			this._loading_text.setString("0%");

			if (cc.tj.ACTIVE === true) {
				switch (cc.tj.PTYPE) {
					case P_TYPE_WID:
						this.setAnchorPoint(cc.p(0.5, 0));
						this.setScale(cc.tj.SCALE);
						var A = WidgetDig(this, "Loading/A");
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

			WidgetDig(this._rcImpt.ui, "id").setVisible(false);
		}

		this.initWithResources(presources, gresources, cb);
	},

	onEnter: function() {
		this._super();

		self = this;
		cc.Node.prototype.onEnter.call(self);

		self.schedule(self.start_pre_loading, 0.3);
	},

	defaultTouchButton: function(btn, type) {
		if (type == ccui.Widget.TOUCH_ENDED) {
			if (btn.getName() == "btn") {

			}
		}
	},
	/**
	 * 读取场景资源等
	 */
	start_real_loading: function() {
		self = this;
		self.unschedule(self.start_real_loading);
		var res = self.gresources;
		cc.loader.load(res,
			function(result, count, loadedCount) {
				//读条长度：资源加载只占50%，另外50由缓存layer占据
				var percent = (loadedCount / (count * 2) * 100) || 0;
				percent = Math.min(percent, 100);
				if(self._loading_text && self._loading_bar) {
					self._loading_text.setString(parseInt(percent) + "%");
					self._loading_bar.setPercent(percent);
					self._loading_bar.setVisible(true);
					//tj.log("start_real_loading percent: " + percent);
				}
			},
			function() {
				if(self._loading_text && self._loading_bar) {
					self._loading_bar.setPercent(50);
					self._loading_text.setString(50 + "%");
				}
				tj.log("start_real_loading percent: 100 ");
				// tj.load_succ = true;
				self._loadres = true;
				//
				preLoadIconPlist();
			});
	},

	/**
	 * 预读取加载界面相关的资源
	 */
	start_pre_loading: function() {
		self = this;
		self.unschedule(self.start_pre_loading);
		var res = self.presources;
		if (!cc.sys.isNative)
			res = res.concat(map_resource);
		cc.loader.load(res,
			function(result, count, loadedCount) {
				//cc.log("loading initscene resources " + loadedCount);
			},
			function() {
				self.init();
			});
	}
});

var initScene = cc.Scene.extend({
	onEnter: function() {
		this._super();
		LayerCacheMgr.getInstance().resetAll();
		// if (tj.wsconnection !== undefined) {
		// 	tj.wsconnection.disps = new Array();
		// }
		initobj();
		tj.load_succ = false;
		tj.gamedata_load = false;
		var init = new initLayer();
		//重登陆的时候PK场景有些飘字比较麻烦，直接删除缓存重新存一份
		//LayerCacheMgr.getInstance().deleteLayer("PK");
		LayerCacheMgr.getInstance().deleteAllLayer();
		init.pre_load(p_resources, main_resource, function(on_map) {
			if (on_map)
			//新手（地图阶段）
				if (!tj.mainData.getClientData("help")[0]) {
					cc.director.runScene(createScene(transHelpLayer));
				}else
					cc.director.runScene(createScene(mapLayer));
			else
				cc.director.runScene(createScene(mainLayer));
		});
		this.addChild(init);
	}
});



/**
 * Layer事先加载放入内存中的机制.
 * 预加载放在init场景读取完所有场景后开始,等到所有场景加载完毕才进入主场景
 * 根据传入的名称获得对应的Layer， 如果已经在内存里，则直接返回，如果不在内存里，则需要创建后返回
 */

var LayerCacheMgr = (function() {
	function LayerCache() {
		//缓存池，create为layer对应的创建函数，layer为内存中的layer.
		this._caches = {
			"market": {
				create: marketLayer,
				layer: null
			},
			"wareHouse": {
				create: wareHouseLayer,
				layer: null
			},
			"pub": {
				create: pubLayer,
				layer: null
			},
			"atelier": {
				create: atelierLayer,
				layer: null
			},
			"manor": {
				create: manorLayer,
				layer: null
			},
			"PK": {
				create: fightLayer,
				layer: null
			},
			"cardhero": {
				create: cardHeroLayer,
				layer: null
			},
			"team": {
				create: teamLayer,
				layer: null
			},
			"pickup": {
				create: pickupLayer,
				layer: null
			},
			"gem" : {
				create:gemLayer,
				layer:null
			},
			"cardevent":{
				create:cardEventLayer,
				layer:null
			},
			"teambox":{
				create:teamBoxLayer,
				layer:null
			},
			"arena":{
				create: arenaLayer,
				layer: null
			}
		};

		/**
		 * 获取layer， 如果当时layer还没来得及在update里面生成，则优先生成后返回
		 * @return {[type]} [description]
		 */
		this.getLayer = function(name) {
			var layer = this._caches[name];
			if (layer === undefined) {
				cc.log("get no layer return!");
				return null;
			}
			if (layer.layer === null) {
				layer.layer = new layer.create();
				layer.layer.retain();
			}
			return layer.layer;
		};

		/**
		 * 由update调用，每次调用只生成一个layer
		 * @return {[type]} [description]
		 */
		this.createLayer = function() {
			for (var i in this._caches) {
				var layer = this._caches[i];
				if (layer.layer === null) {
					layer.layer = new layer.create();
					layer.layer.retain();
					return true;
				}
			}
			return false;
		};

		/**
		 *  重置缓存layer中的_curr_popLayer
		 */
		this.resetAll = function() {
			for (var i in this._caches) {
				var layer = this._caches[i];
				if (layer.layer === undefined || layer.layer === null) {
					continue;
				}
				layer.layer.onExit();
			}
		};

		/**
		 * 返回此场景是否是要保存uitmpl的layer
		 */
		this.isSaveUi = function(name) {
			var layer = this._caches[name];
			return layer !== undefined;
		};

		/**
		 * 删除指定名称的layer缓存
		 */
		this.deleteLayer = function(name) {
			var layer = this._caches[name];
			if (layer !== undefined && layer.layer != null) {
				layer.layer.setAllRelease();
				layer.layer.setAllRelease("uitmpl");
				layer.layer.setAllRelease("skillani");
				layer.layer.release();
				layer.layer = null;
			}
		};

		/**
		 * 删除全部的layer缓存
		 */
		this.deleteAllLayer = function() {
			for (var name in this._caches) {
				var layer = this._caches[name];
				if (layer !== undefined && layer.layer != null) {
					layer.layer.setAllRelease();
					layer.layer.setAllRelease("uitmpl");
					layer.layer.setAllRelease("skillani");
					layer.layer.release();
					layer.layer = null;
				}
			}
		};


		this.getCount = function() {
			var count = 0;
			for (var name in this._caches) {
				if (this._caches.hasOwnProperty(name)) {
					count++;
				}
			}
			return count;
		};
	};

	var instance;
	var _static = {
		name: 'LayerCacheMgr',
		/*
			返回实例单例
		 */
		getInstance: function() {
			if (instance === undefined) {
				instance = new LayerCache();
			}
			return instance;
		}
	};
	return _static;
})();