'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	path = require('path'),
	mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Project = mongoose.model('Project'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

exports.getGuilds = function(req, res){
    res.send();
};

exports.getUsers = function(req, res){
    User.find({}).select('username profileImageURL').exec(function(err, users){
        if(err){
            console.log(err);
        }else{
            res.jsonp(users);
        }
    });
};

exports.getGames = function(req, res){
    res.send();
};

exports.getProjects = function(req, res){
    Project.find({}).exec(function(err, users){
        if(err){
            console.log(err);
        }else{
            res.jsonp(users);
        }
    });
};
