/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var io = require('socket.io').listen(3001);

io.set('transports', [
	'websocket'
]);

var players = {};

// body cleanup interval
/*setInterval(function() {
	for(var playerId in players) {
		if(players[playerId].lastUpdate + 10000 < new Date().getTime()) {
			players[playerId].worldPos.x = -100;
			players[playerId].worldPos.y = -100;
		}
	}
}, 1000);*/

var barriers = [
	{
		worldPos: {
			x: 500,
			y: 500,
			azimuth: 120
		},
		type: 1
	}
];

io.sockets.on('connection', function(socket) {
  socket.emit('currentPlayerData', {
    playerId: socket.store.id,
    worldPos: {
      x: 400,
      y: 400
    },
    rotation: 0
  });
  socket.emit('players', players);
  socket.emit('barriers', barriers);

  socket.on('currentPlayerClientUpdate', function(data) {
    data.lastUpdate = new Date().getTime();
    players[data.playerId] = data;
  });

  setInterval(function() {
    //socket.emit('players', players);
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