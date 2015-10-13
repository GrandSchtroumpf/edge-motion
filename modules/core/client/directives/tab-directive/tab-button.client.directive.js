'use strict';

angular.module('core').directive('tabButton', ['$compile',
	function($compile) {
		return {
			restrict: 'A',
			link: function postLink(scope, element, attrs) {

                angular.element(element[0]).on('click', function(event){
                    scope.activateTab(element[0].getBoundingClientRect().left - element[0].getBoundingClientRect().width);
                    angular.element(element[0]).addClass('active');
                });

			}
		};
	}
]);
