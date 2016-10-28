/**
 * 墓园界面
 * Created by fudq on 2015/12/14.
 */
var cemeteryLayer = baseLayer.extend({
    _ui:null,
    _template:null,
    _showList:null,
    _dead_heros:[],

    ctor: function () {
        this._super();
        this._dead_heros = [];
        this._basename = "cemetery";
    },

    init : function(){
        if (!this._super())
            return false;
        this._ui = this.load_ui("uiCemetery.json");
        if (!this._ui)
            return false;

        this.addChild(this._ui);

        //去掉按钮
        var btnRight = WidgetDig(this._ui, "title/btnRight");
        if(btnRight)
            btnRight.removeFromParent(true);

        var btnLeft = WidgetDig(this._ui, "title/btnLeft");
        if(btnLeft)
            btnLeft.removeFromParent(true);

        this._template = WidgetDig(this._ui,"main/list/template");
        this.setRetain(this._template, "uitmpl");
        this._template.removeFromParent(true);

        tj.wsconnection.addGrp(msgac["Cemetery_list"], msgac["Cemetery_revive"], this.process_ac.bind(this), this.get_scene_name());

        this.initScene();

        return true;
    },

    initScene: function () {
        this.setContentString(WidgetDig(this._ui,"set/btnClosed/text"), tj.cfg.get("text_on_ui/close"));

        WidgetDig(this._ui,"main/list").removeAllChildren(true);
        if(WidgetDig(this._ui,"main").getChildByTag(100001))
            WidgetDig(this._ui,"main").getChildByTag(100001).removeFromParent(true);
        this._showList = [];

        this._dead_heros = tj.mainData.getCetemeryHeros();
        var maxNum = 50;
        if(tj.mainData.main.cemetery.limit)
            maxNum = tj.mainData.main.cemetery.limit;
        var str = this._dead_heros.length.toString() + "/" + maxNum.toString();
        WidgetDig(this._ui,"main/text/textRight").setString(tj.cfg.get("text/cemetery/maxStorage").format(str));
        this.setContentString(WidgetDig(this._ui, "main/text/textLeft"), tj.cfg.get("text_on_ui/Exp")+tj.mainData.getTavern().Exp);

        if(this._dead_heros.length == 0){
            var Text = new ccui.Text(tj.cfg.get("text/cemetery/empty"),tj.cfg.get("designdata/design_fontName"),25);
            WidgetDig(this._ui,"main").addChild(Text);
            Text.setPosition(cc.p(cc.winSize.width/2-50,cc.winSize.height/2));
            Text.setTag(100001);
        }else{
            for(var i = 0; i < this._dead_heros.length; i++){
                var deadHero = this._dead_heros[i];
                var deadHeroID = deadHero.Id;
                var deadHeroName = deadHero.Name;

                var v_muBan = this._template.clone();

                WidgetDig(v_muBan, "btnMain/portraits/star").loadTexture(deadHero.StarIcon, ccui.Widget.PLIST_TEXTURE);
                WidgetDig(v_muBan, "btnMain/portraits/level").loadTexture(deadHero.FrameIcon, ccui.Widget.PLIST_TEXTURE);
                WidgetDig(v_muBan, "btnMain/portraits/icon").loadTexture(deadHero.Portraits, ccui.Widget.PLIST_TEXTURE);

                WidgetDig(v_muBan, "btnResurrection/text").setString(tj.cfg.get("text_on_ui/cemetery/revive"));
                var name_str = tj.cfg.get("text_on_ui/hero/cardName").format(deadHeroName, deadHero.JobName);
                WidgetDig(v_muBan,"btnMain/text/textName").setString(name_str);
                WidgetDig(v_muBan, "btnMain/text/textExplain").setString(tj.cfg.get("text_on_ui/level") + deadHero.Lv);
                WidgetDig(v_muBan,"btnMain/text/textExplain").setVisible(true);
                var size = WidgetDig(this._template, "btnResurrection").getContentSize();
                WidgetDig(v_muBan,"btnResurrection").setContentSize(size);
                WidgetDig(v_muBan,"btnResurrection").deadHeroID = deadHeroID;

                size =  WidgetDig(this._template, "btnMain").getContentSize();
                WidgetDig(v_muBan,"btnMain").setContentSize(size);
                WidgetDig(v_muBan,"btnMain").deadHeroID = deadHeroID;
                WidgetDig(v_muBan,"lock").setVisible(false);

                WidgetDig(this._ui,"main/list").addChild(v_muBan);
                this._showList.push(v_muBan);
            }
        }

        //var width = WidgetDig(this._ui,"main/list").getContentSize().width;
        //var height = this._template.getContentSize().height * this._showList.length;
        //WidgetDig(this._ui,"main/list").setInnerContainerSize(cc.size(width, height));

        this.refreshHelp();
    },

    lockUI:function(lock){
        for(var i in this._showList){
            var hly = this._showList[i];
            hly.setEnabled(!lock);
        }
        WidgetDig(this._ui, "set/btnClosed").setEnabled(!lock);
    },

    refreshHelp:function(){
        if(this._helphand)
            this._helphand.stop();
        this.lockUI(false);

        var hc = tj.mainData.getClientData("help_cemetery");
        if(hc == 2){
            var deads = tj.mainData.getCetemeryHeros();
            if(deads == 0){
                tj.mainData.setClientData("help_cemetery", 4);
                tj.wsconnection.pushmsg(msgac["Main_refresh_help"]);
                return;
            }

            this.lockUI(true);
            var note = createNoteBox(this, tj.cfg.get("text/help/relive"), form_t.castleLayer);
            note.setPos(375, 620);
            if(this._showList.length){
                this._showList[0].setEnabled(true);
                var btn = WidgetDig(this._showList[0], "btnResurrection");
                var btnworld = btn.convertToWorldSpace(cc.p(0, 0));
                var pos = this._ui.convertToNodeSpace(btnworld);
                pos.x += btn.getContentSize().width/2;
                pos.y += btn.getContentSize().height/2 + 10;
                this.load_helphand(this, "click");
                this._helphand.setpos(pos.x, pos.y);
            }
        }
    },

    defaultTouchButton : function(btn, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            cc.log(btn.getName());
            var that = this;
            switch (btn.getName()) {
                case "btnClosed":
                    this.set_release();
                    break;
                case "btnMain":
                    var hid =  btn.deadHeroID;
                    createCardHeroLayer(this, hid, heroCard_t.check);
                    break;
                case "btnResurrection":
                    if(tj.mainData.getClientData("help_cemetery") == 2){
                        tj.mainData.setClientData("help_cemetery", 3);
                        this.refreshHelp();
                    }
                    var deadHeroId = btn.deadHeroID;
                    var deadHeroInfo = this.getInfoBySomething(deadHeroId, this._dead_heros, "Id");
                    if(deadHeroInfo == null)
                        return;
                    var needItem = this.getInfoBySomething(deadHeroInfo.JobLv, tj.dbdata._all["revivefee"], "jobLv");
                    var itemName = tj.cfg.get("text_on_ui/haveexp");
                    var refreshInfo = {};
                    refreshInfo.name = itemName;
                    refreshInfo.num = needItem.num;
                    var gl = new useGemLayer(function () {
                        return useGemLayer.buildCemeteryData(refreshInfo);
                    }, function (v) {
                        cc.log("useGemLayer return:", typeof(v), v);
                        switch (v) {
                            case 0: //复活
                                tj.wsconnection.setMsg(msgac["Cemetery_revive"], {"id":deadHeroId});
                                return true;
                                break;
                            case 1: //埋葬
                                var gl2 = new useGemLayer(function () {
                                    return useGemLayer.buildCemeterySureData();
                                }, function (v) {
                                    cc.log("useGemLayer return:", typeof(v), v);
                                    switch (v) {
                                        case 0: //确定
                                            if(deadHeroInfo && deadHeroInfo.Ratings >= 5){
                                                var str = tj.cfg.get("text/cemetery/buryAskS").format(deadHeroInfo.RatingsName);
                                                var self = this;
                                                var msgbox = createMsgBox2(that, str, function(tag){
                                                    if (tag == 0){
                                                        tj.wsconnection.setMsg(msgac["Cemetery_bury"], {"id":deadHeroId});
                                                        self.getParent().set_release();
                                                        fightData.deleteDefaultSkillData(deadHeroId); //删除此英雄最后选择的技能信息
                                                    }
                                                    return true;
                                                });
                                                msgbox.add_btn(tj.cfg.get("text_on_ui/ok"), 0, 3);
                                                msgbox.add_btn(tj.cfg.get("text_on_ui/cancel"), 1);
                                            }else{
                                                tj.wsconnection.setMsg(msgac["Cemetery_bury"], {"id":deadHeroId});
                                                this.getParent().set_release();
                                                fightData.deleteDefaultSkillData(deadHeroId); //删除此英雄最后选择的技能信息
                                            }
                                            break;
                                        default:
                                            return true;
                                            break;
                                    }
                                    return false;
                                });
                                gl.addChild(gl2);
                                break;
                            default:
                                return true;
                                break;
                        }
                        return false;
                    });
                    that.addChild(gl);
                    break;
            }
        }
    },

    getInfoBySomething: function (something, list, key) {
        for(var i = 0; i < list.length; i++){
            var thing = list[i][key];
            if(thing == something)
                return list[i];
        }
        return null;
    },

    process_ac : function(doc) {
        var msg_id = doc[0];
        var data = doc[1];
        switch (msg_id) {
            case msgac["Cemetery_bury"]:
            {
                var rdata = data.data;
                var ret = data.ret;
                switch (ret) {
                    case 0:
                    {
                        var text = tj.cfg.get("text/cemetery/isBury");
                        if(rdata){
                            if(rdata.id_hero)
                                tj.mainData.removeDeadHeroFromListById(rdata.id_hero);
                            if(rdata.legacy)
                                tj.mainData.addStroageItem(rdata.legacy, 1);
                            if(rdata.exp)
                                tj.mainData.getTavern().Exp = rdata.exp;
                            if(rdata.d_exp)
                                text += "," + tj.cfg.get("text/getExp").format(rdata.d_exp);
                            if(rdata.re_eq){
                                for(var i in rdata.re_eq){
                                    tj.mainData.addStroageEquips(rdata.re_eq[i]);
                                }
                            }
                            tj.wsconnection.pushmsg(msgac["Pub_refresh_ui"]);
                            this.noticetext_add(text);
                            this.initScene();
                        }
                    }break;
                    case 1:{
                        this.noticetext_add(tj.cfg.get("text/cemetery/wrongHeroId"));
                    }break;
                    case 2:{
                        this.noticetext_add(tj.cfg.get("text/cemetery/wrongHeroJob"));
                    }break;
                    case 10:{
                        this.noticetext_add(tj.cfg.get("text/cemetery/noBackEquip"));
                    }break;
                }
            }break;
            case msgac["Cemetery_revive"]:
                var rdata = data.data;
                var ret = data.ret;
                switch (ret) {
                    case 0:
                    {
                        if(rdata){
                            if(rdata.h){
                                if(rdata.h.Id)
                                    tj.mainData.removeDeadHeroFromListById(rdata.h.Id);
                                tj.mainData.updataHero(rdata.h);
                            }
                            if(rdata.item){
                                if(rdata.item.id && rdata.item.left)
                                    tj.mainData.setItemNum(rdata.item.id, rdata.item.left)
                            }
                            if(rdata.delta_exp)
                                tj.mainData.addSoul(rdata.delta_exp);
                            this.noticetext_add(tj.cfg.get("text/cemetery/success"));
                            this.initScene();
                        }
                    }break;
                    case 1:
                        this.noticetext_add(tj.cfg.get("text/cemetery/wrongHeroId"));
                        break;
                    case 2:
                        this.noticetext_add(tj.cfg.get("text/cemetery/wrongHeroJob"));
                        break;
                    case 3:
                        this.noticetext_add(tj.cfg.get("text/cemetery/wrongHeroLv"));
                        break;
                    case 4:
                        this.noticetext_add(tj.cfg.get("text/cemetery/notEnoughItem"));
                        break;
                    case 5:
                        this.noticetext_add(tj.cfg.get("text/cemetery/pubfull"));
                        break;
                }
            break;
        }
    },

    onExit : function(){
        this._super();

        if(tj.mainData.getClientData("help_cemetery") == 3){
            tj.mainData.setClientData("help_cemetery", 4);
            tj.wsconnection.pushmsg(msgac["Main_refresh_help"]);
        }
    }
});

createCemeteryLayer = function(parent){
    var  pRet = new cemeteryLayer();
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
