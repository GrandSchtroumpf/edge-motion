'use strict';

angular.module('users').directive('signUp', [
	function() {
		return {
			templateUrl: 'modules/users/icons/signup.html',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {

			}
		};
	}
]);
