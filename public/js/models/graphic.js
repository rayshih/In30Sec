var Rect = function ( x, y, w, h ){
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
};

Rect.prototype.clone = function() {
  return new Rect( this.x, this.y, this.w, this.h );
}
