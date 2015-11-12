'use strict';

module.exports = function(app) {
	var players = require('../controllers/players.server.controller');
	var playersPolicy = require('../policies/players.server.policy');

	// Players Routes
	app.route('/api/players').all()
		.get(players.getPlayersBy).all(playersPolicy.isAllowed)
		.post(players.createPlayer);

	app.route('/api/players/:playerId').all(playersPolicy.isAllowed)
		.get(players.getPlayer)
		.put(players.updatePlayer)
		.delete(players.deletePlayer);

	// Finish by binding the Player middleware
	app.param('playerId', players.playerByID);
};
