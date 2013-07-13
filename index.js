var fs = require('fs');
var express = require('express');
var request = require('request');
var jade    = require('jade');

var app = express();

var API_KEY = 'i8xow0ntgqyz';
var SECRET_KEY = 'sR2nUGFxGoaAUYIY';
var CSRF = 'DCEEFWF45453sdffef424wow~'; // TODO LAZY

app.use(express.static(__dirname + '/public'));
app.use(express.cookieParser());
app.use(express.cookieSession({ secret: 'haaaaa' }));

app.get('/', function (req, res){
  fs.readFile('./public/home.html', function ( err, view ){
    var body = view;
    res.setHeader('Content-Length', body.length);
    res.end(body);
  });
});

app.get('/login', function(req, res){
  var url = 'https://www.linkedin.com/uas/oauth2/authorization' +
  '?response_type=code' +
  '&client_id=' + API_KEY +
  '&state=' + CSRF +
  '&redirect_uri=http://localhost:4000/callback';

  res.redirect( url );
});

app.get('/callback', function(req, res){
  console.log(req.query);

  var authorization_token = req.query.code;

  // TODO check state (CSRF)
  var url = 'https://www.linkedin.com/uas/oauth2/accessToken' +
  '?grant_type=authorization_code' +
  '&code=' + authorization_token +
  '&redirect_uri=http://localhost:4000/callback' +
  '&client_id=' + API_KEY +
  '&client_secret=' + SECRET_KEY;

  request( url, function ( err, response, body ){
    req.session.access_token = JSON.parse(body).access_token;
    res.redirect( '/profile' );
  });
});

app.get('/profile', function (req, res){
  var body = req.session.access_token;
  res.setHeader('Content-Length', body.length);
  res.end(body);

  return;
  fs.readFile('./public/profile.html', function ( err, view ){
    var body = view;
    res.setHeader('Content-Length', body.length);
    res.end(body);
  })
});

app.listen(4000);
console.log('Listening on port 4000');
