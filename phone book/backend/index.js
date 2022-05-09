const express = require('express'); // get express function
const path = require('path'); // to join paths according to your OS (normalize)

const app = express(); // create application from express
const port = 3000;

const dotenv = require('dotenv')
const mongoose = require('mongoose');
const {MongoClient} = require('mongodb');


// app.use(express.static(__dirname + '/public'));
app.use(express.static('C:/Users/dancho/Desktop/web/project/phone book - all/public'));
app.use(express.json());

const fs = require('fs');
const Uuid = require('uuid');
const multer = require("multer");

// const { readData, writeData } = require('../public/functions/rw');

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

//const upload = multer({ dest: './upload/' });

// визуализиране на начална страница със списъка с контакти
app.get('/', (req, res) => {

    // res.sendFile(path.join(__dirname + '/index.html'))
    return res.sendFile(path.join('C:/Users/dancho/Desktop/web/project/phone book/phone book - all/public/index.html'))
});

app.get('/contacts', (req, res) => {
    
	// прочитаме данните от базата от данни
	readData();
    
    return res.json(contacts);
});

// виждане на информация за потребител
app.get('/contacts/:id', (req, res) => {
    let id = req.params.id;
	
	if(!id){
		return res.status(400).json({error: "Invalid parameter" });
	}
	
	const contact = contacts.find(contact => contact.id === id);
	

	res.json(contact)
});

// виждане на информация за потребител
app.get('/contactsSearch/:phone', (req, res) => {
    let phone = req.params.phone;
	
	if(!phone){
		return res.status(400).json({error: "Invalid parameter" });
	}
	
	const contact = contacts.find(contact => contact.phones.find(currPhone => currPhone.phone == phone));
	
	console.log(contact.email);

	res.json(contact)
});

// добавяне на нов потребител upload.single('myFile')
//app.post('/contacts',upload.single('uploaded_file'), (req, res) => {
app.post('/contacts', (req, res) => {

	// console.log(req.file.filename, req.body);

	
    const firstname = req.body.firstname;
	const lastname = req.body.lastname;
	const address = req.body.address;
	const email = req.body.email;
	const phone = req.body.phone;
	// //const avatar = req.file.filename;

	// if(!firstname || !lastname || !address || !email || !phone) {
	// 	return res.status(400).json({error: "Invalid data" });
	// }
	
	// let Id = Uuid.v4();

	// const newContact = {
	// 	"id": Id,
	// 	"firstname": firstname,
	// 	"lastname": lastname,
	// 	"address": address,
	// 	"email": email,
	// 	"phones": [{"type": "мобилен",
	// 				"phone": phone}]
	// }
	
	// contacts.push(newContact);

	const client = new MongoClient("mongodb+srv://Deyvid:005017@cluster0.tltxh.mongodb.net/test");

	client.connect();

	// writeData();
		  const database = client.db("phonebook");
		  const users = database.collection("users");
		  // create a document to insert
		  let Id = Uuid.v4();

		  const newContact = {
			  "id": Id,
			  "firstname": firstname,
			  "lastname": lastname,
			  "address": address,
			  "email": email,
			  "phones": [{"type": "мобилен",
						  "phone": phone}]
		  }
		  
		  const result = users.insertOne(newContact);
		  console.log(`A document was inserted with the _id: ${result.insertedId}`);


	res.send(`A document was inserted with the _id: ${result.insertedId}`);
	
});

// добавяне на нов телефонен номер към конкретен потребител
app.patch('/contactsPhone/:id', (req, res) => {

	let Id = req.params.id;
	let typeNum = req.body.type;
	let anotherPhoneNum = req.body.phone;
	
	if(!Id || !typeNum || !anotherPhoneNum){
		return res.status(400).json({error: "Invalid data" });
	}
	
	let contact = contacts.find(user => user.id === Id);

	console.log(contact);

	let newNum = {
		"type": typeNum,
		"phone": anotherPhoneNum
	}

	contact.phones.push(newNum);
	
	writeData();

});

// премахване на телефонен номер към конкретен потребител
app.delete('/contactsPhone/:id', (req, res) => {

	let Id = req.params.id;
	let anotherPhoneNum = req.body.phone;
	
	if(!Id || !anotherPhoneNum){
		return res.status(400).json({error: "Invalid data" });
	}
	
	let contact = contacts.find(user => user.id === Id);


	contact.phones = contact.phones.filter(number => number.phone != anotherPhoneNum);

	console.log(contact.phones);

	writeData();

	res.send(contacts);

});

// изтриване на потребител
app.delete('/contacts/:id', (req, res) => {
	
	const Id = req.params.id;
	
	if(!Id){
		return res.status(400).json({error: "Invalid parameter"});
	}
	
	contacts = contacts.filter(contact => contact.id !== Id);

	writeData();
	
	res.send(contacts);
	
});

function writeData(){

    const data = JSON.stringify(contacts);

    //console.log(data);
  
    fs.writeFile('./database/contacts.json', data, (err) => {
        if(err) { // C:\Users\dancho\Desktop\web\project\phone book - all\backend\database\contacts.json
            throw err;
        }
    });

}


function readData(){

    fs.readFile('./database/contacts.json', 'utf-8', (err, data) => {
        if (err) {
            throw err;
        }
  
        // parse JSON object
        const contact = JSON.parse(data.toString());
		//console.log(contact);
        contacts = contact;
  
    });

}

// слушаме на порт 3000 
app.listen(3000
    // 3000, async () => {
	// 	await mongoose.connect("mongodb+srv://Deyvid:005017@cluster0.tltxh.mongodb.net/test");
    //     console.log('Your server and DB are ready!')
    // }
);