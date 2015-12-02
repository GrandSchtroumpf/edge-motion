'use strict';

angular.module('core').directive('selectContainer', [
	function() {
		return {
			templateUrl: 'modules/core//views/Directives_templates/Select-directive/select-container_template.client.view.html',
			restrict: 'E',
			transclude : true,
			link: function postLink(scope, element, attrs, ctrl, transclude) {
				scope.onFocus = false;

                scope.results = [];
				scope.datas = [
                    {name : 'bob'},
                    {name : 'Jean'},
                    {name : 'Yo'}
                ];

                //Add the event focus to the main div for it to accept the blur
				scope.addFocus = function(){
                    element[0].children[0].focus();
                    scope.onFocus = true;
                };


                transclude(scope, function(clone, scope) {
                    element.append(clone);
                });
			}
		};
	}
]);
