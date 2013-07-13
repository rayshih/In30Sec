var EditorController = function ( $el ){
  this.setDOM($el);

  this.viewControllers = {};
  this.setupDroppable();
};

EditorController.prototype = new BaseController();

EditorController.prototype.setupDroppable = function (){
  var self = this;
  this.$el.droppable({
    accept : ".toolbar-button",
    drop: function( event, ui ) {
      var $widget = ui.draggable;
      var widgetName = $widget.attr('id').split('-')[1];

      var helper = ui.helper;
      var center = {
        x: ui.offset.left + helper.width()/2,
        y: ui.offset.top  + helper.height()/2,
      }

      self.addWidgetByName(widgetName, center);
    }
  });
};

EditorController.prototype.addWidgetByName = function(widgetName, center){
  var widget = WidgetCollection.findWidgetByName(widgetName);
  widget.add();
  widget.setCenter(center);
  refreshView();
};

EditorController.prototype.render = function(){
  var $el = this.$el;
  $el.html('');

  var self = this;
  WidgetCollection.widgets.forEach(function(widget){
    var title = widget.title;

    if(!widget.added){
      delete self.viewControllers[ title ];
      return;
    }

    var template = 'widget_' + title.toLowerCase();
    render(template, widget, function($view){

      $view.draggable({
        drag: function ( event, ui ){
          widget.setOffset(ui.position);
        }
      });

      var rect = widget.rect;
      $view.height(rect.h);
      $view.width(rect.w);
      $view.offset(widget.getOffset());
      $view.css({'position' : 'absolute'});

      var WidgetVC = View[ title ];
      self.viewControllers[ title ] = new WidgetVC($view, widget);

      $el.append($view);
    });
  });
}
