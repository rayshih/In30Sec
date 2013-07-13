View.TimeLine = function ( $el, widget ){
  this.$el = $el;
  this.widget = widget;

  var width = widget.rect.w;
  var height = widget.rect.h;

  this.$el.append('<iframe src="/timeline.html" frameborder="0" width="' + width + '" height="' + height + '"></iframe>');
}

View.TimeLine.prototype = new View.Base();
