'use strict';

// Configure the 'chat' module routes
angular.module('chat').config(['$stateProvider',
	function($stateProvider) {
		$stateProvider.
		state('chat', {
            abstract:true,
            controller :'ChatController'
		}).
            state('chat.main',{
                url: '/chat',
                templateUrl: 'modules/chat/views/chat.client.view.html'
            }).
            state('chat.sidebar',{
                templateUrl:'modules/chat/views/chat.slidebar.client.view.html'
            });

	}
]);
