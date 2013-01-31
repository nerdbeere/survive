Vector = Class.extend({
	x: 0,
	y: 0,
	
	init: function(x, y) {
		this.x = x;
		this.y = y;
	},
	
	abs: function() {
		this.x = Math.abs(this.x);
		this.y = Math.abs(this.y);
		return this;
	},
	
	add: function(vector) {
		this.x += vector.x;
		this.y += vector.y;
		return this;
	},
	
	subtract: function(vector) {
		this.x -= vector.x;
		this.y -= vector.y;
		return this;
	},
	
	multiply: function(vector) {
		this.x *= vector.x;
		this.y *= vector.y;
		return this;
	},
	
	divide: function(vector) {
		this.x /= vector.x;
		this.y /= vector.y;
		return this;
	},
	
	normalize: function() {
		var length = this.getLength();
		this.x /= length;
		this.y /= length;
		return this;
	},
	
	getLength: function() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	},
	
	getLengthSquared: function() {
		return this.x * this.x + this.y * this.y;
	},
	
	dotProduct: function(vector) {
		return this.x * vector.x + this.y * vector.y;
	}
	
});
