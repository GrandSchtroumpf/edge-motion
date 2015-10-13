'use strict';

angular.module('users').directive('signIn', [
	function() {
		return {
			templateUrl: 'modules/users/icons/signin.html',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {

			}
		};
	}
]);
