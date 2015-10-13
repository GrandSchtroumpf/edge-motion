'use strict';

angular.module('users').factory('Profile', ['Users','$http','$q',
	function(Users, $http, $q) {
		// Profile service logic
		// ...

		// Public API
		return {
			get: function(userId, callback){
                var defer = $q.defer();
                $http.get('/api/profile/'+userId)
                    .success(function(user){
                        defer.resolve(user);
                    })
                    .error(function(err){
                        defer.reject();
                    });
                if(callback){callback(defer.promise);}
                else{return defer.promise;}
			}
		};
	}
]);
