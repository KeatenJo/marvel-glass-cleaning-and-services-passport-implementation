//List FUNCTION// GET (COLLECTION) REQUEST
var getAppointmentsFromServer = function () {
  return fetch("https://marvel-glass-cleaning-services.herokuapp.com/appointments");
};

//RETRIVE FUNCTION// GET (MEMBER) REQUEST
var getAppointmentFromServer = function (_id) {
  return fetch("https://marvel-glass-cleaning-services.herokuapp.com/appointments/" + _id);
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
	return fetch("https://marvel-glass-cleaning-services.herokuapp.com/appointments", {
		body: data,
		method: "POST",
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
	return fetch("https://marvel-glass-cleaning-services.herokuapp.com/appointments/" + _id, {
		body: data,
		method: "PUT",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		}
	});

};

var deleteAppointmentOnServer = function(_id) {
	return fetch("https://marvel-glass-cleaning-services.herokuapp.com/appointments/" + _id, {
		method: "DELETE",
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

		onClickShowUpdate: function () {
			this.showUpdateDiv = true;
			this.showCreateDiv = false;
			this.showRetrieveDiv = false;


		},

		listAppointments: function () {
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
	},
	
	created: function () {
		this.listAppointments();
	},

});
