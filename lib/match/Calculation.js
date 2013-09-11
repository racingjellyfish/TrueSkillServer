/**
 * A utility object for performing match calculations.
 */
var JsTrueSkill = require('jstrueskill');
var FactorGraphTrueSkillCalculator = JsTrueSkill.FactorGraphTrueSkillCalculator;
var GameInfo = JsTrueSkill.GameInfo;
var Player = JsTrueSkill.Player;
var Rating = JsTrueSkill.Rating;
var Team = JsTrueSkill.Team;

/**
 * @param matchData data object defining the match to calculate.
 * @constructor
 */
var Calculation = function(matchData) {
	this.matchData = matchData;
};

/**
 * Run the calculation.
 *
 * @returns {Array} of updated player ratings
 */
Calculation.prototype.run = function() {
	var gameInfo = GameInfo.getDefaultGameInfo();

	var teams = this.matchData.getTeams();
	var ranks = this.matchData.getRanks();

	var calculator = new FactorGraphTrueSkillCalculator();

	var newRatings = calculator.calculateNewRatings(gameInfo, teams, ranks);
	var players = this.matchData.getPlayers();

	var teamOneNewRating = newRatings[players[0]];
	var teamTwoNewRating = newRatings[players[1]];

	// TODO: Merge with original player list...
	var updatedPlayers = [];
	updatedPlayers.push({
		id: 0,
		name: players[0].getId(),
		rank: ranks[0],
		rating: {
			mean: teamOneNewRating.getMean(),
			std: teamOneNewRating.getStandardDeviation()
		}
	});
	updatedPlayers.push({
		id: 1,
		name: players[1].getId(),
		rank: ranks[1],
		rating: {
			mean: teamTwoNewRating.getMean(),
			std: teamTwoNewRating.getStandardDeviation()
		}
	});

	return updatedPlayers;
};

module.exports = Calculation;

/*
 * Private API.
 */
