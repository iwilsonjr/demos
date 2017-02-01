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
	$("#btnNavigation").on("click keypress", function(){
		$("nav").toggleClass("openNavigation");
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
				event: 'unfocus mouseleave'
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

	/*$(".help").on("mouseleave", function(){
		$(this).qtip('hide', true); 		
		return false;
	})*/

	$(".help").on("click keypress", function(){ 		
		return false;
	});

	//Plans 
	$(".view a").on("click keypress", function(){
		$(this).toggleClass("open");
		$($(this).attr("href")).toggleClass("hide");
		return false;
	});	 	

//End JQuery Code
});

