'use strict';

angular.module('users').directive('competenceContent', [
	function() {
		return {
			template: '<div></div>',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
				// Competence content directive logic
				// ...

				element.text('this is the competenceContent directive');
			}
		};
	}
]);