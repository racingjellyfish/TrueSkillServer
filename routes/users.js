/*
 * GET users listing.
 */
exports.list = function(req, res){
	var users = [];
	users.push({name: 'Bob'});
	users.push({name: 'Baldric'});
	res.send(users);
};
