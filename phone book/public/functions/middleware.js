// const { encrypt, decrypt } = require('../../backend/crypt');

let numbers = [];

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
    document.getElementById('frstName').textContent = txtF + "   " + txtL;
    document.getElementById('addrst').textContent = txtAddress;
    document.getElementById('eml').textContent = txtEml;
}

function addToSearchContact(phone) {

    numbers.push(phone);

}

function addAllNumbers(phones) {
    // зачисване на стари номера
    var olddata = document.getElementById('PhoneNumbers').lastChild;

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
    fetch('http://130.204.187.170:3000/contacts')
        .then((response) => response.json())
        .then((listItems) => {
            if (listItems && listItems.length !== 0) {
                listItems.map(item => {
                    const li = document.createElement('li');
                    const button = createButton(item.firstName + " " + item.lastName, 'showInfo(`'+ btoa(item.id) +'`)');
                    const image = createImage('image', './images/upload/' + item.avatar);

                    let listPhones = item.phones;

                    if(listPhones != undefined){
                        if(listPhones.length != 0){
                            for(let i = 0; i < listPhones.length; i++ ){
                                addToSearchContact(item.phones[i].phone);
                            }
                        }
                    }

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
    fetch('http://130.204.187.170:3000/contacts/' + atob(id))
        .then((response) => response.json())
        .then((listContacts) => {
            if (listContacts && listContacts.length !== 0) {

                // мета данните
                createMetaData(listContacts.firstName, listContacts.lastName
                                ,listContacts.address, listContacts.email);

                const profilePic = document.getElementById('profileImg');
                profilePic.setAttribute('src', './images/upload/' + listContacts.avatar);

                // създаване на нови бутони
                const buttonAdd = document.getElementById('addP');
                buttonAdd.setAttribute('onclick', 'addNumb(`'+ btoa(listContacts.id) +'`)');
                
                const buttonRem = document.getElementById('remP');
                buttonRem.setAttribute('onclick', 'removeNumb(`'+ btoa(listContacts.id) +'`)');

                const deleteUser = document.getElementById('remPer');
                deleteUser.setAttribute('onclick', 'removeContact(`'+ btoa(listContacts.id) +'`)');


                if(listContacts.phones != undefined){
                    addAllNumbers(listContacts.phones);
                }

            }
        })
}

// middleware за показване на информацията на контактите
function getInfoContactSearch(phone) {

    if(phone != null) {

        fetch('http://130.204.187.170:3000/contactsSearch/' + phone)
            .then((response) => response.json())
            .then((listContacts) => {
                if (listContacts && listContacts.length !== 0) {

                    // мета данните
                    createMetaData(listContacts.firstName, listContacts.lastName
                        ,listContacts.address, listContacts.email);

                    const image = createImage('', './images/upload/' + listContacts.avatar);

                    document.getElementsByClassName("personalInfo")[0].appendChild(image);


                    // създаване на нови бутони
                    const buttonAdd = document.getElementById('addP');
                    buttonAdd.setAttribute('onclick', 'addNumb(`'+ btoa(listContacts.id) +'`)');
                    
                    const buttonRem = document.getElementById('remP');
                    buttonRem.setAttribute('onclick', 'removeNumb(`'+ btoa(listContacts.id) +'`)');

                    const deleteUser = document.getElementById('remPer');
                    deleteUser.setAttribute('onclick', 'removeContact(`'+ btoa(listContacts.id) +'`)');


                    if(listContacts.phones != undefined){
                        addAllNumbers(listContacts.phones);
                    }
                    
                }
            })

    }
}

// добавяне на нов телефонен номер
function submitAtnoherPhone(id){

    const typenumber = document.getElementById("typeNumb").value;
    const phoneNumber = document.getElementById("phoneNumbAdd").value;

    fetch('http://130.204.187.170:3000/contactsPhone/' + atob(id), {
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

    fetch('http://130.204.187.170:3000/contactsPhone/' + atob(id), {
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

    fetch('http://130.204.187.170:3000/contacts/' + atob(id), {
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

        console.log("da");
        
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