Scene.Node.Transformation = Scene.Node.extend({
	
	transformation: null,
	
	init: function(transformation) {
		this.transformation = transformation;
	},
	
	update: function(world, delta) {
		world.addTransformation(this.transformation);
		
		for(var i in this.children) {
			this.children[i].update(world, delta);
		}
		
		world.removeTransformation(this.transformation);
	},
	
	draw: function(world, batch) {
		world.addTransformation(this.transformation);
		
		for(var i in this.children) {
			this.children[i].draw(world, batch);
		}
		
		world.removeTransformation(this.transformation);
	}
	
});