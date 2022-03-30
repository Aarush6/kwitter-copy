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
var roomname = localStorage.getItem("Room_name");

function mesg() {
    var messg = document.getElementById("msg").value;
    firebase.database().ref(roomname).push({
        user_name: username,
        message: messg,
        like: 0,

    });
    document.getElementById("msg").value = "";

}

function getData() {
    firebase.database().ref("/" + roomname).on('value', function(snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function(childSnapshot) {
            childKey = childSnapshot.key;               
            childData = childSnapshot.val();
            if (childKey != "purpose") {
                firebase_message_id = childKey;
                message_data = childData;
                //Start code
name= message_data["user_name"];
message= message_data["message"];
like= message_data["like"];
usernamee="<h4>" + name + "</h4>"
messssage="<h4 class='message_h4'>" + message + "</h4>"
likkke="<button onclick='more(this.id)' class='btn btn-danger' id="+firebase_message_id +" value="+like+">";
likkke2="<span class='glyphicon glyphicon-thumbs-up'> Like: " +like+"</span> </button> <hr>"  ;
roww=usernamee + messssage + likkke+likkke2;
document.getElementById("output").innerHTML += roww

                //End code
            }
        });
    });
}
getData();

function more(message_id){
button_id=message_id;
likes=document.getElementById(button_id).value;
likedos= Number(likes)+1;

firebase.database().ref(roomname).child(message_id).update({
    like: likedos
});
}
function leave(){
    localStorage.removeItem(roomname);
    localStorage.removeItem(username);
    window.location.replace("index.html");
}