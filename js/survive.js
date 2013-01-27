var Survive = (function() {

	var tileSize = 20;

	var $elem, canvas, ctx, width, height;

	function init() {

		$elem = $('#map');
		width = $elem.width();
		height = $elem.height();
		canvas = $elem[0];
		ctx = canvas.getContext('2d');

		drawTiles();
		canvas.addEventListener('mousemove', function(evt) {
			redraw(evt);
		}, false);
	}

	function redraw(evt) {
		var mousePos = getMousePos(canvas, evt);
		var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		drawTiles(mousePos);
		writeMessage(canvas, message);
	}

	function drawTiles(mousePos) {
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

	function getMousePos(canvas, evt) {
		var rect = canvas.getBoundingClientRect();
		return {
			x: evt.clientX - rect.left,
			y: evt.clientY - rect.top
		};
	}

	return {
		init: function() {
			init();
		}
	};
})();