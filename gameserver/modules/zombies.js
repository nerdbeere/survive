exports.get = function(playerPos, pos) {
    return [{
        worldPos: {
            x: pos.x + 256,
            y: pos.y + 256
        }
    }];
};