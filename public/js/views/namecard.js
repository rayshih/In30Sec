View.Namecard = function ( $el, widget ){
  this.$el = $el;
  this.widget = widget;

  this.$el.append('<iframe src="/namecard.html" frameborder="0" width="364" height="124"></iframe>');
};

View.Namecard.prototype = new View.Base();
