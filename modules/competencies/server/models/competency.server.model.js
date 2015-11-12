'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    async = require('async'),
	Schema = mongoose.Schema;

/**
 * Competency Schema
 */
var CompetencySchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Competency name',
		trim: true
	},
	level : [{
		type : Number,
        required : 'Please select a level'
	}],
	users: [{
		type: Schema.ObjectId,
		ref: 'User'
	}],
	games : [{
		type : Schema.ObjectId,
		ref : 'Game'
	}]
});

/**
 * function :
 * Input : get the con
 * Output : return the competencies
 */
CompetencySchema.methods.createIfEmpty = function(competencies, cb){
    return async.each(competencies, function(competency, callback){
        mongoose.model('Competency').findOne({
            $and: [{name : competency.name}, {level : competency.level}]
        }).exec(function(err, competence){
            if(err){
                console.log(err);
            }else if (!competence){
                //If doesn't exist save it
                competency.save(function(err, newCompetency){
                    if(err){
                        console.log(err);
                    }else{
                        callback(newCompetency);
                    }
                });
            }else{
                callback(competence);
            }
        });

    }, function(err, result){
        if(err){
            console.log(err);
        }else{
            cb(result);
        }
    });
};

mongoose.model('Competency', CompetencySchema);
