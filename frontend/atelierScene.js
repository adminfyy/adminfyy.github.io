/**
 * 工坊界面
 * created by fudq
 * date: 2015/11/03
 * 
 */

var atelierLayer = baseLayer.extend({
	_ui:0,
	_p:null,
	_current_select_type:0,
	_Lv:0,
	_template:null,
	_showList:[],
	_blueprintList:[],

	ctor:function(){
		this._super();
		this.init();
		this._basename = "atelier";
	},

	init:function(parent){
		this._ui = 0;
		this._p = parent;
		this._current_select_type=0;
		this._Lv=0;
		this._template=null;

		if (!this._super())
			return false;

		this._ui = this.load_ui("uiAtelier.json");
		if (!this._ui)
			return false;

		this.addChild(this._ui);

		this.initScene();

		return true;
	},

	refreshLv:function(){
		// 初始化界面信息
		this._Lv = tj.mainData.getAtelier().atelier_lv;
		this._Lv = this._Lv==0?1:this._Lv;
		var _Lv = WidgetDig(this._ui,"title/textLevel");
		_Lv.setString(tj.cfg.get("text_on_ui/Lv") + this._Lv);
	},

	onEnter : function(){
		this._super();

		this.refreshLv();
		this.refresh_forge();
		this.setBtnState();
		this.refreshBlueprint();
		this.refreshBtnNew();
		tj.wsconnection.addGrp(msgac["Atelier_upgrade"], msgac["Atelier_upgrade"], this.process_ac.bind(this), this.get_scene_name());
		tj.wsconnection.addGrp(msgac["Atelier_refresh"], msgac["Atelier_refresh_forge"], this.process_ac.bind(this), this.get_scene_name());
	},

	onExit : function(){
		this._super();
		this._ui_list.removeAllChildren(true);
		this._showList = [];
		if( tj.mainData.getClientData("new_a").length > 0){
			tj.mainData.clientDataClear("new_a");
			tj.wsconnection.pushmsg(msgac["Main_refresh_new"]);
		}
	},

	initScene:function(){
		//去掉按钮
		var btnRight = WidgetDig(this._ui, "title/btnRight");
		if(btnRight)
			btnRight.removeFromParent(true);

		var btnLeft = WidgetDig(this._ui, "title/btnLeft");
		if(btnLeft)
			btnLeft.removeFromParent(true);

		this._ui_list = WidgetDig(this._ui,"main/list");
		this._template = WidgetDig(this._ui,"main/list/template");
		this.setRetain(this._template, "uitmpl");
		this.setRetain(this._ui_list, "uitmpl");
		this._ui_list.removeAllChildren(true);

		this.setContentString(WidgetDig(this._ui,"set/btnUpgrade/text"), tj.cfg.get("text_on_ui/atelier/atelier_upgrade"));
		this.setContentString(WidgetDig(this._ui,"set/btnClosed/text"), tj.cfg.get("text_on_ui/close"));

		this.setContentString(WidgetDig(this._ui,"main/class/btnBase/text"), tj.cfg.get("text_on_ui/atelier/btnBase"));
		this.setContentString(WidgetDig(this._ui,"main/class/btnWeapon/text"), tj.cfg.get("text_on_ui/atelier/btnWeapon"));
		this.setContentString(WidgetDig(this._ui,"main/class/btnArmour/text"), tj.cfg.get("text_on_ui/atelier/btnArmour"));
		this.setContentString(WidgetDig(this._ui,"main/class/btnAccessory/text"), tj.cfg.get("text_on_ui/atelier/btnAccessory"));
		this.setContentString(WidgetDig(this._ui,"main/class/btnRune/text"), tj.cfg.get("text_on_ui/atelier/btnRune"));

		WidgetDig(this._ui,"title").setTouchEnabled(false);
		WidgetDig(this._ui,"main/proficiency").addTouchEventListener(function(object, type){
			this._curr_popLayer = createNoteBox(this, tj.mainData.getAtelierForgeInfo(), form_t.tips);
		},this);
	},

	extend:function(o,n,override){
		for(var p in n){
			if(n.hasOwnProperty(p) && (!o.hasOwnProperty(p) || override))
				o[p]=n[p];
		}
		return o;
	},

	//数组合并并去重
	mergeArray :function (arr1, arr2) {
		var _arr = [];
		for (var i = 0; i < arr1.length; i++) {
			_arr.push(arr1[i]);
		}
		var _dup;
		for (var i = 0; i < arr2.length; i++){
			_dup = false;
			for (var _i = 0; _i < arr1.length; _i++){
				if (arr2[i] === arr1[_i]){
					_dup = true;
					break;
				}
			}
			if (!_dup){
				_arr.push(arr2[i]);
			}
		}
		return _arr;
	},

	refreshBlueprint:function(){
		//数组合并并去重
		this._blueprintList = [];
		WidgetDig(this._ui, "main/textEmpty").setVisible(false);
		var unLockList = this.mergeArray(this.getunLockList(), tj.mainData.unLockBlueprintList);
		if(unLockList.length == 0){
			WidgetDig(this._ui, "main/textEmpty").setVisible(true);
			return;
		}

		for(var i = 0; i < unLockList.length; i++) {
			var unlockid = unLockList[i];
			var listinfo = this.getinfoById(unlockid);
			this._blueprintList.push(listinfo)
			//武器按类型排序
			listinfo.weaponType = 0;
			if(listinfo.getType != 3)
				continue;
			var itemID = listinfo["val"];
			var row = tj.dbdata.getbysql("equipattribute",  "where (groupId == '" + itemID +"')")[0];
			if(row){
				listinfo.weaponType = row.type;
			}
		}
		this.showItem(true);
	},

	refreshBtnNew:function(){
		WidgetDig(this._ui, "main/class/btnBase/lock").setVisible(false);
		WidgetDig(this._ui, "main/class/btnWeapon/lock").setVisible(false);
		WidgetDig(this._ui, "main/class/btnArmour/lock").setVisible(false);
		WidgetDig(this._ui, "main/class/btnAccessory/lock").setVisible(false);
		WidgetDig(this._ui, "main/class/btnRune/lock").setVisible(false);

		var new_a = tj.mainData.getClientData("new_a");
		var unLockList = this.mergeArray(this.getunLockList(), tj.mainData.unLockBlueprintList);
		for( var i in new_a) {
			var id = new_a[i];
			var listinfo = this.getinfoById(id);

			//检查解锁蓝图表中是否有这个new
			var have = false;
			for(var j in unLockList){
				var unlockid = unLockList[j];
				if(unlockid == id){
					have = true;
					break;
				}
			}

			if (listinfo !== null && have) {
				switch (listinfo.getType){ //1.道具 2.符文 3.武器  4.护甲	5.饰品
				case 1:
					WidgetDig(this._ui, "main/class/btnBase/lock").setVisible(true);
					break;
				case 2:
					WidgetDig(this._ui, "main/class/btnRune/lock").setVisible(true);
					break;
				case 3:
					WidgetDig(this._ui, "main/class/btnWeapon/lock").setVisible(true);
					break;
				case 4:
					WidgetDig(this._ui, "main/class/btnArmour/lock").setVisible(true);
					break;
				case 5:
					WidgetDig(this._ui, "main/class/btnAccessory/lock").setVisible(true);
					break;
				}
			} else {
				tj.mainData.removeClientData("new_a", id);
				tj.wsconnection.pushmsg(msgac["Main_refresh_new"]);
			}
		}
	},

	refresh_forge:function(){
		var forge_lv = tj.mainData.getAtelier().forge_skill_lv;
		var forge_lv_exp = tj.mainData.getAtelier().forge_lv_exp;
		if(forge_lv != undefined && forge_lv_exp != undefined){
			var row = tj.dbdata.getbysql("forgeskillexp",  "where (lv == '" + forge_lv +"')")[0];
			var percent = 0;
			if(row.exp > 0)
				percent = Math.min(forge_lv_exp/row.exp * 100, 100);
			WidgetDig(this._ui,"main/proficiency/bar").setPercent(percent);
			this.setContentString(WidgetDig(this._ui,"main/proficiency/text"), tj.cfg.get("text_on_ui/atelier/forgeLv").format(forge_lv));
		}
	},

	showItem: function (beForce) {
		//先清除信息；
		if(beForce){
			this._ui_list.removeAllChildren(true);
			this._showList = [];
		}

		var blocks = [];
		if (tj.mainData.getAtelier().hasOwnProperty("blocks")) {
			blocks = tj.mainData.getAtelier().blocks;
		}

		if(this._current_select_type == 3){
			this._blueprintList.sort(function(a,b){
				if(a.weaponType == b.weaponType){
					return a.blueprintLv < b.blueprintLv;
				}
				return a.weaponType > b.weaponType;
			});
		}else{
			this._blueprintList.sort(function (a, b) {
				if(a.blueprintLv == b.blueprintLv)
					return a.id > b.id;
				return a.blueprintLv < b.blueprintLv;
			});
		}

		for(i = 0; i < this._blueprintList.length; i++){
			var listinfo =  this._blueprintList[i];
			var unlockid = listinfo.id;
			if (listinfo == null){
				cc.log("atelierScene item = null!");
				continue;
			}
			var forgeOnce = listinfo["forgeOneTime"];
			var getType = listinfo["getType"];
			if(forgeOnce == 1){
				if (blocks.indexOf(unlockid) >= 0) {
					continue;
				}
			}
			if(this._current_select_type != 0 && this._current_select_type != getType)
				continue;

			var v_muban = this.getMuban(unlockid);
			if(!v_muban){
				v_muban = this._template.clone();
				if(!v_muban)
					continue;
				v_muban.setVisible(true);
				v_muban.unlockid = unlockid;
				this._ui_list.pushBackCustomItem(v_muban);
				this._showList.push(v_muban);

			}

			var textName = WidgetDig(v_muban,"btnMain/text/textName");
			var text1 = WidgetDig(v_muban,"btnMain/text/textExplain");
			var btnMain = WidgetDig(v_muban,"btnMain");
			var uiIcon = WidgetDig(v_muban,"btnMain/portraits/icon");
			var uiLock = WidgetDig(v_muban,"lock");
			uiLock.setVisible(false);
			btnMain.isnew = tj.mainData.clientDataHave("new_a", unlockid);
			if(btnMain.isnew)
				uiLock.setVisible(true);
			var size =  WidgetDig(this._template, "btnMain").getContentSize();
			btnMain.setContentSize(size);
			var btnUpgrade = WidgetDig(v_muban,"btnUpgrade");
			size =  WidgetDig(this._template, "btnUpgrade").getContentSize();
			btnUpgrade.setContentSize(size);
			btnUpgrade.setVisible(false);

			btnMain.setTag(unlockid);  //给按钮设置解锁的蓝图ID

			textName.setString(listinfo["name"]);
			text1.setString(listinfo["info"]);
			text1.setColor(cc.color(155, 205, 225, 255));
			text1.setScale(0.95);

			var frameIcon = "ui/icon/iconLevel" + listinfo["blueprintLv"] + ".png";
			WidgetDig(v_muban, "btnMain/portraits/level").loadTexture(frameIcon, ccui.Widget.PLIST_TEXTURE);
			WidgetDig(v_muban, "btnMain/portraits/star").setVisible(false);

			var icon = RES_ICON_PROP_PATH + listinfo["icon"];
			var frame = cc.spriteFrameCache.getSpriteFrame(icon);
			if(frame)
				uiIcon.loadTexture(icon, ccui.Widget.PLIST_TEXTURE);
			else{
				icon = RES_ICON_EQUIP_PATH + listinfo["icon"];
				uiIcon.loadTexture(icon, ccui.Widget.PLIST_TEXTURE);
			}
		}
	},

	getMuban:function(unlockid){
		for(var i in this._showList){
			var muban = this._showList[i];
			if(muban.unlockid == unlockid)
				return muban;
		}
		return null;
	},


	getinfoById: function (Itemid) {
		for(var i = 0 ; i< tj.dbdata._all["blueprint"].length; i ++) {
			var id = tj.dbdata._all["blueprint"][i]["id"];
			if(id == Itemid)
				return tj.dbdata._all["blueprint"][i];
		}
		return null;
	},
	getItemInfoById: function (Itemid) {
		for(var i = 0 ; i< tj.dbdata._all["item"].length; i ++) {
			var id = tj.dbdata._all["item"][i]["id"];
			if(id == Itemid)
				return tj.dbdata._all["item"][i];
		}
		return null;
	},
	getunLockList: function () {
		var tempList = [];
		for(var i = 1; i <= this._Lv; i++){
			var unlockList = tj.dbdata._all["workshop"][i-1]["unlock"];
			unlockList = unlockList.split(",");
			for(var j = 0; j <unlockList.length;j++ ){
				tempList.push(parseInt(unlockList[j]))
			}
		}
		return tempList;
	},
	getUnlockListByLv: function (lv) {
		var maxLv = tj.dbdata._all["workshop"].length;
		if(lv > maxLv)
			return null;

		var unlockList = tj.dbdata._all["workshop"][lv]["unlock"];
		unlockList = unlockList.split(",");
		return unlockList;
	},

	defaultTouchButton : function(btn, type) {
		if (type == ccui.Widget.TOUCH_ENDED) {
			switch (btn.getName()){
				case "btnClosed":
					this.set_release();

					break;
				case "btnUpgrade":
					var lv = this._Lv + 1;
					var row = tj.dbdata.getbysql("workshop",  "where (lv == '" + lv +"')")[0];
					if (row === undefined) {
						this.noticetext_add(tj.cfg.get("text/toplevel"));	
						break;
					}
					var resName = tj.dbdata.getValueById("resproduce", row["cost1"], "name");
					var res_id = row["cost1"];
					var need_num = row["val1"];
					var unlockListNextLv = this.getUnlockListByLv(this._Lv);
					var str = " ";
					for (var i in unlockListNextLv){
						var info = this.getinfoById(unlockListNextLv[i]);
						if(info == null)
							continue;
						str = str + info["name"] + "  ";
					}
					var that = this;
					var result_text = tj.cfg.get("text/atelier/atelierNextLv").format(str);
					var jewelRate = tj.dbdata.getValueById("resproduce", res_id, "gemRate"); //宝石兑换资源的比例
					var ul = new upgradeLayer(function () {
						return upgradeLayer.buildData(res_id, need_num, result_text);
					}, function (v) {
						cc.log('upgradeLayer return:', typeof(v), v);
						switch (v) {
							case 0: //升级
								tj.wsconnection.setMsg(msgac["Atelier_upgrade"], {gem:0});
								return false;
							case 1: //使用宝石
								var gl = new useGemLayer(function () {
									return useGemLayer.buildData(res_id, need_num, jewelRate);
								}, function (v) {
									cc.log("useGemLayer return:", typeof(v), v);
									switch (v) {
										case 0: //全额宝石
											tj.wsconnection.setMsg(msgac["Atelier_upgrade"], {gem:2});
											break;
										case 1: //宝石补齐
											tj.wsconnection.setMsg(msgac["Atelier_upgrade"], {gem:1});
											break;
										default:
											break;
									}
								});
								that.addChild(gl);
								//gl._tjParent = that;
								return false;
							default:
								return true;
						}
					});
					that.addChild(ul);
					ul._tjParent = that;
					this._curr_popLayer = ul;
					break;
				case "btnMain":
					createAtelierForgeLayer(this, btn.getTag());
					if(btn.isnew){
						tj.mainData.removeClientData("new_a", btn.getTag());
						tj.wsconnection.pushmsg(msgac["Main_refresh_new"]);
						WidgetDig(btn.parent, "lock").setVisible(false);
						btn.isnew = false;
						this.refreshBtnNew();
					}
					break;
				case "btnBase":
					if(this._current_select_type == 1)
						this._current_select_type = 0;
					else
						this._current_select_type = 1;
					this.setBtnState();
					this.showItem(true);
					break;
				case "btnWeapon":
					if(this._current_select_type == 3)
						this._current_select_type = 0;
					else
						this._current_select_type = 3;
					this.setBtnState();
					this.showItem(true);
					break;
				case "btnArmour":
					if(this._current_select_type == 4)
						this._current_select_type = 0;
					else
						this._current_select_type = 4;
					this.setBtnState();
					this.showItem(true);
					break;
				case "btnAccessory":
					if(this._current_select_type == 5)
						this._current_select_type = 0;
					else
						this._current_select_type = 5;
					this.setBtnState();
					this.showItem(true);
					break;
				case "btnRune":
					if(this._current_select_type == 2)
						this._current_select_type = 0;
					else
						this._current_select_type = 2;
					this.setBtnState();
					this.showItem(true);
					break;
				case "btnRecast":  // 装备重铸
					createRecastLayer(this);
					break;
				default:
					break;
			}
		}
	},

	setBtnState: function () {
		var btnBase = WidgetDig(this._ui,"main/class/btnBase");
		var btnWeapon = WidgetDig(this._ui,"main/class/btnWeapon");
		var btnArmour = WidgetDig(this._ui,"main/class/btnArmour");
		var btnAccessory = WidgetDig(this._ui,"main/class/btnAccessory");
		var btnRune = WidgetDig(this._ui,"main/class/btnRune");
		switch(this._current_select_type) {
			case 0:
				btnBase.setHighlighted(false);
				btnWeapon.setHighlighted(false);
				btnArmour.setHighlighted(false);
				btnAccessory.setHighlighted(false);
				btnRune.setHighlighted(false);
				break;
			case 1:
				btnBase.setHighlighted(true);
				btnWeapon.setHighlighted(false);
				btnArmour.setHighlighted(false);
				btnAccessory.setHighlighted(false);
				btnRune.setHighlighted(false);
				break;
			case 3:
				btnBase.setHighlighted(false);
				btnWeapon.setHighlighted(true);
				btnArmour.setHighlighted(false);
				btnAccessory.setHighlighted(false);
				btnRune.setHighlighted(false);
				break;
			case 4:
				btnBase.setHighlighted(false);
				btnWeapon.setHighlighted(false);
				btnArmour.setHighlighted(true);
				btnAccessory.setHighlighted(false);
				btnRune.setHighlighted(false);
				break;
			case 5:
				btnBase.setHighlighted(false);
				btnWeapon.setHighlighted(false);
				btnArmour.setHighlighted(false);
				btnAccessory.setHighlighted(true);
				btnRune.setHighlighted(false);
				break;
			case 2:
				btnBase.setHighlighted(false);
				btnWeapon.setHighlighted(false);
				btnArmour.setHighlighted(false);
				btnAccessory.setHighlighted(false);
				btnRune.setHighlighted(true);
				break;
			default :
				break;
		}
	},
	
	lvUpCallback: function (lv) {
		this._Lv = lv;
		tj.mainData.getAtelier().atelier_lv = lv;
		var _Lv = WidgetDig(this._ui,"title/textLevel");
		_Lv.setString(tj.cfg.get("text_on_ui/Lv") + this._Lv);
		this._current_select_type = 0;
		this.refreshBlueprint();
		this.refreshBtnNew();
		this.setBtnState();
	},

	process_ac : function(doc) {
		var msg_id = doc[0];
		var data = doc[1];
		switch (msg_id) {
			case msgac["Atelier_upgrade"]:
				var rdata = data.data;
				var ret = data.ret;
				switch(ret)
				{
					case 0:
						if(this._curr_popLayer)
							this._curr_popLayer.set_release();
						if(rdata.resources){
							for (var  i in rdata.resources) {
								var res = rdata.resources[i];
								var mainres = tj.mainData.getResinfoById(parseInt(i));
								if(mainres)
									mainres.set(res.left);
							}
						}
						if(rdata.gemcost){
							if(rdata.gemcost.left)
								tj.mainData.setGemNum(rdata.gemcost.left);
						}
						var unlockListNextLv = this.getUnlockListByLv(this._Lv);
						var str = " ";
						for (var i in unlockListNextLv){
							var id = parseInt(unlockListNextLv[i]);
							var info = this.getinfoById(id);
							if(info == null)
								continue;
							str = str + info["name"] + " ";
							tj.mainData.addClientData("new_a", id);
						}
						tj.wsconnection.pushmsg(msgac["Main_refresh_new"]);
						createMainNoticeBox(tj.cfg.get("text/atelier/atelierSuccess").format(rdata.lv.toString()));
						createMainNoticeBox(tj.cfg.get("text/atelier/gotBlueprint").format(str));
						this.lvUpCallback(rdata.lv);
						return;
						break;
					case 1:
						this.noticetext_add(tj.cfg.get("text/lessfood"));
						break;
					case 2:
						this.noticetext_add(tj.cfg.get("text/lesswood"));
						break;
					case 3:
						this.noticetext_add(tj.cfg.get("text/lessiron"));
						break;
					case 4:
						this.noticetext_add(tj.cfg.get("text/notdiamond"));
						break;
					case 5:
						this.noticetext_add(tj.cfg.get("text/lessmithril"));
						break;
					case 10:
						this.noticetext_add(tj.cfg.get("text/notgold"));
						break;
					case 11:
						this.noticetext_add(tj.cfg.get("text/notdiamond"));
						break;
					case 100:
						this.noticetext_add(tj.cfg.get("text/toplevel"));
						break;
				}
				break;
			case msgac["Atelier_refresh"]:
				var del_id = data;
				var mu = this.getMuban(del_id);
				if(mu){
					this._ui_list.removeChild(mu);
				}
				this.refreshBlueprint();
				this.refreshBtnNew();
				break;
			case msgac["Atelier_refresh_forge"]:
				this.refresh_forge();
				break;
			default :
				return 0;
		}
	}
});

createAtelierLayer = function(parent){
	var pRet = new atelierLayer();
	if (pRet && pRet.init(parent)){
		var z = -1;
		var childs = parent.getChildren();
		for(var i = 0; i < childs.length; ++i){
			if (childs[i].getLocalZOrder() > z)
				z = childs[i].getLocalZOrder();
		}
		pRet.setLocalZOrder(z + 1);
		parent.addChild(pRet);
		pRet._tjParent = parent;
		return pRet;
	} else if (pRet)
		delete pRet;
	return null;
};
