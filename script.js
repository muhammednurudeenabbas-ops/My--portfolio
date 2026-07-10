let count = Number(localStorage.getItem("tasbihCount")) || 0;


let reminders = [
    "Remember Allah and keep your prayers.",
    "Start your day with Bismillah.",
    "Make time for Salah, it brings peace to the heart.",
    "Be thankful for Allah's blessings.",
    "Keep your tongue busy with Dhikr.",
    "Allah is always near to those who remember Him."
];


// Start App
function startApp(){

    document.getElementById("welcomeScreen").style.display = "none";

}


// Daily Reminder
function newReminder(){

    let random =
    reminders[Math.floor(Math.random() * reminders.length)];

    document.getElementById("dailyReminder").innerHTML =
    random;

}


// Prayer Reminder
function prayerReminder(){

    alert("🕌 Time to remember Allah and prepare for Salah 🤲");

}



// Load App
window.onload = function(){

    document.getElementById("count").innerHTML = count;


    let random =
    reminders[Math.floor(Math.random() * reminders.length)];


    let reminderBox =
    document.getElementById("dailyReminder");


    if(reminderBox){

        reminderBox.innerHTML = random;

    }



    loadPrayerProgress();



    let savedDua =
    localStorage.getItem("favoriteDua");


    if(savedDua){

        document.getElementById("savedDua").innerHTML =
        "⭐ Your favourite Dua is saved";

    }



    let dark =
    localStorage.getItem("darkMode");


    if(dark === "true"){

        document.body.classList.add("dark");

    }



    let prayers =
    document.querySelectorAll(
        'input[type="checkbox"]'
    );


    prayers.forEach((prayer,index)=>{

        prayer.addEventListener("change",function(){

            localStorage.setItem(
                "prayer" + index,
                prayer.checked
            );

        });

    });

};




// Dark Mode
function darkMode(){

    document.body.classList.toggle("dark");


    let isDark =
    document.body.classList.contains("dark");


    localStorage.setItem(
        "darkMode",
        isDark
    );

}




// Tasbih
function increaseTasbih(){

    count++;


    document.getElementById("count").innerHTML =
    count;


    localStorage.setItem(
        "tasbihCount",
        count
    );


    if(count === 99){

        let type =
        document.getElementById("tasbihType").value;


        alert(
        "MashaAllah! You completed 99 " + type + " 🤲"
        );

    }

}




function resetTasbih(){

    count = 0;


    document.getElementById("count").innerHTML =
    count;


    localStorage.setItem(
        "tasbihCount",
        count
    );

}





// Favourite Dua
function saveDua(){

    let dua =
    document.getElementById("duaText").innerHTML;


    localStorage.setItem(
        "favoriteDua",
        dua
    );


    document.getElementById("savedDua").innerHTML =
    "⭐ Favourite Dua Saved";

}





// Dua Search
function searchDua(){

    let input =
    document.getElementById("duaSearch").value.toLowerCase();


    let duas =
    document.querySelectorAll("#duaList p");


    duas.forEach(function(dua){

        let text =
        dua.innerText.toLowerCase();


        if(text.includes(input)){

            dua.style.display = "block";

        }else{

            dua.style.display = "none";

        }

    });

}





// Prayer Checklist
function loadPrayerProgress(){

    let prayers =
    document.querySelectorAll(
        'input[type="checkbox"]'
    );


    prayers.forEach((prayer,index)=>{


        let saved =
        localStorage.getItem(
            "prayer" + index
        );


        if(saved === "true"){

            prayer.checked = true;

        }


    });

}





// Navigation

function showHome(){

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

}



function showDuas(){

    document.getElementById("duaList").scrollIntoView({
        behavior:"smooth"
    });

}



function showTasbih(){

    document.getElementById("count").scrollIntoView({
        behavior:"smooth"
    });

}



function showAbout(){

    document.querySelector("section:last-of-type")
    .scrollIntoView({
        behavior:"smooth"
    });

} if ("serviceWorker" in navigator) {

    navigator.serviceWorker.register("service-worker.js")
    .then(function(){

        console.log("Nuraq Prayers offline support ready");

    });

              }
