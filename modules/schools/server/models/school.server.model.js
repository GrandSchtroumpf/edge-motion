'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    _ = require('lodash'),
	Schema = mongoose.Schema;

/**
 * School Schema
 */
var SchoolSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill School name',
		trim: true
	},
	icon :{
		type : String,
		default : 'modules/schools/icons/default.png'
	},
    description : {
        type : String
    },
    competencies : [{
        type : Schema.ObjectId,
        ref : 'Competency'
    }],
	students: [{
		type: Schema.ObjectId,
		ref: 'User'
	}],
    studentRequest : [{
        type: Schema.ObjectId,
        ref: 'User'
    }],
	professors: [{
		type: Schema.ObjectId,
		ref: 'User'
	}],
    professorRequest: [{
        type: Schema.ObjectId,
        ref: 'User'
    }],

    games : [{
        type : Schema.ObjectId,
        ref: 'Game'
    }],
    gamesCreator : [{
        type : Schema.ObjectId,
        ref: 'Game'
    }],
    admin : {
        type : Schema.ObjectId,
        ref : 'User'
    },
    created: {
        type: Date,
        default: Date.now
    }
});

/**
 * function : udpate this school
 * Input : the school content
 * Output : the updated school
 */
SchoolSchema.methods.updateThisSchool = function(school, callback){
    var self = this;
    self = _.extend(self , school);

    return self.save(function(err, school){
        if(err) {
            console.log(err);
        }else{
            callback(school);
        }
    });
};

/**
 *   Function : get the game that have this name / at least one of the competencies / schools / player
 *   Input : name string / Array of competencies / of schools / of player.user_id
 *   Output : array of game
 */
SchoolSchema.methods.getSchoolsByName = function(name, callback){
    return this.model('School').findOne({name : name})
        .populate('games', 'name icon')
        .populate('professors', 'profile')
        .populate('students', 'profile')
        .exec(callback);
};


SchoolSchema.methods.getSchoolsByCompetencies = function(competenciesId, callback){
    return this.model('School').find({ competencies : {$in : competenciesId}})
        .populate('games', 'name icon')
        .populate('professors', 'profile')
        .populate('students', 'profile')
        .exec(callback);
};


SchoolSchema.methods.getSchoolsByGames = function(gamesId, callback){
    return this.model('School').find({$or : [
            {games : {$in : gamesId}},
            {gamesCreator : {$in : gamesId}}
        ]})
        .populate('games', 'name icon')
        .populate('professors', 'profile')
        .populate('students', 'profile')
        .exec(callback);
};


SchoolSchema.methods.getSchoolsByStudents = function(studentsId, callback){
    return this.model('School').find({ students : {$in : studentsId}})
        .populate('games', 'name icon')
        .populate('professors', 'profile')
        .populate('students', 'profile')
        .exec(callback);
};

/**
 *   Function : get schools that have similar competencies or game that the input school
 *   Input : one game
 *   Output : array of games
 */
SchoolSchema.methods.getSimilarSchools = function(school, callback){
    return this.model('School').find({
        $or : [{
            competencies: {$in: school.competencies},
            games: {$in: school.games}
            }]
        })
        .populate('games', 'name icon')
        .populate('professors', 'profile')
        .populate('students', 'profile')
        .exec(callback);
};



/**
 * function : Accept this student / professor
 * Input : the student (user) _id
 * Output : none
 */
SchoolSchema.methods.acceptStudent = function(studentId){
    var index = this.studentRequest.indexOf(studentId);
    this.studentRequest.splice(index, 1);
    this.students.push(studentId);
    this.save();
};
SchoolSchema.methods.refuseStudent = function(studentId){
    var index = this.studentRequest.indexOf(studentId);
    this.studentRequest.splice(index, 1);
    this.save();
};
SchoolSchema.methods.acceptProfessor = function(studentId){
    var index = this.professorRequest.indexOf(studentId);
    this.professorRequest.splice(index, 1);
    this.professors.push(studentId);
    this.save();
};
SchoolSchema.methods.refuseProfessor = function(studentId){
    var index = this.professorRequest.indexOf(studentId);
    this.professorRequest.splice(index, 1);
    this.save();
};

/**
 * Function : Allow student to use this game MUST BE CRYPTED
 * Input : student_id, game_id
 * Output : none
 */
SchoolSchema.methods.allowStudentGame = function(studentId, gameId){

};

mongoose.model('School', SchoolSchema);
