

// Set up Firebase
var firebaseConfig = {
  // Your Firebase config object goes here
  apiKey: "AIzaSyB8YewfAZ-PDqmgDRUq_ULzQ3YgjqPoDvE",

  authDomain: "career-navigation-b89c4.firebaseapp.com",

  databaseURL: "https://career-navigation-b89c4-default-rtdb.firebaseio.com",

  projectId: "career-navigation-b89c4",

  storageBucket: "career-navigation-b89c4.appspot.com",

  messagingSenderId: "732370256789",

  appId: "1:732370256789:web:7a2a7abd2d0c68f1d5ac9c",

  measurementId: "G-DBT5SEKQYK"

};

firebase.initializeApp(firebaseConfig);

// Sign up
$("#signInn").click(function(event){
    event.preventDefault();
    var email = $("input#email").val();
    var password = $("input#password").val();
    console.log(email,password)
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed up successfully
        var user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
      });
  });
  
  // Sign in
  $("#log").click(function(q){
    q.preventDefault();
    var email = $("input#email").val();
    var password = $("input#password").val();
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in successfully
        var user = userCredential.user;
        console.log(user);
        window.location.href="../interest.html";
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
      });
  });
  