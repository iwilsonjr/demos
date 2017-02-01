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

	$("[type='submit']").click(function(){

		if (($("[name='existingCondition_1']:checked").val() === "No") && ($("[name='assessment_1_q1']:checked").val() === "No") && ($("[name='assessment_1_q2']:checked").val() === "No")) { //Add addition condition to logic 

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