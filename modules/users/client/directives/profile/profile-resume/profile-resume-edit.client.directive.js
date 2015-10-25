'use strict';

angular.module('core').directive('profileResumeEdit', [
	function() {
		return {
			templateUrl: 'modules/users/views/profile/profile-resume/profile-resume-edit.client.view.html',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {

			}
		};
	}
]);
