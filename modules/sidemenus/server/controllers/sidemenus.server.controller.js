'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	path = require('path'),
	fs = require('fs'),
	mongoose = require('mongoose'),
	Sidemenu = mongoose.model('Sidemenu'),
	User = mongoose.model('User'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a Sidemenu
 */
exports.create = function(req, res) {
	var sidemenu = new Sidemenu(req.body);
	sidemenu.user = req.user;

	sidemenu.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(sidemenu);
		}
	});
};

/**
 * Show the current Sidemenu
 */
exports.read = function(req, res) {
	res.jsonp(req.sidemenu);
};

/**
 * Update a Sidemenu
 */
exports.update = function(req, res) {
	var sidemenu = req.sidemenu ;

	sidemenu = _.extend(sidemenu , req.body);

	sidemenu.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(sidemenu);
		}
	});
};

/**
 * Delete an Sidemenu
 */
exports.delete = function(req, res) {
	var sidemenu = req.sidemenu ;

	sidemenu.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(sidemenu);
		}
	});
};

/**
 * List of Sidemenus
 */
exports.list = function(req, res) { Sidemenu.find().sort('-created').populate('user', 'displayName').exec(function(err, sidemenus) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(sidemenus);
		}
	});
};

/*
    FindBy
 */
exports.getByUser = function(req,res){
    //If user
    if(req.user){
        var sidebars = {
            path:'sidebars.profile',
            model:'Sidemenu'
        };
        User.populate(req.user.sidebars, sidebars, function(err, sidebars){
            res.jsonp(sidebars);
        });
    //Before SignIn
    }else{
        fs.readFile('modules/sidemenus/server/data/defaultSidebar.server.data.txt', 'utf8', function(err,data){
            if(err){
                console.log(err);
            }else{
                res.jsonp(JSON.parse(data));
            }
        });
    }

};

/*
    Add a notification
 */
exports.addNotification = function(req, res){
    User.findById(req.body.userId, function(err, user){
        if(err){
            console.log(err);
        }else{
            var index = user.notifications.map(function(not){return not.sidemenu;}).indexOf(req.body.sidemenuId);
            //If there is already a notification
            if(index !== -1){
                user.notifications[index].count ++;
            //Else create a new notification
            }else{
                user.notifications.push({
                    sidemenu: req.body.sidemenuId,
                    count: 1
                });
            }
            user.save(function(err, userUpdated){
                if(err){
                    console.log(err);
                }else{
                    //SEND A NOTIFICATION ALERT TO THE USER
                    res.send();
                }
            });

        }
    });
    /*
    Sidemenu.findById(req.body.params, function(sidemenu){
        sidemenu.notification ++;
        console.log(sidemenu);
        sidemenu.save(function(err){
            if(err){
                console.log(err);
                res.sendStatus(500);
            }else{
                res.sendStatus(200);
            }
        });
    });
    */
};


/**
 * Sidemenu middleware
 */
exports.sidemenuByID = function(req, res, next, id) { Sidemenu.findById(id).populate('user', 'displayName').exec(function(err, sidemenu) {
		if (err) return next(err);
		if (! sidemenu) return next(new Error('Failed to load Sidemenu ' + id));
		req.sidemenu = sidemenu ;
		next();
	});
};
