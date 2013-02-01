Math.angle = function angle(pos1, pos2) {
	var dx = pos1.x - pos2.x;
	var dy = pos1.y - pos2.y;
	return Math.atan2(dy, dx) * (180 / Math.PI);
};