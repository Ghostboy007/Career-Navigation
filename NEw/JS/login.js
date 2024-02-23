$('#signup').click(function () {
  $('#first').fadeOut('fast', function () {
    $('#second').fadeIn('fast')
  })
})

$('#signin').click(function () {
  $('#second').fadeOut('fast', function () {
    $('#first').fadeIn('fast')
  })
})

$(document).ready(function () {
  // Initialize Firebase
  var firebaseConfig = {
    apiKey: 'AIzaSyB8YewfAZ-PDqmgDRUq_ULzQ3YgjqPoDvE',

    authDomain: 'career-navigation-b89c4.firebaseapp.com',

    databaseURL: 'https://career-navigation-b89c4-default-rtdb.firebaseio.com',

    projectId: 'career-navigation-b89c4',

    storageBucket: 'career-navigation-b89c4.appspot.com',

    messagingSenderId: '732370256789',

    appId: '1:732370256789:web:7a2a7abd2d0c68f1d5ac9c',

    measurementId: 'G-DBT5SEKQYK'
  }
  firebase.initializeApp(firebaseConfig)

  // Get a reference to the database service
  var database = firebase.database()

  // Get a reference to the registration form
  var form = $('form[name="registration"]')

  // Listen for the form submit event
  form.submit(async function (event) {
    event.preventDefault() // Prevent the default form submission

    // Get the form data
    var firstName = $('#firstname').val()
    var lastName = $('#lastname').val()
    var email = $('#emails').val()
    var password = $('#passwords').val()
    console.log(firstName, email, password)

    // Create a new user with the email and password
    const userCredential = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)

    // Get the user's ID token
    const idToken = await userCredential.user.getIdToken()

    // Save the user's information to the database
    await database.ref('users/' + userCredential.user.uid).set({
      firstName: firstName,
      lastName: lastName,
      email: email,
      idToken: idToken
    })

    // Redirect to the dashboard page
    window.location.href = 'login.html'
  })

  var database = firebase.database()

  // Get a reference to the registration form
  var form2 = $('form[name="login"]')

  // Listen for the form submit event
  form2.submit(async function (event) {
    event.preventDefault()

    var email = document.getElementById('emailss').value
    var password = document.getElementById('passwordss').value

    console.log(email, password)

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(function (userCredential) {
        const email = userCredential.user

        alert('User Logged IN')
        localStorage.setItem('idToken', email)
        window.location.href = 'interest.html'

      })
      .catch(function (error) {
        // Handle errors
        var errorCode = error.code
        var errorMessage = error.message
        console.error(errorCode + ': ' + errorMessage)
        alert(errorMessage)
      })
  })
})

// $(document).ready(function () {
//   $("#log").click(function (q) {
//     q.preventDefault();
//     window.location.href = "../interest.html";
//   });
// });
// var Fname1;
// function Name(name1, name2) {
//   this.Firstname = name1;
//   this.Lastname = name2;
// }
// Name.prototype.fullname = function () {
//   return this.Firstname + " " + this.Lastname;
// }
// $(document).ready(function () {
//   $("#signInn").click(function (event) {
//     event.preventDefault();
//     var Fname = $("input#firstname").val();
//     var Lname = $("input#lastname").val();
//     var mail = $("input#email").val();
//     var Pass = $("input#password").val();
//     var Cpass = $("input#Cpassword").val();
//     var newperson = new Name(Fname, Lname);
//     window.location.href = "interest.html"
//     Fname1 = newperson.fullname();
//     $("#namess").append(Fname1);
//     $("#sasasa").append(Fname1);
//   });
// });
