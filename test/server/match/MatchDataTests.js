var DataStoreFactory = require('../../../lib/DataStoreFactory');
var MatchData = require('../../../lib/match/MatchData');

var JsTrueSkill = require('jstrueskill');
var Player = JsTrueSkill.Player;
var Rating = JsTrueSkill.Rating;
var Team = JsTrueSkill.Team;

var MATCH_JSON = {
	teamOne: {
		id: '0',
		rank: 1
	},
	teamTwo: {
		id: '1',
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
	var actual = matchData.getTeams().length;
	test.equals(actual, expected, "Number of teams expected: " + expected + "; actual: " + actual);
	actual = matchData.getRanks().length;
	test.equals(actual, expected, "Number of ranks expected: " + expected + "; actual: " + actual);
	actual = matchData.getPlayers().length;
	test.equals(actual, expected, "Number of players expected: " + expected + "; actual: " + actual);

	test.done();
};

exports.teamRanksMatchJson = function(test) {
	var matchData = new MatchData(MATCH_JSON);

	var expected = 1;
	var actual = matchData.getRank(0);
	test.equals(actual, expected, "Expected team one rank of: " + expected + "; actual: " + actual);
	expected = 2;
	actual = matchData.getRank(1);
	test.equals(actual, expected, "Expected team two rank of: " + expected + "; actual: " + actual);

	test.done();
};

exports.playersMatchJson = function(test) {
	_setupPlayerDataStore();

	var matchData = new MatchData(MATCH_JSON);

	var players = matchData.getPlayers();
	var expected = new Player('Player1');
	var actual = players[0];
	test.ok(players[0].equals(expected), "Expected player: " + expected + "; actual: " + actual);
	expected = new Player('Player2');
	actual = players[1];
	test.ok(players[1].equals(expected), "Expected player: " + expected + "; actual: " + actual);

	test.done();
};

exports.teamsMatchJson = function(test) {
	_setupPlayerDataStore();

	var matchData = new MatchData(MATCH_JSON);

	var player = new Player('Player1');
	var rating = new Rating(25, 25/3);
	var expected = new Team('0', player, rating);
	test.ok(matchData.getTeam(0).equals(expected), "Expected team: " + expected + "; actual: " + matchData.getTeam(0));
	player = new Player('Player2');
	expected = new Team('1', player, rating);
	test.ok(matchData.getTeam(1).equals(expected), "Expected team: " + expected + "; actual: " + matchData.getTeam(1));

	test.done();
};

function _setupPlayerDataStore() {
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

	var playerList = [];
	playerList.push(mockPlayer0);
	playerList.push(mockPlayer1);
	var playerMap = {};
	playerMap[mockPlayer0.id] = mockPlayer0;
	playerMap[mockPlayer1.id] = mockPlayer1;

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
