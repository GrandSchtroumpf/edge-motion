'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    _ = require('lodash'),
    async = require('async'),
	Schema = mongoose.Schema;

/**
 * Player Schema
 */
var PlayerSchema = new Schema({

	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	game: {
		type : Schema.ObjectId,
		ref : 'Game'
	},
    avatar : {
        type : Schema.ObjectId,
        ref : 'Avatar'
    },
	competencies : [{
		type : Schema.ObjectId,
		ref : 'Competency'
	}],
	experience : {
		type : Number,
		default : 0
	},
	level : {
		type : Number,
		default : 0
	},
	timeInGame : {
		type : Number
	},
	startedDate: {
		type: Date,
		default: Date.now
	},
	deletedGame : {
        type : Boolean,
        default : false
    }


});

/**
 * Function : update this player
 * Input : player's content
 * Output : callback
 */
PlayerSchema.methods.updateThisPlayer = function(player, callback){
    var self = this;
    self = _.extend(self , player);

    return self.save(function(err, player){
        if(err) {
            console.log(err);
        }else{
            callback(player);
        }
    });
};

/**
 * Function : find all players, set deletedGame to true and update
 * Input : array of player id
 * Output : none
 */
PlayerSchema.methods.setToDeletedGame = function(playersId){
    return this.model('Player').find({id : {$in : playersId}}).exec(function(err, players){
        async.each(players, function(player){
            player.deletedGame = true;
            player.updateThisPlayer();
        });
    });
};

/**
 * Function : add the content and update
 * Input : specific content
 * Output : updated player
 */
PlayerSchema.methods.addSuccess = function(success, callback){
    var update = this;
    update.success.push(success);
    return this.updateThisPlayer(update, function(result){
        callback(result);
    });
};
PlayerSchema.methods.addExperience = function(experience, callback){
    var update = this;
    update.experience += experience;
    return this.updateThisPlayer(update, function(result){
        callback(result);
    });
};
PlayerSchema.methods.addCompetency = function(competencyId, callback){
    var update = this;
    update.competency.push(competencyId);
    return this.updateThisPlayer(update, function(result){
        callback(result);
    });
};

/**
 * Function : remove player from user and game
 * Input : player
 * Output : none
 */
PlayerSchema.methods.removePlayerEverywhere = function(callback){
    var self = this;
    return async.parallel([
        function(){
            mongoose.model('User').findById(self.user, function(err, user){
                var index = user.player.indexOf(self._id);
                user.player.splice(index, 1);
                user.updateThisUser();
            });
        },
        function(){
            mongoose.model('Game').findById(self.game, function(err, game){
                var index = game.player.indexOf(self._id);
                game.player.splice(index, 1);
                game.updateThisGame();
            });
        }
    ]);
};

mongoose.model('Player', PlayerSchema);
