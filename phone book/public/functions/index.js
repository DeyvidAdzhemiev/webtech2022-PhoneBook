

function showInfo(phone) {

    //const info = document.getElementsByClassName("main") ;

    getInfoContact(phone);
    console.log(phone);

    const info = document.getElementsByClassName("main")[0].style.display;

    if( info === "" ) {
        document.getElementsByClassName("main")[0].style.display = "block";
        document.getElementsByClassName("menu")[0].style.display = "none";
        console.log("da");
        getInfoContact(phone);

    }


}

function searchNumber() {

    const phone = document.getElementById("searchItem");
    showInfo(phone);

}

function hideInfo() {

    document.getElementsByClassName("main")[0].style.display = "";
    document.getElementsByClassName("menu")[0].style.display = "block";

}

function Onname(){


    document.getElementById("nameOfPerson").textContent = document.getElementById("ivan").id;

}


function showMore() {

    const info = document.getElementsByClassName("more")[0].style.display;

    if( info === "" ) {
        document.getElementsByClassName("more")[0].style.display = "flex";
        console.log("da");

    }
    else
    {
        document.getElementsByClassName("more")[0].style.display = "";
    }

}

function register() {

    const info = document.getElementsByClassName("register")[0].style.display;

    if( info === "" ) {
        document.getElementsByClassName("register")[0].style.display = "grid";
        document.getElementsByClassName("menu")[0].style.display = "none";
        document.getElementsByClassName("main")[0].style.display = "none";
        console.log("da");

    }
    else
    {
        document.getElementsByClassName("register")[0].style.display = "";
        document.getElementsByClassName("menu")[0].style.display = "block";
        document.getElementsByClassName("main")[0].style.display = "none";
    }


}


function homeBtn() {

    document.getElementsByClassName("register")[0].style.display = "none";
    document.getElementsByClassName("menu")[0].style.display = "block";
    document.getElementsByClassName("main")[0].style.display = "none";


}

document.addEventListener('DOMContentLoaded', () => {
    getItems();
});



function getItems() {
    fetch('http://localhost:3000/contacts')
        .then((response) => response.json())
        .then((listItems) => {
            if (listItems && listItems.length !== 0) {
                listItems.map(item => {
                    const li = document.createElement('li');
                    const button = document.createElement('button');

                    const image = document.createElement('img');
                    image.setAttribute('id', 'image');
                    image.setAttribute('src', './images/background_login.jpg');

                    button.textContent = item.firstname + " " + item.lastname;
                    button.setAttribute('onclick', 'showInfo('+ item.phone +')');

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


function getInfoContact(phone) {
    fetch('http://localhost:3000/contacts/' + phone)
        .then((response) => response.json())
        .then((listContacts) => {
            if (listContacts && listContacts.length !== 0) {


                const frstName = document.getElementById('frstName');
                frstName.textContent = "Първо име: " + listContacts.firstname;
                const lstName = document.getElementById('lstName');
                lstName.textContent = "Фамилия: " + listContacts.lastname;
                const adrs = document.getElementById('addrst');
                adrs.textContent = "Адрес: " + listContacts.address;
                const eml = document.getElementById('eml');
                eml.textContent = "Имейл:" + listContacts.email;
                

                console.log(phone);

                
                const currentNumber = document.getElementById('currentPhone');
                currentNumber.textContent = phone;


            }
        })


}


function submitUser(){

    const items = Array.from(
        document.querySelector('ul').childNodes).map(li => li.textContent);


        const firstnameUser = document.getElementById("firstname").value;
        const lastnameUser = document.getElementById("lastname").value;
        const addressUser = document.getElementById("address").value;
        const emailUser = document.getElementById("email").value;
        const phoneUser = document.getElementById("phone").value;


    fetch('http://localhost:3000/contacts', {
        method: 'POST',
        body: JSON.stringify({ firstname: firstnameUser,
                                lastname: lastnameUser,
                                address: addressUser,
                                email: emailUser,
                                phone: phoneUser }),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
        .then((response) => response.json())
        .then((result) => console.log(result))

}