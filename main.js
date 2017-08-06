// Initialize Firebase
var config = {
	apiKey: "AIzaSyDTchze2Ms9gTlcaJW8J4wrP5BgyrQ_wlw",
	authDomain: "bumblebee-2053b.firebaseapp.com",
	databaseURL: "https://bumblebee-2053b.firebaseio.com",
	projectId: "bumblebee-2053b",
	storageBucket: "bumblebee-2053b.appspot.com",
	messagingSenderId: "847168397202"
};

firebase.initializeApp(config);



// FirebaseUI config.
var uiConfig = {
	signInSuccessUrl: '/bbv/admin.html',
	signInOptions: [
		// Leave the lines as is for the providers you want to offer your users.
		firebase.auth.GoogleAuthProvider.PROVIDER_ID
	],
	// Terms of service url.
	tosUrl: '/tos'
};

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);




// Trigger Email modal if browser does not have cookie
if (localStorage.getItem("bumbleBee") !== "true") {
	setTimeout(function () {
		$(".modal").addClass("is-active");
	}, 1000);
}

// Toggle mobile menu
$(".burger").click(function() {
		$(".burger").toggleClass("is-active");
		$(".navbar-menu").toggleClass("is-active");
});




$("#products").click(function() {
		$('html, body').animate({
				scrollTop: $(".bv_pens").offset().top
		}, 2000);
		$(".burger").removeClass("is-active");
		$(".navbar-menu").removeClass("is-active");
});

$("#shop").click(function() {
		$('html, body').animate({
				scrollTop: $(".bv_shop").offset().top
		}, 2000);
		$(".burger").removeClass("is-active");
		$(".navbar-menu").removeClass("is-active");
});

$("#events").click(function() {
		$('html, body').animate({
				scrollTop: $(".bv_events").offset().top
		}, 2000);
		$(".burger").removeClass("is-active");
		$(".navbar-menu").removeClass("is-active");
});

$("#locator").click(function() {
		$('html, body').animate({
				scrollTop: $(".bv_locate").offset().top
		}, 2000);
		$(".burger").removeClass("is-active");
		$(".navbar-menu").removeClass("is-active");
});

$("#faq").click(function() {
		$('html, body').animate({
				scrollTop: $(".bv_faq").offset().top
		}, 2000);
		$(".burger").removeClass("is-active");
		$(".navbar-menu").removeClass("is-active");
});




// Close emailCollector
$('.modal-close, .noThanks').click(function() {
		$(".modal").removeClass("is-active");
});

// Remove cookie if user declines email form
$('.noThanks').click(function() {
		localStorage.setItem("bumbleBee", true);
});

// Submit email form
$("#formSubmit").click(function(event) {
	// get email, zip and name to be posted
	var email = document.getElementById('email').value
	var zipCode = document.getElementById('zipCode').value
	var name = document.getElementById('name').value
	// format payload for zapier
	var zdata = formatForZapier(email, zipCode, name)
	// If no empty fields
	if (email !== "" && zipCode !== "" && name !== "") {
		if (validateEmail(email)) {
			 event.preventDefault()
			// post to Zapier webhook
			$.ajax({
				url: 'https://hooks.zapier.com/hooks/catch/2256084/5e9szr/',
				type: 'POST',
				processData: true,
				data : zdata ,
				success : function(data) {
					console.log("success", data)
					// reload/submit
					$("#pincheForm").submit()
					// create cookie
					localStorage.setItem("bumbleBee", true);
				},
				error: function(data){
					console.log("error", data)
				}
			});
		} else if (!validateEmail(email)){
			// Validate Email form (on top of HTML5's built in validation)
			var element = document.getElementById("email");
				element.oninvalid = function(e) {
						e.target.setCustomValidity("");
						if (!e.target.validity.valid) {
								e.target.setCustomValidity("Something is wrong with your email");
						}
				};
				element.oninput = function(e) {
						e.target.setCustomValidity("");
				};
		}
	}


	function validateEmail(email) {
			var regex =  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
	    return regex.test(email)
	}


  function formatForZapier(email, zipCode, name){
		var date = new Date()
    var payload ={
      "email": email,
			"name": name,
			"zipCode": zipCode,
			"date": date.toLocaleString('en-US')
    };
    // return json string of payload
    return JSON.stringify(payload)
  }
});
