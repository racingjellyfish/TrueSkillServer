/**
 * A utility object providing access to a player data store.
 *
 * TODO: retrieve players from a DB...
 */

/**
 * @constructor
 */
var PlayerDataStore = function() {
	this.players = [];

	this.players.push({
		id: 0,
		name: 'Bob',
		rank: 1,
		rating: {
			mean: 25,
			std: 25/3
		}
	});
	this.players.push({
		id: 1,
		name: 'Baldric',
		rank: 2,
		rating: {
			mean: 25,
			std: 25/3
		}
	});
	this.players.push({
		id: 2,
		name: 'Edmund',
		rank: 2,
		rating: {
			mean: 25,
			std: 25/3
		}
	});
};

/**
 * Return the list of current players.
 *
 * @returns {Array} of players
 */
PlayerDataStore.prototype.list = function() {
	return this.players;
};

module.exports = PlayerDataStore;

/*
 * Private API.
 */
