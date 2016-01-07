'use strict';

angular.module('sidebars').directive('sidebarToggler', ['$window',
	function($window) {
		return {
            templateUrl : 'modules/sidebars/icons/arrow_left.html',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {

				scope.width = window.innerWidth;

                element.bind('click', function(){
                    //return to main sidebar
                    document.getElementById('wrapper').className = '';
                });
			}
		};
	}
]);
