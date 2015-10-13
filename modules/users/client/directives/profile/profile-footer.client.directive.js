'use strict';

angular.module('users').directive('profileFooter', ['$rootScope','$state',
	function($rootScope, $state) {
		return {
            templateUrl:'modules/users/views/profile/profile-footer.client.view.html',
            restrict: 'E',
			link: function postLink(scope, element, attrs) {

                /*global TimelineMax*/

                var tm = new TimelineMax();
                tm.from(element[0], 0.5, {
                    y:'+=100'
                });
			}
		};
	}
]);
