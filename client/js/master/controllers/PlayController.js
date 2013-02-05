function PlayController($rootScope, $routeParams) {
	Survive.Game.init({
		host: $routeParams.host,
		port: $routeParams.port
	});
}
