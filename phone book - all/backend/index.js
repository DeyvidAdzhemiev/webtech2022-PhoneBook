const express = require('express'); // get express function
const path = require('path'); // to join paths according to your OS (normalize)

const app = express(); // create application from express
const port = 3000;

// app.use(express.static(__dirname + '/public'));
app.use(express.static('C:/Users/deivi/Desktop/GitHub/webtech2022-PhoneBook/phone book - all/public'));
app.use(express.json());


let contacts = [];

// визуализиране на начална страница със списъка с контакти
app.get('/', (req, res) => {
    
    // res.sendFile(path.join(__dirname + '/index.html'))
    return res.sendFile(path.join('C:/Users/deivi/Desktop/GitHub/webtech2022-PhoneBook/phone book - all/public/index.html'))
});

app.get('/contacts', (req, res) => {
    
    // res.sendFile(path.join(__dirname + '/index.html'))
    return res.json(contacts);
});

// виждане на информация за потребител
app.get('/contacts/:phone', (req, res) => {
    let id = req.params.phone;
	
	if(!id){
		return res.status(400).json({error: "Invalid parameter" });
	}
	
	const contact = contacts.find(contact => contact.id === id);
	
	// функция която подава рези данни на html страницата

	//return res.sendFile(path.join('C:/Users/dancho/Desktop/web/project/phone book/pub
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
	// console.log(contacts)

	// // функция която подава рези данни на html страницата

	res.send(contacts);
	
	//return res.sendFile(path.join('C:/Users/dancho/Desktop/web/project/phone book/public/index.html'))
});

// добавяне на нов телефонен номер към конкретен потребител
app.post('/contacts/:id/:phone', (req, res) => {

	let id = req.params.id;
	let newPhone = req.params.phone;
	
	if(!id || !newPhone){
		return res.status(400).json({error: "Invalid data" });
	}
	
	let user = users.find(user => user.id === id);
	

});

// изтриване на потребител
app.delete('/contacts/:id', (req, res) => {
	
	const id = req.params.id;
	
	if(!id){
		return res.status(400).json({error: "Invalid parameter"});
	}
	
	contacts = contacts.filer(contact => contact.id !== id);
	
	// функция която подава рези данни на html страницата
	
	return res.sendFile(path.join('C:/Users/dancho/Desktop/web/project/phone book/public/index.html'))
});


// промяна на информация за контакт
app.patch('/contacts/:id/:newinfo', (req, res) => {

});


// слушаме на порт 3000 
app.listen(port, () => console.log(`Server listening on port ${port}`));