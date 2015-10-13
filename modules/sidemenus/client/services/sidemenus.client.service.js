'use strict';

//Sidemenus service used to communicate Sidemenus REST endpoints
angular.module('sidemenus').factory('Sidemenus', ['$http',
    function($http){
        /*
            Private functions
         */
        //Here the proviates functions

        /*
            Public functions
         */

        return function(model){

            if(model){
                for(var keys in model){
                    this[keys] = model[keys];
                }
                this.selected = false;
            }else{
                this.title = '';
                this.icon = 'modules/sidemenus/svg/default.JSON';
                this.selected = false;
            }


            //CRUD FUNCTIONS
            this.save = function(callback){
                $http.post('api/sidemenus', this)
                    .success(function(newSidemenu){
                        if(callback){callback(newSidemenu);}
                    })
                    .error(function(err) {
                        if (callback) {callback(err);}
                    });
            };
            this.update = function(callback){
                $http.put('api/sidemenus', this)
                    .success(function(newSidemenu){
                        if(callback){callback(newSidemenu);}
                    })
                    .error(function(err) {
                        if (callback) {callback(err);}
                    });
            };
            //GET
            //QUERY
            //DELETE

        };
    }
]);

angular.module('sidemenus').factory('Sidebar', ['$http',
    function($http){
        return {
            getSidebarByUser : function(callback){
                $http.get('api/getSidebarByUser')
                    .success(function(sidebar){
                        if(callback){callback(sidebar);}
                        else{return sidebar;}
                    })
                    .error(function(err){
                        if(callback){callback(err);}
                    });
                },
            addNotification : function(userId, sidemenuId, callback){
                $http.put('api/sidebar/notification', {userId : userId, sidemenuId: sidemenuId})
                    .success(function() {
                        if (callback) {callback();}
                    })
                    .error(function(err){
                        if(callback){callback(err);}
                        else{console.log(err);}
                    });
            }
        };

    }
]);
