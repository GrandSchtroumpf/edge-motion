'use strict';

//Setting up route
angular.module('avatars').config(['$stateProvider',
	function($stateProvider) {
		// Avatars state routing
		$stateProvider.
            state('avatars', {
                abstract: true,
                url: '/avatars',
                controller : 'AvatarsController',
                template: '<ui-view/>',
                resolve : {
                    avatars : function(Avatars){return Avatars.query();}
                }
            }).
            state('avatars.list', {
                url: '',
                templateUrl: 'modules/avatars/views/list-avatars.client.view.html'
            }).
            state('avatars.create', {
                url: '/create',
                templateUrl: 'modules/avatars/views/create-avatar.client.view.html'
            }).

            state('thisAvatar', {
                abstract : true,
                url : '/avatar/:avatarId',
                controller : 'ThisAvatarController',
                templateUrl: 'modules/avatars/views/this-avatar.client.view.html',
                resolve : {
                    avatar : function(Avatars, $stateParams){return Avatars.get({avatarId : $stateParams.avatarId});}
                }
            }).
            state('thisAvatar.view', {
                url: '/view',
                templateUrl: 'modules/avatars/views/view-avatar.client.view.html'
            }).
            state('thisAvatar.edit', {
                url: '/edit',
                templateUrl: 'modules/avatars/views/edit-avatar.client.view.html'
            });
	}
]);
