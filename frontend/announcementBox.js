/**
 * Created by likx on 2016/9/5.
 */

var announcementBox = baseLayer.extend({
    _cb:null,
    _annBox:null,
    _box_pos:null,

    _codeCheckLayer:null,
    _fromSceneName:"",

    ctor : function(scene_name){
        this._super();
        this._basename = "announcementbox_"+scene_name;
        this._fromSceneName = scene_name;
        this._beTop = false;
    },

    init : function() {
        if (!this._super())
            return false;

        this._ui = this.load_ui("boxAnnouncement.json");
        if (!this._ui)
            return false;
        this.addChild(this._ui);

        this.setGlobalZOrder(3);

        this._annBox = WidgetDig(this._ui, "ann");
        this._uiText = WidgetDig(this._ui, "ann/box/text");
        WidgetDig(this._ui, "ann/box").setTouchEnabled(false);
        WidgetDig(this._ui, "ann/box/text").setTouchEnabled(false);
        WidgetDig(this._ui, "ann/BG").setTouchEnabled(false);
        WidgetDig(this._ui, "server").setTouchEnabled(false);

        this._annBox.setVisible(false);
        this._annBox.setTouchEnabled(false);
        this._box_pos = this._annBox.getPosition();

        WidgetDig(this._ui, "server").setVisible(false);
        if(tj.gateMgr.getServerType() == 500){
            WidgetDig(this._ui, "server").setVisible(true);
            WidgetDig(this._ui, "server/text").setString(tj.cfg.get("text_on_ui/testServer"));
        }else if(tj.gateMgr.getServerType() == 100){
            WidgetDig(this._ui, "server").setVisible(true);
            WidgetDig(this._ui, "server/text").setString(tj.cfg.get("text_on_ui/testServer1"));
        }

        this._codeCheckLayer = WidgetDig(this._ui, "code");
        this._codeCheckLayer.setTouchEnabled(false);
        this._codeCheckLayer.setVisible(true);
        var self = this;
        this._codeCheckLayer.showNoticeMsg = function(msg){
            self.showNoticeMsg(msg);
        };

        return true;
    },

    onEnter : function(){
        this._super();
        if(this._fromSceneName == "main" || this._fromSceneName == "map") {
            tj.wsconnection.addGrp(msgac["Verify_code_trans"], msgac["Verify_code_trans"], this.process_ac.bind(this), this.get_scene_name());
        }
    },

    process_ac: function (doc) {
        var msg_id = doc[0];
        var data = doc[1];
        switch (msg_id) {
            case msgac["Verify_code_trans"]:
                // 显示验证码页面
                createCodeCheckLayer(this._codeCheckLayer,data);
                break;
            default :
                break;
        }
    },

    setMsg:function(msg){
        if(this._uiText)
            this._uiText.setString(msg);
    },

    showNoticeMsg : function(msg){
        this.noticetext_add(msg,true);
    },

    show:function(pos){
        if(tj.announcementMsg){
            if(pos)
                this._annBox.setPosition(this._box_pos.x, this._box_pos.y + pos);
            else
                this._annBox.setPosition(this._box_pos.x, this._box_pos.y);

            this._annBox.setVisible(true);
            var fo = new cc.FadeIn(0.5);
            this._annBox.runAction(fo);
            this.setMsg(tj.announcementMsg);
        }
        else
            this._annBox.setVisible(false);
    },

    hide:function(){
        var fo = new cc.FadeOut(0.5);
        this._annBox.runAction(fo);
    },

    update:function(delta){
        this._super(delta);
        if(tj.announcementTime > 0){
            tj.announcementTime -= delta;
            if(tj.announcementTime <= 0){
                tj.announcementMsg = null;
                this.hide();
            }
        }
    }
});
