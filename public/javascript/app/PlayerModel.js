/**
 * Handles the players in the UI.
 */
define(['knockout'], function(ko) {
	function PlayerModel() {
		this.players = ko.observableArray();
		this.teamOne = ko.observable();
		this.teamTwo = ko.observable();
	};

	/**
	 * Clear the current model.
	 */
	PlayerModel.prototype.clear = function() {
		this.players().splice(0, this.players().length);
	};

	/**
	 * Submit the current match.
	 */
	PlayerModel.prototype.submit = function() {
		var self = this;
		var postData = {
			teamOne: ko.mapping.toJS(self.teamOne()),
			teamTwo: ko.mapping.toJS(self.teamTwo())
		};
		$.post("/calculate", postData, function(returnedData) {
			self.clear();
			returnedData.forEach(function(playerData) {
				self.addPlayer(ko.mapping.fromJS(playerData));
			});
		}, "json");
	};

	/**
	 * Add a player to the model.
	 *
	 * @param player to add to the match
	 */
	PlayerModel.prototype.addPlayer = function(player) {
		this.players.push(player);
	};

	return PlayerModel;
});
