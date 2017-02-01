$(document).ready(function(){
//Start JQuery Code

	// Placeholders - IE9
	$("input").placeholder();
	
	//Payment Method
	$("[name='paymentMethod']").click(function(){

		if ($(this).val() == "paypal") {
				$("#purchaseButton, #submitForm").val("Continue to PayPal");
				$(".buttonWell").removeClass("purchaseWell").addClass("paypalWell");
				$("#payment").addClass("hide");
			} else {
				$("#purchaseButton, #submitForm").val("Purchase");				
				$(".buttonWell").addClass("purchaseWell").removeClass("paypalWell");
				$("#payment").removeClass("hide");				
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