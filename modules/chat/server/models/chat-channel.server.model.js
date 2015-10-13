'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Message Schema
 */
var ChatChannelSchema = new Schema({
    createdOn: { //Date de création du message
        type: Date,
        default: Date.now
    },
    users: [{
        type: Schema.ObjectId,
        ref: 'User',
        required: 'Please add users',
        trim: true
    }],
    messages: [{
        user: {type:Schema.ObjectId, ref:'User'},
        content : {type : String},
        sendedOn: {type: Date, default:Date.now}
    }]
});

mongoose.model('ChatChannel', ChatChannelSchema);
