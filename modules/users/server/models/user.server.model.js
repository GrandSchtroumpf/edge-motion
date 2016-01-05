'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    _ = require('lodash'),
    crypto = require('crypto'),
	Schema = mongoose.Schema;


/**
 * A Validation function for local strategy properties
 */
var validateLocalStrategyProperty = function(property) {
	return ((this.provider !== 'local' && !this.updated) || property.length);
};

/**
 * A Validation function for local strategy password
 */
var validateLocalStrategyPassword = function(password) {
	return (this.provider !== 'local' || (password && password.length > 6));
};

/**
 * Hash the password
 */
function hashPassword(clearPwd) {
    /*jshint validthis: true */
    if (clearPwd && clearPwd.length > 6) {
        this.salt = crypto.randomBytes(16).toString('base64');
        return this.hashPassword(clearPwd);
    }
    return '';
}


/**
 * SubSchema
 */

var contactSubSchema = new Schema({
    user : {
        type:Schema.ObjectId,
        ref:'User'
    },
    state : {
        type:String,
        default:'Waiting'
    },
    group : {
        type: String,
        default : 'default'
    }
},{_id:false});

var messageManagerSubSchema = new Schema({
    Message : {
        type : Schema.ObjectId,
        ref : 'Message'
    },
    isViewed : {
        type : Boolean,
        default: false
    },
    importanceLevel : {
        type : Number,
        default : 0
    }
},{_id:false});




/**
 * User Schema
 */
var UserSchema = new Schema({
	firstName: {
		type: String,
		trim: true,
		default: '',
		validate: [validateLocalStrategyProperty, 'Please fill in your first name']
	},
	lastName: {
		type: String,
		trim: true,
		default: '',
		validate: [validateLocalStrategyProperty, 'Please fill in your last name']
	},
	displayName: {
		type: String,
		trim: true
	},
    email: {
        type: String,
        trim: true,
        default: '',
        validate: [validateLocalStrategyProperty, 'Please fill in your email'],
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },

    password: {
        type: String,
        default: '',
        validate: [validateLocalStrategyPassword, 'Password should be longer'],
        set : hashPassword
    },
    salt: {
        type: String
    },

    provider: {
        type: String,
        required: 'Provider is required'
    },
    providerData: {},
    additionalProvidersData: {},
    roles: {
        type: [{
            type: String,
            enum: ['user', 'professor', 'admin']
        }],
        default: ['user']
    },
    updated: {
        type: Date
    },
    created: {
        type: Date,
        default: Date.now
    },
    /* For reset password */
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpires: {
        type: Date
    },

    chatchannels :[{
        type:Schema.ObjectId,
        ref:'ChatChannel'
    }],

    players : [{
        type : Schema.ObjectId,
        ref : 'Player'
    }],
    schools : [{
        type : Schema.ObjectId,
        ref : 'School'
    }],

    profile : {
        username: {
            type: String,
            unique: 'testing error message',
            required: 'Please fill in a username',
            trim: true
        },
        gender:{
            type : String,
            required: 'Please choose a gender'
        },
        competencies : [{
            type : Schema.ObjectId,
            ref: 'Competency'
        }],
        avatar: {
            type: Schema.ObjectId,
            ref : 'Avatar'
        },
        level :{
            type : Number
        },
        experience : {
            type : Number
        }
    },

    contacts :[contactSubSchema],
    messagesManager : [messageManagerSubSchema]




});


/**
 * Function : update this user
 * Input : user content
 * Output : updated User
 */
UserSchema.methods.updateThisUser = function(user, callback){
    var self = this;
    self = _.extend(self , user);
    self.updated = Date.now();
    self.displayName = user.firstName + ' ' + user.lastName;

    self.save(function(err, user){
        if(err) {
            console.log(err);
        }else{
            callback(user);
        }
    });
};

/**
 * Function : change the avatar of the user and update
 * Input : Avatar Id
 * Output : none
 */
UserSchema.methods.changeAvatar = function(avatarId){
    this.profile.avatar = avatarId;
    this.updated = Date.now();
    this.save();
};

/**
 *   Function : add a player / message to the user and update
 *   Input : one player
 *   Output : none
 */
UserSchema.methods.addPlayer = function(playerId){
    this.players.push(playerId);
    this.updated = Date.now();
    this.save();
};
UserSchema.methods.addMessage = function(messageId){
    var messageManager = {
        message : messageId,
        isViewed : false,
        importantanceLevel : 0
    };
    this.messagesManager.push(messageManager);
    this.updated = Date.now();
    this.save();
};

/**
 * Create instance method for hashing a password
 */
UserSchema.methods.hashPassword = function(password) {
	if (this.salt && password) {
		return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
	} else {
		return password;
	}
};

/**
 * Create instance method for authenticating user
 */
UserSchema.methods.authenticate = function(password) {
	return this.password === this.hashPassword(password);
};

/**
 * Find possible not used username
 */
UserSchema.statics.findUniqueUsername = function(username, suffix, callback) {
	var _this = this;
	var possibleUsername = username + (suffix || '');

	_this.findOne({
		'profile.username': possibleUsername
	}, function(err, user) {
		if (!err) {
			if (!user) {
				callback(possibleUsername);
			} else {
				return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
			}
		} else {
			callback(null);
		}
	});
};

/**
 *   Function : get users that have at least one of the competencies / schools / player
 *   Input :  Array of competencies / of schools / of player.user_id
 *   Output : array of user
 */
UserSchema.methods.getUsersByCompetencies = function(competenciesId, callback){
    return this.model('User').find({ competencies : {$in : competenciesId}})
        .select('profile')
        .exec(callback);
};


UserSchema.methods.getUsersByGames = function(gamesId, callback){
    return this.model('User').find({games : {$in : gamesId}})
        .select('profile')
        .exec(callback);
};


UserSchema.methods.getUsersBySchools = function(schoolId, callback){
    return this.model('User').find({ schools : {$in : schoolId}})
        .select('profile')
        .exec(callback);
};

/**
 *   Function : get users that have similar competencies or games that the input user
 *   Input : one user
 *   Output : array of users
 */
UserSchema.methods.getSimilarUsers = function(user, callback){
    return this.model('School').find({
        $or : [{
            competencies: {$in: user.competencies},
            games: {$in: user.games}
        }]
    })
        .select('profile')
        .exec(callback);
};

mongoose.model('User', UserSchema);

