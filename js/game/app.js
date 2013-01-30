var Survive = {
	context: {},
	Assets: {}
};

Survive.Game = (function() {

	var tileSize = 20;
	var FPS = 60;

	var $elem, canvas, width, height, mousePos;

	function init() {

		$elem = $('#map');
		canvas = $elem[0];
		Survive.context = canvas.getContext('2d');

		$('#startBtn').on('click', function() {
			$elem.requestFullScreen();

			$elem.attr('width', screen.width);
			$elem.attr('height', screen.height);
			width = screen.width;
			height = screen.height;
		});

		$(window).on('mousemove', function(e) {
			mousePos = getMousePos(canvas, e);
		});

		$(document).bind('webkitfullscreenchange mozfullscreenchange fullscreenchange', function(e) {
			if(fullScreenApi.isFullScreen()) {
				loop();
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

		var player = new Survive.Assets.Player();
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