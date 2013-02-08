function UserLoginController($scope, User) {
    $scope.user = User.get();
}