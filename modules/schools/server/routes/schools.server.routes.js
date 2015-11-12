'use strict';

module.exports = function(app) {
	var schools = require('../controllers/schools.server.controller');
	var schoolsPolicy = require('../policies/schools.server.policy');

	// Schools Routes
	app.route('/api/schools').all()
		.get(schools.getSchoolsBy).all(schoolsPolicy.isAllowed)
		.post(schools.createSchool);

	app.route('/api/schools/:schoolId').all(schoolsPolicy.isAllowed)
		.get(schools.getSchool)
		.put(schools.updateSchool)
		.delete(schools.deleteSchool);

	app.route('/api/schools/:schoolId/studentManagement').all(schoolsPolicy.isAllowed)
		.put(schools.studentManagement);

	// Finish by binding the School middleware
	app.param('schoolId', schools.schoolByID);
};
