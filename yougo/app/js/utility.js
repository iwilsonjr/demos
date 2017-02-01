// JavaScript Document
var footerFormIsEnabled = true;
var countryMenuOpen = false;

/*
$.validator.addMethod('notPlaceholder', function(val, el) {
    return this.optional(el) || ( val !== $(el).attr('placeholder') );
}, $.validator.messages.required);
*/

$(document).ready(function(){
//Start JQuery Code   
 
  /* Placeholders/Plugin */ 
 // $('input').placeholder();  
  
 /*
 for(var x = 1; x <= 6; x++) {
   tmpVal = $('#f_travelerAge_'+x).val();   
  // $("#f_travelerAge_"+x).mask("9?9",{placeholder:""});  
   $('#f_travelerAge_'+x).val(tmpVal);  
  }
*/
  
  // Mobile Nav Toggle
  $('.navToggle').click(function(){
   if ($(this).hasClass('open')) {
     $(this).removeClass('open');
     $('.siteHeader nav').removeClass('open');
   } else {
     $(this).addClass('open');
     $('.siteHeader nav').addClass('open');
   }
  });
  
  //Add Travellers Bottom
 $("#addTraveller").click(function(){
   $("#footerQuoteForm .travellerList > li.hide:first").removeClass("hide");  
   $("#footerQuoteForm .deleteLink").addClass("hide");
   $("#footerQuoteForm .deleteLink").parents("li:not('.hide')").prev().addClass("passedUp");
   $("#footerQuoteForm .travellerList > li:not('.hide'):last .deleteLink").removeClass("hide");
   if ($("#footerQuoteForm .travellerList > li.hide").length == 0) {
    $(this).addClass("hide");  
   }
   return false;  
 });
 
 //Remove Travellers Bottom
 $("#footerQuoteForm .deleteLink").click(function(){
   $("#footerQuoteForm .deleteLink").addClass("hide");   
   $('input[type=text]',$(this).parent()).eq(0).val('');   
   $("#footerQuoteForm .travellerList > li:not('.hide'):last").addClass("hide");
   $("#footerQuoteForm .travellerList > li:not('.hide'):last").removeClass("passedUp");
   $("#footerQuoteForm .travellerList > li:not('.hide'):last .deleteLink").removeClass("hide");
   $("#footerQuoteForm .travellerList > li.hide input:checked").removeAttr("checked");    
   if ($("#footerQuoteForm .travellerList > li.hide").length != 0) {
    $("#footerQuoteForm #addTraveller").removeClass("hide");  
   }  
   if ($("#footerQuoteForm .travellerList > li:not('.hide') :checked").length == $("#footerQuoteForm .travellerList > li:not('.hide')").length){
    $("#footerQuoteForm input[type='submit']").removeAttr("disabled");  
   }      
   return false;  
 });
 
 $("#f_selectedCountry").on("click", function(){
   if(!countryMenuOpen) {
      $(".regionPopup").removeClass("hide");  
    countryMenuOpen = true;
   }
   else {
    $(".regionPopup").addClass("hide");  
    countryMenuOpen = false;   
   }
 });
 
 /*
$("#f_regionID" ).change(function() { 
  if(footerFormIsEnabled) {  
   $( "#f_destinationCountryID option:selected" ).text('Loading....');  
   footerFormIsEnabled = false;
   if($(this).val() != "") {     
    $.post("/ajax/get/_getFooterCountries.cfm", { regionID: $('#f_regionID').val() },
    function(html) {    
   if($('#f_destinationCountryID').hasClass('error')) {
     $('#f_destinationCountryID').replaceWith($.trim(html));  
*/
    /*
 var validator = $( "#footerQuoteForm" ).validate();      
       validator.element("#f_destinationCountryID" );      
*/       
  /*
  }
   else {
     $('#f_destinationCountryID').replaceWith($.trim(html));  
   }
   $("#f_destinationCountryID" ).change(function() {
     $("#f_selectedCountry").val( $("#f_destinationCountryID option:selected" ).text());
     $(".regionPopup").addClass("hide");
     countryMenuOpen = false; 
     });
     footerFormIsEnabled = true;     
    }
    );     
   }
   else {
  if($('#f_destinationCountryID').hasClass('error')) {
      $('#f_destinationCountryID').replaceWith('<select id="f_destinationCountryID" name="f_destinationCountryID"><option value="">Select Country</option></select>');      
*/
    /*
  var validator = $("#footerQuoteForm" ).validate();      
      validator.element("#f_destinationCountryID" );   
*/ 
  /*
}
  else {
    $('#f_destinationCountryID').replaceWith('<select id="f_destinationCountryID" name="f_destinationCountryID"><option value="">Select Country</option></select>');    
    $("#f_destinationCountryID" ).change(function() {
     $("#f_selectedCountry").val( $("#f_destinationCountryID option:selected" ).text());
     $(".regionPopup").addClass("hide");
     countryMenuOpen = false; 
     });
  }
    footerFormIsEnabled = true;
   }     
  }
 });
*/
 
 if ($("#f_departureDate").length != 0) {
  $("#f_departureDate").datepicker({
    dateFormat: "dd/mm/yy",
    showOn: "focus",
    minDate: 0,
    dayNamesMin: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
  });

  $("#f_returnDate").datepicker({
   dateFormat: "dd/mm/yy",
   showOn: "focus",
   minDate: 0,
   dayNamesMin: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
  });
  
  $("#f_departureDate").change(function() {
    $("#f_returnDate").val($("#f_departureDate").val());
  $(this).removeClass('error');
  $('#f_returnDate').removeClass('error');
  }); 
  
 
 }
 
 
 
/*
 $("#footerQuoteForm").validate({     
   submitHandler: function(form) {  
     if(footerFormIsEnabled) {  
    $('.widgetErrorBox').eq(0).html('&nbsp;'); 
      $('.widgetErrorBox').eq(0).css('display','none'); 
      footerFormIsEnabled = false;     
      //$('#btnSubmit').addClass('quoteSave');         
      $.ajax({
          url: '/ajax/post/_saveFooterTripDetails.cfm', 
          data: $('#footerQuoteForm').serialize(),
          type: 'post',     
          dataType: 'html',  
          success: evaluateQuoteWidgetResponse,
          error: evaluateQuoteWidgetResponse,
          cache: false
       });      
       return false;
     }
    },  
    rules: {     
      f_regionID: "required",
      f_destinationCountryID: "required", 
      f_departureDate: {
    notPlaceholder: true,
    required: true      
    }, 
      f_returnDate: {
    notPlaceholder: true,
    required: true      
    }, 
      f_travelerAge_1: {
         notPlaceholder: true,
         required: true,
         digits: true,
         max: 84 
      }
     },
     messages: {      
   }, 
     errorPlacement: function(error, element) {  
       //$('.hugo').eq(0).addClass('error');  
     //error.appendTo($('.errorMessage').eq(0));
    // alert($(element).attr('id'));
     //alert(element.id);
     if($(element).attr('id') == 'f_regionID' ||  $(element).attr('id') == 'f_destinationCountryID') {
       $('#f_selectedCountry').addClass('error');
     }
     
     },
   unhighlight: function(element, errorClass, validClass) {
     $(element).removeClass(errorClass);
     $(element.form).find("label[for=" + element.id + "]").removeClass(errorClass);
     
     
     if($(element).attr('id') == 'f_regionID' ||  $(element).attr('id') == 'f_destinationCountryID') {
       if($('#f_regionID').val() != "" && $('#f_destinationCountryID').val() != "") {
      $('#f_selectedCountry').removeClass('error');
       }
     }
     //if(this.numberOfInvalids() == 0) {
  //  $('.hugo').eq(0).removeClass('error');   
   //  }
     } 
 }); 
*/
 
 

//End JQuery Code
});

function evaluateQuoteWidgetResponse(response) {
 var responseStr = $.trim(response);   
 if(responseStr == '{saveQuote:1}') {   
  window.location = $("#nextStep").val();
 }
 else if(responseStr.indexOf("{businessRule error:returnDate:Return date cannot be prior to your departure date.}") != -1) { <!-- business rule error -->        
   $('.widgetErrorBox').eq(0).html('<p><strong>Whoops!</strong> Return date cannot be prior to your departure date.</p>'); 
   $('.widgetErrorBox').eq(0).css('display','block');
   //$('#btnSubmit').removeClass('quoteSave'); 
   footerFormIsEnabled = true;    
 }
 else if(responseStr.indexOf("{businessRule error:returnDate:Trip duration cannot be longer than 12 months.}") != -1) { <!-- business rule error -->         
   $('.widgetErrorBox').eq(0).html('<p><strong>Whoops!</strong> Trip duration cannot be longer than 12 months.</p>'); 
   $('.widgetErrorBox').eq(0).css('display','block');
   //$('#btnSubmit').removeClass('quoteSave');
   footerFormIsEnabled = true;    
 } 
 else if(responseStr.indexOf("{businessRule error:departureDate:Departure date cannot be in the past.}") != -1) { <!-- business rule error -->         
   $('.widgetErrorBox').eq(0).html('<p><strong>Whoops!</strong> Departure date cannot be in the past.</p>'); 
   $('.widgetErrorBox').eq(0).css('display','block');
   //$('#btnSubmit').removeClass('quoteSave');
   footerFormIsEnabled = true;   
 } 
 else if(responseStr.indexOf("{businessRule error:departureDate:Departure date cannot be more than 365 days in the future.}") != -1) { <!-- business rule error -->         
   $('.widgetErrorBox').eq(0).html('<p><strong>Whoops!</strong> Departure date cannot be more than 18 months in the future.</p>'); 
   $('.widgetErrorBox').eq(0).css('display','block');
   //$('#btnSubmit').removeClass('quoteSave');
   footerFormIsEnabled = true;       
 } 
 else if(responseStr.indexOf("{businessRule error:returnDate:Return date is not a valid date.}") != -1) { <!-- business rule error -->         
   $('.widgetErrorBox').eq(0).html('<p><strong>Whoops!</strong> Return date is not a valid date.  Must be DD/MM/YYYY.</p>'); 
   $('.widgetErrorBox').eq(0).css('display','block');
   //$('#btnSubmit').removeClass('quoteSave');
   footerFormIsEnabled = true;     
 }
 else if(responseStr.indexOf("{businessRule error:departureDate:Departure date is not a valid date.}") != -1) { <!-- business rule error -->         
   $('.widgetErrorBox').eq(0).html('<p><strong>Whoops!</strong> Departure date is not a valid date.  Must be DD/MM/YYYY.</p>'); 
   $('.widgetErrorBox').eq(0).css('display','block');
   //$('#btnSubmit').removeClass('quoteSave');
   footerFormIsEnabled = true;    
 } 
 else if(responseStr.indexOf("{businessRule error:annualStartDate:Policy start date cannot be in the past.}") != -1) { <!-- business rule error -->         
   $('.widgetErrorBox').eq(0).html('<p><strong>Whoops!</strong> Policy start date cannot be in the past.</p>'); 
   $('.widgetErrorBox').eq(0).css('display','block');
   //$('#btnSubmit').removeClass('quoteSave');
   footerFormIsEnabled = true;    
 } 
 else if(responseStr.indexOf("{businessRule error:annualStartDate:Policy start date cannot be more than 365 days in the future.}") != -1) { <!-- business rule error -->        
   $('.widgetErrorBox').eq(0).html('<p><strong>Whoops!</strong> Policy start date cannot be more than 365 days in the future.</p>'); 
   $('.widgetErrorBox').eq(0).css('display','block');
   //$('#btnSubmit').removeClass('quoteSave');
   footerFormIsEnabled = true;     
 } 
 else if(responseStr.indexOf("{businessRule error:annualStartDate:Policy start date is not a valid date.}") != -1) { <!-- business rule error -->        
   $('.widgetErrorBox').eq(0).html('<p><strong>Whoops!</strong> Policy start date is not a valid date.  Must be DD/MM/YYYY.</p>'); 
   $('.widgetErrorBox').eq(0).css('display','block');
   //$('#btnSubmit').removeClass('quoteSave');
   footerFormIsEnabled = true; 
 } 
 else { <!-- error -->
  window.location='/error/error.html'; 
 } 
} 


