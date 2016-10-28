/**
 * Created by likx on 2016/1/27.
 */
var cardMonsterLayer = baseLayer.extend({
    _ui:0,
    _monsterids:[],
    _monsterid:0,
    _currMonsterIdx:0,
    _monsterRow:null,
    _monsterEquipAttr:null,
    _cb:null,
    _monsters: {},

    ctor : function(data, id, cb){
        this._super();

        this._monsterids = [];
        this._basename = "cardmonster";

        for(var k in data) {
            var moninfo = data[k].info;
            var mon_num = data[k].num;
            var mid = moninfo.Id;
            if(this._monsterid == 0) {
                this._monsterid = mid;
            }
            for(var i=0; i<mon_num; i++) {
                this._createMonsterInfo(mid, moninfo);
            }
        }
        if(id>0) {
            this._monsterid = id;
        }

        this._cb = cb;
    },

    _createMonsterInfo: function(id, attrData) {
        var re = {};
        if(attrData) {
            re = mergeObj(re, attrData);
        }
        var md = tj.dbdata.getrow("monster", id);
        var attr = {
            name: '',
            race: '',
            move1: 0,
            move2: 0,
            move3: 0,
            protraits: '',
            figure: ''
        };
        for(var a in attr) {
            if(md.hasOwnProperty(a)) {
                re[a] = md[a];
            }else{
                re[a] = attr[a];
            }
        }
        this._monsterids.push(id);
        this._monsters[id] = re;
    },

    init : function() {
        if (!this._super())
            return false;

        this._ui = this.load_ui("cardHero.json");
        if (!this._ui)
            return false;
        this.addChild(this._ui);

        var btnClosed = WidgetDig(this._ui, "set/btnClosed");
        var centerX = btnClosed.getParent().getContentSize().width/2;
        var centerY = WidgetDig(this._ui, "set/btnClosed").getPosition().y;
        btnClosed.setPosition(cc.p(centerX, centerY));

        WidgetDig(this._ui, "set/btnUpgrade").setVisible(false);
        WidgetDig(this._ui, "set/btnFire").setVisible(false);
        WidgetDig(this._ui, "set/btnRecruit").setVisible(false);
        WidgetDig(this._ui, "AI").setVisible(false);
        WidgetDig(this._ui, "AI/btnSet/text").setString("图鉴");

        var uiHP = WidgetDig(this._ui, "main/HP");
        centerX = uiHP.getParent().getContentSize().width/2;
        uiHP.setAnchorPoint(cc.p(0.5, 1.0));
        uiHP.setPosition(cc.p(centerX, uiHP.getPosition().y));
        WidgetDig(uiHP, "text").setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        WidgetDig(this._ui, "main/SP").setVisible(false);
        WidgetDig(this._ui, "portraits").setVisible(false);

        var iconlist = WidgetDig(this._ui, "list");
        if(iconlist) {
            iconlist.removeFromParent(); //一排方块
        }

        this.viewMonster('first');
        return true;
    },

    refresh_monster:function(){
        //this._monsterRow = tj.dbdata.getrow("monster", this._monsterid);
        this._monsterRow = this._monsters[this._monsterid];
        if(!this._monsterRow){
            tj.log("cardMonsterLayer: not found monster(id=" + this._monsterid +").");
            return false;
        }
        this._monsterEquipAttr = this.calcMonterEquipAttr(this._monsterRow);
        this.refresh_ui();
        this.refresh_equip();
        this.refresh_attr();

        var role = WidgetDig(this._ui, "main/role");
        var frameTop = role.getParent().convertToWorldSpace(role.getPosition()).y;//role.height;
        var animation = WidgetDig(this._ui, "main/role/animation");
        animation.removeAllChildren();

        var self = this;
        var res = RES_PATH + "animation/monster/" + this._monsterRow.figure;
        tj.mainData.loadAnimate(res, function(portait){
            animation.addChild(portait.node);
            var n = portait.node;
            var a = WidgetDig(n, 'pos', false);
            if(!a) {
                a = WidgetDig(n, 'attack');
            }
            if(n && a) {
                var pos = n.convertToWorldSpace(a.getPosition());
                var atp = 620;

                //cc.log('a:', a.getPosition());

                var sx = a.getPosition().x;
                var sy = a.getPosition().y;
                var opos = n.getPosition();
                var npos = cc.p(0, 0);
                if (sx != 0) {
                    //横向调整中心位置
                    npos.x = opos.x - sx;
                    //n.setPosition(cc.pSub(n.getPosition(), cc.p(a.getPosition().x, 0)));
                }
                if (pos.y > frameTop + atp) {
                    //纵向超出相框高度时调整
                    npos.y = cc.pSub(opos, cc.p(0, Math.abs(pos.y - frameTop - atp))).y;
                    //n.setPosition(cc.pSub(n.getPosition(), cc.p(0, Math.abs(pos.y-frameTop-atp))));
                    //cc.log('>> adjust montser(id='+ self._monsterid +') frame to pos:', n.getPosition());
                }
                //cc.log('new:', npos);
                n.setPosition(npos);
            }

            portait.node.stopAllActions();
            portait.action.pause();
            // portait.action.retain();
            // portait.node.retain();
            self.setRetain(portait.node, "ani");
            portait.action.play("standby", true);
            animation.runAction(portait.action);
        });
    },

    refresh_ui:function(){
        WidgetDig(this._ui, "main/text/name").setString(this._monsterRow.name);
        WidgetDig(this._ui, "main/text/level").setString(tj.cfg.get("text_on_ui/level") + this._monsterRow.Lv);
        WidgetDig(this._ui, "main/text/grade").setVisible(false);

        var skill_arr = [this._monsterRow.move1, this._monsterRow.move2, this._monsterRow.move3];

        //skill
        for(var idx in skill_arr) {
            var skill_id = skill_arr[idx];
            var skill_btn = WidgetDig(this._ui, "main/skill/btnSkill"+(parseInt(idx)+1));
            if(skill_id && skill_btn) {
                skill_btn.setVisible(true);
                skill_btn.skillID = skill_id;
                WidgetDig(skill_btn, "select").setVisible(false);
                WidgetDig(skill_btn, "add").setVisible(false);
                var skillIcon = tj.dbdata.getValueById("skill", skill_id, "icon");
                if(skillIcon)
                    WidgetDig(skill_btn, "icon").loadTexture(RES_ICON_SKILL_PATH + skillIcon, ccui.Widget.PLIST_TEXTURE);
            }else{
                skill_btn.setVisible(false);
            }
        }
        formation(WidgetDig(this._ui, "main/skill"), 15, 'center', 0, true);
    },

    refresh_attr:function(){
        var str = tj.cfg.get("text_on_ui/str") + Math.round(this._monsterRow.SelfAttr.Str + this._monsterEquipAttr.Str);
        WidgetDig(this._ui, "main/textMore/power").setString(str);
        var mag = tj.cfg.get("text_on_ui/mag") + Math.round(this._monsterRow.SelfAttr.Mag + this._monsterEquipAttr.Mag);
        WidgetDig(this._ui, "main/textMore/magic").setString(mag);
        var skl = tj.cfg.get("text_on_ui/skl") + Math.round(this._monsterRow.SelfAttr.Skl + this._monsterEquipAttr.Skl);
        WidgetDig(this._ui, "main/textMore/skill").setString(skl);
        var agl = tj.cfg.get("text_on_ui/agl") + Math.round(this._monsterRow.SelfAttr.Agl + this._monsterEquipAttr.Agl);
        WidgetDig(this._ui, "main/textMore/speed").setString(agl);
        var hp = tj.cfg.get("text_on_ui/hp") + Math.round(this._monsterRow.SelfAttr.Hp + this._monsterEquipAttr.Hp);
        WidgetDig(this._ui, "main/textMore/health").setString(hp);
        var def = tj.cfg.get("text_on_ui/def") + Math.round(this._monsterRow.SelfAttr.Def + this._monsterEquipAttr.Def);
        WidgetDig(this._ui, "main/textMore/defense").setString(def);
        var resistance = tj.cfg.get("text_on_ui/resist") + Math.round(this._monsterRow.SelfAttr.Resist + this._monsterEquipAttr.Resist);
        WidgetDig(this._ui, "main/textMore/resistance").setString(resistance);

        var race_arr = tj.cfg.get("designdata/race"); //怪物种族
        var race_idx = Math.max(0, parseInt(this._monsterRow.race) - 1);
        var race_str = (race_arr[race_idx]!=undefined) ? race_arr[race_idx]: '-';
        //【成长】改为显示怪物种族
        //this.setContentString(WidgetDig(this._ui, "main/textMore/growth"), tj.cfg.get("text_on_ui/race") + race_str);
        WidgetDig(this._ui, "main/textMore/growth").setString(tj.cfg.get("text_on_ui/race") + race_str);
        WidgetDig(this._ui, "main/HP/text").setString(Math.round(this._monsterRow.SelfAttr.Hp) * 10);
    },

    refresh_equip:function(){
        var btn_name = ["weapon", "shield", "assist","other"];
        for(var i=0;i<4;i++){
            var bname = btn_name[i];
            var uiEquipBtn = WidgetDig(this._ui, "main/equip/" + bname);
            var equip_id = this._monsterRow.Slot[i];
            if(equip_id == 0){
                uiEquipBtn.setVisible(false);
                continue;
            }
            var uiEquipIcon = WidgetDig(this._ui, "main/equip/" + bname + "/icon");
            var uiEquipFIcon = WidgetDig(this._ui, "main/equip/" + bname + "/level");
            WidgetDig(uiEquipBtn, "add").setVisible(false);
            uiEquipBtn.setEnabled(false);
            uiEquipIcon.setVisible(false);
            uiEquipFIcon.setVisible(false);
            uiEquipBtn.setEnabled(true);
            uiEquipBtn.equipID = equip_id;
            uiEquipBtn.slotIndex = i;
            tj.mainData.addEquipInfo(equip_id, equip_id);
            var equip = tj.mainData.getEquipByid(equip_id);
            if(equip) {
                uiEquipIcon.loadTexture(equip.Icon, ccui.Widget.PLIST_TEXTURE);
                uiEquipFIcon.loadTexture(equip.FrameIcon, ccui.Widget.PLIST_TEXTURE);
                uiEquipIcon.setVisible(true);
                uiEquipFIcon.setVisible(true);
            }
        }
    },

    calcMonterEquipAttr : function(monsterRow){
        var mon = {};
        mon.Hp = 0;
        mon.Str = 0;
        mon.Mag = 0;
        mon.Skl = 0;
        mon.Def = 0;
        mon.Resist = 0;
        mon.Agl = 0;
        mon.Power = 0;

        if(monsterRow.EquipAttr) {
            return monsterRow.EquipAttr;
        }else{
            return mon;
        }
    },

    viewMonster: function(p) {
        var arrowLeft = WidgetDig(this._ui, "page/btnLeft");
        var arrowRight = WidgetDig(this._ui, "page/btnRight");
        var mc = this._monsterids.length;
        switch(p) {
            default:
            case 'first':
                this._currMonsterIdx = 0;
                break;
            case 'last':
                this._currMonsterIdx = this._monsterids.length - 1;
                break;
            case 'next':
                this._currMonsterIdx++;
                if(this._currMonsterIdx >= this._monsterids.length) {
                    this._currMonsterIdx = this._monsterids.length - 1;
                }
                break;
            case 'prev':
                this._currMonsterIdx--;
                if(this._currMonsterIdx < 1) {
                    this._currMonsterIdx = 0;
                }
                break;
        }
        if(this._currMonsterIdx==0) {
            arrowLeft.setVisible(false);
            if(mc==1) {
                arrowRight.setVisible(false);
            }else{
                arrowRight.setVisible(true);
            }
        }else if(this._currMonsterIdx==mc-1) {
            arrowRight.setVisible(false);
            if (mc > 1) {
                arrowLeft.setVisible(true);
            } else {
                arrowLeft.setVisible(false);
            }
        }else{
            arrowLeft.setVisible(true);
            arrowRight.setVisible(true);
        }
        this._monsterid = this._monsterids[this._currMonsterIdx];
        this.refresh_monster();
    },

    _createPlate: function() {
        //测试功能：怪物图鉴
        var ms = tj.dbdata.gettable("monster");
        for(var i in ms) {
            var info = ms[i];
            if(info.figure=='' || (info.move1=='' && info.move2=='' && info.move3=='')) {
                continue;
            }
            this._createMonsterInfo(ms[i].id, {
                "Id": 15,
                "Tid": 0,
                "Job": 0,
                "Name": "???",
                "Lv": 1,
                "Slot": [0, 0, 0, 0],
                "Energy": 0,
                "SelfAttr": {
                    "Power": 0,
                    "Hp": 0,
                    "Str": 0,
                    "Mag": 0,
                    "Skl": 0,
                    "Def": 0,
                    "Resist": 0,
                    "Agl": 0,
                    "Coinbonus": 0,
                    "Expbonus": 0
                },
                "EquipAttr": {
                    "Power": 0,
                    "Hp": 0,
                    "Str": 0,
                    "Mag": 0,
                    "Skl": 0,
                    "Def": 0,
                    "Resist": 0,
                    "Agl": 0,
                    "Coinbonus": 0,
                    "Expbonus": 0
                },
                "AI": []
            });
        }
        WidgetDig(this._ui, "AI").setVisible(false);
        this.viewMonster('first');
    },

    defaultTouchButton : function(btn, type) {
        var that = this;
        if (type == ccui.Widget.TOUCH_ENDED) {
            switch(btn.getName())
            {
                case "btnClosed":
                    this.set_release();
                    if(this._cb)
                        this._cb();
                    break;
                case "weapon":
                case "shield":
                case "assist":
                case "other":
                    if(btn.equipID)
                        this._curr_popLayer = createNoteBoxCard(this, btn.equipID);
                    break;
                case "btnSkill1":
                case "btnSkill2":
                case "btnSkill3":
                    WidgetDig(this._ui, "main/skill/btnSkill1/select").setVisible(false);
                    WidgetDig(this._ui, "main/skill/btnSkill2/select").setVisible(false);
                    WidgetDig(this._ui, "main/skill/btnSkill3/select").setVisible(false);
                    WidgetDig(btn, "select").setVisible(true);
                    var str = tj.mainData.getSkillIntro(btn.skillID, this._monsterRow.SelfAttr, this._monsterEquipAttr, null);
                    this._curr_popLayer = createSkillNoteBox(this, str, this.on_notebox_close.bind(this));
                    break;
                case "btnRight":
                    this.viewMonster('next');
                    break;
                case "btnLeft":
                    this.viewMonster('prev');
                    break;
                case "btnSet":
                    this._createPlate();
                    break;
            }
        }
    },

    on_notebox_close:function(){
        WidgetDig(this._ui, "main/skill/btnSkill1/select").setVisible(false);
        WidgetDig(this._ui, "main/skill/btnSkill2/select").setVisible(false);
        WidgetDig(this._ui, "main/skill/btnSkill3/select").setVisible(false);
    },
});


createCardMonsterLayer = function(parent, data, id, cb){
    var pRet = new cardMonsterLayer(data, id, cb);
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

