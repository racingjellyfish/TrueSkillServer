/*
 * Handle player requests.
 *
 * TODO: retrieve player data store from a factory to allow for testing...
 */
var DataStoreFactory = require('../lib/DataStoreFactory');
var PlayerDataStore = require('../lib/match/PlayerDataStore');

exports.list = function(req, res) {
	var dataStoreFactory = DataStoreFactory.INSTANCE;

	var playerDataStore = dataStoreFactory.getPlayerDataStore();

	res.send(playerDataStore.list());
};
