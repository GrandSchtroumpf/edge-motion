'use strict';

var should = require('should'),
	request = require('supertest'),
	path = require('path'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Sidemenu = mongoose.model('Sidemenu'),
	express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, sidemenu;

/**
 * Sidemenu routes tests
 */
describe('Sidemenu CRUD tests', function() {
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

		// Save a user to the test db and create new Sidemenu
		user.save(function() {
			sidemenu = {
				name: 'Sidemenu Name'
			};

			done();
		});
	});

	it('should be able to save Sidemenu instance if logged in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Sidemenu
				agent.post('/api/sidemenus')
					.send(sidemenu)
					.expect(200)
					.end(function(sidemenuSaveErr, sidemenuSaveRes) {
						// Handle Sidemenu save error
						if (sidemenuSaveErr) done(sidemenuSaveErr);

						// Get a list of Sidemenus
						agent.get('/api/sidemenus')
							.end(function(sidemenusGetErr, sidemenusGetRes) {
								// Handle Sidemenu save error
								if (sidemenusGetErr) done(sidemenusGetErr);

								// Get Sidemenus list
								var sidemenus = sidemenusGetRes.body;

								// Set assertions
								(sidemenus[0].user._id).should.equal(userId);
								(sidemenus[0].name).should.match('Sidemenu Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Sidemenu instance if not logged in', function(done) {
		agent.post('/api/sidemenus')
			.send(sidemenu)
			.expect(403)
			.end(function(sidemenuSaveErr, sidemenuSaveRes) {
				// Call the assertion callback
				done(sidemenuSaveErr);
			});
	});

	it('should not be able to save Sidemenu instance if no name is provided', function(done) {
		// Invalidate name field
		sidemenu.name = '';

		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Sidemenu
				agent.post('/api/sidemenus')
					.send(sidemenu)
					.expect(400)
					.end(function(sidemenuSaveErr, sidemenuSaveRes) {
						// Set message assertion
						(sidemenuSaveRes.body.message).should.match('Please fill Sidemenu name');
						
						// Handle Sidemenu save error
						done(sidemenuSaveErr);
					});
			});
	});

	it('should be able to update Sidemenu instance if signed in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Sidemenu
				agent.post('/api/sidemenus')
					.send(sidemenu)
					.expect(200)
					.end(function(sidemenuSaveErr, sidemenuSaveRes) {
						// Handle Sidemenu save error
						if (sidemenuSaveErr) done(sidemenuSaveErr);

						// Update Sidemenu name
						sidemenu.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Sidemenu
						agent.put('/api/sidemenus/' + sidemenuSaveRes.body._id)
							.send(sidemenu)
							.expect(200)
							.end(function(sidemenuUpdateErr, sidemenuUpdateRes) {
								// Handle Sidemenu update error
								if (sidemenuUpdateErr) done(sidemenuUpdateErr);

								// Set assertions
								(sidemenuUpdateRes.body._id).should.equal(sidemenuSaveRes.body._id);
								(sidemenuUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Sidemenus if not signed in', function(done) {
		// Create new Sidemenu models instance
		var sidemenuObj = new Sidemenu(sidemenu);

		// Save the Sidemenu
		sidemenuObj.save(function() {
			// Request Sidemenus
			request(app).get('/api/sidemenus')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Sidemenu if not signed in', function(done) {
		// Create new Sidemenu models instance
		var sidemenuObj = new Sidemenu(sidemenu);

		// Save the Sidemenu
		sidemenuObj.save(function() {
			request(app).get('/api/sidemenus/' + sidemenuObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', sidemenu.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Sidemenu instance if signed in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Sidemenu
				agent.post('/api/sidemenus')
					.send(sidemenu)
					.expect(200)
					.end(function(sidemenuSaveErr, sidemenuSaveRes) {
						// Handle Sidemenu save error
						if (sidemenuSaveErr) done(sidemenuSaveErr);

						// Delete existing Sidemenu
						agent.delete('/api/sidemenus/' + sidemenuSaveRes.body._id)
							.send(sidemenu)
							.expect(200)
							.end(function(sidemenuDeleteErr, sidemenuDeleteRes) {
								// Handle Sidemenu error error
								if (sidemenuDeleteErr) done(sidemenuDeleteErr);

								// Set assertions
								(sidemenuDeleteRes.body._id).should.equal(sidemenuSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Sidemenu instance if not signed in', function(done) {
		// Set Sidemenu user 
		sidemenu.user = user;

		// Create new Sidemenu models instance
		var sidemenuObj = new Sidemenu(sidemenu);

		// Save the Sidemenu
		sidemenuObj.save(function() {
			// Try deleting Sidemenu
			request(app).delete('/api/sidemenus/' + sidemenuObj._id)
			.expect(403)
			.end(function(sidemenuDeleteErr, sidemenuDeleteRes) {
				// Set message assertion
				(sidemenuDeleteRes.body.message).should.match('User is not authorized');

				// Handle Sidemenu error error
				done(sidemenuDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec(function(){
			Sidemenu.remove().exec(function(){
				done();
			});
		});
	});
});
