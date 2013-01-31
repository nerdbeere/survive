/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var io = require('socket.io').listen(3001);

var players = {};

var playerCount = 0;
io.sockets.on('connection', function(socket) {
  socket.emit('currentPlayerData', {
    playerId: socket.store.id,
    x: 400,
    y: 400,
    rotation: 0
  });
  socket.emit('players', players);

  socket.on('currentPlayerClientUpdate', function(data) {
    players[data.playerId] = data;
  });

  setInterval(function() {
    socket.emit('players', players);
  }, 20);

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
  console.log("Express server listening on port " + app.get('port'));
});