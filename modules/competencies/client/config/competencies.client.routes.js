'use strict';

//Setting up route
angular.module('competencies').config(['$stateProvider',
	function($stateProvider) {
		// Competencies state routing
		$stateProvider.
		state('competencies', {
			abstract: true,
			url: '/competencies',
			template: '<ui-view/>'
		}).
		state('competencies.list', {
			url: '',
			templateUrl: 'modules/competencies/views/list-competencies.client.view.html'
		}).
		state('competencies.create', {
			url: '/create',
			templateUrl: 'modules/competencies/views/create-competency.client.view.html'
		}).
		state('competencies.view', {
			url: '/:competencyId',
			templateUrl: 'modules/competencies/views/view-competency.client.view.html'
		}).
		state('competencies.edit', {
			url: '/:competencyId/edit',
			templateUrl: 'modules/competencies/views/edit-competency.client.view.html'
		});
	}
]);