'use strict';

// Schools controller
angular.module('schools').controller('SchoolsController', ['$scope', '$stateParams', '$state', 'Authentication', 'Schools','schools',
	function($scope, $stateParams, $state, Authentication, Schools, schools) {
		$scope.authentication = Authentication;
        $scope.schools = schools;

		$scope.roleAuthorised = function(){
			return Authentication.roles.indexOf('admin') !== -1;
		};

		// Create new School
		$scope.create = function() {
			// Create new School object
			var school = new Schools ({
				name: this.name,
                description : this.description
			});

			// Redirect after save
			school.$save(function(response) {
				$state.go('thisSchool.view', {schoolId : response._id});

			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
	}
]);
