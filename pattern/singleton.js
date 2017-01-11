var mySingleton = (function(){
	var instance;
	function init(){
		instance = {
			name: 'fuyy'
		}
	}

	return {
		getInstance: function(){
			if(!instance){
				init();
			}
			return instance
		}
	}
})();