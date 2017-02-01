// JavaScript Document

$(document).ready(function(){
//Start JQuery Code

	$("li.level-2 button").on("click", function(){
		$(this).parent().toggleClass("expand");
		if ($(this).text() == "+ Expand") {
			$(this).text("- Close");
		} else {
			$(this).text("+ Expand");			
		}
	})
  
	$(".btnNavigation").on("click", function(){
		$(".primary-nav").toggleClass("openNav");
		$(".level-2").removeClass("expand");
		$("li.level-2 button").text("+ Expand");				
	})  

//End JQuery Code
});

