var btnLogin = document.getElementById('btnLogin');
var btnLogout = document.getElementById('btnLogout');
var menu = document.getElementById('menu');
var opsi = document.getElementById('opsi');
var username = document.getElementById('username');

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
  	var email = user.email;
    btnLogin.style.display = "none";
    btnLogout.style.display = "block";
    menu.style.display = "none";
    opsi.style.display = "block";
    username.style.display = "block";
    username.textContent = "Selamat datang, " + email;
  } else {
    btnLogin.style.display = "block";
    btnLogout.style.display = "none";
    menu.style.display = "block";
    opsi.style.display = "none";
    username.style.display = "none";

  }
});

function logout() {
	firebase.auth().signOut().then(function() {
	  window.location = "index.html";
	}).catch(function(error) {
	  // An error happened.
	});
}