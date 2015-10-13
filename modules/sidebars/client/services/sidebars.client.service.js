'use strict';

//Sidebars service used to communicate Sidebars REST endpoints
angular.module('sidebars').factory('Sidebars', ['$resource',
	function($resource) {
		return $resource('api/sidebars/:sidebarId', { sidebarId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);