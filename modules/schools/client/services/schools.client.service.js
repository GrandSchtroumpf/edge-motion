'use strict';

//Schools service used to communicate Schools REST endpoints
angular.module('schools').factory('Schools', ['$resource',
	function($resource) {
		return $resource('api/schools/:schoolId', { schoolId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);

angular.module('schools').factory('SchoolService', ['$http','$state',
	function($http, $state){
		return {
			checkAuthorisation : function(schoolId){
                var promise = $http.get('/api/schools/'+schoolId+'/pageAuthorisation').then(function (response) {
                    return response.data;
                });
                if(promise){
                    return true;
                }else {
                    $state.go('/schools');
                }
			}
		};
}]);
