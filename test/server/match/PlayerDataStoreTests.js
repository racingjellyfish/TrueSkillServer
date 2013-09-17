var DataStoreFactory = require('../../../lib/DataStoreFactory');

exports.throwsWhenGettingNonExistentPlayer = function(test) {
	_setupPlayerDataStore();

	var playerDataStore = DataStoreFactory.INSTANCE.getPlayerDataStore();

	test.throws(( function() {playerDataStore.get(2);} ),
		"Expected get for non-existent player to throw");

	test.done();
};

exports.throwsWhenUpdatingNonExistentPlayer = function(test) {
	_setupPlayerDataStore();

	var playerDataStore = DataStoreFactory.INSTANCE.getPlayerDataStore();

	test.throws(( function() {playerDataStore.update(2);} ),
		"Expected update to non-existent player to throw");

	test.done();
};

function _setupPlayerDataStore() {
	var playerDataStore = DataStoreFactory.INSTANCE.getPlayerDataStore();

	var mockPlayer0 = {
		id: 0,
		name: 'Player1',
		rating: {
			mean: 25,
			std: 25/3
		}
	};
	var mockPlayer1 = {
		id: 1,
		name: 'Player2',
		rating: {
			mean: 25,
			std: 25/3
		}
	};

	playerDataStore.add(mockPlayer0);
	playerDataStore.add(mockPlayer1);
}
