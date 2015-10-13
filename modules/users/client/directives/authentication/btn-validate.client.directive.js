'use strict';

angular.module('users').directive('btnValidate', [
	function() {
		return {
			templateUrl: 'modules/users/icons/validate.html',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {

			}
		};
	}
]);
