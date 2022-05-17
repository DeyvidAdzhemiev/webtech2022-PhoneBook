const express = require('express'); // get express function
const path = require('path'); // to join paths according to your OS (normalize)
const fs = require('fs');
const Uuid = require('uuid');
const multer = require("multer");
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const {MongoClient} = require('mongodb');
var userModel = require('./models/Contact');

const app = express(); // create application from express
const port = 3000;

const { getContacts, getContact, newContact, getContactByPhone } = require('./CRUD');

const client = new MongoClient("mongodb+srv://webtech2022:webtech2022@cluster0.t7xdp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");

// app.use(express.static(__dirname + '/public'));
app.use(express.static('C:/Users/dancho/Desktop/web/project/phone book - all/public'));
app.use(express.json());

let contacts = [];

var storage = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, '../public/images/upload/');
	},
	filename: function(req, file, callback) {
		callback(null, file.originalname);
	}

});

var upload = multer({ storage: storage });

// визуализиране на начална страница със списъка с контакти
app.get('/', (req, res) => {

    // res.sendFile(path.join(__dirname + '/index.html'))
    return res.sendFile(path.join('C:/Users/dancho/Desktop/web/project/phone book/phone book - all/public/index.html'))
});

app.get('/contacts', (req, res) => {
    
	// прочитаме данните от базата от данни
    client.connect(err => {
		client.db("Contacts").collection("contact").find({}).toArray( (err, result) => {
			if (err) throw err;
            contacts = result;
		})
	})

    return res.json(contacts);
});

// виждане на информация за потребител
app.get('/contacts/:id', (req, res) => {
    let id = req.params.id;
	
	if(!id){
		return res.status(400).json({error: "Invalid parameter" });
	}
	
	client.connect(err => {

		const database = client.db("Contacts");
		const cont = database.collection("contact");

		cont.findOne({id: id}, (err, result) => {
			if (err) throw err;
			res.json(result)
		});

	});

});

// виждане на информация за потребител
app.get('/contactsSearch/:phone', (req, res) => {
    let phone = req.params.phone;
	
	if(!phone){
		return res.status(400).json({error: "Invalid parameter" });
	}

    client.connect(err => {
		client.db("Contacts").collection("contact").findOne({phones: {$elemMatch: { phone: phone }}}, (err, result) => {
			if (err) throw err;
			res.json(result);
			console.log("fetchedContact");
		});
	});

});

// добавяне на нов потребител upload.single('myFile')
app.post('/contacts',upload.single('uploaded_file'), (req, res) => {

	// console.log(req.file.filename, req.body);
	const firstName = req.body.firstname;
	const lastName = req.body.lastname;
	const address = req.body.address;
	const email = req.body.email;
	const phone = req.body.phone;
	const avatar = req.file.filename;

	if(!firstName || !lastName || !address || !email || !phone || !avatar) {
		return res.status(400).json({error: "Invalid data" });
	}
	
	let Id = Uuid.v4();

	const newContact = new userModel({
		id: Id,
		firstName: firstName,
		lastName: lastName,
		address: address,
		email: email,
		phones: [{"type": "мобилен",
					"phone": phone}],
		avatar: avatar
	});

	const validation = newContact.validateSync();

	if(validation) {
	 	return res.status(400).json(validation);
	}

	const phoneNumber = {
		"type": "мобилен",
		"phone": phone
	}


	client.db("Contacts").collection("contact").insertOne(newContact, (err, res) => {
		if ( err ) throw err;
		console.log("insered");
	})

	client.db("Contacts").collection("contact").updateOne({id: Id}, { $push: { phones: phoneNumber } }, (err, res) => {
		if ( err ) throw err;
		console.log("added phone number");
	})

	res.status(200);
	
});

// добавяне на нов телефонен номер към конкретен потребител
app.patch('/contactsPhone/:id', (req, res) => {

	let Id = req.params.id;
	let typeNum = req.body.type;
	let anotherPhoneNum = req.body.phone;
	
	if(!Id || !typeNum || !anotherPhoneNum){
		return res.status(400).json({error: "Invalid data" });
	}

	let newNum = {
		"type": typeNum,
		"phone": anotherPhoneNum
	}

	client.db("Contacts").collection("contact").updateOne({id: Id}, { $push: { phones: newNum } }, (err, res) => {
		if ( err ) throw err;
		console.log("added phone number");
	})

});

// премахване на телефонен номер към конкретен потребител
app.delete('/contactsPhone/:id', (req, res) => {

	let Id = req.params.id;
	let anotherPhoneNum = req.body.phone;
	
	if(!Id || !anotherPhoneNum){
		return res.status(400).json({error: "Invalid data" });
	}
	
	client.db("Contacts").collection("contact").updateOne({id: Id}, { $pull: { phones: { phone: anotherPhoneNum } } }, (err, res) => {
		if ( err ) throw err;
		console.log("removed phone number");
	})

	res.send(contacts);

});

// изтриване на потребител
app.delete('/contacts/:id', (req, res) => {
	
	const Id = req.params.id;
	
	if(!Id){
		return res.status(400).json({error: "Invalid parameter"});
	}
	
	client.connect(err => {
		client.db("Contacts").collection("contact").deleteOne({id: Id}, (err, result) => {
			if (err) throw err;
			contact = result;
			console.log("fetchedContact");
		})
	})
	
	res.status(200);
	
});

// слушаме на порт 3000 
app.listen(port, () => console.log(`Server listening on port ${port}`));