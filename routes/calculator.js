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
	var gameInfo = GameInfo.getDefaultGameInfo();

	var defaultRating = gameInfo.getDefaultRating();

	var teamOneMean = req.param('teamOneMean') || defaultRating.getMean();
	var teamOneStd = req.param('teamOneStd') || defaultRating.getStandardDeviation();
	var teamOneRank = req.param('teamOneRank') || 1;
	var teamTwoMean = req.param('teamTwoMean') || defaultRating.getMean();
	var teamTwoStd = req.param('teamTwoStd') || defaultRating.getStandardDeviation();
	var teamTwoRank = req.param('teamTwoRank') || 2;

	var teamOneRating = new Rating(teamOneMean, teamOneStd);
	var teamTwoRating = new Rating(teamTwoMean, teamTwoStd);

	var player1 = new Player('1');
	var player2 = new Player('2');

	var team1 = new Team('One', player1, teamOneRating);
	var team2 = new Team('Two', player2, teamTwoRating);

	var teams = Team.concat(team1, team2);

	var calculator = new FactorGraphTrueSkillCalculator();

	var newRatings = calculator.calculateNewRatings(gameInfo, teams, [teamOneRank, teamTwoRank]);
	var teamOneNewRating = newRatings[player1];
	var teamTwoNewRating = newRatings[player2];

	res.render('calculation', {
		teamOneRating: teamOneRating,
		teamTwoRating: teamTwoRating,
		teamOneNewRating: teamOneNewRating,
		teamTwoNewRating: teamTwoNewRating
	});
};
