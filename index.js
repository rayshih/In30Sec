var fs = require('fs');
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res){
  res.setHeader('Content-Type', 'text/html');

  fs.readFile('./public/index.html', function ( err, view ){
    var body = view;
    res.setHeader('Content-Length', body.length);
    res.end(body);
  })
});

app.listen(4000);
console.log('Listening on port 4000');
