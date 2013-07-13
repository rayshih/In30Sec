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

  var count = 30;
  var counter;

  function timer(){
    count = count-1;
    if (count < 0){
      clearInterval(counter);
      enableEditMode( true );
      return;
    }

    $("#CountDown").html( count + " secs" ); // watch for spelling
  }


  var enableEditMode = function ( enable ){
    if(enable){
      clearInterval(counter);
      $("#CountDown").html('');
      editorController.show();
      playController.hide();
      playBtn.html('Play');
    }else{
      count = 30;
      counter = setInterval(timer, 1000); //1000 will  run it every 1 second
      editorController.hide();
      playController.show();
      playBtn.html('Edit');
    }
    refreshView();
  };

  var playBtn = $('#play-btn');
  playBtn.click(function(){
    var action = playBtn.html();
    if(action == 'Play'){
      enableEditMode(false);
    }else{
      enableEditMode(true);
    }
  });

  // -- start --
  var installData = function ( data ){
    console.log(data);

    window.WidgetCollection = new WidgetCollection();
    WidgetCollection.addWidget(new HeadLine(new Rect(0, 0, 700, 100), {name: data.timeline.name}));
    WidgetCollection.addWidget(new TimeLine(new Rect(0, 0, 1000, 600), {}));
    WidgetCollection.addWidget(new Skills(new Rect(0, 0, 1000, 600), {skills: data.timeline.skills}));
    WidgetCollection.addWidget(new Connections(new Rect(0, 0, 200, 300), {connections: data.timeline.numConnections}));
    WidgetCollection.addWidget(new ExperienceYear(new Rect(0, 0, 200, 300), {year: data.timeline.experience_year}));
    WidgetCollection.addWidget(new Namecard(new Rect(0, 0, 364, 124), {}));

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
