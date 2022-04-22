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


function submitUser(){

    const items = Array.from(
        document.querySelector('ul').childNodes).map(li => li.textContent);


        const firstnameUser = document.getElementById("firstname").value;
        const lastnameUser = document.getElementById("firstname").value;
        const addressUser = document.getElementById("firstname").value;
        const emailUser = document.getElementById("firstname").value;
        const phoneUser = document.getElementById("firstname").value;
        const firstnameUser = document.getElementById("firstname").value;


    fetch('http://localhost:3000/newContact', {
        method: 'POST',
        body: JSON.stringify({ firstname: firstname,
                                lastname: lastname,
                                address: address,
                                email: email,
                                phone: phone }),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
        .then((response) => response.json())
        .then((result) => console.log(result))

}