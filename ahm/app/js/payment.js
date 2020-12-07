$(document).ready(function(){
//Start JQuery Code

	var sticky = new Waypoint.Sticky({
	  element: $("#planSummary")
	});

	// Placeholders - IE9
	$("input").placeholder();
	
	//Payment Method
	$("[name='paymentMethod']").click(function(){

		if ($(this).val() == "paypal") {
				$("[type='submit']").val("Continue to PayPal").addClass("btnPayPal");
				$(".purchaseList > li").not(".payment").addClass("hide");
				$(".purchaseList").attr("aria-live","polite");				
			} else {
				$("[type='submit']").val("Pay now").removeClass("btnPayPal");	
				$(".purchaseList > li").removeClass("hide");
				$(".purchaseList").attr("aria-live","");													
		}	

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

//End JQuery Code
});