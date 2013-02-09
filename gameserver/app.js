/**
 * Module dependencies.
 */

var config = require('./config');

var port = process.env.PORT || config.port;

var express = require('express');
var http = require('http');
var path = require('path');

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
    },
    {
        worldPos: {
            x: 200,
            y: 500,
            azimuth: 100
        },
        type: 1
    },
    {
        worldPos: {
            x: 500,
            y: 300,
            azimuth: 170
        },
        type: 1
    },
    {
        worldPos: {
            x: 523,
            y: 100,
            azimuth: 30
        },
        type: 1
    },
    {
        worldPos: {
            x: 200,
            y: 200,
            azimuth: 90
        },
        type: 1
    },
];

io.sockets.on('connection', function (socket) {
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

    socket.on('currentPlayerClientUpdate', function (data) {
        data.lastUpdate = new Date().getTime();
        players[data.playerId] = data;
    });

    setInterval(function () {
        //socket.emit('players', players);
    }, 20);

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