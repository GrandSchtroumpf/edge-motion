'use strict';

//Setting up route
angular.module('messages').config(['$stateProvider',
	function($stateProvider) {
		// Messages state routing
		$stateProvider.
		    state('messages', {
                abstract :true,
                url: '/messages',
                controller:'MessagesController',
                controllerAs:'mainCtrl',
                templateUrl: 'modules/messages/views/list-messages.client.view.html',
                resolve: {
                    messages : function(Messages){return Messages.query(function(messages){return messages;});}
                }
		    }).
            state('messages.view',{
                url:'/',
                templateUrl: 'modules/messages/views/view-message.client.view.html'
            }).
            state('messages.create',{
                url:'/create/:answerAll/:messageId',
                controller : 'CreateMessagesController',
                controllerAs : 'ctrl',
                templateUrl: 'modules/messages/views/create-message.client.view.html',
                resolve: {
                    users : function(Users){return Users.query(function(users){return users;});},
                    answerAll : function($stateParams){return $stateParams.answerAll;},
                    message : function(Messages, $stateParams){
                        if($stateParams.messageId !== '')
                        {
                            return Messages.get({messageId: $stateParams.messageId}, function(message){return message;});
                        }
                    }
                }

            });
	}
]);
