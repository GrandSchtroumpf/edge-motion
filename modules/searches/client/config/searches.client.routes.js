'use strict';

//Setting up route
angular.module('searches').config(['$stateProvider',
	function($stateProvider) {
		// Searches state routing
		$stateProvider.
		    state('search', {
			    url: '/search',
			    template:  '<search-engine></search-engine><ui-view></ui-view>'
            })
                .state('search.result', {
                    url:'/',
                    template:'<search-page-result></search-page-result>',
                    params : {search : null},
                    resolve : {
                        searchResults: ['$stateParams', 'Search', function($stateParams, Search) {
                            if($stateParams.search){
                                return Search.doSearch($stateParams.search).then(function(response){
                                    console.log(response);
                                    return response;
                                });
                            } else{
                                return [];
                            }

                        }]
                    },
                    controller : function($scope, searchResults){
                        $scope.searchResults = searchResults;
                    }
                });

	}
]);
