/**
 * Created by likx on 2016/8/27.
 */
/**
 * Created by lkx on 2016/1/6.
 *
 */

var cardEventLayer;
cardEventLayer = baseLayer.extend({
    _ui: 0,
    _uiTextTile: null,
    _uiTextContent: null,
    _uiBtnList: null,
    _uiBtnTemple: null,
    _name_evn: null,
    _progress: null,
    _evinfo: null,
    _teamView: null,
    _teamViewVisible: false,
    _teamViewParent: null,
    _eventData:null,

    ctor: function () {
        this._super();
        this._basename = "cardevent";
        this.init();
    },

    init: function () {
        if (!this._super())
            return false;

        this._ui = this.load_ui("cardEvent.json");
        if (!this._ui)
            return false;
        this.addChild(this._ui);

        this._uiTextTile = WidgetDig(this._ui, "main/task/explain/textName");
        this._uiTextSubhead = WidgetDig(this._ui, "main/task/explain/textSubhead");
        this._uiTextContent = WidgetDig(this._ui, "main/task/explain/text");
        this._uiBtnList = WidgetDig(this._ui, "main/list");
        this._uiBtnTemple = WidgetDig(this._ui, "main/list/btnOption");
        this.setRetain(this._uiBtnTemple, "uitmpl");
        this._uiBtnList.removeAllChildren();

        return true;
    },

    setData:function(data){
        if(data){
            this._eventData = data;
            this.start_event();
        }

        WidgetDig(this._ui, "BG/field").setVisible(false);
        if (tj.isInMap && Team_Box){
            Team_Box.show(true);
            WidgetDig(this._ui, "BG/field").setVisible(true);
        }
    },

    onEnter:function(){
        this._super();
        this.show(true);
    },

    onExit:function(){
        this._super();

        if(Team_Box)
            Team_Box.show();
    },

    show: function (h) {
        WidgetDig(this._ui, "main").setVisible(h);
        WidgetDig(this._ui, "title").setVisible(h);
    },

    executeAction:function(){
        if(this._curr_popLayer && this._curr_popLayer.get_scene_name() == "loadingbox"){
            this._curr_popLayer.execute();
            this._curr_popLayer = null;
        }
    },

    start_event: function () {
        if (this._curr_popLayer) {
            this._curr_popLayer.set_release();
            this._curr_popLayer = null;
        }
        this.show(true);

        this.refresh_evinfo();
    },

    func_action: function (data) {
        if (this._curr_popLayer) {
            this._curr_popLayer.set_release();
            this._curr_popLayer = null;
        }

        if(data.hasOwnProperty("goto_comment")){
            var top = Main_Layer;
            if(tj.isInMap) {
                top = Map_Layer;
            }
            createCommentLayer(top,data.goto_comment);
            return;
        }

        if (data.hasOwnProperty("evninfo") && !data.hasOwnProperty("wait_action")){
            this._eventData = data.evninfo;
            this.refresh_evinfo();
        }

        if (data.del) {
            for (var i in data.del) {
                var item = data.del[i];
                var itemname = tj.mainData.getItemName(item.id);
                createMainNoticeBox(tj.cfg.get("text/event/itemSub").format(itemname, item.d));
                if (item.pos == -1)
                    tj.mainData.setItemNumToBag(item.id, item.num);
                else if (item.pos == 0)
                    tj.mainData.setItemNum(item.id, item.num);
            }
            tj.wsconnection.pushmsg(msgac["Main_refresh_resource"]);
            this.refresh_evinfo();
        }

        if (data.hasOwnProperty("exp")) {
            createMainNoticeBox(tj.cfg.get("text/event/exp").format(data.exp.d));
            tj.mainData.getTavern().Exp = data.exp.left;
        }

        if (data.hasOwnProperty("unread")) {
            if(data.unread.id_dlg == 0)
                data.unread.opt_idx = 0;
            tj.mainData.addClientDataNewC({"id":data.unread.id, "id_dlg":data.unread.id_dlg, "opt_idx":data.unread.opt_idx});
            tj.wsconnection.pushmsg(msgac["Main_refresh_new"]);
        }

        if (data.hasOwnProperty("wait_action")) {
            switch (data.wait_action.Id) {
                case 18:
                    var text = data.wait_action.Param.P0;
                    var time = data.wait_action.Param.P1;
                    this._curr_popLayer = createLoadingBoxLayer(this, text, time, this.callbackLoading.bind(this));
                    this.show(false);
                    break;
                case 21:
                    text = data.wait_action.Param.P0;
                    var backcity = data.wait_action.Param.P1;
                    if (backcity)
                        Map_Layer._curr_popLayer = createPlotBox(Map_Layer, text,this.callbackPlotBox.bind(this));
                    else
                        this._curr_popLayer = createPlotBox(this, text, this.callbackPlotBox2.bind(this));
                    if (Team_Box)
                        Team_Box.hide();
                    break;
                case 25:
                    text = data.wait_action.Param.P0;
                    createMainNoticeBox(text);
                    tj.wsconnection.setMsg(msgac["Event_func_next"]);
                    break;
                case 14:
                    this._curr_popLayer = createCardMonsterLayer(this, data.moninfos, 0, this.callbackMonster.bind(this));
                    if (Team_Box)
                        Team_Box.hide();
                    break;
                case 28:
                    this._curr_popLayer = createCardEventPage(this, data.wait_action.Param.P0, this._name_evn, this._progress);
                    this.show(false);
                    break;
            }
        }
    },

    refresh_evinfo: function () {
        var ev_info = this._eventData;
        this._uiTextTile.setString(ev_info.name_dlg);
        if (ev_info.progress) {
            var text = tj.cfg.get("text_on_ui/event/pross").format(ev_info.name_evn, ev_info.progress);
            this.setContentString(this._uiTextSubhead, text);
            this._uiTextSubhead.setVisible(true);
            this._name_evn = ev_info.name_evn;
            this._progress = ev_info.progress;
        } else
            this._uiTextSubhead.setVisible(false);

        var str_content = "";
        for (var i in ev_info.content) {
            var content = ev_info.content[i];
            str_content += content + "\n";
        }
        this._uiTextContent.setString(str_content);
        //this._uiTextContent.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_TOP);

        this._uiBtnList.removeAllChildren();
        var opt_idxs = [];
        for (i in ev_info.option) {
            var option = ev_info.option[i];
            var w = this._uiBtnTemple.clone();
            if (!w)
                continue;
            this._uiBtnList.pushBackCustomItem(w);

            var option_title = option.title;
            if (option.use) {
                var itemname = tj.mainData.getItemName(option.use);
                var itemcount = 0;
                var valuables = tj.mainData.isItemValuables(option.use);
                if (tj.isInMap && !valuables)
                    itemcount = tj.mainData.getBagItemNum(option.use);
                else
                    itemcount = tj.mainData.getItemNum(option.use);
                if (itemcount < 0)
                    itemcount = 0;
                var opiton_item = tj.cfg.get("text_on_ui/event/optionItem").format(itemname, itemcount, option.use_num);
                option_title += "\n" + opiton_item;
            }
            WidgetDig(w, "text").setString(option_title);
            w.opt_idx = option.opt_idx;
            w.id_evn = ev_info.id_evn;
            w.id_dlg = ev_info.id_dlg;
            WidgetDig(w, "lock").setVisible(false);
            if(tj.mainData.clientDataHaveNewC(w.id_evn, w.id_dlg, w.opt_idx)){
                WidgetDig(w, "lock").setVisible(true);
                w.isnew = true;
            }
            opt_idxs.push(option.opt_idx);
        }

        if(opt_idxs.length)
            tj.mainData.clearClinetDataNewCByEvtOption(ev_info.id_evn, ev_info.id_dlg, opt_idxs);

        if(ev_info.option || ev_info.content)
            this.show(true);
    },

    callbackLoading: function () {
        tj.wsconnection.setMsg(msgac["Event_func_next"]);
        //this.show(false);
        this._curr_popLayer = null;
    },

    callbackMonster: function () {
        tj.wsconnection.setMsg(msgac["Event_func_next"]);
        this._curr_popLayer = null;
    },

    callbackPlotBox: function () {
        tj.wsconnection.setMsg(msgac["Event_func_next"]);
        this._curr_popLayer = null;
        return false;
    },

    callbackPlotBox2: function () {
        tj.wsconnection.setMsg(msgac["Event_func_next"]);
        this._curr_popLayer = null;
        this.show(false);
        return true;
    },

    defaultTouchButton: function (btn, type) {
        var that = this;
        if (type == ccui.Widget.TOUCH_ENDED) {
            switch (btn.getName()) {
                case "btnOption":
                    tj.wsconnection.setMsg(msgac["Event_option"], btn.opt_idx);
                    if(btn.isnew){
                        tj.mainData.removeClientDataNewC(btn.id_evn, btn.id_dlg, btn.opt_idx);
                        tj.wsconnection.pushmsg(msgac["Main_refresh_new"]);
                        tj.wsconnection.pushmsg(msgac["Layer_refresh_help"]);
                    }
                    var btns = this._uiBtnList.getItems();
                    for (var i in btns) {
                        var b = btns[i];
                        b.setEnabled(false);
                    }
                    break;
            }
        }
    },

    option_failed: function (data) {
        if (data.ret == 10) {
            var lack = data.p.lack;
            var itemname = tj.mainData.getItemName(lack.id);
            this.noticetext_add(tj.cfg.get("text/event/not_enough").format(itemname, lack.num));
        }
        var btns = this._uiBtnList.getItems();
        for (var i in btns) {
            var b = btns[i];
            b.setEnabled(true);
        }
    }
});


function createCardEventLayer(parent, data) {
    if(!parent)
        return null;
    var pRet = LayerCacheMgr.getInstance().getLayer("cardevent");
    if(pRet){
        pRet.setData(data);
        var bAdd = false;
        if(pRet.getParent() == null)
            bAdd = true;
        else if(pRet.getParent() != parent){
            pRet.removeFromParent();
            bAdd = true;
        }
        if (bAdd) {
            var z = -1;
            var childs = parent.getChildren();
            for (var i = 0; i < childs.length; ++i) {
                if (childs[i].getLocalZOrder() > z)
                    z = childs[i].getLocalZOrder();
            }
            pRet.setLocalZOrder(z+1);
            pRet._tjParent = parent;
            parent.addChild(pRet);
        }
        pRet.setData(data);
        return pRet;
    }
    return null;
}
