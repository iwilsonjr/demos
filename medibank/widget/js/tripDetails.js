// detect IE - Added 9/2/15
//var IEversion = detectIE();

var formIsEnabled = false;
var autoFocusReturnDate = true;
var typedStartDate, typedEndDate;



jQuery.validator.addMethod("isValidResident", function(value, element, params) {
  return $('[name=isResident]:checked').val() == 'Yes';
}, jQuery.validator.format("All travellers must be Australian residents."));

$(document).ready(function(){
//Start JQuery Code

 $("#departureDate").mask("99/99/9999",{placeholder:"dd/mm/yyyy",autoclear: false});
 $("#returnDate").mask("99/99/9999",{placeholder:"dd/mm/yyyy",autoclear: false});

 for(var x = 1; x < 11; x++) {
  $("#travelerAge_"+x).mask("9?9",{placeholder:"",autoclear: false});
 }


 //Initialization 
 manageAdultTravelers($("#totalAdults").val());
 manageChildTravelers($("#totalChildren").val());

 // Begin Datepicker
 $("#travelDate").on("focus", function(){
   $(".countryDisplay").fadeOut("300");
   $(".hasDatepicker").fadeIn("200");
   $(this).addClass("focusLevel");   
   $(".displayDate").addClass("focusLevel");   
   $("#departureDate").focus(); 
 });
 
 // Departure Date
 $("#departureDate" ).keyup(function() {
	if($(this).val().indexOf("d") == -1 && $(this).val().indexOf("m") == -1 && $(this).val().indexOf("y") == -1) {
	 autoFocusReturnDate=true;	
	 $("#calendarDate" ).datepicker( "setDate", $(this).val() );	 	 
	 $('#departureDate').val($.datepicker.formatDate( 'dd/mm/yy', $( "#calendarDate" ).datepicker( "getDate" ), {} ));		
	 typedStartDate = $( "#calendarDate" ).datepicker( "getDate" );
	 if(typedEndDate) {
	  firstDate = new Date($.datepicker.formatDate( 'yy,mm,dd', new Date(Math.min(typedStartDate,typedEndDate)), {} ));
      secondDate = new Date($.datepicker.formatDate( 'yy,mm,dd', new Date(Math.max(typedStartDate,typedEndDate)), {} )); 	 
	  startDate = $.datepicker.formatDate( 'dd/mm/yy', new Date(firstDate), {} );
      endDate = $.datepicker.formatDate( 'dd/mm/yy', new Date(secondDate), {} );	 
	  $('#departureDate').val(startDate);
	  $('#returnDate').val(endDate);
      $('#travelDate').val(startDate + " - " + endDate);	
	  validateTripDates(firstDate,secondDate);	   
	 }	 
	 if(autoFocusReturnDate) {
 	  $('#returnDate').focus();
	   autoFocusReturnDate=false;
	 }	
	}  
 }); 
  
  // Return Date
 $("#returnDate" ).keyup(function() {
	if($(this).val().indexOf("d") == -1 && $(this).val().indexOf("m") == -1 && $(this).val().indexOf("y") == -1) {	
	 $("#calendarDate" ).datepicker( "setDate", $(this).val() );	 
	 $('#returnDate').val($.datepicker.formatDate( 'dd/mm/yy', $( "#calendarDate" ).datepicker( "getDate" ), {} ));	 	 
     $('#travelDate').val($('#departureDate').val() + " - " + $('#returnDate').val());
	 typedEndDate = $( "#calendarDate" ).datepicker( "getDate" );
	 firstDate = new Date($.datepicker.formatDate( 'yy,mm,dd', new Date(Math.min(typedStartDate,typedEndDate)), {} ));
     secondDate = new Date($.datepicker.formatDate( 'yy,mm,dd', new Date(Math.max(typedStartDate,typedEndDate)), {} )); 	 
	 startDate = $.datepicker.formatDate( 'dd/mm/yy', new Date(firstDate), {} );
     endDate = $.datepicker.formatDate( 'dd/mm/yy', new Date(secondDate), {} );	 
	 $('#departureDate').val(startDate);
	 $('#returnDate').val(endDate);
     $('#travelDate').val(startDate + " - " + endDate);	
	 validateTripDates(firstDate,secondDate);	
	}
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
    // maxDate: '+18M',
   // yearRange: "0:+1",
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
           t1 = $.datepicker.formatDate( 'dd/mm/yy', new Date(Math.min(prv,cur)), {} );
           t2 = $.datepicker.formatDate( 'dd/mm/yy', new Date(Math.max(prv,cur)), {} );          
           d1 = $.datepicker.formatDate( 'dd/mm/yy', new Date(Math.min(prv,cur)), {} );
           d2 = $.datepicker.formatDate( 'dd/mm/yy', new Date(Math.max(prv,cur)), {} );
           $('#departureDate').val(t1);
           $('#returnDate').val(t2);
           $('#travelDate').val(d1 + " - " + d2);
       
         $('#travelDate').parent().removeClass('error');
           $('#travelDate-error').remove();
       
       firstDate = new Date($.datepicker.formatDate( 'yy,mm,dd', new Date(Math.min(prv,cur)), {} ));
       secondDate = new Date($.datepicker.formatDate( 'yy,mm,dd', new Date(Math.max(prv,cur)), {} )); 
	   
	      
       validateTripDates(firstDate,secondDate);
   

        }
               
       },

      onChangeMonthYear: function ( year, month, inst ) {
        //prv = cur = -1;        
       }
  });

  // Calendar Close - Off Body
  $(document.body).click(function(e) { 
    if( !$(e.target).is("#calendarDate, #calendarDate *, #travelDate, .ui-datepicker-next *, .ui-datepicker-prev *, .ui-datepicker-next, .ui-datepicker-prev, #departureDate, #returnDate") ) {
      $('#calendarDate').fadeOut("200");
      $('#travelDate').removeClass("focusLevel");     
      $('.displayDate').removeClass("focusLevel");      
    }
  }); 
  
  // Calendar Close - Click 
  $('.hasDatepicker .closeWindow').on("click", function(){

      $('#travelDate').val($('#departureDate').val() + " - " + $('#returnDate').val());
      $(".hasDatepicker").fadeOut("200");
      $(".displayDate").removeClass("focusLevel");  
      $('#travelDate').removeClass("focusLevel");  
      //$('[data-hasqtip="2"]').focus();        

  }); 

  // Calendar Close - Keyboard
  $('.hasDatepicker .closeWindow').on("keydown", function(e){

    e.preventDefault();
    var keyCode = e.keyCode || e.which;

    if (keyCode == '9' || keyCode == '13') {
      $('#travelDate').val($('#departureDate').val() + " - " + $('#returnDate').val());
      $(".hasDatepicker").fadeOut("200");
      $(".displayDate").removeClass("focusLevel");  
      $('#travelDate').removeClass("focusLevel");  
      $('[data-hasqtip="2"]').focus();        
    } 

  });    
 

// End Datepicker



  /* 
    Country Selector Functionality
  ----------------------------------*/

  //Country Selection - List
  $(".column label").on("click", function(){
    $("#country").val($(this).text()); /* Revised 4/6/16 */

    $(".countryDisplay").fadeOut("300").attr("hidden","hidden");  
    $("#country").removeAttr("disabled");      
    $("#country").removeClass("focusLevel");    
    $("#selector").removeClass("openCountry");
    $("#country").attr("placeholder","Start typing a country");
 
  })

  //Closing UI
  $("body").on("click", function(e){

    if( !$(e.target).is("#selector") ) {

      $(".countryDisplay").fadeOut("300").attr("hidden","hidden");  
      $("#selector").removeClass("openCountry");  
      $("#country").removeAttr("disabled");
      $("#country").autocomplete('clear');  
      $("#country").removeClass("focusLevel");      
      $("#country").attr("placeholder","Start typing a country");      
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
//  if (IEversion == false) {  // Added 9/2/15
   
  // Selector Close - Keyboard  
  $("#country").on("keydown", function(e){

    $(".ui-listview").addClass("ui-listview-active");
    $(this).addClass("focusLevel");

  });

  // Selector Close - Off Body
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
    $("#country").attr("placeholder","");

    $('#calendarDate').fadeOut("200");
    $('#travelDate').removeClass("focusLevel");     
    $('.displayDate').removeClass("focusLevel");    

      e.preventDefault();
      e.stopPropagation();           
      
    //Set Initial Value - Revised 4/6/16 
    if ($("#country").val() != "") {

      idCountry = $("#country").val();

      $(".columns label").each(function( index ) {

        if ($(this).text() == idCountry) {

            var test = {};

            if (document.body.clientWidth > 800) {
                 test = $(".columns");            
              } else {                              
                  test = $("#groups-container");
            }

            test.scrollTop(0);
            test.animate({scrollTop: $(this).position().top}, 0);

        }
      });

    }  


  });


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

  //Select number of children
  $("#totalChildren").change(function(){    
  manageChildTravelers($(this).val());
  });

  //Select number of adults
  $("#totalAdults").change(function(){    
  manageAdultTravelers($(this).val());
  });
  
  // this will revalidate country(regionID/destinationCountryID) when a country is selected.
  $('li.dCountry label, li.dCountry input[type=radio]').click(function(){  
  
    $('#country').removeClass('error');
    $('#whereareyougoing-error').remove();  
    
  
  });
  
  $("#quoteForm").validate({     
    ignore: [],  
    submitHandler: function(form) {  
     if(formIsEnabled && $('.dateError').length == 0) {  
         
      return true;
     }
    },  
    rules: {
  country: "required",
  regionID: "required",
  destinationCountryID: "required",       
  
  departureDate: "required",
  returnDate: "required",
 
    travelerAge_1: {    
        required: true,          
        max: 99
    
      },
      travelerAge_2: {
        required: function(element) {           
         return isAdultAgeRequired(2);
        },        
        max: 99
      },
      travelerAge_3: {
        required: function(element) {           
         return isAdultAgeRequired(3);
        },         
        max: 99
      },
      travelerAge_4: {
       required: function(element) {           
        return isAdultAgeRequired(4);
       },       
       max: 99
      },
      travelerAge_5:  {
       required: function(element) {           
        return isChildAgeRequired(1);
       },       
       max: 20
      },
      travelerAge_6:  {
       required: function(element) {           
        return isChildAgeRequired(2);
      },      
      max: 20
     },
     travelerAge_7:  {
      required: function(element) {           
        return isChildAgeRequired(3);
       },       
       max: 20
     },
     travelerAge_8:  {
       required: function(element) {           
        return isChildAgeRequired(4);
       },       
       max: 20
     },
     travelerAge_9:  {
       required: function(element) {           
        return isChildAgeRequired(5);
       },       
       max: 20
     },
     travelerAge_10:  {
       required: function(element) {           
        return isChildAgeRequired(6);
       },       
       max: 20
     },
   isResident: {
    required: true,
    isValidResident: true     
   }
    
    
    
    },
    groups: {
     travelDate: "departureDate returnDate",
   
    
      
     
    },
    messages: {
   country: "Please select a country.",  
   departureDate: "Please provide a start and end date for your insurance.",
   returnDate: "Please provide a start and end date for your insurance.",
   /*travelDate: {
      required: "Please provide a start and end date for your insurance.",
    isValidTravelDates: "Please provide a start and end date for your insurance." 
   },*/
   travelerAge_1: {
     required: "Please provide the age of the travellers.",  
      min: "Please enter a value between 21 and 99.",
        max: "Please enter a value between 21 and 99."    
   },
   travelerAge_2: {
     required: "Please provide the age of the travellers.",  
      min: "Please enter a value between 21 and 99.",
        max: "Please enter a value between 21 and 99."    
   },
   travelerAge_3: {
     required: "Please provide the age of the travellers.",  
      min: "Please enter a value between 21 and 99.",
        max: "Please enter a value between 21 and 99."    
   },
   travelerAge_4: {
     required: "Please provide the age of the travellers.",  
      min: "Please enter a value between 21 and 99.",
        max: "Please enter a value between 21 and 99."    
   },
   travelerAge_5: {
     required: "Please provide the age of the travellers.",  
      min: "Please enter a value between 0 and 20.",    
   },
   travelerAge_6: {
     required: "Please provide the age of the travellers.",  
      min: "Please enter a value between 0 and 20.",    
   },
   travelerAge_7: {
     required: "Please provide the age of the travellers.",  
      min: "Please enter a value between 0 and 20.",    
   },
   travelerAge_8: {
     required: "Please provide the age of the travellers.",  
      min: "Please enter a value between 0 and 20.",    
   },
   travelerAge_9: {
     required: "Please provide the age of the travellers.",  
      min: "Please enter a value between 0 and 20.",    
   },
   travelerAge_10: {
     required: "Please provide the age of the travellers.",  
      min: "Please enter a value between 0 and 20.",    
   },
    isResident: {
    required: "Please confirm that all travellers are residents of Australia.",
    isValidResident: "All travellers must be Australian residents."    
   }
   
    
    },    
    errorPlacement: function(error, element) {    
 
    if(element.attr('id') == "country") {
      $('#country').addClass('error');
    if($('#whereareyougoing-error').length == 0) { 
      $('<label id="whereareyougoing-error" class="error2">Please select a country.</label>').insertAfter($('label[for=country]'));
    }
  
  }
    else if(element.attr('name') == "regionID") {
    $('#country').addClass('error');
    if($('#whereareyougoing-error').length == 0) { 
      $('<label id="whereareyougoing-error" class="error2">Please select a country.</label>').insertAfter($('label[for=country]'));
    }
 
  }
  else if(element.attr('name') == "destinationCountryID") {
    $('#country').addClass('error');
    if($('#whereareyougoing-error').length == 0) { 
      $('<label id="whereareyougoing-error" class="error2">Please select a country.</label>').insertAfter($('label[for=country]'));
    }  
  }
  
    else if(element.attr('id') == "departureDate") {     
    if($('#travelDate-error').length == 0) {
     $('<label id="travelDate-error" class="error">Please provide a start and end date for your insurance.</label>').insertAfter($('label[for=travelDate]'));
     $('#travelDate').parent().addClass('error');
    }
    }
  else if(element.attr('id') == "returnDate") { 
    //if($('#travelDate-error').length == 0) {   
     $('#travelDate-error').remove();
     $('<label id="travelDate-error" class="error">Please provide a start and end date for your insurance.</label>').insertAfter($('label[for=travelDate]'));
     $('#travelDate').parent().addClass('error');
    //}
    }
    else if(element.attr('id').indexOf("travelerAge_") != -1) {  
       //if($('#alltravellers-error').length == 0) { 
       $('#alltravellers-error').remove();    
         $('<label id="alltravellers-error" class="error" for="alltravellers">Please provide the age of the travellers.</label>').insertAfter($('label[for=totalAdults]'));     
    // }    
    }
    else if(element.attr('name') == 'isResident') {            
    $('#residentContainer').addClass('error'); 
    error.insertAfter($('#residentContainer fieldset legend').eq(0));
      }  
    else {        
     error.insertAfter($('label[for='+element.attr('name')+']'));    
    }       
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
     if($('#adultTravellers ul li input[type=text].error').length == 0  && $('#childTravellers ul li input[type=text].error').length == 0) { 
      $('#alltravellers-error').remove();
     }
    }
    else if($(element).attr('name') == 'isResident') {            
     $('#residentContainer').removeClass('error'); 
     $(element).removeClass(errorClass);
       $(element.form).find("label[for=" + element.id + "]").removeClass(errorClass); 
      }
   
    else {
  
    }    
    }
  
  });
  
 
 


//Help
	$(".help").each(function() {
		$(this).qtip({			
			show: {
				fixed: true,
				event: 'click',
				solo: true
			},
			hide: {
				event: 'blur unfocus', //Changed 11/10/15
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


  // Help Close
  $(".help").on("click focus", function(){ 
    $('#calendarDate').fadeOut("200");
    $('#travelDate').removeClass("focusLevel");
    $('.displayDate').removeClass("focusLevel");  
    $(".ui-listview").removeClass("ui-listview-active");      
    $("#country").removeClass("focusLevel");  

    $(".countryDisplay").fadeOut("300").attr("hidden","hidden");  
    $("#selector").removeClass("openCountry");  
    $("#country").removeAttr("disabled");
    $("#country").autocomplete('clear');        
    return false;
  });  
 
  
  formIsEnabled = true;
  $('.buttonWell').eq(0).removeClass('hide');

  //Added 11/10/15
  $(".ui-datepicker tbody a").on("keydown", function(e){

    var keyCode = e.keyCode || e.which;

      if (keyCode == '27') {

        $('#calendarDate').fadeOut("200");
        $('#travelDate').removeClass("focusLevel"); 
        $('.displayDate').removeClass("focusLevel");             
        $("#totalAdults").focus();
        } 

  });   

  keyChanger();  

//End JQuery Code
});

function manageAdultTravelers(totalAdults){
  $("#adultTravellers li").addClass("hide");    
  $("#adultTravellers").removeClass("hide");
  $("#adultTravellers li:lt(" + totalAdults + ")").removeClass("hide");
}  

function manageChildTravelers(totalChildren){
  if (totalChildren > 0) {
    $("#childTravellers li").addClass("hide");    
    $("#childTravellers").removeClass("hide");
    $("#childTravellers li:lt(" + totalChildren + ")").removeClass("hide");
  } 
  else {
    $("#childTravellers").addClass("hide");  
  }
}

function isAdultAgeRequired(adultIdx) {
 if($('#totalAdults').val() >= adultIdx) {    
  return true;  
 }
 else {
  return false;  
 }
}  

function isChildAgeRequired(childIdx) {
 if($('#totalChildren').val() >= childIdx) {    
  return true;  
 }
 else {
  return false;  
 }
}

//Added 11/10/15
function keyChanger(){

  $(".ui-datepicker-group-last tbody tr:last a:last").on("keydown", function(e){

    var keyCode = e.keyCode || e.which;

      if (keyCode == '9') {

        $(".ui-datepicker-next").trigger("click");
        $(".ui-datepicker-group-first tbody tr:first a:first").focus();  

        keyChanger();

        return false;

      }     

  }); 

}


//jQM code/Autocomplete

//if (IEversion == false) { // Added 9/2/15
  
$("html").bind("pagebeforechange", function(e) { /* Revised 4/6/16 */

    var data = [];

    $(".column label").each(function( index, value ){
        data[index] = $(this).text();        
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

              idCountry = $a.text();
              $("#country").val($a.text());

              $("#country").autocomplete('clear');
              $("#country").removeClass("focusLevel");            
              $(".ui-listview").removeClass("ui-listview-active");                      
              
              $(".column label").each(function( index, value ){
                  if ($a.text() == $(this).text()){

                    idRegion = $(this).parents(".columns").siblings("label").text();
                    $("#" + $(this).attr("for")).prop("checked", true); //set country     
                     
                  }
              });


              $(".group-label").each(function( index, value ){
                  if (idRegion == $(this).text()){
                      $("#" + $(this).attr("for")).prop("checked", true); //set region                       
                  }
              });  

            } 

            $('[data-hasqtip="1"]').focus(); // Changed 11/17/15            

        }                  
    }); 
}); 

//};
function evaluateSave(data,textStatus,jqXHR) {  
 if(textStatus == 'success') {  
  if(data.quoteStatus == 'success') {
    window.location=data.nextStep;  
  }
  else {
    window.location='/error/error.html';    
  }
 }
 else {
  window.location='/error/error.html';   
 }
} 

function validateTripDates(firstDate,secondDate) {
  $('#travelDate').parent().removeClass('error');
  $('#travelDateTotalDays-error').remove();
  $('#travelStartDate-error').remove();    
 
  var todaysDate = new Date();
  var startDate = new Date(firstDate);
  var endDate = new Date(secondDate);
  if(!validateTripStart(todaysDate,startDate)) {
  $('#travelDate').parent().addClass('error'); 
  $('<label id="travelStartDate-error" class="dateError">Departure date cannot exceed 18 months in the future.</label>').insertAfter($('label[for=travelDate]'));         
  }
  else if(!validateTripLength(startDate,endDate)) {
  $('#travelDate').parent().addClass('error'); 
  $('<label id="travelDateTotalDays-error" class="dateError">Trip length cannot exceed 1 year.</label>').insertAfter($('label[for=travelDate]'));        
  }
}

function validateTripStart(firstDate,secondDate) {
 if(parseInt(getMonthsBetween(firstDate,secondDate,true)) > 18) {
  return false;   
 }   
 else {
  return true;   
 }
}

function validateTripLength(firstDate,secondDate) {
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
};

/**
 * detect IE
 * returns version of IE or false, if browser is not Internet Explorer
 */
function detectIE() { // Added 9/2/15
  
  var ua = window.navigator.userAgent;

  // test values
  // IE 10
  //ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';
  // IE 11
  //ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
  // IE 12 / Spartan
  //ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';
  
  var msie = ua.indexOf('MSIE ');
  if (msie > 0) {
    // IE 10 or older => return version number
    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
  }

  var trident = ua.indexOf('Trident/');
  if (trident > 0) {
    // IE 11 => return version number
    var rv = ua.indexOf('rv:');
    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
  }

  /*var edge = ua.indexOf('Edge/');
  if (edge > 0) {
    // IE 12 => return version number
    return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
  }*/

  // other browser
  return false;
}
