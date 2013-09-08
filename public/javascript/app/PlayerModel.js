/**
 * Handles the players in the UI.
 */
define([], function() {
		return {
			players: ko.observableArray(),
			teamOne: ko.observable(),
			teamTwo: ko.observable(),
			/**
			 * Clear the current model.
			 */
			clear: function() {
				this.players().splice(0, this.players().length);
			},
			/**
			 * Submit the current match.
			 */
			submit: function() {
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
			},
			/**
			 * Add a player to the model.
			 *
			 * @param player to add to the match
			 */
			addPlayer: function(player) {
				this.players.push(player);
			}
		}
	}
);
