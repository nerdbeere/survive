Survive.Resources.Images = {
	count: 0,
	loaded: 0,
	initComplete: false,
	imgBasePath: '/img/',
	load: function() {
		var that = this;
		for(var key in this.images) {
			that.count++;
			var img = new Image();
			img.src = that.imgBasePath + this.images[key].path;
			this.images[key].obj = img;
			img.onload = function() {
				that.loaded++;
			};
		}
		this.initComplete = true;
	},
	draw: function(name, x, y, canvas, size) {
		var imageName = 'image_not_found';
		if(typeof this.images[name] !== 'undefined') {
			imageName = name;
		}
		if(typeof canvas === 'undefined') {
			canvas = Survive.canvas;
		}
        if(typeof size !== 'undefined') {
            return canvas.context.drawImage(this.images[imageName].obj, x, y, size.width, size.height);
        }
		canvas.context.drawImage(this.images[imageName].obj, x, y);
	},
	isLoadingComplete: function() {
		if(this.initComplete && this.loaded === this.count) {
			return true;
		}

		return false;
	},
	images: {
		tile_grass: {
			path: 'tile_grass.png'
		},
		tile_stone: {
			path: 'tile_stone.png'
		},
		crate: {
			path: 'box2.png'
		},
        box3: {
			path: 'box3.png'
		},
		player: {
			path: 'player_1.png'
		},
		image_not_found: {
			path: 'image_not_found.png'
		}
	}
};