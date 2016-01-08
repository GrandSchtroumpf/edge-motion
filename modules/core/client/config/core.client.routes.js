'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider','$mdThemingProvider',
	function($stateProvider, $urlRouterProvider, $mdThemingProvider) {


        /*
            Change angular material theme
         */
        // Extend the red theme with a few different colors : 500 is used for primary theme
        var iceBlueMap = $mdThemingProvider.extendPalette('blue', {
            '500': '11dfb1'
        });
        // Register the new color palette map with the name <code>neonRed</code>
        $mdThemingProvider.definePalette('iceBlue', iceBlueMap);
        // Use that theme for the primary intentions
        $mdThemingProvider.theme('default')
            .primaryPalette('iceBlue');


		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		    state('home', {
                url: '/',
                controller: 'HomeController',
			    templateUrl: 'modules/core/views/home.client.view.html'
		    });
	}
]);
