/**
 * Created by fudq.
 * To do : create AtelierForgeScene.
 * Date : 2015/11/5.
 */

var atelierForgeLayer = baseLayer.extend({
    _ui:0,
    _p:null,
    _bluePrint_ID:-1,
    _getType:0,
    _makeCount:0,

    _makeCountSlider : null,

    ctor:function(){
        this._super();
        this._basename = "atelierForge";
        this._makeCount = 1;
    },

    init:function(parent, id){
        this._p = parent;
        this._bluePrint_ID = id;
        this._ui = null;

        if (!this._super())
            return false;
        this._ui = this.load_ui("uiAtelierForge.json");
        if (!this._ui)
            return false;
        this.addChild(this._ui);

        this._forge_items = [];

        this.initScene();

        this.initItem();

        tj.wsconnection.addGrp(msgac["Atelier_forge"], msgac["Atelier_forge"], this.process_ac.bind(this), this.get_scene_name());

        return true;
    },

    initScene : function(){
        for (var i = 0; i < 3; ++i) {
            var ctrl_name = "main/heros/list/hero" + (i+1);
            this._forge_items[i] = WidgetDig(this._ui, ctrl_name);
            this._forge_items[i].itemtype = -1;
            this._forge_items[i].currid = 0;
            var w = this._forge_items[i];
            w.setVisible(false);
            WidgetDig(w, "portraits/star").setVisible(false);
            WidgetDig(w, "btnMore").setTouchEnabled(false);
            WidgetDig(w, "btnMore/textName").setVisible(false);
            WidgetDig(w, "btnMore/textProfession").setVisible(false);
            WidgetDig(w, "btnMore/textGrowth").setVisible(false);
            var text = WidgetDig(this._forge_items[i], "text");
            text.setColor(cc.color(255, 255, 255, 255));
            text.setVisible(false);
        }

        WidgetDig(this._ui, "main/class/text/textCost").setVisible(false);
        WidgetDig(this._ui, "main/class/text/textBalance").setVisible(false);

        WidgetDig(this._ui, "set/btnRefresh/text").setString(tj.cfg.get("text_on_ui/atelier/make"));
        WidgetDig(this._ui, "set/batch").setVisible(false);
        WidgetDig(this._ui, "set/batch/text").setString(tj.cfg.get("text_on_ui/atelier/makeCount"));
        this._makeCountSlider = WidgetDig(this._ui, "set/batch/sliderMusic");
        this._makeCountSlider.addEventListener(this.makeCountChange,this);
        this._makeCount = 1;
        this._makeCountSlider.setPercent(this._makeCount);
        WidgetDig(this._ui, "set/btnClosed/text").setString(tj.cfg.get("text_on_ui/close"));

        WidgetDig(this._ui,"proficiency").addTouchEventListener(function(object, type){
            this._curr_popLayer = createNoteBox(this, tj.mainData.getAtelierForgeInfo(), form_t.tips);
        },this);
        this.refresh_forge();
    },

    makeCountChange : function(obj,type){
        this._makeCount = parseInt(obj.getPercent());
        if(this._makeCount < 1){
            this._makeCount = 1;
            obj.setPercent(this._makeCount);
        }
        WidgetDig(this._ui, "set/btnRefresh/text").setString(tj.cfg.get("text_on_ui/atelier/make") + " x"+this._makeCount);
        this.refreshLayer();
    },

    initItem:function(){
        if (this._bluePrint_ID == -1)
            return;

        var info = this.getinfoById("blueprint",this._bluePrint_ID);
        if (info == null)
            return;
        if(info.forgeMass == 1){
            WidgetDig(this._ui, "set/batch").setVisible(true);
            WidgetDig(this._ui, "set/btnRefresh/text").setString(tj.cfg.get("text_on_ui/atelier/make") + " x"+this._makeCount);
        }
        this._getType = info["getType"];
        switch (this._getType){ //1.道具 2.符文 3.武器  4.护甲	5.饰品
            case 1:
            case 2:
                WidgetDig(this._ui, "explain").setVisible(false);
                WidgetDig(this._ui, "proficiency").setVisible(false);
                break;
            case 3:
            case 4:
            case 5:
                WidgetDig(this._ui, "explain").setVisible(true);
                WidgetDig(this._ui, "proficiency").setVisible(true);
                WidgetDig(this._ui, "explain/title/text").setString(info.name);
                break;
        }

        for (var i = 1; i <=3; ++i) {
            var t = info["itemType"+ i];
            var sub_id = info["subId" + i];
            var num = info["num"+i];

            if (t > 0) 
                this.setItemBtnState(i, t, num, sub_id);
        }
        this.check_make();
    },

    setItemBtnState: function (idx, type, itemNum, itemId) {
        var w = this._forge_items[idx-1];
        w.neednum = itemNum;
        w.itemtype = type;
        w.setVisible(true);

        var textName = WidgetDig(w, "btnMore/textName");
        textName.setVisible(true);
        var textPrice = WidgetDig(w, "btnMore/textProfession");
        var textNum = WidgetDig(w, "btnMore/textGrowth");
        var btnMore = WidgetDig(w, "btnMore");
        btnMore.setTouchEnabled(true);
        var portraits = WidgetDig(w, "portraits");
        var text = WidgetDig(w, "text");
        btnMore.itemtype = type;
        btnMore.index = idx;

        if (type == itemType.BaseM) {
            var last_b = tj.local.getVal("last_BaseM");
            if(last_b)
                this.select_Callback(last_b, idx, type);
            else{
                text.setVisible(true);
                portraits.setVisible(false);
                this.setContentString(text, tj.cfg.get("text/atelier/necessary"));
                this.setContentString(textName, tj.cfg.get("text/atelier/additem"));
            }
        } else if(type == itemType.FuWen) {
            text.setVisible(true);
            portraits.setVisible(false);
            this.setContentString(text, tj.cfg.get("text/atelier/necessary"));
            this.setContentString(textName, tj.cfg.get("text/atelier/addrune"));
        } else {
            if (itemId === 0){
                cc.log("error: atelierForgeScene setItemBtnState itemId == 0!");
                w.setVisible(false);
                return;
            }

            w.currid = itemId;
            btnMore.setTouchEnabled(false);

            var icon = tj.mainData.getItemIcon(itemId);
            if (icon)
                WidgetDig(w, "portraits/icon").loadTexture(icon, ccui.Widget.PLIST_TEXTURE);

            var frameicon = tj.mainData.getItemFrameIcon(itemId);
            if(frameicon)
                WidgetDig(w, "portraits/level").loadTexture(frameicon, ccui.Widget.PLIST_TEXTURE);

            var name = tj.mainData.getItemName(itemId);
            var num = tj.mainData.getItemNum(itemId);
            textPrice.setVisible(false);
            textNum.setVisible(true);
            this.setContentString(textName, name);
            this.setContentString(textPrice, tj.cfg.get("text/numNeed"));
            this.setContentString(textNum, num.toString() + "/" + w.neednum*this._makeCount);

            if(num < itemNum*this._makeCount){
                textNum.setColor(cc.color.RED);
                textPrice.setColor(cc.color.RED);
                textName.setColor(cc.color.RED);
            }else{
                textNum.setColor(cc.color.GREEN);
                textPrice.setColor(cc.color.GREEN);
                textName.setColor(cc.color.GREEN);
            }
        }
    },

    check_make:function(){
        var make = true;
        var BaseMLv = 0;
        WidgetDig(this._ui, "explain/title/text").setString("");
        WidgetDig(this._ui, "explain/probability").setString("");
        WidgetDig(this._ui, "explain/tag").setString("");
        for(var i in this._forge_items) {
            var layout = this._forge_items[i];
            if(layout.itemtype <= 0)
                continue;
            var num = tj.mainData.getItemNum(layout.currid);
            if (num < layout.neednum * this._makeCount)
                make = false;
            if(layout.itemtype == itemType.BaseM || layout.itemtype == itemType.FuWen){
                if(layout.currid == 0)
                    make = false;
            }
            if(layout.itemtype == itemType.BaseM || layout.itemtype==2){
                var iteminfo = tj.mainData.getItemInfo(layout.currid);
                if(iteminfo)
                    BaseMLv = iteminfo.itemLv;
            }
            if(layout.itemtype == itemType.FuWen){
                iteminfo = tj.mainData.getItemInfo(layout.currid);
                if(iteminfo && BaseMLv < iteminfo.itemLv){
                    make = false;
                    WidgetDig(this._ui, "explain/title/text").setString(tj.cfg.get("text_on_ui/atelier/lvError"));
                    WidgetDig(this._ui, "explain/title/text").setColor(cc.color.RED);
                    break;
                }
            }
        }
        if(make) {
            WidgetDig(this._ui, "set/btnRefresh").enabled = true;
            WidgetDig(this._ui, "set/btnRefresh").color = cc.color("#FFFFFF");
        }else{
            WidgetDig(this._ui, "set/btnRefresh").enabled = false;
            WidgetDig(this._ui, "set/btnRefresh").color = cc.color("#888888");
        }
        if(make)
            this.refresh_attr();
    },

    refresh_attr:function(){
        var attrs = {};
        function addAttr(flag, val){
            if(attrs.hasOwnProperty(flag))
                attrs[flag] += val;
            else
                attrs[flag] = val;
        }
        var info = this.getinfoById("blueprint",this._bluePrint_ID);
        var forge_lv = tj.mainData.getAtelier().forge_skill_lv;
        if(!forge_lv)
            return;
        var rowForge = tj.dbdata.getbysql("forgeskillexp",  "where (lv == '" + forge_lv +"')")[0];
        var sortArray = [];
        sortArray.push(rowForge.str);
        sortArray.push(rowForge.mag);
        sortArray.push(rowForge.skl);
        sortArray.push(rowForge.agl);
        sortArray.push(rowForge.hp);
        sortArray.sort(function(a,b){
            return a>b});
        var forgemin = sortArray[0];
        var forgemax = sortArray[4];
        var strfuwn = "";
        for(var i in this._forge_items) {
            var layout = this._forge_items[i];
            if (layout.itemtype <= 0)
                continue;
            if(layout.itemtype == itemType.BaseM || layout.itemtype == 2){
                var rows = tj.dbdata.getbysql("equipattribute",  "where (groupId == '" + info.val +"')");
                for(var j in rows){
                    var row = rows[j];
                    if(row.stuffId == layout.currid){
                        WidgetDig(this._ui, "explain/title/text").setString(row.name);
                        var color = cc.color("#FFFFFF");
                        switch(row.proficiency){
                            case 1:
                                color = cc.color("#FFFFFF");
                                break;
                            case 2:
                                color = cc.color("#65BE65");
                                break;
                            case 3:
                                color = cc.color("#6C92F4");
                                break;
                            case 4:
                                color = cc.color("#D559D5");
                                break;
                            case 5:
                                color = cc.color("#FAC159");
                                break;
                        }
                        WidgetDig(this._ui, "explain/title/text").setColor(color);
                        addAttr("power",row.power);
                        addAttr("powerMax", row.powerMax);
                        addAttr("def", row.def);
                        addAttr("defMax", row.defMax);
                        addAttr("resist", row.resist);
                        addAttr("resistMax", row.resistMax);
                        addAttr("hitRate", row.hitRate);
                        addAttr("dodgeRate", row.dodgeRate);
                        addAttr("healVal", row.healVal);
                        addAttr("critRate", row.critRate);
                        addAttr("immuTag", row.immuTag);
                        break;
                    }
                }
            }
            if(layout.itemtype == itemType.FuWen){
                row = this.getinfoById("rune",layout.currid);
                if(row){
                    addAttr("hp",row.hp);
                    addAttr("hpMax", row.hpMax);
                    addAttr("str", row.str);
                    addAttr("strMax", row.strMax);
                    addAttr("mag", row.mag);
                    addAttr("magMax", row.magMax);
                    addAttr("skl", row.skl);
                    addAttr("sklMax", row.sklMax);
                    addAttr("def", row.def);
                    addAttr("defMax", row.defMax);
                    addAttr("resist", row.resist);
                    addAttr("resistMax", row.resistMax);
                    addAttr("agl", row.agl);
                    addAttr("aglMax", row.aglMax);
                    if(row.number){
                        var standard = Math.floor(row.standard * forgemin);
                        var attributeMax = Math.floor(row.attributeMax * forgemax);
                        strfuwn += tj.cfg.get("text_on_ui/atelier/randattr").format(row.number, standard, attributeMax) + "\n";
                    }
                }
            }
        }
        var str = "";
        if(attrs.power && attrs.powerMax){
            attrs.power =Math.floor((attrs.power * rowForge.power));
            attrs.powerMax =Math.floor((attrs.powerMax * rowForge.power));
            str += tj.cfg.get("text_on_ui/atelier/power").format(attrs.power, attrs.powerMax) + "\n";
        }
        if(attrs.def && attrs.defMax){
            attrs.def =Math.floor((attrs.def * rowForge.def));
            attrs.defMax =Math.floor((attrs.defMax * rowForge.def));
            str += tj.cfg.get("text_on_ui/atelier/def").format(attrs.def, attrs.defMax) + "\n";
        }
        if(attrs.resist && attrs.resistMax){
            attrs.resist =Math.floor((attrs.resist * rowForge.resist));
            attrs.resistMax =Math.floor((attrs.resistMax * rowForge.resist));
            str += tj.cfg.get("text_on_ui/atelier/resist").format(attrs.resist, attrs.resistMax) + "\n";
        }
        if(attrs.hp && attrs.hpMax){
            attrs.hp =Math.floor((attrs.hp * rowForge.hp));
            attrs.hpMax =Math.floor((attrs.hpMax * rowForge.hp));
            str += tj.cfg.get("text_on_ui/atelier/hp").format(attrs.hp, attrs.hpMax) + "\n";
        }
        if(attrs.str && attrs.strMax){
            attrs.str =Math.floor((attrs.str * rowForge.str));
            attrs.strMax =Math.floor((attrs.strMax * rowForge.str));
            str += tj.cfg.get("text_on_ui/atelier/str").format(attrs.str, attrs.strMax) + "\n";
        }
        if(attrs.mag && attrs.magMax){
            attrs.mag =Math.floor((attrs.mag * rowForge.mag));
            attrs.magMax =Math.floor((attrs.magMax * rowForge.mag));
            str += tj.cfg.get("text_on_ui/atelier/mag").format(attrs.mag, attrs.magMax) + "\n";
        }
        if(attrs.skl && attrs.sklMax){
            attrs.skl =Math.floor((attrs.skl * rowForge.skl));
            attrs.sklMax =Math.floor((attrs.sklMax * rowForge.skl));
            str += tj.cfg.get("text_on_ui/atelier/skl").format(attrs.skl, attrs.sklMax) + "\n";
        }
        if(attrs.agl && attrs.aglMax){
            attrs.agl =Math.floor((attrs.agl * rowForge.agl));
            attrs.aglMax =Math.floor((attrs.aglMax * rowForge.agl));
            str += tj.cfg.get("text_on_ui/atelier/agl").format(attrs.agl, attrs.aglMax) + "\n";
        }
        str += strfuwn;
        if(attrs.hitRate)
            str += tj.cfg.get("text_on_ui/atelier/hitRate").format(attrs.hitRate) + "\n";
        if(attrs.dodgeRate)
            str += tj.cfg.get("text_on_ui/atelier/dodgeRate").format(attrs.dodgeRate) + "\n";
        if(attrs.healVal)
            str += tj.cfg.get("text_on_ui/atelier/healVal").format(attrs.healVal) + "\n";
        if(attrs.critRate)
            str += tj.cfg.get("text_on_ui/atelier/critRate").format(attrs.critRate) + "\n";
        if(attrs.immuTag){
            var immuTag = tj.cfg.getAttr("designdata/immuTag", "immuTag" + attrs.immuTag);
            str += tj.cfg.getAttr("designdata/immuTag", "immuTag0").format(immuTag);
        }
        WidgetDig(this._ui, "explain/probability").setString(str);
        WidgetDig(this._ui, "explain/tag").setString(tj.cfg.get("text_on_ui/atelier/tips"));
    },

    on_ws_reopen:function(){
        this.initItem();
    },

    defaultTouchButton : function(btn, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            switch(btn.getName()){
                case "btnClosed":
                    this.set_release();
                    break;
                case "btnMore":
                    var index = btn.index;
                    if(btn.itemtype <=2) //itemtype不是道具类型(1资源 2指定道具)
                        return;
                    if(!createSelectLayer(this, btn.itemtype, this.select_Callback.bind(this), index)) {
                        if(btn.itemtype == itemType.FuWen)
                            this.noticetext_add(tj.cfg.get("text/atelier/norunetype"));
                        else
                            this.noticetext_add(tj.cfg.get("text/atelier/noitemtype"));
                    }
                    break;
                case "btnRefresh":
                    var runeList = [];
                    var tag1 = 0;
                    for(var i in this._forge_items){
                        var layout = this._forge_items[i];
                        if(layout.currid > 0){
                            var currnum = tj.mainData.getItemNum(layout.currid);
                            if(currnum < layout.neednum){
                                this.noticetext_add(tj.cfg.get("text/atelierlessitems"));
                                return;
                            }
                            if(layout.itemtype == itemType.FuWen)
                                runeList.push(layout.currid);
                            if(i == 0)
                                tag1 = layout.currid;
                        }
                    }
                    if(tag1 == 0){
                        this.noticetext_add(tj.cfg.get("text/atelier/atelierForgNomatirial"));
                        return;
                    }
                    if(runeList.length == 0){
                        tj.wsconnection.setMsg(msgac["Atelier_forge"], {"blueprint": this._bluePrint_ID,"basic_material":parseInt(tag1),"forge_num":this._makeCount});
                    }else{
                        tj.wsconnection.setMsg(msgac["Atelier_forge"], {"blueprint": this._bluePrint_ID,"basic_material":parseInt(tag1), "rune": runeList,"forge_num":this._makeCount});
                    }

                    break;
            }
        }
    },

    select_Callback: function (id, index, type) {
        var num = tj.mainData.getItemNum(id);
        var w = this._forge_items[index-1];
        var temp_currid = w.currid;
        var temp_itemtype = w.itemtype;
        w.currid = id;
        w.itemtype = type;

        var tag2 = WidgetDig(this._ui,"main/heros/list/hero2").currid;
        var tag3 = WidgetDig(this._ui,"main/heros/list/hero3").currid;
        if(tag2 > 0 && tag3 > 0 && tag2 == tag3){
            var itemNum = tj.mainData.getItemNum(tag2);
            if(itemNum < 2){
                this.noticetext_add(tj.cfg.get("text/warehouse/numIsNotRight"));
                w.currid = temp_currid;
                w.itemtype = temp_itemtype;
                return;
            }
        }

        if(type == itemType.BaseM)
            tj.local.setVal("last_BaseM", id);

        var name = tj.mainData.getItemName(id);
        var textNum = WidgetDig(w, "btnMore/textGrowth");
        var textName = WidgetDig(w, "btnMore/textName");
        var textPrice = WidgetDig(w, "btnMore/textProfession");
        var text = WidgetDig(w, "text");
        var portraits = WidgetDig(w, "portraits");
        var icon = WidgetDig(portraits, "icon");
        var iconPic = tj.mainData.getItemIcon(id);
        icon.loadTexture(iconPic, ccui.Widget.PLIST_TEXTURE);
        var frameicon = tj.mainData.getItemFrameIcon(id);
        if(frameicon)
            WidgetDig(w, "portraits/level").loadTexture(frameicon, ccui.Widget.PLIST_TEXTURE);

        text.setVisible(true);
        this.setContentString(text, tj.cfg.get("text/atelier/necessary"));

        portraits.setVisible(true);
        textName.setVisible(true);
        textNum.setVisible(true);
        textPrice.setVisible(true);
        this.setContentString(textPrice, tj.cfg.get("text/numNeed"));
        this.setContentString(textName, name);
        this.setContentString(textNum, num.toString() + "/" + w.neednum);

        if(num >= w.neednum){
            textNum.setColor(cc.color.GREEN);
            textPrice.setColor(cc.color.GREEN);
            textName.setColor(cc.color.GREEN);
        }else{
            textNum.setColor(cc.color.RED);
            textPrice.setColor(cc.color.RED);
            textName.setColor(cc.color.RED);
        }

        this.check_make();
    },

    getinfoById: function (listName ,Itemid) {
        for(var i = 0 ; i< tj.dbdata._all[listName].length; i ++) {
            var id = tj.dbdata._all[listName][i]["id"];
            if(id == Itemid)
                return tj.dbdata._all[listName][i];
        }
        return null;
    },

    refreshLayer: function () {
        for (var i = 1; i <= 3; ++i) {
            var w = this._forge_items[i-1];
            if (w.currid <= 0)
                continue;

            var w_m = WidgetDig(w, "btnMore");
            var text = WidgetDig(w, "text");
            var w_num = WidgetDig(w, "btnMore/textGrowth");
            var w_name = WidgetDig(w, "btnMore/textName");
            var w_price = WidgetDig(w, "btnMore/textProfession");
            var t = w_m.itemtype;
            w_num.setColor(cc.color.WHITE);
            w_name.setColor(cc.color.WHITE);
            w_price.setColor(cc.color.WHITE);

            var own = tj.mainData.getItemNum(w.currid);
            if (i == 3 && t == itemType.FuWen && own == 1) {
                this.setContentString(text, tj.cfg.get("text/atelier/necessary"));
                this.setContentString(WidgetDig(w_m, "textName"), tj.cfg.get("text/atelier/addrune"));
                w.currid = 0;
                WidgetDig(w, "portraits").setVisible(false);
                w_num.setVisible(false);
                w_price.setVisible(false);
            } else {
                if (own < w.neednum * this._makeCount) {
                    w_num.setColor(cc.color.RED);
                    w_name.setColor(cc.color.RED);
                    w_price.setColor(cc.color.RED);
                } else {
                    w_num.setColor(cc.color.GREEN);
                    w_name.setColor(cc.color.GREEN);
                    w_price.setColor(cc.color.GREEN);
                }
                this.setContentString(w_num, own.toString() + "/" + w.neednum*this._makeCount);
            }

            //if ((t === itemType.BaseM || t === itemType.FuWen) && own <= 0) {
            //    //w.currid = 0;
            //    //w.itemtype = -1;
            //    w_num.setColor(cc.color.WHITE);
            //    w_name.setColor(cc.color.WHITE);
            //    w_price.setColor(cc.color.WHITE);
            //    w_num.setVisible(false);
            //    w_name.setVisible(true);
            //    w_price.setVisible(false);
            //    text.setVisible(true);
            //    w_m.setTouchEnabled(true);
            //    WidgetDig(w, "portraits").setVisible(false);
            //
            //    if (t === itemType.BaseM) {
            //        this.setContentString(text, tj.cfg.get("text/atelier/necessary"));
            //        this.setContentString(WidgetDig(w_m, "textName"), tj.cfg.get("text/atelier/additem"));
            //    } else {
            //        this.setContentString(text, tj.cfg.get("text/atelier/option"));
            //        this.setContentString(WidgetDig(w_m, "textName"), tj.cfg.get("text/atelier/addrune"));
            //    }
            //}
        }
        this.check_make();
    },

    process_ac : function(doc) {
        var msg_id = doc[0];
        var data = doc[1];
        switch (msg_id) {
            case msgac["Atelier_forge"]:{
                var rdata = data.data;
                var ret = data.ret;
                switch(ret)
                {
                    case 0:
                        for (var  i in rdata.resources) {
                            var res = rdata.resources[i];
                            var mainres = tj.mainData.getResinfoById(parseInt(i));
                            if(mainres)
                                mainres.sub(Math.abs(res.delta));
                        }

                        if(rdata.coin != undefined)
                            tj.mainData.setCoinNum(rdata.coin.left);
                        if(rdata.gem != undefined)
                            tj.mainData.setGemNum(rdata.gem.left);
                        for(var j in rdata.items) {
                            var itemNum = rdata.items[j].left;
                            tj.mainData.setItemNum(j, itemNum);
                        }
                        if(rdata.hasOwnProperty("equip")){
                            tj.mainData.updateEquipInfo(rdata.equip);
                            this._curr_popLayer = createNoteBoxCard(this, rdata.equip.id, null, null, {swallow : true});
                        }
                        var info = this.getinfoById("blueprint",this._bluePrint_ID);
                        //var itemname = tj.mainData.getItemName(info.val);
                        var str = info.name + " +" + this._makeCount;
                        if (rdata.hasOwnProperty("block")) {
                            tj.mainData.pushAtelierBlockId(this._bluePrint_ID);
                            tj.wsconnection.pushmsg(msgac["Atelier_refresh"], this._bluePrint_ID);
                            str = tj.cfg.get("text/atelier/get").format(info.name);
                        }
                        createMainNoticeBox(str);

                        if(rdata.get_exp){
                            tj.mainData.main.atelier.forge_lv_exp = rdata.lv_exp;
                            createMainNoticeBox(tj.cfg.get("text/atelier/getExp").format(rdata.get_exp));
                        }
                        if(rdata.forge_lv){
                            tj.mainData.main.atelier.forge_skill_lv = rdata.forge_lv;
                            createMainNoticeBox(tj.cfg.get("text/atelier/lvUp").format(rdata.forge_lv));
                        }
                        this.refresh_forge();

                        if (info !== null && info["forgeOneTime"] === 1)
                            this.set_release();
                        else
                            this.refreshLayer();
                        tj.wsconnection.pushmsg(msgac["Main_refresh_resource"]);
                        tj.wsconnection.pushmsg(msgac["Atelier_refresh_forge"]);
                        break;
                    case 1:
                        this.noticetext_add(tj.cfg.get("text/atelier/atelierprintless"));
                        break;
                    case 2:
                        this.noticetext_add(tj.cfg.get("text/atelier/atelierWrongprintId"));
                        break;
                    case 3:
                        this.noticetext_add(tj.cfg.get("text/atelierlessitems"));
                        break;
                    case 4:
                        this.noticetext_add(tj.cfg.get("text/atelier/atelierfullequipcontainer"));
                        break;
                    case 5:
                        this.noticetext_add(tj.cfg.get("text/atelier/ateliercannotusefuwen"));
                        break;
                    case 6:
                        this.noticetext_add(tj.cfg.get("text/atelier/atelieruselessmatierl"));
                        break;
                    case 7:
                        this.noticetext_add(tj.cfg.get("text/atelier/atelieruselessfuwen"));
                        break;
                    case 8:
                        this.noticetext_add(tj.cfg.get("text/atelier/atelier_rune_not_enough"));
                        break;
                    case 9:
                        //var txt = tj.cfg.get("text/atelier/atelier_rune_lv_too_high");
                        //createNoteBox(this, txt, form_t.mail);
                        this.noticetext_add(tj.cfg.get("text/atelier/atelier_rune_lv_too_high"));
                        break;
                }
            }break;
            default :
                return 0;

        }
    },

    refresh_forge:function(){
        var forge_lv = tj.mainData.getAtelier().forge_skill_lv;
        var forge_lv_exp = tj.mainData.getAtelier().forge_lv_exp;
        if(forge_lv != undefined && forge_lv_exp != undefined){
            var row = tj.dbdata.getbysql("forgeskillexp",  "where (lv == '" + forge_lv +"')")[0];
            var percent = Math.min(forge_lv_exp/row.exp * 100, 100);
            WidgetDig(this._ui,"proficiency/bar").setPercent(percent);
            this.setContentString(WidgetDig(this._ui,"proficiency/text"), tj.cfg.get("text_on_ui/atelier/forgeLv").format(forge_lv));
        }
    },

});

createAtelierForgeLayer = function (parent, id) {
    var pRet = new atelierForgeLayer();
    if (pRet && pRet.init(parent, id)){
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