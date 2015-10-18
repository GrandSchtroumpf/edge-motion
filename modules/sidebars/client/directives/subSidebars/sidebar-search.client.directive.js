'use strict';

angular.module('sidebars').directive('sidebarSearch', ['$state',
	function($state) {
		return {
			templateUrl: 'modules/sidebars/views/sidebar-search.client.view.html',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {

				scope.doSearch = function(filter){
                    var categories = '';
					if(filter.category.school){
                        categories = categories + 'school-';
                    }
                    if(filter.category.user){
                        categories = categories + 'user-';
                    }
                    if(filter.category.game){
                        categories = categories + 'game';
                    }
					$state.go('search.result', {keyword : filter.keyword, category : categories});
				};
			}
		};
	}
]);
