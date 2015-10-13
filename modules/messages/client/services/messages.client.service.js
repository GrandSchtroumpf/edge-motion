'use strict';

//Messages service used to communicate Messages REST endpoints
angular.module('messages').factory('Messages', ['$resource',
    function($resource) {
        return $resource('api/messages/:messageId', { messageId: '@_id'});
    }
]);


angular.module('messages').factory('MessagesMethods', ['$http', '$q','Messages',
    function($http, $q, Messages) {
        return {
            updateUsers : function(users, callback){
                $http.put('/api/profile', users)
                    .success(function(users){
                        if(callback){callback(users);}
                    })
                    .error(function(err){
                        console.log(err);
                    });
            },
            template : function(model){
                var message = new Messages();
                if(model){
                    message._id = model._id;
                    message.userRecipient = model.userRecipient;
                    message.userSender = model.userSender;
                    message.content = model.content;
                    message.subject = model.subject;
                }else{
                    message.userRecipient = [];
                    message.userCopy = [];
                    message.content = '';
                    message.subject = '';
                }
                return message;
        }
        };
    }
]);
