'use strict';

angular.module('sidemenus').directive('sidebar', ['$compile',
	function( $compile) {
		return {
			template:
            '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="sidebar" x="0px" y="0px" viewBox="0 0 80 700" enable-background="new 0 0 80 700" xml:space="preserve">' +
                '<sidebar-svg-content></sidebar-svg-content>' +
            '</svg>',

            restrict: 'E',
            controller : function($scope, $element){
                /*global Snap*/
                $scope.sidebar = new Snap('#sidebar');

                $scope.menusManagement = {
                    menus : [],             //Data from BDD
                    snapMenus :[],          //Snap element
                    selectedMenu : -1
                    //Function added lin other directives
                    //removeMenu <-- sidebar-content
                    //activateMenu <-- sidebar-head
                    //destroyMenu   <-- sidebar-menu
                };

                $scope.headManagement = {
                    //profile = new Profile <-- In sidebar-head-profile
                    //initCategory          <--sidebar-category-menu
                    //destroyHeadProfile   <-- sidebar-head
                    //destroyCategory   <-- sidebar-category-menu
                    categories : [],
                    snapCategories : []
                };

                $scope.sidebarOpened = {
                    status : false,
                    toggleMenu:[]
                };

                $scope.menuActivated = {
                    status : false,
                    htmlContent : ''
                };

                $scope.colors={
                    darkColor : '#232a34',
                    buttonColor:'#5e6a7a',
                    mainColor:'#11dfb1',
                    secondColor:'#f77269'
                };



            },
			link: function postLink(scope, element, attrs) {

                var wrapper = document.getElementById('wrapper');
                var sidebar = scope.sidebar;


                //Toggle Sidebar
                scope.toggleSidebarOppened = function(){
                    scope.sidebarOpened.status = !scope.sidebarOpened.status;

                    //Toggle the current head
                    //scope.sidebarOpened.toggleHead();

                    //Toggle each menu
                    /*
                    for(var i=0;i<scope.sidebarOpened.toggleMenu.length;i++){
                        scope.sidebarOpened.toggleMenu[i]();
                    }
                    */

                    //Toogle CSS and canvas
                    if(scope.sidebarOpened.status === true){    //Open
                        wrapper.className = ''; //ouvert
                        setTimeout(function(){
                            if(scope.menuActivated.status === false){
                                sidebar.attr({width:200, height : 700, 'viewBox': '0 0 200 700'});
                            }else{
                                sidebar.attr({'viewBox': '0 0 200 80', height : 80, width:200});
                            }
                        },100);
                    }else{
                        setTimeout(function() {                 //Close
                            wrapper.className = 'toggled';
                            sidebar.attr({'viewBox': '0 0 80 700', width:80, height : 700});
                        },500);
                    }
                };

                scope.openHtmlContent = function(htmlContent){
                    scope.menuActivated.htmlContent = htmlContent;
                    var newTemplate = angular.element('<sidebar-html-content></sidebar-html-content>');
                    var newContent = $compile(newTemplate)(scope);
                    element.append(newContent);
                };



			}
		};
	}
]);
