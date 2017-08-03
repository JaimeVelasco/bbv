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


$("#formSubmit").click(function() {
	// get email, zip and name to be posted
	var email = document.getElementById('email').value
	var zipCode = document.getElementById('zipCode').value
	var name = document.getElementById('name').value
	// format payload for zapier
	var zdata = formatForZapier(email, zipCode, name)
	// log in console
	console.log(zdata)

	// post
	 $.ajax({
		 url: 'https://hooks.zapier.com/hooks/catch/2256084/5e9szr/',
		 type: 'POST',
		 processData: true,
		 data : zdata ,
		 success : function(data) {
			 console.log(data)
		 },
		 error: function(data){
			 console.log(data)
		}
	 });

  function formatForZapier(email, name, zipCode){
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
