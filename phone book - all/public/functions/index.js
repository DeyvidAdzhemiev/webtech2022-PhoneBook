function showInfo() {

    //const info = document.getElementsByClassName("main") ;

    const info = document.getElementsByClassName("main")[0].style.display;

    if( info === "" ) {
        document.getElementsByClassName("main")[0].style.display = "block";
        document.getElementsByClassName("menu")[0].style.display = "none";
        console.log("da");

    }
    else
    {
        document.getElementsByClassName("main")[0].style.display = "";
       document.getElementsByClassName("menu")[0].style.display = "block";
        
    }



}

function showMore() {

    const info = document.getElementsByClassName("more")[0].style.display;

    if( info === "" ) {
        document.getElementsByClassName("more")[0].style.display = "block";
        console.log("da");

    }
    else
    {
        document.getElementsByClassName("more")[0].style.display = "";
    }

}

function register() {

    const info = document.getElementsByClassName("register")[0].style.display;

        document.getElementsByClassName("register")[0].style.display = "grid";
        document.getElementsByClassName("menu")[0].style.display = "none";
        document.getElementsByClassName("main")[0].style.display = "none";
        console.log("da");



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

                    button.textContent = item.firstname + " " + item.lastname;
                    button.setAttribute('onclick', 'showInfo()');

                    li.appendChild(button);
                
                    document.querySelector('ul').appendChild(li);
                })
            }
        })
}


function getInfoContact(phone) {
    fetch('http://localhost:3000/contacts/' + phone)
        .then((response) => response.json())
        .then((listItems) => {
            if (listItems && listItems.length !== 0) {
                listItems.map(item => {

                    // <p><span>Първо име: </span> Иван </p>
                    // <p><span>Фамилия: </span> Иванов</p>
                    // <p><span>Адрес: </span> бул. Джеймс Баучер</p>
                    // <p><span>Имейл: </span> ivan@amail.com</p>

                    const li = document.createElement('li');
                    const button = document.createElement('button');

                    button.textContent = item.firstname + " " + item.lastname;
                    button.setAttribute('onclick', 'showInfo()');

                    li.appendChild(button);
                
                    document.querySelector('ul').appendChild(li);
                })
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