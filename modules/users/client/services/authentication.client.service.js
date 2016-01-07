'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', [
    function($http){
        var _this = this;
        return {
            changeUser : function(){
                this.user = window.user;
            },

            isConnected : function(){
                var promise = $http.get('/api/auth/isConnected').then(function (response) {
                    return response.data;
                });
                return promise;
            },

            getRoles : function(){
                var promise = $http.get('/api/auth/getRoles').then(function (response) {
                    return response.data;
                });
                return promise;
            },

            user : window.user
        };
    }

    /*
	function() {
		var _this = this;

		_this._data = {
			user: window.user
		};

		return _this._data;
	}
	*/
]);
