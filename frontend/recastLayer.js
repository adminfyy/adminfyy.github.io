
var  recastLayer_tag = 1234500;

var recastLayer = baseLayer.extend({

    _localText : null,

    _beforeAttrText : null,
    _maxAttrText : null,
    _nameText : null,

    _useGemText : null,
    _useCoinText : null,

    _itemId : 0,
    _recastAfterAttr : null,

    ctor : function(parent,itemId){
        this._super();
        this._basename = "recastLayer";
        if(itemId) {
            this._itemId = itemId;
        }else{
            this._itemId = 0;
        }
    },

    init : function(){
        if (!this._super())
            return false;

        this._ui = this.load_ui("boxRecast.json");
        if (this._ui == -1)
            return true;
        if (!this._ui)
            return false;
        this.addChild(this._ui);

        this._localText = tj.cfg.get("text/atelier/recast");

        this.initUI();

        if(this._itemId){
            this.refreshChoseItem();
        }

        return true;
    },

    initUI : function(){
        this._nameText = WidgetDig(this._ui,"main/prop/textName");
        this._beforeAttrText = WidgetDig(this._ui,"main/prop/textBefore");
        this._maxAttrText = WidgetDig(this._ui,"main/prop/textAfter");
        this._beforeAttrText.setVisible(false);
        this._maxAttrText.setVisible(false);
        this._beforeAttrText.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_TOP);
        this._maxAttrText.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_TOP);

        WidgetDig(this._ui,"main/prop/titleBefore").setString(this._localText.currentAttr);
        WidgetDig(this._ui,"main/prop/titleAfter").setString(this._localText.maxAddAttr);

        WidgetDig(this._ui,"set/btnGold/text").setString(this._localText.useCoin);
        WidgetDig(this._ui,"set/btnGem/text").setString(this._localText.useGem);
        WidgetDig(this._ui,"set/btnClosed/text").setString(tj.cfg.get("text_on_ui/close"));
        this._useCoinText = WidgetDig(this._ui,"set/btnGold/textNum");
        this._useGemText = WidgetDig(this._ui,"set/btnGem/textNum");

        this._useCoinText.setString(0);
        this._useGemText.setString(0);
        this._nameText.setString(this._localText.choseEquip);

    },

    onEnter : function(){
        this._super();

        tj.wsconnection.addGrp(msgac["Storage_recast_equip"], msgac["Storage_recast_equip"], this.process_ac.bind(this), this.get_scene_name());
    },

    process_ac: function (doc) {
        var msg_id = doc[0];
        var data = doc[1];
        switch (msg_id) {
            case msgac["Storage_recast_equip"]:
                switch (data.ret){
                    case 0:
                        if(this._curr_popLayer)
                            this._curr_popLayer.set_release();

                        if(data.data.equip_info){
                            this._recastAfterAttr = JSON.parse(JSON.stringify(data.data.equip_info));
                            this.refreshAfterRecast(this._recastAfterAttr);
                            tj.mainData.updateEquipInfo(data.data.equip_info);
                        }

                        if(data.data.gemcost){
                            tj.mainData.setGemNum(data.data.gemcost.left);
                            var gemid = tj.cfg.getAttr("designdata/itemID", "gemid");
                            this.noticetext_add(tj.mainData.getItemName(gemid) + " " + data.data.gemcost.delta, true);
                        }
                        if(data.data.coincost){
                            tj.mainData.setCoinNum(data.data.coincost.left);
                            var coinid = tj.cfg.getAttr("designdata/itemID", "coinid");
                            this.noticetext_add(tj.mainData.getItemName(coinid) + " " + data.data.coincost.delta, true);
                        }
                        break;
                    case -1:
                        this.noticetext_add(tj.cfg.get("text/iderror"), true);
                        break;
                    case -5:
                        this.noticetext_add(tj.cfg.get("text/no_recast"), true);
                        break;
                    case -10:
                        this.noticetext_add(tj.cfg.get("text/attr_err"), true);
                        break;
                    case -15:
                        this.noticetext_add(tj.cfg.get("text/data_err"), true);
                        break;
                    case -18:
                        this.noticetext_add(tj.cfg.get("text/notgold"), true);
                        break;
                    case -20:
                        this.noticetext_add(tj.cfg.get("text/notdiamond"), true);
                        break;
                }
                break;
            default :
                break;
        }
    },

    update : function(dt){
        this._super(dt);

    },

    refreshChoseItem : function(){
        var itemInfo = tj.mainData.getEquipByid(this._itemId);
        //SDKTools.sdkLog(itemInfo);
        var itemName = tj.mainData.getItemName(this._itemId);
        this._nameText.setString(itemName);


        var icon = tj.mainData.getItemIcon(this._itemId);
        if (icon)
            WidgetDig(this._ui,"main/prop/portraits/icon").loadTexture(icon, ccui.Widget.PLIST_TEXTURE);
        var frameicon = tj.mainData.getItemFrameIcon(this._itemId);
        if(frameicon)
            WidgetDig(this._ui,"main/prop/portraits/level").loadTexture(frameicon, ccui.Widget.PLIST_TEXTURE);

        this._useCoinText.setString(itemInfo.RecastingCoin);
        this._useGemText.setString(itemInfo.RecastingFee);

        this._attrs = [];
        if(tj.mainData.equipTypeIsWeapon(itemInfo.Type))
            this.addAttr("powerNum", itemInfo.Val);
        this.addAttr("herohp", itemInfo.Hp);
        this.addAttr("heroagl", itemInfo.Agl);
        this.addAttr("herodef", itemInfo.Def);
        this.addAttr("heromag", itemInfo.Mag);
        this.addAttr("herostr", itemInfo.Str);
        this.addAttr("heroresist", itemInfo.Resist);
        this.addAttr("heroskl", itemInfo.Skl);
        this.addAttr("herohitRate", itemInfo.HitRate);
        this.addAttr("herododgeRate", itemInfo.DodgeRate);
        this.addAttr("herohealVal", itemInfo.HealVal);
        this.addAttr("herocritRate", itemInfo.CritRate);
        this.addAttr("herobuffDuc", itemInfo.BuffDuc);
        this.addAttr("herocoinbonus", itemInfo.Coinbonus);
        this.addAttr("heroexpbonus", itemInfo.Expbonus);
        if(itemInfo.ImmuTag > 0) {
            var immuTag = tj.cfg.getAttr("designdata/immuTag", "immuTag" + itemInfo.ImmuTag);
            this.addAttr("immuTag"+itemInfo.ImmuTag, tj.cfg.getAttr("designdata/immuTag", "immuTag0").format(immuTag));
        }

        this._beforeAttrText.setVisible(true);
        var cont = this._beforeAttrText.getContentSize();
        if(!this._linghight) {
            this._linghight = this.setContentString(this._beforeAttrText, this.getAttrText(this._attrs), AUTO_STR_NEWLINE).height;
        }
        this._beforeAttrText.setContentSize(cont);
        this._beforeAttrText.setString(this.getAttrText(this._attrs));

        // 极限值计算
        var itemAllInfo = tj.dbdata.getrow("equipattribute", itemInfo.eqid);
        this._maxAttrs = [];

        var runeObj = tj.dbdata.getrow("randequip",itemAllInfo.recastingId);
        var runeAddAttr = {};
        runeAddAttr.hpMax = 0;
        runeAddAttr.hp = 0;
        runeAddAttr.strMax = 0;
        runeAddAttr.str = 0;
        runeAddAttr.magMax = 0;
        runeAddAttr.mag = 0;
        runeAddAttr.sklMax = 0;
        runeAddAttr.skl = 0;
        runeAddAttr.defMax = 0;
        runeAddAttr.def = 0;
        runeAddAttr.resistMax = 0;
        runeAddAttr.resist = 0;
        runeAddAttr.aglMax = 0;
        runeAddAttr.agl = 0;
        runeAddAttr.coinBonus = 0;
        runeAddAttr.expBonus = 0;
        runeAddAttr.standard = 0;
        runeAddAttr.attributeMax = 0;
        var mult = 2;
        for(var i=1;i<=5;i++){
            var key = "rune"+i;
            var runeId = runeObj[key];
            if(runeId){
                var rune = tj.dbdata.getrow("rune",runeId);
                if(rune.hpMax){
                    runeAddAttr.hpMax += (rune.hpMax*mult);
                }
                if(rune.hp){
                    runeAddAttr.hp += (rune.hp*mult);
                }
                if(rune.strMax){
                    runeAddAttr.strMax += (rune.strMax*mult);
                }
                if(rune.str){
                    runeAddAttr.str += (rune.str*mult);
                }
                if(rune.magMax){
                    runeAddAttr.magMax += (rune.magMax*mult);
                }
                if(rune.mag){
                    runeAddAttr.mag += (rune.mag*mult);
                }
                if(rune.sklMax){
                    runeAddAttr.sklMax += (rune.sklMax*mult);
                }
                if(rune.skl){
                    runeAddAttr.skl += (rune.skl*mult);
                }
                if(rune.defMax){
                    runeAddAttr.defMax += (rune.defMax*mult);
                }
                if(rune.def){
                    runeAddAttr.def += (rune.def*mult);
                }
                if(rune.resistMax){
                    runeAddAttr.resistMax += (rune.resistMax*mult);
                }
                if(rune.resist){
                    runeAddAttr.resist += (rune.resist*mult);
                }
                if(rune.aglMax){
                    runeAddAttr.aglMax += (rune.aglMax*mult);
                }
                if(rune.agl){
                    runeAddAttr.agl += (rune.agl*mult);
                }
                if(rune.coinBonus){
                    runeAddAttr.coinBonus += (rune.coinBonus*mult);
                }
                if(rune.expBonus){
                    runeAddAttr.expBonus += (rune.expBonus*mult);
                }
                if(rune.standard){
                    runeAddAttr.standard = rune.standard;
                }
                if(rune.attributeMax){
                    runeAddAttr.attributeMax = rune.attributeMax;
                }
            }
        }

        var forge_lv = tj.mainData.getAtelier().forge_skill_lv;
        var newUpValueFunc = function(oldDownValue,oldUpValue,k){
            var value = (k-1)/2*oldDownValue + (k+1)/2*oldUpValue;
            return Math.floor(value);
        };
        var maxK = 0;
        if(forge_lv) {
            var row = tj.dbdata.getbysql("forgeskillexp", "where (lv == '" + forge_lv + "')")[0];
            var k = row.power;
            maxK = Math.max(maxK,k);
            this.addMaxAttr("powerNum", newUpValueFunc(itemAllInfo.power,itemAllInfo.powerMax,k));

            k = row.hp;
            maxK = Math.max(maxK,k);
            this.addMaxAttr("herohp", newUpValueFunc(runeAddAttr.hp,runeAddAttr.hpMax,k));

            k = row.agl;
            maxK = Math.max(maxK,k);
            this.addMaxAttr("heroagl", newUpValueFunc(runeAddAttr.agl,runeAddAttr.aglMax,k));

            k = row.def;
            maxK = Math.max(maxK,k);
            this.addMaxAttr("herodef", newUpValueFunc(itemAllInfo.def+runeAddAttr.def,itemAllInfo.defMax+runeAddAttr.defMax,k));

            k = row.mag;
            maxK = Math.max(maxK,k);
            this.addMaxAttr("heromag", newUpValueFunc(runeAddAttr.mag,runeAddAttr.magMax,k));

            k = row.str;
            maxK = Math.max(maxK,k);
            this.addMaxAttr("herostr", newUpValueFunc(runeAddAttr.str,runeAddAttr.strMax,k));

            k = row.resist;
            maxK = Math.max(maxK,k);
            this.addMaxAttr("heroresist", newUpValueFunc(itemAllInfo.resist+runeAddAttr.resist,itemAllInfo.resistMax+runeAddAttr.resistMax,k));

            k = row.skl;
            maxK = Math.max(maxK,k);
            this.addMaxAttr("heroskl", newUpValueFunc(runeAddAttr.skl,runeAddAttr.sklMax,k));
        }else {
            this.addMaxAttr("powerNum", itemAllInfo.powerMax);
            this.addMaxAttr("herohp", runeAddAttr.hpMax);
            this.addMaxAttr("heroagl", runeAddAttr.aglMax);
            this.addMaxAttr("herodef", itemAllInfo.defMax + runeAddAttr.defMax);
            this.addMaxAttr("heromag", runeAddAttr.magMax);
            this.addMaxAttr("herostr", runeAddAttr.strMax);
            this.addMaxAttr("heroresist", itemAllInfo.resistMax + runeAddAttr.resistMax);
            this.addMaxAttr("heroskl", runeAddAttr.sklMax);
        }
        this.addMaxAttr("herohitRate", itemInfo.HitRate);
        this.addMaxAttr("herododgeRate", itemInfo.DodgeRate);
        this.addMaxAttr("herohealVal", itemInfo.HealVal);
        this.addMaxAttr("herocritRate", itemInfo.CritRate);
        this.addMaxAttr("herobuffDuc", itemInfo.BuffDuc);
        this.addMaxAttr("herocoinbonus", itemInfo.Coinbonus + runeAddAttr.coinBonus);
        this.addMaxAttr("heroexpbonus", itemInfo.Expbonus + runeAddAttr.expBonus);
        if(itemInfo.ImmuTag > 0) {
            var immuTag = tj.cfg.getAttr("designdata/immuTag", "immuTag" + itemInfo.ImmuTag);
            this.addMaxAttr("immuTag"+itemInfo.ImmuTag, tj.cfg.getAttr("designdata/immuTag", "immuTag0").format(immuTag));
        }

        // 尤尔魔戒特殊处理
        var maxAddAttrMsg = this.getAttrText(this._maxAttrs);
        if(itemInfo.eqid == 8012){
            var value = newUpValueFunc(runeAddAttr.standard,runeAddAttr.attributeMax,maxK);
            maxAddAttrMsg += ("\n"+this._localText.randomAdd.format(value)+"\n"+this._localText.randomAdd.format(value));
        }

        this._maxAttrText.setVisible(true);
        this._maxAttrText.setString(maxAddAttrMsg);
    },

    updateAttrs : function(recastAfterAttr){
        var itemInfo = tj.mainData.getEquipByid(this._itemId);
        this._attrs = [];
        if(tj.mainData.equipTypeIsWeapon(itemInfo.Type))
            this.addAttr("powerNum", itemInfo.Val,recastAfterAttr.Val);
        this.addAttr("herohp", itemInfo.Hp,recastAfterAttr.Hp);
        this.addAttr("heroagl", itemInfo.Agl,recastAfterAttr.Agl);
        this.addAttr("herodef", itemInfo.Def,recastAfterAttr.Def);
        this.addAttr("heromag", itemInfo.Mag,recastAfterAttr.Mag);
        this.addAttr("herostr", itemInfo.Str,recastAfterAttr.Str);
        this.addAttr("heroresist", itemInfo.Resist,recastAfterAttr.Resist);
        this.addAttr("heroskl", itemInfo.Skl,recastAfterAttr.Skl);
        this.addAttr("herohitRate", itemInfo.HitRate,recastAfterAttr.HitRate);
        this.addAttr("herododgeRate", itemInfo.DodgeRate,recastAfterAttr.DodgeRate);
        this.addAttr("herohealVal", itemInfo.HealVal,recastAfterAttr.HealVal);
        this.addAttr("herocritRate", itemInfo.CritRate,recastAfterAttr.CritRate);
        this.addAttr("herobuffDuc", itemInfo.BuffDuc,recastAfterAttr.BuffDuc);
        this.addAttr("herocoinbonus", itemInfo.Coinbonus,recastAfterAttr.Coinbonus);
        this.addAttr("heroexpbonus", itemInfo.Expbonus,recastAfterAttr.Expbonus);
        if(recastAfterAttr.ImmuTag > 0) {
            var immuTag = tj.cfg.getAttr("designdata/immuTag", "immuTag" + recastAfterAttr.ImmuTag);
            this.addAttr("immuTag"+recastAfterAttr.ImmuTag, tj.cfg.getAttr("designdata/immuTag", "immuTag0").format(immuTag),true);
        }
    },

    refreshAfterRecast : function(recastAfterAttr){
        this.updateAttrs(recastAfterAttr);
        this._beforeAttrText.setString(this.getAttrText(this._attrs));

        var lineheight = this._linghight;
        var fontsize = this._beforeAttrText.getFontSize();
        var fontname = this._beforeAttrText.getFontName();
        var idx = 0;

        while(this._beforeAttrText.getParent().getChildByTag(recastLayer_tag)){
            this._beforeAttrText.getParent().removeChildByTag(recastLayer_tag);
        }
        var pos = this._beforeAttrText.getPosition();
        pos.y += this._beforeAttrText.getContentSize().height;
        pos.x += 35;
        for (var i in this._attrs) {
            var att = this._attrs[i];
            var anchor = {
                anchorX: 0,
                anchorY: 1
            };
            if(att.symbol){
                idx++;
                continue;
            }
            var del = " ";
            var color = cc.color.WHITE;
            if(att.delta > 0) {
                del = "  （+" + att.delta + "）";
                color = cc.color.GREEN;
            }else if(att.delta < 0) {
                del = "  （" + att.delta + "）";
                color = cc.color.RED;
            }
            var text = new ccui.Text(del, "", fontsize);
            this.setRetain(text, "text");
            text.setTag(recastLayer_tag);
            text.attr(anchor);
            text.setFontName(fontname);
            var col = new cc.Color(10, 10, 10, 255);
            text.enableOutline(col, 2);
            text.setColor(color);
            text.setPosition(pos.x , pos.y-idx*lineheight);
            this._beforeAttrText.getParent().addChild(text);
            idx++;
        }
    },

    getAttrText : function(attrs){
        var info = "";
        for(var i in attrs){
            if(info != "")
                info += "\n";
            var att = attrs[i];
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
        return info;
    },

    addAttr:function(flag, val,afterVal) {
        if(afterVal == undefined){
            if(val == 0){
                return;
            }
            var newatt = {};
            newatt.flag = flag;
            newatt.val = val;
            newatt.delta = val;
            this._attrs.push(newatt);
        }else{
            var newatt = {};
            newatt.flag = flag;
            if(typeof(afterVal) == "number"){
                if(val == 0 && afterVal == 0){
                    return;
                }
                newatt.delta = afterVal - val;
                newatt.val = afterVal;
            }else{
                newatt.val = val;
                newatt.symbol = 1;
            }
            this._attrs.push(newatt);
        }

    },

    addMaxAttr:function(flag, val) {
        if(val == 0){
            return;
        }
        var newatt = {};
        newatt.flag = flag;
        newatt.val = val;
        newatt.delta = val;
        this._maxAttrs.push(newatt);
    },

    defaultTouchButton : function(btn, type){
        if (type == ccui.Widget.TOUCH_ENDED) {
            switch(btn.getName()){
                case "portraits":
                    var equipIdList = tj.mainData.getStorage_equip();
                    var count = 0;
                    for(var id in equipIdList) {
                        var num = equipIdList[id];
                        if (num <= 0)
                            continue;
                        var itemid = parseInt(id);
                        var iteminfo = tj.mainData.getEquipByid(itemid);
                        if(iteminfo.Recasting == 1) {
                            count++;
                        }
                    }
                    if(count == 0){
                        this.noticetext_add(this._localText.noEquip);
                        return;
                    }

                    var self = this;
                    var p = this;
                    // 适配需要
                    if(Main_Layer){
                        p = Main_Layer;
                    }
                    createBagSelect(p,select_t.recast,function(info){
                        self._itemId = info.itemId;
                        while(self._beforeAttrText.getParent().getChildByTag(recastLayer_tag)){
                            self._beforeAttrText.getParent().removeChildByTag(recastLayer_tag);
                        }
                        self.refreshChoseItem();
                    });
                    break;
                case "btnGem":
                    if(this._itemId == 0){
                        this.noticetext_add(this._localText.choseEquip);
                        return;
                    }
                    tj.wsconnection.setMsg(msgac["Storage_recast_equip"], {"id": this._itemId, "gem":1});
                    break;
                case "btnGold":
                    if(this._itemId == 0){
                        this.noticetext_add(this._localText.choseEquip);
                        return;
                    }
                    tj.wsconnection.setMsg(msgac["Storage_recast_equip"], {"id": this._itemId, "gem":0});
                    break;
                case "btnClosed":
                    this.set_release();
                    break;
                default :
                    break;
            }
        }
    }

});

function createRecastLayer(parent,itemId){
    var pRet = new recastLayer(parent,itemId);
    if (pRet && pRet.init()){
        pRet._tjParent = parent;
        parent.addChild(pRet);
        return pRet;
    }else if (pRet)
        delete pRet;
    return null;
};
