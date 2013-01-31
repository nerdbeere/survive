Survive.Assets.Main = Class.extend({
	x: 400,
	y: 400,
	init: function() {

	},
	draw: function() {

	}
});

Survive.Assets.Player = Class.extend({
	x: 400,
	y: 400,
	rotation: 0,
	width: 20,
	height: 20,
	init: function() {

	},
	draw: function() {

		var angleInRadians = this.rotation * Math.PI / 180;
		Survive.context.save();

		Survive.context.translate(this.x,this.y);
		Survive.context.rotate(angleInRadians);
		Survive.context.translate(this.x * -1,this.y * -1);

		Survive.context.fillStyle = '#FF0000';

		Survive.context.beginPath();
		Survive.context.arc(this.x, this.y, 2, 0, Math.PI * 2, true);
		Survive.context.closePath();
		Survive.context.fill();

		Survive.context.strokeStyle = '#000000';

		Survive.context.beginPath();

		Survive.context.moveTo(this.x + 0, this.y + -10);
		Survive.context.lineTo(this.x + 9, this.y + 9);
		Survive.context.lineTo(this.x + 0, this.y + -1);
		Survive.context.moveTo(this.x + -1, this.y + -1);
		Survive.context.lineTo(this.x + -10, this.y + 9);
		Survive.context.lineTo(this.x + -1, this.y + -10);

		Survive.context.stroke();
		Survive.context.closePath();

		Survive.context.restore();
	}
});

Survive.Assets.MousePosition = Class.extend({
	x: 0,
	y: 20,
	draw: function(pos) {
		var message = 'Mouse position: ' + pos.x + ',' + pos.y;

		Survive.context.font = '18pt Calibri';
		Survive.context.fillStyle = 'black';
		Survive.context.fillText(message, this.x, this.y);
	}
});


Survive.Assets.FPS = Class.extend({
	x: 0,
	y: 60,
	draw: function(fps) {
		var message = 'FPS: ' + fps;

		Survive.context.font = '18pt Calibri';
		Survive.context.fillStyle = 'black';
		Survive.context.fillText(message, this.x, this.y);
	}
});