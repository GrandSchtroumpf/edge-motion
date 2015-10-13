'use strict';

angular.module('users').directive('profileAvatar', [
	function() {
		return {
            scope: {image:'@'},
			template: '<img ng-src="{{image}}"/>',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {

			}
		};
	}
]);
