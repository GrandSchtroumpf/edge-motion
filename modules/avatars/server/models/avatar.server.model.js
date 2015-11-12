'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Avatar Schema
 */
var AvatarSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Avatar name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	users: [{
		type: Schema.ObjectId,
		ref: 'User'
	}],
	level : {
		type : Number,
		default : 0
	},
    link : {
        type : String,
        default : 'modules/avatars/img/F/0/default.jpg'
    }
});

mongoose.model('Avatar', AvatarSchema);
