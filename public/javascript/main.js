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

define(['knockout', 'jquery', 'bootstrap'],
	function(ko) {
		require(['app/PlayerModel'], function(PlayerModel) {
			$(document).ready(function() {
				var playerModel = new PlayerModel();
				ko.applyBindings(playerModel);

				playerModel.league.load();
			});
		});
	}
);
