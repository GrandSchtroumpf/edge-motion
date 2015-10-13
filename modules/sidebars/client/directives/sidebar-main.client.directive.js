'use strict';

angular.module('sidebars').directive('sidebarMain', [
	function() {
		return {
			templateUrl: 'modules/sidebars/views/sidebar-main.client.view.html',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {

			}
		};
	}
]);
