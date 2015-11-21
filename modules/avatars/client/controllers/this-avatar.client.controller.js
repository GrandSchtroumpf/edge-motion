'use strict';

angular.module('avatars').controller('ThisAvatarController', ['$scope','$state','avatar',
	function($scope,$state, avatar) {
		$scope.avatar = avatar;
        console.log(avatar);

		// Remove existing Avatar
		$scope.remove = function( avatar ) {
			if ( avatar ) { avatar.$remove();

				for (var i in $scope.avatars ) {
					if ($scope.avatars [i] === avatar ) {
						$scope.avatars.splice(i, 1);
					}
				}
			} else {
				$scope.avatar.$remove(function() {
					$state.go('avatars.list');
				});
			}
		};

		// Update existing Avatar
		$scope.update = function() {
			var avatar = $scope.avatar ;

			avatar.$update(function() {
				$state.go('thisAvatar.view', {avatarId : avatar._id});
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
	}
]);
