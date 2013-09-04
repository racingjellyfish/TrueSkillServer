/**
 * A data object representing a match.
 */
var JsTrueSkill = require('jstrueskill');
var GameInfo = JsTrueSkill.GameInfo;
var Player = JsTrueSkill.Player;
var Rating = JsTrueSkill.Rating;
var Team = JsTrueSkill.Team;

var MatchData = function(json) {
	_validate(json);

	var teamOne = json.teamOne;
	var teamTwo = json.teamTwo;

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
	return this.teams;
};

MatchData.prototype.getTeam = function(index) {
	return this.teams[index];
};

MatchData.prototype.getRanks = function() {
	return this.ranks;
};

MatchData.prototype.getRank = function(index) {
	return this.ranks[index];
};

module.exports = MatchData;

/*
 * Private API.
 */
// TODO: render entity JSON
function _validate(matchJson) {
	var teamOne = matchJson.teamOne;
	if (!teamOne) {
		throw new Error('Match data does not define a teamOne: ' + matchJson);
	} else {
		_validateTeam(teamOne, 'teamOne');
	}

	var teamTwo = matchJson.teamTwo;
	if (!teamTwo) {
		throw new Error('Match data does not define a teamTwo: ' + matchJson);
	} else {
		_validateTeam(teamTwo, 'teamTwo');
	}
}

function _validateTeam(teamJson, entity) {
	if (teamJson.id === undefined) {
		throw new Error('Match data does not define an ID for ' + entity + ': ' + teamJson);
	}
	if (teamJson.rank === undefined) {
		throw new Error('Match data does not define a rank for ' + entity + ': ' + teamJson);
	}
	if (teamJson.rating === undefined) {
		throw new Error('Match data does not define a rating for ' + entity + ': ' + teamJson);
	} else {
		_validateRating(teamJson.rating, entity);
	}
}

function _validateRating(ratingJson, entity) {
	if (ratingJson.mean === undefined) {
		throw new Error('Match data does not define a rating mean for ' + entity + ': ' + ratingJson);
	}
	if (ratingJson.std === undefined) {
		throw new Error('Match data does not define a rating mstd for ' + entity + ': ' + ratingJson);
	}
}
