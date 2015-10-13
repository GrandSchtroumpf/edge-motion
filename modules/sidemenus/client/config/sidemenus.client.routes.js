'use strict';

//Setting up route
angular.module('sidemenus').config(['$stateProvider',
	function($stateProvider) {
		// Sidemenus state routing
		$stateProvider.
            state('sidemenus', {
                abstract: true,
                url: '/sidemenus',
                template: '<ui-view/>'
            }).
            state('sidemenus.list', {
                url: '',
                templateUrl: 'modules/sidemenus/views/list-sidemenus.client.view.html'
            }).
            state('sidemenus.create', {
                url: '/create',
                templateUrl: 'modules/sidemenus/views/create-sidemenu.client.view.html'
            }).
            state('sidemenus.edit', {
                url: '/:sidemenuId/edit',
                templateUrl: 'modules/sidemenus/views/edit-sidemenu.client.view.html'
            }).

            state('sidebar', {
                url: '/:sidemenuId',
                templateUrl: 'modules/sidemenus/views/view-sidemenu.client.view.html'
            });
	}
]);
