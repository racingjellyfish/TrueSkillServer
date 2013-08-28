/*
 * GET TrueSkill calculator.
 */
var express = require('express');
var JsTrueSkill = require('jstrueskill');
var GameInfo = JsTrueSkill.GameInfo;
var FactorGraphTrueSkillCalculator = JsTrueSkill.FactorGraphTrueSkillCalculator;
var MatchData = require('../lib/match/MatchData');

exports.view = function(req, res){
	res.render('knockoutTest', {
	});
};
