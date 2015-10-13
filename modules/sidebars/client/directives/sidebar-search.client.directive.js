'use strict';

angular.module('sidebars').directive('sidebarSearch', [
	function() {
		return {
			templateUrl: 'modules/sidebars/views/sidebar-search.client.view.html',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {

			}
		};
	}
]);
