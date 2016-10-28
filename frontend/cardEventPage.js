/**
 * Created by likx on 2016/3/24.
 */
var cardEventPage = baseLayer.extend({
    _ui:0,
    _uiTextTile:null,
    _uiTextContent:null,
    _uiBtnList:null,
    _uiBtnTemple:null,
    _contentIndex:0,
    _contents:null,
    _buttonLast:"",

    ctor : function( ){
        this._super();
        this._basename = "cardeventpage";
        this._contentIndex = 0;
    },

    init : function(s_content, name_evn, progress) {
        if (!this._super())
            return false;

        this._ui = this.load_ui("cardEvent.json");
        if (!this._ui)
            return false;
        this.addChild(this._ui);

        var t0, t1, t2, t3 = [];
        var title, content, button="";
        t0 = s_content.split("title:");
        if(t0 && t0.length > 1)
            t1 = t0[1].split("content:");
        if(t1 && t1.length > 1){
            title = t1[0];
            t2 = t1[1].split("button:");
        }
        if(t2 && t2.length > 1){
            content = t2[0];
            t3 = t2[1].split("buttonLast:");
        }
        if(t3 && t3.length > 1) {
            button = t3[0];
            this._buttonLast = t3[1];
        }

        title = this.removeEnter(title, "\n");
        content = this.removeEnter(content, "\n");
        button = this.removeEnter(button, "\n");
        this._buttonLast = this.removeEnter(this._buttonLast, "\n");

        this._contents = content.split("\m");
        for (var i in this._contents){
            var c = this._contents[i];
            this._contents[i] = this.removeEnter(c, "\\");
        }

        this._uiTextTile = WidgetDig(this._ui, "main/task/explain/textName");
        this._uiTextTile.setString(title);

        this._uiTextSubhead = WidgetDig(this._ui, "main/task/explain/textSubhead");
        if(progress){
            var text = tj.cfg.get("text_on_ui/event/pross").format(name_evn,progress);
            this.setContentString(this._uiTextSubhead, text);
            this._uiTextSubhead.setVisible(true);
        }else
            this._uiTextSubhead.setVisible(false);

        WidgetDig(this._ui, "main/task/explain/textSubhead").setVisible(false);

        this._uiTextContent = WidgetDig(this._ui, "main/task/explain/text");
        this._uiTextContent.setString(this._contents[this._contentIndex]);
        //this._uiTextContent.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_TOP);

        this._uiBtnList = WidgetDig(this._ui, "main/list");
        this._uiBtnTemple = WidgetDig(this._ui, "main/list/btnOption");
        WidgetDig(this._uiBtnTemple, "text").setString(button);
        WidgetDig(this._ui, "main/list/btnOption/lock").setVisible(false);

        return true;
    },

    removeEnter:function(str, tag){
        if(!str)
            return;
        var temp = str.split(tag);
        var s0 = "";
        for (var i in temp){
            if(temp[i] != "")
                s0 += temp[i];
        }
        return s0;
    },

    defaultTouchButton : function(btn, type) {
        var that = this;
        if (type == ccui.Widget.TOUCH_ENDED) {
            switch(btn.getName())
            {
                case "btnOption":
                    if(this._contentIndex < this._contents.length-1 ){
                        this._contentIndex++;
                        this._uiTextContent.setString(this._contents[this._contentIndex]);
                        if(this._contentIndex == this._contents.length-1)
                            WidgetDig(this._uiBtnTemple, "text").setString(this._buttonLast);
                    }else{
                        tj.wsconnection.setMsg(msgac["Event_func_next"]);
                    }
                    break;
            }
        }
    }
});


createCardEventPage = function(parent, content, name_evn, progress ){
    var pRet = new cardEventPage();
    if (pRet && pRet.init(content, name_evn, progress)){
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