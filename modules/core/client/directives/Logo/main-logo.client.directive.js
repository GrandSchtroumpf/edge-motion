'use strict';

angular.module('core').directive('mainLogo', [
	function() {
		return {
			template: '<svg id="mainLogo" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 150 150" enable-background="new 0 0 150 150" xml:space="preserve"></svg>',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
				/*global Snap*/

                var snap = new Snap('#mainLogo');
                var blur = snap.filter(Snap.filter.blur(0.2,0.2));

                var mainTriangle = snap.polygon('74.6,10 40,70 5.4,10');
                    mainTriangle.attr({
                        'fill':'none',
                        'stroke':'#ffffff',
                        'strokeWidth':1
                    });

                var title = snap.text(40, 25, '3DG3');
                    title.attr({
                        'textAnchor':'middle'
                    });

                var smallTriangle = snap.polygon('44.3,56 40,63.5 35.7,56');
                    smallTriangle.attr({
                        'fill':'#ffffff',
                        filter:blur
                    });

			}
		};
	}
]);
