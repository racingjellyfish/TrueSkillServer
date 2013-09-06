var Calculation = require('../../../lib/match/Calculation');
var MatchData = require('../../../lib/match/MatchData');
var TestUtil = require('../../libs/TestUtil');

var MATCH_JSON = {
	teamOne: {
		id: 1,
		name: 'Player1',
		rating: {
			mean: 25,
			std: 25/3
		},
		rank: 1
	},
	teamTwo: {
		id: 0,
		name: 'Player2',
		rating: {
			mean: 25,
			std: 25/3
		},
		rank: 2
	}
};

var calculation;
var matchResult;

exports.setUp = function(callback) {
	var matchData = new MatchData(MATCH_JSON);
	calculation = new Calculation(matchData);
	matchResult = calculation.run();

	callback();
};

exports.constructorsOK = function(test) {
	test.ok(calculation !== undefined, "Expected valid Calculation");

	test.ok(matchResult !== undefined, "Expected valid match result");

	test.done();
};

exports.matchResultCalculatedAsExpected = function(test) {
	var updatedPlayers = matchResult;

	var rating = updatedPlayers[0].rating;
	var expected = 29.395831;
	TestUtil.equalsWithTolerance(test, rating.mean, expected, TestUtil.ERROR_TOLERANCE_SMALL,
		'Expected mean of: ' + expected);

	expected = 7.171475;
	TestUtil.equalsWithTolerance(test, rating.std, expected, TestUtil.ERROR_TOLERANCE_SMALL,
		'Expected standard deviation of: ' + expected);

	rating = updatedPlayers[1].rating;
	expected = 20.604168;
	TestUtil.equalsWithTolerance(test, rating.mean, expected, TestUtil.ERROR_TOLERANCE_SMALL,
		'Expected mean of: ' + expected);

	expected = 7.171475;
	TestUtil.equalsWithTolerance(test, rating.std, expected, TestUtil.ERROR_TOLERANCE_SMALL,
		'Expected standard deviation of: ' + expected);

	test.done();
};
