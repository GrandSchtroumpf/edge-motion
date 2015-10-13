'use strict';

module.exports = function(app) {
	var sidemenus = require('../controllers/sidemenus.server.controller');
	var sidemenusPolicy = require('../policies/sidemenus.server.policy');

	// Sidemenus Routes
	app.route('/api/sidemenus').all()
		.get(sidemenus.list).all(sidemenusPolicy.isAllowed)
		.post(sidemenus.create);

	app.route('/api/sidemenus/:sidemenuId').all(sidemenusPolicy.isAllowed)
		.get(sidemenus.read)
		.put(sidemenus.update)
		.delete(sidemenus.delete);

    app.route('/api/sidebar/notification')
        .put(sidemenus.addNotification);

    app.route('/api/getSidebarByUser')
        .get(sidemenus.getByUser);

	// Finish by binding the Sidemenu middleware
	app.param('sidemenuId', sidemenus.sidemenuByID);
};
