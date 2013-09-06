/**
 * A factory for producing data stores.
 */
var PlayerDataStore = require('./match/PlayerDataStore');

/**
 * The default player data store.
 *
 * @type {PlayerDataStore}
 */
var DEFAULT_PLAYER_DATA_STORE = new PlayerDataStore();

/**
 * @constructor
 */
var DataStoreFactory = function() {
	this.playerDataStore = DEFAULT_PLAYER_DATA_STORE;
};

DataStoreFactory.INSTANCE = new DataStoreFactory();

/**
 * Override the default player data store.
 *
 * @param playerDataStore to override the default
 */
DataStoreFactory.prototype.setPlayerDataStore = function(playerDataStore) {
	this.playerDataStore = playerDataStore;
};

/**
 * Return the player data store.
 *
 * @returns {PlayerDataStore}
 */
DataStoreFactory.prototype.getPlayerDataStore = function() {
	return this.playerDataStore;
};

module.exports = DataStoreFactory;

/*
 * Private API.
 */
