'use strict';

angular.module('searches').directive('searchResult', ['$rootScope', '$mdDialog', 'Authentication','$http',
	function($rootScope, $mdDialog, Authentication, $http) {
		return {
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
                scope.linkUrl = function(){
                    return 'modules/searches/views/result-case/result-search-'+element[0].getAttribute('category')+'.client.view.html';
                };


                /*global TimelineMax*/
                /*global TweenMax*/
                /*global Power2*/
                var content;
                var TweenHover;

                /* animation In */
                scope.loaded = function(){
                    content = angular.element(element[0]).find('md-content');
                    TweenMax.set('.resultWrapper', {perspective:800});
                    TweenMax.set(content, {transformStyle:'preserve-3d'});
                    TweenMax.from(content, 0.7+0.5*scope.$index, {
                        //opacity:0,
                        y:'+=50',
                        rotationX:-90,
                        transformOrigin:'50% 50% -100',
                        ease:Power2.easeOut
                    });

                    TweenHover = TweenMax.to(content, 0.3, {
                        boxShadow : '0 0 0 2px #5e6a7a,'+
                                    '15px 15px 15px 0 #1e1e1f',
                        paused:true
                    });
                };

                /* animation Out */
                $rootScope.$on('$stateChangeStart', function(){
                    TweenMax.to(content, 0.5+0.2*scope.$index, {
                        opacity:0,
                        y:'-=70',
                        rotationX:+90,
                        transformOrigin:'50% 50% -150',
                        ease:Power2.easeOut
                    });
                });

                scope.contentHoverIn = function(){
                    TweenHover.play();
                };
                scope.contentHoverOut = function(){
                    TweenHover.reverse();
                };

                /*If user*/
                scope.showCard=function(event, category){
                    $mdDialog.show({
                        clickOutsideToClose: true,
                        templateUrl: 'modules/searches/views/result-dialog/result-dialog-'+category+'.client.view.html',
                        parent: angular.element(document.body),
                        targetEvent: event
                    });
                };

                //if not connected or same user or already in contact
                if(!Authentication || Authentication.user._id === scope.result._id || Authentication.user.contacts.map(function(element){return element.user;}).indexOf(scope.result._id) !== -1){
                    scope.invitationButton = false;
                }else{
                    scope.invitationButton = true;
                }

                /*
                    ADD CONTACT
                 */
                scope.inviteContact= function(contactId){
                    $http.post('/api/contacts', {userId : Authentication.user._id, contactId : contactId})
                        .then(function(err, success){
                            if(success){scope.invitationButton = false;}
                        });
                };



                //Literner on scroll to check if a result is above search
                window.addEventListener('scroll', function(){
                    if(element[0].getBoundingClientRect().top < scope.searchEngineDown-60){
                        TweenMax.to(element[0], 0.3, {
                            opacity: 0,
                            rotationX:+90,
                            transformOrigin:'50% 50% -70',
                            ease : Power2.easeOut
                        });
                        element[0].hide = true;
                    }else if(element[0].hide === true){
                        TweenMax.to(element[0], 0.5, {
                            opacity: 1,
                            rotationX:0,
                            transformOrigin:'50% 50% -70',
                            ease : Power2.easeOut
                        });
                    }
                });
			},
            template: '<div data-ng-include="linkUrl()" onload="loaded()" layout="row" layout-align="center"></div>'
		};
	}
]);
