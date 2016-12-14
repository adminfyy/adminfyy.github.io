export default {
	log: function(prefix) {
		var _prefix = prefix;
		return function(){
			console.log(`${_prefix}` + arguments);
		}
	},
	error : function (prefix) {
		console.error.call(console, arguments);
	}
}