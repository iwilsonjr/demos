// JavaScript Document

$(document).ready(function(){
//Start JQuery Code


	var sticky = new Waypoint.Sticky({
	  element: $("#planSummary")
	});

	//Carousel	
	function runCarousel() {
	$('.carousel').owlCarousel({
	    center: true,
	    items:1,
	    loop:false,
	    margin:15,
// 	    onResize: callback,
	    responsive:{
	        320:{
	            items:1,
	            touchDrag: true,
	            mouseDrag: true,
	            stagePadding: 35
	        },
	        480:{
	            items:2,
	            touchDrag: true,
	            mouseDrag: true,
	            stagePadding: 0,
	            margin: 30,
	            center: true
	        },
	        768:{
	            items:2,
	            touchDrag: true,
	            mouseDrag: true,
	            stagePadding: 0,
	            margin: 100,
	            center: true
	        },
	        800:{
	            items:3,
	            center: false,
	            touchDrag: false,
	            mouseDrag: false,
	            stagePadding: 15,
	            margin: 15,
	        },
	        930:{
	            items:3,
	            center: false,
	            touchDrag: true,
	            mouseDrag: true,
	            stagePadding: 0,
	            margin: 20
	        }
	    }
	});
	
	}
	
	
	/*
		I'm destroying the carousel on resize each time so if a user goes from landscape to portrait on a tablet, the scrolling will work on tap. If this is causing issues we can remove this fix and try something else
		
	*/
	runCarousel();
/*
	function callback(event) {
	    $('.carousel').trigger('destroy.owl.carousel');
	    $('.owl-stage-outer section').unwrap();
	    runCarousel();
	}
*/
	
	// Fixes a js error (can be removed if causing issues)
	$( '.carousel *' ).on( 'click change', function(event) {
		event.stopPropagation();
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

	//Benefits Display
	$(".benefits .btnLink").on("click", function(){

		$(".benefits").toggleClass("openBenefits");						

		if($(this).text().search("all") > -1) {
			$(".benefits .btnLink").text("Show less");
		} else {
			$(".benefits .btnLink").text("Show all");		
		};

		return false;
	});

	$(".benefits .btnLink").on("keydown", function(e){

 		var keyCode = e.keyCode || e.which;

	    if (keyCode == '13') {
	        //e.preventDefault();			

			$(".benefitsTable").toggleClass("openBenefits");						

			if($(this).text().search("all") > -1) {
				$(".benefits .btnLink").text("Show less");
			} else {
				$(".benefits .btnLink").text("Show all");		
			};
		} else {
			$(".extras label:eq(0)").focus();
		}

		return false;
	});	

	//Select Plan
	$("[name='selectPlan']").on("click", function(){
		$('section').removeClass('selected');
		$(this).parents('section').addClass('selected');
		$(this).parents('h2').attr("id","selectedPlan");
		$('.extras').removeClass('hide').attr("aria-describedby", $(this).parents('section').attr("id"));		
	});

/*
	$("[name='selectPlan']").on("keydown", function(e){

	    var keyCode = e.keyCode || e.which;

	    if (keyCode == "9" || keyCode == "13") {
			var id = $(this).val();		
			$(".plans").addClass("show-for-sr");			
			$("#" + id).removeClass("show-for-sr");	
			$("#" + id + " .help:eq(0)").focus()
			$(this).trigger("click");
			return false;    
	    } 		
			 
	});	
*/

 if($(".extras input[type='checkbox']").is(':checked')){
			$(this).parent("li").addClass("selected");
			$(this).next().children('span').html('Remove');
			$(this).next().children('i').removeClass();
			$(this).next().children('i').addClass('icon-minus');
		} else {
			$(this).parent("li").removeClass("selected");
			$(this).next().children('span').html('Add');
			$(this).next().children('i').removeClass();
			$(this).next().children('i').addClass('icon-plus');
		}
	
	
	$(".extras input[type='checkbox']").on("change", function(){
		   if($(this).is(':checked')){
			$(this).parent("li").addClass("selected");
			$(this).next().children('span').html('Remove');
			$(this).next().children('i').removeClass();
			$(this).next().children('i').addClass('icon-minus');
		} else {
			$(this).parent("li").removeClass("selected");
			$(this).next().children('span').html('Add');
			$(this).next().children('i').removeClass();
			$(this).next().children('i').addClass('icon-plus');
		}
	});



	//Luggage - Initialization
	if ($("[name^='luggage']").is(':checked')){
		$("#luggageItemsContainer").removeClass("hide");
	} else {
		$("#luggageItemsContainer").addClass("hide");		
	}

	//Luggage
	$("[name^='luggage']").on("change", function(){
		   if($(this).is(':checked')){
			$("#luggageItemsContainer").removeClass("hide");						
		} else {
			$("#luggageItemsContainer").addClass("hide");			
		}
	});
	
	//Rental - Initialization
	if ($("[name^='rental']").is(':checked')){
		$(".rentalAmount").removeClass("hide");
		$('.extras').addClass("taller");
	} else {
		$(".rentalAmount").addClass("hide");
		$('.extras').removeClass("taller");		
	}

	//Rental
	$("[name^='rental']").on("change", function(){
		   if($(this).is(':checked')){
			$(".rentalAmount").removeClass("hide");
			$('.extras').addClass("taller");					
		} else {
			$(".rentalAmount").addClass("hide");	
			$('.extras').removeClass("taller");			
		}
	});	

	//Help
/*
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
*/


//End JQuery Code
});
