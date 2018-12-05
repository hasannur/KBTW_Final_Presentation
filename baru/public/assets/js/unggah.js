firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    var email = user.email;
    console.log(email);
  } else {
    window.location = "index.html";
  }
});

var db = firebase.database();

var filesRef = db.ref('files');

var fileUpload = document.getElementById('file');
var progress = document.getElementById('progress');
var emailUser = '';	

var judul = document.getElementById('judulMateri');


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
  	emailUser = user.email;
  } else {

  }
});

function Upload() {

	if (judul.value.length < 2) {
		  alert('Masukan judul materi');
		  judul.focus();
		  return;
		}
		if (fileUpload.value.length < 2) {
		  alert('Pilih berkas yang ingin diunggah');
		  fileUpload.focus();
		  return;
		}
	//Get file
	var file = fileUpload.files[0];

	//Create a storage ref
	var storageRef = firebase.storage().ref();
	var fileRef = storageRef.child(file.name);

	//Upload file
	var task = fileRef.put(file);

	//Update progress bar
	task.on('state_changed',

		function progress(snapshot) {
			var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			document.getElementById('barUpload').style.display = "block";
			document.getElementById('progress').style.width = percentage + '%';
			$("#progress").text(Math.round(percentage) + "%");
		},

		function error(err) {

		},

		function complete() {

			task.snapshot.ref.getDownloadURL().then(function(downloadURL) {

				filesRef.on('child_added', addData);

				filesRef.push({
					name: judul.value,
					url: downloadURL,
					user: emailUser
				})

				function addData() {
					console.log("Data berhasil ditambah");
				}

				swal({
			      title: "Berhasil!", 
			      text: "Berkas berhasil diunggah!", 
			      type: "success",
			    }, function() {
			      // Redirect the user
			      window.location.href = "unggah.html";
			    });
	    	})
		}
	);
}

function Logout() {
	firebase.auth().signOut().then(function() {
	  window.location = "index.html";
	}).catch(function(error) {
	  // An error happened.
	});
}