var userName = document.getElementById('userName');
var txtEmail = document.getElementById('txtEmail');
var txtPassword = document.getElementById('txtPassword');
var btnLogin = document.getElementById('btnLogin');

var txtName = document.getElementById('txtName');
var txtEmail2 = document.getElementById("txtEmail2");
var txtPassword2 = document.getElementById('txtPassword2');
var btnRegister = document.getElementById('btnRegister');

txtEmail2.focus();

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    var email = user.email;
    console.log(email);
    window.location = "index.html";
  } else {
    // User is signed out.
    // ...
  }
});

function login() {
  var email2 = txtEmail2.value;
  var password2 = txtPassword2.value;

  firebase.auth().signInWithEmailAndPassword(email2, password2).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
    window.alert(errorMessage);
    
  });
}

function register() {
  var name = txtName.value;
  var email = txtEmail.value;
  var password = txtPassword.value;

  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
    window.alert(errorMessage);
    swal("Berhasil!", "Anda dapat masuk dengan menggunakan akun tersebut.", "success");
  });
}