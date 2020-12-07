// JavaScript Document

$(document).ready(function(){
//Start JQuery Code

  
  	//Print functionality
	$("#btnPrint").on("click keypress", function(){
		window.print();
		return false;
	});

  	//Trip Summary
	$("#navSummary").on("click", function(){
		displayCostSummary();
		return false; 
	});	

  	//Trip Summary
	$("#navSummary").on("keypress", function(e){

	    var keyCode = e.keyCode || e.which;

	    if (keyCode == '9') {
			displayCostSummary();
	    } 		

		return false;
	});	



//End JQuery Code
});

function displayCostSummary(){

	$("#planSummary").toggleClass("openSummary"); 

	if($("#navSummary").attr("aria-live") != "polite") {
		$("#navSummary").attr("aria-live","polite");
	} else {
		$("#navSummary").attr("aria-live","");
	}

	if($("#navSummary").text().search("Display") > -1) {
		$("#navSummary").text("Hide Cost Summary");
	} else {
		$("#navSummary").text("Display Cost Summary");		
	};	

}