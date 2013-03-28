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