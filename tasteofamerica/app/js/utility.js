
// JavaScript Document 
$(document).ready(function(){
//Start JQuery Code

	//Prelaunch Window
	if ($("body").attr("class").search("prelaunchWindow") > -1) {
		$.nyroModalManual({ 
			url: 'prelaunch.html',
			width: 718,
			minHeight: 470,
			closeButton: false,
			modal: true		
		});			
	}

	//Initialization - JavaScript enabled
	$(".container").removeClass("no-js");
	//Outside Links
	$("a.target").click(function(){
		window.open($(this).attr("href"));
		return false;
	});	
	
	//Submit Functionality
$("#voteButton, #voteButton2").click(function(){ //Changed 
	
		href = 'thankyou.html';
		errorMessage = 'errorMessage.html';  //add jn
	
	    var n = $("input:checked").length;  //add jn to validate at least one button selected
		if (n > 0) {
			
           // submit the form 
             $("#bracketForm").ajaxSubmit({
/*				url: 'postForm.cfm',
				type: 'post',*/
				url: 'brackets.html',
				type: 'get',				
				clearForm: true,
				resetForm: true, 
                success: triggerThankYou   		
			}); //ajzxSumbit
      }  //if
		
		else {
		    $.nyroModalManual({
			url: errorMessage,
			width: 718,
			minHeight: 470		    
	      }); 
		}	
		return false; 	
	       });
	
	
	
	//Rules
	$("#rulesLink, #methodLink").nyroModal({ 
		width: 718,
		url: 'prelaunch.html',
		minHeight: 470,
		closeSelector: '.closeWindow'
	});	
	
	//Video Window
	$(".video a").nyroModal({
		width: 718,
		height: 470,
		closeSelector: '.closeWindow'
	});				

	//Selector Flags
	
	//Initialize
	selectFlag();
	
	//Click Functionality
	$(".selection strong").click(function(){
		$(this).siblings("input:radio").attr("checked","checked");		
		selectFlag();		
	});

    //Hover - Competitor - Added 5/2/16
    $(".active .competitor label").mouseover(function(){
        test = $(this).siblings(".menu").children(".text").children(".foodImg");
        if (test.children("img").length == 0) {
            test.append("<img src=\"images/statefood/fooditem-" + $(this).attr("class") + ".jpg\" alt=\"\" />");
        }
    });

    $(".active .competitor label").click(function(){
        test = $(this).siblings(".menu").children(".text").children(".foodImg");
        if (test.children("img").length == 0) {
            test.append("<img src=\"images/statefood/fooditem-" + $(this).attr("class") + ".jpg\" alt=\"\" />");
        }
    });       

//End JQuery Code
});

//Select Flags
function selectFlag(){	
	$(".selection input:checked").each(function(i) {
		$(this).parents(".competitor").siblings(".competitor").removeClass("pickedFood");
		$(this).parents(".competitor").addClass("pickedFood");
    });	
}

//AJAX Loading Functions
function ajaxLoader(){
 
 /*load the validation for the send to a friend form*/
$("#sendFriend").validate({  
                    
    submitHandler: function(form) {    
   $("#sendFriend").ajaxSubmit( { url:'postFriendEmail.cfm', type: 'post', resetForm: true, success: thanksSubmit});           
  return false;
    },  
    rules: {       
    yourEmail: {
    required: true,
    email: true},
    friendsEmail: {
    required: true,
    email: true}
    },
  messages: {
    yourEmail: "Please enter a valid email address.",
    friendsEmail: "Please enter a valid email address."
  },  
  errorPlacement: function(error, element) {       
    error.insertBefore(element);  
  }  
  });

}


function triggerThankYou() { 
	//Remove all radio selections
	$(".competitor").removeClass("pickedFood");

	//Thank You Page
	$.nyroModalManual({
		url: 'thankyou.html',
		width: 718,
		minHeight: 470,
		endFillContent: ajaxLoader,
		closeSelector: '.closeWindow',
        endRemove: thanksClose
	}) //nyro
}		

//Window Reload After Closing
function thanksClose(){ 
	window.location.href = 'brackets.html'; /* brackets.cfm */	
}

function thanksSubmit(){ 
	$.nyroModalRemove();	
}

// Social Links
$(".shareFacebook").click(function(){       
    var url = 'http://www.rollcalltasteofamerica.com';
    var img = 'http://www.rollcalltasteofamerica.com/images/logos/logo-toa-fb.png';
    var title = 'Taste of America';
    var fbWin=window.open('http://www.facebook.com/sharer/sharer.php?s=100&p[url]='+url+'&p[images][0]='+img+'&p[title]='+title,'','width=400,height=400');
    fbWin.focus();
    return false;  
  });
  
 $(".shareTwitter").click(function(){    
    var twitterType = $(this).attr('class');
    var url='http://www.rollcalltasteofamerica.com';
    var text="Vote for your state in Roll Call's Taste of America!";
    var hash="TofA2014";
    var twitWin=window.open('http://twitter.com/intent/tweet?text='+text+'&hashtags='+hash+'&url='+url,'','width=425,height=500');
    twitWin.focus();
    return false;   
  });
  
  $(".shareGoogle").click(function(){    
    var url='http://www.rollcalltasteofamerica.com';
    var googWin=window.open('https://plus.google.com/share?url='+url,'','width=500,height=500');
    googWin.focus();
    return false;   
  });
  

// Mobile
var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

  
  if( isMobile.any() ) {
  
     $(".active .competitor").mouseover(function() {
                                $(".selection").removeAttr( 'style' );
                                $(".menu").removeAttr( 'style' ); 
                                $(".selection").css("left","-9999px");
                                $(".menu").css("left","-9999px");                            
                                $(this).children(".selection").css("display","block");                       
                                $(this).children(".menu").css("display","block");                              
                });                          
 
                $(".finals .competitor").mouseover(function() {
                                $(".selection").removeAttr( 'style' );
                                $(".menu").removeAttr( 'style' ); 
                                $(".selection").css("left","-9999px");
                                $(".menu").css("left","-9999px");                            
                                $(this).children(".selection").css("display","block");                       
                                $(this).children(".menu").css("display","block");                              
                });          
               
                $(".selection").click(function() {
                                $(".selection").css("cssText","left: -9999px !important;");
                                $(".menu").css("cssText","left: -9999px !important;");      

                                test = $(this).siblings(".menu").children(".text").children(".foodImg");
                                if (test.children("img").length == 0) {
                                    test.append("<img src=\"images/statefood/fooditem-" + $(this).attr("class") + ".jpg\" alt=\"\" />");
                                }
                                              
                });                          

 }
