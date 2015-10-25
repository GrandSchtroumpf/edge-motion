'use strict';

angular.module('core').directive('svgIcon', [
	function() {
		return {
			scope : {icon : '='},
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
                scope.linkUrl = function(){
                    return 'modules/core/icons/'+scope.icon+'.svg-icon.html';
                };
			},
            template: '<div data-ng-include="linkUrl()"></div>'
		};
	}
]);
