/**
 * A data object providing access to a player data store.
 *
 * TODO: retrieve players from a DB...
 */
var PlayerDataStore = function(json) {
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
};

PlayerDataStore.prototype.list = function() {
	return this.players;
};

module.exports = PlayerDataStore;

/*
 * Private API.
 */
