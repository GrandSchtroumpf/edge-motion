'use strict';

angular.module('core').directive('profileResumeEdit', [
	function() {
		return {
			templateUrl: 'modules/users/views/profile/profile-resume/profile-resume-edit.client.view.html',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
				scope.step = 1;

                scope.changeStep = function(number){
                    scope.step = scope.step + number;
                    if(scope.step < 1){
                        scope.step = 2;
                    }else if(scope.step > 2){
                        scope.step = 1;
                    }
                };
			}
		};
	}
]);
