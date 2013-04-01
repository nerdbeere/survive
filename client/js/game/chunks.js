Survive.Chunks = new (Class.extend({
    show: true,
    chunks: [],
    init: function() {

    },
    draw: function() {
        Survive.Collections.Tiles.clear();
        Survive.Collections.Barriers.clear();
        Survive.Collections.Zombies.clear();
        Survive.Collections.Paths.clear();
        for(var i = 0; i < this.chunks.length; i++) {
            if(this.show) {
                var pos = Survive.Player.calcRelativePosition(this.chunks[i].worldPos);
                Survive.top.context.strokeStyle = '#000000';
                Survive.top.context.strokeRect(pos.x,pos.y, this.chunks[i].size, this.chunks[i].size);
            }
            Survive.Collections.Barriers.concat(this.chunks[i].payload.barriers);
            Survive.Collections.Tiles.concat(this.chunks[i].payload.tiles);
            Survive.Collections.Paths.concat(this.chunks[i].payload.zombies[0].path);
            Survive.Collections.Zombies.concat(this.chunks[i].payload.zombies[0]);
        }
        if(typeof this.chunks[0] === 'undefined') {
            return false;
        }
        Survive.Collections.Paths.origin = this.chunks[0].origin;

    }
}))();