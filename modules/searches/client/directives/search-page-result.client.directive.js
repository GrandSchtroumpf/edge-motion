'use strict';

angular.module('searches').directive('searchPageResult', [
	function() {
		return {
			templateUrl: 'modules/searches/views/view-result.client.view.html',
			restrict: 'E',
            controller : function($scope, $element){
            },
			link: function postLink(scope, element, attrs) {
                scope.colors = {
                    buttonColor : '#5e6a7a',
                    mainColor : '#11dfb1',
                    secondColor: '#f77269',
                    darkBackground : '#1e1e1f',
                    lightBackground : '#515152'
                };

                scope.$on('removeCategory', function(){
                    scope.flexSize = 100/(scope.searchResults.length);
                });
                scope.flexSize = 100/(scope.searchResults.length);

			}
		};
	}
]);
