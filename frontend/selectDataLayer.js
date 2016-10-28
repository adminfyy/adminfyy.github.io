/**
 * Created by likx on 2016/9/21.
 */

var selectDataLayer = baseLayer.extend({
    _ui: null,
    _update_t:0,

    get_scene_name: function () {
        return "selectdata";
    },

    ctor : function() {
        this._super();
    },

    init : function() {
        if (!this._super())
            return false;

        this._ui = this.load_ui("boxData.json");
        if (!this._ui)
            return false;

        this.addChild(this._ui);

        tj.wsconnection.addGrp(msgac["Request_uids_info"], msgac["Request_uids_info"], this.process_ac.bind(this), this.get_scene_name());
        tj.wsconnection.addGrp(msgac["Delete_curdata"], msgac["Delete_curdata"], this.process_ac.bind(this), this.get_scene_name());

        WidgetDig(this._ui, "list").setVisible(false);
        WidgetDig(this._ui, "text_0").setVisible(false);

        //tj.wsconnection.setMsg(msgac["Ask_paygem"], {});
        //if (tj.uidsinfo === undefined)
        tj.wsconnection.setMsg(msgac["Request_uids_info"], {});
        //else
        //    this.showUidSelect();

        return true;
    },

    showUidSelect: function() {
        WidgetDig(this._ui, "list").setVisible(true);
        WidgetDig(this._ui, "list/btnData1/btnDelete").setVisible(false);
        WidgetDig(this._ui, "list/btnData2/btnDelete").setVisible(false);
        WidgetDig(this._ui, "list/btnData3/btnDelete").setVisible(false);

        var uid = tj.local.getDefaultUid();
        var pid = tj.local.getDefaultPlyData(uid);
        for (var i = 1; i <= 3; i++) {
            var btn = WidgetDig(this._ui, ("list/btnData"+i));
            btn.pid = i;
            btn.deleting = false;
            var str = tj.cfg.get("text/setting/pid_name"+i);
            var str2 = "";
            var nick = "";
            var time = "";
            var info = tj.uidsinfo[i];
            btn.setTouchEnabled(true);
            if(!info){
                WidgetDig(btn, "name").setString(str);
                WidgetDig(btn, "text").setString(tj.cfg.get("text/setting/new_game"));
                continue;
            }
            nick = info.Nick;
            time = info.Action_time;
            WidgetDig(btn, "btnDelete").uid = info.Uid;
            if (i == pid) {
                str += " " + tj.cfg.get("text/setting/current_pid");
                btn.setTouchEnabled(false);
            }else{
                WidgetDig(btn, "btnDelete/text").setString(tj.cfg.get("text/setting/delete"));
                WidgetDig(btn, "btnDelete").opt = 1;
                WidgetDig(btn, "btnDelete").setVisible(true);
            }
            if(str2 == "" && nick)
                str2 += nick;
            WidgetDig(btn, "btnDelete").pid = i;
            if(info.Del_remain){
                WidgetDig(btn, "btnDelete/text").setString(tj.cfg.get("text_on_ui/cancel"));
                WidgetDig(btn, "btnDelete").opt = 2;
                if(info.Del_remain > 0){
                    var sec = tj.gameClock.millisecond2StringAddHours(info.Del_remain*1000);
                    str2 = "\n" + tj.cfg.get("text/setting/will_delete").format(sec);
                    btn.deleting = true;
                }else{
                    WidgetDig(btn, "btnDelete").setVisible(false);
                    str2 = "\n" + tj.cfg.get("text/setting/have_delete");
                }
            }else if (time !== "") {
                var t = new Date(time);
                str2 += "\n" + "%s/%s/%s %s:%s:%s".format(t.getUTCFullYear(), t.getMonth()+1,t.getDate(), t.getHours(), t.getMinutes(), t.getSeconds());
            }
            WidgetDig(btn, "name").setString(str);
            WidgetDig(btn, "text").setString(str2);
        }
    },

    update:function(delta){
        this._super();

        for (var i in tj.uidsinfo) {
            var info = tj.uidsinfo[i];
            if(info.Del_remain && info.Del_remain>0){
                info.Del_remain -= delta;
                this._update_t += delta;
                if(info.Del_remain <= 0){
                    if(tj.mainData.uid == info.Uid)
                        tj.wsconnection.closeProcess(true);
                    else
                        this.showUidSelect(0);
                }
            }
        }

        if(this._update_t > 1){
            this._update_t = 0;
            this.showUidSelect(0);
        }
    },

    process_ac: function(doc) {
        var msg_id = doc[0];
        var data = doc[1];
        switch (msg_id) {
            case msgac["Request_uids_info"]:
                if (data.ret != 0) {
                    this.noticetext_add(tj.cfg.get("text/setting/quest_uids_err"));
                    break;
                }
                tj.uidsinfo = {};
                for (var i in data.infos) {
                    var info = data.infos[i];
                    var p = info.Uid % 10;
                    tj.uidsinfo[p] = info;
                }
                this.showUidSelect();
                break;
            case msgac["Delete_curdata"]:
                switch (data.ret){
                    case 0:
                       for (var i in tj.uidsinfo) {
                            info = tj.uidsinfo[i];
                            if(data.uid == info.Uid){
                                if(data.t == 0)
                                    info.Del_remain = data.del_remains;
                                else if(data.t == 1)
                                    info.Del_remain = undefined;
                            }
                        }
                        this.showUidSelect();
                        break;
                    case 1:
                        this.noticetext_add(tj.cfg.get("text/setting/delete_error1"));
                        break;
                }
                break;
        }
    },

    defaultTouchButton : function(btn, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
           switch(btn.getName()){
               case "btnData1":
               case "btnData2":
               case "btnData3":
                   if (btn.pid == pid)
                       break;
                   if(btn.deleting){
                       this.noticetext_add(tj.cfg.get("text/setting/delteing"));
                   }else{
                       var uid = tj.local.getDefaultUid();
                       var pid = tj.local.getDefaultPlyData(uid);
                       tj.local.setDefaultPlyData(uid, btn.pid);
                       tj.wsconnection.closeProcess(true);
                   }
                   break;
               case "btnClosed":
                   this.set_release();
                   break;
               case "btnDelete":
                   if(btn.opt == 1){
                       for (var i in tj.uidsinfo) {
                           var info = tj.uidsinfo[i];
                           if (btn.uid == info.Uid)
                               break;
                       }
                       if(!info)
                           break;
                       var recorderTag = tj.cfg.get("text/setting/pid_name"+btn.pid);
                       var str = tj.cfg.get("text/setting/delete_curdata").format(recorderTag,recorderTag,recorderTag,info.Pay_gem,recorderTag);
                       this._curr_popLayer = createMsgBox2(this, str, function(tag){
                           if (tag == 0)
                               this._curr_popLayer = createInputUIDLayer(this, input_type.uid, function(uid){
                                   tj.wsconnection.setMsg(msgac["Delete_curdata"], {"uid": parseInt(uid), "t":0});
                               }, btn.uid);
                           return true;
                       }.bind(this), 2);
                   }else if(btn.opt == 2)
                       tj.wsconnection.setMsg(msgac["Delete_curdata"], {"uid": parseInt(btn.uid), "t":1});
                   break;
           }
        }
    }
});

function createDataSelect(parent) {
    var pRet = new selectDataLayer();
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
