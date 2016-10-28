/**
 * Created by likx on 2016/10/14.
 */

var pvpHistoryLayer = baseLayer.extend({
    _ui: 0,
    _p_list : null,
    _p_muban : null,

    ctor: function (cb) {
        this._super();
        this._basename = "pvphistory";
    },

    init: function () {
        if (!this._super())
            return false;
        this._ui = this.load_ui("boxHistory.json");
        if (!this._ui)
            return false;
        this.addChild(this._ui);

        this._p_list = WidgetDig(this._ui, "list");
        this._p_muban = WidgetDig(this._ui, "list/btnOption");
        this.setRetain(this._p_muban, "uitmpl");
        this.setRetain(this._p_list, "uitmpl");
        this._p_list.removeAllChildren(true);

        WidgetDig(this._ui, "main/text").setString(tj.cfg.get("text_on_ui/pvp/record"));
        WidgetDig(this._ui, "set/btnClosed/text").setString(tj.cfg.get("text_on_ui/close"));

        tj.wsconnection.addGrp(msgac["Arena_querylogs"], msgac["Arena_querylogs"], this.process_ac.bind(this), this.get_scene_name());
        tj.wsconnection.setMsg(msgac["Arena_querylogs"]);

        return true;
    },

    onEnter: function() {
        this._super();

    },

    onExit: function() {
        this._super();
    },

    defaultTouchButton : function(btn, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            switch(btn.getName()) {
                case "btnClosed":
                    this.set_release();
                    break;
            }
        }
    },

    process_ac : function(doc) {
        var msg_id = doc[0];
        var data = doc[1];
        switch (msg_id) {
            case msgac["Arena_querylogs"]:
                if(data.length == 0){
                    var Text = new ccui.Text(tj.cfg.get("text/pvp/nodata"),tj.cfg.get("designdata/design_fontName"),32);
                    this._ui.addChild(Text);
                    Text.setPosition(cc.p(cc.winSize.width/2, cc.winSize.height/2));
                    return;
                }
                for(var i in data){
                    var info = data[i];
                    var p2 = this._p_muban.clone();
                    if (!p2)
                        return false;
                    this._p_list.pushBackCustomItem(p2);

                    for(var k=1; k<=4;k++)
                        WidgetDig(p2, "hero/btnMain" + k).setVisible(false);

                    var name = info.TNick + "\n" + tj.cfg.get("text/pvp/point2").format(info.Tpoint);
                    WidgetDig(p2, "name").setString(name);
                    var result = "";
                    WidgetDig(p2, "BGDONE").setVisible(false);
                    switch (info.Result)
                    {
                        case 0:
                            WidgetDig(p2, "BGDONE").setVisible(true);
                            result = tj.cfg.get("text/fight/victory");
                            break;
                        case 1:
                            result = tj.cfg.get("text/fight/draw");
                            break;
                        case 2:
                            result = tj.cfg.get("text/fight/lost");
                            break;
                    }
                    WidgetDig(p2, "state").setString(result);

                    for(var j in info.Tteam){
                        var hero = info.Tteam[j];
                        WidgetDig(p2, "hero/btnMain"+(parseInt(j)+1)).setVisible(true);
                        WidgetDig(p2, "hero/btnMain"+(parseInt(j)+1)).setTouchEnabled(false);
                        var p3 = WidgetDig(p2, "hero/btnMain"+(parseInt(j)+1)+"/portraits");
                        var row = tj.dbdata.getrow("racetemplate", hero[1]);
                        if(row){
                            var ratings = row["ratings"];
                            var frameIcon = "ui/icon/iconLevel" + ratings + ".png";
                            WidgetDig(p3, "level").loadTexture(frameIcon, ccui.Widget.PLIST_TEXTURE);
                            var headPortraitIcon = row["protraits"];
                            if (!headPortraitIcon)
                                var portraits = "ui/icon/iconUnlock.png";
                            else
                                portraits = "ui/icon/heros/" + headPortraitIcon;
                            WidgetDig(p3, "icon").loadTexture(portraits, ccui.Widget.PLIST_TEXTURE);
                        }
                        row = tj.dbdata.getrow("job", hero[2]);
                        if(row) {
                            var jobLv = row["jobLv"];
                            var starIcon = "ui/icon/iconStar" + jobLv + ".png";
                            WidgetDig(p3, "star").loadTexture(starIcon, ccui.Widget.PLIST_TEXTURE);
                            WidgetDig(p3, "occ").setString(row.name);
                        }
                    }
                }
                break;
        }
    }
});

function createPvpHistoryLayer(parent){
    var pRet = new pvpHistoryLayer();
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
};