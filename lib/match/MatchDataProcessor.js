/**
 * Processes the JSON data object representing a match.
 */
exports.run = function(matchData) {
	_validate(matchData);
};

function _validate(matchData) {
	if (!matchData.teams) {
		throw new Error('Match data does not define any teams: ' + matchData);
	}
}
