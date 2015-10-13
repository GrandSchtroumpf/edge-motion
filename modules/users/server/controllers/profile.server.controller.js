'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    async = require('async'),
    User = mongoose.model('User'),
    _ = require('lodash');

/**
 * Create a Profile
 */
exports.create = function(req, res) {

};

/**
 * Show the current Profile
 */
exports.read = function(req, res) {
    //FindOne is called in user.authorization.server.controller.js
    res.jsonp(req.profile);
};

/**
 * Update a Profile
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
 * Delete an Profile
 */
exports.delete = function(req, res) {

};

/**
 * List of Profiles
 */
exports.list = function(req, res) {

};
