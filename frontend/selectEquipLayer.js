/**
 * Created by likx on 2015/12/2.
 */


var selectEquipLayer = baseLayer.extend({
    _ui: 0,
    _ui_list: null,
    _template: null,
    _heroInfo: null,
    _cb: null,
    _chageHeroID: 0,
    _type: 0,
    _slot:0,
    _is_camp:false,
    _chageEqipID:0,

    ctor: function (type, is_camp, slot, cb, chageEqipID, chageHeroID) {
        this._super();
        this._basename = "selectequip";
        this._beTop = false;
        this._cb = cb;
        this._type = type;
        this._slot = slot;
        this._is_camp = is_camp;
        this._chageEqipID = chageEqipID;
        this._chageHeroID = chageHeroID;
    },

    init: function () {
        if (!this._super())
            return false;
        this._ui = this.load_ui("uiSelectProp.json");
        if (!this._ui)
            return false;
        this.addChild(this._ui);

        WidgetDig(this._ui, "set/btnCancel").setVisible(false);
        var btnClose =  WidgetDig(this._ui, "set/btnClosed");
        var visibleSize = cc.director.getVisibleSize();
        var origin = cc.director.getVisibleOrigin();
        var centerX = origin.x + visibleSize.width/2 - 20;
        var centerY = btnClose.getPosition().y;
        btnClose.setPosition(centerX, centerY);

        this._ui_list = WidgetDig(this._ui, "main/list");
        this._template = WidgetDig(this._ui, "main/list/template");
        this.setRetain(this._template, "uitmpl");
        this._template.removeFromParent(false);

        for(var i=1;i<=4;i++)
            WidgetDig(this._template, "btnMain"+i).setVisible(false);

        return this.refresh_equip();
    },

    refresh_equip:function(){
        var equips = tj.mainData.getStorageEquipsByType(this._type);
        if(this._is_camp)
            equips = tj.mainData.getBagEquipByType(this._type);
        if(equips.length == 0)
            return false;

        this._ui_list.removeAllChildren(true);
        var idx = 0;
        for(var id in equips) {
            if(idx%4 == 0){
                var v_muBan = this._template.clone();
                this._ui_list.pushBackCustomItem(v_muBan);
            }

            var equip = equips[id];
            var item_idx = idx % 4 + 1;
            var textName = WidgetDig(v_muBan, "btnMain" + item_idx + "/portraits/textName");
            var textNum = WidgetDig(v_muBan, "btnMain" + item_idx + "/portraits/textNum");
            var uiIcon = WidgetDig(v_muBan, "btnMain" + item_idx + "/portraits/icon");
            var uiFIcon = WidgetDig(v_muBan, "btnMain" + item_idx + "/portraits/level");
            var btnMain = WidgetDig(v_muBan, "btnMain" + item_idx);
            btnMain.equipID = equip.id;
            textName.setString(equip.Name);
            textNum.setString("");
            uiIcon.loadTexture(equip.Icon, ccui.Widget.PLIST_TEXTURE);
            uiFIcon.loadTexture(equip.FrameIcon, ccui.Widget.PLIST_TEXTURE);
            WidgetDig(v_muBan, "btnMain" + item_idx).setVisible(true);
            idx++;
        }
        return true;
    },

    defaultTouchButton : function(btn, type) {
        if (type == ccui.Widget.TOUCH_ENDED){
            switch (btn.getName()) {
                case "btnClosed":
                    this.set_release();
                    break;
                case "btnMain1":
                case "btnMain2":
                case "btnMain3":
                case "btnMain4":
                    createNoteBoxCard(this, btn.equipID, box_card_from_t.selectequip, this.on_equip_select.bind(this),
                        {change_eid : this._chageEqipID, heroid : this._chageHeroID});
                    break;
            }
        }
    },

    on_equip_select:function(equip_id){
        this._cb(equip_id, this._slot);
        this.set_release();
    }
});

function createEquipSelect(parent, is_camp, type, slot, cb, chageEqipID, chageHeroID) {
    var pRet = new selectEquipLayer(type, is_camp, slot, cb, chageEqipID, chageHeroID);
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
    } else if (pRet) {
        delete pRet;
        return false;
    }
    return true;
}
