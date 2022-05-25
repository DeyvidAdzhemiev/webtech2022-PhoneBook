const express = require('express');
const router = express.Router();

const multer = require("multer");
const Uuid = require('uuid');
const { createContact } = require('../database/CRUD');
var userModel = require('../database/models/Contact');
const path = require('path');

const { checkContact } = require('./middleware/addCheck');

// настроики на multer
var storage = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, './public/images/upload/');
	},
	filename: function(req, file, callback) {
		callback(null, file.originalname);
	}

});

var upload = multer({ storage: storage });

// добавяне на нов потребител upload.single('myFile')
router.route('/contacts').post(upload.single('uploaded_file'), (req, res) => {

    const firstName = req.body.firstname;
	const lastName = req.body.lastname;
	const address = req.body.address;
	const email = req.body.email;
	const phone = req.body.phone;
	let avatar;

	if(!req.file) {
		avatar = "unknown-person-icon.jpg";
	} else {
		avatar = req.file.filename;
	}


	if(!firstName || !lastName || !address || !email || !phone || !avatar) {
		return res.status(404).sendFile(path.join('C:/Users/dancho/Desktop/web/github/front end/my/webtech2022-PhoneBook/phone book/public/404.html'));
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
		avatar: avatar,
		isFavorites: false
	});

	// console.log(req.file.filename, req.body);
	const result = createContact(newContact);
	if(result == 4) {
		return res.status(404).sendFile(path.join('C:/Users/dancho/Desktop/web/github/front end/my/webtech2022-PhoneBook/phone book/public/404.html'));
	}

	
});

module.exports = router;