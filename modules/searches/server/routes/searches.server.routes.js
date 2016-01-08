'use strict';

module.exports = function(app) {
	var search = require('../controllers/searches.server.controller');
	var searchPolicy = require('../policies/searches.server.policy');

    app.route('/api/search/doSearch').get(search.doSearch);
    app.route('/api/search/users').get(search.getUsers);
    app.route('/api/search/game').get(search.getGames);
    app.route('/api/search/projects').get(search.getProjects);
};
