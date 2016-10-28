/**
 * Created by likx on 2016/6/20.
 */
var trophyLayer = baseLayer.extend({
    _ui: 0,
    _uievtlist: null,
    _uievtmuban: null,
    _currMode: select_mode.event,
    _eventData: null,
    _mubanList:[],
    _grops:{},

    ctor: function () {
        this._super();
        this._basename = "trophy";
        this._mubanList = [];
        this._grops = {};
    },

    init: function () {
        if (!this._super())
            return false;
        var origin = cc.director.getVisibleOrigin();
        this._ui = this.load_ui("uiAchievement.json");
        if (!this._ui)
            return false;

        this.addChild(this._ui);

        this._uievtlist = WidgetDig(this._ui, "main/list");
        this._uievtmuban = WidgetDig(this._ui, "main/list/template");
        this.setRetain(this._uievtmuban, "uitmpl");
        this._uievtlist.removeAllChildren();

        var rows = tj.dbdata.gettable("trophy");
        for (var i in rows) {
            var row = rows[i];
            var grp = row.grp;
            if(this._grops.hasOwnProperty(grp))
                this._grops[grp].push(row.id);
            else{
                this._grops[grp] = [];
                this._grops[grp].push(row.id)
            }
        }

        this.refreshTrophy();

        tj.wsconnection.addGrp(msgac["Infosbank_get"], msgac["Infosbank_get"], this.process_ac.bind(this), this.get_scene_name());
        return true;
    },

    refreshTrophy:function(){
        this._mubanList = [];
        for (var grp in this._grops) {
            var v_muBan = this._uievtmuban.clone();
            this._uievtlist.pushBackCustomItem(v_muBan);
            v_muBan.grp = grp;
            this.refresh_muban(v_muBan);
            this._mubanList.push(v_muBan);
        }
    },

    refresh_muban:function(v_muBan){
        var textName = WidgetDig(v_muBan, "btnMain/text/textName");
        var textExplain = WidgetDig(v_muBan, "btnMain/text/textExplain");
        var portraits = WidgetDig(v_muBan, "btnMain/portraits");
        WidgetDig(v_muBan, "btnMain/SP").setEnabled(false);
        portraits.setVisible(false);
        WidgetDig(v_muBan, "lock").setVisible(false);
        var grp_ids = this._grops[v_muBan.grp];
        var tr = null;
        var tid = 0;
        var grpAllGet = true;
        for(var i in grp_ids){
            tid = grp_ids[i];
            tr = this.getTrophyReach(tid);
            if(tr){
                if(!tr.get) {
                    grpAllGet = false;
                    break;
                }
            }else {
                grpAllGet = false;
                break;
            }
        }
        var row = tj.dbdata.getrow("trophy", tid);
        this.setContentString(textName, row.name);
        var paceMax = row.val1;
        switch (row.type){
            case 1:
            case 2:
                paceMax = 1;
                break;
            case 4:
                paceMax = row.val2;
                break;
        }
        var pace = this.getTropPace(row.type, row.val1);
        if(row.grp == 2){  //招募工匠 特殊处理
            paceMax *= 5;
            pace *= 5;
        }
        this.setContentString(textExplain, row.info);
        var paceText = WidgetDig(v_muBan, "btnMain/SP/text");
        paceText.setString(tj.cfg.get("text_on_ui/castle/process").format(pace, paceMax));

        var pacePercent = (pace/paceMax*100) || 0;
        pacePercent = Math.min(pacePercent,100);
        WidgetDig(v_muBan, "btnMain/SP/bar").setPercent(pacePercent);
        WidgetDig(v_muBan, "btnMain/done").setVisible(grpAllGet);
        var textColor = cc.color(255,255,255);
        if(grpAllGet){
            textColor = cc.color(255,165,0,0);
            paceText.setString(tj.cfg.get("text/trophy/grpAllGet"));
        }
        textName.setColor(textColor);
        textExplain.setColor(textColor);

        if(tr && !tr.get){
            portraits.setVisible(true);
            portraits.tid = tid;
            var icon = tj.mainData.getItemIcon(10);
            var num = row.coin;
            if(row.gem > 0) {
                icon = tj.mainData.getItemIcon(11);
                num = row.gem;
            }
            WidgetDig(v_muBan, "btnMain/portraits/icon").loadTexture(icon, ccui.Widget.PLIST_TEXTURE);
            WidgetDig(v_muBan, "btnMain/portraits/text").setString("x"+num);
        }
        WidgetDig(v_muBan, "btnMain").trophyID = tid;
    },

    on_ws_reopen:function(){
        this.refreshTrophy();
    },

    get_trophy_muban:function(tid){
        var tgrp = 0;
        for (var grp in this._grops) {
            var grp_ids = this._grops[grp];
            for(var i in grp_ids) {
                if (tid == grp_ids[i]) {
                    tgrp = grp;
                    break;
                }
            }
        }

        for(var i in this._mubanList){
            var muban = this._mubanList[i];
            if(muban.grp == tgrp)
                return muban;
        }
        return null;
    },

    process_ac : function(doc) {
        var msg_id = doc[0];
        var data = doc[1];
        switch (msg_id) {
            case msgac["Infosbank_get"]:
                switch (data.ret) {
                    case 0:
                        if(data.hasOwnProperty("coin_add")){
                            var goldname = tj.mainData.getItemName(10);
                            this.noticetext_add(goldname + " +" + data.coin_add);
                            tj.mainData.setCoinNum(data.coin_sum);
                        }else if(data.hasOwnProperty("gem_add")){
                            var gemname = tj.mainData.getItemName(11);
                            this.noticetext_add(gemname + " +" + data.gem_add);
                            tj.mainData.setGemNum(data.gem_sum);
                        }
                        var tr = this.getTrophyReach(data.id);
                        if(tr)
                            tr.get = 1;
                        var muban = this.get_trophy_muban(data.id);
                        if(muban) {
                           this.refresh_muban(muban);
                        }
                        tj.wsconnection.pushmsg(msgac["Main_refresh_new"]);
                        break;
                    case 1:
                        this.noticetext_add(tj.cfg.get("text/trophy/noreach"));
                        break;
                    case 2:
                        this.noticetext_add(tj.cfg.get("text/trophy/already"));
                        break;
                }
        }
    },

    getTrophyReach:function(tid){
        for (var t in tj.mainData.main.trophy) {
            var td = tj.mainData.main.trophy[t];
            if(td.id == tid)
                return td;
        }
        return null;
    },

    getTropPace:function(type, val1){
        for (var t in tj.mainData.main.trophy_pro) {
            var tp = tj.mainData.main.trophy_pro[t];
            if(type == 4){
                if(tp.type == type && tp.val1 == val1)
                    return tp.val2;
            }else{
                if(tp.type == type)
                    return tp.val1;
            }
        }
        return 0;
    },

    defaultTouchButton : function(btn, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            switch (btn.getName()) {
                case "btnClosed":
                    this.set_release();
                    break;
                case "portraits":
                    var td = this.getTrophyReach(btn.tid);
                    if(td && !td.get){
                        tj.wsconnection.setMsg(msgac["Infosbank_get"], {"id":td.id});
                    }
                    break;
                case "btnMain":
                    var msg = tj.dbdata.getValueById("trophy", btn.trophyID, "info");
                    createNoteBox(this, msg, form_t.castleLayer);
                    break;
            }
        }
    }
});

createTrophyLayer = function(parent){
    var pRet = new trophyLayer();
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