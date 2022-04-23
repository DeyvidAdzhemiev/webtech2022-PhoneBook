const fs = require('fs');


function writeData(){

    const data = JSON.stringify(messages);
  
    fs.writeFile('./messages.json', data, (err) => {
        if(err) {
            throw err;
        }
    });

}


function readData(){

    fs.readFile('./messages.json', 'utf-8', (err, data) => {
        if (err) {
            throw err;
        }
  
        // parse JSON object
        const user = JSON.parse(data.toString());
        messages = user;
  
    });

}

export {writeData, readData };