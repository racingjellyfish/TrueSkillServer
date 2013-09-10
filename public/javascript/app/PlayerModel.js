/**
 * Handles the players in the UI.
 */
define(['knockout', 'jquery'], function(ko) {
	function PlayerModel() {
		this.players = ko.observableArray();
		this.teamOne = ko.observable();
		this.teamTwo = ko.observable();
	};

	/**
	 * Load the player data from the server.
	 */
	PlayerModel.prototype.load = function() {
		var self = this;

		$.ajax({url: '/players',
			dataType: 'json',
			data: {id:5},
			success: function (data) {
				console.log('players loaded: ', data);
				data.forEach(function(playerData) {
					self.addPlayer(ko.mapping.fromJS(playerData));
				});
			},
			error: function (httpRequest, textStatus, errorThrown) {
				console.log('error: ', textStatus, errorThrown);
			}
		});
	};

	/**
	 * Add a player to the model.
	 *
	 * @param player to add to the match
	 */
	PlayerModel.prototype.addPlayer = function(player) {
		this.players.push(player);
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
	 * Clear the current model.
	 */
	PlayerModel.prototype.clear = function() {
		this.players().splice(0, this.players().length);
	};

	return PlayerModel;
});
