/**
 * 城堡界面
 * Created by likx on 2016/1/15.
 */
var select_mode = {"event":0, "encyclopedia":1};

var castleLayer = baseLayer.extend({
    _ui: 0,
    _uievtlist : null,
    _uievtmuban : null,
    _currMode:select_mode.event,
    _eventData:null,

    ctor: function () {
        this._super();
        this._basename = "castle";
    },

    init: function () {
        if (!this._super())
            return false;
        var origin = cc.director.getVisibleOrigin();
        this._ui = this.load_ui("uiCastle.json");
        if (!this._ui)
            return false;

        this.addChild(this._ui);

        this._uievtlist = WidgetDig(this._ui, "main/list");
        this._uievtmuban = WidgetDig(this._ui, "main/list/btn");
        this.setRetain(this._uievtmuban, "uitmpl");
        this._uievtmuban.removeFromParent(true);

        this.setContentString(WidgetDig(this._ui,"main/class/btnHistory/text"), tj.cfg.get("text_on_ui/castle/thing"));
        this.setContentString(WidgetDig(this._ui,"main/class/btnEncyclopedia/text"), tj.cfg.get("text_on_ui/castle/baike"));
        this.setContentString(WidgetDig(this._ui,"set/btnClosed/text"), tj.cfg.get("text_on_ui/close"));

        WidgetDig(this._ui, "main/text/textRight").setVisible(false);
        WidgetDig(this._ui, "main/text/textLeft").setVisible(false);

        tj.wsconnection.addGrp(msgac["Event_list_home"], msgac["Event_list_home"], this.process_ac.bind(this), this.get_scene_name());
        tj.wsconnection.addGrp(msgac["Event_home_add"], msgac["Event_home_del"], this.process_ac.bind(this), this.get_scene_name());
        tj.wsconnection.addGrp(msgac["Event_end"], msgac["Event_end"], this.process_ac.bind(this), this.get_scene_name());
        tj.wsconnection.addGrp(msgac["Layer_refresh_help"], msgac["Layer_refresh_help"], this.process_ac.bind(this), this.get_scene_name());

        this.update_scene();
        this.refreshHelp();

        //清理不在事件列表中的new_c新内容标记数据
        var new_c = tj.mainData.getClientData("new_c");
        var eids = [];
        for( var i in new_c) {
            var nid = new_c[i].id;
            if (nid && this.getEvent(nid) == null)
                eids.push(nid);
            if(!nid && new_c[i])
                eids.push(new_c[i]);
        }
        if(eids.length) {
            for( var i in eids) {
                var eid = eids[i];
                tj.mainData.removeClientData("new_c", eid);
            }
            tj.mainData.sendClientData("new_c");
            tj.wsconnection.pushmsg(msgac["Main_refresh_new"]);
        }

        var new_e = tj.mainData.getClientData("new_e");
        eids = [];
        for( var i in new_e) {
            var id = new_e[i];
            if (id && this.getEncyclopedie(id) == null)
                eids.push(id);
            if(!id)
                eids.push(new_e[i]);
        }
        if(eids.length) {
            for( var i in eids) {
                var eid = eids[i];
                tj.mainData.removeClientData("new_e", eid);
            }
            tj.mainData.sendClientData("new_e");
            tj.wsconnection.pushmsg(msgac["Main_refresh_new"]);
        }

        this.refreshBtnNew();
        return true;
    },

    on_ws_reopen:function(){
        //tj.wsconnection.setMsg(msgac["Event_list_home"]);
        this.update_scene();
        this.refreshHelp();
        this.refreshBtnNew();
    },

    update_scene:function(){
        var text = WidgetDig(this._ui,"main").getChildByTag(100001);
        if(text)
            text.removeFromParent(true);
        this._uievtlist.removeAllChildren(true);
        if(this._currMode == select_mode.event) {
            if(!tj.mainData.main.homeevent_list){
                tj.wsconnection.setMsg(msgac["Event_list_home"]);
                return;
            }
            if(tj.mainData.main.homeevent_list.length == 0){
                var Text = new ccui.Text(tj.cfg.get("text/castle/empty"),tj.cfg.get("designdata/design_fontName"),25);
                WidgetDig(this._ui,"main").addChild(Text);
                Text.setPosition(cc.p(cc.winSize.width/2-50,cc.winSize.height/2));
                Text.setTag(100001);
                return;
            }
            tj.mainData.main.homeevent_list.sort(function(a,b){
                return a["id"] > b["id"];
            });
            for (var e in tj.mainData.main.homeevent_list) {
                var evt = tj.mainData.main.homeevent_list[e];
                if (evt) {
                    var isnew = tj.mainData.clientDataHave("new_c", evt.id);
                    this.add_content(evt.id, evt.name, isnew);
                }
            }
        }else if(this._currMode == select_mode.encyclopedia) {
            if(tj.mainData.main.encyclopedie.length == 0){
                Text = new ccui.Text(tj.cfg.get("text/castle/empty3"),tj.cfg.get("designdata/design_fontName"),25);
                WidgetDig(this._ui,"main").addChild(Text);
                Text.setPosition(cc.p(cc.winSize.width/2-50,cc.winSize.height/2));
                Text.setTag(100001);
            }
            tj.mainData.main.encyclopedie.sort(function(a,b){
                return a > b;
            });
            for (var i in tj.mainData.main.encyclopedie) {
                var eid = tj.mainData.main.encyclopedie[i];
                if(eid){
                    var info = tj.dbdata.getValueById("encyclopediabook", eid, "name");
                    isnew = tj.mainData.clientDataHave("new_e", eid);
                    this.add_content(eid, info, isnew);
                }
            }
        }
        this.setBtnState();
        this.setProcess();
    },

    refreshBtnNew:function(){
        WidgetDig(this._ui, "main/class/btnHistory/lock").setVisible(false);
        WidgetDig(this._ui, "main/class/btnEncyclopedia/lock").setVisible(false);
        var new_e = tj.mainData.getClientData("new_e");
        var new_c = tj.mainData.getClientData("new_c");
        if(new_e.length > 0)
            WidgetDig(this._ui, "main/class/btnEncyclopedia/lock").setVisible(true);
        if(new_c.length > 0)
            WidgetDig(this._ui, "main/class/btnHistory/lock").setVisible(true);
    },

    getEvent:function(evtid){
        if(!tj.mainData.main.homeevent_list)
            return null;
        for (var e in tj.mainData.main.homeevent_list) {
            var evt = tj.mainData.main.homeevent_list[e];
            if (evt && evt.id == evtid)
                return evt;
        }
        return null;
    },

    getEncyclopedie:function(id){
        if(!tj.mainData.main.encyclopedie)
            return null;
        for (var e in tj.mainData.main.encyclopedie) {
            var evt = tj.mainData.main.encyclopedie[e];
            if (evt == id)
                return evt;
        }
        return null;
    },

    setProcess: function () {
        var process = WidgetDig(this._ui, "main/text/textRight");
        if(this._currMode == select_mode.event) {
            process.setVisible(false);
        } else if(this._currMode == select_mode.encyclopedia) {
            process.setVisible(true);
            var maxNum = tj.dbdata._all["encyclopediabook"].length;
            var nowNum = tj.mainData.main.encyclopedie.length;
            var str = tj.cfg.get("text_on_ui/castle/process").format(nowNum.toString(), maxNum.toString());
            process.setString(str);
        }
    },

    add_content:function(id, name, isnew){
        var p2 = this._uievtmuban.clone();
        if (!p2)
            return;
        p2.setTouchEnabled(true);
        this._uievtlist.pushBackCustomItem(p2);
        WidgetDig(p2, "text").setString(name);
        WidgetDig(p2, "lock").setVisible(isnew);
        p2.evtID = id;
        p2.isnew = isnew;
    },

    refreshHelp:function(){
        if(this._helphand)
            this._helphand.stop();
        WidgetDig(this._ui,"set/btnClosed").setTouchEnabled(true);

        if(tj.mainData.isHelpDone())
            return;

        var btnHistory = WidgetDig(this._ui,"main/class/btnHistory");
        var btnEncyclopedia = WidgetDig(this._ui,"main/class/btnEncyclopedia");
        this.setBtnState();

        //新手（城堡阶段）
        if(tj.mainData.getClientData("help")[2]==0) {
            if(tj.mainData.main.homeevent_list.length == 0){
                tj.mainData.setClientDataValue("help", 2, 1);
            }else if(tj.mainData.main.manor.level > 0)
                tj.mainData.setClientDataValue("help", 2, 1);
            else{
                this.load_helphand(this, "click");
                this._helphand.setpos(375, 1100);

                var note = createNoteBox(this, tj.cfg.get("text/help/talk"), form_t.castleLayer);
                note.setPos(375, 820);

                btnHistory.setTouchEnabled(false);
                btnEncyclopedia.setTouchEnabled(false);
                btnHistory.setHighlighted(false);
                btnEncyclopedia.setHighlighted(false);
                WidgetDig(this._ui, "set/btnClosed").setTouchEnabled(false);
            }
        }
    },

    setBtnState: function () {
        var btnHistory = WidgetDig(this._ui,"main/class/btnHistory");
        var btnEncyclopedia = WidgetDig(this._ui,"main/class/btnEncyclopedia");
        if(this._currMode == select_mode.event){
            btnHistory.setTouchEnabled(false);
            btnHistory.setHighlighted(true);
            btnEncyclopedia.setTouchEnabled(true);
            btnEncyclopedia.setHighlighted(false);
        }else if(this._currMode == select_mode.encyclopedia) {
            btnHistory.setTouchEnabled(true);
            btnHistory.setHighlighted(false);
            btnEncyclopedia.setTouchEnabled(false);
            btnEncyclopedia.setHighlighted(true);
        }
    },

    process_ac : function(doc) {
        var msg_id = doc[0];
        var data = doc[1];
        switch (msg_id) {
            case msgac["Event_list_home"]:
                if(this._armature_busy) {
                    this.stop_armature_busy();
                }
                this._eventData = data;
                tj.mainData.main.homeevent_list = data;
                this.update_scene();
                this.refreshHelp();
                this.refreshBtnNew();
                break;
            case msgac["Event_end"]:
                tj.wsconnection.setMsg(msgac["Event_list_home"]);
                break;
            case msgac["Layer_refresh_help"]:
                this.refreshHelp();
                break;
            case msgac["Event_home_add"]:
                this.update_scene();
                this.refreshBtnNew();
                break;
            case msgac["Event_home_del"]:
                this.update_scene();
                this.refreshBtnNew();
                break;
            default :break;
        }
    },

    defaultTouchButton : function(btn, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            switch(btn.getName()){
                case "btnClosed":
                    this.set_release();
                    break;
                case "btn":
                    if( this._currMode == select_mode.event){
                        tj.wsconnection.setMsg(msgac["Event_start"],[btn.evtID]);
                        //新内容提示
                        if(btn.isnew){
                            tj.mainData.removeClientDataNewC(btn.evtID, 0, 0);
                            tj.wsconnection.pushmsg(msgac["Main_refresh_new"]);
                            //WidgetDig(btn, "lock").setVisible(false);
                            //btn.isnew = false;
                            this.refreshBtnNew();
                        }
                        //新手（城堡阶段2）
                        if(this._helphand)
                            this._helphand.stop();
                    } else if(this._currMode == select_mode.encyclopedia){
                        var msg = tj.dbdata.getValueById("encyclopediabook", btn.evtID, "coins");
                        if(msg){
                            var pos = btn.getParent().convertToWorldSpace(btn.getPosition());
                            var nb = createNoteBox(this, msg, form_t.castleLayer);
                            nb.transIn(N_TRANS_IN_ANI, N_TRANS_IN_TIEM, {
                                ease: N_TRANS_IN_EASE,
                                any: pos.y/cc.director.getWinSize().height
                            });
                        }
                        //新内容提示
                        if(btn.isnew){
                            tj.mainData.removeClientData("new_e", btn.evtID);
                            tj.wsconnection.pushmsg(msgac["Main_refresh_new"]);
                            WidgetDig(btn, "lock").setVisible(false);
                            btn.isnew = false;
                            this.refreshBtnNew();
                        }
                    }
                    break;
                case "btnHistory":
                    this._currMode = select_mode.event;
                    this.update_scene();
                    break;
                case "btnEncyclopedia":
                    this._currMode = select_mode.encyclopedia;
                    this.update_scene();
                    break;
            }
        }
    },

    onExit : function() {
        this._super();

        if(tj.mainData.getClientData("help")[2]==1) {
            tj.mainData.setClientDataValue("help", 2, 2);
            tj.mainData.setClientDataValue("help", 1, 1);
            tj.wsconnection.pushmsg(msgac["Main_refresh_help"]);
        }
        tj.wsconnection.pushmsg(msgac["Main_refresh_resource"]);
    }
});

createCaltleLayer = function(parent){
    var pRet = new castleLayer();
    if (pRet && pRet.init()){
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
};