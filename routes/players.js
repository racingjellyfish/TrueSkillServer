/*
 * Handle player requests.
 *
 * TODO: retrieve player data store from a factory to allow for testing...
 */
var PlayerDataStore = require('../lib/match/PlayerDataStore');

exports.list = function(req, res) {
	var playerDataStore = new PlayerDataStore();

	res.send(playerDataStore.list());
};
