// Import the functions you need from the SDKs you need
 // import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js";
  //import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyDN_awI-XQC7VJLmoDRoy7GTNS0cadVY5U",
    authDomain: "kwitter-d52b7.firebaseapp.com",
    databaseURL:"https://kwitter-d52b7-default-rtdb.firebaseio.com/",
    projectId: "kwitter-d52b7",
    storageBucket: "kwitter-d52b7.appspot.com",
    messagingSenderId: "621789878674",
    appId: "1:621789878674:web:4173e8408c93435309c94b",
    measurementId: "G-HJHPZW39VQ"
  };

  firebase.initializeApp(firebaseConfig);

  user_name = localStorage.getItem("user_name");
  room_name = localStorage.getItem("room_name");

  function send(){
    msg = document.getElementById("msg").value;
    console.log(room_name);
   firebase.database().ref(room_name).push({
     name:user_name,
     message : msg,
     like:0
   });

   document.getElementById("msg").value="";
  }

  function logout() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
        window.location = "index.html";
    }
   
    function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
      firebase_message_id = childKey;
      message_data = childData;
//Start code
      console.log(firebase_message_id);
      console.log(message_data);
      name = message_data['name'];
      message = message_data['message'];
      like = message_data['like'];
      name_with_tag = "<h4> "+ name +"<img class='user_tick' src='tick.png'></h4>";
      message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
like_button ="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
      span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";

     row = name_with_tag + message_with_tag +like_button + span_with_tag;       
     document.getElementById("output").innerHTML += row;
//End code
   } });  }); }
getData();

function updateLike(message_id){
  console.log("click on like button -"+ message_id);
  button_id=message_id;
 likes=document.getElementById(button_id).value;
 update_likes=Number(likes) +1;
 console.log(update_likes)

 firebase.database().ref(room_name).child(message_id).update({
   like:update_likes,
 })
}
function getData() {
  firebase.database().ref("/" + room_name).on('value', function(snapshot) {
    try {
      document.getElementById("output").innerHTML = "";
      snapshot.forEach(function(childSnapshot) {
        // ... your existing code ...
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      // Display an error message to the user
    }
  });
}
// Allow read access to all users
"rules"; {
  ".read"; true,

  // Allow write access only to authenticated users
  ".write";"auth != null"
}