'use strict';

var should = require('should'),
	request = require('supertest'),
	path = require('path'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	School = mongoose.model('School'),
	express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, school;

/**
 * School routes tests
 */
describe('School CRUD tests', function() {
	before(function(done) {
		// Get application
		app = express.init(mongoose);
		agent = request.agent(app);

		done();
	});

	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new School
		user.save(function() {
			school = {
				name: 'School Name'
			};

			done();
		});
	});

	it('should be able to save School instance if logged in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new School
				agent.post('/api/schools')
					.send(school)
					.expect(200)
					.end(function(schoolSaveErr, schoolSaveRes) {
						// Handle School save error
						if (schoolSaveErr) done(schoolSaveErr);

						// Get a list of Schools
						agent.get('/api/schools')
							.end(function(schoolsGetErr, schoolsGetRes) {
								// Handle School save error
								if (schoolsGetErr) done(schoolsGetErr);

								// Get Schools list
								var schools = schoolsGetRes.body;

								// Set assertions
								(schools[0].user._id).should.equal(userId);
								(schools[0].name).should.match('School Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save School instance if not logged in', function(done) {
		agent.post('/api/schools')
			.send(school)
			.expect(403)
			.end(function(schoolSaveErr, schoolSaveRes) {
				// Call the assertion callback
				done(schoolSaveErr);
			});
	});

	it('should not be able to save School instance if no name is provided', function(done) {
		// Invalidate name field
		school.name = '';

		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new School
				agent.post('/api/schools')
					.send(school)
					.expect(400)
					.end(function(schoolSaveErr, schoolSaveRes) {
						// Set message assertion
						(schoolSaveRes.body.message).should.match('Please fill School name');
						
						// Handle School save error
						done(schoolSaveErr);
					});
			});
	});

	it('should be able to update School instance if signed in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new School
				agent.post('/api/schools')
					.send(school)
					.expect(200)
					.end(function(schoolSaveErr, schoolSaveRes) {
						// Handle School save error
						if (schoolSaveErr) done(schoolSaveErr);

						// Update School name
						school.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing School
						agent.put('/api/schools/' + schoolSaveRes.body._id)
							.send(school)
							.expect(200)
							.end(function(schoolUpdateErr, schoolUpdateRes) {
								// Handle School update error
								if (schoolUpdateErr) done(schoolUpdateErr);

								// Set assertions
								(schoolUpdateRes.body._id).should.equal(schoolSaveRes.body._id);
								(schoolUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Schools if not signed in', function(done) {
		// Create new School model instance
		var schoolObj = new School(school);

		// Save the School
		schoolObj.save(function() {
			// Request Schools
			request(app).get('/api/schools')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single School if not signed in', function(done) {
		// Create new School model instance
		var schoolObj = new School(school);

		// Save the School
		schoolObj.save(function() {
			request(app).get('/api/schools/' + schoolObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', school.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete School instance if signed in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new School
				agent.post('/api/schools')
					.send(school)
					.expect(200)
					.end(function(schoolSaveErr, schoolSaveRes) {
						// Handle School save error
						if (schoolSaveErr) done(schoolSaveErr);

						// Delete existing School
						agent.delete('/api/schools/' + schoolSaveRes.body._id)
							.send(school)
							.expect(200)
							.end(function(schoolDeleteErr, schoolDeleteRes) {
								// Handle School error error
								if (schoolDeleteErr) done(schoolDeleteErr);

								// Set assertions
								(schoolDeleteRes.body._id).should.equal(schoolSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete School instance if not signed in', function(done) {
		// Set School user 
		school.user = user;

		// Create new School model instance
		var schoolObj = new School(school);

		// Save the School
		schoolObj.save(function() {
			// Try deleting School
			request(app).delete('/api/schools/' + schoolObj._id)
			.expect(403)
			.end(function(schoolDeleteErr, schoolDeleteRes) {
				// Set message assertion
				(schoolDeleteRes.body.message).should.match('User is not authorized');

				// Handle School error error
				done(schoolDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec(function(){
			School.remove().exec(function(){
				done();
			});
		});
	});
});
