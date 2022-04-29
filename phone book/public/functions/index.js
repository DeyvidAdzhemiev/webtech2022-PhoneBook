// показва информация за контакта
function showInfo(id) {

    getInfoContact(id);

    console.log(id);

    const info = document.getElementsByClassName("main")[0].style.display;

    if( info === "" ) {
        document.getElementsByClassName("main")[0].style.display = "block";
        document.getElementsByClassName("menu")[0].style.display = "none";
        getInfoContact(id);

    }


}

// показва информация за контакта
function showInfoFromSearch(phone) {

    getInfoContactSearch(phone);

    //console.log(phone);

    const info = document.getElementsByClassName("main")[0].style.display;

    if( info === "" ) {
        document.getElementsByClassName("main")[0].style.display = "block";
        document.getElementsByClassName("menu")[0].style.display = "none";
        getInfoContactSearch(phone);

    }


}

// показва информация за въведеният номер в търсачката
function searchNumber() {

    const phone = document.getElementById("searchItem").value;
    showInfoFromSearch(phone);

}

// скрива информацията за контакта
function hideInfo() {

    document.getElementsByClassName("main")[0].style.display = "";
    document.getElementsByClassName("menu")[0].style.display = "block";

}


function addNumb(id) {

    const info = document.getElementsByClassName("addNewNumber")[0].style.display;

    if( info === "" ) {
        document.getElementsByClassName("addNewNumber")[0].style.display = "flex";
        submitAtnoherPhone(id);
        location.reload();

    }
    else
    {
        document.getElementsByClassName("addNewNumber")[0].style.display = "";

    }

}

function removeNumb(id) {

    const info = document.getElementsByClassName("removeNumber")[0].style.display;

    if( info === "" ) {
        document.getElementsByClassName("removeNumber")[0].style.display = "flex";
        removePhoneNumber(id);
        location.reload();

    }
    else
    {
        document.getElementsByClassName("removeNumber")[0].style.display = "";

    }

}

function removeContact(id) {

    removeContactById(id);
    hideInfo();

    location.reload();
}

// показва и скрива формата за регистрация
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

// показва началната страница
function homeBtn() {

    document.getElementsByClassName("register")[0].style.display = "none";
    document.getElementsByClassName("menu")[0].style.display = "block";
    document.getElementsByClassName("main")[0].style.display = "none";


}

var numbers = ["5553555","555", "4675465478555"];

// изквиква контактите ,за да се покажат
document.addEventListener('DOMContentLoaded', () => {
    getItems();

});


// middleware за показване на контактите
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

                    let Id = String(item.id);

                    button.textContent = item.firstname + " " + item.lastname;
                    button.setAttribute('onclick', 'showInfo(`'+ Id +'`)');

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


                const frstName = document.getElementById('frstName');
                frstName.textContent = "Първо име: " + listContacts.firstname;
                const lstName = document.getElementById('lstName');
                lstName.textContent = "Фамилия: " + listContacts.lastname;
                const adrs = document.getElementById('addrst');
                adrs.textContent = "Адрес: " + listContacts.address;
                const eml = document.getElementById('eml');
                eml.textContent = "Имейл:" + listContacts.email;


                var olddataBtn = document.getElementById('buttonsForAnotherPhones').lastChild;

                while(olddataBtn != null) {

                    document.getElementById('buttonsForAnotherPhones').removeChild(olddataBtn);
                    olddataBtn=document.getElementById('buttonsForAnotherPhones').lastChild;

                }

                const buttonAdd = document.createElement('button');
                buttonAdd.setAttribute('onclick', 'addNumb(`'+ listContacts.id +'`)');

                const imageAdd = document.createElement('img');
                imageAdd.setAttribute('id', 'imagebtn');
                imageAdd.setAttribute('src', './images/add.png');

                buttonAdd.appendChild(imageAdd);

                const buttonRemove = document.createElement('button');
                buttonRemove.setAttribute('onclick', 'removeNumb(`'+ listContacts.id +'`)');

                const imageRem = document.createElement('img');
                imageRem.setAttribute('id', 'imagebtn');
                imageRem.setAttribute('src', './images/delBtn.png');

                buttonRemove.appendChild(imageRem);

                const deleteUser = document.createElement('button');
                deleteUser.setAttribute('onclick', 'removeContact(`'+ listContacts.id +'`)');
                deleteUser.textContent = "Премахване на потребител";

                document.getElementById("buttonsForAnotherPhones").appendChild(buttonAdd);
                document.getElementById("buttonsForAnotherPhones").appendChild(buttonRemove);
                document.getElementById("buttonsForAnotherPhones").appendChild(deleteUser);



                var olddata = document.getElementById('PhoneNumbers').lastChild;

                while(olddata != null) {

                    document.getElementById('PhoneNumbers').removeChild(olddata);
                    olddata=document.getElementById('PhoneNumbers').lastChild;

                }

                

                let NumberOfList1 = document.createElement('tr');
                let count1 = document.createElement('td');
                count1.textContent = "Номер";
                let NumberType1 = document.createElement('td');
                NumberType1.textContent = "Дом./Моб.";
                let NumberPhone1 = document.createElement('td');
                NumberPhone1.textContent = "Телефонен номер";

                NumberOfList1.appendChild(count1);
                NumberOfList1.appendChild(NumberType1);
                NumberOfList1.appendChild(NumberPhone1);

                document.getElementById('PhoneNumbers').appendChild(NumberOfList1);

                let phones = listContacts.phones;

                for (let i = 0; i < phones.length; i++) {
                    let NumberOfList = document.createElement('tr');
                    let count = document.createElement('td');
                    count.textContent = i + 1;
                    let NumberType = document.createElement('td');
                    NumberType.textContent = phones[i].type;
                    let NumberPhone = document.createElement('td');
                    NumberPhone.textContent = phones[i].phone;

                    NumberOfList.appendChild(count);
                    NumberOfList.appendChild(NumberType);
                    NumberOfList.appendChild(NumberPhone);

                    document.getElementById('PhoneNumbers').appendChild(NumberOfList);

                    
                }


            }
        })


}


// middleware за показване на информацията на контактите
function getInfoContactSearch(phone) {
    fetch('http://localhost:3000/contactsSearch/' + phone)
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


                var olddataBtn = document.getElementById('buttonsForAnotherPhones').lastChild;

                while(olddataBtn != null) {

                    document.getElementById('buttonsForAnotherPhones').removeChild(olddataBtn);
                    olddataBtn=document.getElementById('buttonsForAnotherPhones').lastChild;

                }

                const buttonAdd = document.createElement('button');
                buttonAdd.setAttribute('onclick', 'addNumb(`'+ listContacts.id +'`)');

                const imageAdd = document.createElement('img');
                imageAdd.setAttribute('id', 'imagebtn');
                imageAdd.setAttribute('src', './images/add.png');

                buttonAdd.appendChild(imageAdd);

                const buttonRemove = document.createElement('button');
                buttonRemove.setAttribute('onclick', 'removeNumb(`'+ listContacts.id +'`)');

                const imageRem = document.createElement('img');
                imageRem.setAttribute('id', 'imagebtn');
                imageRem.setAttribute('src', './images/delBtn.png');

                buttonRemove.appendChild(imageRem);

                const deleteUser = document.createElement('button');
                deleteUser.setAttribute('onclick', 'removeContact(`'+ listContacts.id +'`)');
                deleteUser.textContent = "Премахване на потребител";

                document.getElementById("buttonsForAnotherPhones").appendChild(buttonAdd);
                document.getElementById("buttonsForAnotherPhones").appendChild(buttonRemove);
                document.getElementById("buttonsForAnotherPhones").appendChild(deleteUser);



                var olddata = document.getElementById('PhoneNumbers').lastChild;

                while(olddata != null) {

                    document.getElementById('PhoneNumbers').removeChild(olddata);
                    olddata=document.getElementById('PhoneNumbers').lastChild;

                }

                

                let NumberOfList1 = document.createElement('tr');
                let count1 = document.createElement('td');
                count1.textContent = "Номер";
                let NumberType1 = document.createElement('td');
                NumberType1.textContent = "Дом./Моб.";
                let NumberPhone1 = document.createElement('td');
                NumberPhone1.textContent = "Телефонен номер";

                NumberOfList1.appendChild(count1);
                NumberOfList1.appendChild(NumberType1);
                NumberOfList1.appendChild(NumberPhone1);

                document.getElementById('PhoneNumbers').appendChild(NumberOfList1);

                let phones = listContacts.phones;

                for (let i = 0; i < phones.length; i++) {
                    let NumberOfList = document.createElement('tr');
                    let count = document.createElement('td');
                    count.textContent = i + 1;
                    let NumberType = document.createElement('td');
                    NumberType.textContent = phones[i].type;
                    let NumberPhone = document.createElement('td');
                    NumberPhone.textContent = phones[i].phone;

                    NumberOfList.appendChild(count);
                    NumberOfList.appendChild(NumberType);
                    NumberOfList.appendChild(NumberPhone);

                    document.getElementById('PhoneNumbers').appendChild(NumberOfList);

                    
                }



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


    fetch('http://localhost:3000/contacts', {
        method: 'POST',
        body: JSON.stringify({ firstname: firstnameUser,
                                lastname: lastnameUser,
                                address: addressUser,
                                email: emailUser,
                                phone: [{"type": "мобилен",
                                         "phone": phoneUser}] }),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
        .then((response) => response.json())
        .then((result) => console.log(result))

        document. location. reload();

}


// добавяне на нов телефонен номер
function submitAtnoherPhone(id){

    //const typenumber = document.getElementById("typeNumb").value;
    //const phoneNumber = document.getElementById("phoneNumbAdd").value;


    const typenumber = "dancho";
    const phoneNumber = "8981234124";

    console.log(typenumber);



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

    //const phoneNumber = document.getElementById("phoneNumbRem").value;

    const phoneNumber = "8981234124";

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


function autocomplete(inp, arr) {
    
    
    inp.addEventListener("input", function(e) {
        val = this.value;
        
        closeAllLists();
        if (!val) { return false;}

       
        let a = document.createElement("div");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        
        this.parentNode.appendChild(a);
        
        for (let i = 0; i < arr.length; i++) {
          
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            
            let b = document.createElement("div");
            
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            
            b.addEventListener("click", function(e) {
                
                inp.value = this.getElementsByTagName("input")[0].value;

                closeAllLists();
            });
            a.appendChild(b);

          }
        }
    });
    

    
    function closeAllLists(elmnt) {
      
      var x = document.getElementsByClassName("autocomplete-items");
      for (let i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
  }
  
  
  autocomplete(document.getElementById("searchItem"), numbers);
