'use strict';

angular.module('sidebars').directive('sidebarButton', [
	function() {
		return {
            scope : {icon : '=', showSidebarName : '=', toggler : '='},
			restrict: 'E',
			link: function postLink(scope, element, attrs) {

                scope.getIcon = function(){
                    return 'modules/sidebars/icons/'+scope.icon+'.html';
                };

				element.bind('click', function(){
                    //Toggle
                    if(scope.toggler){
                        var className = document.getElementById('wrapper').className;
                        if(className === 'toggled'){
                            document.getElementById('wrapper').className = '';
                        } else{
                            document.getElementById('wrapper').className = 'toggled';
                        }
                    }


                    //activate CSS class
                    var buttons = document.getElementsByTagName('sidebar-button');
                    for(var i=0; i<buttons.length; i++){
                        buttons[i].className = '';
                    }
                    element.addClass('active');

                });
			},
            template : '<div class="icon" data-ng-include="getIcon()"><p>Titre</p>'

		};
	}
]);
