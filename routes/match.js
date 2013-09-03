/*
 * Handle match processing.
 */
var express = require('express');
var JsTrueSkill = require('jstrueskill');
var GameInfo = JsTrueSkill.GameInfo;
var FactorGraphTrueSkillCalculator = JsTrueSkill.FactorGraphTrueSkillCalculator;
var MatchData = require('../lib/match/MatchData');

exports.entry = function(req, res) {
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

	var matchJson = req.body;
	var matchData = new MatchData(matchJson);
	var teams = matchData.getTeams();
	var ranks = matchData.getRanks();

	var calculator = new FactorGraphTrueSkillCalculator();

	var newRatings = calculator.calculateNewRatings(gameInfo, teams, ranks);
	var players = matchData.getPlayers();

	var teamOneNewRating = newRatings[players[0]];
	var teamTwoNewRating = newRatings[players[1]];

	var users = [];
	users.push({
		id: 0,
		name: players[0].getId(),
		rank: ranks[0],
		rating: {
			mean: teamOneNewRating.getMean(),
			std: teamOneNewRating.getStandardDeviation()
		}
	});
	users.push({
		id: 1,
		name: players[1].getId(),
		rank: ranks[1],
		rating: {
			mean: teamTwoNewRating.getMean(),
			std: teamTwoNewRating.getStandardDeviation()
		}
	});

	res.send(users);
};
