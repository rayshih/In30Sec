var BaseController = function(){};

BaseController.prototype.setDOM = function($el){
  this.$el = $el;
}

BaseController.prototype.show = function (){
  this.$el.show();
};

BaseController.prototype.hide = function (){
  this.$el.hide();
};
