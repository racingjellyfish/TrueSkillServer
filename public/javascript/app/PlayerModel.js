/**
 * Handles the players in the UI.
 */
define(['knockout', 'app/LeagueTable', 'jquery'], function(ko, LeagueTable) {
	function PlayerModel() {
		this.league = new LeagueTable();
		this.league.load();

		this.teamOne = ko.observable();
		this.teamTwo = ko.observable();
	};

	/**
	 * Submit the current match.
	 */
	PlayerModel.prototype.submit = function() {
		var self = this;
		var postData = {
			teamOne: {
				id: self.teamOne().id,
				name: self.teamOne().name,
				rank: self.teamOne().rank
			},
			teamTwo: {
				id: self.teamTwo().id,
				name: self.teamTwo().name,
				rank: self.teamTwo().rank
			}
		};
		$.post('/calculate', postData, function(returnedData) {
			returnedData.forEach(function(playerData) {
				self.league.addPlayer(ko.mapping.fromJS(playerData));
			});
			self.league.sortPlayers();
		}, 'json');
	};

	return PlayerModel;
});
