'use strict';

module.exports = function(app) {
    var channels = require('../controllers/chat-channels.server.controller.js');

    // Messages Routes
    app.route('/api/chatchannel').all()
        .get(channels.list)
        .post(channels.create);

    app.route('/api/chatchannel/:channelId')
        .get(channels.read)
        .put(channels.update)
        .delete(channels.delete);

    // Finish by binding the Message middleware
    app.param('channelId', channels.channelByID);
};
