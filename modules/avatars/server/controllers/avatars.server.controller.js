'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	path = require('path'),
	mongoose = require('mongoose'),
	Avatar = mongoose.model('Avatar'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a Avatar
 */
exports.createAvatar = function(req, res) {
	var avatar = new Avatar(req.body);
	avatar.user = req.user;

	avatar.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(avatar);
		}
	});
};

/**
 * Show the current Avatar
 */
exports.getAvatar = function(req, res) {
	res.jsonp(req.avatar);
};

/**
 * Update a Avatar
 */
exports.updateAvatar = function(req, res) {
	var avatar = req.avatar ;

	avatar = _.extend(avatar , req.body);

	avatar.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(avatar);
		}
	});
};

/**
 * Delete an Avatar
 */
exports.deleteAvatar = function(req, res) {
	var avatar = req.avatar ;

	avatar.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(avatar);
		}
	});
};

/**
 * List of Avatars
 */
exports.getAvatarBy = function(req, res) {
	Avatar.find().sort('-created').exec(function(err, avatars) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(avatars);
		}
	});
};

/**
 * Avatar middleware
 */
exports.avatarByID = function(req, res, next, id) {	Avatar.findById(id).exec(function(err, avatar) {
		if (err) return next(err);
		if (! avatar) return next(new Error('Failed to load Avatar ' + id));
		req.avatar = avatar ;
		next();
	});
};
