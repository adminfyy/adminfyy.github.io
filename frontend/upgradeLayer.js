
/**
 * 通用升级界面
 * Created by faps on 2015/12/08.
 */
var upgradeLayer = baseLayer.extend({
    _pass_time: 0,
    _ui: null,
    _setting: null,
    _callback: null,

    ctor : function(setting, callback) {
        this._super();
        this._basename = "upgrade";
        this._setting = setting;
        this._callback = callback;
        this.init();
    },

    init : function () {
        cc.log('upgradeLayer init');

        if (!this._super()) {
            return false;
        }

        //加载ui
        this._ui = this.load_ui("cardUpgrade.json");
        if (!this._ui)
            return false;

        var ui_root = this._ui;

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

    setIcon: function(icon_path) {
        var ui_root = this._ui;
        ccui.helper.seekWidgetByName(ui_root, "icon").loadTexture(icon_path, ccui.Widget.PLIST_TEXTURE);
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


        //窗口标题
        //WidgetDig(ui_root, "main/prop/textName").setString(data.title);

        //资源图标
        this.setIcon(data.icon);

        //升级按钮
        var upgrade_btn = ccui.helper.seekWidgetByName(ui_root, "btnUpgrade");
        upgrade_btn.rn = 0;
        ccui.helper.seekWidgetByName(upgrade_btn, "text").setString(data.btn1_text);

        //使用宝石按钮
        var jewel_btn = ccui.helper.seekWidgetByName(ui_root, "btnJewel");
        jewel_btn.rn = 1;
        ccui.helper.seekWidgetByName(jewel_btn, "text").setString(data.btn2_text);

        //需要的材料
        ccui.helper.seekWidgetByName(ui_root, "textName").setString(data.need_text);

        //材料是否足够提示
        var tip_label = ccui.helper.seekWidgetByName(ui_root, "textNum");
        if(data.is_enough) {
            //提示文本
            tip_label.setString(data.enough_text);
            tip_label.color = cc.color("#00B000");

            //升级按钮状态
            upgrade_btn.color = cc.color("#FFFFFF");
            upgrade_btn.enabled = true;
        }else{
            tip_label.setString(data.not_enough_text);
            tip_label.color = cc.color("#FF0000");
            upgrade_btn.color = cc.color("#888888");
            upgrade_btn.enabled = false;
        }

        //升级成功的预期结果
        ccui.helper.seekWidgetByName(ui_root, "textUp").setString(data.result_text);

        //关闭按钮
        var close_btn = ccui.helper.seekWidgetByName(ui_root, "btnClosed");
        var close_str = "";
        if(data.close_text) {
            close_str = data.close_text;
        }else{
            close_str = tj.cfg.get("text_on_ui/close");
        }
        ccui.helper.seekWidgetByName(close_btn, "text").setString(close_str);
        close_btn.rn = 'btnClose';
    },

    onEnter : function() {
        this._super();
    },

    onExit: function() {
        this._super();
        this.unscheduleAllCallbacks();

        if(tj.mainData.getClientData("help")[3] == 3){
            tj.mainData.setClientDataValue("help", 3, 4);
            tj.wsconnection.pushmsg(msgac["Layer_refresh_help"]);
        }
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
 * @param {string} result_text 升级成功能得到什么的文本
 * @param {string} lang_segment 本地化语言，在config.json/text下的段名
 * @returns {object}
 */
upgradeLayer.buildData = function(res_id, need_num, result_text, lang_segment) {
    //cc.log("upgradeLayer.buildData:", res_id, need_num, result_text, lang_segment);

    var lang = {};
    if(lang_segment) {
        lang = tj.cfg.get("text/"+lang_segment);
    }else{
        lang = tj.cfg.get("text/upgradeLayer");
    }
    var res_data = tj.mainData.getResinfoById(res_id);
    var res_text = res_data.text;
    need_num = parseInt(need_num);
    var re = {
        title: lang['title'], //标题
        icon: "ui/icon/prop/res"+ res_data.name.toLowerCase().replace(/(\w)/, function(v) { return v.toUpperCase(); }) +".png", //图标
        btn1_text: lang['btn_1'], //按钮1
        btn2_text: lang['btn_2'], //按钮2
        close_text: lang['btn_cancel'], //取消按钮
        need_text: lang['need'].format(res_text, need_num), //需要 {资源} {num}个 的文本
        enough_text: lang['enough'].format(res_text), // + res_data.capacity, //材料足够的提示文本
        not_enough_text: lang['not_enough'].format(res_text, need_num - res_data.capacity), //材料不够的提示文本
        result_text: result_text, //lang['result'].format(result_num), //预期结果的提示文本
        is_enough: (res_data.capacity >= need_num) //材料是否足够, bool
    };

    return re;
};