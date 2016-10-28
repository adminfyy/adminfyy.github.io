/**
 * Created by lkx on 2015/10/13.
 * map
 */

/**@const notebox trans in ani**/ var N_TRANS_IN_ANI = "ShrinkGrow";
/**@const notebox trans in time**/ var N_TRANS_IN_TIEM = 0.3;
/**@const notebox trans in ease**/ var N_TRANS_IN_EASE = "BackOut";

var mainLayer;
mainLayer = baseLayer.extend({
	_uifoodtext: null,
	_uiwoodtext: null,
	_uiirontext: null,
	_uimithriltext: null,
	_uicrystaltext: null,
	_uicoinsnumtext: null,
	_uigemnumtext: null,
	_uiMessage: null,
	_version: null,
	_bgMusic: '', //背景音乐
	_animations: {},
	_tavernRefreshTime:null,

	_scroll_bg: null,
	_scroll_mg: null,
	_scroll_fg: null,
	_scroll_max: null,
	_tree:null,

	_move_dis : null,

	_tree_time_del : 0,
	_tree_speed : 0,

	ctor: function () {
		this._super();
		this._basename = "Main";
		this._tree = null;
		this._animations = {};
		Main_Layer = this;
	},

	init: function () {

		if (!this._super()) {
			return false;
		}
		//load scene
		if (this.load_scene(this.get_scene_name()) == -1)
			return false;

		if (!this._rcImpt.ui)
			return false;

		var str = "user: " + tj.user + "\n" + "server: " + WS_SERVER + "\n";
		str += "version: " + tj.cfg.get("version");
		this._version = new cc.LabelTTF(str, "Arial", 20);
		this._version.x = 180;
		this._version.y = cc.winSize.height / 2 + 50;
		this._version.setVisible(false);
		this.addChild(this._version);
		this._bgMusic = RES_PATH + "sound/bgm/mainScene.mp3";
		//this._bgMusic = RES_PATH+"sound/bgm/FindTheLight.mp3";

		//滚动层
		this._scroll_bg = WidgetDig(this, "Main/scroll_bg");
		this._scroll_fg = WidgetDig(this, "Main/scroll");
		this._scroll_mg = WidgetDig(this, "Main/scroll_mg");
		this._scroll_max = WidgetDig(this, "Main/scroll_max");

		//UI建筑
		this._castle = WidgetDig(this._scroll_mg, "MG/Castle");
		this._arena = WidgetDig(this._scroll_mg, "MG/Arena");
		this._market = WidgetDig(this._scroll_fg, "Market");
		this._atelier = WidgetDig(this._scroll_fg, "Atelier");
		this._tavern = WidgetDig(this._scroll_fg, "Tavern");
		this._manor = WidgetDig(this._scroll_max, "Manor");
		this._battle = WidgetDig(this._scroll_max, "Battle");
		this._warehouse = WidgetDig(this._scroll_max, "Warehouse");
		this._cemetery = WidgetDig(this._scroll_max, "Cemetery");

		WidgetDig(this._rcImpt.ui, "ready").setVisible(false); //竞技场排队提示

		//树相关
		this._tree = WidgetDig(this._scroll_fg, "Tree");
		this._tree_loading = WidgetDig(this._tree, "bar/Loading");
		this._tree_bar = WidgetDig(this._tree, "bar");
		this._tree_bar.setOpacity(0);

		//测试功能 Layer
		//--------------------------------
		var tf = tj.mainData.getClientData('tf'); //test fight flag
		//tf = 173; //173,1016 带眩晕buff怪
		if (tf || !cc.sys.isNative) {
			var that = this;
			var testLayer = new ccui.Layout();
			var btn2 = new ccui.Button();
			btn2.setTitleFontSize(24);
			btn2.setPosition(80, 0);
			btn2.setTitleText("Fight"); //测试战斗
			btn2.addTouchEventListener(function (sender, type) {
				if (type == cc.EventTouch.EventCode.ENDED) {
					var team = tj.mainData.getBattleHero();
					var t = false;
					for(var i in team) {
						if(team[i]>0) {
							t = true;
							break;
						}
					}
					if(!t) {
						that.pop_noticemsg("没有队伍");
						return;
					}
					var battle = tj.dbdata.gettable("battle");
					var bid = Math.ceil(Math.random() * (battle.length-1)/2);
					bid = battle[bid].id;
					if (cc.isNumber(tf) && tf>0) {
						bid = tf;
					}
					cc.log('Fight test id:' + bid);
					fightData.test(bid);
				}
			}, btn2);
			testLayer.addChild(btn2);
			testLayer.setPosition(570, 130);
			testLayer.setVisible(true);
			testLayer.retain();
			this.addChild(testLayer);
		}
		//--------------------------------

		//充值按钮
		// ccui.helper.seekWidgetByName(this._rcImpt.ui, "btnPay").setVisible(false);
		WidgetDig(this._rcImpt.ui, "battle/cost/gem").setEnabled(false);

		if (cc.tj.ACTIVE === true) {
			switch (cc.tj.PTYPE) {
				case P_TYPE_WID:
					//资源栏适配
					var resources = WidgetDig(this._rcImpt.ui, "resources");
					var pos = resources.getPosition();
					resources.setPosition(pos.x, pos.y * cc.tj.SCALE);
					//scroll_fg适配
					var container = this._scroll_fg.getInnerContainer();
					container.setAnchorPoint(cc.p(0, 0));
					container.setScale(cc.tj.SCALE);
					var size = container.getSize();
					var size2 = this._scroll_fg.getSize();
					container.setSize(cc.size(size.width * cc.tj.SCALE, size.height * cc.tj.SCALE));
					this._scroll_fg.setSize(cc.size(size2.width, size2.height * cc.tj.SCALE))
					//scroll_mg适配
					container = this._scroll_mg.getInnerContainer();
					container.setAnchorPoint(cc.p(0, 0));
					container.setScale(cc.tj.SCALE);
					size = container.getSize();
					size2 = this._scroll_mg.getSize();
					container.setSize(cc.size(size.width * cc.tj.SCALE, size.height * cc.tj.SCALE));
					this._scroll_fg.setSize(cc.size(size2.width, size2.height * cc.tj.SCALE));

					//scroll_bg适配
					container = this._scroll_bg.getInnerContainer();
					container.setAnchorPoint(cc.p(0, 0));
					container.setScale(cc.tj.SCALE);
					size = container.getSize();
					size2 = this._scroll_bg.getSize();
					container.setSize(cc.size(size.width * cc.tj.SCALE, size.height * cc.tj.SCALE));
					this._scroll_bg.setSize(cc.size(size2.width, size2.height * cc.tj.SCALE));

					//scroll_max适配
					container = this._scroll_max.getInnerContainer();
					container.setAnchorPoint(cc.p(0, 0));
					container.setScale(cc.tj.SCALE);
					size = container.getSize();
					size2 = this._scroll_max.getSize();
					container.setSize(cc.size(size.width * cc.tj.SCALE, size.height * cc.tj.SCALE));
					this._scroll_max.setSize(cc.size(size2.width, size2.height * cc.tj.SCALE));
					break;
			}
		}

		this._scroll_max.setSwallowTouches(false);
		this._scroll_max.addEventListener(this.scrollEvent, this);
		this._scroll_max.mainlayer = this;

		this._tavernRefreshTime = WidgetDig(this._tavern, "text/textTime");
		if(this._tavernRefreshTime) {
			this._tavernRefreshTime.setString("");
			this._tavernRefreshTime.setColor(cc.color("#B2B2B2"));
		}
		return true;
	},

	on_ws_reopen: function () {
		this.refresh_resource();
		this.refreshNew();
		this.refreshButton();
	},

	scrollEvent: function (sender, type) {
		var that = sender.mainlayer;
		switch (type) {
			case ccui.ScrollView.EVENT_SCROLLING:
				if(tj.mainData.getClientData("help")[1] == 1) {
					sender.scrollToRight(1, true);
					tj.mainData.setClientDataValue("help", 1, 2);
					that.refreshHelp();
				}else if (tj.mainData.getClientData("help")[1] == 3) {
					sender.scrollToLeft(1, true);
					tj.mainData.setClientDataValue("help", 1, 4);
					that.refreshHelp();
				}
				//新手墓地
				if (tj.mainData.getClientData("help_cemetery") == 1) {
					sender.scrollToLeft(1, true);
					tj.mainData.setClientData("help_cemetery", 2);
					that.refreshHelp();
				}
				break;
			default:
				break;
		}
	},

	refreshNew: function () {
		WidgetDig(this._arena, "text/lock").setVisible(false); //竞技场
		WidgetDig(this._atelier, "text/lock").setVisible(false);
		WidgetDig(this._cemetery, "text/lock").setVisible(false);
		WidgetDig(this._market, "text/lock").setVisible(false);
		WidgetDig(this._warehouse, "text/lock").setVisible(false);
		WidgetDig(this._tavern, "text/lock").setVisible(false);
		WidgetDig(this._manor, "text/lock").setVisible(false);
		WidgetDig(this._castle, "text/lock").setVisible(false);
		WidgetDig(this._battle, "text/lock").setVisible(false);
		WidgetDig(this._rcImpt.ui, "battle/set/btnSet/lock").setVisible(false);
		WidgetDig(this._rcImpt.ui, "battle/set/btnAchievement/lock").setVisible(false);
		WidgetDig(this._rcImpt.ui, "battle/set/btnRank/lock").setVisible(false);
		WidgetDig(this._rcImpt.ui, "battle/set/btnMail/lock").setVisible(false);

		var new_c = tj.mainData.getClientData("new_c");
		var new_e = tj.mainData.getClientData("new_e");
		var new_a = tj.mainData.getClientData("new_a");
		var new_m = tj.mainData.getClientData("new_m");
		var new_i = tj.mainData.getClientData("new_i");
		var new_l = tj.mainData.getClientData("new_l");
		//var new_t = tj.mainData.getClientData("new_t");
		var new_t = tj.mainData.trophyHaveNew();
		var new_arena = tj.mainData.getClientData("new_arena");
		var arena_reward = tj.mainData.getClientData("arena_reward");
		if (new_c.length > 0 || new_e.length > 0)
			WidgetDig(this._castle, "text/lock").setVisible(true);
		if (new_a.length > 0)
			WidgetDig(this._atelier, "text/lock").setVisible(true);
		if (new_m.length > 0)
			WidgetDig(this._manor, "text/lock").setVisible(true);
		if (new_i.length > 0)
			WidgetDig(this._warehouse, "text/lock").setVisible(true);
		if (new_l.length > 0)
			WidgetDig(this._rcImpt.ui, "battle/set/btnMail/lock").setVisible(true);
		if(new_t)
			WidgetDig(this._rcImpt.ui, "battle/set/btnAchievement/lock").setVisible(true);
		if(new_arena || arena_reward) {
			WidgetDig(this._arena, "text/lock").setVisible(true);
		}

		//月卡
		WidgetDig(this._scroll_max, "btnGemMonth").setVisible(false);
		var month_card = tj.mainData.main.month_card;
		if(month_card && month_card.remain_days > 0 && month_card.get == false)
			WidgetDig(this._scroll_max, "btnGemMonth").setVisible(true);
	},

	lockUI: function (lock) {
		if (WidgetDig(this._castle, "text").isVisible())
			this._castle.setEnabled(!lock);
		if (WidgetDig(this._tavern, "text").isVisible())
			this._tavern.setEnabled(!lock);
		if (WidgetDig(this._battle, "text").isVisible())
			this._battle.setEnabled(!lock);
		if (WidgetDig(this._warehouse, "text").isVisible())
			this._warehouse.setEnabled(!lock);
		if (WidgetDig(this._cemetery, "text").isVisible())
			this._cemetery.setEnabled(!lock);
		if (WidgetDig(this._atelier, "text").isVisible())
			this._atelier.setEnabled(!lock);
		if (WidgetDig(this._manor, "text").isVisible())
			this._manor.setEnabled(!lock);
		if (WidgetDig(this._market, "text").isVisible())
			this._market.setEnabled(!lock);
		WidgetDig(this._rcImpt.ui, "battle/set").setEnabled(!lock);
		WidgetDig(this._rcImpt.ui, "battle/cost/btnPay").setEnabled(!lock);
	},

	refreshHelp: function () {
		if (this._helphand)
			this._helphand.stop();
		WidgetDig(this._rcImpt.ui, "battle/set").setEnabled(true);
		this.lockUI(false);

		//新手（墓地）
		var hc = tj.mainData.getClientData("help_cemetery");
		switch (hc) {
			case 1:
				var deads = tj.mainData.getCetemeryHeros();
				if(deads == 0){
					tj.mainData.setClientData("help_cemetery", 4);
					this.refreshHelp();
					return;
				}

				this.lockUI(true);
				this.load_helphand(this, "slideRight");
				this._helphand.setpos(377, 554);
				note = createNoteBox(this, tj.cfg.get("text/help/gocemetery"), form_t.castleLayer);
				note.setPos(375, 554);
				break;
			case 2:
				var deads = tj.mainData.getCetemeryHeros();
				if(deads == 0){
					tj.mainData.setClientData("help_cemetery", 4);
					this.refreshHelp();
					return;
				}

				this.lockUI(true);
				this._cemetery.setEnabled(true);
				this.load_helphand(this._cemetery, "click");
				this._helphand.setpos(180, 130);
				note = createNoteBox(this, tj.cfg.get("text/help/gocemetery"), form_t.castleLayer);
				note.setPos(375, 554);
				break;
		}

		//tj.mainData.setClientData("help_done", 1);
		//tj.mainData.sendClientData("help_done");
		if(tj.mainData.isHelpDone())
			return;

		//新手（主城阶段）
		var help = tj.mainData.getClientData("help")[1];
		switch (help) {
			case 0:
				this.load_helphand(this._castle, "click");
				this._helphand.setpos(125, 120);
				WidgetDig(this._rcImpt.ui, "battle/set").setEnabled(false);
				var visibleSize = cc.director.getVisibleSize();
				var origin = cc.director.getVisibleOrigin();
				var centerY = origin.x + visibleSize.height / 2;
				var note = createNoteBox(this, tj.cfg.get("text/help/castleIn"), form_t.castleLayer);
				note.setPos(375, centerY + 120);
				break;
			case 1:
				var manorhelp = tj.mainData.getClientData("help")[3];
				if (manorhelp == 6) {
					tj.mainData.setClientDataValue("help", 1, 7);
					break;
				}

				this.lockUI(true);
				this.load_helphand(this, "slideLeft");
				this._helphand.setpos(377, 554);
				note = createNoteBox(this, tj.cfg.get("text/help/slide"), form_t.castleLayer);
				note.setPos(375, 554);
				break;
			case 2:
				manorhelp = tj.mainData.getClientData("help")[3];
				if (manorhelp == 6) {
					tj.mainData.setClientDataValue("help", 1, 7);
					break;
				}

				this.lockUI(true);
				this._manor.setEnabled(true);
				this.load_helphand(this._manor, "click");
				this._helphand.setpos(273, 298);
				note = createNoteBox(this, tj.cfg.get("text/help/gomanor"), form_t.castleLayer);
				note.setPos(375, 554);
				break;
			case 3:
				//酒馆引导 保护
				var pubhelp = tj.mainData.getClientData("help")[4];
				if (pubhelp == 7) {
					tj.mainData.setClientDataValue("help", 1, 7);
					break;
				}

				this.lockUI(true);
				this.load_helphand(this, "slideRight");
				this._helphand.setpos(377, 554);
				note = createNoteBox(this, tj.cfg.get("text/help/gopub"), form_t.castleLayer);
				note.setPos(375, 554);
				break;
			case 4:
				//酒馆引导 保护
				pubhelp = tj.mainData.getClientData("help")[4];
				if (pubhelp == 7) {
					tj.mainData.setClientDataValue("help", 1, 7);
					break;
				}

				this.lockUI(true);
				this._tavern.setEnabled(true);
				this.load_helphand(this._tavern, "click");
				this._helphand.setpos(300, 100);
				break;
			case 5:
				this.lockUI(true);
				note = createNoteBox(this, tj.cfg.get("text/help/end1"), form_t.castleLayer);
				note.setPos(375, 554);
				break;
			case 6:
				this.lockUI(false);
				note = createNoteBox(this, tj.cfg.get("text/help/end2"), form_t.castleLayer);
				note.setPos(375, 554);
				tj.mainData.setClientDataValue("help", 1, 7);
				tj.mainData.setClientData("help_done", 1);
				tj.mainData.sendClientData("help_done");
				break;
		}
	},

	refreshButton: function () {
		this._castle.setEnabled(true);
		this.setContentString(WidgetDig(this._castle, "text/text"), tj.cfg.get("text_on_ui/ut/castle"));

		this._atelier.setEnabled(true);
		WidgetDig(this._atelier, "text").setVisible(true);
		this.setContentString(WidgetDig(this._atelier, "text/text"), tj.cfg.get("text_on_ui/ut/atelier"));
		WidgetDig(this._atelier, "plist").setVisible(true);
		WidgetDig(this._atelier, "black").setVisible(false);

		this._manor.setEnabled(true);
		WidgetDig(this._manor, "text").setVisible(true);
		this.setContentString(WidgetDig(this._manor, "text/text"), tj.cfg.get("text_on_ui/ut/manor"));
		WidgetDig(this._manor, "plist").setVisible(true);
		WidgetDig(this._manor, "an").setVisible(true);
		WidgetDig(this._manor, "black").setVisible(false);

		this._tavern.setEnabled(true);
		WidgetDig(this._tavern, "text").setVisible(true);
		this.setContentString(WidgetDig(this._tavern, "text/text"), tj.cfg.get("text_on_ui/ut/tavern"));
		WidgetDig(this._tavern, "plist").setVisible(true);
		WidgetDig(this._tavern, "black").setVisible(false);

		WidgetDig(this._scroll_max, "FG/black").setVisible(false);
		WidgetDig(this._scroll_fg, "FG/black").setVisible(false);

		this._battle.setEnabled(true);
		WidgetDig(this._battle, "text").setVisible(true);
		this.setContentString(WidgetDig(this._battle, "text/text"), tj.cfg.get("text_on_ui/ut/battle"));
		WidgetDig(this._battle, "plist").setVisible(true);
		WidgetDig(this._battle, "an").setVisible(true);
		WidgetDig(this._battle, "black").setVisible(false);

		this._warehouse.setEnabled(true);
		WidgetDig(this._warehouse, "text").setVisible(true);
		this.setContentString(WidgetDig(this._warehouse, "text/text"), tj.cfg.get("text_on_ui/ut/warehouse"));
		WidgetDig(this._warehouse, "plist").setVisible(true);
		WidgetDig(this._warehouse, "black").setVisible(false);

		this._cemetery.setEnabled(true);
		WidgetDig(this._cemetery, "text").setVisible(true);
		this.setContentString(WidgetDig(this._cemetery, "text/text"), tj.cfg.get("text_on_ui/ut/cemetery"));
		WidgetDig(this._cemetery, "plist").setVisible(true);
		WidgetDig(this._cemetery, "an").setVisible(true);
		WidgetDig(this._cemetery, "black").setVisible(false);

		this._market.setEnabled(true);
		WidgetDig(this._market, "text").setVisible(true);
		this.setContentString(WidgetDig(this._market, "text/text"), tj.cfg.get("text_on_ui/ut/market"));
		//WidgetDig(this._market, "an").setVisible(true);
		WidgetDig(this._market, "black").setVisible(false);

		this._arena.setEnabled(true);
		WidgetDig(this._arena, "text").setVisible(true);
		this.setContentString(WidgetDig(this._arena, "text/text"), tj.cfg.get("text_on_ui/ut/arena"));
		WidgetDig(this._arena, "black").setVisible(false);

		WidgetDig(this._rcImpt.ui, "resources").setVisible(true);
		if (tj.mainData.getAtelier().atelier_lv <= 0) {
			this._atelier.setEnabled(false);
			WidgetDig(this._atelier, "text").setVisible(false);
			WidgetDig(this._atelier, "plist").setVisible(false);
			WidgetDig(this._atelier, "black").setVisible(true);
		}
		if (tj.mainData.main.manor.level <= 0) {
			WidgetDig(this._rcImpt.ui, "resources").setVisible(false);
			this._manor.setEnabled(false);
			WidgetDig(this._manor, "text").setVisible(false);
			WidgetDig(this._manor, "plist").setVisible(false);
			WidgetDig(this._manor, "an").setVisible(false);
			WidgetDig(this._manor, "black").setVisible(true);
		}
		if (tj.mainData.getTavern().tavern_lv <= 0) {
			this._tavern.setEnabled(false);
			WidgetDig(this._tavern, "text").setVisible(false);
			WidgetDig(this._tavern, "plist").setVisible(false);
			WidgetDig(this._tavern, "black").setVisible(true);

			WidgetDig(this._scroll_max, "FG/black").setVisible(true);
			WidgetDig(this._scroll_fg, "FG/black").setVisible(true);
			this._battle.setEnabled(false);
			WidgetDig(this._battle, "text").setVisible(false);
			WidgetDig(this._battle, "plist").setVisible(false);
			WidgetDig(this._battle, "an").setVisible(false);
			WidgetDig(this._battle, "black").setVisible(true);
		}
		if (tj.mainData.main.blv_warehouse <= 0) {
			this._warehouse.setEnabled(false);
			WidgetDig(this._warehouse, "text").setVisible(false);
			WidgetDig(this._warehouse, "plist").setVisible(false);
			WidgetDig(this._warehouse, "black").setVisible(true);
		}
		if (tj.mainData.main.cemetery.blv_cemetery <= 0) {
			this._cemetery.setEnabled(false);
			WidgetDig(this._cemetery, "text").setVisible(false);
			WidgetDig(this._cemetery, "plist").setVisible(false);
			WidgetDig(this._cemetery, "an").setVisible(false);
			WidgetDig(this._cemetery, "black").setVisible(true);
		}
		if (tj.mainData.main.market.blv_market <= 0) {
			this._market.setEnabled(false);
			WidgetDig(this._market, "text").setVisible(false);
			//WidgetDig(this._market, "an").setVisible(false);
			WidgetDig(this._market, "black").setVisible(true);
		}
		if(tj.mainData.main.arena.division<=0) {
			this._arena.setEnabled(false);
			WidgetDig(this._arena, "text").setVisible(false);
			WidgetDig(this._arena, "black").setVisible(true);
		}
	},

	arenaTip: function() {
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

	defaultTouchButton: function (btn, type) {
		if (type == ccui.Widget.TOUCH_BEGAN) {
			this._push_item = btn;
		}
		if (type == ccui.Widget.TOUCH_ENDED) {
			switch (btn.name) {
				case 'Arena': //竞技场
					//var al = new arenaLayer();
					//al.init();
					//this._curr_popLayer = al;
					//this.addChild(al);
					CahceLayerAdd(this, "arena");
					break;
				case 'ready': //竞技场状态按钮
					arenaMsgHelper.cancelMatch();
					break;
				case 'Castle': //城堡
					this._curr_popLayer = createCaltleLayer(this);
					break;
				case 'Atelier': //工坊
					// this._curr_popLayer = createAtelierLayer(this);
					CahceLayerAdd(this, "atelier");
					break;
				case 'Manor': //庄园
					CahceLayerAdd(this, "manor");
					if (this._helphand)
						this._helphand.stop();
					break;
				case 'Market': //市场
					CahceLayerAdd(this, "market");
					// this._curr_popLayer = createMarketLayer(this,0);
					break;
				case 'Tavern': //酒馆
					// this._curr_popLayer = createPubLayer(this);
					CahceLayerAdd(this, "pub");
					break;
				case 'Warehouse': //仓库
					CahceLayerAdd(this, "wareHouse");
					// this._curr_popLayer = createWareHouseLayer(this);
					break;
				case 'Cemetery': //墓地
					this._curr_popLayer = createCemeteryLayer(this);
					break;
				case 'Battle'://出征
					this._curr_popLayer = createTeamLayer(this);
					break;
				case "gem":
				case "btnPay":
					this._curr_popLayer = createGemLayer(this);
					break;
				case "Tree" :
					try{
						if (tj.mainData.main.cutTree.cancut == false) {
							createMainNoticeBox(tj.cfg.get("text/mainScene/cut_reach_max"));
							this._tree.setEnabled(false);
							this.schedule(function(){this._tree.setEnabled(true)}.bind(this), 3);
							break;
						}
						if (tj.cutTree()) {
							tj.audio.playEffect(RES_PATH + tj.cfg.get("soundEffect/chop"), false);
							this._tree_bar.stopAllActions();
							this._tree_bar.setOpacity(150);
							var delay = cc.delayTime(1);
							var action = cc.fadeOut(1);
							this.schedule(function(){this._tree.setEnabled(true)}.bind(this), tj.CUT_INTERVAL/1000);
							var q = cc.sequence(delay, action);
							this._tree_bar.runAction(q);
							this._tree.setEnabled(false);
							this._effectCutTree();
						}
					}catch (e) {
						tj.sendErrLog(e, this.get_scene_name()+" cutTree: "+ e.message, []);
					}
					break;
				case "btn":
					var str = "";
					switch (btn.parent.name) {
						case "food":
							str = tj.cfg.get("text/mainScene/FoodMaxNum");
							break;
						case "wood":
							str = tj.cfg.get("text/mainScene/WoodMaxNum");
							break;
						case "iron":
							str = tj.cfg.get("text/mainScene/IronMaxNum");
							break;
						case "crystal":
							str = tj.cfg.get("text/mainScene/CrystalMaxNum");
							break;
						case "mithril":
							str = tj.cfg.get("text/mainScene/MithrilMaxNum");
							break;
						default:
							break;
					}
					var resData = tj.mainData.getResinfoByName(btn.parent.name);
					if (resData instanceof manorResData) {
						var maxNum = resData.getMax();
						var nowNum = resData.get();
						str = str.format(nowNum.toString(), maxNum.toString());
						this._curr_popLayer = createNoteBox(this, str, form_t.main, null);
						//根据resources的世界坐标设置notebox的位置偏移
						var box = WidgetDig(this._curr_popLayer._ui, "box");
						var resources = WidgetDig(this._rcImpt.ui, "resources");
						var pos = resources.getPosition();
						var tpos = resources.getParent().convertToNodeSpace(pos);
						box.setPosition(cc.p(box.getPosition().x, tpos.y - box.getSize().height - 50));
					}
					break;
				case "btnMail":
					this._curr_popLayer = createMailLayer(this);
					break;
				case "btnAchievement":
					this._curr_popLayer = createTrophyLayer(this);
					//var new_t = tj.mainData.getClientData("new_t");
					//if(new_t.length > 0){
					//	new_t.length = 0;
					//	tj.mainData.sendClientData("new_t");
					//	WidgetDig(this._rcImpt.ui, "battle/set/btnAchievement/lock").setVisible(false);
					//}
					break;
				case "btnSet":
					var settings = new settingLayer();
					settings.init();
					this._curr_popLayer = settings;
					this.addChild(settings);
					break;
				case "btnRank":
					//this.noticetext_add(tj.cfg.get("text/nodone"));
					this._curr_popLayer = createRankingLayer(this);
					break;
				case "btnGemMonth":
					tj.wsconnection.setMsg(msgac["Card_getgem"]);
					break;
			}
		}
	},

	on_touch_Began : function(touch) {
		this._touch_pos = touch.getLocation();
	},

	on_touch_Ended: function (touch) {
		var help = tj.mainData.getClientData("help")[1];
		switch (help) {
			case 5:
				tj.mainData.setClientDataValue("help", 1, 6);
				this.refreshHelp();
				break;
		}

		if (this._push_item === null) {
			return;
		}
		if (Math.abs(touch.getLocation().x - this._touch_pos.x) > 10) {
			this._push_item.setHighlighted(false);
		}
	},

	effectHeroRefreshTime : function(){
		var hKey = "effectHeroRefreshTime";
		var hValue = tj.mainData.getClientData(hKey);
		if(tj.mainData.getTavern().load_refreshed){
			hValue = 1;
			tj.mainData.setClientData(hKey,hValue);
			tj.mainData.sendClientData(hKey);
		}

		if(this._tavernRefreshTime && hValue == 1 && !this._tavernRefreshTime.isEffect) {
			var textTime = this._tavernRefreshTime;
			textTime.setColor(cc.color("#00FF00"));
			textTime.setString(tj.cfg.get("text/newhero"));
			textTime.stopAllActions();
			var ac = cc.repeatForever(cc.sequence(cc.fadeTo(0.5, 30), cc.fadeTo(0.5, 225)));
			textTime.runAction(ac);
			textTime.isEffect = true;
		}
	},

	update: function (delta) {
		this._super();

		// 英雄刷新提示
		var hKey = "effectHeroRefreshTime";
		var hValue = tj.mainData.getClientData(hKey);
		if(hValue != 1) {
			var now = new Date();
			var heroRefreshTime = tj.mainData.next_hero_refreshtime - now;
			if(tj.mainData.getTavern().load_refreshed){
				heroRefreshTime = 0;
			}
			if (heroRefreshTime > 0) {
				if(this._tavernRefreshTime) {
					var textTime = this._tavernRefreshTime;
					if (textTime.isEffect) {
						textTime.isEffect = false;
						textTime.stopAllActions();
						textTime.setOpacity(255);
					}
					if (heroRefreshTime > (59 * 60 + 59) * 1000) {
						heroRefreshTime = (59 * 60 + 59) * 1000;
					}
					var str = tj.gameClock.millisecond2StringAddHours(heroRefreshTime);
					textTime.setString(str.substring(3, str.length));
					textTime.setColor(cc.color("#B2B2B2"));
				}
			} else {
				tj.mainData.setClientData(hKey, 1);
				tj.mainData.sendClientData(hKey);
				this.effectHeroRefreshTime();
			}
		}

		var con = this._scroll_max.getInnerContainer();
		var l = this._scroll_max.getInnerContainerSize().width - cc.director.getWinSize().width;
		var px = con.getPositionX();
		if (this._last_px == 0 && px != 0) {
			var ts = new Date();
			tj._script_chk_ts = ts.getTime();
		}
		this._last_px = px;
		if (l <= 0) {
			return;
		}
		var per = (0-px) / l;
		this._scroll_mg.jumpToPercentHorizontal(per * 100);
		this._scroll_bg.jumpToPercentHorizontal(per * 100);
		this._scroll_fg.jumpToPercentHorizontal(per * 100);

		if (this._tree_time_del > 0) {
			var del = delta * 1000
			this._tree_time_del -= del;
			this._tree_loading.setPercent(this._tree_loading.getPercent() + this._tree_speed * del);
			if (this._tree_time_del <= 0) {
				if (tj.getTreeInfo().c == tj.MAX_CUT_TIME) {
					this._requestCutTree();
				}
			}
		}
	},

	onEnter: function () {
		this._super();
		Main_Layer = this;

		tj.eventAccepter.initScene(this);

		//播放背景音乐
		tj.audio.playMusic(this._bgMusic, true, true);

		//注册监听事件
		tj.wsconnection.addGrp(msgac["Main_refresh_resource"], msgac["Main_refresh_resource"], this.process_ac.bind(this), this.get_scene_name());
		tj.wsconnection.addGrp(msgac["Main_refresh_new"], msgac["Main_refresh_new"], this.process_ac.bind(this), this.get_scene_name());
		tj.wsconnection.addGrp(msgac["Main_refresh_help"], msgac["Main_refresh_button"], this.process_ac.bind(this), this.get_scene_name());
		tj.wsconnection.addGrp(msgac["ManorProduce_notice"], msgac["ManorProduce_notice"], this.process_ac.bind(this), this.get_scene_name());
		tj.wsconnection.addGrp(msgac["MainUI_pay_ver_ret"], msgac["MainUI_pay_ver_ret"], this.process_ac.bind(this), this.get_scene_name());
		tj.wsconnection.addGrp(msgac["Main_Cut_tree"], msgac["Main_Cut_tree"], this.process_ac.bind(this), this.get_scene_name());
		tj.wsconnection.addGrp(msgac["Card_getgem"], msgac["Card_getgem"], this.process_ac.bind(this), this.get_scene_name());
		tj.wsconnection.addGrp(msgac["Main_announce"], msgac["Main_announce"], this.process_ac.bind(this), this.get_scene_name());
		tj.wsconnection.addGrp(msgac["Pop_msg_mainScene"], msgac["Pop_msg_mainScene"], this.process_ac.bind(this), this.get_scene_name());

		//战斗消息
		tj.wsconnection.addGrp(msgac["Fight_info"], msgac["Fight_info"], this.process_ac.bind(this), this.get_scene_name());

		//界面动画
		playUIAnimate(this, "Main/scroll_mg/cloud", true);
		playUIAnimate(this, "Main/scroll_max/Cemetery/an", true);
		playUIAnimate(this, "Main/scroll_max/Battle/an", true);
		playUIAnimate(this, "Main/scroll_max/Manor/an", true);

		// WidgetDig(this._rcImpt.node_scene, "scroll").jumpToPercentHorizontal(50);
		this._scroll_fg.jumpToPercentHorizontal(50);
		this._scroll_mg.jumpToPercentHorizontal(50);
		this._scroll_bg.jumpToPercentHorizontal(50);
		this._scroll_max.jumpToPercentHorizontal(50);
		if (this._curr_popLayer)
			this._curr_popLayer.set_release();

		this.refreshButton();
		this.refresh_resource();
		this.refreshNew();
		this._last_px = this._scroll_max.getInnerContainer().getPositionX();

		//竞技场ui消息
		arenaMsgHelper.registerUIMsg();
		//设置竞技场倒计时层的父节点(需要在refreshNew()之后执行)
		arenaMsgHelper.setParentUI(this);

		// TutorialManager.getInstance()._addDrama({}, this);
		tj.isInMap = false;
		this._effectCutTree();
		this.playTreeAni(false);

		this.effectHeroRefreshTime();

		if(cc.tj.ACTIVE === true)
			LayerCacheMgr.getInstance().deleteLayer("cardhero");
	},

	onExit: function () {
		this._super();

		if(Main_Layer){
			//Main_Layer.release();
			Main_Layer = null;
		}

		cc.log('mainLayer exit.');
	},

	refresh_resource: function () {
		//cc.log("mainScene refresh_resource");
		var resinfos = tj.mainData.getResinfos();
		for (var h in resinfos) {
			var resinfo = resinfos[h];
			var uitext = null;
			var uibar = null;
			switch (resinfo.id) {
				case 1:
				{
					uitext = WidgetDig(this._rcImpt.ui, "resources/food/text");
					uibar = WidgetDig(this._rcImpt.ui, "resources/food/bar");
				}
					break;
				case 2:
				{
					uitext = WidgetDig(this._rcImpt.ui, "resources/wood/text");
					uibar = WidgetDig(this._rcImpt.ui, "resources/wood/bar");
				}
					break;
				case 3:
				{
					uitext = WidgetDig(this._rcImpt.ui, "resources/iron/text");
					uibar = WidgetDig(this._rcImpt.ui, "resources/iron/bar");
				}
					break;
				case 4:
				{
					uitext = WidgetDig(this._rcImpt.ui, "resources/crystal/text");
					uibar = WidgetDig(this._rcImpt.ui, "resources/crystal/bar");
				}
					break;
				case 5:
				{
					uitext = WidgetDig(this._rcImpt.ui, "resources/mithril/text");
					uibar = WidgetDig(this._rcImpt.ui, "resources/mithril/bar");
				}
					break;
			}
			uitext.setString(resinfo.capacity);
			var percent = (resinfo.capacity / resinfo.max_capacity * 100) || 0;
			percent = Math.min(percent, 100);
			uibar.setPercent(percent);
		}

		WidgetDig(this._rcImpt.ui, "battle/cost/gold/text").setString(tj.mainData.getCoinNum());
		WidgetDig(this._rcImpt.ui, "battle/cost/gem/text").setString(tj.mainData.getGemNum());
		//WidgetDig(this._rcImpt.ui, "battle/cost/honor/text").setString(tj.mainData.getItemNum(500));
		WidgetDig(this._rcImpt.ui, "battle/cost/honor").setVisible(false);
	},

	onEnterTransitionDidFinish: function () {
		this._super();

		if(Map_Layer){
			Map_Layer.clear();
			if(!cc.sys.isNative)
				Map_Layer.clear_listen();
		}

		this.refreshHelp();
		if (Main_Layer) {
			var list = [];
			var children = Main_Layer.getChildren();
			for (var child in children) {
				if (children[child]._basename && children[child]._basename == "noticebox") {
					children[child].setVisible(false);
					list.push(children[child]);
				}
			}
			for (var i in list)
				list[i].removeFromParent(true);
		}
	},

	process_ac: function (doc) {
		var msg_id = doc[0];
		var data = doc[1];
		switch (msg_id) {
			case msgac["Main_refresh_resource"]: //游戏初始数据
				this.refresh_resource();
				break;
			case msgac["Main_refresh_help"]:
				this.refreshHelp();
				break;
			case msgac["Main_refresh_button"]:
				this.refreshButton();
				break;
			case msgac["Main_refresh_new"]:
				this.refreshNew();
				break;
			case msgac["Fight_info"]: //发起竞技场战斗或测试战斗
				cc.log("------- Fight: ", doc);
				if(!arenaMsgHelper.isArenaFight()) {
					fightData.fill(data);
					tj.pushScene(new cc.TransitionFade(1, createScene(fightLayer)));
				}else{
					if(data.pvp) {
						arenaMsgHelper.setFightData(data);
					}else{
						cc.log(' --- err: pve after pvp ', data);
					}
				}
				break;
			case msgac["ManorProduce_notice"]:
				if (tj.toplayer === this)
					this.noticetext_add(data);
				break;
			case msgac["MainUI_pay_ver_ret"]:
				var box = createMsgBox2(this,data,function(tag){
                    return true;
                },1);
                box.setMsgHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
				break;
			case msgac["Pop_msg_mainScene"]:
				this.pop_noticemsg(data.msg);
				break;
			case msgac["Main_Cut_tree"]:
				switch(data.ret) {
					case 0:
						var mainres = tj.mainData.getResinfoById(2);
						var str = mainres.text + " +" + data.del;
						mainres.add(data.del);
						if (data.del > 0) {
							createMainNoticeBox(str);
						} else {
							createMainNoticeBox(tj.cfg.get("text/warehouse/resfull").format(mainres.text));
						}
						tj.mainData.main.cutTree.cancut = data.cancut;
						break;
					case 1:
						break;
					case 2:
						createMainNoticeBox(tj.cfg.get("text/mainScene/cut_reach_max"));
						break;
				}
				break;
			case msgac["Card_getgem"]:
				switch (data.ret){
					case 0:
						if(data.items){
							var msg = tj.cfg.get("pay/monthCardDayHint");
							for(var i in data.items){
								var item = data.items[i];
								tj.mainData.setItemNum(item.id, item.sum);
								var itemname = tj.mainData.getItemName(item.id);
								msg = msg + itemname + " +" +  item.del + "\n";
							}
							tj.mainData.main.month_card.get = true;
							var box = createMsgBox2(this,msg,function(tag){
                   			 	return true;
                			},1);
						}
						tj.mainData.main.month_card.get = true;
						this.refreshNew();
						break;
					case 1:
						this.noticetext_add(tj.cfg.get("text/mainScene/card_error1"),true);
						break;
					case 2:
						this.noticetext_add(tj.cfg.get("text/mainScene/card_error2"),true);
						break;
				}
				break;
			case msgac["Main_announce"]:
				var an_t = tj.local.getAnnounceTimes(data.id);
				if(an_t < data.shows){
					var a = createAssetsBox(this, data.s, function(){
						return true;
					},1);
					a.setAnchorPoint(cc.p(0.5,0));
					if (cc.tj.ACTIVE === true) {
						switch (cc.tj.PTYPE) {
							case P_TYPE_WID:
								a.setScale(cc.tj.SCALE);
							break;
						}
					}
					an_t++;
					tj.local.setAnnounceTimes(data.id, an_t);
				}
				break;
			default:
				return 0;
		}
	},

	_effectCutTree : function() {
		var tinfo = tj.getTreeInfo();
		var timedel = tj.CUT_INTERVAL - tinfo.t;
		if (tinfo.c > 0) {
			if (timedel <= 0) {
				//代表已经走完cd，直接设置成当前per
				if (tinfo.c >= tj.MAX_CUT_TIME) {
					this._requestCutTree();
				} else {
					this._tree_loading.setPercent(tinfo.c / tj.MAX_CUT_TIME * 100);
				}
			} else {
				//有cd的话设置成前一个段，并且通知update在剩下cd里走完一个进度
				this._tree.setEnabled(false);
				this._tree_loading.setPercent((tinfo.c - 1) / tj.MAX_CUT_TIME * 100);
				this._tree_time_del = timedel;
				this._tree_speed = (1 / tj.MAX_CUT_TIME) * 100 / timedel;
			}
		} else {
			this._tree_loading.setPercent(0);
		}
	},

	playTreeAni : function(play){
		var o = WidgetDig(this._tree, "an");
		var ac = this._animations["tree_an"];
		if (!ac) {
			ac = o.actionManager.getActionByTag(o.getTag(), o);
			if (ac) {
				this._animations["tree_an"] = ac;
				ac.retain();
			}
		}
		if (play && ac) {
			var duration = ac.getDuration();
			o.stopAllActions();
			ac.gotoFrameAndPlay(0, duration, 0, false);
			o.runAction(ac);
		}
	},

	_requestCutTree : function() {
		this.playTreeAni(true);
		tj.audio.playEffect(RES_PATH + tj.cfg.get("soundEffect/wood"), false);
		this._tree_loading.setPercent(0);
		tj.wsconnection.setMsg(msgac["Main_Cut_tree"], {});
		tj.clearTreeInfo();
	}
});


function CahceLayerAdd(p, name) {
	var layer = LayerCacheMgr.getInstance().getLayer(name);
	if (layer.getParent() !== null) {
		layer.set_release(true);
	}
	p.addChild(layer);
	layer._tjParent = p;
	p._curr_popLayer = layer;
}