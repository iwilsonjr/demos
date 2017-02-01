
$(document).ready(function(){
//Start JQuery Code

	// Placeholders - IE9
	$("input").placeholder();

// Begin Datepicker

	//Datepicker
	$("#departureDate").focus(function(){
		$("#departureDateDisplay").fadeIn("200");
		$("#returnDateDisplay").fadeOut("200");

		$("#departureDateDisplay").datepicker({
			dateFormat: 'dd/mm/yy',
			minDate: 0,  
			dayNamesMin: [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ],  
			firstDay: 1,
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
			dateFormat: "dd/mm/yy",
			minDate: 0,
			dayNamesMin: [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ],
			firstDay: 1	,
			altField: "#returnDate",
			onSelect: function(date) {				
				$("#returnDateDisplay").fadeOut("200");			
			}							
		}); 

	});	

	$(document.body).click(function(e) {
	  if( !$(e.target).is(".calendarDate, .calendarDate *, #departureDate, #returnDate, .ui-datepicker-next *, .ui-datepicker-prev *") ) {
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
		test = countryBuilder($(this).text(),""); /* Revised 3/18/16 */

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
			$("#popular").removeClass("popular-active");
			$("#selectRegion").removeClass("selectRegion-active");
			$("#selector").removeClass("openCountry");	
			$(".ui-autocomplete").css("display","none");											    	 					
		}		

	})

	$('#countryDisplay').on('click', function(e) {
	    e.stopPropagation();
	});



	//FF Field Display - Autocomplete
	$("#country").on("focus keydown", function(e){

	    //e.preventDefault();
	    var keyCode = e.keyCode || e.which;

		$(this).addClass("focusLevel");
		$("#selector").addClass("openCountry");	
		$("#popular").addClass("popular-active");
		$("#selectRegion").addClass("selectRegion-active");
		$("#countryDisplay").fadeOut("50").attr("hidden","hidden");		
		$(this).val($(this).val().trim()); /* Mobile Autocomplete Issue Fix - Added 5/16/16 */

	    if (keyCode == '9') {

			if ($("#country").val().length == 0) {
				$("#popular a:eq(0)").focus();
			} else {
				$('#selector').focus();  
            	$("#country").removeClass("focusLevel"); 				
				$(this).val("");	
				$("#popular").removeClass("popular-active");
				$("#selectRegion").removeClass("selectRegion-active");	
				$("#selector").removeClass("openCountry");				
				return false;			
			}    
	    } 		

	});
	

	//Popular Destinations Functionality
	$("#popular a").on("click", function(){

		testName = decodeURI($(this).attr("href").replace("#",""));

        //Build DOM elements
		test = countryBuilder(testName,""); /* Revised 3/18/16 */   	            

		if (test == true) {

            $("#country").removeClass("focusLevel");          
			$("#popular").removeClass("popular-active");
			$("#selectRegion").removeClass("selectRegion-active");	
			$("#selector").removeClass("openCountry");

		}

		return false;
	});

	$("#selectRegion a").on("keydown", function(e){

	    //e.preventDefault(); 
	    var keyCode = e.keyCode || e.which;

	    if (keyCode == '9') {
	      $('[data-hasqtip="4"]').focus();  
          $("#country").removeClass("focusLevel"); 	      
		  $("#popular").removeClass("popular-active");	        
      	  $("#selectRegion").removeClass("selectRegion-active");  
		  $("#selector").removeClass("openCountry");      	         
	    } 

    });  
	

	//Popular Destinations Functionality
	$("#selectRegion a").on("click", function(){

		$("#countryDisplay").fadeIn("300").removeAttr("hidden");
		$(this).addClass("openCountry");
		$("#popular").removeClass("popular-active");
		$("#selectRegion").removeClass("selectRegion-active");	

		//Grid Reset - Removed 3/3/16
		//$("[name='findCountry']").prop("checked", false);
		//$("[name='findRegion']").prop("checked", false);
		//$("[name='findRegion'][value='120']").prop("checked", true); //Australia Region

		return false;	  

    });

	$("#regionSelect a").on("keydown", function(e){

	   // e.preventDefault(); 
	    var keyCode = e.keyCode || e.which;

	    if (keyCode == '9') {
	      $('[data-hasqtip="1"]').focus();         
	    } 

    });  

	$("#popular a").on("keydown", function(e){

	    var keyCode = e.keyCode || e.which;


	    if (keyCode == '27' || keyCode == '13') {    	
	      $('[data-hasqtip="1"]').focus();    
      	  $("#selectRegion").removeClass("selectRegion-active");	            
	    } 

	    if (keyCode == '13') {  
			$(this).trigger("click");
			$("#selectRegion").removeClass("selectRegion-active");	            
	    }	    

    });       

	$("#country").on("keyup", function(){

		if ($("#country").val().length == 0) {

			$("#popular").addClass("popular-active");
			$("#regionSelect").addClass("selectRegion-active");
			$(".ui-autocomplete").css("display","none");


		} else {

			$("#popular").removeClass("popular-active");
			$(".ui-autocomplete").css("display","block");

		}		

	});	

	$("#country").on("keydown", function(e){

	    var keyCode = e.keyCode || e.which;

		if ($("#country").val().length == 0) {

		    if (keyCode == '9') {
		      $("#popular a:eq(0)").focus();          
		    } 	

		    if (keyCode == '13') {
		      e.preventDefault(); 
		      $("#popular a:eq(0)").trigger("click");
			  $(this).addClass("focusLevel");		                
		    } 			    

		} else {

		    if (keyCode == '27') {
		      $('[data-hasqtip="1"]').focus();          
		    } 

		    if (keyCode == '13') {
		      e.preventDefault();  
			  $(this).addClass("focusLevel");     
		    } 		    

		}

  	});      



	//Opening UI
	$("#selector").on("click", function(e){ // Revised 6/3/16

		if ($("#countryDisplay").attr("hidden") == "hidden"){

			$("#countryDisplay").fadeIn("300").removeAttr("hidden");
			$("#country").addClass("focusLevel");
			$("#selectRegion").removeClass("selectRegion-active");
			$("#popular").removeClass("popular-active");	
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

		if (document.body.clientWidth < 720) {

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
	/*$("#countryLister").on("click", "button", function(){
		$(this).parent("li").remove();
	});*/

	//Autocomplete
    var data = [];

    $("#countryDisplay .column label").each(function( index, value ){     
		//data[index] = $(this).text() + " - " + $(this).parents(".columns").siblings("label").text(); /* Revised 3/18/16 */     
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
        select: function (event, ui) { /* Revised 3/18/16 */
            idCountry = ui.item.label.split("-")[0].trim();
            //idRegion = ui.item.label.split("-")[1].trim();

        	if (ui.item.value != "") { 
        		countryBuilder(idCountry,"");/*,idRegion*/
        	}

        	$("[data-hasqtip='1']").focus();	
      	  	$("#selectRegion").removeClass("selectRegion-active");	        	
        	//return false;
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
  $(".help, .ajaxHelp").on("click focus", function(){ 
	$(".countryDisplay").fadeOut("300").attr("hidden","hidden");
	$("#country").removeClass("focusLevel");
	$("#popular").removeClass("popular-active");
	$("#regionSelect").removeClass("selectRegion-active");
	$(".ui-autocomplete").css("display","none")	;
	$("#selector").removeClass("openCountry");	 

    $('.calendarDate').fadeOut("200"); 	      
    //return false;
  });  


//End JQuery Code
});


/* Country Lister - Revised 3/18/16 */
function countryBuilder(country,region) {

	var countryReady = true;

    $("#countryDisplay .column label").each(function( index, value ){
        if (country == $(this).text()){
			countryID = $("#" + $(this).attr("for")).val(); 
			
			if (region == "") {
				regionID = $(this).parents(".columns").siblings("label").text();  	     		  
			} else {
				regionID = region;
			}

			//Check for duplicates
		    $("[name='destinationCountryID']").each(function( index, value ){
		        if (countryID == $(this).val()){
		        	countryReady = false;
		        }
		    });	                     
        }
    });


	if (countryReady == true) {

		$("#country-" + countryID).prop("checked", true); //set country

        $(".group-label").each(function( index, value ){
            if (regionID == $(this).text()){
                $("#" + $(this).attr("for")).prop("checked", true); //set region                    
            }
        });	      
	        
		//$("#country").val(country + " - " + regionID); 	 
		$("#country").val(country); 		    			    
	}  

	return countryReady;
}