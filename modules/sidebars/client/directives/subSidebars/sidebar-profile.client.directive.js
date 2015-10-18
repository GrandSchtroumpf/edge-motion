'use strict';

angular.module('sidebars').directive('sidebarProfile', [
	function() {
		return {
			templateUrl: 'modules/sidebars/views/sidebar-profile.client.view.html',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {

			}
		};
	}
]);
