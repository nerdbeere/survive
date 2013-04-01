
var tiles = require('./tiles.js');
var barriers = require('./barriers.js');
var zombies = require('./zombies.js');
var PF = require('pathfinding');

var chunkSize = 512;
var playerPos = {
    x: 0,
    y: 0
};

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
            barriers: barriers.get(chunkWorldPos),
            zombies: zombies.get(playerPos, chunkWorldPos)
        }
    };
}

function calcCollPos(mainChunk, worldPos) {
    var collPos = {
        x: ((((mainChunk.worldPos.x - chunkSize - worldPos.x)|0)) / 32 | 0) * -1,
        y: ((((mainChunk.worldPos.y - chunkSize - worldPos.y)|0)) / 32 | 0) * -1
    };

    return collPos;
}

exports.get = function(pos) {
    playerPos = pos;
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

    var grid = new PF.Grid(3 * chunkSize / 32, 3 * chunkSize / 32);

    var playerCollPos = calcCollPos(mainChunk, playerPos);

    for(var i = 0; i < chunks.length; i++) {
        var g = grid.clone();
        var zombieCollPos = calcCollPos(mainChunk, chunks[i].payload.zombies[0].worldPos);
        var finder = new PF.DijkstraFinder();
        chunks[i].payload.zombies[0].path = [finder.findPath(zombieCollPos.x, zombieCollPos.y, playerCollPos.x, playerCollPos.y, g)[1]];
        chunks[i].origin = {x: mainChunk.worldPos.x - chunkSize, y: mainChunk.worldPos.y - chunkSize};
    }

    return chunks;
};