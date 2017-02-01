$(document).ready(function(){
//Start JQuery Code

//Fixed Trip Summary
var sticky = new Waypoint.Sticky({
	element: $("#planSummary")
});

//Promo
$("#applyPromo").click(function(){
	$("#enterPromo").addClass("hide");
	$("#confirmPromo").removeClass("hide");
});

$("#removePromo").click(function(){
	$("#enterPromo").removeClass("hide");
	$("#confirmPromo").addClass("hide");
	return false;
});

	
//End JQuery Code
});