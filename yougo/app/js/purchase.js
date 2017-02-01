// JavaScript Document

$(document).ready(function(){

 /* Placeholders/Plugin */ 
	$('input').placeholder();	

	$("[type='button']").on("click", function(){
		$(this).attr("disabled", "disabled").addClass("saveDiscount");
		$(".priceTable").attr("aria-live", "polite"); //* Just add when table has been fully updated
	})
	
//End JQuery Code
});

