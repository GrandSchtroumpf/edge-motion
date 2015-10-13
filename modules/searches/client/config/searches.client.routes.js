'use strict';

//Setting up route
angular.module('searches').config(['$stateProvider',
	function($stateProvider) {
		// Searches state routing
		$stateProvider.
		    state('search', {
			    url: '/search',
			    template:   '<search-engine layout="column" layout-align="start center"></search-engine>'+
                            '<ui-view></ui-view>',
                controller : function($scope){
                    $scope.categorySelected = [];
                }
            })
                .state('search.result', {
                    url:'/:category/:position/:search',
                    template:'<search-page-result></search-page-result>',
                    resolve : {
                        newCategorySelected: ['$stateParams', 'Search', function($stateParams, Search) {
                            return Search.getUsers().then(function(users){
                                return {
                                    name: $stateParams.category,
                                    position: $stateParams.position,
                                    results: users
                                };
                            });
                        }]
                    },
                    controller : function($scope, newCategorySelected){
                        var categorySup = $scope.categorySelected.filter(function(cat){return cat.position>newCategorySelected.position;});
                        if(categorySup.length > 0){
                            var positions = categorySup.map(function(cat){return cat.position;});
                            var minPosition = Math.min.apply(null, positions);
                            var indice = $scope.categorySelected.map(function(cat){return parseInt(cat.position);}).indexOf(minPosition);
                            $scope.categorySelected.splice(indice, 0, newCategorySelected);
                        }else{
                            $scope.categorySelected.push(newCategorySelected);
                        }
                    }
                });

	}
]);
