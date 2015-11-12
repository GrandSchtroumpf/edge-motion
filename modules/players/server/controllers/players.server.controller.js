'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	path = require('path'),
	mongoose = require('mongoose'),
	Player = mongoose.model('Player'),
    Game = mongoose.model('Game'),
    User = mongoose.model('User'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a Player
 */
exports.createPlayer = function(req, res) {
	var player = new Player(req.body);
	player.user = req.user._id;

	player.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
            //Add player to game
            Game.findById(player.game).exec(function(err, game){
                if(err){
                    console.log(err);
                }else{
                    game.addPlayer(player._id);
                }
            });

            //Add player to user
            User.findById(player.user).exec(function(err, user){
                if(err){
                    console.log(err);
                }else{
                    user.addPlayer(player._id);
                }
            });
			res.jsonp(player);
		}
	});
};

/**
 * get Player by Id
 */
exports.getPlayer = function(req, res) {
	res.jsonp(req.player);
};

/**
 * Update a Player
 */
exports.updatePlayer = function(req, res) {
	var player = req.player ;

	player.updateThisPlayer(req.body, function(updatedPlayer){
        res.jsonp(updatedPlayer);
    });
};

/**
 * Delete an Player
 */
exports.deletePlayer = function(req, res) {
	var player = req.player ;

	player.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
            player.removePlayerEverywhere();
			res.jsonp(player);
		}
	});
};

/**
 * List of Players
 */
exports.getPlayersBy = function(req, res) { Player.find().sort('-created').populate('user', 'displayName').exec(function(err, players) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(players);
		}
	});
};

/**
 * Player middleware
 */
exports.playerByID = function(req, res, next, id) { Player.findById(id).populate('user', 'displayName').exec(function(err, player) {
		if (err) return next(err);
		if (! player) return next(new Error('Failed to load Player ' + id));
		req.player = player ;
		next();
	});
};
