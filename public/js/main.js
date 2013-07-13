$(function (){

  // TODO load data
  var rect = new Rect(0, 0, 300, 200);

  window.WidgetCollection = new WidgetCollection();
  WidgetCollection.addWidget(new HeadLine(rect, {hello: 'world'}));
  WidgetCollection.addWidget(new TimeLine(rect, {hello: 'world'}));
  WidgetCollection.addWidget(new Skills(new Rect(0, 0, 800, 400), {}));

  // Setup Controllers

  var toolbarController = new ToolBarController($('#toolbar'));
  var editorController = new EditorController($('#edit-area'));
  var playController = new PlayController($('#display'));

  window.refreshView = function (){
    toolbarController.render();
    editorController.render();
    playController.render();
  }

  refreshView();

  var enableEditMode = function ( enable ){
    if(enable){
      editorController.show();
      playController.hide();
    }else{
      editorController.hide();
      playController.show();
    }
    refreshView();
  };

  var playBtn = $('#play-btn');
  playBtn.click(function(){
    var action = playBtn.html();
    if(action == 'Play'){
      enableEditMode(false);
      playBtn.html('Edit');
    }else{
      enableEditMode(true);
      playBtn.html('Play');
    }
  });
});
