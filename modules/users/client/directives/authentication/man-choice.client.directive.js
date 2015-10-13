'use strict';

angular.module('users').directive('manChoice', [
	function() {
		return {
			templateUrl: 'modules/users/icons/man.html',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {

			}
		};
	}
]);
