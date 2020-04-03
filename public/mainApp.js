//List FUNCTION// GET (COLLECTION) REQUEST
//https://marvel-glass-cleaning-passport.herokuapp.com/
var getAppointmentsFromServer = function () {
  return fetch("https://marvel-glass-cleaning-passport.herokuapp.com/appointments", {
	credentials: "include"
  });
};



//RETRIVE FUNCTION// GET (MEMBER) REQUEST
var getAppointmentFromServer = function (_id) {
  return fetch("https://marvel-glass-cleaning-passport.herokuapp.com/appointments" + _id, {
	credentials: "include" 
  });
};


//CREATE FUNCTION // POST (Member) REQUEST
var createAppointmentOnServer = function(newName, newDate, newAddress, newPhone, newEmail, newNotes, newTime) {
	var data = `name=${encodeURIComponent(newName)}`;
	data += `&date=${encodeURIComponent(newDate)}`;
	data += `&address=${encodeURIComponent(newAddress)}`;
	data += `&phone=${encodeURIComponent(newPhone)}`;
	data += `&email=${encodeURIComponent(newEmail)}`;
	data += `&notes=${encodeURIComponent(newNotes)}`;
	data += `&time=${encodeURIComponent(newTime)}`;
	return fetch("https://marvel-glass-cleaning-passport.herokuapp.com/appointments", {
		body: data,
		method: "POST",
		credentials: "include",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		}
	});
};

//UPDATE FUNCTION // PUT (MEMBER) REQUEST
var updateAppointmentOnServer = function( _id, newName, newDate, newAddress, newPhone, newEmail, newNotes, newTime) {
	var data = `id=${encodeURIComponent(_id)}`;
	data += `&name=${encodeURIComponent(newName)}`;
	data += `&date=${encodeURIComponent(newDate)}`;
	data += `&address=${encodeURIComponent(newAddress)}`;
	data += `&phone=${encodeURIComponent(newPhone)}`;
	data += `&email=${encodeURIComponent(newEmail)}`;
	data += `&notes=${encodeURIComponent(newNotes)}`;
	data += `&time=${encodeURIComponent(newTime)}`;
	return fetch("https://marvel-glass-cleaning-passport.herokuapp.com/appointments/" + _id, {
		body: data,
		method: "PUT",
		credentials: "include",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		}
	});

};

var deleteAppointmentOnServer = function(_id) {
	return fetch("https://marvel-glass-cleaning-services.herokuapp.com/appointments/" + _id, {
		method: "DELETE",
		credentials: "include",
	});

};

var createSessionOnServer = function( email, password) {
	var data = `email=${encodeURIComponent(email)}`;
	data += `&plainTextPassword=${encodeURIComponent(password)}`;
	return fetch("https://marvel-glass-cleaning-passport.herokuapp.com/sessions",  {
		body: data,
		method: "POST",
		credentials: "include",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		}
	});
};

var createUserOnServer = function( firstname, email, password) {
	var data = `email=${encodeURIComponent(email)}`;
	data += `&firstName=${encodeURIComponent(password)}`;
	data += `&plainTextPassword=${encodeURIComponent(password)}`;
	return fetch("https://marvel-glass-cleaning-passport.herokuapp.com/users",  {
		body: data,
		method: "POST",
		credentials: "include",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		}
	});
};

var getSessionFromServer = function () {
	return fetch("https://marvel-glass-cleaning-passport.herokuapp.com/sessions",  {
		credentials: "include",
	});	
};


var app = new Vue({
	el: "#app",
	data: {
		newDate: "",
		newName: "",
		newPhone: "",
		newEmail: "",
		newAddress: "",
		newNotes: "",
		newTime: "",
		id: "",
		retrieveId: "",
		showRetrieveDiv: false,
		retrievedAppointment: {},
		appointments: [],
		showUpdateDiv: false,
		showCreateDiv: false,
		showSignInDiv: false,
		showCreateAccountDiv: false,
		showHeroDiv: true,
		showContentDiv: false,
		createFormEmail: "",
		createFormPassword: "",
		createFormFirstName: "",
		signInFormEmail: "",
		signInFormPassword: "",
		showExistingEmailWarning: false,
		showWrongEmailPass: false,
		errs: [],

	},
	methods: {

		validateAppointment: function() {
			this.errs = [];
			if(this.newDate == "") {
				this.errs.push("Appointment Date must be set.");
			}
			if(this.newName == "") {
				this.errs.push("Please Supply a Name for this appointment.");
			}
			if (this.newPhone == "") {
				this.errs.push("Please Supply a Phone Number for this appointment.");
			} if (this.newAddress == "") {
				this.errs.push("Please supply an address for this appointment.");
			}
			if (this.newTime == "") {
				this.errs.push("This appointment must have a scheduled time.");
			}
			if(this.errs.length > 0) {
				return false;
			} else {
				return true;
			}
		},

		onClickShowCreate: function () {
			this.showCreateDiv = true;
			this.showUpdateDiv = false;
			this.id = "";
			this.newName = "";
			this.newDate = "";
			this.newAddress = "";
			this.newPhone = "";
			this.newEmail = "";
			this.newNotes = "";
			this.newTime = "";
			this.showRetrieveDiv = false;
		},

		onClickShowCreateAccountDiv: function () {
			this.showCreateAccountDiv = true;
			this.showSignInDiv = false;
			this.showHeroDiv = false;

		},

		onClickShowSignInDiv: function () {
			this.showCreateAccountDiv = false;
			this.showSignInDiv = true;
			this.showHeroDiv = false;

		},

		onClickShowUpdate: function () {
			this.showUpdateDiv = true;
			this.showCreateDiv = false;
			this.showRetrieveDiv = false;
		},

		listAppointments: function () {
			this.getSession();
			getAppointmentsFromServer().then((response) => {
				response.json().then((appointments) => {
					this.appointments = appointments;
				});
			});
		},

		saveAppointmentToServer: function () {
			// var createAppointmentOnServer = function(newName, newDate, newAddress, newPhone, newEmail, newNotes, newTime) {
			this.errs = [];
			
			if(this.validateAppointment()){

				createAppointmentOnServer( this.newName, this.newDate, this.newAddress, this.newPhone, this.newEmail, this.newNotes, this.newTime).then((response) => {
					if(response.status == 201) {
						this.showRetrieveDiv = false;
						this.showCreateDiv = false;
						this.listAppointments();
						this.newName = "";
						this.newDate = "";
						this.newAddress = "";
						this.newPhone = "";
						this.newEmail = "";
						this.newNotes = "";
						this.newTime = "";
					} else if(response.status == 422) {
						alert("Data could not be validated on server. Please double check your data and try again.");
					} else {
						alert("Unexpected Error. Request could not be proccessed.");
					}
				});
			}	
	},
		updateAppointment: function( ) {
			// var updateAppointmentOnServer = function( _id, newName, newDate, newAddress, newPhone, newEmail, newNotes, newTime) {
			if(this.validateAppointment()) {
				updateAppointmentOnServer( this.id, this.newName, this.newDate, this.newAddress, this.newPhone, this.newEmail, this.newNotes, this.newTime).then((response) => {
					if(response.status == 200) {
						this.showRetrieveDiv = false;
						this.listAppointments();
						this.newName = "";
						this.newDate = "";
						this.newAddress = "";
						this.newPhone = "";
						this.newEmail = "";
						this.newNotes = "";
						this.newTime = "";
						this.id = "";
						this.showUpdateDiv = false;
						alert("Appointment Updated Successfully.");
					} else if(response.status == 422) {
						alert("Data could not be validated on server. Please double check your data and try again.");
					} else {
						alert("Unexpected Error. Request could not be proccessed.");
					}

				});
			}
		
		},

		populateUpdateFields: function ( appt ) {
			this.showRetrieveDiv = false;
			this.id = appt._id;
			this.newName = appt.name;
			this.newDate = appt.date;
			this.newAddress = appt.address;
			this.newPhone = appt.phone;
			this.newEmail = appt.email;
			this.newNotes = appt.notes;
			this.newTime = appt.time;
			this.onClickShowUpdate();
		},
		retrieveAppointment: function( appt ) {
			this.showRetrieveDiv = true;
			getAppointmentFromServer(appt._id).then((response) => {
				response.json().then((appointment) => {
				this.retrievedAppointment = appointment;

				});

			});

		},

		deleteAppointment: function( appt ) {
			//var deleteAppointmentOnServer = function(_id) {
			var r = confirm("Delete this Appointment?");
			if(r == true) {
				deleteAppointmentOnServer(appt._id).then((response) => {

						if(response.status == 200) {
							this.listAppointments();
						} else if(response.status == 422) {
							alert("Data could not be validated on server. Please double check your data and try again.");
						} else {
							alert("Unexpected Error. Request could not be proccessed.");
						}
				});
			}
		},

		onClickCreateUser: function () {
			createUserOnServer( this.createFormFirstName, this.createFormEmail, this.createPassword).then((response) => {
				if(response.status == 201) {
						this.showCreateAccountDiv = false;
						this.showSignInDiv = false;
						this.showHeroDiv = false;
						this.showContentDiv = true;
						this.createFormEmail =  "";
						this.createFormPassword = "";
						this.createFormFirstName = "";
						this.signInFormEmail = "";
						this.signInFormPassword = "";
						this.showExistingEmailWarning = false;
						this.showWrongEmailPass = false;
						this.listAppointments();
						this.getSession();
				} else { 
					this.showExistingEmailWarning = true;
				}

			});


		},
		
		createSession: function () {
			createSessionOnServer( this.signInFormEmail, this.signInFormPassword).then((response) => {
				if(response.status == 201) {
						this.showCreateAccountDiv = false;
						this.showSignInDiv = false;
						this.showHeroDiv = false;
						this.showContentDiv = true;
						this.createFormEmail =  "";
						this.createFormPassword = "";
						this.createFormFirstName = "";
						this.signInFormEmail = "";
						this.signInFormPassword = "";
						this.showExistingEmailWarning = false;
						this.showWrongEmailPass = false;
						this.listAppointments();
						this.getSession();
				} else { 
					this.showWrongEmailPass = true;
				}

			});

		},

		getSession: function () {
			getSessionFromServer().then((response) => {
				console.log(response.status);
				if(response.status == 200) {
						this.showSignInDiv = false;
						this.showHeroDiv = false;
						this.showContentDiv = true;
						this.createFormEmail =  "";
						this.createFormPassword = "";
						this.createFormFirstName = "";
						this.signInFormEmail = "";
						this.signInFormPassword = "";
						this.showExistingEmailWarning = false;
						this.showWrongEmailPass = false;
						this.listAppointments();
						this.getSession();
				} else { 
				}

			});

		},

	},
	
	created: function () {
		this.getSession();
		this.listAppointments();
	},

});
