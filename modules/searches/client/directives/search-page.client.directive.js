'use strict';

angular.module('searches').directive('searchPage', ['$compile','$templateRequest','Search',
	function($compile, $templateRequest, Search) {
		return {
			template: '<search-engine layout="column" layout-align="start center"></search-engine>'+
                        '<ui-view></ui-view>',
			restrict: 'E',
            controller : function($scope, $element){
                /*jshint latedef: nofunc*/
                $scope.search = function(name, callback){
                    if(name === 'guild'){
                        Search.getGuilds().then(function(guilds){
                            var guild = {
                                name : 'guild',
                                results : guilds
                            };
                            callback(guild);
                        });

                    }else if(name === 'user'){
                        Search.getUsers().then(function(users){
                            var user = {
                                name : 'user',
                                results : users
                            };
                            callback(user);
                        });

                    }else if(name === 'game'){
                        Search.getGames().then(function(games){
                            var game = {
                                name : 'game',
                                results : games
                            };
                            callback(game);
                        });

                    }else if(name === 'project'){
                        Search.getProjects().then(function(projects){
                             var project = {
                                name : 'project',
                                results : projects
                            };
                            callback(project);
                        });
                    }
                };

                $scope.categorySelected = [];

                $scope.reloadResult = function(){
                    $templateRequest('modules/searches/views/view-result.client.view.html')
                        .then(function(html){
                            angular.element($element[0].children[1].innerHTML).replaceWith($compile(html)($scope));
                            $scope.animateResult();
                        });
                };
            },
			link: function postLink(scope, element, attrs) {

			}
		};
	}
]);
