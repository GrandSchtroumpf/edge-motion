'use strict';

angular.module('sidebars').directive('sidebarToggler', [
	function() {
		return {
            templateUrl : 'modules/sidebars/icons/arrow_left.html',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {

                element.bind('click', function(){
                    //return to main sidebar
                    document.getElementById('wrapper').className = '';
                });
			}
		};
	}
]);
