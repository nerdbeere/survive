
var tiles = require('./tiles.js');

var chunkSize = 512;

exports.get = function(pos) {
    var chunksX = (pos.x / chunkSize)|0;
    var chunksY = (pos.y / chunkSize)|0;

    var chunkWorldPos = {
        x: chunksX * chunkSize,
        y: chunksY * chunkSize
    };
    return [{
        worldPos: chunkWorldPos,
        size: chunkSize,
        payload: {
            tiles: tiles.getTiles(chunkWorldPos, chunkSize)
        }
    }];
};