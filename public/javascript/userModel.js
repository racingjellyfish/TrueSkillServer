$(document).ready(function() {
	function UserModel() {
		this.users = ko.observableArray();
	}
	var userModel = new UserModel();

	$.ajax({url: '/users',
		dataType: 'json',
		data: {id:5},
		success: function (data) {
			console.log('users loaded: ', data);
			userModel.users(data);
		},
		error: function (httpRequest, textStatus, errorThrown) {
			console.log('error: ', textStatus, errorThrown);
		}
	});

	ko.applyBindings(userModel);
});
