'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	path = require('path'),
	mongoose = require('mongoose'),
    async = require('async'),
	Message = mongoose.model('Message'),
	User = mongoose.model('User'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a Message
 */
exports.createMessage = function(req, res) {
	var message = new Message(req.body);

	message.save(function(err, message) {
		if (err) {
            console.log(err);
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
            var messageUsers = message.userSender.concat(message.userRecipient);
			//Add message to Reciepients and sender
            async.each(messageUsers, function(userId){
                User.findById(userId).exec(function(err, user){
                    if(err){
                        console.log(err);
                    }else{
                        user.addMessage(message._id);
                    }
                });
            });

			res.jsonp(message);
		}
	});
};

/**
 * Show the current Message
 */
exports.getMessage = function(req, res) {
	res.jsonp(req.message);
};

/**
 * Delete an Message
 */
exports.deleteMessage = function(req, res) {
	var message = req.message ;

	message.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(message);
		}
	});
};

/**
 * List of Messages
 */
exports.getMyMessages = function(req, res) {
    Message.find({
        $or:[{userRecipient : req.user._id}, {userSender : req.user._id}]
    }).populate('userRecipient userCopy userSender', 'displayName')
        .exec(function(err, messages){
        if(err){
            console.log(err);
        }else{
            res.jsonp(messages);
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
exports.messageByID = function(req, res, next, id) { Message.findById(id).populate('user', 'displayName').exec(function(err, message) {
		if (err) return next(err);
		if (! message) return next(new Error('Failed to load Message ' + id));
		req.message = message ;
		next();
	});
};
