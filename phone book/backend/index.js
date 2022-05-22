const express = require('express'); // get express function
const path = require('path'); // to join paths according to your OS (normalize)
const multer = require("multer");
require('dotenv').config();

const app = express(); // create application from express
const port = process.env.PORT;

const { getContacts, getContact, newContact, getContactByPhone, addNewPhoneNumber, removePhoneNumber, removeContact } = require('./CRUD');

// визуализиране на начална страница със списъка с контакти
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/contacts', express.static(path.join(__dirname, '..', 'public/images/upload')));
app.use(express.json());

let contacts = [];

// настроики на multer
var storage = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, '../public/images/upload/');
	},
	filename: function(req, file, callback) {
		callback(null, file.originalname);
	}

});

var upload = multer({ storage: storage });

app.get('/contacts', (req, res) => {
    
	// прочитаме данните от базата от данни
	let listContacts = getContacts();
	listContacts.then(function(result) {
		contacts = result;
	})

    return res.json(contacts);
});

// виждане на информация за потребител
app.get('/contacts/:id', (req, res) => {
    let id = req.params.id;
	
	if(!id){
		return res.status(400).json({error: "Invalid parameter" });
	}
	
	
	let contact = getContact(id);
	contact.then(function(result) {
		res.json(result)
	})


});

// виждане на информация за потребител
app.get('/contactsSearch/:phone', (req, res) => {
    let phone = req.params.phone;
	
	if(!phone || phone.length == 0){
		return res.status(400).json({error: "Invalid parameter" });
	}

	let contactByPhone = getContactByPhone(phone);
	contactByPhone.then(function(result) {
		res.json(result);
	});

});

// добавяне на нов потребител upload.single('myFile')
app.post('/contacts',upload.single('uploaded_file'), (req, res) => {

	// console.log(req.file.filename, req.body);
	newContact(req, res);

	res.redirect('/');
	
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

	addNewPhoneNumber(Id, newNum);

	res.send(200);
});

// премахване на телефонен номер към конкретен потребител
app.delete('/contactsPhone/:id', (req, res) => {

	let Id = req.params.id;
	let anotherPhoneNum = req.body.phone;
	
	if(!Id || !anotherPhoneNum){
		return res.status(400).json({error: "Invalid data" });
	}
	
	removePhoneNumber(Id, anotherPhoneNum);

	res.status(200);

});

// изтриване на потребител
app.delete('/contacts/:id', (req, res) => {
	
	const Id = req.params.id;
	
	if(!Id){
		return res.status(400).json({error: "Invalid parameter"});
	}
	
	let remContact = removeContact(Id);
	remContact.then(function(result){
		console.log(result);
	});
	
	res.status(200);
	
});

// слушаме на порт 3000 
app.listen(port, () => { console.log(`Server listening on port ${port}`)});