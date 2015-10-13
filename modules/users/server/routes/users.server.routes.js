'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport');

module.exports = function(app) {
	// User Routes
	var users = require('../controllers/users.server.controller');
    var profile = require('../controllers/profile.server.controller');

	// Setting up the users profile api
	app.route('/api/users/me').get(users.me);
	app.route('/api/users')
        .put(users.update)
        .get(users.list);
	app.route('/api/users/accounts').delete(users.removeOAuthProvider);
	app.route('/api/users/password').post(users.changePassword);
	app.route('/api/users/picture').post(users.changeProfilePicture);

    //Get profile logic
    app.route('/api/profile')
        .put(profile.updateMulti);
    app.route('/api/profile/:userId').all()
        .get(profile.read);

	// Finish by binding the user middleware
	app.param('userId', users.userByID);
};
