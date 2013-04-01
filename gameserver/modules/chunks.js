
var tiles = require('./tiles.js');
var barriers = require('./barriers.js');

var chunkSize = 512;

function getMainChunk(pos) {
    var chunksX = (pos.x / chunkSize)|0;
    var chunksY = (pos.y / chunkSize)|0;

    var chunkWorldPos = {
        x: chunksX * chunkSize,
        y: chunksY * chunkSize
    };

    return buildChunk(chunkWorldPos);
}

function buildChunk(chunkWorldPos) {
    return {
        worldPos: chunkWorldPos,
        size: chunkSize,
        payload: {
            tiles: tiles.getTiles(chunkWorldPos, chunkSize),
            barriers: barriers.get(chunkWorldPos)
        }
    };
}

exports.get = function(pos) {
    var chunks = [];
    var mainChunk = getMainChunk(pos);

    chunks.push(mainChunk);
    chunks.push(buildChunk({x: mainChunk.worldPos.x - chunkSize, y: mainChunk.worldPos.y}));
    chunks.push(buildChunk({x: mainChunk.worldPos.x + chunkSize, y: mainChunk.worldPos.y}));
    chunks.push(buildChunk({x: mainChunk.worldPos.x, y: mainChunk.worldPos.y - chunkSize}));
    chunks.push(buildChunk({x: mainChunk.worldPos.x, y: mainChunk.worldPos.y + chunkSize}));

    chunks.push(buildChunk({x: mainChunk.worldPos.x + chunkSize, y: mainChunk.worldPos.y + chunkSize}));
    chunks.push(buildChunk({x: mainChunk.worldPos.x + chunkSize, y: mainChunk.worldPos.y - chunkSize}));
    chunks.push(buildChunk({x: mainChunk.worldPos.x - chunkSize, y: mainChunk.worldPos.y - chunkSize}));
    chunks.push(buildChunk({x: mainChunk.worldPos.x - chunkSize, y: mainChunk.worldPos.y + chunkSize}));

    return chunks;
};