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