'use strict';

//Setting up route
angular.module('avatars').config(['$stateProvider',
	function($stateProvider) {
		// Avatars state routing
		$stateProvider.
		state('avatars', {
			abstract: true,
			url: '/avatars',
			template: '<ui-view/>'
		}).
		state('avatars.list', {
			url: '',
			templateUrl: 'modules/avatars/views/list-avatars.client.view.html'
		}).
		state('avatars.create', {
			url: '/create',
			templateUrl: 'modules/avatars/views/create-avatar.client.view.html'
		}).
		state('avatars.view', {
			url: '/:avatarId',
			templateUrl: 'modules/avatars/views/view-avatar.client.view.html'
		}).
		state('avatars.edit', {
			url: '/:avatarId/edit',
			templateUrl: 'modules/avatars/views/edit-avatar.client.view.html'
		});
	}
]);