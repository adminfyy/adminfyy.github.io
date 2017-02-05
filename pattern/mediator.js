// simple implement
// 中介者模式 简单实现

var mediator = (function(){
    var topics = {};

    var subscribe = function(topic, fn){
        if(!topics[topic]){
            topics[topic] = []
        }

        topics[topic].push({ context: this, callback: fn});
        return this;
    }

    var publish = function(topic){
        var args;
        if(!topics[topic]) return false;

        args = Array.prototype.slice.call(arguments,1);

        for(var i = 0; i < topics[topic].length; i++){
            var subscribe = topics[topic][i];
            subscribe.callback.apply(subscribe.context, args);
        }
        return this;
    }

    return {
        subscribe: subscribe,
        publish: publish,
        installTo : function(obj) {
            obj.subscribe = subscribe;
            obj.publish = publish;
        }
    }
})();