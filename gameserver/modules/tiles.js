var tileSize = 64;
var worldSize = 5000;
var offset = {
	x: 768,
	y: 512
};

function calcTiles(center) {
	var tiles = [];

	var nextGridX = center.x % tileSize;
	var nextGridY = center.y % tileSize;

	for(var i = center.x - offset.x - nextGridX; i < center.x + offset.x; i = i + tileSize) {
		for(var j = center.y - offset.y - nextGridY; j < center.y + offset.y; j = j + tileSize) {
			if(i < 0 || j < 0) {
				continue;
			}
			var tile = {
				worldPos: {
					x: i,
					y: j
				},
				type: 1
			};
			tiles.push(tile);
		}
	}
	return tiles;
}

exports.getTiles = function(pos, chunkSize) {
    var tileCount = chunkSize / tileSize;
    var tiles = [];

    for(var i = 0; i < tileCount; i++) {
        for(var j = 0; j < tileCount; j++) {
            tiles.push({
                worldPos: {
                    x: pos.x + i * tileSize,
                    y: pos.y + j * tileSize
                },
                type: 1
            });
        }
    }

    return tiles;
};