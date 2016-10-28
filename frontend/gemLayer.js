/**
 * Created by likx on 2016/3/3.
 */

var gemLayer = baseLayer.extend({

    _bSDK : null,
    _payListView : null,
    _payUIArray : [],
    _payListViewOrigPosition:null,
    _inPayProcess:false,
    _monthCardUI : null,

    _setNoVedio : null,
    _setHaveVedio : null,
    _vedioText : null,
    _adLoadingUI : null,
    _adStatus : 0,      // 0：可观看    1：今日已全部看完    2：广告倒计时中
    _inAdLoading : false,

    _btnRebate : null,
    _rebateDatas : [],

    ctor : function (cb) {
        this._super();
        this._basename = "gem";
        this._cb = cb;
        this.init();
    },

    get_scene_name : function(){
        return this._basename;
    },

    init : function () {
        if (!this._super())
            return false;
        var origin = cc.director.getVisibleOrigin();
        this._ui = this.load_ui("uiGem.json");
        if (!this._ui)
            return false;
        this.addChild(this._ui);

        this._bSDK = BridgeSDKController;
        this._payUIArray.splice(0,this._payUIArray.length);
        this._payListView = WidgetDig(this._ui,"main/list");
        for(var i=1;i<=8;i++){
            if(i == 3){
                continue;
            }
            var item = WidgetDig(this._payListView,"gem"+i);
            if(item) {
                item.btnId = i;
                this.setRetain(item, "uitmpl");
                if(i <= 7){
                    this._payUIArray.push(item);
                }else{
                    this._monthCardUI = item;
                }
            }
        }
        this._payListViewOrigPosition = this._payListView.getPosition();
        WidgetDig(this._ui, "set/btnClosed/text").setString(tj.cfg.get("text_on_ui/close"));

        this._setHaveVedio = WidgetDig(this._ui, "set");
        var btnFree = WidgetDig(this._setHaveVedio,"btnFree");
        if(btnFree){
            WidgetDig(btnFree,"gem").setTouchEnabled(false);
            WidgetDig(btnFree,"gem/BG").setTouchEnabled(false);
            this._vedioText = WidgetDig(btnFree,"text");
            if(this._vedioText){
                this._vedioText.setString(tj.cfg.get("pay/ad/vedio"));
            }
        }

        this._btnRebate = WidgetDig(this._ui,"btnRebate");
        WidgetDig(this._btnRebate,"textName").setString(tj.cfg.get("pay/reward/payReward"));
        this._rebateDatas = tj.dbdata.gettable("payreward");
        this._btnRebate.setVisible(false);

        this.createNoVedioUI();
        this.createAdLoadingUI();

        return true;
    },

    refreshUI : function(){
        this._payListView.removeAllChildren(true);
        this._payListView.setPosition(this._payListViewOrigPosition);

        var productsArray = this._bSDK.getProductsArray(); 
        var itemSuccessCount = 0;
        var UIIndex = 0;
        for(var i in productsArray){
            
            var productData = productsArray[i];

            var payUIItem = null;
            if(productData.hasOwnProperty("Type") && productData.Type == 2){
                payUIItem = this._monthCardUI;
            }else{
                payUIItem = this._payUIArray[UIIndex];
                UIIndex++;
            }
            if(!payUIItem && this._payUIArray.length > 0){
                payUIItem = this._payUIArray[this._payUIArray.length-1].clone();
            }else if(this._payUIArray.length <= 0){
                SDKTools.sdkLog("refreshUI fail "+itemSuccessCount);
                break;
            }
            this._payListView.pushBackCustomItem(payUIItem);
            var btnPay = WidgetDig(payUIItem,"btnMain");
            var productName = WidgetDig(btnPay,"text/textName");
            var productDes = WidgetDig(btnPay,"text/textExplain");
            var productPrice = WidgetDig(btnPay,"text/textPrice");

            productName.setString(productData.localizedTitle);
            productDes.setString("x"+productData.GemNum);
            productPrice.setString(productData.priceLocal);
            btnPay.productId = productData.productIdentifier;
            if(productData.hasOwnProperty("Type")){
                btnPay.Type = productData.Type;
            }
            itemSuccessCount++;

            if(productData.hasOwnProperty("Type") && productData.Type == 2){
                var textInfo = WidgetDig(btnPay,"textAward");
                if(tj.mainData.main.month_card.remain_days > 0){
                    textInfo.setString(tj.cfg.get("pay/remainDays").format(tj.mainData.main.month_card.remain_days));
                }else{
                    textInfo.setString(tj.cfg.get("pay/moreInfo"));
                }
            }

            //SDKTools.sdkLog(productData);
        }

        if(itemSuccessCount < this._payUIArray.length+1){
            // 购买项不足，手动设置居中
            var itemH = this._payUIArray[0].getContentSize().height;
            var payListSize = this._payListView.getContentSize();
            var dh = (payListSize.height - itemH * itemSuccessCount * 0.5) - payListSize.height * 0.5;
            this._payListView.setPositionY(this._payListView.getPositionY() - dh);
        }

        if(!this._inPayProcess){
            this.changeUIStatus(false);
        }
    },

    preRefreshUI : function(){
        if(!this._bSDK.getProductsArray()){
            return;
        }

        this.refreshUI();
    },

    process_ac : function(doc){
        var msg_id = doc[0];
        var data = doc[1];
        switch(msg_id){
            case msgac["PayUI_refresh"]:
                SDKTools.sdkLog("process_ac PayUI_refresh");
                this.preRefreshUI();
                break;
            case msgac["PayUI_pay_fail"]:
                SDKTools.sdkLog("process_ac PayUI_pay_fail",data);
                this.changeUIStatus(false);
                var msg = tj.cfg.get("pay/fail").format(this._bSDK.getProductNameById(data.productIdentifier));
                if(data.status == 2){
                    msg = msg + "(" + data.memo + ")";
                    // 由于请求产品问题而引起的支付失败，再次发起请求产品动作
                    ChannelSDK.getInstance().requestProducts(this._bSDK.productIdData,this._bSDK.requestProductCallback.bind(this._bSDK),this._bSDK.payCallback.bind(this._bSDK));
                }
                this.pop_noticemsg(msg,true);
                break;
            case msgac["PayUI_pay_ver_ret"]:
                SDKTools.sdkLog("PayUI_pay_ver_ret",data);
                this.changeUIStatus(false);
                this.refreshUI();
                tj.wsconnection.setMsg(msgac["Pay_reward_ask"]);
                break;
            case msgac["PayUI_vedio"]:
                this._inAdLoading = false;
                this.setAdLoadingUI(false);
                if(data.fromServer == 0) {
                    // data.status说明
                    // 1:中途退出广告
                    // 2:成功打开广告
                    // 3:失败
                    if(data.status == 3){
                        this.noticetext_add(tj.cfg.get("pay/ad/adShowFail"));
                    }
                }else{
                    var sData = data.serverData;
                    if(sData.ret == 0){
                        return;
                    }
                    var msg = "";
                    switch (sData.ret){
                        // 没有广告渠道
                        case -1:
                            msg = tj.cfg.get("pay/ad/noAdType");
                            break;
                        // 广告获取宝石已关闭
                        case 1:
                            msg = tj.cfg.get("pay/ad/hasClosed");
                            break;
                        // 间隔时间还未到
                        case 2:
                            msg = tj.cfg.get("pay/ad/adCd");
                            break;
                        // 超过次数限制
                        case 3:
                            msg = tj.cfg.get("pay/ad/limitHint");
                            break;
                        default:
                            msg = tj.cfg.get("pay/ad/serverError");
                            break;
                    }
                    this.noticetext_add(msg);
                }
                break;
            case msgac["Pay_reward_ask"]:
                if(data.ret == 0){
                    this.refreshPayReward(data);
                }else{
                    var msg = tj.cfg.get("pay/reward/askError").format(data.ret);
                    this.noticetext_add(msg);
                }
                break;
            case msgac["Pay_reward_get"]:
                SDKTools.sdkLog("Pay_reward_get",data);
                var msg = "";
                switch (data.ret){
                    case 0:
                        msg = tj.cfg.get("pay/reward/success").format(data.data.reward_got,data.data.delta);
                        tj.mainData.setGemNum(data.data.left);
                        tj.wsconnection.setMsg(msgac["Pay_reward_ask"]);
                        break;
                    case 1:
                        msg = tj.cfg.get("pay/reward/fail1");
                        break;
                    case 5:
                        msg = tj.cfg.get("pay/reward/fail5");
                        break;
                    case 10:
                        msg = tj.cfg.get("pay/reward/fail10");
                        break;
                    case 15:
                        msg = tj.cfg.get("pay/reward/fail15");
                        break;
                    default:
                        msg = tj.cfg.get("pay/reward/failDefault").format(data.ret);
                        break;
                }
                var box = createMsgBox2(this,msg,function(tag){
                    return true;
                },1);
                box.setMsgHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);

                break;
            default :
                break;
        }
    },

    refreshPayReward : function(data){
        var rebateDatas = this._rebateDatas;
        var nextRewardIndex = -1;
        if(data.reward_got <= 0){
            nextRewardIndex = 0;
        }else if(data.reward_got < rebateDatas[rebateDatas.length-1].account){
            for(var i in rebateDatas){
                var item = rebateDatas[i];
                if(item.account == data.reward_got){
                    nextRewardIndex = parseInt(i)+1;
                    break;
                }
            }
        }else{
            nextRewardIndex = rebateDatas.length-1;
        }
        if(nextRewardIndex < 0 || nextRewardIndex > rebateDatas.length-1){
            var msg = tj.cfg.get("pay/reward/processError").format(nextRewardIndex,data.reward_got);
            this.noticetext_add(msg);
            return;
        }

        var nextRewardOrign = rebateDatas[nextRewardIndex];
        var nextReward = {"account":nextRewardOrign.account,"reward":nextRewardOrign.reward};
        if(data.reward_got >= rebateDatas[rebateDatas.length-1].account){
            nextReward.account = data.reward_got + rebateDatas[rebateDatas.length-1].account;
        }
        var btnRebate = this._btnRebate;
        WidgetDig(btnRebate,"textNum").setString("x"+nextReward.reward);
        if(data.total_pay >= nextReward.account){
            WidgetDig(btnRebate,"textState").setString(tj.cfg.get("pay/reward/clickGet"));
            if(nextReward.account > rebateDatas[rebateDatas.length-1].account){
                btnRebate.account = rebateDatas[rebateDatas.length-1].account;
            }else{
                btnRebate.account = nextReward.account;
            }
        }else{
            var remainPay = nextReward.account - data.total_pay;
            var info = tj.cfg.get("pay/reward/payRemain").format(remainPay);
            WidgetDig(btnRebate,"textState").setString(info);
            btnRebate.account = 0;
            btnRebate.remainPay = info;
        }
        btnRebate.setVisible(true);
    },

    lockPayBtn : function(lock){
        var enable = !lock;
        for(var i in this._payUIArray){
            var btn = WidgetDig(this._payUIArray[i],"btnMain");
            if(btn){
                btn.setEnabled(enable);
            }
        }
    },

    changeUIStatus : function(status){
        if(!this._armature_busy){
            this.load_armature_busy();
            this._armature_busy.setVisible(false);
        }
        if(this._armature_busy){
            this._armature_busy.setVisible(status);
        }
        this.lockPayBtn(status);
        this._inPayProcess = status;

        // 广告是否加载中
        if(this._inAdLoading && this._armature_busy){
            this._armature_busy.setVisible(true);
        }
    },

    defaultTouchButton : function(btn, type) {
        if(this._adLoadingUI && this._adLoadingUI.isVisible()){
            SDKTools.sdkLog("ad is loading...");
            return;
        }
        if (type == ccui.Widget.TOUCH_ENDED) {
            switch(btn.getName()){
                case "btnMain":
                    if(btn.productId) {
                        if(btn.hasOwnProperty("Type") && btn.Type == 2){
                            var remainDays = tj.mainData.main.month_card.remain_days;
                            var msg = "";
                            if(remainDays > 0){
                                msg = tj.cfg.get("pay/monthCardHint2").format(remainDays,remainDays);
                            }else{
                                msg = tj.cfg.get("pay/monthCardHint1");
                            }
                            var self = this;
                            var box = createAssetsBox(this,msg,function(tag){
                                if(tag == 0){
                                    self.changeUIStatus(true);
                                    SDKTools.sdkLog("start pay " + btn.productId);
                                    ChannelSDK.getInstance().startPay(btn.productId, 1, function () {}, self._bSDK.payCallback.bind(self._bSDK));
                                }
                                return true;
                            },3);
                        }else{
                            this.changeUIStatus(true);
                            SDKTools.sdkLog("start pay " + btn.productId);
                            ChannelSDK.getInstance().startPay(btn.productId, 1, function () {}, this._bSDK.payCallback.bind(this._bSDK));
                        }
                    }else{
                        var msg = tj.cfg.get("pay/fail").format("") + "(productId error)";
                        this.pop_noticemsg(msg,true);
                    }
                    break;
                case "btnFree":
                    SysUtil.requestLocationAuth();
                    var msg = "";
                    if(this._adStatus == 1){
                        msg = tj.cfg.get("pay/ad/limitHint");
                    }else if(this._adStatus == 2){
                        msg = tj.cfg.get("pay/ad/adCd");
                    }else{
                        this._inAdLoading = true;
                        this.setAdLoadingUI(true);
                        this.noticetext_add(tj.cfg.get("pay/ad/adLoading"));
                        var adParams = {};
                        adParams.action = SDKAction.AD_VEDIO;
                        adParams.type = 1;
                        if(tj.mainData.main.hasOwnProperty("ad")){
                            adParams.type = tj.mainData.main.ad.open;
                        }
                        // 苹果审核人员观看 type保持为1(admob)
                        if(cc.tj.isReviewChk){
                            adParams.type = 1;
                        }
                        ChannelSDK.getInstance().callCommonPlatform(adParams,this._bSDK.adShowCallback.bind(this._bSDK));
                    }
                    if(msg){
                        this.noticetext_add(msg);
                    }
                    break;
                case "btnClosed":
                    this.set_release();
                    break;
                case "btnFeedback":
                    this._curr_popLayer = createMailBackLayer(this,this.get_scene_name());
                    break;
                case "btnRebate":
                    if(btn.account > 0){
                        tj.wsconnection.setMsg(msgac["Pay_reward_get"],{"a":btn.account});
                    }else{
                        this.noticetext_add(btn.remainPay);
                    }
                    break;
                default:
                    break;
            }
        }
    },

    setAdLoadingUI : function(isShow){
        if(!this._adLoadingUI){
            return;
        }
        this._adLoadingUI.setVisible(isShow);
        if(this._armature_busy){
            this._armature_busy.setVisible(isShow);
        }
    },

    processUIVedioBtn : function(){
        // 默认隐藏
        this._setHaveVedio.setVisible(false);
        this._setNoVedio.setVisible(true);

        if(!tj.mainData.main.hasOwnProperty("ad")){
            return;
        }
        var ad = tj.mainData.main.ad;
        var isShow = false;
        if(ad.open != 0){
            isShow = true;
        }
        // 苹果审核人员不受后台控制，一直是显示状态
        if(cc.tj.isReviewChk){
            isShow = true;
        }
        if(!SDKTools.isNativeSupport33250()){
            isShow = false;
        }
        if(isShow){
            this._setHaveVedio.setVisible(true);
            this._setNoVedio.setVisible(false);
            // 每次观看获得宝石个数
            WidgetDig(this._setHaveVedio,"btnFree/gem/text").setString("+"+ad.gem_once);
            this.update(1/60.0);
        }else{
            this._setNoVedio.setVisible(true);
        }
    },

    createNoVedioUI : function(){
        var setNoVedio = WidgetDig(this._ui, "set").clone();
        if(!setNoVedio){
            return;
        }
        setNoVedio.setName("setNoVedio");
        this._ui.addChild(setNoVedio);
        this._setNoVedio = setNoVedio;

        var btnFeedback = WidgetDig(setNoVedio, "btnFeedback");
        var btnFree = WidgetDig(setNoVedio, "btnFree");
        var btnClose = WidgetDig(setNoVedio, "btnClosed");
        if(!btnFeedback || !btnFree || !btnClose){
            return;
        }
        btnFree.removeFromParent();

        var btn_adjust_func = function(btn){
            var pSize = btn.getParent().getContentSize();
            var size = btn.getContentSize();
            btn.setContentSize(pSize.width*0.5,size.height);
            size = btn.getContentSize();

            var btnBG = WidgetDig(btn, "BG");
            btnBG.setContentSize(size.width*0.94,btnBG.getContentSize().height);
            btnBG.setPositionX(size.width*0.5);
            var btnText = WidgetDig(btn, "text");
            btnText.setPositionX(size.width*0.5);
        };

        btn_adjust_func(btnFeedback);
        btn_adjust_func(btnClose);
    },

    createAdLoadingUI : function(){
        var layer = cc.LayerColor.create(cc.color("#000000"));
        layer.setVisible(false);
        this.addChild(layer);
        this._adLoadingUI = layer;

        this.load_armature_busy();
        if(this._armature_busy){
            var zOrder = layer.getLocalZOrder();
            this._armature_busy.setLocalZOrder(zOrder+1);
        }
    },

    update : function(dt){
        this._super();
        if(!this._setHaveVedio || !this._setHaveVedio.isVisible()){
            return;
        }
        if(!this._vedioText){
            return;
        }
        if(!tj.mainData.main.hasOwnProperty("ad")){
            return;
        }

        var now = new Date();
        var ad = tj.mainData.main.ad;
        var remainTime = ad.interval_sec*1000 - (now - ad.last_ad_ts);
        var remainTimes = ad.max_time - ad.ad_watch_cnt;
        if(remainTimes <= 0){
            this._vedioText.setString(tj.cfg.get("pay/ad/vedioUpLimit"));
            this._adStatus = 1;
        }else{
            if(remainTime > 0){
                var str = tj.gameClock.millisecond2StringAddHours(remainTime);
                this._vedioText.setString(str.substring(3, str.length));
                this._adStatus = 2;
            }else{
                this._vedioText.setString(tj.cfg.get("pay/ad/vedioRemain").format(remainTimes));
                this._adStatus = 0;
            }
        }
        
    },

    onEnter : function(){
        this._super();
        this.load_armature_busy();
        if (this._armature_busy) {
            this._armature_busy.setVisible(true);
        }
        this._payListView.removeAllChildren(true);
        this._inPayProcess = false;
        this._inAdLoading = false;
        this.preRefreshUI();

        WidgetDig(this._ui, "text/qq").setString("");
        if(tj.setting.hasOwnProperty("qqgroup")){
            WidgetDig(this._ui, "text/qq").setString(tj.setting.qqgroup);
        }
        this.processUIVedioBtn();

        tj.wsconnection.addGrp(msgac["PayUI_refresh"], msgac["PayUI_refresh"], this.process_ac.bind(this), this.get_scene_name());
        tj.wsconnection.addGrp(msgac["PayUI_pay_fail"], msgac["PayUI_pay_fail"], this.process_ac.bind(this), this.get_scene_name());
        tj.wsconnection.addGrp(msgac["PayUI_pay_ver_ret"], msgac["PayUI_pay_ver_ret"], this.process_ac.bind(this), this.get_scene_name());
        tj.wsconnection.addGrp(msgac["PayUI_vedio"], msgac["PayUI_vedio"], this.process_ac.bind(this), this.get_scene_name());
        tj.wsconnection.addGrp(msgac["Pay_reward_ask"], msgac["Pay_reward_ask"], this.process_ac.bind(this), this.get_scene_name());
        tj.wsconnection.addGrp(msgac["Pay_reward_get"], msgac["Pay_reward_get"], this.process_ac.bind(this), this.get_scene_name());

        ChannelSDK.getInstance().requestProducts(this._bSDK.productIdData,this._bSDK.requestProductCallback.bind(this._bSDK),this._bSDK.payCallback.bind(this._bSDK));

        tj.wsconnection.setMsg(msgac["Pay_reward_ask"]);
    },

    onExit : function(){
        this._super();
        if(this._armature_busy){
            this.stop_armature_busy();
        }
        this._payListView.removeAllChildren(true);
    }
});

createGemLayer = function(parent){
    var pRet = LayerCacheMgr.getInstance().getLayer("gem");
    if(pRet.getParent() !== null){
        pRet.removeFromParent();
    }
    if (pRet){
        var z = -1;
        var childs = parent.getChildren();
        for(var i = 0; i < childs.length; ++i){
            if (childs[i].getLocalZOrder() > z)
                z = childs[i].getLocalZOrder();
        }
        pRet.setLocalZOrder(z + 1);
        pRet._tjParent = parent;
        parent.addChild(pRet);
        return pRet;
    } else if (pRet)
        delete pRet;
    return null;
};