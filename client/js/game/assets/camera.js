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