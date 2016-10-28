var PtN = null;
var NoticeBox = baseLayer.extend({
	_active:false,
	_text:null,

	ctor : function(parent, msg, seconds){
		this._super();
		this._msg = msg;
		this._keep = seconds;
		this._basename = "noticebox";
		this._beTop = false;
	},

	onEnterTransitionDidFinish : function(){
		this._super();
		this.scheduleUpdate();
	},

	//update : function(){
	//	if (tj.gameClock.elapsed() - this._time_load_check > this._keep * 1000)
	//		this.set_release();
	//},

	init : function() {
		if (!this._super())
			return false;
		var fontname;
		if (tj.cfg.getAttr("font/ui_font/Text", "affect_manu_ui", 0, t_int))
			fontname = tj.cfg.get("font/ui_font/Text", "");

		this._text = new ccui.Text(this._msg, tj.cfg.get("designdata/design_fontName"), 32);
		this.addChild(this._text, 1000);
		this._active = true;
		
		var wsize = this._text.getContentSize();
		var x = Math.ceil( wsize.width / cc.winSize.width);
		if (x > 1){
			this._text.setContentSize(cc.size(cc.winSize.width, wsize.height * x));
		}
		
		var visibleSize = cc.director.getVisibleSize();
		var origin = cc.director.getVisibleOrigin();
		var center = cc.p(origin.x + visibleSize.width/2, origin.y + visibleSize.height/2);
		this._text.setPosition(center);
		this._text.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
		this._text.setTextVerticalAlignment(cc.TEXT_ALIGNMENT_CENTER);
		var sztxt = visibleSize;
		sztxt.width -= 100;
		sztxt.height = 0;
		//w.setTextAreaSize(sztxt);
		var scale = this._text.getScale();
		if (tj.cfg.getAttr("font/ui_font/Text", "affect_manu_ui", 0, t_int))
			scale = tj.cfg.getAttr("font/ui_font/Text", "scale", 0.0, t_float);
		this._text.setScale(scale * 1.5);
		var n_line = 1;
		var ww = this._text.getVirtualRenderer();
		//if (ww)
		//	n_line = ww.getStringNumLines();
		if (n_line < 1) n_line = 1;
		var e0 = cc.ScaleTo.create(0.5, scale);
		var delay = this._keep > 0 ? this._keep : tj.cfg.get("noticebox/time", 0.0, t_float);
		this._keep = delay;
		var e2 = cc.FadeOut.create(delay);
		var mv = cc.p(0, 0 - this._text.getContentSize().height * 3/ n_line);
		var e3 = cc.MoveBy.create(delay, mv);
		var c1 = cc.Spawn.create(e2, e3);
		var f = cc.callFunc(function(){this.set_release();}, this);
		var q = cc.Sequence.create(e0, c1, f);
		this._text.runAction(q);
		return true;
	},

	onExit:function(){
		this._super();
		if(this._text){
			this._text.removeFromParent();
			this._text = null;
		}
		PtN = null;
	}
});

/**@cosnt */ var NOTICE_BOX_TAG = 30001;
function createNoticeBox(parent, msg){
	var only = arguments[2] ? arguments[2] : 0;
	var seconds = arguments[3] ? arguments[3] : 5;
	//唯一化处理
	if (PtN && only == 1 && parent == PtN._tjParent) {
		PtN.set_release();
		PtN = null;
	}
	//..
	pRet = new NoticeBox(parent, msg, seconds);
	if (pRet && pRet.init()){
		//pRet.release();
		var z = -1;
		var childs = parent.getChildren();
		for(var i = 0; i < childs.length; ++i){
			if (childs[i].getLocalZOrder() > z)
				z = childs[i].getLocalZOrder();
		}
		pRet.setLocalZOrder(z + 1);
		pRet._tjParent = parent;
		parent.addChild(pRet, z+1, NOTICE_BOX_TAG);
		if (only == 1)
			PtN = pRet;
		return pRet;
	} else if (pRet)
		delete pRet;
	return null;
}

function createMainNoticeBox(msg){
	var top = Main_Layer;
	if(tj.isInMap)
		top = Map_Layer;
	if (top === null || top === undefined) {
		return;
	}
	//createNoticeBox(top, msg);
	top.noticetext_add(msg, true);
}