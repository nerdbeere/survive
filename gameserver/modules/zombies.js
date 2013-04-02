var maxZombieCount = 1;
var zombies = [];

var Z = function(data) {

	var worldPos = {
		x: data.x,
		y: data.y
	};

	var target = {
		x: data.x,
		y: data.y
	};
	var path = [];

	return {
		getWorldPos: function() {
			return worldPos;
		},
		setTarget: function(t) {
			target = t;
		},
		setPath: function(p) {
			path = p;
		},
		update: function() {
			if(worldPos.x === target.x && worldPos.y === target.y) {
				return false;
			}

			worldPos.x = target.x;
			worldPos.y = target.y;
		},
		export: function() {
			return {
				path: path,
				worldPos: worldPos,
				target: target
			}
		}
	};
};

function spawn(pos) {
	if(zombies.length < maxZombieCount) {
		zombies.push(
			new Z({x: pos.x + 100, y: pos.y + 100})
		);
	}
}

exports.spawn = function(pos) {
	spawn(pos);
};

exports.export = function() {
	var zs = [];
	for(var i = 0; i < zombies.length; i++) {
		zs.push(zombies[i].export());
	}
	return zs;
};

exports.move = function(pos) {
	for(var i = 0; i < zombies.length; i++) {
		zombies[i].update();
	}
};

exports.each = function(pos, cb) {
	spawn(pos);
	for(var i = 0; i < zombies.length; i++) {
		zombies[i] = cb(zombies[i]);
	}
};