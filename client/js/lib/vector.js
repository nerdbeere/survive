var Dot = function(x, y) {
	return {x: x, y: y};
};

var Vector = {
	
	abs: function(vector) {
		vector.x = Math.abs(vector.x);
		vector.y = Math.abs(vector.y);
	},
	
	add: function(vector1, vector2) {
		vector1.x += vector2.x;
		vector1.y += vector2.y;
	},
	
	subtract: function(vector1, vector2) {
		vector1.x -= vector2.x;
		vector1.y -= vector2.y;
	},
	
	multiply: function(vector1, vector2) {
		vector1.x *= vector2.x;
		vector1.y *= vector2.y;
	},
	
	divide: function(vector1, vector2) {
		vector1.x /= vector2.x;
		vector1.y /= vector2.y;
	},
	
	normalize: function(vector) {
		var length = Vector.getLength(vector);
		vector.x /= length;
		vector.y /= length;
	},
	
	getLength: function(vector) {
		return Math.sqrt(vector.x * vector.x + vector.y * vector.y);
	},

    getDistance: function(vektor1, vektor2) {
        return Math.pow((vektor1.x - vektor2.x), 2) + Math.pow((vektor1.y - vektor2.y), 2);
    },

    getRealDistance: function() {
        return Math.sqrt(this.getDistance(vektor1, vektor2));
    },

	getLengthSquared: function(vector) {
		return vector.x * vector.x + vector.y * vector.y;
	},
	
	dotProduct: function(vector1, vector2) {
		return vector1.x * vector2.x + vector1.y * vector2.y;
	}
	
};
