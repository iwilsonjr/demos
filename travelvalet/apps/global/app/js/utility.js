// JavaScript Document

//Just testing - remove at will
/*$("a").bind("click, tap", function(){
	$.mobile.changePage( $(this).attr("href"), { transition: "fade"} );
});*/

$(document).ready(function(){
//Start JQuery Code

  $.mobile.ajaxEnabled = false;  

	$("#countryTabs a").bind("click, tap", function(){
		$("#countryTabs li").removeClass("selected");
		$(this).parent().addClass("selected");
		href = $(this).attr("href");
		$("#displayCountry, #changeCountry").addClass("hide");
		$(href).removeClass("hide");
		
		if(!$("#changeCountry").hasClass("hide")){
			$(".infoCards").css("display", "none");
		} else {
			$(".infoCards").css("display", "block");
		}
	});
	
	$("#selectCountry").change(function(){
		//$("form").submit();
		
		//AJAX state restore
		$("#countryTabs li").removeClass("selected");
		$("#countryTabs li:first").addClass("selected");
		
		$("#changeCountry").addClass("hide");
		$("#displayCountry").removeClass("hide");	
		
		$(".infoCards").css("display", "block");
	});
	
//End JQuery Code
});

