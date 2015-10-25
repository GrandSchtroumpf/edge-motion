'use strict';

angular.module('sidebars').directive('sidebarSearch', ['$state','$http',
	function($state, $http) {
		return {
			templateUrl: 'modules/sidebars/views/sidebar-search.client.view.html',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {

				scope.doSearch = function(filter){
					$state.go('search.result', {search : filter}, {reload : true});

				};
			}
		};
	}
]);
