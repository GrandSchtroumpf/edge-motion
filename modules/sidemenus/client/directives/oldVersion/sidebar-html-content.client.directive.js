'use strict';

angular.module('sidemenus').directive('sidebarHtmlContent', [
	function() {
		return {
			restrict: 'AEC',
			link: function postLink(scope, element, attrs) {
                scope.htmlContentUrl = function(){
                    return scope.menuActivated.htmlContent;
                };
			},
            template: '<div data-ng-include="htmlContentUrl()"></div>'
		};
	}
]);
