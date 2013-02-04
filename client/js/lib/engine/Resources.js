Engine.Resources = Class.extend({
	manager: {},
	systems: {},
	init: function() {

	},
	getManager: function(name) {
		if(typeof this.manager[name] === 'undefined') {
			this.manager[name] = new Engine.Manager[name](this);
		}

		return this.manager[name];
	},
	getSystem: function(name) {
		if(typeof this.systems[name] === 'undefined') {
			this.systems[name] = new Engine.System[name](this);
		}

		return this.systems[name];
	}
});