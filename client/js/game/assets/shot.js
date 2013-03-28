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