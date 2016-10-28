/**
 * Created by likx on 2016/4/14.
 */

var cardEventPvpLayer = baseLayer.extend({
    _ui:0,
    _div:0,
    _next:0,
    _uiTextTile:null,
    _uiTextContent:null,
    _uiBtnList:null,
    _uiBtnOption:null,
    _data:null,

    ctor : function( ){
        this._super();
        this._basename = "cardeventpvp";
    },

    init : function(data) {
        if (!this._super())
            return false;

        this._ui = this.load_ui("cardEvent.json");
        if (!this._ui)
            return false;
        this.addChild(this._ui);

        this._div = data.div;
        this._next = data.next;

        this._uiTextTile = WidgetDig(this._ui, "main/task/explain/textName");
        this._uiTextContent = WidgetDig(this._ui, "main/task/explain/text");

        this._uiBtnList = WidgetDig(this._ui, "main/list");
        this._uiBtnOption = WidgetDig(this._ui, "main/list/btnOption");
        this.setRetain(this._uiBtnOption, "uitmpl");
        WidgetDig(this._ui, "main/list/btnOption/lock").setVisible(false);

        WidgetDig(this._uiBtnOption, "lock").setVisible(false);

        this.show_pvp();

        this._data = data;


        tj.wsconnection.addGrp(msgac["Arena_match"], msgac["Arena_match_ret"], this.process_ac.bind(this), this.get_scene_name());

        return true;
    },

    show_pvp:function(){
        this._uiTextTile.setString(tj.cfg.get("text_on_ui/pvp/title"));
        var div = this._div;
        var next = this._next;

        var d_lv = tj.cfg.get("designdata/pvpLv");
        var pvpLV = d_lv[div];
        var str1 = tj.cfg.get("text_on_ui/pvp/content").format(tj.mainData.nick, pvpLV);
        var str2 = "";
        var pvpLVNext = "";
        if(next > 0) {
            if((div+1) < d_lv.length){
                pvpLVNext = d_lv[div + 1];
                str2 = tj.cfg.get("text_on_ui/pvp/content1").format(next, pvpLVNext);
            }
        }else{
            if(div > 0){
                pvpLVNext = d_lv[div - 1];
                str2 = tj.cfg.get("text_on_ui/pvp/content2").format(Math.abs(next), pvpLVNext);
            }
        }
        this._uiTextContent.setString(str1+str2);
        this._uiTextContent.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);

        this._uiBtnList.removeAllChildren();
        var uiBtnStar = this._uiBtnOption.clone();
        this._uiBtnList.pushBackCustomItem(uiBtnStar);
        uiBtnStar.setName("btnStar");
        WidgetDig(uiBtnStar, "text").setString(tj.cfg.get("text_on_ui/pvp/btnyes"));

        var uiBtnInfo= this._uiBtnOption.clone();
        this._uiBtnList.pushBackCustomItem(uiBtnInfo);
        WidgetDig(uiBtnInfo, "text").setString(tj.cfg.get("text_on_ui/pvp/btninfo"));
        uiBtnInfo.setName("btnInfo");

        var uiBtnQuit= this._uiBtnOption.clone();
        this._uiBtnList.pushBackCustomItem(uiBtnQuit);
        WidgetDig(uiBtnQuit, "text").setString(tj.cfg.get("text_on_ui/close"));
        uiBtnQuit.setName("btnQuit");
    },

    show_info:function(){
        this._uiTextTile.setString(tj.cfg.get("text_on_ui/pvp/titleInfo"));
        this._uiTextContent.setString(tj.cfg.get("text_on_ui/pvp/contentInfo"));

        this._uiBtnList.removeAllChildren();
        var uiBtnBack = this._uiBtnOption.clone();
        this._uiBtnList.pushBackCustomItem(uiBtnBack);
        uiBtnBack.setName("btnBack");
        WidgetDig(uiBtnBack, "text").setString(tj.cfg.get("text_on_ui/pvp/btnBack"));
    },

    show_match:function(){
        this._uiTextTile.setString(tj.cfg.get("text_on_ui/pvp/titleInfo"));
        this._uiTextContent.setString(tj.cfg.get("text_on_ui/pvp/match"));

        this._uiBtnList.removeAllChildren();
        var uiBtnCancel = this._uiBtnOption.clone();
        this._uiBtnList.pushBackCustomItem(uiBtnCancel);
        uiBtnCancel.setName("btnCancel");
        WidgetDig(uiBtnCancel, "text").setString(tj.cfg.get("text_on_ui/pvp/cancle"));
    },

    hide:function(h){
        WidgetDig(this._ui, "main").setVisible(h);
        WidgetDig(this._ui, "title").setVisible(h);
    },

    onEnter:function(){
        this._super();

        if(this._data.hasOwnProperty("ret")){
            var str1 = "";
            var rname = tj.mainData.getItemName(this._data.rewards[0].id);
            var str2 = tj.cfg.get("text/pvp/reward").format(this._data.rewards[0].num, rname);
            switch (this._data.ret){
                case -1:
                    str1 = tj.cfg.get("text/pvp/ping");
                    break;
                case 0:
                    str1 = tj.cfg.get("text/pvp/win");
                    break;
                case 1:
                    str1 = tj.cfg.get("text/pvp/lost");
                    break;
            }
            this.noticetext_add(str1+str2);
        }
    },

    defaultTouchButton : function(btn, type) {
        var that = this;
        if (type == ccui.Widget.TOUCH_ENDED) {
            switch(btn.getName())
            {
                case "btnStar":
                    tj.wsconnection.setMsg(msgac["Arena_match"]);
                    this.show_match();
                    break;
                case "btnInfo":
                    this.show_info();
                    break;
                case "btnQuit":
                    this.set_release();
                    tj.wsconnection.setMsg(msgac["Arena_match_exit"]);
                    break;
                case "btnBack":
                    this.show_pvp();
                    break;
                case "btnCancel":
                    tj.wsconnection.setMsg(msgac["Arena_match_quit"]);
                    this.show_pvp();
                    break;
            }
        }
    },

    process_ac : function(doc){
        var msg_id = doc[0];
        var data = doc[1];
        switch(msg_id){
            case msgac["Arena_match"]:
                switch (data.ret){
                    case -1:
                        this.noticetext_add(tj.cfg.get("text/pvp/otime"));
                        break;
                    case 1:
                        this.noticetext_add(tj.cfg.get("text/pvp/notOnPos"));
                        break;
                    case 2:
                        this.noticetext_add(tj.cfg.get("text/pvp/fighting"));
                        break;
                    case 3:
                        this.noticetext_add(tj.cfg.get("text/pvp/already"));
                        break;
                }
                break;
            case msgac["Arena_match_ret"]:
                this.set_release();
                break;
            default :
                break;
        }
    }

});


createCardPvpLayer = function(parent, data){
    var pRet = new cardEventPvpLayer();
    if (pRet && pRet.init(data)){
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