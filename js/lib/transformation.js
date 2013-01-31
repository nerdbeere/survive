var Transformation = Class.extend({
	
	Translation: {
		x: 0,
		y: 0
	},
	
	Rotation: {
		a: 0, //costheta,
		b: 0, //sintheta,
		c: 0, //-sintheta,
		d: 0  //costheta
	},
	
	Scale: {
		x: 0,
		y: 0
	},
	
	addTranslation: function(translation) {
		this.Translation.x += translation.x;
		this.Translation.y += translation.y;
	},
	
	removeTranslation: function(translation) {
		this.Translation.x -= translation.x;
		this.Translation.y -= translation.y;
	},
	
	rotateDegree: function(deg) {
		return this.rotate(deg * (Math.PI/180));
	},
	
	rotate: function(rad) {
		var costheta = Math.cos(rad);
        var sintheta = Math.sin(rad);
		
		this.Rotation.a = costheta;
		this.Rotation.b = sintheta;
		this.Rotation.c = -sintheta;
		this.Rotation.d = costheta;
	},
	
	scale: function(x, y) {
		this.Scale.x = x;
		this.Scale.y = y;
	},
	
});