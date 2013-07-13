var ToolBarController = function ( $el ){
  this.$el = $el;
  this.widgets = [];
};

ToolBarController.prototype.render = function(){
  var $el = this.$el;
  $el.html('');

  this.widgets.forEach(function(widget){
    render('toolbar_button', widget, function(view){
      $el.append(view);
    });
  });
};

ToolBarController.prototype.setWidgets = function(widgets){
  this.widgets = widgets;
  this.render();
};
