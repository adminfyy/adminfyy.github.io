/**
 * Created by likx on 2016/1/15.
 */

var eventAccepter = function() {
    this._eventCard =null;
    this._parent = null;
    this._startData = null;
    this._delay = false;

    this.initScene = function(parent)
    {
        tj.wsconnection.removeGrp("eventAccepter");
        tj.wsconnection.addGrp(msgac["Event_start_relay"], msgac["Event_start_relay"], this.process_ac.bind(this), "eventAccepter");
        tj.wsconnection.addGrp(msgac["Event_option"], msgac["Event_func_action"], this.process_ac.bind(this), "eventAccepter");
        tj.wsconnection.addGrp(msgac["Hide_eventcard"], msgac["Hide_eventcard"], this.process_ac.bind(this), "eventAccepter");
        this._parent = parent;
    };

    this.process_ac = function(doc) {
        var msg_id = doc[0];
        var data = doc[1];
        switch (msg_id) {
            case msgac["Event_start_relay"]:
                //if(this._eventCard != null) {
                //    this._eventCard.set_release();
                //    this._eventCard = null;
                //}
                this._startData = data;
                if(tj.isInMap && !this._delay) {
                    tj.eventTimer.add_itval_timer("1008", 500, false, this.start_event.bind(this));
                    this._delay = true;
                }
                else
                    this.start_event();
                break;
            case msgac["Event_func_action"]:
                if(this._eventCard == null) {
                    this._eventCard = createCardEventLayer(this._parent);
                    this._eventCard.func_action(data);
                }
                else
                    this._eventCard.func_action(data);
                break;
            case msgac["Event_end"]:
                if(this._eventCard)
                    this._eventCard.set_release();
                this._eventCard = null;
                this._delay = false;
                break;
            case msgac["Event_option_failed"]:
                if(this._eventCard)
                    this._eventCard.option_failed(data);
                break;
            case msgac["Hide_eventcard"]:
                if(this._eventCard) {
                    this._eventCard.show(false);
                    this._eventCard.executeAction();
                }
                break;
        }
    };

    this.start_event = function(){
        this._eventCard = createCardEventLayer(this._parent, this._startData);
    };

    this.clear_event = function(){
        if (this._eventCard !== null) {
            this._eventCard.set_release();
            this._eventCard = null;
        }
        this._parent = null;
    };
};