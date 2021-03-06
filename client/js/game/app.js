var Survive = {
	canvas: {
		elem: {},
		context: {},
		clear: function() {
			this.context.clearRect(0, 0, this.elem.width, this.elem.height);
		}
	},
	surface: {
		elem: {},
		context: {},
		clear: function() {
			this.context.clearRect(0, 0, this.elem.width, this.elem.height);
		}
	},
	top: {
		elem: {},
		context: {},
		clear: function() {
			this.context.clearRect(0, 0, this.elem.width, this.elem.height);
		}
	},
	Assets: {},
    Collections: {},
	socket: {},
	timer: new Timer(),
	Player: {},
	Resources: {
		Images: {}
	},
	Engine: {}
};

Survive.Game = (function() {

	var width, height;

	var STATE_LOADING = true;
	var STATE_RUNNING = false;

	var FPS;
	var tiles;
	var that = this;
	var players = {};
	var barriers = {};

	function init(server) {

		Survive.Engine = new Engine();

		Survive.socket = io.connect(server.host + ':' + server.port);

		function initCanvas($elem, ns) {
			ns.elem = $elem[0];
			ns.context = ns.elem.getContext('2d');
			ns.elem.width = $(window).width();
			ns.elem.height = $(window).height();
			$elem.attr('width', ns.elem.width);
			$elem.attr('height', ns.elem.height);
			$elem.pos = $elem.offset();
		}

		initCanvas($('#map'), Survive.canvas);
		initCanvas($('#surface'), Survive.surface);
		initCanvas($('#top'), Survive.top);

		width = $(window).width();
		height = $(window).height();

		Survive.Resources.Images.load();

		Survive.timer.addJob(function(timer) {
			loop(Survive.timer.fps);
		});

		FPS = new Survive.Assets.FPS();

		bindEvents();
	}

	function bindEvents() {
		Survive.socket.on('players', function(data) {
			that.createPlayers(data);
		});

        Survive.socket.on('chunks', function(data) {
			Survive.Chunks.chunks = data;
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

        $(Survive.top.elem).on('mousedown', function(e) {
            var offset = $(Survive.canvas.elem).offset();
            var coords = {
                x: e.pageX - offset.left,
                y: e.pageY - offset.top
            };
           Survive.Player.shoot(coords);
        });
	}

	this.createPlayers = function(data) {
		for(var i in data) {
			if(Survive.Player.playerId === data[i].playerId) {
				continue;
			}
			var p = new Survive.Assets.Player();
			p.set(data[i]);
//			players[p.playerId] = p;
			Survive.Collections.Players.add(p);
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
		Survive.surface.clear();
		Survive.top.clear();

		Survive.Collections.Tiles.draw();

		Survive.Player.update();
		Survive.Camera.update();

		Survive.Collections.Shots.draw();
		Survive.CollisionMap.draw();
		Survive.Chunks.draw();
		Survive.Collections.Barriers.draw();
		Survive.Collections.Players.draw();
		Survive.Collections.Zombies.draw();
		Survive.Collections.Paths.draw();

		Survive.Assets.MousePosition.draw();
	}

	return {
		getWidth: function() {
			return width;
		},
		getHeight: function() {
			return height;
		},
		init: function(server) {
			init(server);
		}
	};
})();