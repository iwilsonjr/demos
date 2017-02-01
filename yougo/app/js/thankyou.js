// JavaScript Document

$(document).ready(function(){
//Start JQuery Code

$(".pickPhoto").click(function(){
	$(".selectPhoto").empty();
	$(".selectPhoto").removeClass("showPhotos");
	$(this).siblings(".selectPhoto").addClass("showPhotos").load("ajax/select-photo.html");
	return false;
});

$(".selectPhoto").on("click", ".submit", function(){
	//alert("yes");
	$(this).parent().empty();
	$(".selectPhoto").removeClass("showPhotos");
	return false;
});
  
//End JQuery Code
});

