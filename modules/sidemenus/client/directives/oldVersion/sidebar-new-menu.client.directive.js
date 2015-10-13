'use strict';

angular.module('sidemenus').directive('sidebarNewMenu', ['$rootScope','$state', 'Authentication', '$q',
	function($rootScope, $state, Authentication, $q) {
		return {
			restrict: 'AEC',
			link: function postLink(scope, element, attrs) {

                /*
                    Variables
                 */
                /*global Snap*/
                /*global mina*/
                /*global TweenMax*/
                /*global TimelineMax*/
                /*global Draggable*/
                /*global Power2*/
                /*global Back*/

                var menu = scope.sidebar;
                var menuIndice= parseInt(element[0].getAttribute('indice'));
                var menuY=200+menuIndice*80;

                //Theme color
                var buttonColor=scope.colors.buttonColor, mainColor=scope.colors.mainColor, secondColor=scope.colors.secondColor, darkColor=scope.colors.darkColor;
                var blur = menu.filter(Snap.filter.blur(10,5));

                /*
                 Main circle
                 */
                var Menu = function(indice, activation){
                    this.X = 40;
                    this.Y = 200+80*indice;
                    this.R = 30;
                    this.indice = indice;
                    this.activation = activation;

                    var iconLinks, icons;

                    /*Circle*/
                    this.mainCircle = menu.circle(this.X,this.Y,this.R);
                        this.mainCircle.attr({'fill':buttonColor});
                    this.emptyCircle = menu.circle(this.X,this.Y,this.R+5);
                        this.emptyCircle.attr({'fill':'none', 'stroke':buttonColor});
                    this.menuCircle = menu.g(this.mainCircle,this.emptyCircle);

                    /*Text Hover*/
                    this.textHover = menu.text(0, this.Y-30, scope.menusManagement.menus[indice].title);
                        this.textHover.attr({'fill':mainColor, 'fontSize':15, 'font-anchor':'middle'});
                    this.rectHover = menu.rect(0, this.Y-42,this.textHover.getBBox().width+2, this.textHover.getBBox().height+2);
                        this.rectHover.attr({'fill': darkColor, filter : blur});
                    this.titleHover = menu.g(this.rectHover, this.textHover);
                        this.titleHover.attr({'opacity':0});

                    /*Add Icons*/
                    var self = this;
                    if(this.activation && Authentication.user){
                        iconLinks = [
                            {link : scope.menusManagement.menus[indice].icon, x:this.X, y:this.Y},
                            {link : 'modules/sidemenus/svg/icons/double_arrow.JSON', x:this.X, y:this.Y}
                        ];
                        scope.getIcon(iconLinks)
                            .then(function(icons){
                                self.icons = [];
                                for(var i=0; i<icons.length; i++){
                                    self.icons[i]= {
                                        icon : icons[i].icon,
                                        scaleLevel : icons[i].scaleLevel
                                    };
                                    self.menuCircle.add(self.icons[i].icon);
                                }

                                self.icons[1].icon.attr({'opacity':0, 'fill':secondColor,'transform-origin':'center bottom'});
                                self.menuCircle.drag(
                                    self.moveMenu,
                                    self.startDrag,
                                    self.endDrag
                                );
                            });
                    //If no activaiton
                    }else{
                        iconLinks = [
                            {link : scope.menusManagement.menus[indice].icon, x:this.X, y:this.Y}
                        ];
                        scope.getIcon(iconLinks)
                            .then(function(icons){
                                self.menuCircle.add(icons[0].icon);
                                self.icons = [{
                                    icon : icons[0].icon,
                                    scaleLevel : icons[0].scaleLevel
                                }];
                            });
                    }

                    /*  Notifications  */
                    if(Authentication.user){
                        var notificationCircle, notificationCount;
                        var notificationIndex = Authentication.user.notifications.map(function(not){return not.sidemenu;}).indexOf(scope.menusManagement.menus[this.indice]._id);
                        if(notificationIndex !== -1){
                            notificationCircle = menu.circle(this.X+this.R-5, this.Y+this.R-5, 6);
                            notificationCircle.attr({'fill':secondColor});
                            notificationCount = menu.text(this.X+this.R-8, this.Y+this.R-2, Authentication.user.notifications[notificationIndex].count);
                            notificationCount.attr({'fill': 'white', 'font-size':10});
                            this.notification = menu.g(notificationCircle, notificationCount);
                            this.menuCircle.add(this.notification);
                        }
                    }

                    /*  Animation entry  */
                    var TweenEnter = TweenMax.from(this.menuCircle, 0.5+0.1*this.indice, {snap:{
                        scale:0,
                        opacity:0
                    }, ease:Back.easeOut.config(1.5)});

                    /*Event Handler*/
                    this.menuCircle.hover(function(event){
                            self.showTextHover();
                            self.menuOver();
                        },
                        function(){
                            self.hideTextHover();
                            self.menuOut();
                        });
                    this.menuCircle.click(function() {
                        self.menuClick();
                    });


                    element.on('$destroy', function(){
                        scope.menusManagement.destroyMenu(self.indice);
                    });
                };

                /*
                    MENU HOVER
                 */
                Menu.prototype.menuOver = function(){
                    this.menuCircle.attr({'style':'cursor:pointer;'});
                    TweenMax.to(this.mainCircle, 0.2, {snap:{stoke:buttonColor, strokeOpacity:0.2, strokeWidth:10}});
                    if(scope.menusManagement.selectedMenu !== this.indice){
                        TweenMax.to(this.emptyCircle, 0.2, {snap:{'stroke':secondColor}});
                        TweenMax.to(this.icons[0].icon, 0.2, {snap:{'fill':secondColor}});
                    }
                    if(this.activation){
                        TweenMax.to(this.icons[0].icon, 0.2, {snap:{scale: this.icons[0].scaleLevel/2}});
                        TweenMax.to(this.icons[1].icon, 0.2, {snap:{opacity:1, scale:this.icons[1].scaleLevel/2}});
                    }
                };

                Menu.prototype.menuOut = function(){
                    TweenMax.to(this.mainCircle, 0.2, {snap:{stoke:'none', strokeOpacity:1, strokeWidth:1}});
                    if(scope.menusManagement.selectedMenu !== this.indice){
                        TweenMax.to(this.emptyCircle, 0.2, {snap:{'stroke':buttonColor}});
                        TweenMax.to(this.icons[0].icon, 0.2, {snap:{'fill':'black'}});
                    }
                    if(this.activation){
                        TweenMax.to(this.icons[0].icon, 0.2, {snap: {scale:this.icons[0].scaleLevel}});
                        TweenMax.to(this.icons[1].icon, 0.2, {snap:{opacity:0, scale:this.icons[1].scaleLevel}});
                    }
                };

                /*
                    MENU SELECTION
                 */
                Menu.prototype.menuClick = function(){
                    if(scope.menusManagement.selectedMenu !== this.indice) {
                        TweenMax.to(this.emptyCircle, 0.2, {snap:{stroke:mainColor}});
                        this.selectMenu();
                        TweenMax.to(this.icons[0].icon, 0.2, {snap:{fill:mainColor}});
                        this.goTo(scope.menusManagement.menus[this.indice].link);
                    }
                };

                Menu.prototype.selectMenu = function(){
                    if(scope.menusManagement.selectedMenu !== -1){
                        scope.menusManagement.unselectMenu(scope.menusManagement.selectedMenu);
                    }
                    scope.menusManagement.selectedMenu = this.indice;
                };


                scope.menusManagement.unselectMenu = function(indice){
                    var otherMenu = scope.menusManagement.snapMenus[indice];
                    TweenMax.to(otherMenu.emptyCircle, 0.2, {snap:{stroke:buttonColor}});
                    TweenMax.to(otherMenu.icons[0].icon, 0.2, {snap:{fill:'#000000'}});
                };

               Menu.prototype.goTo = function(link){
                    if(scope.menusManagement.menus[this.indice].params === 'user'){
                        $state.go(link, {userId : Authentication.user._id});
                    }else if (scope.menusManagement.menus[this.indice].params === 'project'){
                        console.log('project');
                    }else {
                        $state.go(link);
                    }
               };

                /*
                 TEXT HOVER
                 */
                Menu.prototype.showTextHover = function(){
                    TweenMax.to(this.titleHover, 0.2, {snap:{
                        cx : 10,
                        opacity :1,
                        tx: 40-this.titleHover.getBBox().width/2,
                        ty:80-this.titleHover.getBBox().height
                    }});
                };

                Menu.prototype.hideTextHover = function(){
                    TweenMax.to(this.titleHover, 0.2, {snap:{opacity:0}});
                };

                /*
                    DRAG AND DROP
                 */
                Menu.prototype.moveMenu = function(dx, dy, posx, posy){
                    this.attr({'cursor':'move',transform: this.data('origTransform') + (this.data('origTransform') ? 'T' : 't') + [0, dy]});
                    if(this.getBBox().cy < 100) {
                        scope.headManagement.profile.activateDroppable();
                    }else{
                        scope.headManagement.profile.startDroppable();
                    }
                };
                Menu.prototype.startDrag = function(){
                    this.data('origTransform', this.transform().local);
                };
                Menu.prototype.endDrag = function(){
                    //Not drag on head menu
                    if(this.getBBox().cy > 100){
                        //TweenMax.to(this, 50, {snap:{transform:this.data('origTransform')}});
                        this.animate({transform : this.data('origTransform')}, 10);
                        scope.headManagement.profile.cancelDroppable();
                    //Activate menu
                    }else{

                        //IMPORTANT : il faut changer l'indice parce que this est menuCircle
                        scope.menuActivated.status = true;
                        scope.headManagement.profile.activateHeadMenu(scope.menusManagement.menus[this.indice].icon);
                        scope.headManagement.profile.cancelDroppable();
                        scope.toggleSidebarOppened();
                        scope.openHtmlContent(scope.menusManagement.menus[this.indice].htmlContent);
                        scope.menusManagement.removeMenu(this.indice);
                    }
                };




                /*
                    DESTROY
                 */
                scope.menusManagement.destroyMenu = function(indice){
                    scope.menusManagement.snapMenus[indice].menuCircle.unclick();
                    scope.menusManagement.snapMenus[indice].menuCircle.undrag();
                    scope.menusManagement.snapMenus[indice].menuCircle.unhover();
                    scope.menusManagement.snapMenus[indice].menuCircle.remove();
                    scope.menusManagement.snapMenus[indice].titleHover.remove();
                };



                /*
                 INIT FONCTIONS
                 */

                for(var i=0; i<scope.menusManagement.menus.length ;i++){
                    scope.menusManagement.snapMenus[i]= new Menu(i, scope.menusManagement.menus[i].activation);
                }
                /*
                initMainCircle();
                setTimeout(function(){
                    initTextHover();
                },200);
                */
			}
		};
	}
]);
