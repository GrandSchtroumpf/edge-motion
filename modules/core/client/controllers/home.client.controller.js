'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication', '$mdDialog',
	function($scope, Authentication, $mdDialog, users) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

        $scope.showSign = function(event, sign){
            $mdDialog.show({
                clickOutsideToClose: true,
                templateUrl: 'modules/users/views/authentication/'+sign+'.client.view.html',
                parent: angular.element(document.body),
                targetEvent: event
            });
        };

        $scope.bob = ['Jean', 'Bob'];


	}
]);
