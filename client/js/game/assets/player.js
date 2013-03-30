Survive.Assets.Player = Survive.Assets.Main.extend({
	x: 0,
	y: 0,
	rotation: 0,
	width: 30,
	height: 30,
	playerId: null,
	speed: 0.04,
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
			x: (this.x - vector.x)|0,
			y: (this.y - vector.y)|0
		}
	},
    updateWorldPos: function() {
        var mousePos = Survive.Assets.MousePosition.get();
        if(this.isCurrentPlayer && this.movement.y === 1) {
            var vector1 = Dot(mousePos.x - this.x, mousePos.y - this.y);

            Vector.normalize(vector1);

            var newWorldPos = {};
            newWorldPos.x = this.worldPos.x + vector1.x * this.speed * Survive.timer.delta;
            newWorldPos.y = this.worldPos.y + vector1.y * this.speed * Survive.timer.delta;

            if(!Survive.CollisionMap.checkForPlayerCollision(newWorldPos)) {
                this.worldPos.x = newWorldPos.x;
                this.worldPos.y = newWorldPos.y;
            }
        }
    },
	update: function() {
		var mousePos = Survive.Assets.MousePosition.get();

        this.updateWorldPos();

		// player always sticks to the center of the screen
		if(this.isCurrentPlayer) {
			this.x = (Survive.Game.getWidth() / 2)|0;
			this.y = (Survive.Game.getHeight() / 2)|0;

			this.drawWorldPos();
		} else {
			var playerRelPos = Survive.Player.calcRelativePosition(this.worldPos);
			this.x = playerRelPos.x;
			this.y = playerRelPos.y;
		}

		this.rotation = Math.angle(mousePos, {
			x: this.x,
			y: this.y
		}) + 90;

        if(this.isCurrentPlayer) {
            Survive.socket.emit('currentPlayerClientUpdate', this.get());
        }

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

        /*


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
		Survive.canvas.context.closePath();*/

        Survive.Resources.Images.draw('player', this.x - 10, this.y - 16    );
        Survive.canvas.context.fillStyle = '#FF0000';
        Survive.canvas.context.beginPath();
        Survive.canvas.context.arc(this.x, this.y, 2, 0, Math.PI * 2, true);
        Survive.canvas.context.closePath();
        Survive.canvas.context.fill();

		Survive.canvas.context.restore();

        Survive.top.context.strokeRect(this.x - this.width / 2,this.y - this.height / 2,this.width,this.height);
	},
	shoot: function(coords) {
		new Survive.Assets.Shot(coords);
	}
});