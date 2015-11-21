'use strict';

// Avatars controller
angular.module('avatars').controller('AvatarsController', ['$scope', '$state', 'Authentication', 'Avatars', 'avatars',
	function($scope, $state, Authentication, Avatars, avatars ) {
		$scope.authentication = Authentication;

		// Create new Avatar
		$scope.create = function() {
			// Create new Avatar object
			var avatar = new Avatars ({
				name: this.name,
                gender : this.gender,
                level : this.level,
                link : 'modules/avatars/img/'+this.gender+'/'+this.level+'/'+this.name+'.jpg',
				use : this.use
			});

			// Redirect after save
			avatar.$save(function(response) {
				$state.go('thisAvatar.view', {avatarId : response._id});

				// Clear form fields
				$scope.name = '';
				$scope.level = 0;
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};



		// Find a list of Avatarsm
        $scope.avatarsFemale = avatars.filter(function(item){return item.gender === 'F';});
		$scope.avatarsMale = avatars.filter(function(item){return item.gender === 'M';});

		// Find existing Avatar
		$scope.findOne = function() {
            console.log($state.params.avatarId);
			$scope.avatar= Avatars.get({
				avatarId: $state.params.avatarId
			});
		};
	}
]);
