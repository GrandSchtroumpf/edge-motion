'use strict';

//Competencies service used to communicate Competencies REST endpoints
angular.module('competencies').factory('Competencies', ['$resource',
	function($resource) {
		return $resource('api/competencies/:competencyId', { competencyId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);