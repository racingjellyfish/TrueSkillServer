var MatchData = require('../../../lib/match/MatchData');

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

exports.throwsWithEmptyTeamData = function(test) {
	var matchJson = {
		teamOne: {},
		teamTwo: {}
	};
	test.throws(( function() {new MatchData(matchJson);} ),
		"Expected new MatchData to throw with empty team objects");

	test.done();
};

exports.okWithValidData = function(test) {
	var matchJson = {
		teamOne: {
			id: 1,
			rating: {
				mean: 25,
				std: 25/3
			},
			rank: 1
		},
		teamTwo: {
			id: 0,
			rating: {
				mean: 25,
				std: 25/3
			},
			rank: 2
		}
	};
	var matchData = new MatchData(matchJson);
	test.ok(matchData !== undefined, "Expected valid MatchData");

	var expected = 2;
	test.equals(matchData.getTeams().length, expected, "Number of teams expected: " + expected);
	test.equals(matchData.getRanks().length, expected, "Number of ranks expected: " + expected);
	test.equals(matchData.getPlayers().length, expected, "Number of players expected: " + expected);

	test.done();
};
