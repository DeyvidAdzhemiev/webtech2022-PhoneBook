//import fs from 'fs';
const fs = require('fs');


export function writeData(contacts){

    const data = JSON.stringify(contacts);
  
    fs.writeFile('../../backend/database/contacts.json', data, (err) => {
        if(err) {
            throw err;
        }
    });

}


export function readData(contacts){

    fs.readFile('../../backend/database/contacts.json', 'utf-8', (err, data) => {
        if (err) {
            throw err;
        }
  
        // parse JSON object
        const contact = JSON.parse(data.toString());
        contacts = contact;
  
    });

}

// export {writeData, readData };