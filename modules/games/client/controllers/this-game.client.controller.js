'use strict';

angular.module('games').controller('ThisGameController', ['$scope','game', '$state',
	function($scope, game, $state) {
		$scope.game = game;

		// Remove existing Game
		$scope.remove = function( game ) {
			if ( game ) { game.$remove();

				for (var i in $scope.games ) {
					if ($scope.games [i] === game ) {
						$scope.games.splice(i, 1);
					}
				}
			} else {
				$scope.game.$remove(function() {
					$state.go('games');
				});
			}
		};

		// Update existing Game
		$scope.update = function() {
			var game = $scope.game ;

			game.$update(function() {
				$state.go('thisGame.view', {gameId : game._id});
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
	}
]);
