

//Reference
var db = firebase.database();

var filesRef = db.ref('files');

filesRef.on('value', showData, showError);

function showData(items) {
	var _ul = document.getElementsByTagName('ul')[1];
	var _content = '';

	items.forEach( function(child) {
		_content += "<li><div class='body-card-class' id='cardData'><div class='row'><div class='col-md-10'><div class='top-card-class'><i class='gold fa fa-bookmark fa-2x' aria-hidden='true'></i><span> Gratis</span><h3 id='title'>" + child.val().name + "</h3><a id='name'>" + child.val().user + "</a></div></div><div class='col-md-2'><div class='menu-card-catalog'><a href='" + child.val().url + "' class='btn btn-lg btn-success pull-right' target='_blank' download>Unduh</a></div></div></div></div></li>";
	})

	_ul.innerHTML = _content;
	console.log(items.val())

}

function showError(err) {
	console.log(err)
}

var download = document.getElementById('download')

function Download() {
	var storageRef = firebase.storage().ref();
	// Create a reference to the file we want to download
	var starsRef = storageRef.child('2.jpg');

	// Get the download URL
	starsRef.getDownloadURL().then(function(url) {
	  // Insert url into an <img> tag to "download"
	}).catch(function(error) {

	  // A full list of error codes is available at
	  // https://firebase.google.com/docs/storage/web/handle-errors
	  switch (error.code) {
	    case 'storage/object_not_found':
	      // File doesn't exist
	      break;

	    case 'storage/unauthorized':
	      // User doesn't have permission to access the object
	      break;

	    case 'storage/canceled':
	      // User canceled the upload
	      break;

	    case 'storage/unknown':
	      // Unknown error occurred, inspect the server response
	      break;
	  }
	});
}

function Logout() {
	firebase.auth().signOut().then(function() {
	  window.location = "index.html";
	}).catch(function(error) {
	  // An error happened.
	});
}