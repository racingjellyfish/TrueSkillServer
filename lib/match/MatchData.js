/**
 * A data object representing a match.
 */
var JsTrueSkill = require('jstrueskill');
var GameInfo = JsTrueSkill.GameInfo;
var Player = JsTrueSkill.Player;
var Rating = JsTrueSkill.Rating;
var Team = JsTrueSkill.Team;

var MatchData = function(req) {
	var gameInfo = GameInfo.getDefaultGameInfo();
	var defaultRating = gameInfo.getDefaultRating();

	console.log(req.body);

	var teamOne = req.body.teamOne;
	var teamTwo = req.body.teamTwo;

	var teamOneMean = teamOne.rating.mean;
	var teamOneStd = teamOne.rating.std;
	var teamOneRank = teamOne.rank;
	var teamTwoMean = teamTwo.rating.mean;
	var teamTwoStd = teamTwo.rating.std;
	var teamTwoRank = teamTwo.rank;

	var teamOneRating = new Rating(teamOneMean, teamOneStd);
	var teamTwoRating = new Rating(teamTwoMean, teamTwoStd);

	var player1 = new Player(teamOne.name);
	var player2 = new Player(teamTwo.name);

	console.log(player1);

	this.players = [player1, player2];

	var team1 = new Team('One', player1, teamOneRating);
	var team2 = new Team('Two', player2, teamTwoRating);

	this.teams = Team.concat(team1, team2);

	this.ranks = [teamOneRank, teamTwoRank];
};

MatchData.prototype.getPlayers = function() {
	return this.players;
};

MatchData.prototype.getTeams = function() {
	return this.teams
};

MatchData.prototype.getTeam = function(index) {
	return this.teams[index];
};

MatchData.prototype.getRanks = function() {
	return this.ranks
};

MatchData.prototype.getRank = function(index) {
	return this.ranks[index];
};

module.exports = MatchData;
