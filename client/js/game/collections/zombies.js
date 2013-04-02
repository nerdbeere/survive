Survive.Collections.Zombies = new (Survive.Collections.Main.extend({
    draw: function() {
        for(var i = 0; i < this.stack.length; i++) {
            var pos = Survive.Player.calcRelativePosition(this.stack[i].worldPos);
            Survive.Resources.Images.draw('zombie', pos.x, pos.y, Survive.canvas, {width: 32, height: 32});
			Survive.canvas.context.fillText(this.stack[i].worldPos.x.toFixed(2) + ':' + this.stack[i].worldPos.y.toFixed(2), pos.x - 50, pos.y + 30);
        }
    }
}))();