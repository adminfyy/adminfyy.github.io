var myModule = (function(){
	var privateVar = "yoman"

	function privateFunction(){
		console.log(privateVar)
	}

	return {
		publicMethod: privateFunction,
		publicVar: privateVar
	}
})()
// reveal module
// 优点： 容易阅读
// 缺点： 维护麻烦
// 