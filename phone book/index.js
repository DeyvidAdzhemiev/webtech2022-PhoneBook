const express = require('express'); // get express function
const path = require('path'); // to join paths according to your OS (normalize)
require('dotenv').config();

const app = express(); // create application from express
const port = process.env.PORT;

const { getContacts } = require('./database/CRUD');

// визуализиране на начална страница със списъка с контакти
app.use(express.static(path.join(__dirname, 'public')));
app.use('/contacts', express.static(path.join(__dirname, 'public/images/upload')));
app.use('/get', require('./backend/getContact'));
app.use('/create', require('./backend/createContact'));
app.use('/remove', require('./backend/removeContact'));
app.use('/changeNumber', require('./backend/changeNumber'));
app.use(express.json());

/** */
app.get('/contacts', (req, res) => {
    
	// прочитаме данните от базата от данни
	let listContacts = getContacts();
	listContacts.then(function(result) {
		return res.json(result);
	})

    
});

// слушаме на порт 3000 
app.listen(port, () => { console.log(`Server listening on port ${port}`)});


module.exports = app;