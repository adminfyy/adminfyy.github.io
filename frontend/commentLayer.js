
var commentLayer = baseLayer.extend({

    _datas:null,

    ctor : function(parent,datas){
        this._super();
        this._basename = "commentLayer";
        this._datas = datas;
    },

    init : function(){
        if (!this._super())
            return false;
        this._ui = this.load_ui("boxComment.json");
        if (this._ui == -1)
            return true;
        if (!this._ui)
            return false;
        this.addChild(this._ui);

        var iconPath = "res/art/ui/comments/comment1.png";
        if(this._datas.hasOwnProperty("type")){
            // 老玩家特殊处理
            if(this._datas.type == 1 && this._datas.hasOwnProperty("val")){
                var val = this._datas.val;
                if(val == 1){
                    // 老玩家已评论过
                    iconPath = "res/art/ui/comments/comment3.png";
                }else if(val == 2){
                    // 老玩家未评论过
                    iconPath = "res/art/ui/comments/comment2.png";
                }
            }
        }
        WidgetDig(this._ui, "pic/img").loadTexture(iconPath, ccui.Widget.LOCAL_TEXTURE);

        WidgetDig(this._ui, "set/btnComment/text").setString(tj.cfg.get("text_on_ui/comment/comment"));
        WidgetDig(this._ui, "set/btnFeedback/text").setString(tj.cfg.get("text_on_ui/comment/feedback"));
        WidgetDig(this._ui, "set/btnClosed/text").setString(tj.cfg.get("text_on_ui/close"));


        return true;
    },


    defaultTouchButton : function(btn, type){
        if (type == ccui.Widget.TOUCH_ENDED) {
            switch(btn.getName()){
                case "btnComment":
                    if(this._datas && this._datas.url != "") {
                        SysUtil.hyperLink(""+this._datas.url);
                    }
                    break;
                case "btnFeedback":
                    createMailBackLayer(this._tjParent,this.get_scene_name());
                    break;
                case "btnClosed":
                    break;
                default:
                    break;
            }
            this.set_release();
        }
    }

});

function createCommentLayer(parent,datas){
    var pRet = new commentLayer(parent,datas);
    if (pRet && pRet.init()){
        var z = -1;
        var childs = parent.getChildren();
        for(var i = 0; i < childs.length; ++i){
            if (childs[i].getLocalZOrder() > z)
                z = childs[i].getLocalZOrder();
        }
        pRet.setLocalZOrder(z+1);
        pRet._tjParent = parent;
        parent.addChild(pRet);
        return pRet;
    }else if (pRet)
        delete pRet;
    return null;
};
