const fs = require('fs');

function writeData(contacts){

    const data = JSON.stringify(contacts);

    console.log(data);
  
    fs.writeFile('../backend/database/contacts.json', data, (err) => {
        if(err) { // C:\Users\dancho\Desktop\web\project\phone book - all\backend\database\contacts.json
            throw err;
        }
    });

}


function readData(contacts){

    fs.readFile('../backend/database/contacts.json', 'utf-8', (err, data) => {
        if (err) {
            throw err;
        }
  
        // parse JSON object
        const contact = JSON.parse(data.toString());
        contacts = contact;
  
    });

}

module.exports = { writeData:writeData, readData:readData }