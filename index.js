const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// for loading a particular file
const model = require('./model');


const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({extended: false }));
app.use(cors());
app.use('/static', express.static('public'));


app.get('/appointments', function (req, res) {
	model.Appointment.find({}).then(function (appointments) {
		res.json(appointments);
	});

});

// Retrieve Member
app.get('/appointments/:appointmentId', function(req, res) {
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

app.post('/appointments', function (req, res) {
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
		// console.log("Error: ", err.errors);
		if(err.errors) {
			var messages = {};
			for (let e in err.errors){
				messages[e] = err.errors[e].message;

			}
			
			res.status(422).json(messages); // 422 status code means that the data is unprocessable
			
		} else {
		
			res.sendStatus(500);
		}
	});
});

app.listen(port, function () {
	console.log(`Example app listening on port ${port}!`);
});



