function AppController($scope, $route, $routeParams, $location, $rootScope) {
	$scope.$route = $route;
	$scope.$location = $location;
	$scope.$routeParams = $routeParams;
    $rootScope.ingame = false;
}
