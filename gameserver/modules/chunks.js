
var tiles = require('./tiles.js');
var barriers = require('./barriers.js');
var Zombie;
var PF = require('pathfinding');

var chunkSize = 512;
var playerPos = {
    x: 0,
    y: 0
};

exports.setZombies = function(z) {
	Zombie = z;
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
            barriers: barriers.get(chunkWorldPos)
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

		var origin = {x: mainChunk.worldPos.x - chunkSize, y: mainChunk.worldPos.y - chunkSize};

		Zombie.each(chunks[i].worldPos, function(zombie) {
			var zombieCollPos = calcCollPos(mainChunk, zombie.getWorldPos());
			var path = getPath(zombieCollPos, playerCollPos, grid);

			if(typeof path[1] === 'undefined') {
				return zombie;
			}
			var nextWaypoint = col2xy(path[1], origin);

			zombie.setPath(path);
			zombie.setTarget(nextWaypoint);
			zombie.update();

			return zombie;
		});

        chunks[i].origin = origin;
		chunks[i].payload.zombies = Zombie.export();
    }

    return chunks;
};

function col2xy(col, origin) {
	var x = col[0], y = col[1];

	return {
		x: origin.x + x * 32,
		y: origin.y + y * 32
	}
}

function getPath(pos1, pos2, grid) {
	var g = grid.clone();
	var finder = new PF.DijkstraFinder({
		allowDiagonal: true
	});
	return finder.findPath(pos1.x, pos1.y, pos2.x, pos2.y, g);
}