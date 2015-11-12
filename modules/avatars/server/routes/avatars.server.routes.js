'use strict';

module.exports = function(app) {
	var avatars = require('../controllers/avatars.server.controller');
	var avatarsPolicy = require('../policies/avatars.server.policy');

	// Avatars Routes
	app.route('/api/avatars').all()
		.get(avatars.getAvatarBy).all(avatarsPolicy.isAllowed)
		.post(avatars.createAvatar);

	app.route('/api/avatars/:avatarId').all(avatarsPolicy.isAllowed)
		.get(avatars.getAvatar)
		.put(avatars.updateAvatar)
		.delete(avatars.deleteAvatar);

	// Finish by binding the Avatar middleware
	app.param('avatarId', avatars.avatarByID);
};
