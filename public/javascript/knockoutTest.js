$(document).ready(function() {
	function ViewModel() {
		this.firstName = ko.observable("Bert");
		this.lastName = ko.observable("Berlington");

		this.fullName = ko.computed(function(){
			return this.firstName() + " " + this.lastName();
		}, this);

		this.capitalizeLastName = function(){
			var currentVal = this.lastName();
			this.lastName(currentVal.toUpperCase());
		};
	}
	var viewModel = new ViewModel();

	$.ajax({ url: '/userData',
		data: {id:5},
		dataType: 'jsonp'
	}).done(function (data) {
			console.log('data loaded: ', data);
			viewModel.firstName (data.firstName);
		});

	ko.applyBindings(viewModel);
});
