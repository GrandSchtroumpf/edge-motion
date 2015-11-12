'use strict';

//Setting up route
angular.module('wikis').config(['$stateProvider',
	function($stateProvider) {
		// Wikis state routing
		$stateProvider.
		state('wikis', {
			abstract: true,
			url: '/wikis',
			template: '<ui-view/>'
		}).
		state('wikis.list', {
			url: '',
			templateUrl: 'modules/wikis/views/list-wikis.client.view.html'
		}).
		state('wikis.create', {
			url: '/create',
			templateUrl: 'modules/wikis/views/create-wiki.client.view.html'
		}).
		state('wikis.view', {
			url: '/:wikiId',
			templateUrl: 'modules/wikis/views/view-wiki.client.view.html'
		}).
		state('wikis.edit', {
			url: '/:wikiId/edit',
			templateUrl: 'modules/wikis/views/edit-wiki.client.view.html'
		});
	}
]);