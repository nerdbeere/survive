var Survive = (function() {

	var tileSize = 20;

	var $elem, canvas, ctx, width, height, mousePos;

	function init() {

		$elem = $('#map');
		canvas = $elem[0];
		ctx = canvas.getContext('2d');

		$elem.on('click', function() {
			$elem.requestFullScreen();

			$elem.attr('width', screen.width);
			$elem.attr('height', screen.height);
			width = screen.width;
			height = screen.height;
		});

		$(window).on('mousemove', function(e) {
			mousePos = getMousePos(canvas, e);
		});

		$(document).bind('webkitfullscreenchange mozfullscreenchange fullscreenchange',function(e) {
//			canvas.requestPointerLock = 	canvas.requestPointerLock    ||
//				canvas.mozRequestPointerLock ||
//				canvas.webkitRequestPointerLock;
//			canvas.requestPointerLock();

			loop();
		});
	}

	var loop = function() {
		redraw();
		window.setTimeout(loop, 17);
	};

	function redraw() {
		var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		drawTiles();
		writeMessage(canvas, message);
	}

	function drawTiles() {
		for(var i = 0; i < width / tileSize; i++) {
			for(var j = 0; j < height / tileSize; j++) {
				ctx.strokeRect(j * tileSize, i * tileSize, tileSize, tileSize);
			}
		}

		if(typeof mousePos !== 'undefined') {
			var pos = getNearestRectCoords(mousePos);
			ctx.fillRect(pos.x * tileSize, pos.y * tileSize, tileSize, tileSize);
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

	function writeMessage(canvas, message) {
		ctx.font = '18pt Calibri';
		ctx.fillStyle = 'black';
		ctx.fillText(message, 0, 20);
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