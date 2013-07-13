var ToolBarController = function ( $el ){
  this.setDOM($el);

  this.setupDroppable();
};

ToolBarController.prototype = new BaseController();

ToolBarController.prototype.setupDroppable = function (){
  var self = this;
  this.$el.droppable({
    accept : ".widget",
    tolerance : "pointer",
    drop: function( event, ui ) {
      var $widget = ui.draggable;
      var widgetName = $widget.attr('id').split('-')[1];
      self.removeWidgetByName(widgetName);
    }
  });
};

ToolBarController.prototype.removeWidgetByName = function(widgetName){
  var widget = WidgetCollection.findWidgetByName(widgetName);
  widget.remove();
  refreshView();
};

ToolBarController.prototype.render = function(){
  var $el = this.$el;
  $el.html('');

  WidgetCollection.widgets.forEach(function(widget){
    if(widget.added) return;

    render('toolbar_button', widget, function($view){
      $view.draggable({
        revert: "invalid",
        helper: "clone",
      });

      $el.append($view);
    });
  });
};
