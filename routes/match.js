/*
 * GET TrueSkill calculator.
 */
var express = require('express');
var JsTrueSkill = require('jstrueskill');
var GameInfo = JsTrueSkill.GameInfo;
var Player = JsTrueSkill.Player;
var Rating = JsTrueSkill.Rating;
var Team = JsTrueSkill.Team;
var FactorGraphTrueSkillCalculator = JsTrueSkill.FactorGraphTrueSkillCalculator;

exports.entry = function(req, res){
	var gameInfo = GameInfo.getDefaultGameInfo();

	var defaultRating = gameInfo.getDefaultRating();

	res.render('match', {
		teamOneMean: defaultRating.getMean(),
		teamOneStd: defaultRating.getStandardDeviation(),
		teamOneRank: 1,
		teamTwoMean: defaultRating.getMean(),
		teamTwoStd: defaultRating.getStandardDeviation(),
		teamTwoRank: 2
	});
};

exports.calculate = function(req, res) {
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

	res.render('match', {
		teamOneRating: teamOneRating,
		teamTwoRating: teamTwoRating,
		teamOneNewRating: teamOneNewRating,
		teamTwoNewRating: teamTwoNewRating,
		teamOneMean: teamOneNewRating.getMean(),
		teamOneStd: teamOneNewRating.getStandardDeviation(),
		teamOneRank: 1,
		teamTwoMean: teamTwoNewRating.getMean(),
		teamTwoStd: teamTwoNewRating.getStandardDeviation(),
		teamTwoRank: 2
	});
};
