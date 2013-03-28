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
	},
	draw: function() {

		this.update();

		Survive.canvas.context.save();

		Survive.canvas.context.strokeStyle = '#FF0000';
		Survive.canvas.context.strokeRect(this.x, this.y, this.width, this.height);

		Survive.canvas.context.restore();
		this.drawWorldPos();
	}
});