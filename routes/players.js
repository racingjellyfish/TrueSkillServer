/*
 * Handle player requests.
 *
 * TODO: retrieve players from a DB...
 */
exports.list = function(req, res) {
	var users = [];
	users.push({
		id: 0,
		name: 'Bob',
		rank: 1,
		rating: {
			mean: 25,
			std: 25/3
		}
	});
	users.push({
		id: 1,
		name: 'Baldric',
		rank: 2,
		rating: {
			mean: 25,
			std: 25/3
		}
	});

	res.send(users);
};
