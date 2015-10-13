'use strict';

angular.module('chat').directive('chatContent', ['Socket',
	function(Socket) {
		return {
			restrict: 'E',
            controller: function($scope, $element){
                // Create a messages array
                $scope.messages = [];
                console.log(Socket);

                // Add an event listener to the 'chatMessage' event
                Socket.on('chatMessage', function(message) {
                    $scope.messages.unshift(message);
                });

                // Create a controller method for sending messages
                $scope.sendMessage = function() {
                    // Create a new message object
                    var message = {
                        text: this.messageText
                    };

                    // Emit a 'chatMessage' message event
                    Socket.emit('chatMessage', message);

                    // Clear the message text
                    this.messageText = '';
                };

                // Remove the event listener when the controller instance is destroyed
                $scope.$on('$destroy', function() {
                    Socket.removeListener('chatMessage');
                });
            },
			link: function postLink(scope, element, attrs) {

			}
		};
	}
]);
