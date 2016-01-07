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
 * List of Schools
 */
exports.list = function(req, res) { School.find().sort('-created').exec(function(err, schools) {
    if (err) {
        return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
        });
    } else {
        res.jsonp(schools);
    }
});
};

/**
 * Function : get schools by
 * Input : req.query = {name: , competencies : [], games : [], students : [], school : } or no req.query for all schools
 * Output : Array of schools
 */
exports.getSchoolsBy = function(req, res) {
    //If there is no req.query get all schools
    if(req.query.length !== {}){
        School.find().sort('-created').exec(function(err, schools) {
            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            } else {
                res.jsonp(schools);
            }
        });
     //If there is a req.query get schools by
    }else{
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
    }

};


/**
 * Function : Accept or decline student request
 * Input : req.query -> {accepted : boolean, student : user._id]
 */
exports.manageStudent = function(req, res){
	if(req.query.accepted){
		req.school.acceptStudent(req.query.student);
	} else {
        req.school.refuseStudent(req.query.student);
    }
};

exports.addStudent = function(req, res){
    req.school.studentRequest.push(req.body.userId);
    req.school.updateThisSchool(req.school, function(result){
        res.jsonp(result);
    });

};

/**
 * School middleware
 */
exports.schoolByID = function(req, res, next, id) {
    School.findById(id).exec(function(err, school) {
		if (err) return next(err);
		if (! school) return next(new Error('Failed to load School ' + id));
		req.school = school ;
		next();
	});
};


/**
 *  Authorization
 */
exports.schoolPageAuthorization = function(req, res, next, id){
    //If the user is admin or a professor from the school
    console.log(id);
    if(req.user.roles.indexOf('admin') || (req.user.roles === 'professor' && req.user.school.indexOf(id) !== -1)){
        res.jsonp(true);
    }else{
        res.jsonp(false);
    }
};
