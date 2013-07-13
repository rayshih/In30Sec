var PlayController = function ( $el ){
  this.setDOM($el);

  this.viewControllers = {};
};

PlayController.prototype = new BaseController();

PlayController.prototype.render = function(){
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
      var rect = widget.rect;
      $view.height(rect.h);
      $view.width(rect.w);
      $view.offset(widget.getOffset());

      $el.append($view);

      var WidgetVC = View[ title ];
      self.viewControllers[ title ] = new WidgetVC($view, widget);
    });
  });
};
