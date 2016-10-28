


var SrvSelectBox = baseLayer.extend({
    ctor: function(lists) {
        this._super();
        this._ui = null;
        this._tmpl = null;
        this._p_list = null;
        this._basename = "srvSelectBox";
        this.init(lists);
    },

    init: function(lists) {
        if (!this._super())
            return false;
        this._ui = this.load_ui("uiSelectServer.json");
        if (this._ui == -1)
            return true;
        if (!this._ui)
            return false;
        this.addChild(this._ui);
        this._p_list = WidgetDig(this._ui, "list");
        this._tmpl = WidgetDig(this._ui, "list/btnOption");
        if (!this._tmpl)
            return false;
        // this._tmpl.retain();
        this.setRetain(this._tmpl, "uitmpl");
        this._tmpl.removeFromParent(true);
        if (cc.tj.ACTIVE === true) {
            switch (cc.tj.PTYPE) {
                case P_TYPE_WID:
                    var BG = WidgetDig(this._ui, "BG");
                    if (BG !== null) {
                        BG.setScale(BG.getScale() / cc.tj.SCALE);
                    }
                    break;
            }
        }
        for (var i in lists) {
            var srv = lists[i];
            cc.log(srv);
            this.add_server(srv.name, srv.load, i);
        }
        return true;
    },

    add_server: function(name, load, tag) {
        var w = this._tmpl.clone();
        if (!w)
            return false;
        this._p_list.addChild(w);
        var text = WidgetDig(w, "text");
        if (text) {
            text.setString(name);
        }
        var res = WidgetDig(w, "textRes");
        if (res) {
            var str, clolor;
            if (load < 30) {
                str = tj.cfg.get("text/srvselect/free");
                color = new cc.color(0, 255, 0);
            } else if (load < 75) {
                str = tj.cfg.get("text/srvselect/normal");;
                color = new cc.color(0, 0, 0);
            } else {
                str = tj.cfg.get("text/srvselect/busy");;
                color = new cc.color(255, 0, 0);
            }
            res.setString(str);
            res.setColor(color);
        }
        w.setTag(tag);
        return true;
    },

    defaultTouchButton: function(btn, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            tj.gateMgr.select(btn.getTag());
            // 检查是否需要切换更新服务器
            if (switchUdpsrv(this, tj.gateMgr._selected.z_us)) {
                return; // 发生切换
            }
            tj.wsconnection.init();
            this.removeFromParent();
        }
    }
});