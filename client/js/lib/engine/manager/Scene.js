Engine.Manager.Scene = Engine.Manager.extend({
	rootNode: {},
	transformation: {},
	init: function() {
		this.rootNode = new Scene.Node();
		this.transformation = new Transformation();
	},
	update: function() {
		var delta = Survive.timer.delta;
		this.rootNode.update(this.transformation, delta);
	},
	draw: function() {
		var batch = [];
		this.rootNode.draw(this.transformation, batch);

		// batch sortieren
		var camera = this.resources.getManager('Camera');

		for(var i = 0; i < batch.length; i++) {
			// camera position abziehen und elemente zeichnen
		}
	}
});