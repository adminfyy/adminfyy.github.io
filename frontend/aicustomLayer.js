/**
 * 自定义AI界面
 */
/** @const AI参数个数 */
var AI_MAX_ARGS = 10;
/** @const 可配置技能个数 */
var AI_SKILLS = 3;
/** @const AI参数类型 */
var AI_TYPE = {
	cure_self: 0,
	taunt: 1,
	counter: 2,
	cure: 3,
	targetNum: 4,
	targetNum2: 5,
	singleTarget1: 6,
	singleTarget2: 7,
	singleTarget3: 8,
	target: 9
};
/** @const 技能类型*/
var SKILL_TYPE = {
	taunt: 0,
	attack: 1,
	magic: 2,
	cure: 3,
};
/** @const 技能目标类型 */
var SKILL_TARGET = {
	self: 0,
	enemy_all: 1,
	enemy_single: 2,
	our_all: 3,
	our_single: 4
};
/** @const BUFF类型 */
var BUFF_TYPE = {
	taunt: 2,
	counter: 9
};

var aiCustomLayer = baseLayer.extend({
	_hero: null,
	_ais: [], //ai设定的参数参照, -1表示该选项应该隐藏
	_aisets: [], //ai设定的数值
	_skills: [], //技能按顺序存放的数组

	//constructor
	ctor: function(hero) {
		this._super();
		this._hero = hero;
		this._basename = "aiCustom";
		this._beTop = false;
		this.init();
		this.initData();
	},

	//data process
	setOnAI: function(skill) {
		var type = skill.type;
		var buff = skill.buffId;
		var target = skill.target;
		var id = skill.id;
		switch (type) {
			case SKILL_TYPE.taunt:
				var buff = tj.dbdata.getValueById("status", buff);
				//taunt类型根据buff类型可以分为嘲讽和反击
				if (buff.buffType == BUFF_TYPE.taunt) {
					this._ais[AI_TYPE.taunt] = id;
				}
				if (buff.buffType == BUFF_TYPE.counter) {
					this._ais[AI_TYPE.counter] = id;
				}
				break;
			case SKILL_TYPE.attack:
			case SKILL_TYPE.magic:
				if (target == SKILL_TARGET.enemy_all || target == SKILL_TARGET.our_all) {
					for (var i = AI_TYPE.targetNum; i <= AI_TYPE.targetNum2; i++) {
						if (this._ais[i] == -1) {
							this._ais[i] = id;
							break;
						}
					}
				} else {
					for (var i = AI_TYPE.singleTarget1; i <= AI_TYPE.singleTarget3; i++) {
						if (this._ais[i] == -1) {
							this._ais[i] = id;
							break;
						}
					}
				}
				break;
			case SKILL_TYPE.cure:
				//治疗目标肯定有自己
				this._ais[AI_TYPE.cure_self] = id;
				if (target == SKILL_TARGET.our_all || target == SKILL_TARGET.our_single) {
					//如果可以治疗他人
					this._ais[AI_TYPE.cure] = id;
				}
				break;
			default:
				break;
		}
	},

	initData: function() {
		//复位AI设置参照
		for (var i = 0; i < AI_MAX_ARGS; i++) {
			this._ais[i] = -1;
		}
		//设置的时候按照配置的技能顺序
		var mstr = "Move";
		for (var i = 1; i <= AI_SKILLS; i++) {
			var s = this._hero[mstr + i];
			if (s !== undefined) {
				var skill = tj.dbdata.getValueById("skill", s);
				this.setOnAI(skill);
			}
		}
		if (this._ais[AI_TYPE.singleTarget1] != -1) {
			this._ais[AI_TYPE.target] = 1;
		}
	},

	//ui process
	init: function() {
		if (!this._super())
			return false;

		this._ui = this.load_ui("uiSetAI.json");
		if (!this._ui)
			return false;
		this.addChild(this._ui);

		this._list = WidgetDig(this._ui, "list");
		this._tmpl = WidgetDig(this._ui, "list/template");
		this._tmpl.removeFromParent();
		this.setRetain(this._tmpl, "uitmpl");

		WidgetDig(this._ui, "set/btnClosed/text").setString(tj.cfg.get("text/ai/text_on_close"));

		tj.wsconnection.addGrp(msgac["Hero_ai_set"], msgac["Hero_ai_set"], this.process_ac.bind(this), this.get_scene_name());
	},

	onEnter: function() {
		this._super();
		var idx = 0;
		this._list.removeAllChildren(true);
		for (var i in this._ais) {
			var aitype = parseInt(i);
			var skill = this._ais[aitype];
			if (skill > 0) {
				var s = tj.dbdata.getValueById("skill", skill);
				idx++;
				var t = this._tmpl.clone();
				this._list.addChild(t);
				WidgetDig(t, "num/text").setString(idx);
				var ainame = "";
				var nul = false;
				var skill_text = WidgetDig(t, "skill/text");
				switch (aitype) {
					case AI_TYPE.cure_self:
						ainame = tj.cfg.get("text/ai/cure_self");
						break;
					case AI_TYPE.taunt:
						ainame = tj.cfg.get("text/ai/taunt");
						break;
					case AI_TYPE.counter:
						ainame = tj.cfg.get("text/ai/counter");
						nul = true;
						break;
					case AI_TYPE.cure:
						ainame = tj.cfg.get("text/ai/cure");
						break;
					case AI_TYPE.target:
						nul = true;
						ainame = tj.cfg.get("text/ai/target");
						break;
					default:
						nul = true;
						ainame = s.name;
						break;
				}
				skill_text.setString(ainame);
				if (aitype == AI_TYPE.target) {
					this.setContentString(skill_text, ainame);
					skill_text.setPosition(skill_text.getPosition().x - 70, skill_text.getPosition().y);
				}
				//攻击目标设定去除技能icon
				if (aitype != AI_TYPE.target) {
					WidgetDig(t, "skill/icon").loadTexture(RES_ICON_SKILL_PATH + s.icon, ccui.Widget.PLIST_TEXTURE);
				} else {
					WidgetDig(t, "skill/icon").removeFromParent();
				}
				//设置参数初始值
				var slider = WidgetDig(t, "slider");
				slider.setUserData({
					type: aitype
				});
				this.setAIValue(slider, this._hero.AI[aitype], true);
				//设置slider/bar监听
				var bar = WidgetDig(slider, "bar");
				if (nul) {
					bar.loadProgressBarTexture("ui/Slider_Back.png", ccui.Widget.PLIST_TEXTURE);
				}
				bar.setTouchEnabled(true);
				WidgetDig(slider, "bar").addEventListener(this.sliderEvent, this);
			}
		}
	},
	sliderEvent: function(sender, type) {
		var percent = Math.floor(sender.getPercent());
		var tmpl = sender.getParent();
		switch (type) {
			case ccui.Slider.EVENT_PERCENT_CHANGED:
				this.setAIValue(tmpl, percent, false);
				break;
			default:
				break;
		}
	},
	//设置AI参数的值
	setAIValue: function(obj, value, re) {
		var data = obj.getUserData();
		var aitype = data.type;
		var val = 0;
		var txt = "";
		var argval = value;
		switch (aitype) {
			case AI_TYPE.cure_self:
				val = value;
				if (val <= 0) {
					txt = tj.cfg.get("text/ai/skill_no");
				} else {
					txt = tj.cfg.get("text/ai/cure_self_per").format(val);
				}
				break;
			case AI_TYPE.taunt:
				//表现上为了保持拖动滚动条从左到右为施放从难到易的感觉：
				//嘲讽的进度条的值和参数值需要倒过来显示，所以需要在显示上和参数argval上把值倒过来
				val = value;
				argval = 100 - value;
				if (re) {
					//re为初始化时，此时传入的值为真实设置的参数值，所以要再倒过来一次
					val = 100 - value;
					argval = value;
				}
				if (val >= 100) {
					txt = tj.cfg.get("text/ai/taunt_always");
				} else if (val <= 0) {
					txt = tj.cfg.get("text/ai/skill_no");
				} else {
					txt = tj.cfg.get("text/ai/taunt_per").format(argval);
				}
				break;
			case AI_TYPE.cure:
				val = value;
				if (val == 0) {
					txt = tj.cfg.get("text/ai/skill_no");
				} else {
					txt = tj.cfg.get("text/ai/cure_per").format(val);
				}
				break;
			case AI_TYPE.counter:
				var max = 2;
				var i = Math.floor(value / (100 / max) + 0.5);
				if (re) {
					//re为初始化时，此时的value即为算出后的正确值，需赋值给i
					i = value;
				}
				argval = i;
				val = i * 100 / max;
				if (i == 0) {
					txt = tj.cfg.get("text/ai/skill_no");
				}
				if (i == 1) {
					txt = tj.cfg.get("text/ai/skill_sometime");
				}
				if (i == 2) {
					txt = tj.cfg.get("text/ai/counter_always");
				}
				break;
			case AI_TYPE.targetNum:
			case AI_TYPE.targetNum2:
				//表现上为了保持拖动滚动条从左到右为施放从难到易的感觉：
				//嘲讽的进度条的值和参数值需要倒过来显示，所以需要在显示上和参数argval上把值倒过来
				var max = 5;
				var i = Math.floor(value / (100 / max) + 0.5);
				argval = max - i;
				if (re) {
					//re为初始化时，此时传入的值为真实设置的参数值，所以要再倒过来一次
					i = max - value;
					argval = value;
				}
				val = i * 100 / max;
				if (i == max) {
					txt = tj.cfg.get("text/ai/skill_always");
				} else if (i == 0) {
					txt = tj.cfg.get("text/ai/skill_no");
				} else {
					txt = tj.cfg.get("text/ai/targetNum").format(argval + 1);
				}
				break;

			case AI_TYPE.singleTarget1:
			case AI_TYPE.singleTarget2:
			case AI_TYPE.singleTarget3:
				var max = 2;
				var i = Math.floor(value / (100 / max) + 0.5);
				if (re) {
					i = value;
				}
				argval = i;
				val = i * 100 / max;
				if (i == 0) {
					txt = tj.cfg.get("text/ai/skill_no");
				}
				if (i == 1) {
					txt = tj.cfg.get("text/ai/skill_frequently");
				}
				if (i == 2) {
					txt = tj.cfg.get("text/ai/skill_always");
				}
				var tmpls = this._list.getChildren();
				if (i != 0) {
					//如果某个单体技能变化时，会引起其他单体技能的改变
					//->经常施放  -- 如果有始终施放的技能，则变成经常施放
					//->始终施放  -- 其余全变成从不施放
					//->从不施放  -- 不影响
					for (var j in tmpls) {
						var o = tmpls[j];
						var d = WidgetDig(o, "slider");
						if (d) {
							var t = d.getUserData().type;
							if (t >= AI_TYPE.singleTarget1 && t <= AI_TYPE.singleTarget3 && AI_TYPE != aitype) {
								var bar = WidgetDig(d, "bar");
								if (i == 1 && bar.getPercent() > (100 / max)) {
									bar.setPercent(50);
									WidgetDig(d, "text").setString(tj.cfg.get("text/ai/skill_frequently"));
									d.setUserData({
										type: t,
										val: 1
									});
								}
								if (i == 2) {
									bar.setPercent(0);
									WidgetDig(d, "text").setString(tj.cfg.get("text/ai/skill_no"));
									d.setUserData({
										type: t,
										val: 0
									});
								}
							}
						}
					}
				}
				break;
			case AI_TYPE.target:
				//玩家不开放第二个选项（抗性护甲最低）
				var max = 1;
				var i = Math.floor(value / (100 / max) + 0.5);
				if (re) {
					i = value;
				}
				//不允许有第二个选项存在，强制跳过
				if (i == 1) {
					i = 2
				}
				argval = i;
				val = i * 100 / max;
				if (i == 0) {
					txt = tj.cfg.get("text/ai/attack_hp");
				}
				if (i == 2) {
					txt = tj.cfg.get("text/ai/attack_any");
				}
				break;
		}
		WidgetDig(obj, "bar").setPercent(val);
		WidgetDig(obj, "text").setString(txt);
		obj.setUserData({
			type: aitype,
			val: argval
		});
	},

	process_ac : function(doc) {
		var msg_id = doc[0];
        var data = doc[1];
        switch(msg_id){
        	case msgac["Hero_ai_set"]:
        	this._send = false;
        	if (data.ret == 0) {
        		this._hero.AI = this._aisets;
        		this.set_release();
        	} else {
        		this.noticetext_add(tj.cfg.get("text/ai/set_error"));
        	}
        	break;
        }
	},

	defaultTouchButton: function(btn, type) {
		if (type == ccui.Widget.TOUCH_ENDED) {
			switch (btn.getName()) {
				case "btnClosed":
					if (this._send) {
						break;
					}
					this._aisets = this._hero.AI.concat();
					var childs = this._list.getChildren();
					for (var i in childs) {
						var o = childs[i];
						var data = WidgetDig(o, "slider").getUserData();
						this._aisets[data.type] = data.val;
					}
					//转成字符串判断数组内容是否相等
					if (this._aisets.toString() != this._hero.AI.toString()) {
						tj.wsconnection.setMsg(msgac["Hero_ai_set"], {
							id : parseInt(this._hero.Id),
							ai : this._aisets
						});
						this._send = true;
					} else {
						this.set_release();
					}
					break;
				case "template":
					var data = WidgetDig(btn, "slider").getUserData();
					if (data.type == AI_TYPE.target) {
						break;
					}
					var skill = this._ais[data.type];
					var str = tj.mainData.getSkillIntro(skill, this._hero.SelfAttr, this._hero.EquipAttr);
                    this._curr_popLayer = createSkillNoteBox(this, str, function(){});
					break;
			}
		}
	}
});