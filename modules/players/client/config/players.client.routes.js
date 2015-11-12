'use strict';

//Setting up route
angular.module('players').config(['$stateProvider',
	function($stateProvider) {
		// Players state routing
		$stateProvider.
		state('players', {
			abstract: true,
			url: '/players',
			template: '<ui-view/>'
		}).
		state('players.list', {
			url: '',
			templateUrl: 'modules/players/views/list-players.client.view.html'
		}).
		state('players.create', {
			url: '/create',
			templateUrl: 'modules/players/views/create-player.client.view.html'
		}).
		state('players.view', {
			url: '/:playerId',
			templateUrl: 'modules/players/views/view-player.client.view.html'
		}).
		state('players.edit', {
			url: '/:playerId/edit',
			templateUrl: 'modules/players/views/edit-player.client.view.html'
		});
	}
]);