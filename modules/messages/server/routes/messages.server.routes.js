'use strict';

module.exports = function(app) {
	var messages = require('../controllers/messages.server.controller');
	var messagesPolicy = require('../policies/messages.server.policy');

	// Messages Routes
	app.route('/api/messages').all()
		.get(messages.getMyMessages).all(messagesPolicy.isAllowed)
		.post(messages.createMessage);

	app.route('/api/messages/:messageId').all(messagesPolicy.isAllowed)
		.get(messages.getMessage)
		.delete(messages.deleteMessage);

	// Finish by binding the Message middleware
	app.param('messageId', messages.messageByID);
};
