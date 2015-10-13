'use strict';

angular.module('users').directive('womanChoice', [
	function() {
		return {
			templateUrl: 'modules/users/icons/woman.html',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {

			}
		};
	}
]);
