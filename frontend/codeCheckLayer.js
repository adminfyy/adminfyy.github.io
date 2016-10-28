
var codeCheckLayer = baseLayer.extend({

    _datas : null,
    _titleText : null,
    _title : "",
    _introText : null,
    _intro:"",
    _introFailHint:"",
    _forbiddenHint:"",
    _questionText : null,
    _answerItem : null,
    _answerList : null,

    _timeUpDate : null,
    _textColors:null,
    _uiPath:null,

    _createTime : null,

    ctor : function(parent,datas){
        this._super();
        this._basename = "codeCheckLayer";
        this._datas = datas;

        var type = 0;
        if(this._datas && this._datas.hasOwnProperty("dialog_ui_type")){
            type = this._datas.dialog_ui_type;
        }else{
            type = Math.floor(Math.random()*3);
        }
        if(type > 2){
            type = 2;
        }
        if(type < 0){
            type = 0;
        }
        var uiPath = "boxCode.json";
        switch (type){
            case 0:
                uiPath = "boxCode.json";
                break;
            case 1:
                uiPath = "boxCode1.json";
                break;
            case 2:
                uiPath = "boxCode2.json";
                break;
            default:
                uiPath = "boxCode.json";
                break;
        }
        this._uiPath = uiPath;
    },

    init : function(){
        if (!this._super())
            return false;

        this._ui = this.load_ui(this._uiPath);
        if (this._ui == -1)
            return true;
        if (!this._ui)
            return false;
        this.addChild(this._ui);
        this._createTime = new Date();
        this.initUI();

        return true;
    },

    initUI : function(){
        this._titleText = WidgetDig(this._ui,"login/title/text");
        this._introText = WidgetDig(this._ui,"login/text");
        this._questionText = WidgetDig(this._ui,"login/textTopic");
        this._answerItem  = WidgetDig(this._ui,"list/option").clone();
        this._answerList = WidgetDig(this._ui,"list");
        this._answerList.removeAllChildren();

        this._textColors = tj.cfg.get("codeCheck/textColors");
        var colorIndext = this.getRandomInRange(this._textColors.length - 1);

        // 标题
        this._timeUpDate = new Date().getTime() + (this._datas.left_sec+1)*1000;
        var titles = tj.cfg.get("codeCheck/titles");
        this._title = titles[this.getRandomInRange(titles.length-1)];
        this._titleText.setString(this._title);
        colorIndext = this.getRandomInRange(this._textColors.length - 1);
        this._titleText.setTextColor(cc.color(this._textColors[colorIndext]));
        this._titleText.setFontSize(28+this.getRandomInRange(8));

        // 介绍
        this._introFailHint = "";
        if(tj.isInMap){
            this._introFailHint = tj.cfg.get("codeCheck/taskFailOnMap");
        }
        var forbidTime = this._datas.forbidden_duration;
        var h = Math.floor(forbidTime/60);
        var m = Math.floor(forbidTime-h*60);
        var hint = "";
        if(h > 0){
            hint = h + tj.cfg.get("text_on_ui/share/time/h");
        }
        if(m > 0){
            hint = hint + m + tj.cfg.get("text_on_ui/share/time/m");
        }
        this._forbiddenHint = hint;

        var intros = tj.cfg.get("codeCheck/intros");
        this._intro = intros[this.getRandomInRange(intros.length-1)];
        this._introText.setString(this._intro.format(this._forbiddenHint,this._introFailHint,this._datas.left_sec));
        colorIndext = this.getRandomInRange(this._textColors.length - 1);
        this._introText.setTextColor(cc.color(this._textColors[colorIndext]));
        this._introText.setFontSize(24+this.getRandomInRange(3));
        var cSize = this._introText.getContentSize();
        var addHeight = 120;
        this._introText.setContentSize(cSize.width,cSize.height+addHeight);

        // 问题
        this._questionText.setString(this._datas.q);
        this._questionText.setFontSize(25+this.getRandomInRange(10));
        this._questionText.setTextHorizontalAlignment(this.getRandomInRange(2));
        this._questionText.setTextVerticalAlignment(2);
        colorIndext = this.getRandomInRange(this._textColors.length - 1);
        this._questionText.setTextColor(cc.color(this._textColors[colorIndext]));

        // 答案选项
        for(var i=0;i<this._datas.opt.length;i++){
            var uiItem = this._answerItem.clone();
            this._answerList.pushBackCustomItem(uiItem);
            var opt = this._datas.opt[i];
            var btn = WidgetDig(uiItem,"btn");
            if(btn) {
                var text = WidgetDig(btn, "text");
                text.setString(opt);
                var colorIndext = this.getRandomInRange(this._textColors.length - 1);
                text.setTextColor(cc.color(this._textColors[colorIndext]));
                text.setFontSize(25+this.getRandomInRange(10));
                btn.idx = i;
                btn.answerText = opt;
            }
        }
    },

    getRandomInRange : function(max){
        if(max <= 0){
            return 0;
        }
        var num = Math.floor(Math.random() * (max+1));
        if(num > max){
            num = max;
        }
        if(num < 0){
            num = 0;
        }
        return num;
    },

    onEnter : function(){
        this._super();

        tj.wsconnection.addGrp(msgac["Verify_code_ret"], msgac["Verify_code_ret"], this.process_ac.bind(this), this.get_scene_name());
        tj.wsconnection.addGrp(msgac["Verify_punish"], msgac["Verify_punish"], this.process_ac.bind(this), this.get_scene_name());
    },

    process_ac: function (doc) {
        var msg_id = doc[0];
        var data = doc[1];
        switch (msg_id) {
            case msgac["Verify_code_ret"]:
                if(data.ret == 0){
                    if(data.hasOwnProperty("coin")){
                        var delta = data.coin.delta;
                        tj.mainData.setCoinNum(data.coin.left);
                        createMainNoticeBox(tj.cfg.get("codeCheck/answerRight").format(tj.cfg.get("text/manor/Gold"),delta));
                    }
                    if(data.hasOwnProperty("gem")){
                        var delta = data.gem.delta;
                        tj.mainData.setGemNum(data.gem.left);
                        createMainNoticeBox(tj.cfg.get("codeCheck/answerRight").format(tj.cfg.get("text/manor/Gem"),delta));
                    }
                }else if(data.ret == -2){
                    createMainNoticeBox(tj.cfg.get("codeCheck/notAnswering"));
                }else{
                    var msg = tj.cfg.get("codeCheck/answerError1");
                    var p = this.getParent();
                    if(p && typeof(p.showNoticeMsg) == "function"){
                        p.showNoticeMsg(msg);
                    }
                }
                this.set_release();
                break;
            case msgac["Verify_punish"]:
                this.set_release();
                break;
            default :
                break;
        }
    },

    update : function(dt){
        this._super();
        if(!this._titleText){
            return;
        }
        if(this._answerList){
            var remainTime = 3 - (new Date() - this._createTime)/1000;
            var child = this._answerList.getChildren();
            for(var i in child){
                var item = child[i];
                if(item){
                    var text = WidgetDig(item,"btn/text");
                    var answerText = WidgetDig(item,"btn").answerText;
                    if(remainTime <= 0){
                        item.setEnabled(true);
                        item.color = cc.color("#FFFFFF");
                        text.setString(answerText);
                    }else{
                        item.setEnabled(false);
                        item.color = cc.color("#888888");
                        text.setString(answerText+"（"+ parseInt(remainTime) +"）");
                    }
                }
            }
        }
        var remainTime = this._timeUpDate - new Date().getTime();
        remainTime = parseInt(remainTime/1000) || -1;
        if(remainTime >= 0){
            this._introText.setString(this._intro.format(this._forbiddenHint,this._introFailHint,remainTime));
        }else{
            this._introText.setString(this._intro.format(this._forbiddenHint,this._introFailHint,0));
        }
    },

    defaultTouchButton : function(btn, type){
        if (type == ccui.Widget.TOUCH_ENDED) {
            switch(btn.getName()){
                case "btn":
                    tj.wsconnection.setMsg(msgac["Verify_code"],{"idx":btn.idx});
                    break;
                default :
                    break;
            }
        }
    }

});

function createCodeCheckLayer(parent,datas){
    parent.removeAllChildren();
    var pRet = new codeCheckLayer(parent,datas);
    if (pRet && pRet.init()){
        pRet._tjParent = parent;
        parent.addChild(pRet);
        return pRet;
    }else if (pRet)
        delete pRet;
    return null;
};
