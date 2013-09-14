/**
 * A utility object providing access to a player data store.
 *
 * TODO: retrieve players from a DB...
 */

/**
 * @constructor
 */
var PlayerDataStore = function() {
	this.playerMap = {};
	this.players = [];

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
PlayerDataStore.prototype.add = function(player) {
	this.playerMap[player.id] = player;
	this.players.push(player);
};

/**
 * Return the list of current players.
 *
 * @returns {Array} of players
 */
PlayerDataStore.prototype.list = function() {
	return this.players;
};

/**
 * Get the player with specified ID.
 *
 * @param id of the player to return
 * @returns {Player}
 */
PlayerDataStore.prototype.getPlayer = function(id) {
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
PlayerDataStore.prototype.update = function(id, rating) {
	var player = this.playerMap[id];

	if (player === undefined) {
		throw new Error('No player found with the specified ID: ', id);
	}

	player.rating = rating;
};

module.exports = PlayerDataStore;

/*
 * Private API.
 */
