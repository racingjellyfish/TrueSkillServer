$(document).ready(function() {
	requirejs(['PlayerModel'], function(playerModel) {
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
});
