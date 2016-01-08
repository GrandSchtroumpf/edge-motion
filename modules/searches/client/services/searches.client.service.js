'use strict';

//Searches service used to communicate Searches REST endpoints
angular.module('searches').factory('Search', ['$http','$q',
	function($http, $q) {
		return {

            doSearch: function (search) {
                var defer = $q.defer();
                $http.get('/api/search/doSearch', {params: search})
                    .success(function(results){
                        defer.resolve(results);
                    })
                    .error(function(err){
                        defer.reject();
                    });
                return defer.promise;
            },


            getGuilds : function(search){
                var defer = $q.defer();
                $http.get('/api/search/guilds', {params : search})
                    .success(function(guilds){
                        defer.resolve(guilds);
                    })
                    .error(function(err){
                        defer.reject();
                    });
                return defer.promise;
            },
            getUsers : function(search){
                var defer = $q.defer();
                $http.get('/api/search/users', {params : search})
                    .success(function(users){
                        defer.resolve(users);
                    })
                    .error(function(err){
                        defer.reject();
                    });
                return defer.promise;
            },
            getGames : function(search){
                var defer = $q.defer();
                $http.get('/api/search/game', {params : search})
                    .success(function(games){
                        defer.resolve(games);
                    })
                    .error(function(err){
                        defer.reject();
                    });
                return defer.promise;
            },
            getProjects : function(search){
                var defer = $q.defer();
                $http.get('/api/search/projects', {params : search})
                    .success(function(projects){
                        defer.resolve(projects);
                    })
                    .error(function(err){
                        defer.reject();
                    });
                return defer.promise;
            }
        };
	}
]);
