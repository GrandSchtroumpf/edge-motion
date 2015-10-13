'use strict';

angular.module('users').directive('profileResume', ['$rootScope',
	function($rootScope) {
		return {
            templateUrl:'modules/users/views/profile/profile-resume.client.view.html',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
                /*global TweenMax*/
                /*global TimelineMax*/

                var tm = new TimelineMax();
                tm.from(element[0], 0.3, {opacity:0});
                tm.from('profile-avatar', 0.3, {opacity:0, y:'-=60'});
                tm.staggerFrom('.profile-competencies li', 0.3, {opacity:0, x:'-=60'}, 0.2);
                tm.staggerFrom('.profile-competencies-content li', 0.3, {opacity:0, y:'+=60'}, 0.2);

                var profileCompetencies = document.getElementsByClassName('profile-competencies')[0];

            }
		};
	}
]);
