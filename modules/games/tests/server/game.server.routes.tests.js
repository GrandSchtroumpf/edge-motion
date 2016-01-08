'use strict';

var should = require('should'),
	request = require('supertest'),
	path = require('path'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Game = mongoose.model('Game'),
	express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, game;

/**
 * Game routes tests
 */
describe('Game CRUD tests', function() {
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

		// Save a user to the test db and create new Game
		user.save(function() {
			game = {
				name: 'Game Name'
			};

			done();
		});
	});

	it('should be able to save Game instance if logged in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Game
				agent.post('/api/game')
					.send(game)
					.expect(200)
					.end(function(gameSaveErr, gameSaveRes) {
						// Handle Game save error
						if (gameSaveErr) done(gameSaveErr);

						// Get a list of Games
						agent.get('/api/game')
							.end(function(gamesGetErr, gamesGetRes) {
								// Handle Game save error
								if (gamesGetErr) done(gamesGetErr);

								// Get Games list
								var games = gamesGetRes.body;

								// Set assertions
								(games[0].user._id).should.equal(userId);
								(games[0].name).should.match('Game Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Game instance if not logged in', function(done) {
		agent.post('/api/game')
			.send(game)
			.expect(403)
			.end(function(gameSaveErr, gameSaveRes) {
				// Call the assertion callback
				done(gameSaveErr);
			});
	});

	it('should not be able to save Game instance if no name is provided', function(done) {
		// Invalidate name field
		game.name = '';

		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Game
				agent.post('/api/game')
					.send(game)
					.expect(400)
					.end(function(gameSaveErr, gameSaveRes) {
						// Set message assertion
						(gameSaveRes.body.message).should.match('Please fill Game name');
						
						// Handle Game save error
						done(gameSaveErr);
					});
			});
	});

	it('should be able to update Game instance if signed in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Game
				agent.post('/api/game')
					.send(game)
					.expect(200)
					.end(function(gameSaveErr, gameSaveRes) {
						// Handle Game save error
						if (gameSaveErr) done(gameSaveErr);

						// Update Game name
						game.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Game
						agent.put('/api/game/' + gameSaveRes.body._id)
							.send(game)
							.expect(200)
							.end(function(gameUpdateErr, gameUpdateRes) {
								// Handle Game update error
								if (gameUpdateErr) done(gameUpdateErr);

								// Set assertions
								(gameUpdateRes.body._id).should.equal(gameSaveRes.body._id);
								(gameUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Games if not signed in', function(done) {
		// Create new Game model instance
		var gameObj = new Game(game);

		// Save the Game
		gameObj.save(function() {
			// Request Games
			request(app).get('/api/game')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Game if not signed in', function(done) {
		// Create new Game model instance
		var gameObj = new Game(game);

		// Save the Game
		gameObj.save(function() {
			request(app).get('/api/game/' + gameObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', game.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Game instance if signed in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Game
				agent.post('/api/game')
					.send(game)
					.expect(200)
					.end(function(gameSaveErr, gameSaveRes) {
						// Handle Game save error
						if (gameSaveErr) done(gameSaveErr);

						// Delete existing Game
						agent.delete('/api/game/' + gameSaveRes.body._id)
							.send(game)
							.expect(200)
							.end(function(gameDeleteErr, gameDeleteRes) {
								// Handle Game error error
								if (gameDeleteErr) done(gameDeleteErr);

								// Set assertions
								(gameDeleteRes.body._id).should.equal(gameSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Game instance if not signed in', function(done) {
		// Set Game user 
		game.user = user;

		// Create new Game model instance
		var gameObj = new Game(game);

		// Save the Game
		gameObj.save(function() {
			// Try deleting Game
			request(app).delete('/api/game/' + gameObj._id)
			.expect(403)
			.end(function(gameDeleteErr, gameDeleteRes) {
				// Set message assertion
				(gameDeleteRes.body.message).should.match('User is not authorized');

				// Handle Game error error
				done(gameDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec(function(){
			Game.remove().exec(function(){
				done();
			});
		});
	});
});
