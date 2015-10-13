'use strict';

angular.module('messages').controller('CreateMessagesController', ['$scope', '$state', '$stateParams','Messages','MessagesMethods','users','Authentication','message','answerAll',
	function($scope, $state, $stateParams, Messages,MessagesMethods, users, Authentication, message, answerAll) {
        /*jshint latedef: nofunc */
        var self = this;
        /*
            Check answer
         */
        if(!message){
            $scope.message = MessagesMethods.template();
            $scope.message.userSender = Authentication.user;
        }else{
            $scope.message = new Messages(message);
            if(answerAll === true){
                $scope.message.userRecipient = message.userSender;
                $scope.message.userRecipient.push.apply(self.message.userRecipient, message.userRecipient.filter(function(user){return user !== Authentication;}));
                $scope.message.userCopy = message.userCopy;
            }
            $scope.message.userSender = Authentication.user;
            $scope.message.subject = 'RE : ' + message.subject;
        }


        /*
             userRécipient
         */
        self.users = users;
        self.searchText = null; //fix the content to null at the beginning
        self.filterSelected = true;
        self.querySearch = querySearch;

        function querySearch (query) {
            var results = query;
            if(query){
                results = self.users.filter(function(user){return angular.lowercase(user.displayName).indexOf(angular.lowercase(query)) !== -1;});
            }else{
                results = [];
            }
            return results;
        }


        /*
            TINY MCE
         */
        $scope.tinymceOptions = {
            inline: false,
            plugins : 'advlist autolink link image lists charmap print preview',
            skin: 'charcoal',
            theme : 'modern',
            height : 400
        };


        /*
            Save
         */
        self.create = function(){
            //Transform userRecipient into _id
            var newMessage = new Messages($scope.message);
            newMessage.userRecipient=$scope.message.userRecipient.map(function(user){return user._id;});
            newMessage.userCopy=$scope.message.userCopy.map(function(user){return user._id;});
            newMessage.userSender=Authentication.user._id;

            // Redirect after save
            newMessage.$save(function(response) {
                //Update userRecipient and Authentication.user
                for(var i=0; i<$scope.message.userRecipient.length;i++) {
                    $scope.message.userRecipient[i].messages.incoming.push(response._id);
                }
                //Exception userSender is in userRecipient
                if($scope.message.userRecipient.indexOf($scope.message.userSender) === -1 && $scope.message.userCopy.indexOf($scope.message.userSender) === -1){
                    Authentication.user.messages.sended.push(response._id);
                }
                MessagesMethods.updateUsers($scope.message.userRecipient.concat(Authentication.user));

                $state.go('messages.view', {}, {reload : true});
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

	}
]);
