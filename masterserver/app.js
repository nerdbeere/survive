/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var io = require('socket.io').listen(3001);

// enable socket.io to listen for connections from gameservers
var io_gameserver = require('socket.io').listen(3002);
io_gameserver.on('connect', function(socket) {

});

var app = express();

app.configure(function() {
  app.set('port', process.env.PORT || 3000);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname + '/../', 'client/')));
});

app.configure('development', function() {
  app.use(express.errorHandler());
});

http.createServer(app).listen(app.get('port'), function() {
  console.log("masterserver listening on port " + app.get('port'));
});