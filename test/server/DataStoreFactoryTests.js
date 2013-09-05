/*
 TODO: implement tests...

 var DataStoreFactory = require('./lib/DataStoreFactory');
 var dataStore = {
 list: function() {
 return [];
 }
 };
 DataStoreFactory.INSTANCE.setPlayerDataStore(dataStore);

exports.throwsWithoutTeamData = function(test) {
	test.throws(( function() {new MatchData(undefined);} ),
		"Expected new MatchData(undefined) to throw");

	var matchJson = {};
	test.throws(( function() {new MatchData(matchJson);} ),
		"Expected new MatchData({}) to throw");

	matchJson = {
		teamOne: {}
	};
	test.throws(( function() {new MatchData(matchJson);} ),
		"Expected new MatchData to throw due to missing teamTwo");

	test.done();
};

exports.teamsMatchJson = function(test) {
	var matchData = new MatchData(MATCH_JSON);

	var player = new Player('Player1');
	var rating = new Rating(25, 25/3);
	var expected = new Team('One', player, rating);
	test.ok(matchData.getTeam(0).equals(expected), "Expected team: " + expected);
	player = new Player('Player2');
	expected = new Team('Two', player, rating);
	test.ok(matchData.getTeam(1).equals(expected), "Expected team: " + expected);

	test.done();
};
*/
