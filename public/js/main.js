$(function (){
  var rect = new Rect(3, 4, 5, 6);
  var headline = new HeadLine(rect, {hello: 'world'});

  var widgets = [headline];

  var toolbarController = new ToolBarController($('#toolbar'));
  var editorController = new EditorController($('#edit-area'));
  var playController = new PlayController($('#display'));

  toolbarController.setWidgets(widgets);

  var enableEditMode = function ( enable ){
    if(enable){
      editorController.show();
      playController.hide();
    }else{
      editorController.hide();
      playController.show();
    }
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
