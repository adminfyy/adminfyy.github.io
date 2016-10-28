/**
 * Created by likx on 2016/10/18.
 */

var mopLootLayer = baseLayer.extend({

    ctor : function(parent){
        this._super();
        this._basename = "moploot";
    },

    init : function(data) {
        if (!this._super())
            return false;

        this._ui = this.load_ui("uiMopLoot.json");
        if (!this._ui)
            return false;
        this.addChild(this._ui);

        WidgetDig(this._ui, "main/title/text").setString(tj.cfg.get("text_on_ui/mop/reward"));
        WidgetDig(this._ui, "set/btnClosed/text").setString(tj.cfg.get("text_on_ui/mop/close"));

        WidgetDig(this._ui, "main/earnings/gold/textNum").setString(data.coin.num);
        WidgetDig(this._ui, "main/earnings/soul/textNum").setString(data.exp.num);

        var ui_list = WidgetDig(this._ui, "main/prop/list");
        var template = WidgetDig(this._ui, "main/prop/list/template");
        ui_list.removeAllChildren(true);
        for(var i=1;i<=4;i++)
            WidgetDig(template, "btnMain"+i).setVisible(false);

        var idx = 0;
        for(var i in data.equips) {
            if(idx%4 == 0){
                var v_muBan = template.clone();
                ui_list.pushBackCustomItem(v_muBan);
            }
            var equip = data.equips[i];
            var equipinfo = tj.mainData.getEquipByid(equip.id);
            var item_idx = idx % 4 + 1;
            var textName = WidgetDig(v_muBan, "btnMain" + item_idx + "/portraits/textName");
            var textNum = WidgetDig(v_muBan, "btnMain" + item_idx + "/portraits/textNum");
            var uiIcon = WidgetDig(v_muBan, "btnMain" + item_idx + "/portraits/icon");
            var uiFIcon = WidgetDig(v_muBan, "btnMain" + item_idx + "/portraits/level");
            var uiLock = WidgetDig(v_muBan, "btnMain" + item_idx + "/portraits/lock");
            var btnMain = WidgetDig(v_muBan, "btnMain" + item_idx);
            uiLock.setVisible(false);
            btnMain.id = equip.id;
            textName.setString(equipinfo.Name);
            textNum.setString("");
            uiIcon.loadTexture(equipinfo.Icon, ccui.Widget.PLIST_TEXTURE);
            uiFIcon.loadTexture(equipinfo.FrameIcon, ccui.Widget.PLIST_TEXTURE);
            WidgetDig(v_muBan, "btnMain" + item_idx).setVisible(true);
            idx++;
        }

        for(i in data.items) {
            if (idx % 4 == 0) {
                v_muBan = template.clone();
                ui_list.pushBackCustomItem(v_muBan);
            }
            var itemid = data.items[i].id;
            var iteminfo = tj.mainData.getItemInfo(itemid);
            item_idx = idx % 4 + 1;
            textName = WidgetDig(v_muBan, "btnMain" + item_idx + "/portraits/textName");
            textNum = WidgetDig(v_muBan, "btnMain" + item_idx + "/portraits/textNum");
            uiIcon = WidgetDig(v_muBan, "btnMain" + item_idx + "/portraits/icon");
            uiFIcon = WidgetDig(v_muBan, "btnMain" + item_idx + "/portraits/level");
            uiLock = WidgetDig(v_muBan, "btnMain" + item_idx + "/portraits/lock");
            btnMain = WidgetDig(v_muBan, "btnMain" + item_idx);
            btnMain.id = itemid;
            uiLock.setVisible(false);
            textName.setColor(cc.color("#FFFFFF"));
            textName.setString(iteminfo.name);
            textNum.setString("x"+data.items[i].num);
            uiIcon.loadTexture(iteminfo.icon, ccui.Widget.PLIST_TEXTURE);
            uiFIcon.loadTexture(iteminfo.frameicon, ccui.Widget.PLIST_TEXTURE);
            WidgetDig(v_muBan, "btnMain" + item_idx).setVisible(true);
            idx++;
        }
        return true;
    },


    onEnter: function(){
        this._super();
    },

    defaultTouchButton : function(btn, type) {
        if(type == ccui.Widget.TOUCH_BEGAN) {

        }else if (type == ccui.Widget.TOUCH_ENDED) {
            switch(btn.getName()){
                case "btnClosed":
                    this.set_release();
                    break;
                case "btnMain1":
                case "btnMain2":
                case "btnMain3":
                case "btnMain4":
                    this._curr_popLayer = createNoteBoxCard(this, btn.id);
                    break;
            }
        }
    }
});

function createMopLootLayer(parent, gets){
    var pRet = new mopLootLayer();
    if (pRet && pRet.init(gets)){
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
}
