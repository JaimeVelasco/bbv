// Get video aligned to top and preserve aspect-ratio on all device sizes
var distance = $('.bv_mission').offset().top,
$window = $(window);
$window.scroll(function() {
$window.scrollTop()
 if ( $window.scrollTop() >= distance ) {
		 $('.fullscreen-bg').css('display', 'none');
 }
 else  {
		 $('.fullscreen-bg').css('display', 'block');
 }
});



// Inital modal logic:
// Age verification first, then email collector.
// Trigger Email modal if browser does not have cookie
if (localStorage.getItem("bumbleBee") !== "true" && $("#minAgeCheck").hasClass("is-active") === false ) {
 setTimeout(function () {
	 $("#collector").addClass("is-active");
 }, 2000);
};

if (localStorage.getItem("overage") === "true") {
 $("#minAgeCheck").removeClass("is-active");
 if (localStorage.getItem("bumbleBee") !== "true") {
	 setTimeout(function () {
		 $("#collector").addClass("is-active");
	 }, 2000);
 };
} else {
 $("#minAgeCheck").addClass("is-active");
}

// Close minAgeCheck
$('#over').click(function() {
	 $(".modal").removeClass("is-active");
	 localStorage.setItem("overage", true);
	 if (localStorage.getItem("bumbleBee") !== "true") {
		 setTimeout(function () {
			 $("#collector").addClass("is-active");
		 }, 2000);
	 };
});

$('#under').click(function() {
	 $(".minAgeCheck").addClass("hidden");
	 $(".underAge").removeClass("hidden");
	 setTimeout(function () {
		 window.location.href = "http://www.apa.org/monitor/2015/11/marijuana-brain.aspx";
	 }, 3000);
});


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


// Pens info
$('.pen1').click(function() {
	 $("#pen1").addClass("is-active");
});

$('.pen2').click(function() {
	 $("#pen2").addClass("is-active");
});

$('.pen3').click(function() {
	 $("#pen3").addClass("is-active");
});



// FAQ tabs
$('ul.tabsjs li').click(function(){
	var tab_id = $(this).attr('data-tab');
	$('ul.tabsjs li').removeClass('is-active');
	$('.tab-content').removeClass('is-active');
	$(this).addClass('is-active');
	$("#"+tab_id).addClass('is-active');
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
				//  Provide feedback to user
				 $(".collectContainer").addClass("hidden")
				 $(".sentMessage").removeClass("hidden")

				//  Set localStorage item on browser
				 localStorage.setItem("bumbleBee", true);

				 // reload/submit after 3 seconds
				 setTimeout(function () {
					 $("#pincheForm").submit()
				 }, 3000);
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

 function validateEmail(email) {
		 var regex =  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
		 return regex.test(email);
 }
});
// END OF SUBMIT FORM event
