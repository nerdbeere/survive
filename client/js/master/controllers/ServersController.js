function ServersController($scope, $rootScope) {
	$scope.servers = {};
    $rootScope.ingame = false;
	Master.app.io.on('gameserver', function(data) {
		$scope.servers = data;

		if (!$rootScope.$$phase){
			$rootScope.$apply();
		}
	});
}
