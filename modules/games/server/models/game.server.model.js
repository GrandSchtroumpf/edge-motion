'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    _ = require('lodash'),
	Schema = mongoose.Schema;

/**
 * Game Schema
 */
var GameSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Game name',
		trim: true
	},
    icon : {
        type : String,
        default : 'modules/games/icons/game.svg-icon.html'
    },
	created: {
		type: Date,
		default: Date.now
	},
	players: [{
		type: Schema.ObjectId,
		ref: 'Player'
	}],
	schoolCreator : {
        type : Schema.ObjectId,
        ref : 'School'
    },
    schools : [{
        type : Schema.ObjectId,
        ref : 'School'
    }],
    competenciesManager : [{
        type : Schema.ObjectId,
        ref : 'Competency'
    }],
    wiki : {
        type : Schema.ObjectId,
        ref : 'Wiki'
    },
    difficulty : {
        type : Number,
        default : '0'
    },
    private : {
        type : Boolean,
        default : false
    }

});

/**
 *   METHODS
 */

/**
 * Function : update this game
 * Input : game's content
 * Output : callback
 */
GameSchema.methods.updateThisGame = function(game, callback){
    var self = this;
    self = _.extend(self , game);

    self.save(function(err, game){
        if(err) {
            console.log(err);
        }else{
            callback(game);
        }
    });
};

/**
 *   Function : get the game that have this name / at least one of the competencies / schools / player
 *   Input : name string / Array of competencies / of schools / of player.user_id
 *   Output : array of game
 */
GameSchema.methods.getGamesByName = function(name, callback){
    return this.model('Game').findOne({name : name})
        .populate('schoolCreator', 'name icon')
        .populate('schools', 'name icon')
        .populate('players')
        .exec(callback);
};


GameSchema.methods.getGamesByCompetencies = function(competenciesId, callback){
    return this.model('Game').find({ competencies : {$in : competenciesId}})
        .populate('schoolCreator', 'name icon')
        .populate('schools', 'name icon')
        .populate('players')
        .exec(callback);
};


GameSchema.methods.getGamesBySchool = function(schoolsId, callback){
    return this.model('Game').find({ schools : {$in : schoolsId}})
        .populate('schoolCreator', 'name icon')
        .populate('schools', 'name icon')
        .populate('players')
        .exec(callback);
};


GameSchema.methods.getGamesByUser = function(usersId, callback){
    var self = this;
    return mongoose.model('User').find({_id : {$in : usersId}}, function(err, user){
        self.model('Game').find({ players : {$in : user.players}})
            .populate('schoolCreator', 'name icon')
            .populate('schools', 'name icon')
            .populate('players')
            .exec(callback);
    });
};

/**
 *   Function : get games that have similar competencies or school that the input game
 *   Input : one game
 *   Output : array of games
 */
GameSchema.methods.getSimilarGames = function(game, callback){
    return this.model('Game').find({
        $or : [{
            competencies: {$in: game.competencies},
            schools: {$in: game.schools},
            schoolCreator: game.schoolCreator
            }]
        })
        .populate('schoolCreator', 'name icon')
        .populate('schools', 'name icon')
        .populate('players')
        .exec(callback);
};

/**
 *   Function : add a player to the game and update
 *   Input : one player
 *   Output : none
 */
GameSchema.methods.addPlayer = function(playerId){
    this.player.push(playerId);
    this.save();
};

mongoose.model('Game', GameSchema);
