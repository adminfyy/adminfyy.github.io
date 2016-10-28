/**
 * Created by likx on 2016/3/18.
 */
var box_card_from_t = {"warehouse":1, "bag":2, "selectequip":3, "selectitem":4, "herocard":5, "herocard_camp":6, "herocard_rank":7,"map_drop":8};
var box_card_opt_t = {"discard":1, "change":2, "takeDown":3, "disassembly":4, "select":5, "recasting":6};

var noteBoxCard = baseLayer.extend({
    _cb:null,
    _from_t:0,
    _item_id:0,
    _itemclass:0,
    _btnUse:null,
    _btnChange:null,
    _btnRecasting:null,
    _args : null,
    _attrs:[],

    ctor : function(){
        this._super();
        this._basename = "noteboxcard";
        this._beTop = false;
        this._attrs = [];
    },

    init : function(itemid, from_t, cb, args) {
        if (!this._super())
            return false;

        this._cb = cb;
        this._from_t = from_t;
        this._item_id = itemid;

        this._args = args ;
        if(!this._args)
            this._args = {};
        if( !this._args.swallow)
            this._args.swallow = false;

        this._ui = this.load_ui("boxTextCard.json");
        if (!this._ui)
            return false;
        this.addChild(this._ui);


        this._uiText = WidgetDig(this._ui, "text");
        WidgetDig(this._ui, "box").setTouchEnabled(false);
        WidgetDig(this._ui, "set").setTouchEnabled(false);

        this._btnUse =  WidgetDig(this._ui, "set/btnUse");
        this._btnUse.setVisible(false);

        this._btnChange = this._btnUse.clone();
        this._btnChange.setName("btnChange");
        this._btnChange.setPosition(cc.p(this._btnUse.getPosition().x, this._btnUse.getPosition().y - 90));
        WidgetDig(this._ui, "set").addChild(this._btnChange);
        this._btnChange.setVisible(false);

        //this._btnRecasting = this._btnUse.clone();
        //this._btnRecasting.setName("btnRecasting");
        //this._btnRecasting.setPosition(cc.p(this._btnChange.getPosition().x, this._btnChange.getPosition().y - 90));
        //WidgetDig(this._ui, "set").addChild(this._btnRecasting);
        //this._btnRecasting.setVisible(false);

        this._listener = cc.EventListener.create({
            event           : cc.EventListener.TOUCH_ONE_BY_ONE,
            target          : this,
            swallowTouches  : this._args.swallow,
            onTouchBegan: function (touch, event) {
                return true;
            }.bind(this),
            onTouchEnded    : this.onTouchEnd.bind(this)
        });
        cc.eventManager.addListener(this._listener, this);

        var info = "";
        WidgetDig(this._ui, "btnMain").setEnabled(false);
        var uiIcon = WidgetDig(this._ui, "btnMain/portraits/icon");
        var uiFIcon = WidgetDig(this._ui, "btnMain/portraits/level");
        var uiName = WidgetDig(this._ui, "btnMain/portraits/textName");
        var uiNum = WidgetDig(this._ui, "btnMain/portraits/textNum");
        uiNum.setVisible(false);
        var icon = tj.mainData.getItemIcon(itemid);
        var ficon = tj.mainData.getItemFrameIcon(itemid);
        var name = tj.mainData.getItemName(itemid);
        if(name)
            uiName.setString(name);
        if(icon)
            uiIcon.loadTexture(icon, ccui.Widget.PLIST_TEXTURE);
        if(ficon)
            uiFIcon.loadTexture(ficon, ccui.Widget.PLIST_TEXTURE);

        this._itemclass = tj.mainData.getItemClass(itemid);
        var c_equip = null; //原装备
        if(this._itemclass == itemClass.item || this._itemclass == itemClass.resource){
            info = tj.mainData.getItemExplain(itemid);
        }
        else if(this._itemclass == itemClass.equip){
            this._equip = tj.mainData.getEquipByid(itemid);
            if(this._from_t == box_card_from_t.herocard_rank)
                this._equip = tj.mainData.getRankEquipByid(itemid);
            if(this._args.change_eid)
                c_equip = tj.mainData.getEquipByid(this._args.change_eid);
            if(this._args.r_equip)
                c_equip = this._args.r_equip;
            if(!this._equip)
                return;

            if(tj.mainData.equipTypeIsWeapon(this._equip.Type))
                this.addAttr("powerNum", this._equip.Val);

            this.addAttr("herohp", this._equip.Hp);
            this.addAttr("heroagl", this._equip.Agl);
            this.addAttr("herodef", this._equip.Def);
            this.addAttr("heromag", this._equip.Mag);
            this.addAttr("herostr", this._equip.Str);
            this.addAttr("heroresist", this._equip.Resist);
            this.addAttr("heroskl", this._equip.Skl);
            this.addAttr("herohitRate", this._equip.HitRate);
            this.addAttr("herododgeRate", this._equip.DodgeRate);
            this.addAttr("herohealVal", this._equip.HealVal);
            this.addAttr("herocritRate", this._equip.CritRate);
            this.addAttr("herobuffDuc", this._equip.BuffDuc);
            this.addAttr("herocoinbonus", this._equip.Coinbonus);
            this.addAttr("heroexpbonus", this._equip.Expbonus);
            if(this._equip.ImmuTag > 0) {
                var immuTag = tj.cfg.getAttr("designdata/immuTag", "immuTag" + this._equip.ImmuTag);
                this.addAttr("immuTag"+this._equip.ImmuTag, tj.cfg.getAttr("designdata/immuTag", "immuTag0").format(immuTag));
            }

            if(c_equip){
                if(tj.mainData.equipTypeIsWeapon(c_equip.Type))
                    this.addAttr("powerNum", c_equip.Val, true);
                this.addAttr("herohp", c_equip.Hp, true);
                this.addAttr("heroagl", c_equip.Agl, true);
                this.addAttr("herodef", c_equip.Def, true);
                this.addAttr("heromag", c_equip.Mag, true);
                this.addAttr("herostr", c_equip.Str, true);
                this.addAttr("heroresist", c_equip.Resist, true);
                this.addAttr("heroskl", c_equip.Skl, true);
                this.addAttr("herohitRate", c_equip.HitRate, true);
                this.addAttr("herododgeRate", c_equip.DodgeRate, true);
                this.addAttr("herohealVal", c_equip.HealVal, true);
                this.addAttr("herocritRate", c_equip.CritRate, true);
                this.addAttr("herobuffDuc", c_equip.BuffDuc, true);
                this.addAttr("herocoinbonus", c_equip.Coinbonus, true);
                this.addAttr("heroexpbonus", c_equip.Expbonus, true);
                if(c_equip.ImmuTag > 0) {
                    immuTag = tj.cfg.getAttr("designdata/immuTag", "immuTag" + c_equip.ImmuTag);
                    this.addAttr("immuTag"+c_equip.ImmuTag, tj.cfg.getAttr("designdata/immuTag", "immuTag0").format(immuTag), true);
                }
            }

            if(this._args.heroid && this._args.change_eid != undefined){
                var c_heroinfo = tj.mainData.getOwnHeroById(this._args.heroid);
                var heroinfo = JSON.parse( JSON.stringify(c_heroinfo));
                for (var i in heroinfo.Slot) {
                    var equipid = heroinfo.Slot[i];
                    if(equipid == this._args.change_eid){
                        heroinfo.Slot[i] = this._equip.id;
                        var delea = tj.mainData.refreshHeroEquipAttr(heroinfo);
                        break;
                    }
                }

                var style = tj.dbdata.getValueById("job", heroinfo.Job, "style");
                var row = tj.dbdata.getrow("combatpower", style);
                var power = row.hp * (heroinfo.SelfAttr.Hp + heroinfo.EquipAttr.Hp);
                power += row.str * (heroinfo.SelfAttr.Str + heroinfo.EquipAttr.Str);
                power += row.mag * (heroinfo.SelfAttr.Mag + heroinfo.EquipAttr.Mag);
                power += row.skl * (heroinfo.SelfAttr.Skl + heroinfo.EquipAttr.Skl);
                power += row.def * (heroinfo.SelfAttr.Def + heroinfo.EquipAttr.Def);
                power += row.duc * (heroinfo.SelfAttr.Resist + heroinfo.EquipAttr.Resist);
                power += row.agl * (heroinfo.SelfAttr.Agl + heroinfo.EquipAttr.Agl);
                power += row.power * (heroinfo.SelfAttr.Power + heroinfo.EquipAttr.Power);
                power += row.hitRate * heroinfo.EquipAttr.HitRate;
                power += row.dodgeRate * heroinfo.EquipAttr.DodgeRate;
                power += row.critRate * heroinfo.EquipAttr.CritRate;
                power += row.healVal * heroinfo.EquipAttr.HealVal;
                power = Math.floor(power);
                var p = (power - c_heroinfo.Power);
                newatt = {};
                newatt.flag = "heropower";
                newatt.val = power.toString() + "   ";
                newatt.delta = p;
                this._attrs.push(newatt);
            }

            for(var i in this._attrs){
                if(info != "")
                    info += "\n";
                var att = this._attrs[i];
                var title = tj.cfg.get("text_on_ui/" + att.flag);
                if(title)
                    info += title;
                if(att.val != -1){
                    if(typeof(att.val) == "number"){
                        if(att.val > 0)
                            info += "+ " + att.val;
                        else if(att.val < 0)
                            info += "- " + Math.abs(att.val);
                        else
                            info += " " + att.val;
                    }else
                        info += att.val;
                }
            }
        }

        if(tj.isInMap){
            if(info != "") {
                info += "\n\n";
            }
            info += tj.cfg.get("text_on_ui/weight") + tj.mainData.getItemWeight(itemid);
        }

        this._uiText.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        var lineinfo = this.setContentString(this._uiText, info, AUTO_STR_NEWLINE);

        if(this._args.change_eid != undefined)
            this.changeEffect(lineinfo.height);

        var size = this._uiText.getContentSize();
        var box_csize = WidgetDig(this._ui, "box").getContentSize();
        box_csize.height = size.height + 200;

        var box = WidgetDig(this._ui, "box");
        var box_bg = WidgetDig(this._ui, "box/BG");
        box.setAnchorPoint(cc.p(0.5, 0.5));
        box.setContentSize(box_csize);
        box_bg.setAnchorPoint(cc.p(0.5, 0.5));
        box_bg.setContentSize(box_csize);

        var set_h = box.getPosition().y - box_csize.height;
        var set = WidgetDig(this._ui, "set");
        set.setPosition(set.getPosition().x, set_h);

        this.refresh_button();

        this.transIn(N_TRANS_IN_ANI, N_TRANS_IN_TIEM, {
            ease: N_TRANS_IN_EASE
        });
        return true;
    },

    addAttr:function(flag, val){
        var change = arguments[2] ? arguments[2] : false;
        if(val == 0)
            return;
        if(change){
            for(var i in this._attrs){
                var att = this._attrs[i];
                if(att.flag == flag) {
                    if(typeof(val) == "number")
                        att.delta = att.val - val;
                    else
                        att.symbol = -1;
                    return;
                }
            }
            var newatt = {};
            newatt.flag = flag;
            newatt.val = 0;
            newatt.delta = 0;
            if(typeof(val) == "number")
                newatt.delta = -val;
            else {
                newatt.delta = val;
                newatt.val = val;
                newatt.symbol = 0;
            }
            this._attrs.push(newatt);
        }else{
            newatt = {};
            newatt.flag = flag;
            newatt.val = val;
            newatt.delta = val;
            newatt.symbol = 1;
            this._attrs.push(newatt);
        }
    },

    changeEffect:function(lineheight){
        var fontsize = this._uiText.getFontSize();
        var fontname = this._uiText.getFontName();
        var idx = 0;
        for (var i in this._attrs) {
            var att = this._attrs[i];
            var anchor = {
                anchorX: 0,
                anchorY: 1
            };
            var pos = this._uiText.getPosition();
            pos.x += 45;
            pos.y -= idx * lineheight;
            var del = " ";
            var color = cc.color.WHITE;
            if(att.delta > 0) {
                del = "  （+" + att.delta + "）";
                color = cc.color.GREEN;
            }else if(att.delta < 0) {
                del = "  （" + att.delta + "）";
                color = cc.color.RED;
            }else if(typeof(att.delta) == "string"){
                if(att.symbol == 1){
                    del = "  （" + tj.cfg.get("text_on_ui/getImmu") + "）";
                    color = cc.color.GREEN;
                }else if(att.symbol == 0){
                    del = "  （" + tj.cfg.get("text_on_ui/lostImmu") + "）";
                    color = cc.color.RED;
                }
            }
            var text = new ccui.Text(del, "", fontsize);
            this.setRetain(text, "text");
            text.attr(anchor);
            text.setFontName(fontname);
            var col = new cc.Color(10, 10, 10, 255);
            text.enableOutline(col, 2)
            text.setColor(color);
            text.setPosition(pos.x , pos.y);
            this._ui.addChild(text);
            text.setOpacity(0);
            var e0 = new cc.FadeIn(0.5);
            var d1 = new cc.DelayTime(1);
            var q = cc.sequence(e0, d1);
            text.runAction(q);
            idx++;
        }
    },

    refresh_button:function(){
        switch (this._from_t){
            case box_card_from_t.warehouse:
                if(this._itemclass == itemClass.equip){
                    this._btnUse.opt = box_card_opt_t.disassembly;
                    WidgetDig(this._btnUse, "text").setString(tj.cfg.get("text_on_ui/pub/disassembly"));
                    this._btnUse.setVisible(true);
                    //this._btnChange.opt = box_card_opt_t.discard;
                    //WidgetDig(this._btnChange, "text").setString(tj.cfg.get("text_on_ui/discard"));
                    //this._btnChange.setVisible(true);

                    this._equip = tj.mainData.getEquipByid(this._item_id);
                    if(this._equip.Recasting){
                        this._btnChange.setVisible(true);
                        this._btnChange.opt = box_card_opt_t.recasting;
                        WidgetDig(this._btnChange, "text").setString(tj.cfg.get("text_on_ui/recasting"));
                        this._btnChange.setVisible(true);
                    }
                }else{
                    var item = tj.mainData.getItemInfo(this._item_id);
                    if(item.canBeUsed){
                        this._btnUse.opt = box_card_opt_t.disassembly;
                        WidgetDig(this._btnUse, "text").setString(tj.cfg.get("text_on_ui/pub/disassembly"));
                        this._btnUse.setVisible(true);
                        //if(item.type != itemType.valuables){
                        //    this._btnChange.opt = box_card_opt_t.discard;
                        //    WidgetDig(this._btnChange, "text").setString(tj.cfg.get("text_on_ui/discard"));
                        //    this._btnChange.setVisible(true);
                        //}
                    }else if(item.type != itemType.valuables){
                        this._btnUse.opt = box_card_opt_t.discard;
                        WidgetDig(this._btnUse, "text").setString(tj.cfg.get("text_on_ui/discard"));
                        this._btnUse.setVisible(true);
                    }
                }
                break;
            case box_card_from_t.bag:
                this._btnUse.setVisible(false);
                break;
            case box_card_from_t.selectequip:
            case box_card_from_t.selectitem:
                this._btnUse.opt = box_card_opt_t.select;
                WidgetDig(this._btnUse, "text").setString(tj.cfg.get("text_on_ui/select"));
                this._btnUse.setVisible(true);
                break;
            case box_card_from_t.herocard:
            case box_card_from_t.herocard_camp:
                this._btnChange.opt = box_card_opt_t.change;
                WidgetDig(this._btnChange, "text").setString(tj.cfg.get("text_on_ui/pub/change"));
                this._btnUse.opt = box_card_opt_t.takeDown;
                WidgetDig(this._btnUse, "text").setString(tj.cfg.get("text_on_ui/pub/takeDown"));
                this._btnUse.setVisible(true);
                this._btnChange.setVisible(true);
                break;
            default :
                this._btnUse.setVisible(false);
                this._btnChange.setVisible(false);
        }

    },

    onTouchEnd : function(touches, event){
        this.set_release();
        return true;
    },

    onExit: function () {
        this._super();

        if(this._tjParent)
        	this._tjParent.onChildLayerRemove();
    },

    defaultTouchButton : function(btn, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            switch (btn.getName()) {
                case "btnUse":
                case "btnChange":
                case "btnRecasting":
                    switch(btn.opt){
                        case box_card_opt_t.select:
                            if(this._cb)
                                this._cb(this._item_id);
                            break;
                        case box_card_opt_t.takeDown:
                            if(tj.mainData.isHeroInMop(this._equip.Owner)){
                                this.noticetext_add(tj.cfg.get("text/tavern/mopNoChangeEquip"));
                                break;
                            }
                            tj.wsconnection.setMsg(msgac["Hero_remove_equipment"], {"id_hero": this._equip.Owner, "slot":this._equip.Slot});
                            this.set_release();
                            break;
                        case box_card_opt_t.change: //
                            if(tj.mainData.isHeroInMop(this._equip.Owner)){
                                this.noticetext_add(tj.cfg.get("text/tavern/mopNoChangeEquip"));
                                break;
                            }
                            var is_camp = false;
                            if(this._from_t == box_card_from_t.herocard_camp)
                                is_camp = true;
                            if (!createEquipSelect(this, is_camp, this._equip.Type, this._equip.Slot, this.select_Callback.bind(this), this._item_id, this._args.heroid)){
                                if( tj.mainData.equipTypeIsWeapon(this._equip.Type))
                                    this.noticetext_add(tj.cfg.get("text/tavern/noEquopWeapon"));
                                if( this._equip.Type == 6)
                                    this.noticetext_add(tj.cfg.get("text/tavern/noEquopGuard"));
                                if( this._equip.Type == 7)
                                    this.noticetext_add(tj.cfg.get("text/tavern/noEquopCollect"));
                            }
                            break;
                        case box_card_opt_t.disassembly: //分解
                            var that = this;
                            if(tj.mainData.cheak_itemuse_out(this._item_id)){
                                var resname = tj.mainData.getItemOutResName(this._item_id);
                                var str = tj.cfg.get("text/warehouse/itemuseOut").format(resname);
                                createMsgBox2(this, str, function(tag){
                                    if (tag == 0)
                                        that.disassembly();
                                    return true;
                                }, 2);
                            }else
                                this.disassembly();
                            break;
                        case box_card_opt_t.discard: //丢弃
                            var itemid = this._item_id;
                            var itemInfo = tj.mainData.getItemInfo(itemid);
                            if(itemInfo && itemInfo["canBeDrop"]){
                                this.noticetext_add(tj.cfg.get("text/warehouse/notDrop"));
                            }else {
                                var gl2 = new useGemLayer(function () {
                                    return useGemLayer.buildDropItemSureData();
                                }, function (v) {
                                    cc.log("useGemLayer return:", typeof(v), v);
                                    switch (v) {
                                        case 0:
                                            var num = tj.mainData.getItemNum(itemid);
                                            tj.wsconnection.setMsg(msgac["Storage_drop"], {"id": itemid, "num": num});
                                            break;
                                        default:
                                            break;
                                    }
                                });
                                this.addChild(gl2);
                                gl2._tjParent = this;
                            }
                            break;
                        case box_card_opt_t.recasting:
                            createRecastLayer(this.getParent(),this._item_id);
                            this.set_release();
                            //var recastingFee=0;
                            //var recastingCoin = 0;
                            //if(this._equip){
                            //    recastingFee = this._equip.RecastingFee;
                            //    recastingCoin = this._equip.RecastingCoin;
                            //}
                            //
                            //var str = tj.cfg.get("text/warehouse/recastingAsk");
                            //var msgbox = createMsgBox2(this, str, function(tag){
                            //    if (tag == 0 )
                            //        tj.wsconnection.setMsg(msgac["Storage_recast_equip"], {"id": this._item_id, "gem":0});
                            //    else if( tag == 1)
                            //        tj.wsconnection.setMsg(msgac["Storage_recast_equip"], {"id": this._item_id, "gem":1});
                            //    return true;
                            //}.bind(this));
                            //msgbox.add_btn(tj.cfg.get("text/warehouse/btnRecasting1").format(recastingCoin), 0);
                            //msgbox.add_btn(tj.cfg.get("text/warehouse/btnRecasting2").format(recastingFee), 1);
                            //msgbox.add_btn(tj.cfg.get("text_on_ui/cancel", ""), 2);
                            break;
                    }
                    break;
            }
        }
    },

    disassembly:function(){
        if(this._itemclass == itemClass.item){
            var iteminfo = tj.mainData.getItemInfo(this._item_id);
            if(iteminfo && iteminfo.itemLv >= 5){
                str = tj.cfg.get("text/warehouse/disassemblyItem");
                this._curr_popLayer = createMsgBox2(this, str, function(tag){
                    if (tag == 0)
                        tj.wsconnection.setMsg(msgac["Storage_use_item"], {"id": this._item_id, "num":1});
                    return true;
                }.bind(this), 2);
            }else
                tj.wsconnection.setMsg(msgac["Storage_use_item"], {"id": this._item_id, "num":1});
        }
        else if(this._itemclass == itemClass.equip){
            var equip = tj.mainData.getEquipByid(this._item_id);
            if(equip && equip.Proficiency >= 4){
                var str = tj.cfg.get("text/warehouse/disassemblyEquip");
                this._curr_popLayer = createMsgBox2(this, str, function(tag){
                    if (tag == 0)
                        tj.wsconnection.setMsg(msgac["Storage_break_equip"], {"id": this._item_id});
                    return true;
                }.bind(this), 2);
            }else
                tj.wsconnection.setMsg(msgac["Storage_break_equip"], {"id": this._item_id});
        }
    },

    select_Callback: function (equipid, slot) {
        tj.wsconnection.setMsg(msgac["Hero_use_equipment"], {"id_hero": this._equip.Owner, "id_eq":equipid, "slot":slot});
    }
});

function createNoteBoxCard(parent, itemid, from_t, cb, args) {
    var pRet = new noteBoxCard();
    if (pRet && pRet.init(itemid, from_t, cb, args)) {
        var z = -1;
        var childs = parent.getChildren();
        for (var i = 0; i < childs.length; ++i) {
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
/**
 * Created by likx on 2016/5/27.
 */
