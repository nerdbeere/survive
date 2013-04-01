/**
 * Module dependencies.
 */

var config = require('./config');

var port = process.env.PORT || config.port;

var express = require('express');
var http = require('http');
var path = require('path');
var chunks = require('./modules/chunks.js');

var io = require('socket.io').listen(port + 1);

var io_client = require('socket.io-client');
var masterCon = io_client.connect(config.master.host + ':' + config.master.port, {reconnect: true});

masterCon.on('connect', function (socket) {
    console.log('connected to master on port ' + config.master.port);
});
masterCon.emit('register', {
    id: config.id,
    name: config.name,
    port: config.port + 1,
    host: config.host
});


io.set('transports', [
    'websocket'
]);

var players = {};

io.sockets.on('connection', function (socket) {
    socket.emit('currentPlayerData', {
        playerId: socket.store.id,
        worldPos: {
            x: 5000,
            y: 5000
        },
        rotation: 0
    });
    //socket.emit('players', players);
    //socket.emit('barriers', barriers.get());

    socket.on('currentPlayerClientUpdate', function (data) {
        data.lastUpdate = new Date().getTime();
        players[data.playerId] = data;
    });

	(function sendUpdates() {
		setTimeout(sendUpdates, 200);
        //socket.emit('players', players);
		for(var playerId in players) {
            io.sockets.socket(playerId).emit('chunks', chunks.get(players[playerId].worldPos));
		}
    })();

});

var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || port);
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
});

app.configure('development', function () {
    app.use(express.errorHandler());
});

http.createServer(app).listen(config.port, function () {
    console.log("gameserver listening on port " + config.port);
});