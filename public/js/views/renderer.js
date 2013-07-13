var render = function ( template, data, callback ){
  $.Mustache.load('./templates/' + template + '.html').
    done(function(){
      var view = $.Mustache.render(template, data);
      callback($(view));
    });
}

