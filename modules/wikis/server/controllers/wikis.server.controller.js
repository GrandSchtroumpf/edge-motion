'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	path = require('path'),
	mongoose = require('mongoose'),
	Wiki = mongoose.model('Wiki'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a Wiki
 */
exports.createWiki = function(req, res) {
	var wiki = new Wiki(req.body);
	wiki.user = req.user;

	wiki.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(wiki);
		}
	});
};

/**
 * Show the current Wiki
 */
exports.getWiki = function(req, res) {
	res.jsonp(req.wiki);
};

/**
 * Update a Wiki
 */
exports.updateWiki = function(req, res) {
	var wiki = req.wiki ;

	wiki = _.extend(wiki , req.body);

	wiki.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(wiki);
		}
	});
};

/**
 * Delete an Wiki
 */
exports.deleteWiki = function(req, res) {
	var wiki = req.wiki ;

	wiki.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(wiki);
		}
	});
};

/**
 * Wiki middleware
 */
exports.wikiByID = function(req, res, next, id) { Wiki.findById(id).populate('user', 'displayName').exec(function(err, wiki) {
		if (err) return next(err);
		if (! wiki) return next(new Error('Failed to load Wiki ' + id));
		req.wiki = wiki ;
		next();
	});
};
