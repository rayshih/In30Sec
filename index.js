var fs = require('fs');
var express = require('express');
var consolidate = require('consolidate');
var request = require('request');

var port = 4000;
var app = express();

var API_KEY = 'i8xow0ntgqyz';
var SECRET_KEY = 'sR2nUGFxGoaAUYIY';
var CSRF = 'DCEEFWF45453sdffef424wow~'; // TODO LAZY

app.use(express.static(__dirname + '/public'));
app.use(express.cookieParser());
app.use(express.cookieSession({ secret: 'haaaaa' }));

app.engine('html', consolidate.mustache);
app.set('view engine', 'html');
app.set('views', __dirname + '/public');

app.get('/', function (req, res){
  res.render('home');
});

app.get('/login', function(req, res){
  var url = 'https://www.linkedin.com/uas/oauth2/authorization' +
  '?response_type=code' +
  '&client_id=' + API_KEY +
  '&scope=r_fullprofile' +
  '&state=' + CSRF +
  '&redirect_uri=http://localhost:' + port + '/callback';

  res.redirect( url );
});

app.get('/callback', function(req, res){
  var authorization_token = req.query.code;

  // TODO check state (CSRF)
  var url = 'https://www.linkedin.com/uas/oauth2/accessToken' +
  '?grant_type=authorization_code' +
  '&code=' + authorization_token +
  '&redirect_uri=http://localhost:' + port + '/callback' +
  '&client_id=' + API_KEY +
  '&client_secret=' + SECRET_KEY;

  request( url, function ( err, response, body ){
    req.session.access_token = JSON.parse(body).access_token;
    res.redirect( '/profile' );
  });
});

app.get('/profile', function (req, res){
  res.render( 'profile', { access_token : req.session.access_token });
});

app.listen(port);
console.log('Listening on port ' + port);
