/**
 * Handles the players in the UI.
 */
define(['knockout', 'knockout.mapping'], function(ko, komapping) {
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
					teamOne: komapping.toJS(self.teamOne()),
					teamTwo: komapping.toJS(self.teamTwo())
				};
				$.post("/calculate", postData, function(returnedData) {
					self.clear();
					returnedData.forEach(function(playerData) {
						self.addPlayer(komapping.fromJS(playerData));
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
