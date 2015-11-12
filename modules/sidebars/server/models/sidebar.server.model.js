'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Sidebar SubSchema
 */

var menuSubSchema = new Schema({
	name : {
		type:String,
		require : true
	},
	icon : {
		type : String,
		default: 'modules/sidebars/icons/game.html',
        require : true
	},
    link:{
        type: String,
        trim:true,
        require:true
    },
    position : {
        type:Number
    }
},{_id:false});


/**
 * Sidebar Schema
 */
var SidebarSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	menues : [menuSubSchema]

});

mongoose.model('Sidebar', SidebarSchema);
