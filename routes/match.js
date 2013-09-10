/**
 * Handle match related requests.
 */

/**
 * Return the data for a creating a match.
 *
 * @param req the request from the client
 * @param res the response to be returned to the client
 */
exports.create = function(req, res) {
	res.render('match', {showDebug: req.query.showDebug});
};
