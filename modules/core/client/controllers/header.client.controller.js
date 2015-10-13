'use strict';

angular.module('core').controller('HeaderController', ['$scope', '$state', 'Authentication', 'Menus','$mdDialog',
	function($scope, $state, Authentication, Menus, $mdDialog) {
		// Expose view variables
		$scope.$state = $state;
		$scope.authentication = Authentication;


	}
]);
