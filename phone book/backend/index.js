const express = require('express'); // get express function
const path = require('path'); // to join paths according to your OS (normalize)

const app = express(); // create application from express
const port = 3000;

// app.use(express.static(__dirname + '/public'));
app.use(express.static('C:/Users/dancho/Desktop/web/project/phone book - all/public'));
app.use(express.json());

const fs = require('fs');

let contacts = [];

// визуализиране на начална страница със списъка с контакти
app.get('/', (req, res) => {
    
	
    // res.sendFile(path.join(__dirname + '/index.html'))
    return res.sendFile(path.join('C:/Users/dancho/Desktop/web/project/phone book/phone book - all/public/index.html'))
});

app.get('/contacts', (req, res) => {
    
	readData();
    // res.sendFile(path.join(__dirname + '/index.html'))
    return res.json(contacts);
});

// виждане на информация за потребител
app.get('/contacts/:phone', (req, res) => {
    let phone = req.params.phone;
	
	if(!phone){
		return res.status(400).json({error: "Invalid parameter" });
	}
	
	const contact = contacts.find(contact => contact.phone === phone);
	
	// функция която подава рези данни на html страницата
	// console.log(contact.email);

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
	
	const newContact = {
		"firstname": firstname,
		"lastname": lastname,
		"address": address,
		"email": email,
		"phone": phone,
	}
	
	contacts.push(newContact);

	writeData();

	res.send(contacts);
	
	//return res.sendFile(path.join('C:/Users/dancho/Desktop/web/project/phone book/public/index.html'))
});

// добавяне на нов телефонен номер към конкретен потребител
app.post('/contacts/:phone/:AnotherPhone', (req, res) => {

	let phone = req.params.phone;
	let newPhone = req.params.AnotherPhone;
	
	if(!phone || !newPhone){
		return res.status(400).json({error: "Invalid data" });
	}
	
	let user = users.find(user => user.id === id);

		

});

// изтриване на потребител
app.delete('/contacts/:phone', (req, res) => {
	
	const phone = req.params.phone;
	
	if(!phone){
		return res.status(400).json({error: "Invalid parameter"});
	}
	
	contacts = contacts.filer(contact => contact.phone !== phone);

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