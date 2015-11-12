'use strict';

//Setting up route
angular.module('schools').config(['$stateProvider',
	function($stateProvider) {
		// Schools state routing
		$stateProvider.
		state('schools', {
			abstract: true,
			url: '/schools',
			template: '<ui-view/>'
		}).
		state('schools.list', {
			url: '',
			templateUrl: 'modules/schools/views/list-schools.client.view.html'
		}).
		state('schools.create', {
			url: '/create',
			templateUrl: 'modules/schools/views/create-school.client.view.html'
		}).
		state('schools.view', {
			url: '/:schoolId',
			templateUrl: 'modules/schools/views/view-school.client.view.html'
		}).
		state('schools.edit', {
			url: '/:schoolId/edit',
			templateUrl: 'modules/schools/views/edit-school.client.view.html'
		});
	}
]);