var DataStoreFactory = require('../../lib/DataStoreFactory');

exports.defaultNotNull = function(test) {
	var playerDataStore = DataStoreFactory.INSTANCE.getPlayerDataStore();
	test.ok(playerDataStore !== undefined, "Expected a valid player data store");

	test.done();
};

exports.mockPlayerDataStoreReturnsPlayers = function(test) {
	_setupPlayerDataStore();

	var playerDataStore = DataStoreFactory.INSTANCE.getPlayerDataStore();
	test.ok(playerDataStore !== undefined, "Expected a valid player data store");

	var players = playerDataStore.list();
	test.ok(players.length > 0, "Expected non-empty array of players");

	test.done();
};

exports.mockPlayerDataStoreReturnsExpectedPlayer = function(test) {
	_setupPlayerDataStore();

	var playerDataStore = DataStoreFactory.INSTANCE.getPlayerDataStore();
	var player = playerDataStore.get(0);
	test.ok(player.name === 'mockPlayer', "Expected non-empty array of players");

	test.done();
};

function _setupPlayerDataStore() {
	var mockPlayer = {
		id: 0,
		name: 'mockPlayer'
	};

	var playerList = [];
	playerList.push(mockPlayer);
	var playerMap = {};
	playerMap[mockPlayer.id] = mockPlayer;

	var mockPlayerDataStore = {
		list: function() {
			return playerList;
		},
		getPlayer: function(id) {
			return playerMap[id];
		},
		update: function(id, rating) {

		}
	};

	DataStoreFactory.INSTANCE.setPlayerDataStore(mockPlayerDataStore);
}
