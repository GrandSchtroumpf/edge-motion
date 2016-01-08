'use strict';

angular.module('users').directive('profileGames', [
	function() {
		return {
			restrict: 'E',
            templateUrl : 'modules/users/views/profile/profile-game.client.view.html',
			link: function postLink(scope, element, attrs) {
                /*global TweenMax*/
                /*global TimelineMax*/
                TweenMax.from(element[0],0.5,{
                    opacity:0,
                    y:'-=30'
                });

            }
		};
	}
]);
