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
	var users = req.body.users;
	console.log(users);
	console.log(Array.isArray(users));
	console.log(typeof users);

	var teamOne = users[0];
	var teamTwo = users[1];
	console.log(teamOne);
	console.log(teamTwo);

	var teamOneMean = teamOne.rating.mean;
	var teamOneStd = teamOne.rating.std;
	var teamOneRank = req.param('teamOneRank') || 1;
	var teamTwoMean = teamTwo.rating.mean;
	var teamTwoStd = teamTwo.rating.std;
	var teamTwoRank = req.param('teamTwoRank') || 2;

	var teamOneRating = new Rating(teamOneMean, teamOneStd);
	var teamTwoRating = new Rating(teamTwoMean, teamTwoStd);

	var player1 = new Player('1');
	var player2 = new Player('2');

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
