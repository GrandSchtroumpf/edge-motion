'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	path = require('path'),
    async = require('async'),
	mongoose = require('mongoose'),
	School = mongoose.model('School'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a School
 */
exports.createSchool = function(req, res) {
	var school = new School(req.body);
	school.user = req.user;

	school.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(school);
		}
	});
};

/**
 * Show the current School
 */
exports.getSchool = function(req, res) {
	res.jsonp(req.school);
};

/**
 * Update a School
 */
exports.updateSchool = function(req, res) {
	var school = req.school ;

	school = _.extend(school , req.body);

	school.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(school);
		}
	});
};

/**
 * Delete an School
 */
exports.deleteSchool = function(req, res) {
	var school = req.school ;

	school.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(school);
		}
	});
};

/**
 * Function : get schools by
 * Input : req.query = {name: , competencies : [], games : [], students : [], school : }
 * Output : Array of schools
 */
exports.getSchoolsBy = function(req, res) {
    var keys = req.query.map(function(e){return Object.keys(e);});
    async.parallel([
        function(callback) {
            if(keys.indexOf('name') !== -1){
                School.getSchoolsByName(req.query.name, function(result){
                    return callback(result);
                });
            }
        },
        function(callback){
            if(keys.indexOf('competencies') !== -1){
                School.getSchoolsByCompetencies(req.query.competencies, function(result){
                    return callback(result);
                });
            }
        },
        function(callback){
            if(keys.indexOf('games') !== -1){
                School.getSchoolsByGames(req.query.games, function(result){
                    return callback(result);
                });
            }
        },
        function(callback){
            if(keys.indexOf('students') !== -1){
                School.getSchoolsByStudents(req.query.users, function(result){
                    return callback(result);
                });
            }
        },
        function(callback){
            if(keys.indexOf('school') !== -1){
                School.getSimilarSchools(req.query.game, function(result){
                    return callback(result);
                });
            }
        }
    ], function(err, result){
        if(err){
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }else{
            res.jsonp(result);
        }
    });
};


/**
 * Function : Accept or decline student request
 * Input : req.query -> {accepted : boolean, student : user._id]
 */
exports.studentManagement = function(req, res){
	if(req.query.accepted){
		req.school.acceptStudent(req.query.student);
	} else {
        req.school.refuseStudent(req.query.student);
    }
};

/**
 * School middleware
 */
exports.schoolByID = function(req, res, next, id) { School.findById(id).populate('user', 'displayName').exec(function(err, school) {
		if (err) return next(err);
		if (! school) return next(new Error('Failed to load School ' + id));
		req.school = school ;
		next();
	});
};
