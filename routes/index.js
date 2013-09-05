/**
 * Handle the home page.
 *
 * TODO: add navigation support, admin support, etc.
 */
exports.index = function(req, res) {
	res.render('index', { title: 'TrueSkill Server' });
};
