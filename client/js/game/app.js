var Survive = {
	context: {},
	Assets: {}
};

Survive.Game = (function() {

	var $elem, canvas, width, height, player;
	var mousePos = {x: 0, y: 0};

	var thrust = false;
	
	var mousePosition;
	var FPS;
	var tiles;
	var socket;
	var timer;
	var that = this;
	var players = {};

	function init() {

		socket = io.connect('127.0.0.1:3001');

		$elem = $('#map');
		canvas = $elem[0];
		Survive.context = canvas.getContext('2d');

		$elem.attr('width', $(window).width());
		$elem.attr('height', $(window).height());
		width = $(window).width();
		height = $(window).height();

		timer = new Timer();
		
		timer.addJob(function(timer) {
			redraw(timer.delta, timer.fps);
		});
		
		mousePosition = new Survive.Assets.MousePosition();
		FPS = new Survive.Assets.FPS();
		tiles = new Survive.Assets.Tiles();

		$(window).on('mousemove', function(e) {
			mousePos = getMousePos(canvas, e);
		});

		$(window).on('keydown', function(e) {
			// w
			if(e.keyCode == 87) {
				thrust = true;
			}
		});

		$(window).on('keyup', function(e) {
			// w
			if(e.keyCode == 87) {
				thrust = false;
			}
		});

		bindEvents();
	}

	function bindEvents() {
		socket.on('players', function(data) {
			that.createPlayers(data);
		});

		socket.on('currentPlayerData', function(data) {
			player = new Survive.Assets.Player();
			player.x = data.x;
			player.y = data.y;
			player.rotation = data.rotation;
			player.playerId = data.playerId;

			timer.start(1000 / 60);
		});
	}

	this.createPlayers = function(data) {
		for(var i in data) {
			if(player.playerId === data[i].playerId) {
				continue;
			}
			var p = new Survive.Assets.Player();
			p.x = data[i].x;
			p.y = data[i].y;
			p.rotation = data[i].rotation;
			players[p.playerId] = p;
		}
	};

	function angle(pos1, pos2) {
		var dx = pos1.x - pos2.x;
		var dy = pos1.y - pos2.y;
		return Math.atan2(dy, dx) * (180 / Math.PI);
	}

	function redraw(delta, fps) {
		Survive.context.clearRect(0, 0, canvas.width, canvas.height);

		tiles.draw();

		if(thrust) {
			var vector1 = Dot(mousePos.x - player.x, mousePos.y - player.y);
			Vector.normalize(vector1);
			
			player.x += vector1.x * 0.4 * delta;
			player.y += vector1.y * 0.4 * delta;
		}

		player.rotation = angle(mousePos, {
			x: player.x,
			y: player.y
		}) + 90;

		socket.emit('currentPlayerClientUpdate', {
			x: player.x,
			y: player.y,
			rotation: player.rotation,
			playerId: player.playerId,
		});

		player.draw();

		for(var i in players) {
			players[i].draw();
		}

		mousePosition.draw(mousePos);
		FPS.draw(fps);
	}

	function getMousePos(canvas, e) {
		var rect = canvas.getBoundingClientRect();
		return {
			x: e.clientX - rect.left,
			y: e.clientY - rect.top
		};
	}

	return {
		getWidth: function() {
			return width;
		},
		getHeight: function() {
			return height;
		},
		init: function() {
			init();
		}
	};
})();