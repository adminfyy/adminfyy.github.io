// mediator implement
//  mediator 的高级实现
(function(root){

    // 获取独一无二的UniqueId
    function generatorSID(){
        // 具体实现略过
    }

    function Subscriber(fn, context, options){
        // bug 
        if(!(this instanceof Subscriber)){
            return new Subscriber(fn, context, options);
        }

        this.id = generatorSID();
        this.fn = fn ;
        this.options = options;
        this.context = context;
        this.topic = null;
    }
})();


function Topic(namespace){
    if(!(this instanceof Topic)){
        return new Topic(namespace);
    }

    this.namespace = namespace;
    this._callbacks = [];
    this._topics = [];
    this.stopped = false;
}

Topic.prototype = {
    AddSubscriber = function(fn, options, context){
        var callback = new Subscriber(fn, options, context);
        callback.topic = this;

        this._callbacks.push(callback);
        return callback;
    },

    StopPropagation: function(){
        this.stopped = true;
    },

    GetSubscriber: function(identifier){
        for(var i = 0, length = this._callbacks.length; i < length; i++){
            if(this._callbacks[i].id === identifier || this._callbacks[i].fn === identifier){
                return this._callbacks[i];
            }
        }

        // subTopic
        for(var topic in this._topics){
            if(this._topics.hasOwnProperty(topic)){
                var sub = this._topics.GetSubscriber(identifier);
                // if(sub !== undefined){
                if(sub){
                    return sub;
                }
            }
        }

        return false;
    },
    // 添加子Topic
    AddTopic: function(topic){
        this._topics[topic] = new Topic((this.namespace ? this.namespace + ":" : "") + topic);
    },
    //  是否有子topic
    HasTopic: function(topic){
        return this._topics.hasOwnProperty(topic);
    },

    returnTopic: function(topic){
        return this._topics[topic];
    }
    
}