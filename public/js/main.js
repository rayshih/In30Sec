$(function (){

  // TODO load data
  var rect = new Rect(200, 200, 300, 200);
  var headline = new HeadLine(rect, {hello: 'world'});

  window.WidgetCollection = new WidgetCollection();
  WidgetCollection.addWidget(headline);

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
