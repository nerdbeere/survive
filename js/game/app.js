var Survive = {
	context: {},
	Assets: {}
};

Survive.Game = (function() {

	var tileSize = 20;
	var FPS = 60;

	var $elem, canvas, width, height, player;
	var mousePos = {x: 0, y: 0};

	var thrust = false;

	function init() {

		player = new Survive.Assets.Player();

		$elem = $('#map');
		canvas = $elem[0];
		Survive.context = canvas.getContext('2d');

		$elem.attr('width', $(window).width());
		$elem.attr('height', $(window).height());
		width = $(window).width();
		height = $(window).height();

		loop();

		$(window).on('mousemove', function(e) {
			mousePos = getMousePos(canvas, e);
		});

		$(window).on('keydown', function(e) {
			console.log(e.keyCode);
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
	}

	var loop = function() {
		redraw();
		window.setTimeout(loop, 1000 / FPS);
	};

	function angle(pos1, pos2) {
		var dx = pos1.x - pos2.x;
		var dy = pos1.y - pos2.y;
		return Math.atan2(dy, dx) * (180 / Math.PI);
	}

	function redraw() {
		Survive.context.clearRect(0, 0, canvas.width, canvas.height);

		if(thrust) {
			player.x += (mousePos.x - player.x)* 1/30;
			player.y += (mousePos.y - player.y)* 1/30;
		}

		player.rotation = angle(mousePos, {
			x: player.x,
			y: player.y
		}) + 90;
		player.draw();

		var mousePosition = new Survive.Assets.MousePosition(mousePos);
		mousePosition.draw();
	}

	function drawTiles() {
		Survive.context.strokeStyle = '#EEE';
		for(var i = 0; i < width / tileSize; i++) {
			for(var j = 0; j < height / tileSize; j++) {
				Survive.context.strokeRect(j * tileSize, i * tileSize, tileSize, tileSize);
			}
		}

		if(typeof mousePos !== 'undefined') {
			var pos = getNearestRectCoords(mousePos);
			Survive.context.fillRect(pos.x * tileSize, pos.y * tileSize, tileSize, tileSize);
		}
	}

	function getNearestRectCoords(pos) {
		var x = Math.floor(pos.x / tileSize);
		var y = Math.floor(pos.y / tileSize);

		return {
			x: x,
			y: y
		};
	}

	function getMousePos(canvas, e) {
		var rect = canvas.getBoundingClientRect();
		return {
			x: e.clientX - rect.left,
			y: e.clientY - rect.top
		};
	}

	return {
		init: function() {
			init();
		}
	};
})();