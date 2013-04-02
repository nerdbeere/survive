/**
 * Module dependencies.
 */

var config = require('./config');
var game = require('./modules/game.js');
var port = config.port;
var express = require('express');
var http = require('http');
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