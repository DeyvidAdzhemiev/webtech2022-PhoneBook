// показва информация за контакта
function showInfo(phone) {

    getInfoContact(phone);

    const info = document.getElementsByClassName("main")[0].style.display;

    if( info === "" ) {
        document.getElementsByClassName("main")[0].style.display = "block";
        document.getElementsByClassName("menu")[0].style.display = "none";
        getInfoContact(phone);

    }


}

// показва информация за въведеният номер в търсачката
function searchNumber() {

    const phone = document.getElementById("searchItem").value;
    showInfo(phone);

}

// скрива информацията за контакта
function hideInfo() {

    document.getElementsByClassName("main")[0].style.display = "";
    document.getElementsByClassName("menu")[0].style.display = "block";

}

function addNumb() {

    const info = document.getElementsByClassName("addNewNumber")[0].style.display;

    if( info === "" ) {
        document.getElementsByClassName("addNewNumber")[0].style.display = "flex";

    }
    else
    {
        document.getElementsByClassName("addNewNumber")[0].style.display = "";

    }

}

function removeNumb() {

    const info = document.getElementsByClassName("removeNumber")[0].style.display;

    if( info === "" ) {
        document.getElementsByClassName("removeNumber")[0].style.display = "flex";

    }
    else
    {
        document.getElementsByClassName("removeNumber")[0].style.display = "";

    }

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

// middleware за показване на информацията на контактите
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
                                phone: phoneUser }),
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
  

  var numbers = ["123456","12354567", "123545678"];
  
  autocomplete(document.getElementById("searchItem"), numbers);
