/**
 * Layer切换特效
 * 从该类继承的Layer可以支持切换特效
 */


cc.TRANSITION_LAYER_IN = 0;
cc.TRANSITION_LAYER_OUT = 1;

cc.TransitionLayer = cc.Layer.extend( /** @lends cc.TransitionLayer# */ {
	_way: -1,
	_L: "left",
	_R: "right",
	_B: "bottom",
	_T: "top",
	_trans_callback: null,

	/**
	 * [场景进入]
	 * @param  {string} title [要执行的效果名称]
	 * @param  {int} t     [时间间隔 秒数]
	 * @param  {obj} args  [附加的参数对象]
	 */
	transIn: function (title, t, args) {
		this._way = cc.TRANSITION_LAYER_IN;
		this._trans(title, t, args);
	},

	/**
	 * [场景退出]
	 * @param  {string} title [要执行的效果名称]
	 * @param  {int} t     [时间间隔 秒数]
	 * @param  {obj} args  [附加的参数对象]
	 */
	transOut: function (title, t, args, callback) {
		this._way = cc.TRANSITION_LAYER_OUT;
		this._trans_callback = callback;
		this._trans(title, t, args);
	},

	/**
	 * [场景进入之后的回调，默认为激活事件响应]
	 * @param  {[cc.layer]} self [description]
	 */
	transInFin: function (self) {
		cc.eventManager.setEnabled(true);
		// cc.log("CC.TRANSITION trans in finish");
	},

	/**
	 * [场景退出之后的回调，默认为激活事件响应，将自身移出父节点，初始化状态等]
	 * @param  {[cc.layer]} self [description]
	 */
	transOutFin: function (self) {
		cc.eventManager.setEnabled(true);
		// cc.log("CC.TRANSITION trans out finish");
		self.attr({
			scale: 1,
			x: 0,
			y: 0,
			anchorX: 0.5,
			anchorY: 0.5,
			rotation: 0.0
		});

		if (cc._renderType === cc.game.RENDER_TYPE_WEBGL) {
			self.getCamera().restore();
		}
		if (this._trans_callback) {
			this._trans_callback();
			this._trans_callback = null;
		}
		// self.removeFromParent(true)
	},

	//私有方法
	//根据传入的值调用响应方法
	_trans: function (title, t, args) {
		if (this["_Transition" + title]) {
			return this["_Transition" + title].apply(this, [t, args]);
		} else {
			if (this._way == cc.TRANSITION_LAYER_OUT) {
				this.transOutFin(this);
			} else {
				this.transInFin();
			}
		}
	},

	//让layer自身执行动作的函数
	_runActions: function (actions) {
		cc.eventManager.setEnabled(false);
		var callback = this.transInFin;
		if (this._way == cc.TRANSITION_LAYER_OUT) {
			callback = this.transOutFin;
		}
		this.runAction(cc.sequence(actions, cc.callFunc(callback, this)));
	},

	//将action包装ease函数
	_easeWithAction: function (action, ease) {
		if (ease === undefined) {
			return action
		}
		var prex = "Ease";
		if (cc[prex + ease] !== undefined) {
			// cc.log("CC.TransitionLayer ease.");
			return new cc[prex + ease](action);
		}
		return action
	},

	//动作集合:
	//title传入:{
	//			"RotoZoom",
	//			"JumpZoom",
	//			"Move":,
	//			"Slide",
	//			"ShrinkGrow",
	//			"Fade",
	//			"Flip",
	//			"GridTrans"
	//	}
	//参数根据每个动作不同传入不同。


	/**
	 * [旋转缩放进入]
	 */
	_TransitionRotoZoom: function (t) {
		var scale = 0.001;
		var scaleby = 1000;
		if (this._way == cc.TRANSITION_LAYER_OUT) {
			scale = 1;
			scaleby = 0.001;
		}
		this.attr({
			scale: scale,
			visivle: true,
			anchorX: 0.5,
			anchorY: 0.5
		});
		var rotoZoom = cc.sequence(
			cc.spawn(cc.scaleBy(t, scaleby),
				cc.rotateBy(t, 360 * 2))
		);
		this._runActions(rotoZoom);
	},

	/**
	 * [跳跃进入]
	 */
	_TransitionJumpZoom: function (t) {
		var scale = 0.5;
		var scaleTo = 1.0;
		var winSize = parseInt(cc.director.getWinSize().width);
		var px = -winSize / 2;
		if (this._way == cc.TRANSITION_LAYER_OUT) {
			scale = 1;
			scaleTo = 0.5;
			px = 0;
		}
		this.attr({
			scale: scale,
			x: px,
			y: 0
		})
		var jump = cc.jumpBy(t, cc.p(winSize / 2, 0), winSize / 4, 2);
		var scale = cc.scaleTo(t, scaleTo);
		var jumpZoom = cc.spawn(jump, scale);

		this._runActions(jumpZoom)
	},

	/**
	 * [移动进入]
	 * 参数可有dir:"top","bottom","left","right".代表方向
	 * 		   ease:ease函数的名称,如"BackIn".
	 */
	_TransitionMove: function (t, args) {
		var a_dir, a_ease, a_action;
		var dir = this._L;
		if (args !== undefined) {
			a_dir = args["dir"];
			a_ease = args["ease"];
		}
		if (a_dir !== undefined) {
			dir = a_dir;
		}
		var winSize = cc.director.getWinSize();
		var posx = 0;
		var posy = 0;
		var end = cc.p(0, 0);
		switch (dir) {
			case this._T:
				posy = -winSize.height;
				break;
			case this._B:
				posy = winSize.height;
				break;
			case this._R:
				posx = -winSize.width;
				break;
			case this._L:
				posx = winSize.width;
				break;
		}
		if (this._way == cc.TRANSITION_LAYER_OUT) {
			end = cc.p(-posx, -posy);
			posx = 0;
			posy = 0;
		}

		this.attr({
			scale: 1.0,
			x: posx,
			y: posy,
			anchorX: 0.5,
			anchorY: 0.5
		});

		var action = this._easeWithAction(cc.moveTo(t, end), a_ease);
		this._runActions(action);
	},

	/**
	 * [滑入]
	 * 参数参考移动进入
	 */
	_TransitionSlide: function (t, args) {
		var a_dir, a_ease, a_action;
		var dir = this._L;
		if (args !== undefined) {
			a_dir = args["dir"];
			a_ease = args["ease"];
		}
		if (a_dir !== undefined) {
			dir = a_dir;
		}
		var winSize = cc.director.getWinSize();
		var posx = 0;
		var posy = 0;
		switch (dir) {
			case this._T:
				posy = -winSize.height;
				break;
			case this._B:
				posy = winSize.height;
				break;
			case this._R:
				posx = -winSize.width;
				break;
			case this._L:
				posx = winSize.width;
				break;
		}
		var end = cc.p(-posx, -posy);
		if (this._way == cc.TRANSITION_LAYER_OUT) {
			posx = 0;
			posy = 0;
		}

		this.attr({
			scale: 1.0,
			x: posx,
			y: posy,
			anchorX: 0.5,
			anchorY: 0.5
		});

		var action = this._easeWithAction(cc.moveBy(t, end), a_ease);
		this._runActions(action);
	},

	/**
	 * [缩放进入]
	 * 参数: anx:缩放重心x
	 * 		 any:缩放重心y.
	 * 	     ease:ease函数的名称.
	 */
	_TransitionShrinkGrow: function (t, args) {
		var ease,
			pos = this._B,
			scale = 0.001,
			scaleTo = 1.0,
			anx = 0.5,
			any = 0.5;

		if (args !== undefined) {
			ease = args["ease"] || null;
			anx = args["anx"] || 0.5;
			any = args["any"] || 0.5;
		}

		if (this._way == cc.TRANSITION_LAYER_OUT) {
			scale = 1.0;
			scaleTo = 0.01;
		}

		this.attr({
			scale: scale,
			anchorX: anx,
			anchorY: any
		})

		var action = this._easeWithAction(cc.scaleTo(t, scaleTo), ease);
		this._runActions(action)
	},

	/**
	 * [透明渐变进入]
	 */
	_TransitionFade: function (t) {
		var opacity = 0,
			acfun = cc.fadeIn;
		var chlids = this.getChildren();

		if (this._way == cc.TRANSITION_LAYER_OUT) {
			acfun = cc.fadeOut;
			opacity = 255;
		}
		for (var i in chlids) {
			chlids[i].setOpacity(opacity);
		}
		for (var i in chlids) {
			if (chlids[i] != null) {
				var fade = acfun(t);
				chlids[i].runAction(fade);
			}
		}
		delay = cc.delayTime(t);
		this._runActions(delay);
	},

	/**
	 * [层级旋转进入]
	 * 参数:
	 * 		orient:"+","-". 代表旋转的方向正负.默认为"+".
	 * 		zoom:true or false. 旋转的同时是否进行缩放".
	 * 		type:"x","y","ar","al",分别代表沿x轴，y轴，右斜对角45°，左斜对角45°旋转
	 */
	_TransitionFlip: function (t, args) {
		var inA, deltaZ, angleZ;
		var an = 0;
		var orient = 0;
		var zoom = false;
		if (args !== undefined) {
			if (args["orient"] == "-") {
				orient = 1;
			}
			if (args["zoom"] === true) {
				zoom = true;
			}
			switch (args["type"]) {
				case "x":
					an = 0;
					break;
				case "y":
					an = 90;
					break;
				case "ar":
					an = 45;
					break;
				case "al":
					an = -45;
					break;
				default:
					an = 0;
					break;
			}
		}
		if (orient == 0) {
			deltaZ = 270;
			angleZ = 90;
			if (this._way == cc.TRANSITION_LAYER_OUT) {
				deltaZ = 0;
				angleZ = 90;
			}
		} else {
			deltaZ = 90;
			angleZ = -90;
			if (this._way == cc.TRANSITION_LAYER_OUT) {
				deltaZ = 0;
				angleZ = -90;
			}
		}
		inA = cc.sequence(
			cc.show(),
			cc.orbitCamera(t, 1, 0, deltaZ, angleZ, an, 0)
		);
		if (zoom) {
			var scale = 0.3;
			var to = 1.0;
			if (this._way == cc.TRANSITION_LAYER_OUT) {
				scale = 1.0;
				to = 0.3;
			}
			this.setScale(scale);
			inA = cc.sequence(
				cc.show(),
				cc.spawn(
					cc.orbitCamera(t, 1, 0, deltaZ, angleZ, an, 0), cc.scaleTo(t, to)
				));
		}
		this._runActions(inA);
	},

	/**
	 * [网格切换]
	 * 参数:
	 * 		target:基础底层对象，传入的为另一个Layer，作为切入时候的底层图像渲染.
	 * 		gtype:网格动画特效的类型{
	 * 			SplitCols:   列依次出现
	 * 			SplitRows:   行依次出现
	 * 			TurnOffTiles: 瓦片随机出现
	 * 			FadeOutTR:     右上渐变出现
	 * 			FadeOutBL:     左下渐变出现
	 * 			FadeOutUp:     向上渐变出现
	 * 			FadeOutDown:   向下渐变出现
	 * 			PageTurn       翻页特效
	 * 		}
	 */
	_TransitionGridTrans: function (t, args) {
		var target = null;
		if (args !== undefined) {
			target = args["target"];
			type = args["gtype"];
		}
		var self = this;
		var sl = this;
		var s = cc.director.getRunningScene();
		var gridProxy = new cc.NodeGrid();
		gridProxy.setTarget(target);
		gridProxy.onEnter();

		//child node's visit is not effected in scope, it will effected in running scene's visit
		//so save the old visit, and set the new visit, call visit, when action end reset old visit of running scene.
		var oldvisit = s.visit;
		s.visit = function () {
			self.visit(); // lower for show
			gridProxy.visit(); //above for disappear
		};
		s.visit();

		//normal try to get the trun out failed, but direct use action.reverse() effected.

		this._toff = this._getGridAction(type, t); //
		if (this._way == cc.TRANSITION_LAYER_OUT) {
			this._toff = this._toff.reverse();
			sl.removeFromParent(true);
		}
		cc.eventManager.setEnabled(false);
		gridProxy.runAction(cc.sequence(this._toff, cc.callFunc(function () {
			s.visit = oldvisit;
			cc.eventManager.setEnabled(true);
			gridProxy.setTarget(null);
		}, sl), cc.stopGrid()));
	},

	_getGridAction: function (type, t) {
		var winSize = cc.director.getWinSize();
		var aspect = winSize.width / winSize.height;
		var x = 0 | (12 * aspect);
		var y = 12;
		var size = cc.size(x, y)
		switch (type) {
			case "SplitCols":
				return cc.splitCols(t, 3);
			case "TurnOffTiles":
				return cc.turnOffTiles(t, size, 1);
			case "SplitRows":
				return cc.splitRows(t, 3);
			case "FadeOutTR":
				return cc.fadeOutTRTiles(t, size);
			case "FadeOutBL":
				return cc.fadeOutBLTiles(t, size);
			case "FadeOutUp":
				return cc.fadeOutUpTiles(t, size);
			case "FadeOutDown":
				return cc.fadeOutDownTiles(t, size);
			case "PageTurn":
				return cc.pageTurn3D(t, size);
		}
	},
});