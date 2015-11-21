'use strict';

// Players controller
angular.module('players').controller('PlayersController', ['$scope', '$stateParams', '$location', 'Authentication', 'Players','avatars','competencies','games',
	function($scope, $stateParams, $location, Authentication, Players, avatars, competencies, games ) {
		$scope.authentication = Authentication;
        $scope.avatars = avatars;
        $scope.competencies = competencies;
        $scope.games = games;

        $scope.playerTemplate = {
            game : '',
            avatars : []
        };

        //Add avatar to the template
        $scope.addAvatar = function(avatar){
            $scope.playerTemplate.avatars.push(avatar._id);
        };

		// Create new Player
		$scope.create = function() {
			// Create new Player object
			var player = new Players ({
				name: this.name
			});

			// Redirect after save
			player.$save(function(response) {
				$location.path('players/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.createTemplate = function(){
			console.log('bob');
		};

		// Remove existing Player
		$scope.remove = function( player ) {
			if ( player ) { player.$remove();

				for (var i in $scope.players ) {
					if ($scope.players [i] === player ) {
						$scope.players.splice(i, 1);
					}
				}
			} else {
				$scope.player.$remove(function() {
					$location.path('players');
				});
			}
		};

		// Update existing Player
		$scope.update = function() {
			var player = $scope.player ;

			player.$update(function() {
				$location.path('players/' + player._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find existing Player
		$scope.findOne = function() {
			$scope.player = Players.get({ 
				playerId: $stateParams.playerId
			});
		};
	}
]);
