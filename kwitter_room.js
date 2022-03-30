var firebaseConfig = {
    apiKey: "AIzaSyCugMZ70AN3Vh0qM_Gl2WAdq2HkzAU0x20",
    authDomain: "twitter-rip-off-9ce8c.firebaseapp.com",
    databaseURL: "https://twitter-rip-off-9ce8c-default-rtdb.firebaseio.com",
    projectId: "twitter-rip-off-9ce8c",
    storageBucket: "twitter-rip-off-9ce8c.appspot.com",
    messagingSenderId: "343495414652",
    appId: "1:343495414652:web:f508776699994a764f4af9"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var username = localStorage.getItem("username");
document.getElementById("user_name").innerHTML = "Welcome " + username + "!";

function getData() {
    firebase.database().ref("/").on('value', function(snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function(childSnapshot) {
            childKey = childSnapshot.key;
            Room_names = childKey;
            //Start code
            console.log("Room-Name-" + Room_names);
            row = "<div id=" + Room_names + " class='room_name' onclick='teleport(this.id)'># " + Room_names + " </div><hr>";
            document.getElementById("output").innerHTML += row; //End code
        });
    });
}
getData();

function teleport(name) {
    console.log(name);
    localStorage.setItem("Room_name", name);
    window.location = "kwitter_page.html";
}

function leave() {
    localStorage.removeItem("username");
    localStorage.removeItem("Room_name");
    window.location = "index.html";

}

function Add() {
    var Room_name = document.getElementById("room_name").value;
    firebase.database().ref("/").child(Room_name).update({
        purpose: "Room Name"
    });
    localStorage.setItem("Room_name", Room_name);
    window.location = "kwitter_page.html";
}