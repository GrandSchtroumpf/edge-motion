'use strict';

angular.module('users').directive('profileContacts', ['contacts',
	function(contacts) {
		return {
			templateUrl: 'modules/users/views/profile/profile-contacts/profile-contacts.client.view.html',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
				scope.contacts = contacts;
				console.log(contacts);
			}
		};
	}
]);
