// Publish/subscribe.js

var pubsub = {};

(function(myObject){

	var topics = {}
	var subscribeId = 0;

	myObject.subscribe = function(topic, func) {
		if(!topics[topic]){
			topics[topic] = []
		}

		var token = (++subscribeId).toString();
		topics[topic].push({
			func: func,
			token: token
		})

		return token
	}

	// unsubscribe single token subscribe
	myObject.unsubscribe = function(token){
		for(var t in topics){
			var currentTopic = topics[t];

			for (var i = 0, j = topics[m].length; i < j; i++) {
				if(currentTopic[i] === token) {
					currentTopic.splice(i,1)
					return token
				}
			};
		}
	}

	myObject.Publish = function(topic, args){
		var targetSubscribers = topics[topic] || [];

		for (var i = 0,j = targetSubscribers.length; i < j; i++) {
			targetSubscribers[i].func(args)
		};

		return this;
	}
	
})(pubsub)