Survive.Collections.Paths = new (Survive.Collections.Main.extend({
    draw: function() {
        for(var i = 0; i < this.stack.length; i++) {
            var pos = Survive.Player.calcRelativePosition({x: this.origin.x + this.stack[i][0] * 32, y: this.origin.y + this.stack[i][1] * 32});
            Survive.top.context.strokeRect(pos.x, pos.y, 32, 32);
        }
    }
}))();