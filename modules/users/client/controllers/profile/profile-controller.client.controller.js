'use strict';

angular.module('users').controller('ProfileController', ['$scope', '$http', '$state', 'Users', 'Authentication', 'user',
    function($scope, $http, $state, Users, Authentication, user) {
        $scope.user = user;
        $scope.authentication = Authentication;

        // Update a user profile
        $scope.updateUserProfile = function(isValid) {
            if (isValid){
                $scope.success = $scope.error = null;
                var user = new Users($scope.user);

                user.$update(function(response) {
                    $scope.success = true;
                    Authentication.user = response;
                }, function(response) {
                    $scope.error = response.data.message;
                });
            } else {
                $scope.submitted = true;
            }
        };

        $scope.Authentication = Authentication;

        $scope.editMode = function(){
            var currentName = $state.current.name;
            $state.go(currentName+'-edit');
        };

        $scope.viewMode = function(){
            var currentName = $state.current.name;
            var newName = currentName.replace('-edit','');
            $state.go(newName);
        };
    }
]);
