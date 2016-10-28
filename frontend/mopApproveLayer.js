/**
 * Created by likx on 2016/10/18.
 */

var mopApproveLayer = baseLayer.extend({
    _mopTime:1,
    _qid:0,
    _dataRow:0,
    _teamPoint:0,

    ctor : function(parent){
        this._super();
        this._basename = "mopapprove";
    },

    init : function(qid) {
        if (!this._super())
            return false;

        this._ui = this.load_ui("uiMopApprove.json");
        if (!this._ui)
            return false;
        this.addChild(this._ui);

        this._qid = qid;
        this._dataRow = tj.dbdata.getrow("exquest", qid);

        WidgetDig(this._ui, "main/title/text").setString(tj.cfg.get("text_on_ui/mop/ask").format(tj.mainData.getBattleTeamId()));
        WidgetDig(this._ui, "set/btnMop/text").setString(tj.cfg.get("text_on_ui/mop/yes"));
        WidgetDig(this._ui, "set/btnClosed/text").setString(tj.cfg.get("text_on_ui/close"));

        WidgetDig(this._ui, "main/time/text").setString(tj.cfg.get("text_on_ui/mop/time"));
        WidgetDig(this._ui, "main/ticket/text").setString(tj.cfg.get("text_on_ui/mop/usetime"));
        WidgetDig(this._ui, "main/earnings/text").setString(tj.cfg.get("text_on_ui/mop/get"));
        WidgetDig(this._ui, "main/prop/text").setString(tj.cfg.get("text_on_ui/mop/drop"));

        WidgetDig(this._ui, "BG").setTouchEnabled(false);
        WidgetDig(this._ui, "LINE").setTouchEnabled(false);
        WidgetDig(this._ui, "main").setTouchEnabled(false);

        var team = tj.mainData.getBattleHero();
        this._teamPoint = 0;
        for (var h in team){
            var btnMain = WidgetDig(this._ui, "main/hero/btnMain" + (parseInt(h)+1));
            var heroinfo = tj.mainData.getOwnHeroById(team[h]);
            if(!heroinfo){
                btnMain.setVisible(false);
                continue;
            }
            if (!btnMain)
                return false;
            WidgetDig(btnMain, "portraits/star").loadTexture(heroinfo.StarIcon, ccui.Widget.PLIST_TEXTURE);
            WidgetDig(btnMain, "portraits/level").loadTexture(heroinfo.FrameIcon, ccui.Widget.PLIST_TEXTURE);
            WidgetDig(btnMain, "portraits/icon").loadTexture(heroinfo.Portraits, ccui.Widget.PLIST_TEXTURE);
            WidgetDig(btnMain, "portraits/occ").setString(heroinfo.JobName);
            btnMain.heroid = team[h];
            this._teamPoint += heroinfo.Power;
        }
        WidgetDig(this._ui, "main/grade/text").setString(tj.cfg.get("text_on_ui/mop/point").format(Math.round(this._teamPoint)));
        var expedition_time = tj.mainData.main.expeditions.expedition_time;
        WidgetDig(this._ui, "main/ticket/ticket/textNum").setString(tj.cfg.get("text_on_ui/mop/houre").format(expedition_time));
        WidgetDig(this._ui, "main/time/slider/bar").addEventListener(this.timeChange, this);

        var dropList = WidgetDig(this._ui, "main/prop/list");
        var textTml = WidgetDig(this._ui, "main/prop/list/textNum");
        dropList.removeAllChildren(true);
        var itemDrop = this._dataRow.itemDrop.split(",");
        var workshopDrop = this._dataRow.workshopDrop.split(",");
        for(var i in itemDrop){
            if(parseInt(i) % 2 != 0)
                continue;
            var itemid = itemDrop[i];
            var iteminfo = tj.mainData.getItemInfo(itemid);
            var text = textTml.clone();
            dropList.pushBackCustomItem(text);
            text.setString(iteminfo.name);
        }
        for(i in workshopDrop){
            if(parseInt(i) % 2 != 0)
                continue;
            var bpid = workshopDrop[i];
            var info = tj.dbdata.getrow("blueprint",bpid);
            text = textTml.clone();
            dropList.pushBackCustomItem(text);
            text.setString(info.name);
        }

        this.refresh_getreward();

        var ticket = WidgetDig(this._ui, "main/ticket/ticket");
        ticket.addTouchEventListener(function(object, type){
            var str = tj.cfg.get("text_on_ui/mop/tips");
            this._curr_popLayer = createNoteBox(this, str, form_t.tips);
        },this);
        return true;
    },

    timeChange: function(obj, type) {
        var max_per_time = tj.mainData.main.expeditions.max_per_time;
        this._mopTime = Math.round(obj.getPercent()/100 * (max_per_time-1))+1;
        this.refresh_getreward();
    },

    refresh_getreward:function(){
        var expedition_time = tj.mainData.main.expeditions.expedition_time;
        WidgetDig(this._ui, "main/time/textTime").setString(tj.cfg.get("text_on_ui/mop/houre").format(this._mopTime));
        WidgetDig(this._ui, "main/time/textTime").setColor(cc.color.WHITE);
        if(this._mopTime > expedition_time)
            WidgetDig(this._ui, "main/time/textTime").setColor(cc.color.RED);

        var gold = this._mopTime * (this._teamPoint - this._dataRow.coinRequire) * this._dataRow.coinNum;
        var exp = this._mopTime * (this._teamPoint - this._dataRow.expRequire) * this._dataRow.expNum;
        WidgetDig(this._ui, "main/earnings/gold/textNum").setString(Math.round(gold));
        WidgetDig(this._ui, "main/earnings/soul/textNum").setString(Math.round(exp));
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
                    this._curr_popLayer = createCardHeroLayer(this, btn.heroid, heroCard_t.check);
                    break;
                case "btnMop":
                    var heros = tj.mainData.getBattleHero();
                    var herosTemp = [];
                    for(var i in heros){
                        var hid = parseInt(heros[i]);
                        if(hid>0)
                            herosTemp.push(heros[i]);
                    }
                    var teamid = tj.mainData.getBattleTeamId();
                    tj.wsconnection.setMsg(msgac["Explore_start"], {"qid":this._qid, "num":this._mopTime, "team":herosTemp, "teamid":teamid});
                    break;
            }
        }
    },



});

function createMopApproveLayer(parent, qid){
    var pRet = new mopApproveLayer();
    if (pRet && pRet.init(qid)){
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
