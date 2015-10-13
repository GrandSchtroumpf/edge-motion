'use strict';

angular.module('chat').directive('chatChannel', [
	function() {
		return {
			template: '<div></div>',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {

			}
		};
	}
]);
