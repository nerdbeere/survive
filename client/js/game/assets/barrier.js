Survive.Assets.Barrier = Survive.Assets.Main.extend({
	x: 0,
	y: 0,
	rotation: 0,
	width: 64,
	height: 64,
	worldPos: {
		x: 0,
		y: 0
	},
    type: 'crate',
	init: function(data) {
        this.worldPos = data.worldPos;
        this.type = data.type;
        this.width = data.width;
        this.height = data.height;
        Survive.CollisionMap.add(this.worldPos.x, this.worldPos.y, this.width, this.height);
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

        Survive.Resources.Images.draw(this.type, this.x, this.y, Survive.surface, {width: this.width, height: this.height});

		Survive.canvas.context.restore();
		//this.drawWorldPos();
	}
});