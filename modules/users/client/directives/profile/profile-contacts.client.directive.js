'use strict';

angular.module('users').directive('profileContacts', [
	function() {
		return {
			templateUrl: 'modules/users/views/profile/profile-contacts.client.view.html',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {

			}
		};
	}
]);
