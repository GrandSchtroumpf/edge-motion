'use strict';

//Setting up route
angular.module('games').config(['$stateProvider',
	function($stateProvider) {
		// Games state routing
		$stateProvider.
			state('games', {
				abstract: true,
				url: '/games',
				template: '<ui-view/>',
				controller : 'GamesController',
				resolve : {
					games : function(Games){return Games.query();}
				}
			}).
			state('games.list', {
				url: '',
				templateUrl: 'modules/games/views/list-games.client.view.html'
			}).
			state('games.create', {
				url: '/create',
				templateUrl: 'modules/games/views/create-game.client.view.html'
			}).

			state('thisGame', {
				abstract: true,
				url: '/game/:gameId',
				templateUrl: 'modules/games/views/this-game.client.view.html',
				controller : 'ThisGameController',
				resolve : {
					game : function(Games, $stateParams){return Games.get({gameId : $stateParams.gameId});}
				}
			}).
			state('thisGame.view', {
				url: '/view',
				templateUrl: 'modules/games/views/view-game.client.view.html'

			}).
			state('thisGame.edit', {
				url: '/edit',
				templateUrl: 'modules/games/views/edit-game.client.view.html'
			});
	}
]);
