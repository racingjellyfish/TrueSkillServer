/**
 * Handle TrueSkill calculator requests.
 */
var Calculation = require('../lib/match/Calculation');
var MatchData = require('../lib/match/MatchData');

/**
 * Perform a match calculation.
 *
 * @param req the request from the client
 * @param res the response to be returned to the client
 */
exports.calculate = function(req, res) {
	var matchJson = req.body;
	var matchData = new MatchData(matchJson);

	var calculation = new Calculation(matchData);

	res.send(calculation.run());
};
