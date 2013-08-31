/**
 * Module dependencies.
 */
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var calculator = require('./routes/calculator');
var match = require('./routes/match');
var knockoutTest = require('./routes/knockoutTest');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/calculator', calculator.calculate);
app.get('/knockoutTest', knockoutTest.view);
app.get('/userData', function(req, res){ res.json( {firstName: 'Bob'});});

app.get('/matchEntry', match.entry);
app.post('/matchCalculate', match.calculate);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
