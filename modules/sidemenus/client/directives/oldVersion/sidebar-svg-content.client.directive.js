'use strict';

angular.module('sidemenus').directive('sidebarSvgContent', ['$http','$q','$timeout', '$state', '$compile', '$rootScope','Sidemenus', 'Sidebar', 'Authentication',
    function($http, $q,$timeout,$state, $compile,$rootScope, Sidemenus,Sidebar, Authentication) {
		return {
			restrict: 'AEC',
			link: function postLink(scope, element, attrs) {
                /*global Snap*/
                /*jshint latedef: nofunc */

                initSidebar();
                $rootScope.$on('changeUser', function(event){
                    cleanSidebar(function(){
                        Authentication.changeUser();
                        initSidebar();
                    });
                });

                /*
                 MENU MANAGEMENT
                 */
                function initSidebar(){
                    Sidebar.getSidebarByUser(function(sidebars){
                        //Authentication.user = window.user;
                        if(Authentication.user){
                            initSidebarHead('profile');
                            linkMenus(sidebars.profile);
                        } else{
                            initSidebarHead('connexion');
                            linkMenus(sidebars);
                        }
                    });
                }




                //Organise menus and link to data then init menus
                function linkMenus(sidebar){
                    var sidebarOrdered = sidebar.sort(function(a, b){return a.position - b.position;});
                    for(var i=0; i<sidebarOrdered.length;i++){
                        scope.menusManagement.menus[i] = new Sidemenus(sidebarOrdered[i]);
                    }
                    initSidebarMenus(sidebarOrdered);
                }


                //Init the directive for head
                function initSidebarHead(name){
                    var newTemplate = angular.element('<sidebar-head-'+name+'></sidebar-head>');
                    var newContent = $compile(newTemplate)(scope);
                    element.append(newContent);
                }

                //Init all menus
                function initSidebarMenus(sidebar){
                    var newTemplate = angular.element('<sidebar-new-menu sidebar="'+sidebar+'"></sidebar-new-menu>');
                    var newLinkFn = $compile(newTemplate);
                    var newContent = newLinkFn(scope);
                    element.append(newContent);
                }


                /*
                    Activate a menu
                 */
                scope.menusManagement.removeMenu = function(indice){
                    var menus = scope.menusManagement.menus;
                    //Check if menu.activation is true
                    if(menus[indice].activation === true){
                        //destroy all menus
                        for(var i=0; i<menus.length; i++){
                            scope.menusManagement.destroyMenu(i);
                        }
                        //remove all references
                        scope.menusManagement.snapMenus = [];
                        scope.menusManagement.menus = [];
                    }
                };

                /*
                    CLEAN UP EVERYTHING
                 */
                function cleanSidebar(callback){
                    //$timeout is a needed to avoid problem with the digest cycle
                    $timeout(function(){
                        scope.$destroy();
                        angular.element(element[0]).empty();
                        scope.menusManagement.menus = [];
                        scope.menusManagement.snapMenu = [];
                        callback();
                    },0);

                }


                /*
                    Get icon
                 */
                scope.getIcon = function(iconArray){
                    var promises = iconArray.map(function(thisIcon){
                        var defer = $q.defer();
                        $http.get(thisIcon.link)
                            .success(function(icon){
                                var snapPath = [], snapPolygon = [], snapIcon=scope.sidebar.group();

                                if(icon.path){
                                    for(var i=0; i<icon.path.length; i++){
                                        snapPath[i] = scope.sidebar.path(icon.path[i]);
                                        snapIcon.add(snapPath[i]);
                                    }
                                }
                                if(icon.polygon){
                                    for(var j=0; j<icon.polygon.length; j++){
                                        snapPolygon[j] = scope.sidebar.polygon(icon.polygon[j]);
                                        snapIcon.add(snapPolygon[j]);
                                    }
                                }

                                var width = snapIcon.getBBox().width;
                                var matrix = new Snap.Matrix();
                                matrix.translate(thisIcon.x-20,thisIcon.y-20).scale((40/width),(40/width), 0,0);
                                snapIcon.transform(matrix);
                                defer.resolve({icon:snapIcon, scaleLevel:40/width});

                            })
                            .error(function(err){
                                console.log(err);
                            });
                        return defer.promise;
                    });

                    return $q.all(promises);

                };

			}
		};
	}
]);
