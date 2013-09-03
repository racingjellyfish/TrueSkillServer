$(document).ready(function() {
	function UserModel() {
		this.users = ko.observableArray();
		this.teamOne = ko.observable();
		this.teamTwo = ko.observable();
	};
	UserModel.prototype.clear = function() {
		this.users().splice(0, this.users().length);
	};
	UserModel.prototype.submit = function() {
		console.log('posting: ', this.teamOne(), this.teamTwo());
		var postData = {
			teamOne: ko.mapping.toJS(this.teamOne()),
			teamTwo: ko.mapping.toJS(this.teamTwo())
		};
		$.post("/matchCalculate", postData, function(returnedData) {
			userModel.clear();
			returnedData.forEach(function(userData) {
				userModel.addUser(ko.mapping.fromJS(userData));
			});
		}, "json");
	};
	UserModel.prototype.addUser = function(user) {
		this.users.push(user);
	};
	var userModel = new UserModel();

	ko.applyBindings(userModel);

	$.ajax({url: '/users',
		dataType: 'json',
		data: {id:5},
		success: function (data) {
			console.log('users loaded: ', data);
			data.forEach(function(userData) {
				userModel.addUser(ko.mapping.fromJS(userData));
			});
		},
		error: function (httpRequest, textStatus, errorThrown) {
			console.log('error: ', textStatus, errorThrown);
		}
	});
});
