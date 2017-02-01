// JavaScript Document

$(document).ready(function(){
//Start JQuery Code

	//Benefits Display
	$(".benefits .btnLink").on("click", function(){

		$(".benefitsTable").toggleClass("openBenefits");						

		if($(this).text().search("all") > -1) {
			$(".benefits .btnLink").text("View less");
		} else {
			$(".benefits .btnLink").text("View all");		
		};

		return false;
	});

	$(".benefits .btnLink").on("keydown", function(e){

 		var keyCode = e.keyCode || e.which;

	    if (keyCode == '13') {
	        //e.preventDefault();			

			$(".benefitsTable").toggleClass("openBenefits");						

			if($(this).text().search("all") > -1) {
				$(".benefits .btnLink").text("View less");
			} else {
				$(".benefits .btnLink").text("View all");		
			};
		} else {
			$(".extras label:eq(0)").focus();
		}

		return false;
	});	

	//Select Plan
	$("[name='selectPlan']").on("click", function(){
		var id = $(this).val();		
		$(".plans").addClass("show-for-sr");			
		$("#" + id).removeClass("show-for-sr");	
	});

	$("[name='selectPlan']").on("keydown", function(e){

	    var keyCode = e.keyCode || e.which;

	    if (keyCode == "9" || keyCode == "13") {
			var id = $(this).val();		
			$(".plans").addClass("show-for-sr");			
			$("#" + id).removeClass("show-for-sr");	
			$("#" + id + " .help:eq(0)").focus()
			$(this).trigger("click");
			return false;    
	    } 		
			 
	});	

	//Luggage - Initialization
/*
	if ($("[name^='luggage']").val() == "Yes") {
		$(this).parent("li").addClass("selected");
		$("#luggageItemsContainer").removeClass("hide");
	} else {
		$(this).parent("li").removeClass("selected");
		$("#luggageItemsContainer").addClass("hide");		
	}
*/

	//Luggage
/*
	$("[name^='luggage']").on("change", function(){
		if ($(this).val() == "Yes") {
			$(this).parent("li").addClass("selected");
			$("#luggageItemsContainer").removeClass("hide");						
		} else {
			$(this).parent("li").removeClass("selected");
			$("#luggageItemsContainer").addClass("hide");			
		}
	});	
*/

	 $(".luggage").on("click keypress", function(){ 
     if($("input[name^='luggage']:checked").val().toLowerCase() == 'yes') {
	 	$('#luggageItemsContainer').removeClass('hide');      
    }
    else {
    $('#luggageItemsContainer').addClass('hide');
    }
  });
  


	 $(".rental").on("click keypress", function(){ 
     if($("input[name^='rental']:checked").val().toLowerCase() == 'yes') {
	 	$('.selectOptionRental').removeClass('hide');      
    }
    else {
    $('.selectOptionRental').addClass('hide');
    }
  });
  
 













	// Sticky Sidebar

	 var w = 0;

	$(window).load(function(){
	
	   w = $(window).width();
	   checkSticky();
	
	});
	
	$(window).resize(function(){
	
	  if (w != $(window).width()){
				
	    w = $(window).width();
	    
	    	checkSticky();	
	
	  }
	
	});
	
	function checkSticky() {
	
	if (w > 1024) {
		    
		    turnOnSticky();
	    } else {
		    
		    turnOffSticky();
	    }

	}
	
	function turnOnSticky() {

		$(".stickyGroup").stick_in_parent({parent: '.outerContainer', offset_top: 20});

	}
	
	function turnOffSticky() {
		$(".stickyGroup").trigger("sticky_kit:detach");
	}


//End JQuery Code
});
