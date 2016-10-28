/**
 * Created by fudq on 2015/11/24.
 */


var selectLayer = baseLayer.extend({
    _Type:0,
    _p:null,
    _ui:0,
    _cb:null,
    _formBtnIndex:0,
    _template:null,
    _ui_list: null,

    ctor : function(){
        this._super();
        this._basename = "select";
        this._beTop = false;
        return true;
    },

    init : function (parent, type, cb, index) {
        this._p = parent;
        this._Type = type;
        this._cb = cb;
        this._formBtnIndex = index;

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

        this.initScene();

        return this.initItem();
    },

    initScene: function () {
        this._ui_list = WidgetDig(this._ui, "main/list");
        this._template = WidgetDig(this._ui, "main/list/template");
        //this.setRetain(this._template, "uitmpl");
        for(var i=1;i<=4;i++)
            WidgetDig(this._template, "btnMain"+i).setVisible(false);
        this._template.removeFromParent(false);
    },

    initItem: function () {
        var itemList = this.getItemByType(this._Type);
        if(itemList.length == 0){
            return false;
        }

        this._ui_list.removeAllChildren(true);
        var idx = 0;
        for(var i = 0; i < itemList.length; i++){
            var num = tj.mainData.getItemNum(itemList[i]["id"]);
            if(num <= 0)
                continue;

            if(idx%4 == 0){
                var v_muBan = this._template.clone();
                this._ui_list.pushBackCustomItem(v_muBan);
            }

            var item_idx = idx % 4 + 1;
            var textName = WidgetDig(v_muBan, "btnMain" + item_idx + "/portraits/textName");
            var textNum = WidgetDig(v_muBan, "btnMain" + item_idx + "/portraits/textNum");
            var uiIcon = WidgetDig(v_muBan, "btnMain" + item_idx + "/portraits/icon");
            var btnMain = WidgetDig(v_muBan, "btnMain" + item_idx);
            btnMain.itemID = itemList[i]["id"];
            textName.setString(itemList[i]["name"]);
            textNum.setString("x"+num);
            var icon = tj.mainData.getItemIcon(itemList[i]["id"]);
            uiIcon.loadTexture(icon, ccui.Widget.PLIST_TEXTURE);
            var frameicon = tj.mainData.getItemFrameIcon(itemList[i]["id"]);
            if(frameicon)
                WidgetDig(v_muBan, "btnMain" + item_idx + "/portraits/level").loadTexture(frameicon, ccui.Widget.PLIST_TEXTURE);

            WidgetDig(v_muBan, "btnMain" + item_idx).setVisible(true);
            idx++;
        }
        return true;
    },

    getItemByType: function (type) {
        var tempList = [];
        for(var id in tj.mainData.getStorage_item()){
            if(tj.mainData.getStorage_item().id <= 0)
                continue;
            var itemInfo = tj.mainData.getItemInfo(id);
            if (itemInfo.type == type)
                tempList.push(itemInfo);
        }
        return tempList;
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
                    this.on_select(btn.itemID);
                    //this._curr_popLayer = createNoteBoxCard(this, btn.itemID, box_card_from_t.selectitem, this.on_select.bind(this));
                    break;
            }
        }
    },

    on_select:function(itemid){
        this._cb(itemid, this._formBtnIndex, this._Type);
        this.set_release();
    }
});

createSelectLayer = function (parent, type, cb, index) {
    var pRet = new selectLayer();
    if (pRet && pRet.init(parent, type, cb, index)){
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