'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	path = require('path'),
	mongoose = require('mongoose'),
    async = require('async'),
	Game = mongoose.model('Game'),
    Player = mongoose.model('Player'),
    Competency = mongoose.model('Competency'),
    Wiki = mongoose.model('Wiki'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a Game
 */
exports.createGame = function(req, res) {
	var game = new Game(req.body);

    //Add competencies if they don't exist
    Competency.createIfEmpty(game.competencies);

	game.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
            //Create a new wiki
            var wiki = new Wiki();
            wiki.game = game._id;
            wiki.save();

            res.jsonp(game);
		}
	});
};

/**
 * Show the game with this _id
 */
exports.getGame = function(req, res) {
	res.jsonp(req.game);
};

/**
 * Update a Game
 */
exports.updateGame = function(req, res) {
	var game = req.game ;

	game.updateThisGame(req.body, function(updatedGame){
        res.jsonp(updatedGame);
    });
};

/**
 * Delete an Game
 */
exports.deleteGame = function(req, res) {
	var game = req.game ;

    //change game icon of player
    Player.setToDeletedGame(game.players);

	game.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(game);
		}
	});
};

/**
 * Function : get $http.params into req.query and send multiple finding methods depending on the params
 * Input : req.params is an object with name or competencies or school or user
 * Output : return games
 */
exports.getGamesBy = function(req, res) {
    var keys = req.query.map(function(e){return Object.keys(e);});
    async.parallel([
        function(callback) {
            if(keys.indexOf('name') !== -1){
                Game.getGamesByName(req.query.name, function(result){
                    return callback(result);
                });
            }
        },
        function(callback){
            if(keys.indexOf('competencies') !== -1){
                Game.getGamesByCompetencies(req.query.competencies, function(result){
                    return callback(result);
                });
            }
        },
        function(callback){
            if(keys.indexOf('schools') !== -1){
                Game.getGamesBySchool(req.query.schools, function(result){
                    return callback(result);
                });
            }
        },
        function(callback){
            if(keys.indexOf('users') !== -1){
                Game.getGamesByUser(req.query.users, function(result){
                    return callback(result);
                });
            }
        },
        function(callback){
            if(keys.indexOf('game') !== -1){
                Game.getSimilarGames(req.query.game, function(result){
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
 * Game middleware
 */
exports.gameByID = function(req, res, next, id) {
    Game.findById(id).populate('user', 'displayName').exec(function(err, game) {
		if (err) return next(err);
		if (! game) return next(new Error('Failed to load Game ' + id));
		req.game = game ;
		next();
	});
};
