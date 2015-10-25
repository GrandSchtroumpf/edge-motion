'use strict';

angular.module('users').directive('profileProgressbar', [
	function() {
		return {
			templateUrl: 'modules/users/icons/progressbar.html',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {

                scope.color = '#3AA935';
				scope.experience = 60/100*195.5;
			}
		};
	}
]);
