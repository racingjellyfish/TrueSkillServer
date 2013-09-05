/**
 * A factory for producing data stores.
 */
var PlayerDataStore = require('./match/PlayerDataStore');

var DEFAULT_PLAYER_DATA_STORE = new PlayerDataStore();

var DataStoreFactory = function() {
	this.playerDataStore = DEFAULT_PLAYER_DATA_STORE;
};

DataStoreFactory.INSTANCE = new DataStoreFactory();

DataStoreFactory.prototype.setPlayerDataStore = function(playerDataStore) {
	this.playerDataStore = playerDataStore;
};

DataStoreFactory.prototype.getPlayerDataStore = function() {
	return this.playerDataStore;
};

module.exports = DataStoreFactory;

/*
 * Private API.
 */
