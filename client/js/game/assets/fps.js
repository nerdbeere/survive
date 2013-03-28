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