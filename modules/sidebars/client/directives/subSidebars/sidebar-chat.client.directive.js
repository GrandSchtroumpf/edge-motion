'use strict';

angular.module('sidebars').directive('sidebarChat', [
	function() {
		return {
			templateUrl: 'modules/sidebars/views/sidebar-chat.client.view.html',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {

			}
		};
	}
]);
