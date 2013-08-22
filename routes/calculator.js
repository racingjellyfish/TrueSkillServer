/*
 * GET TrueSkill calculator.
 */
var GameInfo = require('jstrueskill').GameInfo;
var Player = require('jstrueskill').Player;
var Rating = require('jstrueskill').Rating;
var Team = require('jstrueskill').Team;
var FactorGraphTrueSkillCalculator = require('jstrueskill').FactorGraphTrueSkillCalculator;
var express = require('express');

exports.calculate = function(req, res){
	var teamOneMean = req.param('teamOneMean');
	var teamOneStd = req.param('teamOneStd');
	var teamOneRank = req.param('teamOneRank');
	var teamTwoMean = req.param('teamTwoMean');
	var teamTwoStd = req.param('teamTwoStd');
	var teamTwoRank = req.param('teamTwoRank');

	var teamOneRating = new Rating(teamOneMean, teamOneStd);
	var teamTwoRating = new Rating(teamTwoMean, teamTwoStd);

	var gameInfo = GameInfo.getDefaultGameInfo();

	var player1 = new Player('1');
	var player2 = new Player('2');

	var team1 = new Team('One', player1, teamOneRating);
	var team2 = new Team('Two', player2, teamTwoRating);

	var teams = Team.concat(team1, team2);

	var calculator = new FactorGraphTrueSkillCalculator();

	var newRatings = calculator.calculateNewRatings(gameInfo, teams, [1, 2]);
	var teamOneNewRating = newRatings[player1];
	var teamTwoNewRating = newRatings[player2];

	res.render('calculation', {
		teamOneRating: teamOneRating,
		teamTwoRating: teamTwoRating,
		teamOneNewRating: teamOneNewRating,
		teamTwoNewRating: teamTwoNewRating
	});
};
