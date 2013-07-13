var WidgetCollection = function (){
  this.widgets = [];
};

WidgetCollection.prototype.addWidget = function(widget){
  this.widgets.push(widget);
};

WidgetCollection.prototype.findWidgetByName = function(name){
  for(var i = 0; i < this.widgets.length; i++){
    var widget = this.widgets[i];
    if(widget.title.toLowerCase() == name.toLowerCase()){
      return widget;
    }
  }

  return null;
}
