'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
    fs = require('fs'),
    path = require('path'),
    async = require('async'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    mongoose = require('mongoose'),
    passport = require('passport'),
    User = mongoose.model('User');

//Add contact
function addContactToUser(contactId, userId, state){
    User.findOne({_id: userId}).exec(function(err, user){
        if(err){
            console.log(err);
        }else{
            if(user.contacts.map(function(element){return element.user;}).indexOf(contactId) === -1) {
                user.contacts.push({
                    user: contactId,
                    state: state
                });
                user.save();
            }
        }
    });
}


//Remove contact
function removeContactFromUser(contactId, userId){
    User.findOne({_id: userId}).exec(function(err, user){
        if(err){
            console.log(err);
        }else{
            var index = user.contacts.map(function(element){return element.user;}).indexOf(contactId);
            user.contacts.slice(index, 1);
            user.save();
        }
    });
}

/**
 *  Get list of contacts
 */
exports.list = function(req, res){

};


/**
 * Add contact to user
 */
exports.addContacts = function(req, res){
    async.parallel([function(callback){
        addContactToUser(req.body.contactId, req.body.userId, 'waiting');
        callback();
    },function(callback){
        addContactToUser(req.body.userId, req.body.contactId, 'request');
        callback();
    }], function(err, result){
        if(err){
            console.log(err);
        }else{
            res.jsonp(true);
        }
    });
};

/**
 * Accept user
 */
exports.acceptContact = function(req, res){
    if(req.body.accepted === true){
        addContactToUser(req.body.contactId, req.body.userId, 'accepted');
    }else{
        removeContactFromUser(req.body.contactId, req.body.userId);
    }
};
