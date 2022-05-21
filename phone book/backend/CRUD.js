var userModel = require('./models/Contact');
const {MongoClient} = require('mongodb');
const Uuid = require('uuid');
require('dotenv').config();

// const client = new MongoClient("mongodb+srv://webtech2022:webtech2022@cluster0.t7xdp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
const client = new MongoClient(process.env.DBCONNECTION);

function getContacts() {

	return new Promise(function(resolve, reject){
		client.connect(err => {
			client.db("Contacts").collection("contact").find({}).toArray( (err, result) => {
				if (err) throw err;
				resolve(result);

			});
		});
	});

}

function getContact(id) {

	return new Promise(function(resolve, reject){
		client.connect(err => {

			const database = client.db("Contacts");
			const cont = database.collection("contact");

			cont.findOne({id: id}, (err, result) => {
				if (err) throw err;
				resolve(result);
			});

		});
	});

}

function getContactByPhone(phone) {

	return new Promise(function(resolve, reject){
		client.connect(err => {
			client.db("Contacts").collection("contact").findOne({phones: {$elemMatch: { phone: phone }}}, (err, result) => {
				if (err) throw err;
				console.log("fetchedContact");
				resolve(result);

			});
		});
	});

}

function newContact(req) {

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

	const phoneNumber = {
		"type": "мобилен",
		"phone": phone
	}

	const newContact = new userModel({
		id: Id,
		firstName: firstName,
		lastName: lastName,
		address: address,
		email: email,
		phones: [phoneNumber],
		avatar: avatar
	});

	const validation = newContact.validateSync();

	if(validation) {
	 	return res.status(400).json(validation);
	}

	client.connect(err => {
		client.db("Contacts").collection("contact").insertOne(newContact, (err, res) => {
			if ( err ) throw err;
			console.log("insered");
		})

		client.db("Contacts").collection("contact").updateOne({id: Id}, { $push: { phones: phoneNumber } }, (err, res) => {
			if ( err ) throw err;
			console.log("added phone number");
		})

	});

}


function addNewPhoneNumber(Id, newNum) {

	client.db("Contacts").collection("contact").updateOne({id: Id}, { $push: { phones: newNum } }, (err, res) => {
		if ( err ) throw err;
		console.log("added phone number");
	})

}

function removePhoneNumber(Id, anotherPhoneNum) {

	client.db("Contacts").collection("contact").updateOne({id: Id}, { $pull: { phones: { phone: anotherPhoneNum } } }, (err, res) => {
		if ( err ) throw err;
		console.log("removed phone number");
	})

}

function removeContact(Id) {

	return new Promise(function(resolve, reject){
		client.connect(err => {
			client.db("Contacts").collection("contact").deleteOne({id: Id}, (err, result) => {
				if (err) throw err;
				resolve(result);
				console.log("fetchedContact");
			});
		});
	});

}



module.exports = { getContacts:getContacts, getContact:getContact, newContact:newContact, getContactByPhone:getContactByPhone, 
	               addNewPhoneNumber:addNewPhoneNumber, removePhoneNumber: removePhoneNumber, removeContact:removeContact }