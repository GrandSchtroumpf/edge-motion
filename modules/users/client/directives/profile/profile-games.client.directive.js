'use strict';

angular.module('users').directive('profileGames', [
	function() {
		return {
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
                /*global TweenMax*/
                /*global TimelineMax*/
                TweenMax.to(element[0],0.5,{
                    opacity:0,
                    y:'-=30'
                });

            }
		};
	}
]);
