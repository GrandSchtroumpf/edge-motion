'use strict';

// Games controller
angular.module('games').controller('GamesController', ['$scope', '$stateParams', '$state', 'Authentication', 'Games', 'games',
	function($scope, $stateParams, $state, Authentication, Games, games ) {
		$scope.authentication = Authentication;
		$scope.games = games;

        $scope.roleAuthorised = function(){
            return Authentication.roles.indexOf('admin') !== -1;
        };

		// Create new Game
		$scope.create = function() {
			// Create new Game object
			var game = new Games ({
				name: this.name
			});

			// Redirect after save
			game.$save(function(response) {
				$state.go('thisGame.view', {gameId : response._id});

			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};



	}
]);
