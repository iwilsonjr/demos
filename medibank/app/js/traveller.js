// JavaScript Document


$(document).ready(function(){
//Start JQuery Code

	// Placeholders - IE9
	$("input").placeholder();

	//Datepicker
	$(".dob").on("focus", function(){

		id = "#" + $(this).attr("id");
		calendarId = "#calendar_" + $(this).attr("id").slice(-1);

		$(calendarId).fadeIn("200")		

		$(calendarId).datepicker({

			dateFormat: "dd/mm/yy",
			changeYear: true,
			changeMonth: true,
			dayNamesMin: [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ],  
			yearRange: "-99:+0",
			altField: id,
			onSelect: function(){
				$(calendarId).fadeOut("200");	
			}		
		});	

	});	

  $(".dob").on("keydown", function(e){

    e.preventDefault();
    var keyCode = e.keyCode || e.which;

		id = "#" + $(this).attr("id");
		calendarId = "#calendar_" + $(this).attr("id").slice(-1);    

	    if (keyCode == "9" || keyCode == "13") {
			$(calendarId).fadeOut("200");   
			if (calendarId == "#calendar_1") {
				$("#state").focus();
			} else {
				$(this).siblings(".help").focus();				
			}
	    } 

  }); 	

	$(document.body).click(function(e) {
	  if( !$(e.target).is(".calendarDate, .calendarDate *, .dob") ) {
	    $('.calendarDate').fadeOut("200");    	    
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
	

	$("[type='submit']").click(function(){

		if (($("[name='existingCondition_1']:checked").val() === "No") && ($("[name='emc_1_q1']:checked").val() === "No") && ($("[name='emc_1_q2']:checked").val() === "No")) { //Add addition condition to logic 

			$.fancybox.open({
				type: 'ajax',
				href: 'ajax/emc-confirm.html',
				maxWidth: 500,
				padding: 0,
				beforeShow: ajaxLoader
			});

		} 
		return false;
	});

//End JQuery Code
});

function ajaxLoader(){

	$("#emcConfirmCancel").click(function(){
		$.fancybox.close();
	});
	$("#emcConfirmContinue").click(function(){
		$("#quoteForm").submit();
	});		
}