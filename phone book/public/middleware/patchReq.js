// добавяне на нов телефонен номер
function submitAtnoherPhone(id){

    //const typenumber = document.getElementById("typeNumb").value;
    //const phoneNumber = document.getElementById("phoneNumbAdd").value;
    const typenumber = "дадада";
    const phoneNumber = "456456456";

    console.log(typenumber);
    console.log(phoneNumber);

    fetch('http://localhost:3000/changeNumber/contactsPhone/' + id, {
        method: 'PATCH',
        body: JSON.stringify({  typePhone: typenumber,
                                phone: phoneNumber }),

        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
        .then((response) => response.json())
        .then((result) => console.log(result))

}

// добавяне на нов телефонен номер
function addToFav(id, isFavv){


    fetch('http://localhost:3000/fav/favorite/' + id, {
        method: 'PATCH',
        body: JSON.stringify({  isFav: isFavv }),

        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
        .then((response) => response.json())
        .then((result) => console.log(result))

}