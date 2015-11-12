'use strict';

angular.module('users').factory('Contacts', ['Authentication','$http','$q',
	function(Authentication, $http, $q) {
		// Contacts service logic
		// ...

		// Public API
		return {
			getContacts: function(userId) {
                //var defer = $q.defer();
                return $http({method :'GET', url : 'api/contacts', params : {userId : userId}});
                /*
                    .success(function(results){
                        console.log(results);
                        defer.resolve(results);
                    })
                    .error(function(err){
                        defer.reject();
                    });

                return defer.promise;
                */
			}
		};
	}
]);
