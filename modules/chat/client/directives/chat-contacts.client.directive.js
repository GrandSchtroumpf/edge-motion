'use strict';

angular.module('chat').directive('chatContacts', ['$q', '$http','Users',
	function($q, $http, Users) {
		return {
			templateUrl: 'modules/chat/views/chat.contacts.client.view.html',
			restrict: 'E',
            controller : function($scope, $element){
                $scope.users = Users.query();
                console.log($scope.users);
            },
			link: function postLink(scope, element, attrs) {
			}
		};
	}
]);
