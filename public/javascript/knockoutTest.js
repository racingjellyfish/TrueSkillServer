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

	$.ajax({url: '/userData',
		dataType: 'json',
		data: {id:5},
		success: function (data) {
			console.log('data loaded: ', data);
			viewModel.firstName (data.firstName);
		},
		error: function (httpRequest, textStatus, errorThrown) {
			console.log('data loaded: ', httpRequest, textStatus, errorThrown);
			viewModel.firstName (data.firstName);
		}
	});

	ko.applyBindings(viewModel);
});
