requirejs.config({
	// by default load any module IDs from javscript/lib
	baseUrl: 'javascript/lib',
	deps: ['knockout', 'mapping'],
	// configuration callback
	callback: function (ko, mapping) {
		ko.mapping = mapping;
	},
	// except, if the module ID starts with "app",
	// load it from the javascript/app directory.
	// N.B. paths config is relative to the baseUrl,
	// and never includes a ".js" extension since
	// the paths config could be for a directory
	paths: {
		app: '../app',
		bootstrap: 'bootstrap.min',
		jquery: 'jquery-1.7.2.min',
		knockout: 'knockout-2.3.0',
		mapping: 'knockout.mapping-2.4.1'
	},
	shim: {
		mapping: {
			deps: ['knockout'],
			exports: 'mapping'
		}
	}
});

define(['jquery', 'knockout', 'bootstrap'],
	function(jquery, ko) {

		require(['app/PlayerModel'], function(PlayerModel) {
			$(document).ready(function() {
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
		});
	}
);
