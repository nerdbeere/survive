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
	Player: {},
	Resources: {
		Images: {}
	},
	Engine: {}
};

Survive.Game = (function() {

	var $elem, width, height, player;

	var STATE_LOADING = true;
	var STATE_RUNNING = false;

	var FPS;
	var tiles;
	var that = this;
	var players = {};
	var barriers = {};

	function init() {

		Survive.Engine = new Engine();

		Survive.socket = io.connect('127.0.0.1:3011');

		$elem = $('#map');
		Survive.canvas.elem = $elem[0];
		Survive.canvas.context = Survive.canvas.elem.getContext('2d');

		$elem.attr('width', $(window).width());
		$elem.attr('height', $(window).height());
		width = $(window).width();
		height = $(window).height();

		Survive.Resources.Images.load();

		Survive.timer.addJob(function(timer) {
			loop(Survive.timer.fps);
		});

		FPS = new Survive.Assets.FPS();
		tiles = new Survive.Assets.Tiles();

		bindEvents();
	}

	function bindEvents() {
		Survive.socket.on('players', function(data) {
			that.createPlayers(data);
		});

		Survive.socket.on('barriers', function(data) {
			that.createBarriers(data);
		});

		Survive.socket.on('currentPlayerData', function(data) {
			Survive.Player = new Survive.Assets.Player();
			Survive.Camera = new Survive.Assets.Camera(Survive.Player);
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

	this.createBarriers = function(data) {
		for(var i = 0; i < data.length; i++) {
			var p = new Survive.Assets.Barrier();
			p.set(data[i]);
			barriers[i] = p;
		}
		return true;
	};

	function loop(fps) {

		if(STATE_LOADING) {
			STATE_LOADING = !Survive.Resources.Images.isLoadingComplete();
			STATE_RUNNING = !STATE_LOADING;
		} else if(STATE_RUNNING) {
			drawTick(fps);
		}
	}

	function drawTick(fps) {
		Survive.canvas.clear();

		tiles.draw();

		Survive.Player.update();
		Survive.Camera.update();

		for(var i in players) {
			players[i].draw();
		}

		for(var i in barriers) {
			barriers[i].update();
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