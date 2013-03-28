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
	x: 0,
	y: 0,
	rotation: 0,
	width: 20,
	height: 20,
	playerId: null,
	speed: 0.02,
	isCurrentPlayer: true,
	worldPos: {
		x: 0,
		y: 0
	},
	movement: {
		x: 0,
		y: 0
	},
	camera: {},
	init: function() {

	},
	get: function() {
		return {
			worldPos: this.worldPos,
			rotation: this.rotation,
			playerId: this.playerId
		};
	},
	calcRelativePosition: function(foreignWorldPos) {
		var vector = Dot(this.worldPos.x - foreignWorldPos.x, this.worldPos.y - foreignWorldPos.y);

		return {
			x: this.x - vector.x,
			y: this.y - vector.y
		}
	},
	update: function() {
		var mousePos = Survive.Assets.MousePosition.get();
		if(this.movement.y === 1) {
			var vector1 = Dot(mousePos.x - this.x, mousePos.y - this.y);

			Vector.normalize(vector1);

			this.worldPos.x += vector1.x * this.speed * Survive.timer.delta;
			this.worldPos.y += vector1.y * this.speed * Survive.timer.delta;
		}

		// player always sticks to the center of the screen
		if(this.isCurrentPlayer) {
			this.x = Survive.Game.getWidth() / 2;
			this.y = Survive.Game.getHeight() / 2;

			this.drawWorldPos();
		} else {
			var playerRelPos = Survive.Player.calcRelativePosition(worldPos);
			this.x = playerRelPos.x;
			this.y = playerRelPos.y;
		}

		this.rotation = Math.angle(mousePos, {
			x: this.x,
			y: this.y
		}) + 90;

		Survive.socket.emit('currentPlayerClientUpdate', this.get());

		this.draw();
	},
	drawWorldPos: function() {
		Survive.canvas.context.font = '12pt Calibri';
		Survive.canvas.context.fillStyle = 'black';
		Survive.canvas.context.fillText(this.worldPos.x.toFixed(2) + ':' + this.worldPos.y.toFixed(2), this.x - 50, this.y + 30);
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
		Survive.canvas.context.translate(this.x * -1, this.y * -1);

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
	},
    shoot: function(coords) {
        new Survive.Assets.Shot(coords);
    }
});

Survive.Assets.Shot = Survive.Assets.Main.extend({
    x: 0,
    y: 0,
    durability: 20,
    range: 100,
    player: {
        x: 0,
        y: 0
    },
    distance: 0,
    init: function(coords) {
        this.x = coords.x;
        this.y = coords.y;

        this.player.x = Survive.Player.x;
        this.player.y = Survive.Player.y;

        this.distance = Vector.getDistance(this.player, {x: this.x, y: this.y});

        Survive.Collections.Shots.add(this);
    },
    durable: function() {
        return this.durability > 0;
    },
    decreaseDurability: function(amount) {
        this.durability = this.durability - amount;
    },
    draw: function() {
        if(!this.durable()) {
            return false;
        }
        Survive.canvas.context.strokeStyle = '#FF0000';
        Survive.canvas.context.beginPath();
        Survive.canvas.context.moveTo(this.player.x, this.player.y);
        Survive.canvas.context.lineTo(this.x, this.y);
        Survive.canvas.context.closePath();
        Survive.canvas.context.stroke();
        this.decreaseDurability(1);
    }
});

Survive.Assets.Barrier = Survive.Assets.Main.extend({
	x: 0,
	y: 0,
	rotation: 0,
	width: 20,
	height: 20,
	worldPos: {
		x: 0,
		y: 0
	},
	init: function() {

	},
	get: function() {
		return {
			worldPos: this.worldPos,
			type: this.type
		};
	},
    drawWorldPos: function() {
        Survive.canvas.context.font = '12pt Calibri';
        Survive.canvas.context.fillStyle = 'black';
        Survive.canvas.context.fillText(this.worldPos.x.toFixed(2) + ':' + this.worldPos.y.toFixed(2), this.x - 50, this.y + 30);
    },
	update: function() {

		var pos = Survive.Player.calcRelativePosition(this.worldPos);
		this.x = pos.x;
		this.y = pos.y;

		this.draw();
	},
	draw: function() {
		Survive.canvas.context.save();

		Survive.canvas.context.strokeStyle = '#FF0000';
		Survive.canvas.context.strokeRect(this.x, this.y, this.width, this.height);

		Survive.canvas.context.restore();
        this.drawWorldPos();
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
	tileSize: 64,
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
				Survive.Resources.Images.draw('tile_grass', j * this.tileSize, i * this.tileSize);
			}
		}

		if(typeof mousePos !== 'undefined') {
			var pos = getNearestRectCoords(mousePos);
			Survive.canvas.context.fillRect(pos.x * tileSize, pos.y * tileSize, tileSize, tileSize);
		}
	}
});


Survive.Assets.Camera = Survive.Assets.Main.extend({
	player: {},
	x: 0,
	y: 0,
	init: function(player) {
		this.player = player;
	},
	update: function() {
		var vector = Dot(this.player.x - this.x, this.player.y - this.y);
		var length = Vector.getLength(vector);

		if(length > 10) {
			this.x = vector.x * Survive.timer.delta * 0.01;
			this.y = vector.y * Survive.timer.delta * 0.01;
		}
	}
});