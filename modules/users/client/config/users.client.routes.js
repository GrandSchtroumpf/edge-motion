'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
	function ($stateProvider) {
		// Users state routing
		$stateProvider.
            state('profile',{
                abstract: true,
                url: '/profile/:userId',
                controller : 'ProfileController',
                templateUrl:'modules/users/views/profile/profile-resume/profile-page.client.view.html',
                resolve: {
                    user : function(Profile, $stateParams){return Profile.get($stateParams.userId);}

                    /*,
					contacts : function(Authentication, $http){
                        return $http({method :'GET', url : 'api/contacts', params : {userId : Authentication.user._id}}).then(function(result){
                            return(result.data);
                        });
					}
                    */
                }
            }).
                state('profile.resume', {
                    url:'/resume',
                    template: '<profile-resume></profile-resume>'
                }).
                state('profile.resume-edit', {
                    url:'/resume-edit',
                    template: '<profile-resume-edit></profile-resume-edit>'
                }).
                state('profile.games', {
                    url:'/game',
                    template: '<profile-games></profile-games>'
                }).
				state('profile.contacts', {
					url : '/contacts',
					template : '<profile-contacts></profile-contacts>'
				}).
                state('profile.contacts-edit', {
                    url : '/contacts-edit',
                    template : '<profile-contacts-edit></profile-contacts-edit>'
                }).



			state('settings', {
				abstract: true,
				url: '/settings',
				templateUrl: 'modules/users/views/settings/settings.client.view.html'
			}).
			state('settings.password', {
				url: '/password',
				templateUrl: 'modules/users/views/settings/change-password.client.view.html'
			}).
			state('settings.accounts', {
				url: '/accounts',
				templateUrl: 'modules/users/views/settings/manage-social-accounts.client.view.html'
			}).
			state('settings.picture', {
				url: '/picture',
				templateUrl: 'modules/users/views/settings/change-profile-picture.client.view.html'
			}).


            state('authentication', {
				abstract: true,
				url: '/authentication',
				controller: 'AuthenticationController',
				template: '<ui-view/>'
			}).
			state('authentication.signup', {
				url: '/signup',
				templateUrl: 'modules/users/views/authentication/signup.client.view.html'
			}).
			state('authentication.signin', {
				url: '/signin',
				templateUrl: 'modules/users/views/authentication/signin.client.view.html'
			}).



            state('password', {
				abstract: true,
				url: '/password',
				template: '<ui-view/>'
			}).
			state('password.forgot', {
				url: '/forgot',
				templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
			}).
			state('password.reset', {
				abstract: true,
				url: '/reset',
				template: '<ui-view/>'
			}).
			state('password.reset.invalid', {
				url: '/invalid',
				templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
			}).
			state('password.reset.success', {
				url: '/success',
				templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
			}).
			state('password.reset.form', {
				url: '/:token',
				templateUrl: 'modules/users/views/password/reset-password.client.view.html'
			});
	}
]);
