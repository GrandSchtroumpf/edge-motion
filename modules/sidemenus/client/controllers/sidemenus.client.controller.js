'use strict';

// Sidemenus controller
angular.module('sidemenus').controller('SidemenusController', ['$scope', '$state', '$stateParams', '$location', 'Authentication', 'Sidemenus',
	function($scope, $state, $stateParams, $location, Authentication, Sidemenus ) {
		$scope.authentication = Authentication;




		// Create new Sidemenu
		$scope.create = function() {
			// Create new Sidemenu object
			var sidemenu = new Sidemenus ({
				name: this.name
			});

			// Redirect after save
			sidemenu.save(function(response) {
				$location.path('sidemenus/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Sidemenu
		$scope.remove = function( sidemenu ) {
			if ( sidemenu ) { sidemenu.$remove();

				for (var i in $scope.sidemenus ) {
					if ($scope.sidemenus [i] === sidemenu ) {
						$scope.sidemenus.splice(i, 1);
					}
				}
			} else {
				$scope.sidemenu.$remove(function() {
					$location.path('sidemenus');
				});
			}
		};

		// Update existing Sidemenu
		$scope.update = function() {
			var sidemenu = $scope.sidemenu ;

			sidemenu.update(function() {
				$location.path('sidemenus/' + sidemenu._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Sidemenus
		$scope.find = function() {
			$scope.sidemenus = Sidemenus.query();
		};

		// Find existing Sidemenu
		$scope.findOne = function() {
			$scope.sidemenu = Sidemenus.get({ 
				sidemenuId: $stateParams.sidemenuId
			});
		};
	}
]);
