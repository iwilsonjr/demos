$(document).ready(function(){
//Start JQuery Code

  	//Print functionality
	$(".print").on("click keypress", function(){
		window.print();
		return false;
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