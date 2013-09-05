// TODO: move logic to testable class then require it as a module...

$(document).ready(function() {
	function PlayerModel() {
		this.players = ko.observableArray();
		this.teamOne = ko.observable();
		this.teamTwo = ko.observable();
	};
	PlayerModel.prototype.clear = function() {
		this.players().splice(0, this.players().length);
	};
	PlayerModel.prototype.submit = function() {
		console.log('posting: ', this.teamOne(), this.teamTwo());
		var postData = {
			teamOne: ko.mapping.toJS(this.teamOne()),
			teamTwo: ko.mapping.toJS(this.teamTwo())
		};
		$.post("/matchCalculate", postData, function(returnedData) {
			playerModel.clear();
			returnedData.forEach(function(playerData) {
				playerModel.addPlayer(ko.mapping.fromJS(playerData));
			});
		}, "json");
	};
	PlayerModel.prototype.addPlayer = function(player) {
		this.players.push(player);
	};
	var playerModel = new PlayerModel();

	ko.applyBindings(playerModel);

	$.ajax({url: '/players',
		dataType: 'json',
		data: {id:5},
		success: function (data) {
			console.log('players loaded: ', data);
			data.forEach(function(playerData) {
				playerModel.addPlayer(ko.mapping.fromJS(playerData));
			});
		},
		error: function (httpRequest, textStatus, errorThrown) {
			console.log('error: ', textStatus, errorThrown);
		}
	});
});
