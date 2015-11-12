'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	fs = require('fs'),
	path = require('path'),
    async = require('async'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
	mongoose = require('mongoose'),
	passport = require('passport'),
    School = mongoose.model('School'),
	User = mongoose.model('User');

/**
 * Update user details
 */
exports.update = function (req, res) {
	// Init Variables
	var user = req.user;

	// For security measurement we remove the roles from the req.body object
	delete req.body.roles;

	if (user) {
        user.updateThisUser(req.body, function(user){
            req.login(user, function (err) {
                if (err) {
                    res.status(400).send(err);
                } else {
                    res.json(user);
                }
            });
        });
	} else {
		res.status(400).send({
			message: 'User is not signed in'
		});
	}
};

/**
 * Function : Update profile picture
 * Input : req.query = {avatar : avatar._id}
 */
exports.changeProfilePicture = function (req, res) {
	var user = req.user;
	var message = null;

	if (user) {
		user.changeAvatar(req.query.avatar);
	} else {
		res.status(400).send({
			message: 'User is not signed in'
		});
	}
};

/**
  *  Update multiple users
 */
exports.updateMulti = function(req, res) {
    var users = req.body;

    async.each(users, function (user, callback) {
        User.findById(user._id).exec(function (err, userToUpdate) {
            // Merge existing user
            _.merge(userToUpdate, user);
            userToUpdate.updated = Date.now();
            userToUpdate.save(function (err) {
                if (err) {
                    callback(err);
                    return res.status(400).send();
                } else {
                    res.status(200).send();
                }
            });
        });
    });
};

/**
 * Send User
 */
exports.me = function (req, res) {
    console.log('depuis user.profile.server.controller' + req);
	res.json(req.user || null);
};

/**
 * Show the current Profile
 */
exports.getUser = function(req, res) {
	//FindOne is called in user.authorization.server.controller.js
	res.jsonp(req.profile);
};

/**
 *  Function : Get multiple user by
 *  Input :
 */
exports.getUsersBy = function(req, res){
    var keys = req.query.map(function(e){return Object.keys(e);});
    async.parallel([
        function(callback){
            if(keys.indexOf('competencies') !== -1){
                User.getUsersByCompetencies(req.query.competencies, function(result){
                    return callback(result);
                });
            }
        },
        function(callback){
            if(keys.indexOf('games') !== -1){
                User.getUsersByGames(req.query.games, function(result){
                    return callback(result);
                });
            }
        },
        function(callback){
            if(keys.indexOf('schools') !== -1){
                User.getUsersBySchools(req.query.schools, function(result){
                    return callback(result);
                });
            }
        },
        function(callback){
            if(keys.indexOf('school') !== -1){
                User.getSimilarUsers(req.query.game, function(result){
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
 *  Function : Ask the school to be Student or professor
 *  Input : req.query = {student : boolean, professor : boolean, school : schoolId}
 */
exports.requestToSchool = function(req, res){
    if(req.query.student){
        School.findById(req.query.school).exec(function(err, school){
            if(err){
                console.log(err);
            }else{
                school.studentRequest.push(req.user._id);
                school.save(function(err){
                    if(err){
                        console.log(err);
                    }else{
                        res.status(400);
                    }
                });
            }
        });
    }else if(req.query.professor){
        School.findById(req.query.school).exec(function(err, school){
            if(err){
                console.log(err);
            }else{
                school.professorRequest.push(req.user._id);
                school.save(function(err){
                    if(err){
                        console.log(err);
                    }else{
                        res.status(400);
                    }
                });
            }
        });
    }else{
        res.status(200);
    }
};
