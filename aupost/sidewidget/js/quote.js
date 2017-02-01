$(document).ready(function(){
//Start JQuery Code

// Begin Datepicker

$("#travelDate").on("focus", function(){
	$(".countryDisplay").fadeOut("300");
	$(".hasDatepicker").css("display","block");
	$(this).addClass("focusLevel"); 
});

var datepicker__updateDatepicker = $.datepicker._updateDatepicker;
$.datepicker._updateDatepicker = function( inst ) {
   datepicker__updateDatepicker.call( this, inst );
}

 var cur = -1, prv = -1;
 $('#calendarDate')
	.datepicker({
		
		  dateFormat: "dd/mm/yy",
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
				   d1 = $.datepicker.formatDate( 'dd/mm/yy', new Date(Math.min(prv,cur)), {} );
				   d2 = $.datepicker.formatDate( 'dd/mm/yy', new Date(Math.max(prv,cur)), {} );
				   $('#departureDate').val(t1);
				   $('#returnDate').val(t2);
				   $('#travelDate').val(d1 + " - " + d2);
				   $('#calendarDate').delay(700).fadeOut("100", function(){
					   $('#travelDate').removeClass("focusLevel"); 	
					   $('#totalAdults').focus();			   	
				   });

				}
						   
			 },

		  onChangeMonthYear: function ( year, month, inst ) {
				//prv = cur = -1;				
			 }
	});

	$(document.body).click(function(e) {
	  if( !$(e.target).is("#calendarDate, #calendarDate *, #travelDate, .ui-datepicker-next *, .ui-datepicker-prev *, .ui-datepicker-next, .ui-datepicker-prev") ) {
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
		$("#country").val($(this).text() + " - " + $(this).parents(".columns").siblings("label").text());
		$(".countryDisplay").fadeOut("300").attr("hidden","hidden");	
		$("#country").removeAttr("disabled");			
		$("#country").removeClass("focusLevel");  	
		$("#selector").removeClass("openCountry");
	})

	//Closing UI
	$("body").on("click", function(e){

		if( !$(e.target).is("#selector") ) {
			$(".countryDisplay").fadeOut("300").attr("hidden","hidden");	
			$("#selector").removeClass("openCountry");	
			$("#country").removeAttr("disabled");
        	$("#country").autocomplete('clear');	
			$("#country").removeClass("focusLevel");    	
			if ($("#country").val() == "") $("[name='regionID'], [name='destinationCountryID']").prop("checked", false);    					
		}		

	})

	$('.countryDisplay').on('click', function(e) {
	    e.stopPropagation();
	});

	//Default Loading
	if ($("[name='destinationCountryID']:checked").length > 0) {
		$("#country").val($("[name='destinationCountryID']:checked").siblings("label").text());	
	}

	//FF Field Display - Autocomplete
	$("#country").on("keydown", function(e){

		$(".ui-listview").addClass("ui-listview-active");
		$(this).addClass("focusLevel");
		var keyCode = e.keyCode || e.which;

	    if (keyCode == '9' || keyCode == '40') {
			e.preventDefault();
	        $("#suggestions > li:first-child > a").focus();

	        $(this).parent().find("a").keydown(function(e) {
				e.preventDefault();
				$(this).parent().next().find("a").focus();
			});			
		} 
			
		if (keyCode == '38') {
			e.preventDefault();
			$(this).parent().prev().find("a").focus();			
	    }    

		if (keyCode == '27') {
			$("#selector").focus();							
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

		$("[name='destinationCountryID']").removeAttr("checked");
		$("#country").val("");

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


	//Children Ages

	//Initialization 
	childrenCounter($("#totalChildren").val())

	//Select number of children
	$("#totalChildren").change(function(){
		childrenCounter($(this).val());
	})

	//Adult Ages

	//Initialization 
	adultCounter($("#totalAdults").val())

	//Select number of adults
	$("#totalAdults").change(function(){
		adultCounter($(this).val());
	})


	$(".help").on("click focus", function(){ 
	    $('#calendarDate').fadeOut("200");
		$('#travelDate').removeClass("focusLevel");
		$(".ui-listview").removeClass("ui-listview-active");	  	
		$("#country").removeClass("focusLevel");	
		
		$(".countryDisplay").fadeOut("300").attr("hidden","hidden");	
		$("#selector").removeClass("openCountry");	
		$("#country").removeAttr("disabled");
    	$("#country").autocomplete('clear');				
		return false;
	});

	keyChanger();
	monthChanger();
	monthChanger2();	

	$(".ui-datepicker tbody a").on("keydown", function(e){

		var keyCode = e.keyCode || e.which;

	    if (keyCode == '27') {

		    $('#calendarDate').fadeOut("200");
			$('#travelDate').removeClass("focusLevel");    
			$("#totalAdults").focus();
	    }	

	    if (keyCode == '39') {
			e.preventDefault();   	
			$(this).parent().next().find("a").focus();
		} 	
		
	    if (keyCode == '37') {
			e.preventDefault();	    	
			$(this).parent().prev().find("a").focus();
		} 		    		

	});	
		

//End JQuery Code
});

//DateChanger
function keyChanger(){

	$(".ui-datepicker-group-last tbody a:last").on("keydown", function(e){

		var keyCode = e.keyCode || e.which;

	    if (keyCode == '9') {

			$(".ui-datepicker-next").trigger("click");
			$(".ui-datepicker-group-first tbody a:first").focus();	

			keyChanger();

			return false;

	    }			

	});	

}

function monthChanger(){

	$(".ui-datepicker tbody tr td:last-child a").on("keydown", function(e){

		var keyCode = e.keyCode || e.which;

	    if (keyCode == '39') {
			///e.preventDefault();			 	    	
			$(this).parent().parent().next().children("td:first-child").find("a").trigger("focus");
			monthChanger();	

			return false;					
		} 		    		

	});		

}

function monthChanger2(){	

	$(".ui-datepicker tbody tr td:first-child a").on("keydown", function(e){

		var keyCode = e.keyCode || e.which;

	    if (keyCode == '37') {
			//e.preventDefault();	    	
			$(this).parent().parent().prev().children("td:last-child").find("a").trigger("focus");
			monthChanger2();

			return false;							
		} 		    		

	});		

}


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

            	$("#country").val($a.text());

	            $("#country").autocomplete('clear');
	           	$("#country").removeClass("focusLevel");            
				$(".ui-listview").removeClass("ui-listview-active");  

	            //Set Value
	            idCountry = $a.text().split("-")[0].trim();
	            idRegion = $a.text().split("-")[1].trim();

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

            $("#selector").focus();	

        }                  
    }); 
});	