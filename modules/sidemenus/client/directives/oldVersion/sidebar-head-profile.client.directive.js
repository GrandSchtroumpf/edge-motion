'use strict';

angular.module('sidemenus').directive('sidebarHeadProfile', ['Authentication','$compile','$http', '$state','$rootScope',
	function(Authentication, $compile, $http, $state, $rootScope) {
		return {
			restrict: 'AEC',
			link: function postLink(scope, element, attrs) {

                /*global Snap*/
                /*global mina*/
                /*global TweenMax*/
                var sidebar = scope.sidebar;
                //Colors
                var buttonColor=scope.colors.buttonColor, mainColor=scope.colors.mainColor, secondColor=scope.colors.secondColor, darkColor=scope.colors.darkColor;
                var mainGradient = sidebar.gradient('l(1,0,1,0)'+buttonColor+'-'+secondColor);
                var secondGradient = sidebar.gradient('l(0,0,1,1)'+buttonColor+'-'+mainColor);
                var gradientArc = sidebar.gradient('l(0,0,1,0)'+darkColor+'-'+mainColor);

                //Profile circle
                var profileCircle, emptyCircle, profile;
                var profileCircleX=40, profileCircleY=40, profileCircleR=30;


                /*
                 PROFILE CIRCLE
                 */

                //profile image <-load the avatar here
                var Profile = function(x, y, r){
                    this.headOpened = false;

                    /* Circle */
                    this.circle = sidebar.circle(profileCircleX, profileCircleY, profileCircleR);
                        this.circle.attr({'fill':buttonColor, 'stroke':buttonColor});
                    this.emptyCircle = sidebar.circle(profileCircleX, profileCircleY, profileCircleR+5);
                        this.emptyCircle.attr({'fill':'none', 'stroke' : mainColor, 'strokeWidth': 2});
                    this.profile = sidebar.g(this.circle, this.emptyCircle);

                    /* Arc */
                    this.arc = sidebar.path('M36.2,21.5c10.2,9.4,10.2,25.9,0,37');
                        this.arc.attr({'stroke':'none', 'fill':'none'});
                    this.arrows = [
                        sidebar.polygon('33.2,35.7 40.7,40 33.2,44.3').attr({'fill':'none'}),
                        sidebar.polygon('38.3,35.7 45.8,40 38.3,44.3').attr({'fill':'none'})
                    ];
                    this.matrixArc = new Snap.Matrix();
                        this.matrixArc.translate(60,0).scale(3,3,x,y);

                    /* logout */
                    var self=this;
                    addLogoutIcon(function(logoutButton){
                        self.logoutButton = logoutButton;
                    });


                    /* Event handler */
                    this.profile.click(function(){
                        self.animateArc();
                        self.openHeadMenu(self.headOpened, self.emptyCircle, function(){
                            self.headOpened = !self.headOpened;
                        });
                    });

                    element.on('$destroy', function(){
                        scope.headManagement.destroyHeadProfile();
                    });

                    initCategory();
                };




                /*
                    OPEN CATEGORY
                 */
                Profile.prototype.openHeadMenu = function(headOpened,emptyCircle, callback){
                    scope.toggleSidebarOppened();
                    var snapCategories = scope.headManagement.snapCategories;
                    if(headOpened){
                        for(var i=0; i<snapCategories.length; i++){
                            snapCategories[i].hideCategory();
                        }

                    }else{
                        for(var j=0; j<snapCategories.length;j++){
                            snapCategories[j].showCategory();
                        }
                    }
                    callback();
                };
                Profile.prototype.animateArc = function(){
                    if(this.headOpened){    //hide
                        TweenMax.to(this.arc, 0.4, {snap : {transform : this.matrixArc.inverse, stroke:'none'}});
                    }else{                  //show
                        TweenMax.to(this.arc, 0.4, {snap : {transform : this.matrixArc}});
                        this.arc.attr({'stroke':gradientArc});
                    }
                };

                function initCategory(){
                    var newTemplate = angular.element('<sidebar-category-menu></sidebar-category-menu>');
                    var newContent = $compile(newTemplate)(scope);
                    element.parent().append(newContent);

                    scope.headManagement.initCategory(profileCircleX, profileCircleY);
                }


                /*
                    ACTIVATE MENU -> DRAG and DROP
                 */
                Profile.prototype.startDroppable = function(){
                    TweenMax.to(this.circle, 0.1, {snap:{fill:secondColor, stroke:secondColor, strokeWidth:10, strokeOpacity:0.2}});
                };
                Profile.prototype.activateDroppable = function(){
                    TweenMax.to(this.circle, 0.1, {snap:{fill:mainColor, stroke:mainColor, strokeWidth:10, strokeOpacity:0.2}});
                };
                Profile.prototype.cancelDroppable = function(){
                    TweenMax.to(this.circle, 0.2, {snap:{fill:buttonColor, stroke:buttonColor, strokeWidth:1, strokeOpacity:0}});
                };
                Profile.prototype.activateHeadMenu = function(icon){
                    var self=this;
                    scope.getIcon(icon,profileCircleX, profileCircleY)
                        .then(function(thisIcon){
                            self.profile.add(thisIcon);
                        });
                };


                scope.headManagement.profile = new Profile(profileCircleX, profileCircleY, profileCircleR);


                /*
                    LOGOUT BUTTON
                 */
                function addLogoutIcon(callback){
                    var logoutButton = sidebar.g();
                    scope.getIcon([{link:'modules/sidemenus/svg/icons/logout.JSON', x: profileCircleX, y: profileCircleY+100}])
                        .then(function(icons){
                            var thisIcon = icons[0].icon;
                            var logout = thisIcon.selectAll('path,polygon');
                            logout.attr({'fill':buttonColor, 'cursor':'pointer'});
                            logoutButton.add(thisIcon);

                            logoutButton.hover(function(){
                                logout.animate({'fill':secondColor}, 150);
                            }, function(){
                                logout.animate({'fill':buttonColor}, 150);
                            });
                            logoutButton.click(function(){
                                $http.get('/api/auth/signout')
                                    .then(function(response){
                                        window.user = response.data;
                                        $rootScope.$emit('changeUser');
                                        $state.go('home');
                                    });
                            });
                            callback(logoutButton);
                        });
                }



                /*
                    DESTROY AFTER USE
                 */
                scope.headManagement.destroyHeadProfile = function(){
                    scope.headManagement.profile.profile.remove();
                    scope.headManagement.profile.arc.remove();
                    scope.headManagement.profile.logoutButton.remove();
                    for(var i=0; i< scope.headManagement.profile.arrows.length; i++){
                        scope.headManagement.profile.arrows[i].remove();
                    }
                    scope.headManagement.snapCategories = [];
                    scope.headManagement.categories = [];
                };
			}
		};
	}
]);
