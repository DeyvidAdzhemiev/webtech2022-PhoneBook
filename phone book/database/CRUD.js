const mongoose = require('mongoose');
require('dotenv').config();

// const client = new MongoClient("mongodb+srv://webtech2022:webtech2022@cluster0.t7xdp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
mongoose.connect(process.env.DBCONNECTION);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

var Contacts = require('./models/Contact');

function getContacts() {

	return new Promise(function(resolve, reject){
		Contacts.find({}, [], function(err, result) {
			resolve(result);
		});
	});

}

function getContact(id) {

	return new Promise(function(resolve, reject){
		Contacts.findOne({id: id}, function(err, result) {
			resolve(result);
		});
	});

}

function getContactByPhone(phone) {

	return new Promise(function(resolve, reject){
		Contacts.findOne({phones: {$elemMatch: { phone: phone }}}, function(err, result) {
			if ( err ) throw err;
			resolve(result);
		});
	});

}

function createContact(newContact) {

	const validation = newContact.validateSync();

	if(validation) {
	 	return 4;
	}

	newContact.save((err, doc) => {
		if (err) {
			console.log('Error during record insertion : ' + err);
		}
  });

}


function addNewPhoneNumber(Id, newNum) {

	Contacts.updateOne({id: Id}, { $push: { phones: newNum } },function(err, result) {
		if ( err ) return 5;
		console.log("added phone number" + result);
	});

}

function removePhoneNumber(Id, anotherPhoneNum) {

	Contacts.updateOne({id: Id}, { $pull: { phones: { phone: anotherPhoneNum } } }, function(err, result) {
		if ( err ) return 5;
		console.log("removed phone number");
	});

}

function removeContact(Id) {


	return new Promise(function(resolve, reject){
		Contacts.deleteOne({id: Id}, function(err, result) {
			if (err) throw err;
			resolve(result);
						
		});
	});

}



module.exports = { getContacts:getContacts, getContact:getContact, createContact:createContact, getContactByPhone:getContactByPhone, 
	               addNewPhoneNumber:addNewPhoneNumber, removePhoneNumber: removePhoneNumber, removeContact:removeContact }