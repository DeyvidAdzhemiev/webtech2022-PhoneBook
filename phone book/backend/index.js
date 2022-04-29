const express = require('express'); // get express function
const path = require('path'); // to join paths according to your OS (normalize)

const app = express(); // create application from express
const port = 3000;

// app.use(express.static(__dirname + '/public'));
app.use(express.static('C:/Users/dancho/Desktop/web/project/phone book - all/public'));
app.use(express.json());

const fs = require('fs');
const Uuid = require('uuid');

let contacts = [];

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

// добавяне на нов потребител
app.post('/contacts', (req, res) => {
	
    const firstname = req.body.firstname;
	const lastname = req.body.lastname;
	const address = req.body.address;
	const email = req.body.email;
	const phone = req.body.phone;

	console.log(firstname);
	
	if(!firstname || !lastname || !address || !email || !phone) {
		return res.status(400).json({error: "Invalid data" });
	}
	
	let Id = Uuid.v4();

	const newContact = {
		"id": Id,
		"firstname": firstname,
		"lastname": lastname,
		"address": address,
		"email": email,
		"phones": phone
	}
	
	contacts.push(newContact);

	writeData();

	res.send(contacts);
	
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
  
    fs.writeFile('./database/contacts.json', data, (err) => {
        if(err) {
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
       	contacts = contact;
  
    });

}



// слушаме на порт 3000 
app.listen(port, () => console.log(`Server listening on port ${port}`));