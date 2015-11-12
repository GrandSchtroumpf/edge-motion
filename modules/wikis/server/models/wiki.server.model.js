'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Wiki Schema
 */
var WikiSchema = new Schema({
	game : {
		type : Schema.ObjectId,
		ref : 'Game'
	},
	gameInfo : {

	},
	competenceInfo : {
		
	}
});

mongoose.model('Wiki', WikiSchema);
