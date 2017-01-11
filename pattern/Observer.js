function ObserverList(){
	this.list = [];
}
ObserverList.prototype.add = function(observer) {
	return this.list.push(observer);// body...
};
ObserverList.prototype.get = function(index) {
	return this.list[index];// body...
};
ObserverList.prototype.count = function(index) {
	return this.list.length;// body...
};
ObserverList.prototype.indexOf = function(object, index) {
	var i = startIndex;
	while( i < this.list.length) {
		if( object === this.list[i]){
			return i;
		}
		i++;
	}

	return -1;
}
ObserverList.prototype.removeAt = function( index ) {
	this.observerList.splice( index, 1);
}



function Observer(){
  this.update = function(){
    // ...
  };
}



function Subject(){
	this.observerList = new ObserverList();
}

Subject.prototype.addObserver = function ( observer ) {
	this.observerList.add( observer )
	return this
}

Subject.prototype.removeObserver = function( observer ){
  this.observerList.removeAt( this.observerList.indexOf( observer, 0 ) );
};

Subject.prototype.notify = function( context ){
  var observerCount = this.observerList.count();
  for(var i=0; i < observerCount; i++){
    this.observerList.get(i).update( context );
  }
};

