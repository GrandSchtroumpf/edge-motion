'use strict';

module.exports = function(app) {
	var games = require('../controllers/games.server.controller');
	var gamesPolicy = require('../policies/games.server.policy');

	// Games Routes
	app.route('/api/games').all()
		.get(games.getGamesBy).all(gamesPolicy.isAllowed)
		.post(games.createGame);

	app.route('/api/games/:gameId').all(gamesPolicy.isAllowed)
		.get(games.getGame)
		.put(games.updateGame)
		.delete(games.deleteGame);

	// Finish by binding the Game middleware
	app.param('gameId', games.gameByID);
};
