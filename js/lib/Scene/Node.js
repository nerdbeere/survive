Scene.Node = Class.extend({
	
	id: null,
	
	children: {},
	
	init: function() {
		
	},
	
	addChild: function(child) {
		this.children[child.id] = child;
	},
	
	removeChild: function(child) {
		delete this.children[child.id];
	},
	
	update: function(world, delta) {
		for(var i in this.children) {
			this.children[i].update(world, delta);
		}
		
	},
	
	draw: function(world, batch) {
		for(var i in this.children) {
			this.children[i].draw(world, batch);
		}
	},
	
});