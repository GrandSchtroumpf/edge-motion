'use strict';

// Messages controller
angular.module('messages').controller('MessagesController', ['$scope', '$state', '$stateParams', '$location', 'Authentication', 'Messages', 'messages',
	function($scope, $state, $stateParams, $location, Authentication, Messages, messages ) {
        /*jshint latedef: nofunc */
        var self = this;

        self.authentication = Authentication;
        self.messages = messages.filter(function(message){
            return message.userRecipient.map(function(user){return user._id;}).indexOf(Authentication.user._id) !== -1;
        });

        /*
            VIEW
         */
        self.filterSelected = true;
        $scope.showMessage = function(message){
            $scope.thisMessage = new Messages(message);
        };


        /*
            Answer
         */
        self.answerMessage = null;
        self.answer = function(answerAll){
            if($scope.thisMessage._id){
                $state.go('messages.create', {answerAll : answerAll, messageId: $scope.thisMessage._id});
            }
        };


		// Create new Message
        self.create = function(messageForm) {
			// Create new Message object
			var message = new Messages (messageForm);

			// Redirect after save
			message.$save(function(response) {
				$location.path('messages/' + response._id);

				// Clear form fields
                self.name = '';
			}, function(errorResponse) {
                self.error = errorResponse.data.message;
			});
		};

		// Remove existing Message
        self.remove = function( message ) {
			if ( message ) { message.$remove();

				for (var i in self.messages ) {
					if (self.messages [i] === message ) {
                        self.messages.splice(i, 1);
					}
				}
			} else {
                self.message.$remove(function() {
					$location.path('messages');
				});
			}
		};

		// Update existing Message
        self.update = function() {
			var message = self.message ;

			message.$update(function() {
				$location.path('messages/' + message._id);
			}, function(errorResponse) {
                self.error = errorResponse.data.message;
			});
		};

		// Find a list of Messages
        self.find = function() {
            self.messages = Messages.query();
		};

		// Find existing Message
        self.findOne = function() {
			self.message = Messages.get({
				messageId: $stateParams.messageId
			});
		};
	}
]);
