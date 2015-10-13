'use strict';

angular.module('core').directive('tabList', ['$compile',
	function($compile) {
		return {
			restrict: 'E',
			link: function postLink(scope, element, attrs) {

                var mainColor= '#11dfb1';
                /*global TweenMax*/
                /*global TimelineMax*/
                var newTemplate = angular.element('<span class="underline"></span>');
                var underline = $compile(newTemplate)(scope);
                element.append(underline);



                scope.activateTab = function(x) {
                    TweenMax.to(underline, 0.3, {
                        x: x+4  //+4 to resolve a bug
                    });
                };
			}
		};
	}
]);
