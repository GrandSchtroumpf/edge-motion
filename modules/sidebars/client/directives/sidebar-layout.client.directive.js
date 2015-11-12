'use strict';

angular.module('sidebars').directive('sidebarLayout', ['Authentication','$rootScope','$http','$state',
	function(Authentication, $rootScope, $http, $state) {
		return {
			restrict: 'E',
            controller : function($scope, $element){
                //Connexion
                if(Authentication.user){
                    $scope.isAuthenticated = true;
                }else{
                    $scope.isAuthenticated = false;
                }
                $scope.Authenticaton = Authentication;

                $rootScope.$on('signed', function(event){
                    $scope.isAuthenticated = true;
                });
                $rootScope.$on('signout', function(event){
                    $scope.isAuthenticated = false;
                });



            },
			link: function postLink(scope, element, attrs) {

                //sidebar content
                scope.showSidebar = 'main';
                scope.changeSidebar = function(sidebarName){
                    scope.showSidebar = sidebarName;
                };

                scope.signout = function(){
                    $http.get('/api/auth/signout');
                    $rootScope.$emit('signout');
                    $state.go('authentication.signin');
                };

                //Only for profile
                scope.profileToggled = function(){
                    if((scope.showSidebar !== 'profile' &&  document.getElementById('wrapper').className !== 'toggled') || (scope.showSidebar === 'profile')) {
                        return true;
                    }else{
                        return false;
                    }
                };

			}
		};
	}
]);
