'use strict';

angular.module('core').directive('selectResult', [
	function() {
		return {
			templateUrl: 'modules/core/views/Directives_templates/Select-directive/select-result_template.client.view.html',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {

			}
		};
	}
]);
