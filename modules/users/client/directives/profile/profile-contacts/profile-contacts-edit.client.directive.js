'use strict';

angular.module('core').directive('profileContactsEdit', [
	function() {
		return {
			templateUrl: 'modules/users/views/profile/profile-contacts/profile-contacts-edit.client.view.html',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {

			}
		};
	}
]);
