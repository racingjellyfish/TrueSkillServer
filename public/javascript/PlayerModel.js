/**
 * Handles the players in the UI.
 */

/**
 * @constructor
 */
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
	console.log('posting: ', this.teamOne(), this.teamTwo());
	var postData = {
		teamOne: ko.mapping.toJS(this.teamOne()),
		teamTwo: ko.mapping.toJS(this.teamTwo())
	};
	$.post("/calculate", postData, function(returnedData) {
		playerModel.clear();
		returnedData.forEach(function(playerData) {
			playerModel.addPlayer(ko.mapping.fromJS(playerData));
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
