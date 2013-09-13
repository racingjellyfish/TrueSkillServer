/**
 * Handles a league table in the UI.
 */
define(['knockout', 'jquery'], function(ko) {
	function LeagueTable() {
		this.players = ko.observableArray();
		this.playerMap = {};
	};

	/**
	 * Load the player data from the server.
	 */
	LeagueTable.prototype.load = function() {
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
	 * Add a player to the league.
	 *
	 * @param player to add to the league
	 */
	LeagueTable.prototype.addPlayer = function(newPlayer) {
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
	 * Sort the players in the league.
	 */
	LeagueTable.prototype.sortPlayers = function() {
		this.players.sort(sort);
	};

		return LeagueTable;
});

function sort(player0, player1) {
	var mean0 = player0.rating.mean();
	var mean1 = player1.rating.mean();
	if (mean0 < mean1) {
		return 1;
	} else if (mean0 > mean1) {
		return -1;
	}
	return 0;
}
