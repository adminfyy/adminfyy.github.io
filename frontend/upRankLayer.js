/**
 * Created by likx on 2015/12/1.
 */

var upRankLayer = baseLayer.extend({
    _ui:0,
    _p_xuanxiang: null,
    _tmpl : null,
    _heroInfo:null,
    _cb:null,
    _job:0,
    _type:0,
    _heroID:0,

    ctor : function(job, type, f, heroid){
        this._super();
        this._basename = "uprank";
        this._beTop = false;
        this._cb = f;
        this._job = job;
        this._type = type;
        this._heroID = heroid;
    },

    init : function(){
        if (!this._super())
            return false;
        this._ui = this.load_ui("cardEvent.json");
        if (!this._ui)
            return false;
        this.addChild(this._ui);

        this._p_xuanxiang = WidgetDig(this._ui, "main/list");
        this._tmpl = WidgetDig(this._ui, "main/list/btnOption");
        this._tmpl.removeFromParent(true);
        WidgetDig(this._ui, "main/task/explain/textSubhead").setVisible(false);

        if(this._type == 1){
            var rows = tj.dbdata.getbysql("job",  "where (preJob == '" + this._job +"')");
            for(h in rows){
                var row = rows[h];
                var str = tj.cfg.get("text_on_ui/upRankFor") + row["name"];
                this.add_btn(str, row["id"]);
            }
            this.add_btn(tj.cfg.get("text_on_ui/upRankThinkAbout"), 0);
            WidgetDig(this._ui, "main/task/explain/text").setString(tj.cfg.get("text_on_ui/upRankDesc"));
        }
        else{
            var jobname = tj.dbdata.getValueById("job", this._job, "name");
            str = tj.cfg.get("text_on_ui/upRankConfirm").format(jobname);
            this.add_btn(str, this._job);
            this.add_btn(tj.cfg.get("text_on_ui/upRankMore").format(jobname), -1);
            this.add_btn(tj.cfg.get("text_on_ui/upRankThinkAbout"), 0);

            var needitemid =  tj.dbdata.getValueById("job", this._job, "rankUpItem");
            var needcoins = tj.dbdata.getValueById("job", this._job, "rankUpCoins");
            var str2 = "";
            if(needitemid > 0){
                var needitemname = tj.dbdata.getValueById("item", needitemid, "name");
                str2 = "·" + needitemname + " x1";

                var need_workshop_lv = 0;
                var rows = tj.dbdata.gettable("workshop");
                for(var i in rows){
                    var row = rows[i];
                    var unlockList = row.unlock.split(",");
                    for(var j in unlockList){
                        var uid = parseInt(unlockList[j]);
                        if(uid == needitemid){
                            need_workshop_lv = row.lv;
                            break;
                        }
                    }
                    if(need_workshop_lv > 0)
                        break;
                }
                if(need_workshop_lv){
                    str2 += tj.cfg.get("text_on_ui/pub/needWorkshop").format(need_workshop_lv);
                }
            }
            var strInfo1 = tj.cfg.get("text_on_ui/uprankcase").format(this.getUprankPubLv(this._job), needcoins, str2);

            //var heroHP = tj.dbdata.getValueById("job", this._job, "hp");
            //var heroStr = tj.dbdata.getValueById("job", this._job, "str");
            //var heroMag = tj.dbdata.getValueById("job", this._job, "mag");
            //var heroSkl = tj.dbdata.getValueById("job", this._job, "skl");
            //var heroDef = tj.dbdata.getValueById("job", this._job, "def");
            //var heroResist = tj.dbdata.getValueById("job", this._job, "resist");
            //var heroAgl = tj.dbdata.getValueById("job", this._job, "agl");
            //if(heroHP && heroHP > 0)
            //    strInfo1 = strInfo1 + tj.cfg.get("text_on_ui/herohp") + heroHP.toString() + ", ";
            //if(heroStr && heroStr > 0)
            //    strInfo1 = strInfo1 + tj.cfg.get("text_on_ui/herostr") + heroStr.toString() + ", ";
            //if(heroMag && heroMag > 0)
            //    strInfo1 = strInfo1 + tj.cfg.get("text_on_ui/heromag") + heroMag.toString() + ", ";
            //if(heroSkl && heroSkl > 0)
            //    strInfo1 = strInfo1 + tj.cfg.get("text_on_ui/heroskl") + heroSkl.toString() + ", ";
            //if(heroDef && heroDef > 0)
            //    strInfo1 = strInfo1 + tj.cfg.get("text_on_ui/herodef") + heroDef.toString() + ", ";
            //if(heroResist && heroResist > 0)
            //    strInfo1 = strInfo1 + tj.cfg.get("text_on_ui/heroresist") + heroResist.toString() + ", ";
            //if(heroAgl && heroAgl > 0)
            //    strInfo1 = strInfo1 + tj.cfg.get("text_on_ui/heroagl") + heroAgl.toString() + ", ";
            //
            //strInfo1 = strInfo1.substring(0,strInfo1.length-2);
            //
            //var strInfo2 = tj.cfg.get("text_on_ui/skillUnlock");
            //var skillId1 = tj.dbdata.getValueById("job", this._job, "move1");
            //var skillId2 = tj.dbdata.getValueById("job", this._job, "move2");
            //var skillId3 = tj.dbdata.getValueById("job", this._job, "move3");
            //if(skillId1 && skillId1 > 0)
            //    strInfo2 = strInfo2 + tj.dbdata.getValueById("skill", skillId1, "name") + ", ";
            //if(skillId2 && skillId2 > 0)
            //    strInfo2 = strInfo2 + tj.dbdata.getValueById("skill", skillId2, "name") + ", ";
            //if(skillId3 && skillId3 > 0)
            //    strInfo2 = strInfo2 + tj.dbdata.getValueById("skill", skillId3, "name");
            //
            var jobinfo = tj.dbdata.getValueById("job", this._job, "info") + "\n\n" ;
            jobinfo = jobinfo + strInfo1;
            WidgetDig(this._ui, "main/task/explain/text").setString(jobinfo);
        }

        WidgetDig(this._ui, "main/task/explain/textName").setString(tj.cfg.get("text_on_ui/upRankExplain"));
        return true;
    },

    add_btn : function(txt, tag){
        var w = this._tmpl.clone();
        if (!w)
            return false;
        this._p_xuanxiang.addChild(w);

        WidgetDig(w, "lock").setVisible(false);

        var size =  this._tmpl.getContentSize();
        w.setContentSize(size);

        var parent = this._tmpl.getParent();
        w.setVisible(true);
        w.setTag(tag);
        var w_txt = WidgetDig(w, "text");
        if (w_txt){
            var w_txt_size = w_txt.getTextAreaSize();
            w_txt_size.width = w.getContentSize().width * w.getScale() * 0.9;
            w_txt_size.height = 0;
            //w_txt.setTextAreaSize(w_txt_size);
            w_txt.setString(txt);
            if (w_txt.getContentSize().height > w.getContentSize().height * w.getScale() * 0.9)
                w_txt.setFontSize(w_txt.getFontSize() );
        }

        //this._tmpl.removeFromParent(true);
        return true;
    },

    defaultTouchButton : function(btn, type){
        if (type == ccui.Widget.TOUCH_ENDED) {
            var tag = btn.getTag();
            if(tag == -1) {

                // this._curr_popLayer = createCardHeroLayer(this, this._heroID, heroCard_t.uprank, this._job);
                this._tjParent.setTempHero(this, this._heroID, heroCard_t.uprank, this._job);
                this.setVisible(false);
            } else if (this._cb(tag)) {
                this.set_release();
            }
        }
    },

    getUprankPubLv:function(job){
        var joblv = tj.dbdata.getValueById("job", this._job, "jobLv");
        var row = tj.dbdata.getbysql("tavern", "where (jobLvLimit == '" + joblv + "')")[0];
        if(row)
            return row.lv;
        return 0;
    }
});

function createUpRankSelect(parent, job, type, f, heroid) {
    var pRet = new upRankLayer(job, type, f, heroid);
    if (pRet && pRet.init()) {
        var z = -1;
        var childs = parent.getChildren();
        for (var i = 0; i < childs.length; ++i) {
            if (childs[i].getLocalZOrder() > z)
                z = childs[i].getLocalZOrder();
        }
        pRet.setLocalZOrder(9999999);
        pRet._tjParent = parent;
        parent.addChild(pRet);
        return pRet;
    } else if (pRet)
        delete pRet;
    return null;
}

