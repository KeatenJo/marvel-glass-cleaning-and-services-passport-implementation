const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://KeatenJo:keaten@mgcs-cluster-c1p7v.mongodb.net/appointmentDb?retryWrites=true&w=majority', {
	useNewUrlParser: true, 
	useUnifiedTopology: true
});


var Appointment = mongoose.model('Appointment', {
	date: {
		type: String,
		required: true
		//you can do stuff like this:
		//min: [1, "Rating must be at least 1"]
		//max: [10, "Rating must be at most 10"]
	},
	time: {
		type: String,
		required: true
	},
	name: { 
		type: String,
		required: true
	},
	address: {
		type: String,
		required: true
	},
	phone: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: false
	},
	notes: {
		type: String,
		required: false
	}
});


// how to export to be used in other files
module.exports = {
	Appointment: Appointment,
};

