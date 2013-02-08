
Master.app = angular.module('survive', [], function($routeProvider) {

	$routeProvider.when('/', {
		controller: HomeController,
		templateUrl: 'templates/home.html'
	});

	$routeProvider.when('/servers', {
		controller: ServersController,
		templateUrl: 'templates/servers.html'
	});

	$routeProvider.when('/play/:host/:port', {
		controller: PlayController,
		templateUrl: 'templates/play.html'
	});

});

Master.app.config(function() {

});

Master.app.run(function($rootScope, User) {
	Master.app.io = io.connect('127.0.0.1:3001');
    $rootScope.loggedIn = false;
    var user = User.get();
    user.init();
});