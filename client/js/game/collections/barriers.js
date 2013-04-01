Survive.Collections.Barriers = new (Survive.Collections.Main.extend({
    draw: function() {
        for(var i = 0; i < this.stack.length; i++) {
            var pos = Survive.Player.calcRelativePosition(this.stack[i].worldPos);
            Survive.Resources.Images.draw(this.stack[i].type, pos.x, pos.y, Survive.surface, {width: this.stack[i].width, height: this.stack[i].height});
        }
    }
}))();