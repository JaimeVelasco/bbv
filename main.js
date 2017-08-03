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

setTimeout(function () {
	$(".modal").addClass("is-active");
}, 1000);


$('.modal-close, .noThanks').click(function() {
		$(".modal").removeClass("is-active");
});


$("#formSubmit").click(function(event) {
	// get email, zip and name to be posted
	var email = document.getElementById('email').value
	var zipCode = document.getElementById('zipCode').value
	var name = document.getElementById('name').value
	// format payload for zapier
	var zdata = formatForZapier(email, zipCode, name)

	if (email !== "" && zipCode !== "" && name !== "") {
		console.log("validateEmail(email)", validateEmail(email));
		if (validateEmail(email)) {
			console.log("inside", validateEmail(email));
			 event.preventDefault()

			// post
			$.ajax({
				url: 'https://hooks.zapier.com/hooks/catch/2256084/5e9szr/',
				type: 'POST',
				processData: true,
				data : zdata ,
				success : function(data) {
					console.log("success", data)
					$("#pincheForm").submit()
				},
				error: function(data){
					console.log("error", data)
				}
			});
		} else if (!validateEmail(email)){
			// event.preventDefault()
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
