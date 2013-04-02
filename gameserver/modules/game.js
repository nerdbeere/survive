var config = require('../config');
var t = require('./timer.js');
var io = require('socket.io').listen(config.port + 1);
var chunks = require('./chunks.js');
var zombies = require('./zombies.js');

io.set('transports', [
	'websocket'
]);

var players = {};

chunks.setZombies(zombies);

io.sockets.on('connection', function (socket) {
	socket.emit('currentPlayerData', {
		playerId: socket.store.id,
		worldPos: {
			x: 5000,
			y: 5000
		},
		rotation: 0
	});

	socket.on('currentPlayerClientUpdate', function (data) {
		data.lastUpdate = new Date().getTime();
		players[data.playerId] = data;
	});

	t.timer.addJob(function() {
		for(var playerId in players) {
			io.sockets.socket(playerId).emit('chunks', chunks.get(players[playerId].worldPos));
		}
	});
});

t.timer.start(200);