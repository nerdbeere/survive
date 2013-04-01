Survive.CollisionMap = new (Class.extend({
    show: true,
    stack: [],
    init: function() {

    },
    add: function(x, y, width, height) {
        this.stack.push({
            worldPos: {
                x: x,
                y: y
            },
            width: width,
            height: height,
            active: false
        })
    },
    draw: function() {
        if(!this.show) {
            return false;
        }
        for(var i = 0; i < this.stack.length; i++) {
            var pos = Survive.Player.calcRelativePosition(this.stack[i].worldPos);
            if(this.stack[i].active) {
                Survive.top.context.strokeStyle = '#FF0000';
            } else {
                Survive.top.context.strokeStyle = '#000000';
            }
            Survive.top.context.strokeRect(pos.x,pos.y,this.stack[i].width,this.stack[i].height);
        }
    },
    clear: function() {
        this.stack = [];
    },
    previousWorldPos: {x:0, y:0},
    checkForPlayerCollision: function(worldPos) {
        return false;

        if(worldPos.x === this.previousWorldPos.x && worldPos.y === this.previousWorldPos.y) {
            return false;
        }
        this.previousWorldPos = worldPos;
        var nearest = 0, distance = 0;
        for(var i = 0; i < this.stack.length; i++) {
            var currDist = Vector.getDistance(Survive.Player.worldPos, this.stack[i].worldPos);
            if(currDist < distance || distance === 0) {
                nearest = i;
                distance = currDist;
            }
            this.stack[i].active = false;
        }
        this.stack[nearest].active = true;

        var futurePlayer = {
            worldPos: {
                x: worldPos.x - Survive.Player.width / 2,
                y: worldPos.y - Survive.Player.height / 2
            },
            width: Survive.Player.width,
            height: Survive.Player.height
        };

        return this.checkCollision(futurePlayer, this.stack[nearest]);
    },
    checkCollision: function(r1, r2) {
        return !(r1.worldPos.x + r1.width < r2.worldPos.x ||
                r1.worldPos.y + r1.height < r2.worldPos.y ||
                r1.worldPos.x > r2.worldPos.x + r2.width ||
                r1.worldPos.y > r2.worldPos.y + r2.height);
    }
}))();