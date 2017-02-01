$(document).ready(function(){
//Start JQuery Code

// Begin Datepicker

$("#travelDate").on("focus", function(){
	$(".countryDisplay").fadeOut("300");
	$(".hasDatepicker").fadeIn("200");
	$(this).addClass("focusLevel"); 	
});

var datepicker__updateDatepicker = $.datepicker._updateDatepicker;
$.datepicker._updateDatepicker = function( inst ) {
   datepicker__updateDatepicker.call( this, inst );
}

 var cur = -1, prv = -1;
 $('#calendarDate')
	.datepicker({
		
		  dateFormat: "DD dd/mm/yy",
		  showOn: "both",
		  numberOfMonths: 2,
		  showButtonPanel: false,		  
		  minDate: 0,
		  dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],

		  beforeShowDay: function ( date ) {
			  if (date.getTime() == Math.min(prv, cur)) {
				  viewDate = 'date-range-selected-start';
			  } else if (date.getTime() == Math.max(prv, cur)) {
				  viewDate = 'date-range-selected-end';
			  } else if (date.getTime() >= Math.min(prv, cur) && date.getTime() <= Math.max(prv, cur)) {
				  viewDate = 'date-range-selected'			
			  } else {
				  viewDate = '';
			  }								

			   return [true, viewDate];

			 },

		  onSelect: function ( dateText, inst ) {
				var d1, d2;

				prv = cur;
				cur = (new Date(inst.selectedYear, inst.selectedMonth, inst.selectedDay)).getTime();
				if ( prv == -1 || prv == cur ) {
				   prv = cur;
				   $('#departureDate').val(dateText);
				   $('#travelDate').focus();
				   $('#travelDate').val(dateText);			   
				} else {
				   t1 = $.datepicker.formatDate( 'dd-mm-yy', new Date(Math.min(prv,cur)), {} );
				   t2 = $.datepicker.formatDate( 'dd-mm-yy', new Date(Math.max(prv,cur)), {} );					
				   d1 = $.datepicker.formatDate( 'DD dd/mm/yy', new Date(Math.min(prv,cur)), {} );
				   d2 = $.datepicker.formatDate( 'DD dd/mm/yy', new Date(Math.max(prv,cur)), {} );
				   $('#departureDate').val(t1);
				   $('#returnDate').val(t2);
				   $('#travelDate').val(d1 + " - " + d2);
				   $('#calendarDate').delay(700).fadeOut("100", function(){
					   $('#travelDate').removeClass("focusLevel"); 				   	
				   });

				}
						   
			 },

		  onChangeMonthYear: function ( year, month, inst ) {
				//prv = cur = -1;				
			 }
	});

	$(document.body).click(function(e) {
	  if( !$(e.target).is("#calendarDate, #calendarDate *, #travelDate, .ui-datepicker-next *, .ui-datepicker-prev *") ) {
	    $('#calendarDate').fadeOut("200");
		$('#travelDate').removeClass("focusLevel");     
	  }
	});

// End Datepicker



	/* 
		Country Selector Functionality
	----------------------------------*/

	//Country Selection - List
	$(".column label").on("click", function(){

		test = countryBuilder($(this).text(),$(this).parents(".columns").siblings("label").text());

		if (test == true) {
			$(".countryDisplay").fadeOut("300").attr("hidden","hidden");	
			$("#country").removeAttr("disabled");			
			$("#country").removeClass("focusLevel");  	
			$("#selector").removeClass("openCountry");
		} else { 
			return test;
		}

	})

	//Closing UI
	$("body").on("click", function(e){

		if( !$(e.target).is("#selector") ) {
			$(".countryDisplay").fadeOut("300").attr("hidden","hidden");	
			$("#selector").removeClass("openCountry");	
			$("#country").removeAttr("disabled");
        	$("#country").autocomplete('clear');	
			$("#country").removeClass("focusLevel");    						
		}		

	})

	$('.countryDisplay').on('click', function(e) {
	    e.stopPropagation();
	});

	//Default Loading
	/*if ($("[name='destinationCountryID']:checked").length > 0) {
		$("#country").val($("[name='destinationCountryID']:checked").siblings("label").text());	
	}*/

	//FF Field Display - Autocomplete
	$("#country").on ("keyup", function(){
		$(".ui-listview").addClass("ui-listview-active");

		if ($("#country").val().length > 0) {
			$(this).addClass("focusLevel");
		} else {
			$(this).removeClass("focusLevel");			
		}
	});

	$(document.body).click(function(e) {
	  if( !$(e.target).is(".ui-listview") ) {
		$(".ui-listview").removeClass("ui-listview-active");	  	
		$("#country").removeClass("focusLevel");
	  }
	});	

	//Opening UI
	$("#selector").on("click", function(e){
		$(".countryDisplay").fadeIn("300").removeAttr("hidden");
		$(this).addClass("openCountry");
		$("#country").attr("disabled","disabled");
		$("#country").addClass("focusLevel");
        $("#country").autocomplete('clear');	
	    e.preventDefault();
	    e.stopPropagation();	
			
		//Set Initial Value
		if ($("#country").val() != "") {

			idCountry = $("#country").val().split("-")[0].trim();
			idRegion = $("#country").val().split("-")[1].trim();

			$(".columns label").each(function( index ) {

				if ($(this).text() == idCountry) {

					if ($(this).parents(".columns").siblings("label").text() == idRegion) {		

						var test = {};

						if (document.body.clientWidth > 800) {
						 		test = $(".columns");						
							} else {													  	
							  	test = $("#groups-container");
						}

						test.scrollTop(0);
						test.animate({scrollTop: $(this).position().top}, 0);

					}
				}
			});

		}

	})


	//Region Selection - List
	$(".group-label").on("click", function(){		

		$("[name='findCountry']").removeAttr("checked");

		if (document.body.clientWidth < 800) {

			regionID = $("#" + $(this).attr("for"));
			if (regionID.prop("checked")){
				regionID.prop("checked", false);
				return false;
			}
			
		} else {

			thisTop = $(this).position().top;
			setTimeout(function(){
					$("#groups-container").scrollTop(thisTop);
			}, 50);	
		}

	});

	//Removing Countries
	$("#countryLister").on("click", "button", function(){
		$(this).parent("li").remove();
	});


	//Children Ages

	//Initialization 
	childrenCounter($("#numberChildren").val())

	//Select number of children
	$("#numberChildren").change(function(){
		childrenCounter($(this).val());
	})

	//Adult Ages

	//Initialization 
	adultCounter($("#numberAdults").val())

	//Select number of adults
	$("#numberAdults").change(function(){
		adultCounter($(this).val());
	})

	//Location Switcher
	heroSwitcher();


  //Carousel 
  $('.owl-carousel').owlCarousel({
    loop: true,
    margin: 10,
    autoplay: true,
    autoplayTimeout: 12000,
    autoplaySpeed: 5000,
    navText:['previous','next'],
    responsiveClass:true,
    responsive:{
        0:{
            items:1,
            nav:false
        },
        640:{
            items:1,
            nav:true
        },
        1000:{
            items:1,
            nav:true
        }
    },
    animateOut: 'fadeOut'       
  });

//Default Region/Mobile - Added 11/23/15  
  defaultRegion();  

  $(window).resize(function(){  
    defaultRegion(); 
  });


//End JQuery Code
});

//Functionality
function childrenCounter(test){
	if (test > 0) {
		$("#childTravellers li").addClass("hide");		
		$("#childTravellers").removeClass("hide");
		$("#childTravellers li:lt(" + test + ")").removeClass("hide");
	} else {
		$("#childTravellers").addClass("hide");	
	}
}	

//Functionality
function adultCounter(test){
	if (test > 0) {
		$("#adultTravellers li").addClass("hide");		
		$("#adultTravellers").removeClass("hide");
		$("#adultTravellers li:lt(" + test + ")").removeClass("hide");
	} else {
		$("#adultTravellers").addClass("hide");		
	}
}	


//jQM code/Autocomplete
$("html").bind("pagebeforechange", function(e) {

    var data = [];

    $(".column label").each(function( index, value ){
        data[index] = $(this).text() + " - " + $(this).parents(".columns").siblings("label").text();
    });

    $("#country").autocomplete({
        target: $('#suggestions'),
        source: data,
        link: '#',
        minLength: 1,
        callback: function(e) {
            var $a = $(e.currentTarget);

            if ($a.text().search("See All Regions") > -1) {

				$(".countryDisplay").fadeIn("300").removeAttr("hidden");
				$(this).addClass("openCountry");
				$("#country").attr("disabled","disabled").val(""); 
	            $("#country").autocomplete('clear');				
				$(".ui-listview").removeClass("ui-listview-active");  

            } else {

	            //Set Value
	            idCountry = $a.text().split("-")[0].trim();
	            idRegion = $a.text().split("-")[1].trim();

	            //Build DOM elements
				test = countryBuilder(idCountry,idRegion);   	            

				if (test == true) {

		            $("#country").autocomplete('clear');
		           	$("#country").removeClass("focusLevel").val("");            
					$(".ui-listview").removeClass("ui-listview-active");  					

					//For Grid
		            $(".column label").each(function( index, value ){
		                if (idCountry == $(this).text()){
		                	if (idRegion == $(this).parents(".columns").siblings("label").text()) {              	
			                    $("#" + $(this).attr("for")).prop("checked", true); //set country     
		                    }                       
		                }
		            });


		            $(".group-label").each(function( index, value ){
		                if (idRegion == $(this).text()){
		                    $("#" + $(this).attr("for")).prop("checked", true); //set region                       
		                }
		            });	  					

				}
          

            } 

        }                  
    }); 
});	

/* Country Lister */
function countryBuilder(country,region) {

	var countryReady = true;

    $(".column label").each(function( index, value ){
        if (country == $(this).text()){
        	//if (region == $(this).parents(".columns").siblings("label").text()) { 
        		countryID = $("#" + $(this).attr("for")).val();         		  
		        regionID = $("#" + $(this).parents(".columns").siblings("label").attr("for")).val();

        		//Check for duplicates
			    $("[name='destinationCountryID']").each(function( index, value ){
			        if (countryID == $(this).val()){
			        	countryReady = false;
			        }
			    });	
                     
        }
    });

	if (countryReady == true) {
		//DOM Building
		var button = "<button type='button'>" + country + "</button>";
		var countryInfo = "<input type='hidden' name='destinationCountryID' value='" + countryID + "'>";
		var regionInfo = "<input type='hidden' name='regionID' value='" + regionID + "'>";

		$("#countryLister").prepend("<li>" + button + countryInfo + regionInfo + "</li>");			    
	}    


	return countryReady;
}

//Hero Image Switcher
function heroSwitcher(){

	heroID = Math.floor(Math.random() * $(".locations li").length);
	$(".locations li:eq(" + heroID + ")").removeClass("hide");

}

//Default Region/Mobile - Added 11/23/15
function defaultRegion(){

  var flag = $("[name='regionID']:first");
  var area = flag.siblings(".columns").find("input:checked").length;
  var test = $("[name='destinationCountryID']:checked").length;


if (test == 0){
  if (document.body.clientWidth < 980) {
    if ((flag.prop("checked") == true) && (area == 0)){
      flag.prop("checked", false);
    }
  } else {
    flag.prop("checked", true);
  }
}
  
}