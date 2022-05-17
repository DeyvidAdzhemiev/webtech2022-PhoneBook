// изквиква контактите ,за да се покажат
document.addEventListener('DOMContentLoaded', () => {
    getItems();

});

function createImage(id, src) {
    const image = document.createElement('img');
    image.setAttribute('id', id);
    image.setAttribute('src', src);

    return image;
}

function createButton(textContent, atribute) {
    const button = document.createElement('button');
    button.textContent = textContent;
    button.setAttribute('onclick', atribute);

    return button;
}

function createTd(textContent) {
    let td = document.createElement('td');
    td.textContent = textContent;

    return td;
}

function createMetaData(txtF, txtL, txtAddress, txtEml) {
    document.getElementById('frstName').textContent = txtF;
    document.getElementById('lstName').textContent = txtL;
    document.getElementById('addrst').textContent = txtAddress;
    document.getElementById('eml').textContent = txtEml;
}

function addAllNumbers(phones) {
    // зачисване на стари номера
    var olddata = document.getElementById('PhoneNumbers').lastChild;

    while(olddata != null) {
        document.getElementById('PhoneNumbers').removeChild(olddata);
        olddata=document.getElementById('PhoneNumbers').lastChild;
    }

    // записване на нови номера
    const NumberOfList1 = document.createElement('tr');
    const count1 = createTd("Номер");
    const NumberType1 = createTd("Дом./Моб.");
    const NumberPhone1 = createTd("Телефонен номер");

    NumberOfList1.append(count1, NumberType1, NumberPhone1);
    document.getElementById('PhoneNumbers').appendChild(NumberOfList1);

    for (let i = 0; i < phones.length; i++) {
        let NumberOfList = document.createElement('tr');
        let count = createTd(i + 1);
        let NumberType = createTd(phones[i].type);
        let NumberPhone = createTd(phones[i].phone);

        NumberOfList.append(count, NumberType, NumberPhone);
        document.getElementById('PhoneNumbers').appendChild(NumberOfList);

    }

}

// middleware за показване на контактите
function getItems() {
    fetch('http://localhost:3000/contacts')
        .then((response) => response.json())
        .then((listItems) => {
            if (listItems && listItems.length !== 0) {
                listItems.map(item => {
                    const li = document.createElement('li');
                    const button = createButton(item.firstName + " " + item.lastName, 'showInfo(`'+ item.id +'`)');
                    const image = createImage('image', './images/upload/' + item.avatar);

                    li.appendChild(image);
                    li.appendChild(button);

                    const line = document.createElement('div');
                    line.setAttribute('class', 'lineBtwn');
    
                    document.querySelector('ul').appendChild(li);
                    document.querySelector('ul').appendChild(line);

                })
            }
        })
}

// middleware за показване на информацията на контактите
function getInfoContact(id) {
    fetch('http://localhost:3000/contacts/' + id)
        .then((response) => response.json())
        .then((listContacts) => {
            if (listContacts && listContacts.length !== 0) {

                // мета данните
                createMetaData("Първо име: " + listContacts.firstName, "Фамилия: " + listContacts.lastName
                                ,"Адрес: " + listContacts.address, "Имейл:" + listContacts.email);

                const image = createImage('', './images/upload/' + listContacts.avatar);

                document.getElementsByClassName("personalInfo")[0].appendChild(image);

                // зачистване на стари бутони
                var olddataBtn = document.getElementById('buttonsForAnotherPhones').lastChild;

                while(olddataBtn != null) {
                    document.getElementById('buttonsForAnotherPhones').removeChild(olddataBtn);
                    olddataBtn=document.getElementById('buttonsForAnotherPhones').lastChild;
                }

                // създаване на нови бутони
                const buttonAdd = createButton('', 'addNumb(`'+ listContacts.id +'`)');
                const imageAdd = createImage('imagebtn', './images/add.png');
                buttonAdd.appendChild(imageAdd);

                const buttonRemove = createButton('', 'removeNumb(`'+ listContacts.id +'`)');
                const imageRem = createImage('imagebtn', './images/delBtn.png');
                buttonRemove.appendChild(imageRem);

                const deleteUser = createButton("Премахване на потребител", 'removeContact(`'+ listContacts.id +'`)');

                document.getElementById("buttonsForAnotherPhones").append(buttonAdd, buttonRemove, deleteUser);

                addAllNumbers(listContacts.phones);

            }
        })
}

// middleware за показване на информацията на контактите
function getInfoContactSearch(phone) {
    fetch('http://localhost:3000/contactsSearch/' + phone)
        .then((response) => response.json())
        .then((listContacts) => {
            if (listContacts && listContacts.length !== 0) {

                // мета данните
                createMetaData("Първо име: " + listContacts.firstName, "Фамилия: " + listContacts.lastName
                                ,"Адрес: " + listContacts.address, "Имейл:" + listContacts.email);

                const image = createImage('', './images/upload/' + listContacts.avatar);

                document.getElementsByClassName("personalInfo")[0].appendChild(image);

                // зачистване на стари бутони
                var olddataBtn = document.getElementById('buttonsForAnotherPhones').lastChild;

                while(olddataBtn != null) {
                    document.getElementById('buttonsForAnotherPhones').removeChild(olddataBtn);
                    olddataBtn=document.getElementById('buttonsForAnotherPhones').lastChild;
                }

                // създаване на нови бутони
                const buttonAdd = createButton('', 'addNumb(`'+ listContacts.id +'`)');
                const imageAdd = createImage('imagebtn', './images/add.png');
                buttonAdd.appendChild(imageAdd);

                const buttonRemove = createButton('', 'removeNumb(`'+ listContacts.id +'`)');
                const imageRem = createImage('imagebtn', './images/delBtn.png');
                buttonRemove.appendChild(imageRem);

                const deleteUser = createButton("Премахване на потребител", 'removeContact(`'+ listContacts.id +'`)');

                document.getElementById("buttonsForAnotherPhones").append(buttonAdd, buttonRemove, deleteUser);

                addAllNumbers(listContacts.phones);
                
            }
        })
}

// регистиране на нов
function submitUser(){

    const items = Array.from(
        document.querySelector('ul').childNodes).map(li => li.textContent);

        const firstnameUser = document.getElementById("firstname").value;
        const lastnameUser = document.getElementById("lastname").value;
        const addressUser = document.getElementById("address").value;
        const emailUser = document.getElementById("email").value;
        const phoneUser = document.getElementById("phone").value;

        let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let phoneNumberPattern = /^\d{9}$/;

        if(emailUser.match(pattern) && phoneUser.match(phoneNumberPattern)) {   

            fetch('http://localhost:3000/contacts', {
            method: 'POST',
            body: JSON.stringify({ firstName: firstnameUser,
                                    lastName: lastnameUser,
                                    address: addressUser,
                                    email: emailUser,
                                    phone: [{"type": "мобилен",
                                            "phone": phoneUser}]}),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            })
            .then((response) => response.json())
            .then((result) => console.log(result))

            document.location.reload();

        } else {

            let message = document.getElementById('message');
            message.textContent = "data is not correct";

        }

}

// добавяне на нов телефонен номер
function submitAtnoherPhone(id){

    const typenumber = document.getElementById("typeNumb").value;
    const phoneNumber = document.getElementById("phoneNumbAdd").value;
    //const typenumber = "dancho";
    //const phoneNumber = "8981234124";

    fetch('http://localhost:3000/contactsPhone/' + id, {
        method: 'PATCH',
        body: JSON.stringify({  type: typenumber,
                                phone: phoneNumber }),

        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
        .then((response) => response.json())
        .then((result) => console.log(result))

}

// премахване на нов телефонен номер
function removePhoneNumber(id){

    const phoneNumber = document.getElementById("phoneNumbRem").value;
    //const phoneNumber = "8981234124";

    fetch('http://localhost:3000/contactsPhone/' + id, {
        method: 'DELETE',
        body: JSON.stringify({ phone: phoneNumber }),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
        .then((response) => response.json())
        .then((result) => console.log(result))

}

// премахване на нов телефонен номер
function removeContactById(id){

    fetch('http://localhost:3000/contacts/' + id, {
        method: 'DELETE',
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
        .then((response) => response.json())
        .then((result) => console.log(result))

}