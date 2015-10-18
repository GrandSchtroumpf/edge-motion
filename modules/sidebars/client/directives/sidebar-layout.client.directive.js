'use strict';

angular.module('sidebars').directive('sidebarLayout', ['Authentication','$rootScope',
	function(Authentication, $rootScope) {
		return {
			restrict: 'E',
            controller : function($scope, $element){
                //Connexion
                if(Authentication.user){
                    $scope.isAuthenticated = true;
                }else{
                    $scope.isAuthenticated = false;
                }

                $rootScope.$on('signed', function(event){
                    $scope.isAuthenticated = true;
                });



            },
			link: function postLink(scope, element, attrs) {

                //sidebar content
                scope.showSidebar = 'main';
                scope.changeSidebar = function(sidebarName){
                    scope.showSidebar = sidebarName;
                };
			}
		};
	}
]);
