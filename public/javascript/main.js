requirejs.config({
	// by default load any module IDs from javscript/lib
	baseUrl: 'javascript/lib',
	// except, if the module ID starts with "app",
	// load it from the javascript/app directory.
	// N.B. paths config is relative to the baseUrl,
	// and never includes a ".js" extension since
	// the paths config could be for a directory
	paths: {
		app: '../app'
	}
});

define(['jquery.min', 'knockout', 'knockout.mapping', 'bootstrap.min'],
	function(jquery, ko, komapping) {

	requirejs(['app/PlayerModel'], function(playerModel) {
		$(document).ready(function() {
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
});
