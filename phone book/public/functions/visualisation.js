function showhideClass(classNametoHide, classNametoShow, funct) {
    const info = document.getElementsByClassName(classNametoShow)[0].style.display;

    if( info === "" ) {
        document.getElementsByClassName(classNametoShow)[0].style.display = "block";
        document.getElementsByClassName(classNametoHide)[0].style.display = "none";
        funct;
    }

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

function backMainPage() {
    window.location.replace("http://localhost:3000/");
}

// показва информация за контакта
function showInfo(id) {
    showhideClass("menu", "main", getInfoContact(id));
}