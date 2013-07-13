var fs = require('fs');
var express = require('express');
var app = express();


app.get('/', function (req, res){
  res.setHeader('Content-Type', 'text/html');

  fs.readFile('./views/index.html', function ( err, view ){
    var body = view;
    res.setHeader('Content-Length', body.length);
    res.end(body);
  })
});

app.listen(3000);
console.log('Listening on port 3000');
