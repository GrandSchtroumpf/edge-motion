'use strict';

//Players service used to communicate Players REST endpoints
angular.module('players').factory('Players', ['$resource',
	function($resource) {
		return $resource('api/players/:playerId', { playerId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);