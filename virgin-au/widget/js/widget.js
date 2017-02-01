var formIsEnabled = false;
var  selectedStart;
var selectedEnd;

jQuery.validator.addMethod("isValidResident", function(value, element, params) {
  return $('[name=isResident]:checked').val() == 'Yes';
}, jQuery.validator.format("All travellers must be Australian residents."));

jQuery.validator.addMethod("isValidDepartureDate", function(value, element, params) {
  return validateDepartureDate();
}, jQuery.validator.format("Departure date cannot be in the past."));

jQuery.validator.addMethod("isValidTripStart", function(value, element, params) {
  return validateStartDate();
}, jQuery.validator.format("Departure date cannot exceed 548 days in the future."));

jQuery.validator.addMethod("isValidReturnDate", function(value, element, params) {
  return validateReturnDate();
}, jQuery.validator.format("Return date cannot be prior to your departure date."));

jQuery.validator.addMethod("isValidTripLength", function(value, element, params) {
  return validateTripLength();
}, jQuery.validator.format("Trip length cannot exceed 1 year."));

$(document).ready(function(){
//Start JQuery Code

// Placeholders - IE9
// $("input").placeholder();

// Begin Datepicker

	//Datepicker
	$("#departureDate").focus(function(){
		$("#departureDateDisplay").fadeIn("200");
		$("#returnDateDisplay").fadeOut("200");

		$("#departureDateDisplay").datepicker({
			dateFormat: 'DD dd/mm/yy',
			minDate: 0,  
			dayNamesMin: [ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa" ],  
			firstDay: 0,
			altField: "#departureDate",
			onSelect: function(date) {
				$("#returnDateDisplay").fadeIn("200");
				$("#departureDateDisplay").fadeOut("200");		
				$("#returnDate").focus();	
			}		
		});

	});

	$("#returnDate").focus(function(){
		$("#returnDateDisplay").fadeIn("200");
		$("#departureDateDisplay").fadeOut("200");

		$("#returnDateDisplay").datepicker({
			dateFormat: "DD dd/mm/yy",
			minDate: 0,
			dayNamesMin: [ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa" ],  
			firstDay: 0,
			altField: "#returnDate",
			onSelect: function(date) {				
				$("#returnDateDisplay").fadeOut("200");			
			}							
		}); 

	});	

	$(document.body).click(function(e) {
	  if( !$(e.target).is(".calendarDate, .calendarDate *, #departureDate, #returnDate, .ui-datepicker-next, .ui-datepicker-next *, .ui-datepicker-prev, .ui-datepicker-prev *") ) {
	    $(".calendarDate").fadeOut("200"); 
	  }
	});

  // Calendar Close - Keyboard
  $("#departureDate").on("keydown", function(e){

    e.preventDefault();
    var keyCode = e.keyCode || e.which;

    if ((!e.shiftKey && keyCode == "9") || keyCode == "13") {
		$("#departureDateDisplay").fadeOut("200"); 
		$('#returnDate').focus();        
    } 

	if (e.shiftKey && keyCode == "9") {
		$("#departureDateDisplay").fadeOut("200");
		//$("#returnDateDisplay").fadeOut("200"); 		 
		$('#country').focus();	
	}   

  }); 	

  $("#returnDate").on("keydown", function(e){

    e.preventDefault();
    var keyCode = e.keyCode || e.which;

    if ((!e.shiftKey && keyCode == "9") || keyCode == "13") {
		//$("#departureDateDisplay").fadeOut("200"); 
		$("#returnDateDisplay").fadeOut("200"); 		
		$("[data-hasqtip='2']").focus();        
    } 

	if (e.shiftKey && keyCode == "9") {
		$("#returnDateDisplay").fadeOut("200"); 
		$('#returnDate').focus();	
	}       

  }); 	


// End Datepicker


	/* 
		Country Selector Functionality
	----------------------------------*/

	//Country Selection - List
	  $("#countryDisplay .column label").on("click", function(){

	    //Build DOM elements	  
	  
	    test = countryBuilder($(this));

	    if (test == true) {

	      $("#countryDisplay").fadeOut("300").attr("hidden","hidden");  
	      $("#country").removeClass("focusLevel");    
	      $("#selector").removeClass("openCountry");

	    } else { 
	      return test;
	    }

	  })

	//Closing UI - Revised 3/3/16
	$("body").on("click", function(e){

		if( !$(e.target).is("#selector, #selectRegion a, #country") ) {
			$("#countryDisplay").fadeOut("300").attr("hidden","hidden");	
			$("#country").removeClass("focusLevel");
			$("#selectRegion").removeClass("selectRegion-active");
			$("#selector").removeClass("openCountry");	
			$(".ui-autocomplete").css("display","none");											    	 					
		}		

	})

	$('#countryDisplay').on('click', function(e) {
	    e.stopPropagation();
	});

	$("#country").on("blur", function(e){
		if($('input[name=regionID]').is(':checked') && $('input[name=destinationCountryID]').is(':checked')) {
		 if($('#country').val().toLowerCase() != $('label[for=country-'+$('input[name=regionID]:checked').val()+'-'+$('input[name=destinationCountryID]:checked').val()).text().toLowerCase()) {
		$('#country').val($('label[for=country-'+$('input[name=regionID]:checked').val()+'-'+$('input[name=destinationCountryID]:checked').val()).text());
		}
	}
	});

	//FF Field Display - Autocomplete
	$("#country").on("focus keydown", function(e){

	    //e.preventDefault();
	    var keyCode = e.keyCode || e.which;

		//$(this).addClass("focusLevel");
		$("#selector").addClass("openCountry");	
		$("#countryDisplay").fadeOut("50").attr("hidden","hidden");		
		$(this).val($(this).val().trim()); /* Mobile Autocomplete Issue Fix - Added 5/16/16 */

	    if (keyCode == '9') {

			if ($("#country").val().length == 0) {
				//$("#popular a:eq(0)").focus();
			} else {
				$('#selector').focus();  
            	//$("#country").removeClass("focusLevel"); 				
				$(this).val("");	
				$("#selectRegion").removeClass("selectRegion-active");	
				$("#selector").removeClass("openCountry");				
				return false;			
			}    
	    } 		

	});

   $("input[name=destinationCountryID]").on("change", function(){
  		$('#country').removeClass('error');
  		$('input[name=destinationCountryID]').removeClass('error');
  		$('input[name=regionID]').removeClass('error');
    	$('#whereareyougoing-error').remove();     
   });  	

	$("#selectRegion a").on("keydown", function(e){

	    //e.preventDefault(); 
	    var keyCode = e.keyCode || e.which;

	    if (keyCode == '9') {
	      $('[data-hasqtip="4"]').focus();  
          $("#country").removeClass("focusLevel"); 	 	        
      	  $("#selectRegion").removeClass("selectRegion-active");  
		  $("#selector").removeClass("openCountry");      	         
	    } 

    });  
	

	//Popular Destinations Functionality
	$("#selectRegion a").on("click", function(){

		$("#countryDisplay").fadeIn("300").removeAttr("hidden");
        $("#country").removeClass("focusLevel"); 
		$("#selectRegion").removeClass("selectRegion-active");	

		return false;	  

    });

	$("#selectRegion a").on("keydown", function(e){

	   // e.preventDefault(); 
	    var keyCode = e.keyCode || e.which;

	    if (keyCode == '9') {
	      $('[data-hasqtip="1"]').focus();         
	    } 

    });  


	$("#country").on("keyup", function(){

		if ($("#country").val().length == 0) {
			$(".ui-autocomplete").css("display","none");
			$("#selectRegion").removeClass("selectRegion-active");	
	      	$("#country").removeClass("focusLevel");  			

		} else {
			$("#selectRegion").addClass("selectRegion-active");			
			$(".ui-autocomplete").css("display","block");
	      	$("#country").addClass("focusLevel");  
		}		

	});	

	$("#country").on("keydown", function(e){

	    var keyCode = e.keyCode || e.which;

		if ($("#country").val().length == 0) {
	    

		    if (keyCode == '13') {
		      e.preventDefault();                
		    } 			    

		} else {

		    if (keyCode == '27') {
		      $('[data-hasqtip="1"]').focus();          
		    } 

		    if (keyCode == '13') {
		      e.preventDefault();  
			  //$(this).addClass("focusLevel");     
		    } 		    

		}

  	});      



	//Opening UI
	$("#selector").on("click", function(e){ 

		if ($("#countryDisplay").attr("hidden") == "hidden"){

			$("#countryDisplay").fadeIn("300").removeAttr("hidden");
			$("#country").addClass("focusLevel");
			$("#selectRegion").removeClass("selectRegion-active");
			$(".ui-autocomplete").css("display","none");

		} else {

			$("#countryDisplay").fadeOut("300").attr("hidden","hidden");
			$("#country").removeClass("focusLevel");	

		}

	    e.preventDefault();
	    e.stopPropagation();	

	    //Top position with scrolling
		if ($("#country").val() != "") {

			$(".columns label").each(function( index ) {

				if ($(this).text() == $("#country").val()) {

					$("#groups-container").scrollTop(0);
					$("#groups-container").animate({scrollTop: $(this).position().top}, 0);

				}
			});

		}		

	});


	//Region Selection - List
	$(".group-label").on("click", function(){		

		$("[name='findCountry']").prop("checked", false);

		if (document.body.clientWidth < 960) {

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


	//Autocomplete
    var data = [];

    $("#countryDisplay .column label").each(function( index, value ){       
		data[index] = $(this).text();		   
    });	

	$("#country").autocomplete({
		source: data.sort(),
		autoFocus: true,
		open: function() {
			$(this).autocomplete("widget")
			.appendTo("#autoCountry");
			//$(".ui-autocomplete").animate({ scrollTop: 1 }, 50);
		},
        response: function(event, ui) {
            if (!ui.content.length) {
                var noResult = { value:"",label:"No results found" };
                ui.content.push(noResult);
            }
        },
        select: function (event, ui) { 
            cName = ui.item.label.split("-")[0].trim();

        	var that = $( this );

	        $( "div.columns ul.column li label",$(that).parent().parent()).each(function( index ) {
	                  
	          if($.trim($( this ).text().toLowerCase()) == $.trim(cName).toLowerCase()) {
	          countryBuilder($(this));      
	           }
	         });

        	$("[data-hasqtip='1']").focus();	
      	  	$("#selectRegion").removeClass("selectRegion-active");	        	

        }       			
	});	

    // Overrides the default autocomplete filter function to search only from the beginning of the string
    $.ui.autocomplete.filter = function (array, term) {
        var matcher = new RegExp("^" + $.ui.autocomplete.escapeRegex(term), "i");
        return $.grep(array, function (value) {
            return matcher.test(value.label || value.value || value);
        });
    };	


  // Help Close - Keyboard
  $(".help").on("click focus", function(){ 
	$(".countryDisplay").fadeOut("300").attr("hidden","hidden");
	$("#country").removeClass("focusLevel");
	$("#selectRegion").removeClass("selectRegion-active");
	$(".ui-autocomplete").css("display","none")	;
	$("#selector").removeClass("openCountry");	 

    $('.calendarDate').fadeOut("200"); 	      
    //return false;
  });  		

	//Adult Ages

	//Initialization 
	adultCounter($("totalTravelers").val())

	//Select number of adults
	$("#totalTravelers").change(function(){
		adultCounter($(this).val());
	})
	
	//Children Ages

	//Initialization 
	childrenCounter($("#totalChildren").val())

	//Select number of children
	$("#totalChildren").change(function(){
		childrenCounter($(this).val());
	})
  

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
	
	 $("#quoteForm").validate({     
    ignore: [],
    onkeyup: false,
    onfocusout: false,
    focusInvalid: false,
    onclick: false,
    focusCleanup: true,
  //wrapper: "li",
    submitHandler: function(form) {  
     if(formIsEnabled && $('.dateError').length == 0 && isValidateTravelers()) {  	
      return true; 
	 }
    },  
    rules: {
      country: "required",
      regionID: "required",
      destinationCountryID: "required",        
      departureDate: {
        required: true,
        isValidDepartureDate: true,
        isValidTripStart: true      
      },     
      returnDate: {
        required: true,
        isValidReturnDate: true,
        isValidTripLength: true
      },
      travelerAge_1: {    
        required: true,          
        max: 99    
      },
      travelerAge_2: {
    required: function(element) {           
         return isTravelerRequired(2);
        },            
        max: 99
      },
      travelerAge_3: {  
    required: function(element) {           
         return isTravelerRequired(3);
        },          
        max: 99
      },
      travelerAge_4: {  
    required: function(element) {           
         return isTravelerRequired(4);
        },      
       max: 99
      },
      travelerAge_5:  {
      required: function(element) {           
         return isTravelerRequired(5);
        },
       max: 99
      },
      travelerAge_6:  {
      required: function(element) {           
         return isTravelerRequired(6);
        },
       max: 99
      },
     travelerAge_7:  {
     required: function(element) {           
         return isTravelerRequired(7);
        },
       max: 99
     },
     travelerAge_8:  {
     required: function(element) {           
         return isTravelerRequired(8);
        },
       max: 99
     },
     travelerAge_9:  {
     required: function(element) {           
         return isTravelerRequired(9);
        },
       max: 99
     },
     travelerAge_10:  {
     required: function(element) {           
         return isTravelerRequired(10);
        },
       max: 99
     },
     isResident: {
      required: true,
      isValidResident: true     
     },
    // isMember: "required",
   promoCode: {
       required: function(element) {           
        return isPromoRequired();
       }
   }
    },
    messages: {
     country: "Please select a country.",  
     departureDate: {
       required: "Trip start date required.",
       isValidDepartureDate: "Departure date cannot be in the past.",
       isValidTripStart: "Departure date cannot exceed 548 days in the future."     
     },
     returnDate: {
       required:"Trip end date required.",
       isValidReturnDate: "Return date cannot be prior to your departure date.",
       isValidTripLength: "Trip length cannot exceed 1 year."
     },
     travelerAge_1: {
       required: "Please provide the age of the travellers.",       
       max: "Please enter a value between 0 and 99."       
   },
     travelerAge_2: {
     required: "Please provide the age of the travellers.",   
       max: "Please enter a value between 0 and 99."
     },
     travelerAge_3: {
     required: "Please provide the age of the travellers.",   
      max: "Please enter a value between 0 and 99."
     },
     travelerAge_4: {
     required: "Please provide the age of the travellers.",   
      max: "Please enter a value between 0 and 99."
     },
     travelerAge_5: {
     required: "Please provide the age of the travellers.",   
      max: "Please enter a value between 0 and 99."
     },
     travelerAge_6: {
     required: "Please provide the age of the travellers.",   
      max: "Please enter a value between 0 and 99."
     },
     travelerAge_7: {
     required: "Please provide the age of the travellers.",   
      max: "Please enter a value between 0 and 99."
     },
     travelerAge_8: {
     required: "Please provide the age of the travellers.",   
      max: "Please enter a value between 0 and 99."
     },
     travelerAge_9: {
     required: "Please provide the age of the travellers.",   
      max: "Please enter a value between 0 and 99."
     },
     travelerAge_10: {
     required: "Please provide the age of the travellers.",   
      max: "Please enter a value between 0 and 99."
    },
    isResident: {
     required: "Please confirm that all travellers are residents of Australia.",
     isValidResident: "All travellers must be Australian residents."    
    },
    isMember: "Please select whether you are a member.",
  promoCode: "Please enter a promo code."    
   },    
   errorPlacement: function(error, element) {    
     if(element.attr('id') == "country") {
      $('#country').addClass('error');
      if($('#whereareyougoing-error').length == 0) {
       $( '<label id="whereareyougoing-error" class="error2">Please select a country.</label>' ).insertBefore(element.parent().parent())
     .wrap('<li class="small-12 columns"></li>');  
      }
     }
     else if(element.attr('name') == "regionID") {
      $('#country').addClass('error');
      if($('#whereareyougoing-error').length == 0) {
       $( '<label id="whereareyougoing-error" class="error2">Please select a country.</label>' ).insertBefore(element.parent().parent())
     .wrap('<li class="small-12 columns"></li>');
      }
     }
     else if(element.attr('name') == "destinationCountryID") {
      $('#country').addClass('error');
      if($('#whereareyougoing-error').length == 0) {
        $( '<label id="whereareyougoing-error" class="error2">Please select a country.</label>' ).insertBefore(element.parent().parent())
    .wrap('<li class="small-12 columns"></li>');
      }  
     }
   else if(element.attr('id').indexOf("travelerAge_") != -1) {  
   
       $('#alltravellers-error').parent().remove();    
         $('<label id="alltravellers-error" class="error" for="alltravellers">Please provide the age of the travellers.</label>').insertBefore($('label[for=totalTravelers]').parent())     
     .wrap('<li class="small-12 columns"></li>');
    }
     else if(element.attr('name') == 'isResident') {
   error.insertBefore(element.parent().parent().parent().parent())
   .wrap('<li class="small-12 columns"></li>');  
     }
     
  
   else if(element.attr('id').indexOf("promoCode") != -1) {
    error.insertBefore($('label[for='+element.attr('id')+']').parent().parent())
    .wrap('<li class="small-12 columns"></li>');  
   }
     else {     
   
      error.insertBefore($('label[for='+element.attr('id')+']').parent().parent().parent().parent())
    .wrap('<li class="small-12 columns"></li>');  
     }
     //alert(this.errors[0]);
     //$(this.errorList[0].element).ScrollTo();    
    },
    unhighlight: function(element, errorClass, validClass) {  
  
      if($(element).attr('id') == "country") {
        if($('#country').val() != "" && $('input[name=regionID]').is('checked') && $('input[name=destinationCountryID]').is('checked')) {
          $('#country').removeClass('error');
          $('#whereareyougoing-error').remove();  
        }          
      }
      else if($(element).attr('name') == "regionID") {
       if($('#country').val() != "" && $('input[name=regionID]').is('checked') && $('input[name=destinationCountryID]').is('checked')) {
         $('#country').removeClass('error');
         $('#whereareyougoing-error').remove();  
       }    
      }
      else if($(element).attr('name') == "destinationCountryID") {
        if($('#country').val() != "" && $('input[name=regionID]').is('checked') && $('input[name=destinationCountryID]').is('checked')) {
          $('#country').removeClass('error');
          $('#whereareyougoing-error').remove();  
        }   
      }
    else if($(element).attr('id').indexOf("travelerAge_") != -1) {
	
        $(element).removeClass(errorClass); 
	if(!$('.travelerAges').hasClass('error')) {	
    $('#alltravellers-error').parent().remove();   
    }    
    }
      else if($(element).attr('name') == 'isResident') {            
        $('#residentContainer').removeClass('error');
        $(element).removeClass(errorClass);
    $(element.form).find("label[for=" + element.id + "].error").addClass('hide');
        //$(element.form).find("label[for=" + element.id + "]").removeClass(errorClass);
    //$(element.form).find("label[for=" + element.id + "]").remove();
      }   
      else {    
        $(element).removeClass(errorClass);  
    $(element.form).find("label[for=" + element.id + "].error").addClass('hide');
    //$(element.form).find("label[for=" + element.id + "].error").removeClass(errorClass);
   //$(element.form).find("label[for=" + element.id + "]").remove();
      }    
    },
    invalidHandler: function(event, validator) {
      $(validator.errorList[0].element).ScrollTo();  
    }
  });
	
	
	
 	
formIsEnabled = true;

//End JQuery Code
});

function countryBuilder(destinationObj) {  
  var destObj = destinationObj.attr('for').split('-');
  var selectedRegionID = destObj[1];
  var selectedCountryID = destObj[2];  
  var countryName = $('label[for=country-'+selectedRegionID+'-'+selectedCountryID+']').text();  
  //alert(countryName);
  $('#region-'+selectedRegionID).prop('checked',true); 
  $("#country-"+selectedRegionID+"-"+selectedCountryID).prop("checked", true); //set country          
  $("#country").val(countryName);  
  $('#country').removeClass('error');
  $('input[name=destinationCountryID]').removeClass('error');
  $('input[name=regionID]').removeClass('error');
  $('#whereareyougoing-error').remove();   
  return true;
}

function validateDepartureDate() {
 var firstDateArray = $('#departureDate').val().split("/");
 var secondDateArray = $('#returnDate').val().split("/");
 var dDate = firstDateArray[2]+','+firstDateArray[1]+','+firstDateArray[0];
 var rDate = secondDateArray[2]+','+secondDateArray[1]+','+secondDateArray[0];
 var todaysDate = new Date();
 var dDate = dDate+' '+todaysDate.getHours()+':'+todaysDate.getMinutes()+':'+todaysDate.getSeconds(); 
 var firstDate = new Date(dDate);  
 if(parseInt(getDaysBetween(todaysDate,firstDate)) < 0) {
  return false;   
 }   
 else {
  return true;   
 }
}

function validateStartDate() {
 var firstDateArray = $('#departureDate').val().split("/");
 //var secondDateArray = $('#returnDate').val().split("/");
 var dDate = firstDateArray[2]+'/'+firstDateArray[1]+'/'+firstDateArray[0];
 //var rDate = secondDateArray[2]+','+secondDateArray[1]+','+secondDateArray[0];
 var firstDate = new Date(dDate);
 var todaysDate = new Date();
// alert(getDaysBetween(todaysDate,firstDate));   
 if(parseInt(getDaysBetween(todaysDate,firstDate)) > 548) {
  return false;   
 }   
 else {
  return true;   
 }  
}

function validateReturnDate() {
 var firstDateArray = $('#departureDate').val().split("/");
 var secondDateArray = $('#returnDate').val().split("/");
 var dDate = firstDateArray[2]+','+firstDateArray[1]+','+firstDateArray[0];
 var rDate = secondDateArray[2]+','+secondDateArray[1]+','+secondDateArray[0];
 var firstDate = new Date(dDate);
 var secondDate = new Date(rDate);
 if(parseInt(getDaysBetween(firstDate,secondDate)) < 0) {
   return false;   
 }   
 else {
  return true;   
 }  
}

function validateTripLength() {
 var firstDateArray = $('#departureDate').val().split("/");
 var secondDateArray = $('#returnDate').val().split("/");
 var dDate = firstDateArray[2]+','+firstDateArray[1]+','+firstDateArray[0];
 var rDate = secondDateArray[2]+','+secondDateArray[1]+','+secondDateArray[0];
 var firstDate = new Date(dDate);
 var secondDate = new Date(rDate);
 if(parseInt(getMonthsBetween(firstDate,secondDate,true)) > 12) {
  return false;   
 }   
 else {
  return true;   
 }  
}

function getMonthsBetween(date1,date2,roundUpFractionalMonths)
{
    //Months will be calculated between start and end dates.
    //Make sure start date is less than end date.
    //But remember if the difference should be negative.
    var startDate=date1;
    var endDate=date2;
    var inverse=false;
    if(date1>date2)
    {
        startDate=date2;
        endDate=date1;
        inverse=true;
    }

    //Calculate the differences between the start and end dates
    var yearsDifference=endDate.getFullYear()-startDate.getFullYear();
    var monthsDifference=endDate.getMonth()-startDate.getMonth();
    var daysDifference=endDate.getDate()-startDate.getDate();

    var monthCorrection=0;
    //If roundUpFractionalMonths is true, check if an extra month needs to be added from rounding up.
    //The difference is done by ceiling (round up), e.g. 3 months and 1 day will be 4 months.
    if(roundUpFractionalMonths===true && daysDifference>0)
    {
        monthCorrection=1;
    }
    //If the day difference between the 2 months is negative, the last month is not a whole month.
    else if(roundUpFractionalMonths!==true && daysDifference<0)
    {
        monthCorrection=-1;
    }

    return (inverse?-1:1)*(yearsDifference*12+monthsDifference+monthCorrection);
}

function getDaysBetween(date1,date2) {
  //alert(date1);
  //alert(date2);
 var one_day=1000*60*60*24;    // Convert both dates to milliseconds   
 var date1_ms = date1.getTime();  
 var date2_ms = date2.getTime();
 var difference_ms = date2_ms - date1_ms;
 //alert(difference_ms/one_day)  
 return Math.round(difference_ms/one_day);
}

function isValidateTravelers() {
  var totalTrav = 0;  
  for(var x = 1; x < 11; x++) {  
   if($('#travelerAge_'+x).val() != "" && !isNaN($('#travelerAge_'+x).val())) {  
    totalTrav = parseInt(totalTrav)+1;   
   }
   else {
    break;    
   }
  }
  
  var startIdx = totalTrav*1+1;  
  for(var x = startIdx; x < 11; x++) {
   if($('#travelerAge_'+x).val() != "" && !isNaN($('#travelerAge_'+x).val())) {
    $('<label id="travelerAge_'+x+'-error" class="error" for="travelerAge_'+x+'">You must enter the ages in order.</label>').insertAfter($('#travelerAge_1'));  
    return false;  
   }
  }
  return true;  
}

/*function manageTravelers(travNum){
  if (travNum > 0) {
    $(".ageHolder li").addClass("hide");    
    $(".ageHolder").removeClass("hide");
    $(".ageHolder li:lt(" + travNum + ")").removeClass("hide");
  } else {
    $(".ageHolder").addClass("hide");    
  }
}*/

//Functionality
function adultCounter(test){
	if (test > 0) {
		$("#adultTravellers li").addClass("hide");		
		$("#adultTravellers").removeClass("hide");
		$("#adultTravellers li:lt(" + test + ")").removeClass("hide");
	}
}

//Functionality
function childrenCounter(test){
	//alert(test)
	if (test > 0) {
		$("#childTravellers li").addClass("hide");		
		$("#childTravellers").removeClass("hide");
		$("#childTravellers li:lt(" + test + ")").removeClass("hide");
	} else {
		$("#childTravellers").addClass("hide");	
	}
}	

	


function isPromoRequired() {
 return $('#hasPromoCode').is(':checked');
}

function isTravelerRequired(adultIdx) {
  //alert($('#totalTravelers').val());
  //alert(adultIdx);
 if($('#totalTravelers').val() >= adultIdx) {    
  return true;  
 }
 else {
  // alert("not required");
  return false;  
 }
} 