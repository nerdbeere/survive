Survive.Chunks = new (Class.extend({
    show: true,
    chunks: [],
    init: function() {

    },
    draw: function() {
        var tiles = [];
        var barriers = [];
        for(var i = 0; i < this.chunks.length; i++) {
            if(this.show) {
                var pos = Survive.Player.calcRelativePosition(this.chunks[i].worldPos);
                Survive.top.context.strokeStyle = '#000000';
                Survive.top.context.strokeRect(pos.x,pos.y, this.chunks[i].size, this.chunks[i].size);
            }
            barriers = barriers.concat(this.chunks[i].payload.barriers);
            tiles = tiles.concat(this.chunks[i].payload.tiles);
        }
        Survive.Collections.Tiles.set(tiles);
        Survive.Collections.Barriers.set(barriers);
    }
}))();