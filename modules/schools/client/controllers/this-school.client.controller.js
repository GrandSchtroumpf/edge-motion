'use strict';

angular.module('schools').controller('ThisSchoolController', ['$scope', 'Authentication','$state','school',
	function($scope, Authentication, $state, school) {
        $scope.school = school;
		$scope.authentication = Authentication;
		$scope.roleAuthorised = function(){
			return Authentication.roles.indexOf('admin') !== -1;
		};

		// Remove existing School
		$scope.remove = function( school ) {
			if ( school ) { school.$remove();

				for (var i in $scope.schools ) {
					if ($scope.schools [i] === school ) {
						$scope.schools.splice(i, 1);
					}
				}
			} else {
				$scope.school.$remove(function() {
					$state.go('schools');
				});
			}
		};

		// Update existing School
		$scope.update = function() {
			var school = $scope.school ;

			school.$update(function() {
				$state.go('thisSchool.view', {schoolId : school._id});
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
	}
]);
