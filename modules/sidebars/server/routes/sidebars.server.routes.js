'use strict';

module.exports = function(app) {
	var sidebars = require('../controllers/sidebars.server.controller');
	var sidebarsPolicy = require('../policies/sidebars.server.policy');

	// Sidebars Routes
	app.route('/api/sidebars').all()
		.post(sidebars.createSidebar);

	app.route('/api/sidebars/:sidebarId').all(sidebarsPolicy.isAllowed)
		.get(sidebars.getSidebar)
		.put(sidebars.updateSidebar)
		.delete(sidebars.deleteSidebar);

	// Finish by binding the Sidebar middleware
	app.param('sidebarId', sidebars.sidebarByID);
};
