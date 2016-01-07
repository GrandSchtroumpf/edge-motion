'use strict';

//Setting up route
angular.module('schools').config(['$stateProvider',
	function($stateProvider) {
		// Schools state routing
		$stateProvider.
		state('schools', {
			abstract: true,
			url: '/schools',
            controller : 'SchoolsController',
			template: '<ui-view/>',
            resolve : {
                schools : function(Schools){return Schools.query();}
            }
		}).
            state('schools.list', {
                url: '',
                templateUrl: 'modules/schools/views/list-schools.client.view.html'
            }).
            state('schools.create', {
                url: '/create',
                templateUrl: 'modules/schools/views/create-school.client.view.html'
            }).
        state('thisSchool', {
                abstract: true,
                url: '/school/:schoolId',
                controller : 'ThisSchoolController',
                templateUrl: 'modules/schools/views/this-school.client.view.html',
                resolve : {
                    school : function(Schools, $stateParams){return Schools.get({schoolId : $stateParams.schoolId});}
                }
            }).
            state('thisSchool.view', {
                url: '/view',
                templateUrl: 'modules/schools/views/view-school.client.view.html'
            }).
            state('thisSchool.edit', {
                url: '/edit',
                templateUrl: 'modules/schools/views/edit-school.client.view.html',
                resolve: {
                    checkAuthorisation : function(SchoolService, $stateParams){return SchoolService.checkAuthorisation($stateParams.schoolId);}
                }
            });
	}
]);
