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
	
	addTransformation: function(transformation) {
		this.addTranslation(transformation.Translation);
		return this;
	},
	
	removeTransformation: function(transformation) {
		this.removeTranslation(transformation.Translation);
		return this;
	},
	
	addTranslation: function(translation) {
		this.Translation.x += translation.x;
		this.Translation.y += translation.y;
		return this;
	},
	
	removeTranslation: function(translation) {
		this.Translation.x -= translation.x;
		this.Translation.y -= translation.y;
		return this;
	},
	
	rotateDegree: function(deg) {
		this.rotate(deg * (Math.PI/180));
		return this;
	},
	
	rotate: function(rad) {
		var costheta = Math.cos(rad);
        var sintheta = Math.sin(rad);
		
		this.Rotation.a = costheta;
		this.Rotation.b = sintheta;
		this.Rotation.c = -sintheta;
		this.Rotation.d = costheta;
		return this;
	},
	
	scale: function(x, y) {
		this.Scale.x = x;
		this.Scale.y = y;
		return this;
	},
	
});