'use strict';

angular.module('users').controller('AuthenticationController', ['$rootScope','$scope', '$state', '$http', '$location', 'Authentication', '$mdDialog', 'Users',
	function($rootScope, $scope, $state, $http, $location, Authentication, $mdDialog, Users) {
		$scope.authentication = Authentication;
        $scope.credentials = {username : '', password:''};
        $scope.newUser = new Users();

		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		$scope.signup = function() {
			$http.post('/api/auth/signup', $scope.newUser).success(function(response) {
				// If successful we assign the response to the global user models
                window.user = response;
				// And redirect to the index page
                $state.go('profile.resume', {userId:response._id}, {reload: true});
                $rootScope.$emit('signed');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.signin = function() {
            console.log($scope.credentials);
			$http.post('/api/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user models
				window.user = response;
				// And redirect to the index page
                $state.go('profile.resume', {userId:response._id}, {reload: true});
                $rootScope.$emit('signed');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

	}
]);
