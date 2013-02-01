var Survive = {
	canvas: {
		elem: {},
		context: {},
		clear: function() {
			this.context.clearRect(0, 0, this.elem.width, this.elem.height);
		}
	},
	Assets: {},
	socket: {},
	timer: new Timer(),
	Player: {}
};

Survive.Game = (function() {

	var $elem, width, height, player;

	var FPS;
	var tiles;
	var that = this;
	var players = {};

	function init() {

		Survive.socket = io.connect('127.0.0.1:3001');

		$elem = $('#map');
		Survive.canvas.elem = $elem[0];
		Survive.canvas.context = Survive.canvas.elem.getContext('2d');

		$elem.attr('width', $(window).width());
		$elem.attr('height', $(window).height());
		width = $(window).width();
		height = $(window).height();
		
		Survive.timer.addJob(function(timer) {
			redraw(Survive.timer.fps);
		});

		FPS = new Survive.Assets.FPS();
		tiles = new Survive.Assets.Tiles();

		bindEvents();
	}

	function bindEvents() {
		Survive.socket.on('players', function(data) {
			that.createPlayers(data);
		});

		Survive.socket.on('currentPlayerData', function(data) {
			Survive.Player = new Survive.Assets.Player();
			Survive.Player.set(data);

			Survive.timer.start(1000 / 60);
		});

		$(window).on('keydown', function(e) {
			// w
			if(e.keyCode == 87) {
				Survive.Player.setMovementY(1);
			}
		});

		$(window).on('keyup', function(e) {
			// w
			if(e.keyCode == 87) {
				Survive.Player.setMovementY(0);
			}
		});
	}

	this.createPlayers = function(data) {
		for(var i in data) {
			if(Survive.Player.playerId === data[i].playerId) {
				continue;
			}
			var p = new Survive.Assets.Player();
			p.set(data[i]);
			players[p.playerId] = p;
		}
		return true;
	};

	function redraw(fps) {

		Survive.canvas.clear();

		tiles.draw();

		Survive.Player.update();

		for(var i in players) {
			players[i].draw();
		}

		Survive.Assets.MousePosition.draw();
		FPS.draw(fps);
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