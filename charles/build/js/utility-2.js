// Initialization
var localPath = "/wp-content/themes/charles/";

//Navigation
if (!$("html").hasClass("ie-8")) {
	$("#btnNavigation, .navPrimary li:nth-child(3) a").on("click", function(){
		$(".container").toggleClass("jsNavOpen");
		$(".ajaxWindow").remove();
		$(".navPrimary li:last-child").removeClass("selected");	
		$(".navPrimary li:nth-child(3)").toggleClass("selected");	
		return false;
	});
}

//Navigation Form
$("#archivesForm").on("submit", function(){
	if ($("#archives").val() == '') { 
		return false;
	}		
});

$("#searchForm").on("submit", function(){
	if ($("#inputSearch").val() == '') { 
		return false;
	}	
});	

//Contact Window
$(".navPrimary li:last-child").on("click", "a", function(){

	contactLink = $(this).parent();

	if (!contactLink.hasClass("selected")) {

		if($(".container").hasClass("jsNavOpen")) {
			$(".container").removeClass("jsNavOpen");
		}		
		
		var openContact = '<div class="ajaxWindow"><div class="loading"><img src="' + localPath + 'images/content/loading.png" width="163" height="163" alt="Loading..." /></div></div>';

		$("body").append(openContact);
				
		$(".ajaxWindow").load("/contact #contactForm", function(){

			$("loading").remove();

			$("#contactForm").before('<a href="#" class="closeWindow">[X] Close</a>');				

				$('#contactForm').submit(function() {

					$('#contactForm .error').remove();

					var hasError = false;

					$('.requiredField').each(function() { //Work borrowed/modified from Trevor Davis - http://trevordavis.net/blog/wordpress-jquery-contact-form-without-a-plugin

						if($.trim($(this).val()) == '') {

							var labelText = $(this).prev('label').text();
							$(this).before('<span class="error">You forgot to enter your '+labelText+'.</span>');
							hasError = true;

						} else if($(this).hasClass('email')) {

							var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

							if(!emailReg.test($.trim($(this).val()))) {
								var labelText = $(this).prev('label').text();
								$(this).before('<span class="error">You entered an invalid '+labelText+'.</span>');
								hasError = true;

							}
						}
					});

					if(!hasError) {


						$("#contactForm").remove();
						$(".ajaxWindow").append('<div class="loading"><img src="' + localPath + 'images/content/loading.png" width="163" height="163" alt="Loading..." /></div>');

						var formInput = $(this).serialize();

						$.post($(this).attr('action'),formInput, function(data){
							$('.loading').remove();		
							$('.ajaxWindow').prepend('<p class="thanks"><strong>Thanks!</strong> Your email was successfully sent. I check my email all the time, so I should be in touch soon.</p>');						
						});

					}
					
					return false;
					
				});

			
			$(".ajaxWindow .closeWindow").on("click tap", function() {
				$(".ajaxWindow").remove();
				contactLink.removeClass("selected");
				return false;
			});

		});			

		contactLink.addClass("selected");
		$(".navPrimary li:nth-child(3)").removeClass("selected");				

	 } else {

		$(".ajaxWindow").remove();
		contactLink.removeClass("selected");

	 }

	return false;		
});	