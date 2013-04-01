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