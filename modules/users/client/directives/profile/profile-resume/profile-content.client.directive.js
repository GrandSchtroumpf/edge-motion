'use strict';

angular.module('users').directive('profileContent', [
	function() {
		return {
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
                scope.contentMode = 'viewMode';
			}
		};
	}
]);
