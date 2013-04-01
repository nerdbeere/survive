Survive.Collections.Main = Class.extend({
    stack: [],
    init: function() {

    },
    add: function(element) {
        this.stack.push(element)
    },
    draw: function() {
        for(var i = 0; i < this.stack.length; i++) {
            this.stack[i].draw();
        }
    },
	clear: function() {
		this.stack = [];
	},
    set: function(stack) {
        this.stack = stack;
    }
});

Survive.Collections.Shots = new Survive.Collections.Main();
Survive.Collections.Players = new Survive.Collections.Main();

Survive.Collections.Tiles = new (Survive.Collections.Main.extend({
    draw: function() {
        for(var i = 0; i < this.stack.length; i++) {
            var pos = Survive.Player.calcRelativePosition(this.stack[i].worldPos);
            if(pos.x > Survive.surface.width || pos.y > Survive.surface.height) {
                return false;
            }
            Survive.Resources.Images.draw('tile_grass', pos.x, pos.y, Survive.surface);
        }
    }
}))();

Survive.Collections.Barriers = new (Survive.Collections.Main.extend({
    draw: function() {
        for(var i = 0; i < this.stack.length; i++) {
            var pos = Survive.Player.calcRelativePosition(this.stack[i].worldPos);
            Survive.Resources.Images.draw(this.stack[i].type, pos.x, pos.y, Survive.surface, {width: this.stack[i].width, height: this.stack[i].height});
        }
    }
}))();