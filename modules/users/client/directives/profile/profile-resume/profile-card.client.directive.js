'use strict';

angular.module('users').directive('profileCard', ['$rootScope',
	function($rootScope) {
		return {
            templateUrl:'modules/users/views/profile/profile-resume/profile-card.client.view.html',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
				/*global TweenMax*/
				/*global TimelineMax*/

                var tm = new TimelineMax();
                tm.from(element[0], 0.5, {y:'-=100'});
                tm.from('.name', 0.5, {opacity:0, x:'-=20px'});
                tm.from('tab-list', 0.3, {opacity:0});
                tm.staggerFrom('[tab-button]', 0.2, {opacity:0, y:'-=20'}, 0.2);
                tm.from('.underline', 0.2, {opacity:0});


                var currentActivation = 0;

                scope.activation = function(index){
                    var tabs = document.getElementsByClassName('tab-profile');
                    var underline = document.getElementsByClassName('underline');
                    tabs[currentActivation].className = 'tab-profile';
                    tabs[index].className = 'tab-profile active';

                    TweenMax.to(underline, 0.2, {x:'+='+(index-currentActivation)*100});
                    currentActivation = index;
                };

			}
		};
	}
]);
