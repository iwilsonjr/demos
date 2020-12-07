// JavaScript Document

$(document).ready(function(){
//Start JQuery Code	

	var sticky = new Waypoint.Sticky({
	  element: $("#planSummary")
	});

	//Help
	$(".help, .ajaxHelp").each(function() {
		$(this).qtip({			
			show: {
				fixed: true,
				event: 'click mouseenter',
				solo: true
			},
			hide: {
				event: 'unfocus mouseleave',
				fixed: true,
				delay: 400
			},       	
			content: {
				text: $($(this).attr("href")).html()
			},	
		    style: {
		        classes: 'qtip-help'
		    }, 
			position: {
				target: 'event',
				viewport: $(window)
			} 		    		    					
		});
	});

	$(".help, .ajaxHelp").on("click keypress", function(){ 		
		return false;
	});
	
	//Fancybox
	
	$(".fancybox").fancybox({
		type: 'ajax',
		maxWidth: 700,
		padding: 0
	});
	
/*
		$(".closePopup").on("click", function(event)){
			$.fancybox.close();
			event.preventDefault ? event.preventDefault() : event.returnValue = false;

		});
*/



//End JQuery Code
});	