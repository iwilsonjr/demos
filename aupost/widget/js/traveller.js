// JavaScript Document


$(document).ready(function(){
//Start JQuery Code

	//Fixed Trip Summary
	var sticky = new Waypoint.Sticky({
		element: $("#planSummary")
	});


	//Datepicker
	$(".dob").on("focus", function(){

		id = "#" + $(this).attr("id");
		calendarId = "#calendar_" + $(this).attr("id").slice(-1);

		$(calendarId).datepicker({

			dateFormat: "dd/mm/yy",
			numberOfMonths: 1,
			showButtonPanel: false,
			changeYear: true,
			changeMonth: true,
			showAnim: "",
			dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
			yearRange: "-99:+0",
			altField: id,
			onSelect: function(){
				$(".hasDatepicker").fadeOut("200");
				$(".dob").removeClass("focusLevel");								
			}		
		});

		$(this).siblings(".hasDatepicker").fadeIn("200");
		$(this).addClass("focusLevel");		

	});


	
	
	$(document.body).click(function(e) {
	  if( !$(e.target).is(".calendarDate, .calendarDate *, .dob") ) {
	    $('.calendarDate').fadeOut("200");	
		$(".dob").removeClass("focusLevel");	    	    
	  }
	});



//End JQuery Code
});
