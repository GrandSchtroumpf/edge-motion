'use strict';

module.exports = function(app) {
	var sidebars = require('../controllers/sidebars.server.controller');
	var sidebarsPolicy = require('../policies/sidebars.server.policy');

	// Sidebars Routes
	app.route('/api/sidebars').all()
		.get(sidebars.list).all(sidebarsPolicy.isAllowed)
		.post(sidebars.create);

	app.route('/api/sidebars/:sidebarId').all(sidebarsPolicy.isAllowed)
		.get(sidebars.read)
		.put(sidebars.update)
		.delete(sidebars.delete);

	// Finish by binding the Sidebar middleware
	app.param('sidebarId', sidebars.sidebarByID);
};