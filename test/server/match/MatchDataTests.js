var MatchData = require('../../../lib/match/MatchData');
var JsTrueSkill = require('jstrueskill');
var Player = JsTrueSkill.Player;
var Rating = JsTrueSkill.Rating;
var Team = JsTrueSkill.Team;

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
	var matchData = new MatchData(MATCH_JSON);
	test.ok(matchData !== undefined, "Expected valid MatchData");

	var expected = 2;
	test.equals(matchData.getTeams().length, expected, "Number of teams expected: " + expected);
	test.equals(matchData.getRanks().length, expected, "Number of ranks expected: " + expected);
	test.equals(matchData.getPlayers().length, expected, "Number of players expected: " + expected);

	test.done();
};

exports.teamRanksMatchJson = function(test) {
	var matchData = new MatchData(MATCH_JSON);

	var expected = 1;
	test.equals(matchData.getRank(0), expected, "Expected team one rank of: " + expected);
	expected = 2;
	test.equals(matchData.getRank(1), expected, "Expected team two rank of: " + expected);

	test.done();
};

exports.playersMatchJson = function(test) {
	var matchData = new MatchData(MATCH_JSON);

	var players = matchData.getPlayers();
	var expected = new Player('Player1');
	test.ok(players[0].equals(expected), "Expected player: " + expected);
	expected = new Player('Player2');
	test.ok(players[1].equals(expected), "Expected player: " + expected);

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
