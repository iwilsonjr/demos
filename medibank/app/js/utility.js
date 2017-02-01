// JavaScript Document

$(document).ready(function(){
//Start JQuery Code

  	//Close Window functionality
	$("#closeLink").on("click keypress", function(){
		window.close();
		return false;
	});	

  	//Navigation
	$("#navSummary").on("click keypress", function(){
		$("#planSummary").toggleClass("openSummary");
		return false;
	});		

	//Help
	$(".help").each(function() {
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

	$(".help").on("click keypress", function(){ 		
		return false;
	});


//End JQuery Code
});

