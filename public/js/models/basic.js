var Base = function (){};

Base.prototype.init = function ( title, rect, data ){
  this.title = title;
  this.rect = rect;
  this.data = data;
  this.added = false;
};

Base.prototype.add = function (){
  this.added = true;
};

Base.prototype.remove = function (){
  this.added = false;
};

Base.prototype.setOffset = function(offset){
  this.rect.x = offset.left;
  this.rect.y = offset.top;
}

Base.prototype.getOffset = function(){
  return {
    top : this.rect.y,
    left : this.rect.x
  }
}

Base.prototype.setCenter = function(center){
  var rect = this.rect;
  rect.x = center.x - rect.w/2;
  rect.y = center.y - rect.h/2;
}
