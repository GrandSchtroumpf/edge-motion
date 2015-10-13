'use strict';

angular.module('sidebars').directive('sidebarLayout', ['Authentication','$rootScope',
	function(Authentication, $rootScope) {
		return {
			restrict: 'E',
            controller : function($scope, $element){
                //Connexion
                $scope.isAuthentficated = false;
                if(Authentication.user){
                    $scope.isAuthentficated = true;
                }else{
                    $scope.isAuthentficated = false;
                }

                $rootScope.$on('changeUser', function(event){
                    if(Authentication.user){
                        $scope.isAuthentficated = true;
                    }else{
                        $scope.isAuthentficated = false;
                    }
                });

                //sidebar content
                $scope.showSidebar = 'main';
                $scope.changeSidebar = function(sidebarName){
                    $scope.showSidebar = sidebarName;
                };

            },
			link: function postLink(scope, element, attrs) {


			}
		};
	}
]);
