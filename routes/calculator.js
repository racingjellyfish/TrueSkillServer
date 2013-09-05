/**
 * Handle TrueSkill calculator requests.
 */
var express = require('express');
var Calculation = require('../lib/match/Calculation');
var MatchData = require('../lib/match/MatchData');

exports.calculate = function(req, res) {
	var matchJson = req.body;
	var matchData = new MatchData(matchJson);

	var calculation = new Calculation(matchData);

	res.send(calculation.run());
};
