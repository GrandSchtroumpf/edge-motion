'use strict';

// Competencies controller
angular.module('competencies').controller('CompetenciesController', ['$scope', '$stateParams', '$state', 'Authentication', 'Competencies', 'competencies',
	function($scope, $stateParams, $state, Authentication, Competencies, competencies ) {
		$scope.authentication = Authentication;
        $scope.competencies = competencies;


		// Create new Competency
		$scope.create = function() {
            console.log('bob');
			// Create new Competency object
			var competency = new Competencies ({
				name: this.name,
                level : this.level
			});

			// Redirect after save
			competency.$save(function(response) {
				$state.go('thisCompetency.view', {competencyId : response._id});

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};



	}
]);
