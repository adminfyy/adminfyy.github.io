
/** @const */ var DEFAULT_REPLAYBOX_LAYER = 9999999;
/** @const */ var DEFAULT_BASELAYER_TAG_OF_SCENE = 9876789;
/** @const */ var DEFAULT_CONTROAL_LAYER = 9876788;
/** @const */ var DEFAULT_ANNOUNCEMENT_LAYER = 9876787;

/** @const */ var AUTO_STR_IGNORE = 0;
/** @const */ var AUTO_STR_NEWLINE = 1;

var ResourceImported = function(){
	this.node_scene = null;				//场景根节点
	this.ui = null;					    //ui根节点
	this.action = null;					//action
	this.armature_title = null;			//标题骨骼动画
	this.ani_title = null;				//标题骨骼动画提取出的动画，播放用
	this.armature_bg = null;			//背景骨骼动画
	this.ani_bg = null;					//背景骨骼动画提取的动画，播放用
	this.armature_other = null;			//设置按钮骨骼动画
	this.ani_other = null;				//设置按钮骨骼动画提取的动画，播放用
};

var noticemsg = function() {
	this.l = null; 							//cocos2d.ui.text
	this.life = null; 						//int
};

function trans2scene(trans, scene) {
	var seconds = arguments[2] ? arguments[2] : 0;
	//cc.director.getRunningScene().removeAllChildren(true);
	if (scene){
		var snd = seconds > 0 ? seconds : tj.cfg.get("designdata/transition_time", 0.3);
		tr = trans.create(snd, scene);
		cc.director.runScene(tr);
	}
	//cc.log("trans2scene cost time :" + (tj.gameClock.elapsed() - t0));
}

var baseScene = cc.Scene.extend({
	_announcement:null,
	_replayBox:null,

	setAnnouncement:function(announcement){
		this._announcement = announcement;
	},

	setReplayBox : function(replayBox){
		this._replayBox = replayBox;
	},

	onEnter:function(){
		this._super();
		if(this._announcement)
			this._announcement.show();
	},

	showAnnouncement:function(pos){
		if(this._announcement)
			this._announcement.show(pos);
	},

	switchReplayBoxVisible : function(){
		if(this._replayBox){
			this._replayBox.switchVisible();
		}
	},

	replayBoxCallback : function(ret){
		if(this._replayBox){
			this._replayBox.clickBtnRecordCallback(ret);
		}
	}
});

function createScene (Layer){
	//创建默认Scene的函数
	//如果已经有layer存在于内存中则不重新创建，取出layer
	var scene = new baseScene();
	var layer;
	var flag = false;
	var control, announcement,replayBtn;
	var scene_name = "";
	switch(Layer){
		case mainLayer :{
			scene_name = "main";
			if (Main_Layer)
				layer = Main_Layer;
			else
				flag = true;
		}break;
		case mapLayer :{
			scene_name = "map";
			if (Map_Layer)
				layer = Map_Layer;
			else
				flag = true;
		}break;
		case fightLayer:
			scene_name = "fight";
		default:
			scene_name = "unknown";
			flag = true;
			break;
	}

	if (flag){
		if (Layer == fightLayer) {
			layer = LayerCacheMgr.getInstance().getLayer("PK");
			layer.set_release();
		} else {
			layer = new Layer();
			layer.retain();
			layer.init();
		}
		if (!layer)
			cc.log("baseLayer:createScene() : failed to create layer");
		else
			layer.setTag(DEFAULT_BASELAYER_TAG_OF_SCENE);
		scene.addChild(layer);
	} else {
		layer.set_release();
		scene.addChild(layer);
	}

	control = new controlLayer();
	control.init();
	scene.addChild(control, 100, DEFAULT_CONTROAL_LAYER);
	control.set_gamelayer(layer);

	announcement = new announcementBox(scene_name);
	announcement.init();
	scene.addChild(announcement, 50, DEFAULT_ANNOUNCEMENT_LAYER);
	scene.setAnnouncement(announcement);

	if(!replayBox_force_hide) {
		replayBtn = new replayBox();
		replayBtn.init();
		scene.addChild(replayBtn, 60, DEFAULT_REPLAYBOX_LAYER);
		scene.setReplayBox(replayBtn);
	}

	return scene;
}

var controlLayer = cc.Layer.extend({
	//成员变量
	_operate_ban_ : null,
	_touch_listener : null,
	_game_layer : null,
	_start_x : null,
	_start_y : null,


	//成员函数
	ctor : function(){
		this._super();
		this._game_layer = null;
	},
	set_ban : function() {
		this._operate_ban_ = true;
	},
	is_ban : function() {
		return this._operate_ban_;
	},
	init : function(){
		if (!this._super()){
			return false;
		}

		var self = this;
		var listener = cc.EventListener.create({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			onTouchBegan:self.onTouchBegan,
			onTouchMoved:self.onTouchMoved,
			onTouchEnded:self.onTouchEnd
		});
		cc.eventManager.addListener(listener,self);

		return true;
	},

	set_gamelayer : function(layer) {
		this._game_layer = layer;
	},

	onTouchBegan : function(pTouch, pEvent) {
		target = pEvent.getCurrentTarget();
		target._operate_ban_ = false;
		target._start_x = pTouch.getLocationInView().x;
		target._start_y = pTouch.getLocationInView().y;
		target._game_layer.on_touch_Began(pTouch);
		return true;

	},
	onTouchEnd : function(pTouch, pEvent) {
		var target = pEvent.getCurrentTarget();
		var slither_x, slither_y;
		var disX, disY;

		if (target._game_layer == null)
			return false;
		//cc.log("cotroal name:" + target._game_layer.get_scene_name());
		slither_x = 100;//tj.cfg.getAttr("designdata/slither", "x", 0.0, t_float);
		slither_y = 80;//tj.cfg.getAttr("designdata/slither", "y", 0.0, t_float);
		disX = Math.abs(target._start_x - pTouch.getLocationInView().x);
		disY = Math.abs(target._start_y - pTouch.getLocationInView().y)
		if (!target._operate_ban_ && disX > slither_x && disY < slither_y) {
			if (target._start_x > pTouch.getLocationInView().x) {
				// cc.log("controlLayer::onTouchEnd : 向左滑动");
				target._game_layer.on_slide_left();
			} else{
				// cc.log("controlLayer::onTouchEnd : 向右滑动");
				target._game_layer.on_slide_right();
			}
			target._operate_ban_ = true;
		}
		target._game_layer.on_touch_Ended(pTouch);
	},

	onTouchMoved : function(pTouch, pEvent) {
		target = pEvent.getCurrentTarget();
		target._game_layer.on_touch_Moved(pTouch);
	},

	onTouchesBegan : function(touches, pEvent) {
		//target = event.getCurrentTarget();
		//target._operate_ban_ = false;
	},

	onTouchesMoved : function(pTouches, pEvent) {
		for (var item in pTouches){
			touch = item;
			location = touch.getLocationInView();
		}
	},
	onTouchesEnded : function(touches, event) {
	},
	onMouseUp : function (event) {
		var target = event.getCurrentTarget();
	},
	onMouseDown : function (event) {
		var target = event.getCurrentTarget();
	},
	onMouseMove : function (event) {
		var target = event.getCurrentTarget();
	},
	update : function(){
		cc.assert("this is virtual function, must be rewrite");
	},
	onExit:function(){
		this._super();
	},
	onEnter:function(){
		this._super();
        //
		//var listener = cc.EventListener.create({
		//	event: cc.EventListener.TOUCH_ONE_BY_ONE,
		//	onTouchBegan:this.onTouchBegan,
		//	onTouchMoved:this.onTouchMoved,
		//	onTouchEnded:this.onTouchEnd
		//});
		//cc.eventManager.addListener(listener,this);
	}
});

var noticeLayer = cc.Layer.extend({
	//成员变量
	_game_layer : null,
	_addtime : null,
	_notice_time : null,
	_deq_msg :  null,
	//成员函数

	ctor : function(){
		this._super();
	},

	init : function() {
		if (!this._super()) {
			return false;
		}
		this._addtime = tj.gameClock.elapsed();
		this._notice_time = 0;
		this._deq_msg = [];
		return true;
	},

	add_notice : function(msg) {
		var top = arguments[1] ? arguments[1] : false;
		var obj = {};
		obj.msg = msg;
		obj.top = top;
		this._deq_msg.unshift(obj);
	},

	create_notice : function(msg, tag) {
		var fontname = tj.cfg.get("noticelayer/font", "");
		if (tj.cfg.getAttr("font/ui_font/Text","affect_manu_ui"))
			fontname = tj.cfg.get("font/ui_font/Text", "");
		var w = new ccui.Text(msg.msg, tj.cfg.get("designdata/design_fontName"), 32);
		var z = 100;
		if(msg.top){
			var childs = this._game_layer.getChildren();
			for(var i = 0; i < childs.length; ++i){
				if (childs[i].getLocalZOrder() > z)
					z = childs[i].getLocalZOrder();
			}
		}
		this._game_layer.addChild(w, z+10, tag);

		w.attr({anchorX:0.5});
		var visibleSize = cc.director.getVisibleSize();
		var origin = cc.director.getVisibleOrigin();
		var center = cc.p(origin.x + visibleSize.width/2, origin.y + visibleSize.height/2);
		w.setTextAreaSize(center);
		w.setPosition(center);
		w.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
		w.setTextVerticalAlignment(cc.TEXT_ALIGNMENT_CENTER);
		var sztxt = visibleSize;
		sztxt.width -= 100;
		sztxt.height = 0;
		w.setTextAreaSize(sztxt);
		var scale = w.getScale();
		if (tj.cfg.get("font/ui_font/affect_manu_ui"))
			scale *= tj.cfg.get("font/ui_font/text_scale");
		w.setScale(0);
		var n_line = 1;
		var ww = w.getVirtualRenderer();
		if (ww){
			//n_line = ww.getStringNumLine+s();
			var length = w.getString().length * w.getFontSize();
			var width = w.getTextAreaSize().width;
			n_line = width / length;
		}
		if (n_line < 1) n_line = 1;
		var e0 = cc.scaleTo(0.1, 1.5 * scale);
		var e1 = cc.scaleTo(0.1, scale);
		var kk = 3;
		var e2 = cc.fadeOut(1.5);
		var mv = cc.p(0, 0 - w.getContentSize().height*3);
		var e3 = cc.moveBy(kk, mv);
		var c1 = cc.spawn(e2, e3);
		var f = cc.callFunc(function(){
			w.removeFromParent();
		}, this);
		q = cc.sequence(e0, e1, c1, f);
		w.runAction(q);
	},

	clear : function(type) {
		if (type == 1){
			this.removeAllChildren(true);
		}
		if(this._game_layer){
			while(this._game_layer.getChildByTag(2))
				this._game_layer.removeChildByTag(2);
		}
		this._deq_msg.length = 0;
	},

	update : function() {
		var notice_interval_time = tj.cfg.get("designdata/notice_interval_time");
		if (this._deq_msg.length != 0) {
			if (tj.gameClock.elapsed() - this._notice_time > notice_interval_time){
				if(this._deq_msg.length != 0){
					this.create_notice(this._deq_msg.pop(), 2);
					this._notice_time = tj.gameClock.elapsed();
				}
			}
		}
	}
});


var helpHand = cc.Class.extend({
	_animation:null,
	_portait:null,
	_autoplayAnimate:false,

	ctor: function(parent, animate){
		this._autoplayAnimate = animate?animate:null;
		this._animation = new ccui.Widget();
		this._animation.setVisible(false);
		parent.addChild(this._animation, 1000);
		tj.mainData.loadAnimate(RES_ANIMATION + "other/anHelp.json", function(portait){
			this._animation.addChild(portait.node);
			this._portait = portait;
			portait.node.stopAllActions();
			portait.action.pause();
			this._autoplay();

			this._animation.retain();
			portait.node.retain();
			portait.action.retain();

		}.bind(this));
	},

	release: function() {
		this._portait.action.release();
		this._animation.release();
		this._animation.removeFromParent();
	},

	play:function(animate, loop){
		this._animation.stopAllActions();
		this._animation.setVisible(true);
		if(this._portait) {
			this._portait.action.play(animate, loop);
			this._animation.runAction(this._portait.action);
		}
	},

	setpos:function(posx, posy){
		this._animation.setPosition(posx, posy);
	},

	moveto:function(pos, sec, animate){
		this._animation.stopAllActions();
		this._animation.setVisible(true);
		var f = new cc.CallFunc(this._autoplay,this);
		var m = cc.MoveTo.create(sec, pos);
		var q = new cc.Sequence(m, f);
		this._animation.runAction(q);
		this._autoplayAnimate = animate;
		//if(animate && this._portait)
		//	this._portait.action.play(animate, true);
	},

	_autoplay:function(){
		if(this._autoplayAnimate && this._portait) {
			this._portait.action.play(this._autoplayAnimate, true);
			this._animation.runAction(this._portait.action);
			this._animation.setVisible(true);
			this._autoplayAnimate = null;
		}
	},

	stop:function(){
		if(this._portait) {
			this._portait.action.pause();
		}
		this._animation.stopAllActions();
		this._animation.setVisible(false);
	},

	setparent:function(parent){
		this._animation.removeFromParent(false);
		parent.addChild(this._animation, 1000);
	},

	setRotationX: function(rote) {
		this._animation.setRotationX(rote);
	}

});

var baseLayer;
//baseLayer = cc.Layer.extend({
baseLayer = cc.TransitionLayer.extend({
	//成员变量
	_tag : null,
	_basename:"base",
	_bgLayer : null,
	_rcImpt : null,
	_tjParent:null,
	_beTop:true,

	_released:false,  //标记本layer是否已经被移除

	/*切换回上个场景的过渡scene。仅用于切换后原scene不删除的情况
	 * 当从上个场景切到本场景时可以保存一个用于回切的scene，replace此scene即可回到原场景
	 *空表示无返回scene，如需要上个scene须手动处理
	 */
	_sceneTransitionBack: null,

	_notice: null,				//noticeLayer
	_control: null, 		//controlLayer
	_time_load_check: null,
	_last_backspace_time: null,

	//记录当前按下的按钮
	_push_pos: null,
	_push_item: null,
	_push_time: 0,

	//当前弹出的子窗口
	_curr_popLayer: null,

	//帮助图片
	_showHelp:false,
	_imageviewHelp:null,

	//单次适配标志
	_do_adjust : false,

	_armature_busy:null,//等待动画
	_helphand:null,//新手引导动画

	//<<lipm
	_retaintmps : null, //用于存放需要retain和release的结构

	//虚函数
	defaultTouchButton: function (btn, type) {
		cc.log("这是默认按钮事件的虚函数，请重写");
	},

	get_scene_name: function () {
		return this._basename;
	},

	//成员函数
	ctor: function () {
		this._super();
		this._load = true;
		this._rcImpt = return_empty_struct(ResourceImported);
		this._sceneTransitionBack = 0;
		this._notice = null;
		//this._control = new controlLayer();
		//this._control.init();
		//this._control.set_gamelayer(this);
		//this.addChild(this._control, 100, DEFAULT_CONTROAL_LAYER);
		this._retaintmps = {};
		this._curr_popLayer = null;
	},

	create_control:function(){
		this._control = new controlLayer();
		this._control.init();
		this._control.set_gamelayer(this);
		this.addChild(this._control, 100, DEFAULT_CONTROAL_LAYER);
	},

	setTag: function (str) {
		this.tag = str;
	},

	//初始化
	init: function () {
		if (!this._super()) {
			return false;
		}
		// cc.log(this.get_scene_name(), "start init at", tj.gameClock.elapsed());

		this._time_load_check = tj.gameClock.elapsed();
		var origin = cc.director.getVisibleOrigin();

		this._last_backspace_time = 0;

		this._push_item = null;
		this._push_time = 0;
		this._push_pos = cc.p(0, 0);

		//this.scheduleUpdate();

		if(this._showHelp){
			this._imageviewHelp = new ccui.ImageView();
			this._imageviewHelp.setVisible(false);
			this._imageviewHelp.setPosition(cc.p(cc.winSize.width/2,cc.winSize.height/2));
			this.addChild(this._imageviewHelp, 100);

			var scene_name = this.get_scene_name();
			var png_name = RES_HELP_PATH + scene_name + ".png";
			this._imageviewHelp.loadTexture(RES_HELP_PATH + scene_name + ".png");

			this._listener = cc.EventListener.create({
				event           : cc.EventListener.TOUCH_ONE_BY_ONE,
				target          : this._imageviewHelp,
				swallowTouches  : true,
				onTouchBegan    : this.onHelpTouchBegan.bind(this)
			});
			cc.eventManager.addListener(this._listener, this._imageviewHelp);
			this._listener.setEnabled(false);

			if(tj.local.getVal(scene_name + "_help") != "1"){
				tj.local.setVal(scene_name + "_help", "1");
				this.showHelp();
			}
		}

		return true;
	},

	showHelp:function(){
		if(this._imageviewHelp) {
			this._imageviewHelp.setVisible(true);
			this._listener.setEnabled(true);
		}
	},

	onHelpTouchBegan : function(touches, event){
		if(this._imageviewHelp){
			if(this._curr_popLayer && this._curr_popLayer.get_scene_name() == "plotbox") {
				this._curr_popLayer.removeFromParent(false);
				this._curr_popLayer = null;
			}else{
				this._imageviewHelp.setVisible(false);
				this._listener.setEnabled(false);
			}
		}
		return true;
	},

	update : function (delta) {
		if (this._notice != null) {
			this._notice.update(delta);
		}
		/*
		 //最后
		 Backend.instance.update(tj.gameClock.elapsed(), delta);
		 if (tj.dataFront.share_left_time > 0) {
		 dataFront.instrance.share_left_time -= delta;
		 }
		 */
	},

	onEnter: function () {
		cc.log("[", this.get_scene_name(), "] onEnter");
		this._super();
		if (this._notice == null) {
			this._notice = new noticeLayer();
			this.addChild(this._notice, 1000);
			this._notice._game_layer = this;
			this._notice.init();
		}
		this._notice.clear(1);

		if (cc.tj.ACTIVE === true) {
			this.process_adjust();
		}

		//以下layer需要在进入的时候重新加载plist防止被内存释放.
		var reloadPlist = ["pub", "cemetery", "wareHouse", "market", 
						   "atelier", "manor", "setting", "trophy", "team",
						   "Map", "PK", "pickup"];
		if (reloadPlist.indexOf(this.get_scene_name()) != - 1) {
			preLoadIconPlist();
		}

		if(this._basename && this._beTop)
			tj.pushLayer(this);

		this._released = false;
	},

	onExit: function () {
		cc.log('[', this.get_scene_name(), '] onExit')
		this._super();

		if (this._curr_popLayer !== null && this._curr_popLayer !== undefined && this._curr_popLayer.set_release !== undefined) {
			this._curr_popLayer.set_release();
			this._curr_popLayer = null;
		}

		this.setAllRelease();

		//if(this._tjParent)
		//	this._tjParent.onChildLayerRemove();

		tj.wsconnection.removeGrp(this.get_scene_name());

		if(this._basename && this._beTop)
			tj.popLayer(this);

		while(this.getChildByTag(NOTICE_BOX_TAG))
			this.removeChildByTag(NOTICE_BOX_TAG, true);
	},

	noticetext_add: function (msg, top) {
		if (this._notice == null || !msg)
			return;

		this._notice.add_notice(msg, top);
	},

	load_armature_busy : function(){
		var aniRES = RES_PATH + "animation/other/uiLoading.json";
		if (this._armature_busy === null) {
			var w = ccs.load(aniRES, RES_PATH);
			var action = w.action;
			var node = w.node;
            var winSize = cc.director.getWinSize();
			node.retain();
			// action.retain();
			node.stopAllActions();
			node.runAction(action);
            action.play("default", true);
            this._armature_busy = node;
            this.addChild(node);
            node.setPosition(cc.p(winSize.width/2, winSize.height/2));
		}
	},

	stop_armature_busy : function() {
		if (this._armature_busy !== null) {
			this._armature_busy.removeFromParent(true);
			this._armature_busy.stopAllActions();
			this._armature_busy.release();
		}
		this._armature_busy = null;
	},

	load_helphand:function(parent, animate){
		if(!this._helphand)
			this._helphand = new helpHand(parent, animate);
		else {
			this._helphand.setparent(parent);
			this._helphand.play(animate, true);
		}
	},

	setContentString: function (text, string, type) {
		if (text === undefined || string === undefined) {
			cc.log("setContentString with err args");
			return;
		}
		var type = type || AUTO_STR_IGNORE;
		switch (type) {
			case AUTO_STR_IGNORE://忽略原有宽度，自动增长
				text.ignoreContentAdaptWithSize(true);
				text.setString(string);
				break;
			case AUTO_STR_NEWLINE://固定原宽，增长行数
				strarr = string.split("\n");
				var olds = text.getContentSize();
				text.ignoreContentAdaptWithSize(true);
				var theight = 0;
				var line = 0;
				text.setString(strarr[0] + "\nabc");
				dline = text.getContentSize().height;
				for (var i in strarr) {
					text.setString(strarr[i]);
					var news = text.getContentSize();
					theight = theight < news.height ? news.height : theight;
					var mm = Math.ceil(news.width / olds.width);
					if(mm == 0)
						mm = 1;
					line += mm;
				}
				var lineheight = dline - theight;
				var lmargin = dline - 2 * lineheight;
				text.ignoreContentAdaptWithSize(false);
				text.setContentSize(cc.size(olds.width, lineheight * line + lmargin));
				text.setString(string);
				var lineinfo = {};
				lineinfo.height = lineheight;
				lineinfo.count = line;
				return lineinfo;
			default:
				text.setString(string);
				break;
		}
	},

	getDistance: function (pos1, pos2) {
		if(pos1 == null || pos2 == null)
			return 0;
		var difX = pos1.x - pos2.x;
		var difY = pos1.y - pos2.y;
		return  Math.sqrt(difX * difX + difY * difY);
	},

	/**
	 * 读取场景
	 * @param {String} 场景名称
	 * @returns {Number} 0代表成功
	 */
	load_scene: function (scene_name) {
		var node_ui, node_scene, node_test;
		var scene_config;
		
		var action = null;
		var armature_title = null;
		var ani_title = null;
		var armature_bg = null;
		var ani_bg = null;
		var armature_other = null;
		var ani_other = null;

		this._rcImpt = return_empty_struct(ResourceImported);
		scene_config = RES_PATH + "sc" + scene_name + ".json";
		try {
			var obj = ccs.load(scene_config);
			node_scene = obj.node;
			action = obj.action;
		} catch (e) {
			cc.log("baseLayer::load_scene :" + e);
		}
		if (!node_scene) {
			cc.log("baseLayer.load_scene - failed to load scene " + scene_name + "'s config " + scene_config);
			return -1;
		}

		//node_ui = ccui.helper.seekWidgetByName(node_scene, "UI");
		node_ui = node_scene.getChildByName("UI");
		if (node_ui)
			this._rcImpt.ui = node_ui;

		this._rcImpt.action = action;
		this._rcImpt.armature_title = armature_title;
		this._rcImpt.ani_title = ani_title;
		this._rcImpt.armature_bg = armature_bg;
		this._rcImpt.ani_bg = ani_bg;
		this._rcImpt.armature_other = armature_other;
		this._rcImpt.ani_other = ani_other;
		this._rcImpt.node_scene = node_scene;
		this.addChild(node_scene);
		tj.log("scene " + scene_config + " load ok: " + " ...");

		//给按钮加上默认监听，更换text字体
		if (this._rcImpt.node_scene)
			this.travelnode_touchbutton(this._rcImpt.node_scene, this);

		// if (this._armature_busy) {
		// 	this.stop_armature_busy(false);
		// }

		return 0;
	},


	/**
	 * 场景的ui读取，用于某些场景只需要ui
	 * @param {String} ui_short_name 场景ui的名称
	 * @returns
	 */
	load_ui: function (ui_short_name) {
		var fname = RES_PATH + ui_short_name;
		if (!cc.loader.getRes(fname)) {
			res = [fname];
			cc.loader.load(res, function () {
				cc.log("baseLayer::load_ui : load ui json done!");
				this.init();
			}.bind(this));
			return -1;
		}
		// cc.log(this.get_scene_name(), "start load ui at", tj.gameClock.elapsed());
		var w = ccs._load(fname);
		if (w)
			this.travelnode_touchbutton(w);

		// 统一隐藏顶部左右箭标按钮
		var btnRight = WidgetDig(w, "title/btnRight", false);
		if(btnRight)
			btnRight.setVisible(false);
		var btnLeft = WidgetDig(w, "title/btnLeft", false);
		if(btnLeft)
			btnLeft.setVisible(false);

		return w;
	},

	travelnode_touchbutton:function (node) {
		type = node._className;
		var str = node.toString();

		if (type == "Button" || str == o_button) {
			node.addTouchEventListener(this.prv_defaultTouchButton, this);
		}
		if (type == "ListView" || str == o_listView) {
			node.setScrollBarEnabled(false);
		}
		if (type == "Text" || str == o_text) {
			node.setFontName(tj.cfg.get("designdata/design_fontName"));
			var s = node.getString();
			var t = tj.cfg.get_ui_text(s);
			if (t != "") {
				node.setString(t);
			}
		}
		if (type == "TextBMFont" || str == o_textBMFont) {

		}

		if(("mouse" in cc.sys.capabilities) && !cc.sys.isNative) {
			//cc.log("listen mouse event:", node._name, type);
			if(node.getParent()==null) {
			}else {
				this._tester_listenMouseEvent(node);
			}
		}
		var childs = node.getChildren();
		for (var c in childs) {
			this.travelnode_touchbutton(childs[c]);
		}
	},

	_tester_listenMouseEvent: function(node) {
		/*
		cc.eventManager.addListener({
			event: cc.EventListener.MOUSE,
			onMouseMove: function(event) {
				try {
					var pos = event.getLocation();
					var target = event.getCurrentTarget();
					//cc.log('======> mouseover: ', target._className, target, WidgetPath(target));
					//if (!target.isVisible || !target.getSize) {
					//	return false;
					//}
					var t_parent = target.getParent();
					var rect = (new cc.Node).getBoundingBox.apply(target, []); //target.getBoundingBox();
					var size = {width: rect.width, height: rect.height};
					if (target.getSize) {
						var size = target.getSize();
					}
					var area = rect;
					if (t_parent) {
						var _pos = t_parent.convertToWorldSpace(cc.p(area.x, area.y));
						area = cc.rect(_pos.x, _pos.y, size.width, size.height);
					}
					if (cc.rectContainsPoint(area, pos)) {
						if (!target.__mouseOver) {
							target.__mouseOver = true;
							var clsn = target._className;
							//cc.log("onMouseIn: ", clsn, WidgetPath(target));
							if(document) {
								//显示控件路径
								var ctl_path = document.getElementById('ctl_path');
								if(tj.showCtlPath) {
									if (ctl_path) {
										ctl_path.style.display = "block";
										ctl_path.innerText = WidgetPath(target) + ' :'+ clsn;
									}
								}else{
									ctl_path.style.display = "none";
								}
							}
							if(tj.showCtlBorder) {
								//绘制边框
								if(clsn =='Layout' || clsn == 'ScrollView' || clsn == 'Node') {
									//return false;
								}
								var border = new cc.DrawNode();
								border.drawRect(cc.p(2, 2), cc.p(size.width - 4, size.height - 4), cc.color(0, 0, 0, 0), 2, cc.color(255, 0, 0, 255));
								if (border) {
									(new cc.Node).addChild.call(target, border);// target.addChild(border);
								}
								target.__border = border;
							}
						}
						//var pos = event.getLocation();
						event.stopPropagation();
						return false;
					} else {
						if (target.__mouseOver) {
							target.__mouseOver = false;
							if (target.__border) {
								target.__border.removeFromParent();
							}
							//cc.log("onMouseOut: ", event.getCurrentTarget()._name);
						}
					}
					return false;
				}catch(e){
					cc.log(e.message, e.stack);
					return false;
				}
				//cc.log("onMouseUp: ", pos, event.getCurrentTarget()._name, target.getBoundingBox(), area);
			}
		}, node);
		/**/
	},

	/**
	 * 默认的按钮点击处理函数
	 * @param {ccui.btn}                object
	 * @param {ccui.Widget.Touchtype}    type
	 */
	prv_defaultTouchButton: function (object, type) {
		var btn = object;
		var str = btn.toString();

		//if(cc.tj.DEBUG && !cc.sys.isNative && (type == ccui.Widget.TOUCH_ENDED || type == ccui.Widget.TOUCH_CANCELED)) {
		//	cc.log("prv_defaultTouchButton: ", WidgetPath(object));
		//}

		if (btn._className != "Button" && str != o_button) {
			return;
		}

		if (this._control && this._control.is_ban())
			type = ccui.Widget.TOUCH_CANCELED;
		if (type == ccui.Widget.TOUCH_BEGAN) {
			this._push_pos = btn.convertToWorldSpace(btn.getPosition());
		} else if (type == ccui.Widget.TOUCH_CANCELED) {
			if (this._push_pos) {
				var disY = Math.abs(this._push_pos.y - btn.getPosition().y);
				if (disY < 5/*tj.cfg.get("designdata/buttonclick", 0, t_int)*/) {
					type = ccui.Widget.TOUCH_ENDED;
				}
			}
		}

		if (type == ccui.Widget.TOUCH_ENDED) {
			this._push_item = null;
			this._push_time = 0;

			if(btn.getName() != "Tree")
				tj.audio.playEffect("res/art/sound/se/button.mp3", false);
		}

		if (type == ccui.Widget.TOUCH_ENDED || type == ccui.Widget.TOUCH_CANCELED) {
			this._push_item = null;
			this._push_time = 0;
			this._push_pos = null;
		}

		try {
			//Error.stackTraceLimit = 5;
			this.defaultTouchButton(btn, type);
		}catch(e){
			var name2 = '';
			if(btn.getName) {
				name2 = btn.getName();
			}
			if(btn.name) {
				name2 = btn.name;
			}
			var tag2 = '';
			if(btn.getTag) {
				tag2 = btn.getTag();
			}
			if(btn.tag) {
				tag2 = btn.tag;
			}
			var ud = '';
			if(btn.getUserData) {
				ud = btn.getUserData();
			}
			tj.sendErrLog(e, this.get_scene_name()+".defaultTouchButton: "+ e.message, ['name:'+name2+' tag:'+tag2+ ' ud:'+ud, type]);
			//if(!cc.system.isNative) {
			//	throw e;
			//}
		}
	},

	onKeyPressed: function (keyCode, event) {
	},
	onKeyReleased: function (keyCode, event) {
	},


	onEnterTransitionDidFinish: function () {
		this._super();

		//this.setPosition(0, 0);
		this.scheduleUpdate();
		this._can_add = true;

		var enters = ["Main", "Map", "PK", "transhelp"];
		var name = this.get_scene_name();
		if (enters.indexOf(name) > -1 || name.indexOf("Map") > -1) {
			this.listenRelogin();
		}
	},

	onExitTransitionDidStart: function () {
		this._super();
		this.unscheduleUpdate();
		if (this._notice) {
			this._notice.removeAllChildren(true);
			this._notice._deq_msg.length = 0;
		}
		var enters = ["Main", "Map", "PK", "transhelp"];
		var name = this.get_scene_name();
		if (enters.indexOf(name) > -1 || name.indexOf("Map") > -1) {
			this.removeRelogin();
		}
	},

	pop_noticemsg: function (msg, only, seconds) {
		if (only == undefined)
			createNoticeBox(this, msg, 1, seconds);
		else
			createNoticeBox(this, msg, only, seconds);
	},

	onChildLayerRemove: function () {
		this._curr_popLayer = null;
	},

	removeCurrPopLayer:function(){
		if(this._curr_popLayer){
			this._curr_popLayer.set_release();
			this._curr_popLayer = null;
		}
	},

	set_control_layer: function (layer) {
		this._control = layer;
	},

	on_slide_left: function () {
		//cc.log("这是虚函数on_slide_left，需要在子类实现 ");
	},
	on_slide_right: function () {
		//cc.log("这是虚函数on_slide_right，需要在子类实现");
	},
	on_touch_Ended: function () {
	},

	on_touch_Moved: function () {
	},

	on_touch_Began: function () {
	},

	set_release : function(){
		if(!this._released) {
			this._released = true;
			this.removeFromParent();
		}
	},

	is_release:function(){
		return this._released;
	},

	get_control_layer: function () {
		return this._control;
	},

	other_set: function () {
		//重载
	},

	//process layer retain and release tmplate
	/**
	 * 把tmpl对象retain，idx为分组存放，便于分组release
	 * @param node   tmpl  
	 * @param string tag 
	 */
	setRetain : function(tmpl, tag){
		if (this._retaintmps[tag] === undefined) {
			this._retaintmps[tag] = [];
		}
		tmpl.retain();
		this._retaintmps[tag].push(tmpl);
	},

	/**
	 * release某个组的某个对象
	 * @param {[type]} tmpl  [description]
	 * @param {[type]} force [description]
	 */
	setRelease : function(tmpl, tag) {
		if (tag === undefined || this._retaintmps[tag] === undefined) {
			return false;
		}
		for (var i in this._retaintmps[tag]) {
			if (this._retaintmps[tag][i] === tmpl) {
				this._retaintmps[tag].splice(i, 1);
				tmpl.release();
				return true;
			}
		}
		return false;
	},

	/**
	 *  release某个组的所有对象，不穿tag时release所有对象
	 */
	setAllRelease : function(tag){
		var saves = [];
		for (var i in this._retaintmps) {
			if (tag !== undefined && i !== tag) {
				continue;
			}
			if (tag === undefined) {
				if ((i === "uitmpl" || i ==="skillani") && LayerCacheMgr.getInstance().isSaveUi(this.get_scene_name())) {
					saves = this._retaintmps[i];
					continue;
				}
			}
			var grps = this._retaintmps[i];
			for (var j in grps) {
				grps[j].release();
			}
			if (tag !== undefined) {
				delete this._retaintmps[i];
				return;
			}
		}
		if (tag === undefined) {
			this._retaintmps = {"uitmpl": saves};
		}
	},
	

	/**
	 * public process for border ignore layer.
	 * by lipm
	 */
	need_process : function(name) {
		if ((name === "cardhero" || name ==="msgbox") && tj.isInMap !== true) {
			//不在地图上的cardhero和msgbox不需要处理
			return false;
		}
		if (name === "login" || name === "selectmap") {
			return false;
		}
		return true;
	},

	process_adjust : function(){
		if (this._do_adjust === true) {
			return;
		}

		var name = this.get_scene_name();
		var process_adjust = [ "wareHouse", "cemetery", "castle", "pub", 
							   "market", "manor", "atelier", "cardevent", "mail",
							   "trophy", "team", "cardeventpvp", "msgbox", "selectbag",
							   "pickup", "cardhero", "transhelp", "login", "gem",
							   "inputname", "selectmap", "setting", "arena","ranking","arenaReady",
							   "commentLayer", "announcementbox_main","announcementbox_map","announcementbox_fight,announcementbox_unknown"];
		var flag = false;
		for (var i in process_adjust) {
			if (process_adjust[i] == name) {
				flag = true;
				break;
			}
		}
		if (!flag) {
			return;
		}
		switch(cc.tj.PTYPE) {
			case P_TYPE_WID:
                this.setAnchorPoint(cc.p(0.5, 0));
				var childs = this.getChildren();
				var UI = WidgetDig(this, "Layer");
				if (this.need_process(name) === true) {
					this.setScale(cc.tj.SCALE);
					this._do_adjust = true;
				}
				if (UI === null) {
					return;
				}
				if (name != "cardevent") {
					var BG = WidgetDig(UI, "BG",false);
					if (BG !== null) {
						BG.setScale(1 / cc.tj.SCALE);
					}
				}
		}
	},

	//断线重新链接后的处理
	on_ws_reopen:function(){

	},

	//--如果在切换场景的过渡动画里接收到踢出消息，需要runScene，
	//此时会报错。所以在需要的场景加监听，onEnterFininsh后才回到登陆界面
	//监听重登陆消息
	listenRelogin: function(){
		cc.log("[ %s ] add relogin listen.".format(this.get_scene_name()));
		tj.wsconnection.addGrp(msgac["Game_relogin"], msgac["Game_relogin"], this.relogin.bind(this), "relogin");
	},

	//移除重登陆消息
	removeRelogin: function(){
		cc.log("[ %s ] remove relogin listen.".format(this.get_scene_name()));
		tj.wsconnection.removeGrp("relogin");
	},

	//重登陆操作
	relogin : function(){
		//重登陆前需重置的
		//清除已经监听的组
		tj.wsconnection.clearAllGrp();
		//清除队伍box
		if (Team_Box !== null) {
			//Team_Box.set_release();
			Team_Box = null;
		}
		//回到登陆界面
		tj.relogin = true;
		cc.director.runScene(new initScene());
		BridgeSDKController.gameRelogin();
	}
});

