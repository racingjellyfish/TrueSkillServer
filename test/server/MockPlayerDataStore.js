/**
 * A utility object providing a mock player data store.
 */

/**
 * @constructor
 */
var MockPlayerDataStore = function() {
	this.playerMap = {};
	this.players = [];
};

/**
 * Initialise with some mock data.
 */
MockPlayerDataStore.prototype.init = function() {
	var player = {
		id: 0,
		name: 'Bob',
		rank: 1,
		rating: {
			mean: 25,
			std: 25/3
		}
	};
	this.add(player);

	player = {
		id: 1,
		name: 'Baldric',
		rank: 2,
		rating: {
			mean: 25,
			std: 25/3
		}
	};
	this.add(player);

	player = {
		id: 2,
		name: 'Edmund',
		rank: 3,
		rating: {
			mean: 25,
			std: 25/3
		}
	};
	this.add(player);
};

/**
 * Add a player to the data store.
 *
 * @param player to add to the store
 */
MockPlayerDataStore.prototype.add = function(player) {
	this.playerMap[player.id] = player;
	this.players.push(player);
};

/**
 * Return the list of current players.
 *
 * @returns {Array} of players
 */
MockPlayerDataStore.prototype.list = function() {
	return this.players;
};

/**
 * Get the player with specified ID.
 *
 * @param id of the player to return
 * @returns {Player}
 */
MockPlayerDataStore.prototype.get = function(id) {
	var player = this.playerMap[id];

	if (player === undefined) {
		throw new Error('No player found with the specified ID: ', id);
	}

	return player;
};

/**
 * Update the player with specified ID.
 *
 * @param id of the player to update
 * @param rating new rating
 * @returns {Player}
 */
MockPlayerDataStore.prototype.update = function(id, rating) {
	var player = this.playerMap[id];

	if (player === undefined) {
		throw new Error('No player found with the specified ID: ', id);
	}

	player.rating = rating;
};

module.exports = MockPlayerDataStore;

/*
 * Private API.
 */
