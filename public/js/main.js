$(function (){

  // -- setup --

  // Setup Controllers
  var toolbarController = new ToolBarController($('#toolbar'));
  var editorController = new EditorController($('#edit-area'));
  var playController = new PlayController($('#display'));

  window.refreshView = function (){
    toolbarController.render();
    editorController.render();
    playController.render();
  }

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

  // -- start --
  var installData = function ( data ){
    console.log(data);
    var rect = new Rect(0, 0, 300, 200);

    window.WidgetCollection = new WidgetCollection();
    WidgetCollection.addWidget(new HeadLine(rect, {hello: 'world'}));
    WidgetCollection.addWidget(new TimeLine(rect, {hello: 'world'}));
    WidgetCollection.addWidget(new Skills(new Rect(0, 0, 800, 400), {}));
    WidgetCollection.addWidget(new Connections(new Rect(0, 0, 200, 300), {connections: data.timeline.numConnections}));
    WidgetCollection.addWidget(new Namecard(new Rect(0, 0, 350, 110), {}));

    refreshView();
  };

  if( true ){
    $.getJSON( '/test.json', installData );
    return;
  }

  var url = 'https://api.linkedin.com/v1/people/~:(firstName,lastName,skills,educations,positions,publications,projects,summary,picture-url,num-connections)?oauth2_access_token=' +
    accessToken + '&format=jsonp&callback=?';

  $.ajax({
    url : url,
    dataType : 'jsonp',
    beforeSend : function ( request ){
      request.setRequestHeader( 'x-li-format', 'jsonp' );
    }
  }).done(function(data){
    data = parseData(data);
    installData(data);
  });
});
