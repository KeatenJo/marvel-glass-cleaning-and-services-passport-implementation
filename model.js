const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

var userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	encryptedPassword: {
		type: String,
		required: true
	},
	firstName: {
		type: String,
		required: true
	}

});

userSchema.methods.setEncryptedPassword = function (plainTextPassword, callbackFunction) {
	bcrypt.hash(plainTextPassword, 12).then(hash => {
		this.encryptedPassword = hash;
		callbackFunction();
	});
};

userSchema.methods.verifyPassword = function (plainTextPassword, callbackFunction) {
	bcrypt.compare(plainTextPassword, this.encryptedPassword).then(result => {
		callbackFunction(result);
	});
};

var User = mongoose.model('User', userSchema);
// how to export to be used in other files
module.exports = {
	Appointment: Appointment,
	User: User
};

