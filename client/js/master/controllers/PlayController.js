function PlayController($rootScope, $routeParams) {
    $rootScope.ingame = true;
    Survive.Game.init({
		host: $routeParams.host,
		port: $routeParams.port
	});
}
