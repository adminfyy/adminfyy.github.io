/**
 * Created by likx on 2015/12/21.
 */


var selectMapLayer = baseLayer.extend({
    _ui: 0,
    _p_xuanxiang: null,
    _tmpl: null,
    _cb: null,

    ctor: function (f) {
        this._super();
        this._basename = "selectmap";
        this._cb = f;
    },

    init: function () {
        if (!this._super())
            return false;
        this._ui = this.load_ui("uiSelectList.json");
        if (!this._ui)
            return false;
        this.addChild(this._ui);

        this._p_xuanxiang = WidgetDig(this._ui, "list");
        this._tmpl = WidgetDig(this._ui, "list/btnOption");
        this.setRetain(this._tmpl, "uitmpl");
        this._p_xuanxiang.removeAllChildren(true);

        WidgetDig(this._ui, "main/text").setString(tj.cfg.get("text/team/selectmap"));
        WidgetDig(this._ui, "set/btnClosed/text").setString(tj.cfg.get("text_on_ui/return"));

        tj.wsconnection.addGrp(msgac["Map_list"], msgac["Map_list"], this.process_ac.bind(this), this.get_scene_name());
        tj.wsconnection.addGrp(msgac["Verify_punish"], msgac["Verify_punish"], this.process_ac.bind(this), this.get_scene_name());
        tj.wsconnection.setMsg(msgac["Map_list"]);
        if(this._armature_busy) {
            this._armature_busy.stop_armature_busy();
        } else {
            this.load_armature_busy();
        }
        return true;
    },

    process_ac : function(doc) {
        var msg_id = doc[0];
        var data = doc[1];
        switch (msg_id) {
            case msgac["Map_list"]:
                if(this._armature_busy) {
                    this.stop_armature_busy();
                }
                if (Array.isArray(data.maplist)) {
                    data.maplist.sort(function(a,b){
                        return a - b;
                    });
                    this._p_xuanxiang.removeAllChildren(true);
                    for (var i in data.maplist) {
                        var mapid = data.maplist[i];
                        var p2 = this._tmpl.clone();
                        if (!p2)
                            return false;
                        this._p_xuanxiang.pushBackCustomItem(p2);

                        var size = this._tmpl.getContentSize();
                        p2.setContentSize(size);
                        p2.mapid = mapid;

                        var name = + mapid + "· " + tj.dbdata.getValueById("mapunlock", mapid, "name") + "  " ;
                        var s_cost = tj.dbdata.getValueById("mapunlock", mapid, "staminaCost");
                        var f_cost = tj.dbdata.getValueById("mapunlock", mapid, "consume");
                        var staminaCost = tj.cfg.get("text_on_ui/team/sp1").format(s_cost, f_cost);
                        WidgetDig(p2, "text").setString(name);
                        WidgetDig(p2, "textRes").setString(staminaCost);
                    }
                }
                break;
            case msgac["Verify_punish"]:
                this.set_release();
                break;
        }
    },

    defaultTouchButton : function(btn, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            if (btn.getName() == "btnClosed"){
                this.set_release();
            }
            else if(btn.getName() == "btnOption")
            {
                this._cb(btn.mapid);
            }
        }
    },
});

function createMapSelect(parent, f) {
    var pRet = new selectMapLayer(f);
    if (pRet && pRet.init()) {
        var z = -1;
        var childs = parent.getChildren();
        for (var i = 0; i < childs.length; ++i) {
            if (childs[i].getLocalZOrder() > z)
                z = childs[i].getLocalZOrder();
        }
        pRet.setLocalZOrder(9999999);
        pRet._tjParent = parent;
        parent.addChild(pRet);
        return pRet;
    } else if (pRet)
        delete pRet;
    return null;
}
