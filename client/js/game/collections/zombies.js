Survive.Collections.Zombies = new (Survive.Collections.Main.extend({
    draw: function() {
        for(var i = 0; i < this.stack.length; i++) {
            var pos = Survive.Player.calcRelativePosition(this.stack[i].worldPos);
            Survive.Resources.Images.draw('zombie', pos.x, pos.y, Survive.canvas, {width: 32, height: 32});
        }
    }
}))();