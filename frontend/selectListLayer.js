/**
 * Created by faps on 2015/12/4.
 */


var selectListLayer = baseLayer.extend({
    _ui: null,
    _lang: null,
    _list_area: null,
    _btn_tpl: null,
    _btn_idx: 0,
    _close_btn_value: -99,
    _callback: null,
    _ui_data: {}, //传入界面配置

    /*
    //默认界面配置示例。
    //close设置为false时，不显示关闭按钮
    _ui_data: {
        title: "标题",
        close: {
            text: "关闭",
            value: -99
        },
        btns: [
            {
                text: "按钮1",
                value: "btn1"
            },{
                text: "按钮2",
                value: "btn2"
            }
        ]
    },
    /**/

    get_scene_name: function () {
        return "selectlist";
    },

    ctor : function(ui_data, callback) {
        this._super();

        this._callback = callback;
        this._ui_data = ui_data;

        this.init();
    },

    init : function() {
        if (!this._super())
            return false;

        this._ui = this.load_ui("uiSelectList.json");
        if (!this._ui)
            return false;

        //语言
        this._lang = tj.cfg.get('text/selectList');

        //标题
        var title_text = this._ui_data.title || this._lang['title'];
        WidgetDig(this._ui, "main/text").setString(title_text);

        //关闭按钮
        var close_btn = WidgetDig(this._ui, "set/btnClosed");
        if(this._ui_data.close) {
            if (cc.isObject(this._ui_data.close)) {
                if (this._ui_data.close.hasOwnProperty('value')) {
                    close_btn.setUserData(this._ui_data.close.value);
                } else {
                    close_btn.setUserData(this._close_btn_value);
                }
                if (this._ui_data.close.hasOwnProperty('text')) {
                    WidgetDig(close_btn, "text").setString(this._ui_data.close.text);
                } else {
                    WidgetDig(close_btn, "text").setString(this._lang['close']);
                }
            } else if (cc.isString(this._ui_data.close)) {
                close_btn.setUserData(this._close_btn_value);
                WidgetDig(close_btn, "text").setString(this._ui_data.close);
            } else {
                close_btn.visible = false;
            }
        }else{
            close_btn.visible = false;
        }

        //列表区
        this._list_area = WidgetDig(this._ui, "list");

        //按钮模板
        this._btn_tpl = WidgetDig(this._ui, "list/btnOption");
        var text = this._btn_tpl.getChildByName('text');
        if(text) {
            text.setAnchorPoint(cc.p(0.5, 0.5));
            text.setPositionPercent(cc.p(0.5, 0.5));
        }
        var textRes = this._btn_tpl.getChildByName('textRes');
        if(textRes) {
            textRes.setVisible(false);
        }
        this.setRetain(this._btn_tpl, 'selectListLayer_btn_tpl');
        this._btn_tpl.removeFromParent(false);
        this._btn_idx = 0;

        //生成按钮
        for(var k in this._ui_data.btns) {
            var btn = this._ui_data.btns[k];
            //cc.log('btn',k,":", btn.text, btn.value);
            this.addButton(btn.text, btn.value);
        }

        this.addChild(this._ui);
    },

    addButton : function(text, value, fontsize) {
        //生成按钮
        var btn = this._btn_tpl.clone();
        var size =  this._btn_tpl.getContentSize();
        btn.setContentSize(size);
       

        var v = value || this._btn_idx;
        btn.setUserData(v);
        this._btn_idx++;
        if (fontsize !== undefined) {
            WidgetDig(btn, "text").setFontSize(fontsize)
        }
        this.setContentString(WidgetDig(btn, "text"), text, AUTO_STR_NEWLINE);
        // WidgetDig(btn, "text").setString(text);
        this._list_area.addChild(btn);

        return btn;
    },

    defaultTouchButton : function(btn, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            if(this._callback instanceof Function) {
                var v = btn.getUserData();
                var r = this._callback(v);
                //cc.log("selectListLayer click:", typeof(v), v, "callback return:", r);
                if(r!=false) {
                    //true: close layer
                    this.removeFromParent();
                }
            }else{
                this.removeFromParent();
            }
        }
    }
});
