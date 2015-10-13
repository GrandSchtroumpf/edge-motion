'use strict';

angular.module('sidemenus').directive('sidebarCategoryMenu', ['Authentication',
	function(Authentication) {
		return {
			restrict: 'AE',
			link: function postLink(scope, element, attrs) {
				/*global Snap*/
				/*global mina*/
				/*global TweenMax*/
                /*global Bounce*/

                var sidebar = scope.sidebar;
                var mainColor = scope.colors.mainColor, secondColor=scope.colors.secondColor, darkColor=scope.colors.darkColor;


                /*
                    CATEGORY
                 */
                var CategoryMenu = function(indice, x, y){
                    this.indice = indice;
                    this.circle = sidebar.circle(x,y,8);
                        this.circle.attr({'fill':'none'});

                    this.matrixCircle = new Snap.Matrix();
                        this.matrixCircle.rotate(indice*30,x,y).translate(70,0);

                };

                CategoryMenu.prototype.showCategory = function(){
                    TweenMax.to(this.circle, 600+200*this.indice, {snap:{
                        fill:secondColor,
                        stroke:secondColor,
                        strokeWidth:10,
                        strokeOpacity:0.2
                        }, ease:Bounce.easeOut
                    });

                };
                CategoryMenu.prototype.hideCategory = function(){
                    TweenMax.to(this.circle,600+200*this.indice, {snap: {
                        transform : this.matrixCircle.inverse,
                        stroke:'none'
                        }
                    });
                };

                scope.headManagement.initCategory = function(x, y){
                    var userSidebars = Authentication.user.sidebars;
                    for(var i= 0; i<Object.keys(userSidebars).length;i++){
                        scope.headManagement.snapCategories[i] = new CategoryMenu(i,x,y);
                        scope.headManagement.categories.push(Object.keys(userSidebars)[i]);
                    }
                };


			}
		};
	}
]);
