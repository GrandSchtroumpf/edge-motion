'use strict';

angular.module('sidebars').directive('sidebarGame', [
	function() {
		return {
			template: '<div></div>',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
				// Sidebar game directive logic
				// ...

				element.text('this is the sidebarGame directive');
			}
		};
	}
]);