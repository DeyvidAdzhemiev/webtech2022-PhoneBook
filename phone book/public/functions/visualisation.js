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

var numbers = ["5553555","243423434", "4675465478555"];

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
check(document.getElementById("email"), document.getElementById("phone"));