'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
    path = require('path'),
    mongoose = require('mongoose'),
    ChatChannel = mongoose.model('ChatChannel'),
    User = mongoose.model('User'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a Message
 */
exports.create = function(req, res) {
    var channel = new ChatChannel(req.body);

    channel.save(function(err) {
        if (err) {
            console.log(err);
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(channel);
        }
    });
};

/**
 * Show the current Message
 */
exports.read = function(req, res) {
    res.jsonp(req.channel);
};

/**
 * Update a Message
 */
exports.update = function(req, res) {
    var channel = req.channel ;

    channel = _.extend(channel , req.body);

    channel.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(channel);
        }
    });
};

/**
 * Delete an Message
 */
exports.delete = function(req, res) {
    var channel = req.channel ;

    channel.remove(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }
    });
};

/**
 * List of Messages
 */
exports.list = function(req, res) {
    ChatChannel.find({_id : {$in : req.user.chatchannels}}).populate('users messages.user', 'username')
        .exec(function(err, channels){
            if(err){
                console.log(err);
            }else{
                res.jsonp(channels);
            }
        });
    /*
     User.findById(req.user._id).populate('messages.incoming messages.sended').exec(function(err, user) {
     console.log(user.messages);
     res.jsonp(user.messages);
     });
     */
};


/**
 * Message middleware
 */
exports.channelByID = function(req, res, next, id) { ChatChannel.findById(id).populate('users', 'username').exec(function(err, channel) {
    if (err) return next(err);
    if (! channel) return next(new Error('Failed to load Channel ' + id));
    req.channel = channel ;
    next();
});
};
