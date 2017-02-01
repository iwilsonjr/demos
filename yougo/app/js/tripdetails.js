// JavaScript Document
var formIsEnabled = true; 

$(document).ready(function(){
//Start JQuery Code

 for(var x = 1; x <= 6; x++) {
  tmpVal = $('#travelerAge_'+x).val();   
 // $("#travelerAge_"+x).mask("9?9",{placeholder:""});  
  $('#travelerAge_'+x).val(tmpVal);  
 } 

 //Add Travellers Top
 $("#quoteForm #addTravellerHome").click(function(){
   $("#quoteForm .travellerList > li.hide:first").removeClass("hide");  
   $("#quoteForm .deleteLink").addClass("hide");
   $("#quoteForm .deleteLink").parents("li:not('.hide')").prev().addClass("passedUp");
   $("#quoteForm .travellerList > li:not('.hide'):last .deleteLink").removeClass("hide");
   if ($("#quoteForm .travellerList > li.hide").length == 0) {
    $(this).addClass("hide");  
   }
   return false;  
 });
 
 //Remove Travellers Top
 $("#quoteForm .deleteLink").click(function(){
   $("#quoteForm .deleteLink").addClass("hide");   
   $('input[type=text]',$(this).parent()).eq(0).val('');   
   $("#quoteForm .travellerList > li:not('.hide'):last").addClass("hide");
   $("#quoteForm .travellerList > li:not('.hide'):last").removeClass("passedUp");
   $("#quoteForm .travellerList > li:not('.hide'):last .deleteLink").removeClass("hide");
   $("#quoteForm .travellerList > li.hide input:checked").removeAttr("checked");    
   if ($("#quoteForm .travellerList > li.hide").length != 0) {
    $("#quoteForm #addTravellerHome").removeClass("hide");  
   }  
   if ($("#quoteForm .travellerList > li:not('.hide') :checked").length == $("#quoteForm .travellerList > li:not('.hide')").length){
    $("#quoteForm input[type='submit']").removeAttr("disabled");  
   }      
   return false;  
 });

/*
 $( "#regionID" ).change(function() { 
  if(formIsEnabled) {  
   $( "#destinationCountryID option:selected" ).text('Loading....');  
   formIsEnabled = false;
   if($(this).val() != "") {     
    $.post("/ajax/get/_getCountries.cfm", { regionID: $('#regionID').val() },
    function(html) {    
   if($('#destinationCountryID').hasClass('error')) {
     $('#destinationCountryID').replaceWith($.trim(html));  
     var validator = $( "#quoteForm" ).validate();      
       validator.element( "#destinationCountryID" );             
    }
   else {
     $('#destinationCountryID').replaceWith($.trim(html));  
   }
     formIsEnabled = true;     
    }
    );     
   }
   else {
  if($('#destinationCountryID').hasClass('error')) {
      $('#destinationCountryID').replaceWith('<select id="destinationCountryID" name="destinationCountryID"><option value="">Select Country</option></select>');      
      var validator = $( "#quoteForm" ).validate();      
      validator.element( "#destinationCountryID" );    
  }
  else {
    $('#destinationCountryID').replaceWith('<select id="destinationCountryID" name="destinationCountryID"><option value="">Select Country</option></select>');    
  }
    formIsEnabled = true;
   }     
  }
 });
*/
 
 //Datepicker
 $("#departureDate").on("focus", function(){
   $("#quoteForm .countryDisplay").fadeOut("300"); /* Added 11/5/13 */
   $("#quoteForm .hasDatepicker").css("display","block");
   $(this).addClass("departureFocus");
 });

 $("#returnDate").on("focus", function(){
   $("#quoteForm .countryDisplay").fadeOut("300"); /* Added 11/5/13 */
   $("#quoteForm .hasDatepicker").css("display","block");
   $(this).addClass("returnFocus");  
 });

 $("#calendarDateHome .closeWindow").on("click", function(){
   $('#calendarDateHome').css("display","none");
   $('#departureDate').removeClass('departureFocus');
   $('#returnDate').removeClass('returnFocus');
   return false;
 });

 // Top Datepicker
 var datepicker__updateDatepicker = $.datepicker._updateDatepicker;
  $.datepicker._updateDatepicker = function( inst ) {
  datepicker__updateDatepicker.call( this, inst );
 }

 var cur = -1, prv = -1;
 $('#calendarDateHome')
  .datepicker({
    
      dateFormat: "dd/mm/y",
      showOn: "both",
      numberOfMonths: 2,
      showButtonPanel: false,
      minDate: 0,
      showAnim: "",
      dayNamesMin: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],

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
           $('#departureDate').val( dateText );
       var validator = $( "#quoteForm" ).validate();      
       validator.element( "#departureDate" );
         
        } else {
           d1 = $.datepicker.formatDate( 'dd/mm/y', new Date(Math.min(prv,cur)), {} );
           d2 = $.datepicker.formatDate( 'dd/mm/y', new Date(Math.max(prv,cur)), {} );
           $('#departureDate').val( d1 );
           $('#returnDate').val( d2 );
       
       var validator = $( "#quoteForm" ).validate();      
       validator.element( "#departureDate" );
       validator.element( "#returnDate" );
       
       
           $('#calendarDateHome').css('display','none');
           $("#departureDate").removeClass("departureFocus");  
           $("#returnDate").removeClass("returnFocus");           
        }
        
        //$("#departureDate").addClass("departureFocus");  
        //$("#returnDate").addClass("returnFocus");                 
       },

      onChangeMonthYear: function ( year, month, inst ) {
        //prv = cur = -1;
       }
 });

  
 $('#btnSubmit').removeAttr('disabled');
 $('#btnSubmit').removeClass('disabled');

 //End JQuery Code
});