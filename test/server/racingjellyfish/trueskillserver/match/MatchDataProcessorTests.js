var MatchDataProcessor =
	require('../../../../../lib/racingjellyfish/trueskillserver/match/MatchDataProcessor');

exports.testNoConstructor = function(test) {
	test.ok(typeof MatchDataProcessor !== 'function', 'No constructor expected');

	test.done();
};

exports.testRun = function(test) {
	test.throws(( function() {MatchDataProcessor.run(undefined);} ),
		"Expected run(undefined) to throw");

	var matchData = {};
	test.throws(( function() {MatchDataProcessor.run(matchData);} ),
		"Expected run({}) to throw");

	test.done();
};
