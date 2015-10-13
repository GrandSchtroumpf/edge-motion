'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', [
    function(){
        var _this = this;
        return {
            changeUser : function(){
                this.user = window.user;
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
