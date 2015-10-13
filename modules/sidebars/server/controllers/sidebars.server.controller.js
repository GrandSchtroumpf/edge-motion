'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	path = require('path'),
	mongoose = require('mongoose'),
	Sidebar = mongoose.model('Sidebar'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a Sidebar
 */
exports.create = function(req, res) {
	var sidebar = new Sidebar(req.body);
	sidebar.user = req.user;

	sidebar.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(sidebar);
		}
	});
};

/**
 * Show the current Sidebar
 */
exports.read = function(req, res) {
	res.jsonp(req.sidebar);
};

/**
 * Update a Sidebar
 */
exports.update = function(req, res) {
	var sidebar = req.sidebar ;

	sidebar = _.extend(sidebar , req.body);

	sidebar.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(sidebar);
		}
	});
};

/**
 * Delete an Sidebar
 */
exports.delete = function(req, res) {
	var sidebar = req.sidebar ;

	sidebar.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(sidebar);
		}
	});
};

/**
 * List of Sidebars
 */
exports.list = function(req, res) { Sidebar.find().sort('-created').populate('user', 'displayName').exec(function(err, sidebars) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(sidebars);
		}
	});
};

/**
 * Sidebar middleware
 */
exports.sidebarByID = function(req, res, next, id) { Sidebar.findById(id).populate('user', 'displayName').exec(function(err, sidebar) {
		if (err) return next(err);
		if (! sidebar) return next(new Error('Failed to load Sidebar ' + id));
		req.sidebar = sidebar ;
		next();
	});
};