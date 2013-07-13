$(function (){
  var rect = new Rect(3, 4, 5, 6);
  var headline = new HeadLine(rect, {hello: 'world'});

  var widgets = [headline];

  var toolbarController = new ToolBarController($('#toolbar'));
  var editorController = new EditorController($('#edit-area'));

  toolbarController.setWidgets(widgets);
});
