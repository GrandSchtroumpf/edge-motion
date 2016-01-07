'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	path = require('path'),
	mongoose = require('mongoose'),
    async = require('async'),
    User = mongoose.model('User'),
    School = mongoose.model('School'),
    Game = mongoose.model('Game'),
    Project = mongoose.model('Project'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

//Function researches
function searchUsers(keyword, callback){
    User.find({}).select('profile').populate('profile.avatar').exec(function(err, users){
        if(err){
            console.log(err);
        }else{
            callback(users);
        }
    });
}

function searchSchools(keyword, callback){
    School.find({}).exec(function(err, schools){
        if(err){
            console.log(err);
        }else{
            callback(schools);
        }
    });
}

function searchGames(keyword, callback){
    Game.find({}).exec(function(err, games){
        if(err){
            console.log(err);
        }else{
            callback(games);
        }
    });
}

exports.doSearch = function(req, res){
    var search = req.query;
    var category = JSON.parse(search.category);

    async.parallel([
            //Search Users
        function(callback){
            if(category.user){
                searchUsers(search.keyword, function(response){
                    var users = {
                        category : 'user',
                        results : response
                    };
                    callback(null, users);
                });
            }else{
                callback();
            }
        },
            //Search Schools
        function(callback){
            if(category.school){
                searchSchools(search.keyword, function(response){
                    var schools = {
                        category : 'school',
                        results : response
                    };
                    callback(null, schools);
                });
            }else{
                callback();
            }
        },
            //Search Game
        function(callback){
            if(category.game){
                searchGames(search.keyword, function(response){
                    var games = {
                        category : 'game',
                        results : response
                    };
                    callback(null, games);
                });
            }else{
                callback();
            }
        }
    ],

    //Callback function
    function(err, results){
        //remove undefined
        results = results.filter(function(element){
            return element !== undefined && element !== null;
        });
        res.jsonp(results);

    });
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



