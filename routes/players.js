/**
 * Handle player related requests.
 */
var DataStoreFactory = require('../lib/DataStoreFactory');

/**
 * Return a list of available players.
 *
 * @param req the request from the client
 * @param res the response to be returned to the client
 */
exports.list = function(req, res) {
	var playerDataStore = DataStoreFactory.INSTANCE.getPlayerDataStore();

	res.send(playerDataStore.list());
};
