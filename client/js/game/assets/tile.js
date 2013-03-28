Survive.Assets.Tile = Survive.Assets.Main.extend({
	tileSize: 64,
	x: 0,
	y: 0,
	update: function() {
		var pos = Survive.Player.calcRelativePosition(this.worldPos);
		this.x = pos.x;
		this.y = pos.y;
	},
	draw: function() {
		this.update();
		if(this.x > Survive.surface.width || this.y > Survive.surface.height) {
			return false;
		}
		if(this.x + 100 < 0 || this.y + 100 < 0) {
			return false;
		}
		Survive.Resources.Images.draw('tile_grass', this.x, this.y, Survive.surface);
	}
});