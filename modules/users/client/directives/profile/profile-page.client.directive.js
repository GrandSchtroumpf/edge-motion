'use strict';

angular.module('users').directive('profilePage', ['Authentication','$state',
	function(Authentication, $state) {
		return {
			restrict: 'E',
			link: function postLink(scope, element, attrs) {

				scope.Authentication = Authentication;

                scope.editMode = function(){
                    var currentName = $state.current.name;
                    $state.go(currentName+'-edit');
                };

                scope.viewMode = function(){
                    var currentName = $state.current.name;
                    var newName = currentName.replace('-edit','');
                    $state.go(newName);
                };
			}
		};
	}
]);
