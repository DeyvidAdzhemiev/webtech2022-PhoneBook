function isAdded(btnAdd, btnRemove, id) {

    btnAdd.addEventListener('click', function(e) {
        submitAtnoherPhone(id);
        location.reload();

    });


    btnRemove.addEventListener('click', function(e) {
        removePhoneNumber(id);
        location.reload();

    });

}

function addNumb(id) {

    const info = document.getElementsByClassName("addNewNumber")[0].style.display;

    if( info === "" ) {
        document.getElementsByClassName("addNewNumber")[0].style.display = "flex";
        isAdded(document.getElementById('addAnotherNumber'), document.getElementById('removeAnotherNumber'), id);
    } else {
        document.getElementsByClassName("addNewNumber")[0].style.display = "";
    }
    
    console.log(id);
}

// показва информация за въведеният номер в търсачката
function searchNumber() {
    const phone = document.getElementById("searchItem").value;
    showInfoFromSearch(phone);

}

function removeNumb(id) {
    const info = document.getElementsByClassName("removeNumber")[0].style.display;

    if( info === "" ) {
        document.getElementsByClassName("removeNumber")[0].style.display = "flex";
        isAdded(document.getElementById('addAnotherNumber'), document.getElementById('removeAnotherNumber'), id);
    } else {
        document.getElementsByClassName("removeNumber")[0].style.display = "";
    }
}

function removeContact(id) {
    removeContactById(id);
    hideInfo();

    location.reload();

}

function addremoveFav(id) {

    let isFavv = "true";

    for (let i = 0; i < favorites.length; i++) {
        if(favorites[i] == atob(id)){
            isFavv = "false";
            console.log(isFavv);
        }
        
    }

    addToFav(atob(id), isFavv);

    location.reload();
}