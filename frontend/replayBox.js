
var clientData_key_replayBox = "replayBox";
var replayBox_recording = false;
var replayBox_startTime = 0;

// true:暂时不开放录屏功能，强制隐藏    false:不强制隐藏，符合条件就显示
var replayBox_force_hide = false;

var replayBox = baseLayer.extend({

    _recordBtn:null,
    _startBtn:null,
    _startBtnText:null,
    _stopBtn:null,
    _stopBtnText:null,
    _moveAbled:false,

    _beginPosX:0,
    _beginPosY:0,

    _moveCount:0,
    _isActioning:false,

    ctor : function(){
        this._super();
        this._basename = "replayBox";
        this._beTop = false;
    },

    init : function() {
        if (!this._super())
            return false;

        this._ui = this.load_ui("boxCamera.json");
        if (this._ui == -1)
            return true;
        if (!this._ui)
            return false;

        this.addChild(this._ui);
        this.create_control();

        var btn = WidgetDig(this._ui, "camera");
        btn.setAnchorPoint(0,0);
        this._recordBtn = btn;
        this._startBtn = WidgetDig(this._ui, "camera/btnStart");
        this._startBtnText = WidgetDig(this._ui, "camera/btnStart/text");
        this._stopBtn = WidgetDig(this._ui, "camera/btnStop");
        this._stopBtnText = WidgetDig(this._ui, "camera/btnStop/text");

        this._moveAbled = false;
        this._beginPosX = 0;
        this._beginPosY = 0;
        this._isActioning = false;

        return true;
    },

    onEnter : function(){
        this._super();
        var replayBoxData = tj.mainData.getClientData(clientData_key_replayBox);
        if(!replayBoxData){
            var originP = cc.director.getVisibleOrigin();
            var visibleSize = cc.director.getVisibleSize();

            replayBoxData = {};
            replayBoxData.visible = false;
            replayBoxData.startTime = new Date();
            replayBoxData.px = originP.x+visibleSize.width - this._recordBtn.getContentSize().width/2;
            replayBoxData.py = originP.y+visibleSize.height - 200;
            tj.mainData.setClientData(clientData_key_replayBox,replayBoxData);
            tj.mainData.sendClientData(clientData_key_replayBox);
        }

        // 超时断线，录制状态发生错误，重新赋值
        replayBox_recording = SysUtil.isVedioRecording();
        replayBox_startTime = new Date(replayBoxData.startTime);

        this._recordBtn.setPosition(replayBoxData.px,replayBoxData.py);
        this.moveRecordBtnToEdge();
        this.refreshUI();

        // 默认隐藏，并且如果设置页面中的开关按钮是隐藏的话，就跟着隐藏，苹果审核不受该控制
        this._recordBtn.setVisible(false);
        if(!cc.tj.isReviewChk) {
            var show_btns = tj.mainData.main.settingbuttons || '';
            if (show_btns) {
                var b_arr = show_btns.split(',');
                if (b_arr.length > 0 && b_arr.indexOf("btnVideo") != -1) {
                    this._recordBtn.setVisible(replayBoxData.visible);
                }
            }
        }else{
            this._recordBtn.setVisible(replayBoxData.visible);
        }

        if(!SDKTools.isNativeSupport33250() || replayBox_force_hide){
            this._recordBtn.setVisible(false);
        }
    },

    // 更新按钮状态  开始录制or录制中
    refreshUI : function(){
        this._startBtn.setVisible(false);
        this._stopBtn.setVisible(false);
        if(replayBox_recording){
            this._stopBtn.setVisible(true);
        }else{
            this._startBtn.setVisible(true);
        }
        if(this._startBtnText){
            this._startBtnText.setString(tj.cfg.get("vedioRecorder/recorder"));
        }
        if(this._stopBtnText){
            this._stopBtnText.setString(tj.cfg.get("vedioRecorder/stop"));
        }
    },

    hide:function(){
        this.transOut("Fade", N_TRANS_IN_TIEM);
    },

    switchVisible : function(){
        var replayBoxData = tj.mainData.getClientData(clientData_key_replayBox);
        if(!replayBoxData){
            return;
        }
        if(replayBox_recording){
            this.noticetext_add(tj.cfg.get("vedioRecorder/notHideInRedording"));
            return;
        }
        this._recordBtn.setVisible(!this._recordBtn.isVisible());
        replayBoxData.visible = this._recordBtn.isVisible();
        tj.mainData.sendClientData(clientData_key_replayBox);
    },

    on_touch_Began : function(touch){
        this._beginPosX = touch.getLocationX();
        this._beginPosY = touch.getLocationY();
        return true;
    },

    on_touch_Moved : function(touch){
        if(this._moveAbled && this._recordBtn && !this._isActioning){
            var dx = touch.getLocationX() - this._beginPosX;
            var dy = touch.getLocationY() - this._beginPosY;
            var px = this._recordBtn.getPositionX();
            var py = this._recordBtn.getPositionY();
            this._recordBtn.setPosition(px+dx,py+dy);
            this._beginPosX = touch.getLocationX();
            this._beginPosY = touch.getLocationY();
            this.adjustRecordBtnInView();
        }
    },

    on_touch_Ended : function(touch) {
        if(this._moveAbled && this._moveCount > 2) {
            this.moveRecordBtnToEdge();
        }
        this._moveAbled = false;
    },

    adjustRecordBtnInView : function(){
        if(!this._recordBtn){
            return;
        }
        var w = this._recordBtn.getContentSize().width;
        var h = this._recordBtn.getContentSize().height;
        var px = this._recordBtn.getPositionX();
        var py = this._recordBtn.getPositionY();

        var originP = cc.director.getVisibleOrigin();
        var visibleSize = cc.director.getVisibleSize();

        var targetX = px;
        var targetY = py;
        if(px <= originP.x){
            targetX = originP.x;
        }
        if(px+w >= originP.x+visibleSize.width){
            targetX = originP.x+visibleSize.width-w;
        }
        if(py <= originP.y){
            targetY = originP.y;
        }
        if(py+h >= originP.y + visibleSize.height){
            targetY = originP.y + visibleSize.height-h;
        }

        if(targetX != px){
            this._recordBtn.setPositionX(targetX);
        }
        if(targetY != py){
            this._recordBtn.setPositionY(targetY);
        }
    },

    moveRecordBtnToEdge : function(){
        if(!this._recordBtn){
            return;
        }
        var w = this._recordBtn.getContentSize().width;
        var h = this._recordBtn.getContentSize().height;
        var px = this._recordBtn.getPositionX();
        var py = this._recordBtn.getPositionY();

        var originP = cc.director.getVisibleOrigin();
        var visibleSize = cc.director.getVisibleSize();

        var topLength = originP.y+visibleSize.height - (py+h/2);
        var bottomLength = py+h/2 - originP.y;
        var leftLength = px+w/2 - originP.x;
        var rightLength = originP.x+visibleSize.width - (px+w/2);

        var minLength = 0;
        // 1:上，2:下，3:左，4:右
        var direction = 1;

        if(topLength < bottomLength){
            minLength = topLength;
            direction = 1;
        }else{
            minLength = bottomLength;
            direction = 2;
        }

        if(minLength > leftLength){
            minLength = leftLength;
            direction = 3;
        }
        if(minLength > rightLength){
            minLength = rightLength;
            direction = 4;
        }

        var moveAction = null;
        var duration = 0.3;
        if(minLength < 200){
            duration = 0.2;
        }
        if(minLength < 100){
            duration = 0.1;
        }
        switch (direction){
            case 1:
                moveAction = cc.moveBy(duration,cc.p(0,minLength-h/2));
                break;
            case 2:
                moveAction = cc.moveBy(duration,cc.p(0,-(minLength-h/2)));
                break;
            case 3:
                moveAction = cc.moveBy(duration,cc.p(-(minLength-w/2),0));
                break;
            case 4:
                moveAction = cc.moveBy(duration,cc.p(minLength-w/2,0));
                break;
            default :
                break;
        }
        if(!moveAction || this._isActioning){
            return;
        }

        var action = cc.sequence(moveAction.easing(cc.easeIn(2)),cc.callFunc(this.moveCompleted, this));
        this._recordBtn.stopAllActions();
        this._isActioning = true;
        this._recordBtn.runAction(action);
    },

    moveCompleted : function(){
        this._isActioning = false;
        var replayBoxData = tj.mainData.getClientData(clientData_key_replayBox);
        if(replayBoxData) {
            replayBoxData.px = this._recordBtn.getPositionX();
            replayBoxData.py = this._recordBtn.getPositionY();
            tj.mainData.sendClientData(clientData_key_replayBox);
        }
    },

    clickBtnRecord : function(){
        var recordParams = {};
        if(replayBox_recording){
            recordParams.action = SDKAction.RECORD_VEDIO_END;
            ChannelSDK.getInstance().callCommonPlatform(recordParams,BridgeSDKController.recordVedioEndCallback.bind(BridgeSDKController));
        }else{
            this.noticetext_add(tj.cfg.get("vedioRecorder/recorderInit"));
            recordParams.action = SDKAction.RECORD_VEDIO_START;
            // 录制麦克风声音
            recordParams.microphone = 1;
            ChannelSDK.getInstance().callCommonPlatform(recordParams,BridgeSDKController.recordVedioStartCallback.bind(BridgeSDKController));
        }
    },

    // 10：系统不支持，需要9或以上
    // 11：录制工具异常
    // 12：正在录制，不可重复开启录制
    // 13：开启录制失败
    // 14：录制初始化成功，正式开始录制
    // 15：停止录制失败，当前没有在录制状态
    // 16：停止录制发生异常
    // 17：停止录制成功，打开预览界面
    clickBtnRecordCallback : function(ret){
        if(ret.action == SDKAction.RECORD_VEDIO_START){
            if(ret.status == 12){
                replayBox_recording = true;
                this.refreshUI();
                return;
            }
            if(ret.status == 14){
                replayBox_recording = true;
                replayBox_startTime = new Date();
                var replayBoxData = tj.mainData.getClientData(clientData_key_replayBox);
                if(replayBoxData) {
                    replayBoxData.startTime = replayBox_startTime;
                    tj.mainData.sendClientData(clientData_key_replayBox);
                }
            }else if(ret.status == 10){
                this.noticetext_add(tj.cfg.get("vedioRecorder/systemNotSupport"));
                replayBox_recording = false;
            }else{
                this.noticetext_add(tj.cfg.get("vedioRecorder/recorderError").format(ret.status));
                replayBox_recording = false;
            }
        }else if(ret.action == SDKAction.RECORD_VEDIO_END){
            replayBox_recording = false;
        }
        this.refreshUI();
    },

    defaultTouchButton : function(btn, type) {
        switch (type){
            case ccui.Widget.TOUCH_BEGAN:
                this._moveAbled = true;
                this._moveCount = 0;
                break;
            case ccui.Widget.TOUCH_CANCELED:
                break;
            case ccui.Widget.TOUCH_MOVED:
                this._moveCount++;
                break;
            case ccui.Widget.TOUCH_ENDED:
                if(this._moveCount <= 5){
                    this._moveCount = 0;
                    this.clickBtnRecord();
                }
                break;
            default :
                break;
        }
    },

    update:function(delta){
        this._super();
        var replayBoxData = tj.mainData.getClientData(clientData_key_replayBox);
        if(replayBoxData){
            replayBoxData.px = this._recordBtn.getPositionX();
            replayBoxData.py = this._recordBtn.getPositionY();
        }
        if(replayBox_recording && this._stopBtnText){
            var str = tj.gameClock.millisecond2StringAddHours(new Date() - replayBox_startTime);
            if(str.substring(0,2) == "00"){
                str = str.substring(3, str.length);
            }
            this._stopBtnText.setString(str);
        }
    }
});
