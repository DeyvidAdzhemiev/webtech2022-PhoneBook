function AddNewFriend() {

    const newField = document.createElement('div');
    newField.setAttribute('class', 'anPer');

    const newName = document.createElement('input');
    newName.setAttribute('id', 'phonetype');
    newName.placeholder = "Дом./Моб.";
    const lastName = document.createElement('input');
    newName.setAttribute('id', 'numb');
    lastName.placeholder = "Телефонен номер";


    newField.appendChild(newName);
    newField.appendChild(lastName);

    const button = document.createElement('button');
    button.setAttribute('onclick', 'addNewUsr()');
    button.textContent = "Добави";

    newField.appendChild(button);

    maxShow++;
    document.querySelector(".main").appendChild(newField);
        
    

}

function addNewUsr() {

    const typeNum = document.getElementsByTagName('input')[1].value;
    const Numm = document.getElementsByTagName('input')[2].value;

    console.log(typeNum);

    const errMess = document.createElement('label');

    const newNum = document.createElement('tr');
    const data1 = document.createElement('td');
    data1.textContent = "4. ";
    const data2 = document.createElement('td');
    data2.textContent = typeNum;
    const data3 = document.createElement('td');
    data3.textContent = Numm;

    console.log(Numm);

    if(Numm.length == 10){

        const last = document.querySelector(".main").lastElementChild;

        document.querySelector(".main").removeChild(last);

        newNum.appendChild(data1);
        newNum.appendChild(data2);
        newNum.appendChild(data3);

        errMess.textContent = "number is added ";

        document.querySelector(".main").appendChild(errMess);
        document.querySelector('table').appendChild(newNum);


        const lastOne = document.querySelector(".main").lastElementChild;
        document.querySelector(".main").removeChild(lastOne);


    }
    else
    {

        errMess.textContent = "number is wrong";

        document.querySelector(".main").appendChild(errMess);
    }

}


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