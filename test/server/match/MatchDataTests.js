var MatchData = require('../../../lib/match/MatchData');

exports.throwsWithInvalidData = function(test) {
	test.throws(( function() {new MatchData(undefined);} ),
		"Expected new MatchData(undefined) to throw");

	var matchData = {};
	test.throws(( function() {new MatchData(matchData);} ),
		"Expected new MatchData({}) to throw");

	matchData = {
		teamOne: {}
	};
	test.throws(( function() {new MatchData(matchData);} ),
		"Expected new MatchData to throw due to missing teamTwo");

	test.done();
};
