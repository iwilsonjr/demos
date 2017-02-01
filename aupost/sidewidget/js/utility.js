// JavaScript Document

$(document).ready(function(){
//Start JQuery Code

  
  	//Print functionality
	$("#btnPrint").on("click keypress", function(){
		window.print();
		return false;
	});

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
				event: 'blur mouseleave',
		        fixed: true,
		        delay: 300				
			},       	
			content: {
				text: $($(this).attr("href")).html()
			},	
		    style: {
		        classes: 'qtip-help'
		    }, 
		    position: {
		    	target: 'event'
		    }		    		    					
		});
	});


//End JQuery Code
});

