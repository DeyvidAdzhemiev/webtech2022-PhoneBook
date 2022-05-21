function showhideClass(classNametoHide, classNametoShow, funct) {
    const info = document.getElementsByClassName(classNametoShow)[0].style.display;

    if( info === "" ) {
        document.getElementsByClassName(classNametoShow)[0].style.display = "block";
        document.getElementsByClassName(classNametoHide)[0].style.display = "none";
        funct;
    }

}

// показва информация за контакта
function showInfo(id) {
    showhideClass("menu", "main", getInfoContact(id));
}

// показва информация за контакта
function showInfoFromSearch(phone) {
    showhideClass("menu", "main", getInfoContactSearch(phone));
}

// скрива информацията за контакта
function hideInfo() {
    document.getElementsByClassName("menu")[0].style.display = "block";
    document.getElementsByClassName("main")[0].style.display = "none";
    location.reload();
}

// показва и скрива формата за регистрация
function register() {

    const info = document.getElementsByClassName("register")[0].style.display;

    if( info === "" ) {
        document.getElementsByClassName("register")[0].style.display = "grid";
        document.getElementsByClassName("menu")[0].style.display = "none";
        document.getElementsByClassName("main")[0].style.display = "none";
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
    location.reload();

}

// var numbers = ["5553555","243423434", "4675465478555"];


  // проверява за валиден email и телефонен номер
function check(inpEmail, inpPhone) {

    inpEmail.addEventListener("input", function(e) {

        val = this.value;
        let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let message = document.getElementById('message');
        
        if(!val.match(pattern)) {   
            message.textContent = "email is not correct";
            document.getElementById('email').style.border = "1px solid red";
        } else {
            document.getElementById('email').style.border = "1px solid black";
            message.textContent = "";
        }

    });


    inpPhone.addEventListener("input", function(e) {

        val = this.value;
        let pattern = /^\d{9}$/;
        let message = document.getElementById('message');
        
        if(!val.match(pattern)) {   
            message.textContent = "phone is not correct";
            document.getElementById('phone').style.border = "1px solid red";
        } else {
            document.getElementById('phone').style.border = "1px solid black";
            message.textContent = "";
        }

    });


}


check(document.getElementById("email"), document.getElementById("phone"));