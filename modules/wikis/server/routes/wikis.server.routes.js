'use strict';

module.exports = function(app) {
	var wikis = require('../controllers/wikis.server.controller');
	var wikisPolicy = require('../policies/wikis.server.policy');

	// Wikis Routes
	app.route('/api/wikis').all()
		.post(wikis.createWiki);

	app.route('/api/wikis/:wikiId').all(wikisPolicy.isAllowed)
		.get(wikis.getWiki)
		.put(wikis.updateWiki)
		.delete(wikis.deleteWiki);

	// Finish by binding the Wiki middleware
	app.param('wikiId', wikis.wikiByID);
};
