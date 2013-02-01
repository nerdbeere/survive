Survive.Assets.Main = Class.extend({
	x: 400,
	y: 400,
	init: function() {

	},
	set: function(data) {
		$.extend(true, this, data);
	},
	get: function() {
		return {};
	},
	draw: function() {

	}
});

Survive.Assets.Player = Survive.Assets.Main.extend({
	x: 400,
	y: 400,
	rotation: 0,
	width: 20,
	height: 20,
	playerId: null,
	movement: {
		x: 0,
		y: 0
	},
	init: function() {

	},
	get: function() {
		return {
			x: this.x,
			y: this.y,
			rotation: this.rotation,
			playerId: this.playerId
		};
	},
	update: function() {
		var mousePos = Survive.Assets.MousePosition.get();
		if(this.movement.y === 1) {
			var vector1 = Dot(mousePos.x - this.x, mousePos.y - this.y);
			Vector.normalize(vector1);

			this.x += vector1.x * 0.4 * Survive.timer.delta;
			this.y += vector1.y * 0.4 * Survive.timer.delta;
		}

		this.rotation = Math.angle(mousePos, {
			x: this.x,
			y: this.y
		}) + 90;

		Survive.socket.emit('currentPlayerClientUpdate', this.get());

		this.draw();
	},
	setMovementY: function(y) {
		this.movement.y = y;
	},
	setMovementX: function(x) {
		this.movement.x = x;
	},
	draw: function() {

		var angleInRadians = this.rotation * Math.PI / 180;
		Survive.canvas.context.save();

		Survive.canvas.context.translate(this.x,this.y);
		Survive.canvas.context.rotate(angleInRadians);
		Survive.canvas.context.translate(this.x * -1,this.y * -1);

		Survive.canvas.context.fillStyle = '#FF0000';

		Survive.canvas.context.beginPath();
		Survive.canvas.context.arc(this.x, this.y, 2, 0, Math.PI * 2, true);
		Survive.canvas.context.closePath();
		Survive.canvas.context.fill();

		Survive.canvas.context.strokeStyle = '#000000';

		Survive.canvas.context.beginPath();

		Survive.canvas.context.moveTo(this.x + 0, this.y + -10);
		Survive.canvas.context.lineTo(this.x + 9, this.y + 9);
		Survive.canvas.context.lineTo(this.x + 0, this.y + -1);
		Survive.canvas.context.moveTo(this.x + -1, this.y + -1);
		Survive.canvas.context.lineTo(this.x + -10, this.y + 9);
		Survive.canvas.context.lineTo(this.x + -1, this.y + -10);

		Survive.canvas.context.stroke();
		Survive.canvas.context.closePath();

		Survive.canvas.context.restore();
	}
});

Survive.Assets.MousePosition = new (Survive.Assets.Main.extend({
	x: 0,
	y: 20,
	pos: {
		x: 0,
		y: 0
	},
	init: function() {
		this.bindEvents();
	},
	draw: function(pos) {
		var message = 'Mouse position: ' + this.pos.x + ',' + this.pos.y;

		Survive.canvas.context.font = '18pt Calibri';
		Survive.canvas.context.fillStyle = 'black';
		Survive.canvas.context.fillText(message, this.x, this.y);
	},
	calcPos: function(x, y) {
		if(typeof Survive.canvas.elem.getBoundingClientRect !== 'function') {
			return this.pos;
		}
		var rect = Survive.canvas.elem.getBoundingClientRect();
		return {
			x: x - rect.left,
			y: y - rect.top
		};
	},
	get: function() {
		return this.pos;
	},
	bindEvents: function() {
		var that = this;
		$(window).on('mousemove', function(e) {
			that.pos = that.calcPos(e.clientX, e.clientY);
		});
	}
}))();


Survive.Assets.FPS = Survive.Assets.Main.extend({
	x: 0,
	y: 60,
	draw: function(fps) {
		var message = 'FPS: ' + fps;

		Survive.canvas.context.font = '18pt Calibri';
		Survive.canvas.context.fillStyle = 'black';
		Survive.canvas.context.fillText(message, this.x, this.y);
	}
});

Survive.Assets.Tiles = Survive.Assets.Main.extend({
	tileSize: 32,
	getNearestRectCoords: function(pos) {
		var x = Math.floor(pos.x / tileSize);
		var y = Math.floor(pos.y / tileSize);

		return {
			x: x,
			y: y
		};
	},
	draw: function() {
		Survive.canvas.context.strokeStyle = '#EEE';
		for(var i = 0; i < Survive.Game.getHeight() / this.tileSize; i++) {
			for(var j = 0; j < Survive.Game.getWidth() / this.tileSize; j++) {
				Survive.canvas.context.strokeRect(j * this.tileSize, i * this.tileSize, this.tileSize, this.tileSize);
			}
		}

		if(typeof mousePos !== 'undefined') {
			var pos = getNearestRectCoords(mousePos);
			Survive.canvas.context.fillRect(pos.x * tileSize, pos.y * tileSize, tileSize, tileSize);
		}
	}
});