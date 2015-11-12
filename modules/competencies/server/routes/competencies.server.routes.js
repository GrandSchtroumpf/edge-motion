'use strict';

module.exports = function(app) {
	var competencies = require('../controllers/competencies.server.controller');
	var competenciesPolicy = require('../policies/competencies.server.policy');

	// Competencies Routes
	app.route('/api/competencies').all()
		.get(competencies.list).all(competenciesPolicy.isAllowed)
		.post(competencies.create);

	app.route('/api/competencies/:competencyId').all(competenciesPolicy.isAllowed)
		.get(competencies.read)
		.put(competencies.update)
		.delete(competencies.delete);

	// Finish by binding the Competency middleware
	app.param('competencyId', competencies.competencyByID);
};