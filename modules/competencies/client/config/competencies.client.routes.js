'use strict';

//Setting up route
angular.module('competencies').config(['$stateProvider',
	function($stateProvider) {
		// Competencies state routing
		$stateProvider.
			state('competencies', {
				abstract: true,
				url: '/competencies',
				template: '<ui-view/>',
                controller : 'CompetenciesController',
                resolve : {
                    competencies : function(Competencies){return Competencies.query();}
                }
			}).
			state('competencies.list', {
				url: '',
				templateUrl: 'modules/competencies/views/list-competencies.client.view.html'
			}).
			state('competencies.create', {
				url: '/create',
				templateUrl: 'modules/competencies/views/create-competency.client.view.html'
			}).

			state('thisCompetency', {
				abstract: true,
				url: '/competency/:competencyId',
				templateUrl: 'modules/competencies/views/this-competency.client.view.html',
                controller : 'ThisCompetencyController',
                resolve : {
                    competency : function(Competencies, $stateParams){return Competencies.get({competencyId : $stateParams.competencyId});}
                }
			}).
			state('thisCompetency.view', {
				url: '/view',
				templateUrl: 'modules/competencies/views/view-competency.client.view.html'

			}).
			state('thisCompetency.edit', {
				url: '/edit',
				templateUrl: 'modules/competencies/views/edit-competency.client.view.html'
			});
	}
]);
