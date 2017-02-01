// JavaScript Document

$(document).ready(function() {
	
	$(".benefits li a").bind("mouseenter mouseleave click", function(){
		
		$(".helpBenefits li").css("position","absolute");
		$($(this).attr("href")).css("position", "static");
		return false;
	});
	

	$(".expandBenefits").fancybox({
		openEffect	: 'none',
		closeEffect	: 'none',
		afterLoad: function(){ // Remove Active Help Window - Added 3/12/14
			$(".qtip").qtip("hide");	
		}
	});
	
	$(".priceCover").on("click", function(){

		var quote = $(this).parents(".quoteGroup");
		quote.removeClass("fadeIn").addClass("fadeOut").css("z-index","0");
		quote.siblings(".benefitGroup").removeClass("fadeIn").addClass("fadeOut").css("z-index","0");

		var id = $($(this).attr("href"));
		id.children(".quoteGroup").removeClass("fadeOut").addClass("fadeIn").css("z-index","1");
		id.children(".benefitGroup").removeClass("fadeOut").addClass("fadeIn").css("z-index","1");	

		$(".qtip").qtip("hide"); //Remove Active Help Window - Added 3/12/14	
		return false;
	});
	
	$(".includeLink").on("click", function(){
		$(".benefits").toggleClass("benefitsHide");		
		return false;
	});	

	//Help Tips - Added 3/12/14
	$(".help").each(function()
	{  
	  var contentHelp = $($(this).attr("href")).html();
	  var positionHelp = $(this);
	  
	  $(this).qtip({
		  content: {
			 text: contentHelp,
			 button: true
		  },
		   show: 'click',		
		   hide: 'click', 
		   style: {
			 classes: 'excessHelp'
		   }
	  });
	});

	$(".help").click(function(){
		$(".qtip").qtip("hide");	
	  return false; 
	});


});