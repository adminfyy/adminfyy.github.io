
/**
 * 通用使用宝石界面
 * Created by faps on 2015/12/08.
 */
var useGemLayer = baseLayer.extend({
    _pass_time: 0,
    _ui: null,
    _list_area: null,
    _btn_tpl: null,
    _btn_idx: 0,
    _setting: null,
    _callback: null,

    ctor : function(setting, callback) {
        this._super();
        this._setting = setting;
        this._callback = callback;
        this._basename = "usegem";
        this.init();
    },

    init : function () {
        cc.log('useGemLayer init');

        if (!this._super()) {
            return false;
        }

        //加载ui
        this._ui = this.load_ui("uiApprove.json");
        if (!this._ui)
            return false;

        var ui_root = this._ui;

        //列表区
        this._list_area = WidgetDig(ui_root, "list");

        //按钮模板
        this._btn_idx = 0;
        this._btn_tpl = WidgetDig(ui_root, "list/btnOption");
        this.setRetain(this._btn_tpl, 'useGem_btns');
        this._list_area.setItemModel(this._btn_tpl);
        //this._btn_tpl.removeFromParent(false);
        this._list_area.removeAllChildren();

        this.updateUI();

        this.addChild(ui_root);

        return true;
    },

    _loadData: function() {
        var re = {};
        switch(typeof(this._setting)) {
            case "object":
                re = this._setting;
                break;
            case "function":
                re = this._setting();
                break;
        }
        return re;
    },

    on_ws_reopen:function(){
        this.updateUI();
    },

    update: function() {
        this._super();
        this._pass_time++;
        if(this._pass_time % 60==0) {
            this.updateUI(); //每60帧更新一次界面
        }
        if(this._pass_time > 600) {
            this._pass_time = 0; //10秒重置计帧
        }
    },

    updateUI: function() {
        if (!this._ui)
            return false;

        var ui_root = this._ui;

        var data = this._loadData();

        var text = data.text_1;
        if(!data.is_enough) {
            text += data.text_2;
        }
        text += data.how_to_do;

        //文本
        var msg = WidgetDig(ui_root, "main/text");
        msg.setString(text);
        //msg.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
        //msg.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_TOP);


        var button_arr = this._list_area.getItems();

        //生成按钮
        if(button_arr.length!= data.btns.length) {
            this._btn_idx = 0;
            this._list_area.removeAllItems();
            for (var k in data.btns) {
                this.addButton(data.btns[k]);
            }
        }else{
            for(var i in button_arr) {
                this.updateButton(button_arr[i], data.btns[i]);
            }
        }
    },

    addButton : function(btn_data) {
        //cc.log("addbutton:", btn_data, typeof(btn_data));

        //生成按钮
        this._list_area.pushBackDefaultItem();
        var btn = this._list_area.getItem(this._list_area.childrenCount-1);
        btn.setContentSize(this._btn_tpl.getContentSize());

        this.updateButton(btn, btn_data);
        return btn;
    },

    updateButton: function(btn, btn_data) {
        if(typeof(btn_data) == "object") {
            if(btn_data.hasOwnProperty("value")){
                btn.rn = btn_data.value;
            }else{
                btn.rn = "";
            }
            WidgetDig(btn, "text").setString(btn_data.text);
            if(btn_data.disable) {
                btn.setEnabled(false);
            }
        }else if(typeof(btn_data)=="string") {
            btn.rn = this._btn_idx;
            this._btn_idx++;
            WidgetDig(btn, "text").setString(btn_data);
        }
    },

    onEnter : function() {
        this._super();
    },

    onExit: function() {
        this._super();
        this.unscheduleAllCallbacks();
    },

    defaultTouchButton : function(btn, type) {
        //cc.log("upgradeLayer: button click", btn.rn, "callback return:", r);

        switch(type) {
            case ccui.Widget.TOUCH_BEGAN: //按下
                break;

            case ccui.Widget.TOUCH_ENDED: //放开
                if(this._callback) {
                    var r = this._callback(btn.rn==undefined?"":btn.rn);
                    if(r==false) {
                        //false: 不关闭窗口
                    }else{
                        this.set_release();
                    }
                }else{
                    this.set_release();
                }
                break;

            case ccui.Widget.TOUCH_CANCELED: //取消, 按下后移出按钮区域放开
                break;
        }
    }

});


/**
 * 创建 upgradeLayer 需要的数据对象

 * @param {int} res_id manorResData 数据对象 id
 * @param {int} need_num 需要的资源数量
 * @param {float} gem_rate 宝石补齐 计算比率
 * @param {string} lang_segment 本地化语言，在config.json/text下的段名
 * @returns {object}
 */
useGemLayer.buildData = function(res_id, need_num, gem_rate, lang_segment) {
    //cc.log("upgradeLayer.buildData:", res_id, need_num, result_text);

    var lang = {};
    if(lang_segment) {
        lang = tj.cfg.get("text/"+lang_segment);
    }else{
        lang = tj.cfg.get("text/useGemLayer");
    }
    var res_data = tj.mainData.getResinfoById(res_id);
    var res_text = res_data.text;
    var text2 = '';
    need_num = parseInt(need_num);
    gem_rate = parseFloat(gem_rate);
    var btn_arr = [];
    var gem_num_1 = Math.ceil(need_num / gem_rate);
    var gem_num_2 = 0;
    var is_enough = false;

    btn_arr.push({text: lang['btn_1'].format(gem_num_1), value: 0}); //直接升级按钮
    if(res_data.capacity<need_num) {
        gem_num_2 = Math.ceil((need_num - res_data.capacity) / gem_rate);
        is_enough = false;
        if(gem_num_1 == gem_num_2) {
            //补齐资源和直接升级 使用一样多的宝石，这种情况不再显示补齐按钮
        } else {
            text2 = lang['text_2'].format(res_text, (need_num - res_data.capacity), gem_num_2);
            btn_arr.push({text: lang['btn_2'].format(gem_num_2), value: 1}); //补齐资源按钮
        }
    }else{
        is_enough = true;
    }
    btn_arr.push({text: lang['btn_cancel'], value: 2}); //取消按钮
    //cc.log("upgradeLayer.buildData: gem2=", (need_num - res_data.capacity) / gem_rate);

    var re = {
        is_enough: is_enough , //资源是否足够
        text_1: lang['text_1'].format(gem_num_1), //全额使用宝石升级的说明
        text_2: text2, //使用宝石补齐资源的说明
        how_to_do: lang['how_to_do'], //要怎么做文本
        btns: btn_arr
    };

    return re;
};
//更换货物批次
useGemLayer.buildCoinOrGemData = function(refreshInfo) {
    //cc.log("upgradeLayer.buildData:", res_id, need_num, result_text);
    var lang = tj.cfg.get("text/useCoinOrGem");

    var val1 = refreshInfo.coinCost;
    var val2 = refreshInfo.gemCost;
    var res_data = tj.mainData.getCoinNum();

    var btn_arr = [];
    var text = lang['btn_1'];
    btn_arr.push({text: lang['btn_1'].format(val1), value: 0}); //金币
    btn_arr.push({text: lang['btn_2'].format(val2), value: 1}); //宝石
    btn_arr.push({text: lang['btn_cancel'], value: 2}); //取消按钮

    var is_enough = true;
    if(res_data < val1)
        is_enough = false;

    var re = {
        is_enough: is_enough , //资源是否足够
        text_1: lang['text_1'], //
        text_2: "", //
        how_to_do: lang['text_101'], //要怎么做文本
        btns: btn_arr
    };
    return re;
};

useGemLayer.buildCemeteryData = function(refreshInfo) {
    //cc.log("upgradeLayer.buildData:", res_id, need_num, result_text);
    var lang = tj.cfg.get("text/useCemetery");

    var name = refreshInfo.name;
    var val1 = refreshInfo.num;
    var str = name + val1.toString();

    var btn_arr = [];
    var text = lang['btn_1'];
    btn_arr.push({text: lang['btn_1'].format(str), value: 0}); //复活
    btn_arr.push({text: lang['btn_2'], value: 1}); //埋葬
    btn_arr.push({text: lang['btn_cancel'], value: 2}); //取消按钮

    var re = {
        is_enough: true , //资源是否足够
        text_1: lang['text_1'], //
        text_2: lang['how_to_do'], //
        how_to_do: lang['how_to_do'], //要怎么做文本
        btns: btn_arr
    };
    return re;
};
//埋葬再次确认界面
useGemLayer.buildCemeterySureData = function() {
    //cc.log("upgradeLayer.buildData:", res_id, need_num, result_text);
    var lang = tj.cfg.get("text/makeForSure");

    var btn_arr = [];
    btn_arr.push({text: lang['btn_1'], value: 0}); //复活
    btn_arr.push({text: lang['btn_cancel'], value: 1}); //埋葬

    var re = {
        is_enough: true , //资源是否足够
        text_1: lang['text_1'], //
        text_2: lang['how_to_do'], //
        how_to_do: lang['how_to_do'], //要怎么做文本
        btns: btn_arr
    };
    return re;
};
//扔东西再次确认界面
useGemLayer.buildDropItemSureData = function () {
    var lang = tj.cfg.get("text/makeForSureDrop");

    var btn_arr = [];
    btn_arr.push({text: lang['btn_1'], value: 0}); //确认
    btn_arr.push({text: lang['btn_cancel'], value: 1}); //取消

    var re = {
        is_enough: true , //资源是否足够
        text_1: lang['text_1'], //
        text_2: lang['how_to_do'], //
        how_to_do: lang['how_to_do'], //要怎么做文本
        btns: btn_arr
    };
    return re;
};
//拆装备再次确认界面
useGemLayer.buildBreakEquipSureData = function () {
    var lang = tj.cfg.get("text/makeForSureBreakEquip");

    var btn_arr = [];
    btn_arr.push({text: lang['btn_1'], value: 0}); //确认
    btn_arr.push({text: lang['btn_cancel'], value: 1}); //取消

    var re = {
        is_enough: true , //资源是否足够
        text_1: lang['text_1'], //
        text_2: lang['how_to_do'], //
        how_to_do: lang['how_to_do'], //要怎么做文本
        btns: btn_arr
    };
    return re;
};