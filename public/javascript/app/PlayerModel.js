/**
 * Handles the players in the UI.
 */
define(['knockout', 'jquery'], function(ko) {
	function PlayerModel() {
		// TODO: sort players...
		this.players = ko.observableArray();
		this.teamOne = ko.observable();
		this.teamTwo = ko.observable();

		this.playerMap = {};
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
				data.forEach(function(playerData) {
					self.addPlayer(ko.mapping.fromJS(playerData));
				});
				self.sortPlayers();
			},
			error: function (httpRequest, textStatus, errorThrown) {
				console.log('error: ', textStatus, errorThrown);
			}
		});
	};

	/**
	 * Add a player to the model.
	 *
	 * @param player to add to the model
	 */
	PlayerModel.prototype.addPlayer = function(newPlayer) {
		var player = this.playerMap[newPlayer.id()];

		if (player) {
			for (var playerIndex = 0; playerIndex < this.players().length; playerIndex++) {
				if (Number(this.players()[playerIndex].id()) === Number(newPlayer.id())) {
					this.players()[playerIndex] = newPlayer;
				}
			}
		} else {
			this.players.push(newPlayer);
		}
		this.playerMap[newPlayer.id()] = newPlayer;
	};

	/**
	 * Sort the players in the model.
	 */
	PlayerModel.prototype.sortPlayers = function() {
		this.players.sort(this._sort);
	};

	PlayerModel.prototype._sort = function(player0, player1) {
		var mean0 = player0.rating.mean();
		var mean1 = player1.rating.mean();
		if (mean0 < mean1) {
			return 1;
		} else if (mean0 > mean1) {
			return -1;
		}
		return 0;
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
		$.post('/calculate', postData, function(returnedData) {
			returnedData.forEach(function(playerData) {
				self.addPlayer(ko.mapping.fromJS(playerData));
			});
			self.sortPlayers();
		}, 'json');
	};

	/**
	 * Clear the current model.
	 */
	PlayerModel.prototype.clear = function() {
		this.players().splice(0, this.players().length);
	};

	return PlayerModel;
});
