'use strict';

angular.module('competencies').controller('ThisCompetencyController', ['$scope','competency', '$state',
	function($scope, competency, $state) {
		$scope.competency = competency;

		// Remove existing Competency
		$scope.remove = function( competency ) {
			if ( competency ) { competency.$remove();

				for (var i in $scope.competencies ) {
					if ($scope.competencies [i] === competency ) {
						$scope.competencies.splice(i, 1);
					}
				}
			} else {
				$scope.competency.$remove(function() {
					$state.go('competencies.list');
				});
			}
		};

		// Update existing Competency
		$scope.update = function() {
			var competency = $scope.competency ;

			competency.$update(function() {
				$state.go('thisCompetency.view', {competencyId : competency._id});
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
	}
]);
