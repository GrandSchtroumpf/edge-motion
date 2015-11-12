'use strict';

//Setting up route
angular.module('games').config(['$stateProvider',
	function($stateProvider) {
		// Games state routing
		$stateProvider.
		state('games', {
			abstract: true,
			url: '/games',
			template: '<ui-view/>'
		}).
		state('games.list', {
			url: '',
			templateUrl: 'modules/games/views/list-games.client.view.html'
		}).
		state('games.create', {
			url: '/create',
			templateUrl: 'modules/games/views/create-game.client.view.html'
		}).
		state('games.view', {
			url: '/:gameId',
			templateUrl: 'modules/games/views/view-game.client.view.html'
		}).
		state('games.edit', {
			url: '/:gameId/edit',
			templateUrl: 'modules/games/views/edit-game.client.view.html'
		});
	}
]);