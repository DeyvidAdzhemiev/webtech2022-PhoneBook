const fs = require('fs');

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

module.exports = { writeData:writeData, readData:readData }