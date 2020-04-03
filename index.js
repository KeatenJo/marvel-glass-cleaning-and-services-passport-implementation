const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const model = require('./model');
// Passport Imports
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("passport-local");
// End Passport Imports


const app = express();
const port = process.env.PORT || 8080;



app.use(bodyParser.urlencoded({extended: false }));
app.use(cors({credentials: true, origin: 'https://marvel-glass-cleaning-passport.herokuapp.com/public/'}));
app.use('/public', express.static('public'));
app.use('/images', express.static('images'));

app.use(session({ secret:"Somepeoplethinksciencedon'tbedatwaybutitdo", resave: false, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new passportLocal.Strategy ({

	usernameField: 'email',
	passwordField: 'plainTextPassword'

}, function( email, plainTextPassword, done ) {

	// First Get User from DB
	model.User.findOne({email: email}).then(function(user) {
		// If User does not exist in DB
		if(!user) {
				//  no errors, no user
			return done(null, false);
		} else {
			// User Exists in DB
			user.verifyPassword(plainTextPassword, function(result) {
				if(result) {
					// 	no errors, return user
					return done(null, user);
				} else {
					//     no errors, no user
					return done(null, false);
				}

			});
		}

	}).catch(function (err) {
		// Something went very wrong
		return done(err);

	});
}));

// serialize and deserialize user
passport.serializeUser(function(user, done) {
	done(null, user._id);
});

passport.deserializeUser(function(userid, done) {
	model.User.findOne({ _id: userid}).then(function (user) {
		done(null, user);	
	}).catch(function (err) {
		done(err);
	});
});

// route for sessions
app.post('/sessions', passport.authenticate('local'), function (req, res) {
	res.sendStatus(201);
});
app.get('/appointments', function (req, res) {
	if(!req.user) {
		res.sendStatus(401);
		return;
	} 

	model.Appointment.find({}).then(function (appointments) {
		res.json(appointments);
	});

});

// Retrieve Member
app.get('/appointments/:appointmentId', function(req, res) {
	if(!req.user) {
		res.sendStatus(401);
		return;
	} 
	let appointmentId = req.params.appointmentId;
	console.log(appointmentId);

	model.Appointment.findOne({ _id: appointmentId}).then(function (appointment) {
		console.log(appointment);
		if (appointment) {
			res.status(200).json(appointment);
			return;
		} else {
			res.sendStatus(404);
			return;
		}
	}).catch(function () {
		res.sendStatus(400);
		return;
	});
});
app.options('/appointments/:appointmentId', cors()) // enable pre-flight request for DELETE request
app.delete('/appointments/:appointmentId', function(req, res) {
	if(!req.user) {
		res.sendStatus(401);
		return;
	} 

	let appointmentId = req.params.appointmentId;
	console.log(appointmentId);

	model.Appointment.findOneAndDelete({ _id: appointmentId}).then(function (appointment) {
		if (appointment) {
			res.json(appointment);
		} else {
			res.sendStatus(404);
		}
	}).catch(function () {
		res.sendStatus(400);
	});
	
});

app.options('/appointments/:appointmentId', cors()) // enable pre-flight request for PUT request
app.put('/appointments/:appointmentId', function (req, res) {
	if(!req.user) {
		res.sendStatus(401);
		return;
	} 

	var query = { _id: req.params.appointmentId};
	let appointment ={
		name: req.body.name,
		time: req.body.time,
		date: req.body.date,
		address: req.body.address,
		phone: req.body.phone,
		email: req.body.email,
		notes: req.body.notes
	};
	console.log(appointment);

	model.Appointment.findOneAndUpdate(query, appointment, {new: true, upsert: true, useFindAndModify: false}, function(err, doc) {
		if(err) {
			console.log(err);
			console.log(doc);
			res.sendStatus(500);
			return;
		}
		res.sendStatus(200);
		return;
	});
});

app.post('/users', function (req, res) {
	let user = new model.User({
		email: req.body.email,
		firstName: req.body.firstName

	});

	user.setEncryptedPassword(req.body.plainTextPassword, function () {
			// insert into the mongoose model
		user.save().then(function () {
			res.sendStatus(201);
			}).catch(function (err) {
				if (err.errors) {
					var messages = {};
					for (let e in err.errors) {
					messages[e] = err.errors[e].message;
				}
					res.status(422).json(messages);
				} else {
					res.sendStatus(500);
			}
		});
	});
});


app.post('/appointments', function (req, res) {
	if(!req.user) {
		res.sendStatus(401);
		return;
	} 

	let appointment = new model.Appointment ({
		name: req.body.name,
		time: req.body.time,
		date: req.body.date,
		address: req.body.address,
		phone: req.body.phone,
		email: req.body.email,
		notes: req.body.notes
	});
	console.log(appointment);
	appointment.save().then(function () {
		res.sendStatus(201);
	}).catch(function (err) {
		if(err.errors) {
			var messages = {};
			for (let e in err.errors){
				messages[e] = err.errors[e].message;

			}
			
			res.status(422).json(messages); // 422 unproccessable
			
		} else {
		
			res.sendStatus(500);
		}
	});
});

app.listen(port, function () {
	console.log(`Example app listening on port ${port}!`);
});



