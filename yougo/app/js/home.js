// JavaScript Document

$(document).ready(function(){
//Start JQuery Code

/// Agent Login


 // Mobile Nav Toggle
  $('.loginBtn').click(function(){
   if ($('.agentLogin').hasClass('active')) {
     $('.agentLogin').removeClass('active');
   } else {
     $('.agentLogin').addClass('active');
   }
  });
  

  

 
 /*
 $('body').click(function(evt){
  
  	 if ($('.agentLogin').hasClass('active')) {
  
      
       if(evt.target.id == "loginPopup")
          return;
       if($(evt.target).closest('#loginPopup').length)
          return;             

     $('.agentLogin').removeClass('active');
	 
	 
	 	 }
	 
	 
	 });
*/
  
 
  
  
//Home Page Items  


  $('.earth').addClass('showEarth');
  $('#quoteForm .quoteForm').addClass('showQuoteForm');
  $('.hugo').addClass('showHugo');

  // Home Page Scroll
  $(".scrollToRollLink").click(function(event){    
    event.preventDefault();
    $('html,body').animate({scrollTop:$(this.hash).offset().top - 0}, 750);
  });  
  
  // Hugo Toggles
  $("[type='radio']").click(function(){
   $(this).parents("li").addClass("selected");
   checkHugo();
  });


//End JQuery Code
});

function hideHugoFunc(img){
  setTimeout(function(){
    $(".hugoBlock img").removeClass("showThisHugo");
    $(img).addClass("showThisHugo");  
  }, 500);
}

function hideHugoFunc2(img){
  setTimeout(function(){
    $(".hugoBlock2 img").removeClass("showThisHugo");
    $(img).addClass("showThisHugo");  
  }, 500);
}

function checkHugo(){
  
/* First Group */
  if ($("#cover-0").is(":checked")) {
    if ($("#sim-0").is(":checked")) {
      if ($("#pass-0").is(":checked")) {    
      //all three checked
        hideHugoFunc(".hugo-7");
      } else {
      //cover and sim checked
        hideHugoFunc(".hugo-4");          
      }
    } else if ($("#pass-0").is(":checked")) {
      //cover and pass checked
        hideHugoFunc(".hugo-5");        
    } else {
      //cover checked
        hideHugoFunc(".hugo-1");        
    }
  } else if ($("#sim-0").is(":checked")) {
    if ($("#pass-0").is(":checked")) {
      //pass and sim checked  
        hideHugoFunc(".hugo-6");        
    } else {
      //sim checked  
        hideHugoFunc(".hugo-2");          
    }
  } else if ($("#pass-0").is(":checked")) {
      //pass checked  
        hideHugoFunc(".hugo-3");      
  } else {
    // default
        hideHugoFunc(".hugo-0");      
  }
  
  if ($("#cover-1").is(":checked")) {
    $(".brokeLeg li").removeClass("selected");
  }
  if ($("#sim-1").is(":checked")) {
    $(".allergicReaction li").removeClass("selected");
  }
  if ($("#pass-1").is(":checked")) {
    $(".shark li").removeClass("selected");
  }  
  
  
   if ($("#cover-0").is(":checked")) {
   $('.paragliding').removeClass('hide');
   }
   if ($("#cover-1").is(":checked")) {
    $(".paragliding").addClass("hide");
  }
  
   if ($("#sim-0").is(":checked")) {
   $('.sushi').removeClass('hide');
   }
   if ($("#sim-1").is(":checked")) {
    $(".sushi").addClass("hide");
  }
  
   if ($("#pass-0").is(":checked")) {
   $('.sharkFact').removeClass('hide');
   }
   if ($("#pass-1").is(":checked")) {
    $(".sharkFact").addClass("hide");
  }
  
/* End First Group */


/* Second Group */
                if ($("#wallet2-0").is(":checked")) {
                                if ($("#cover2-0").is(":checked")) {
                                                if ($("#sim2-0").is(":checked")) {
                                                               
                                                                if ($("#pass2-0").is(":checked")) {                            
                                                                                //all four checked
                                                                                hideHugoFunc2(".hugo2-11");
                                                                } else {
                                                                                //wallet/cover/sim checked
                                                                                hideHugoFunc2(".hugo2-12");                                                                  
                                                                }
                                                               
                                                } else if ($("#pass2-0").is(":checked")) {
                                                                //wallet/cover/pass checked
                                                                hideHugoFunc2(".hugo2-13");
                                                } else {
                                                                //wallet/cover checked
                                                                hideHugoFunc2(".hugo2-5");     
                                                }
                                               
                                } else if ($("#pass2-0").is(":checked")) {
                                               
                                                if ($("#sim2-0").is(":checked")) {                              
                                                                //wallet/pass/sim checked
                                                                hideHugoFunc2(".hugo2-15");
                                                } else {
                                                                //wallet/pass checked
                                                                hideHugoFunc2(".hugo2-7");                                                                     
                                                }
                                               
                                } else if ($("#sim2-0").is(":checked")) {
                                                                                               
                                                //wallet/sim checked
                                                hideHugoFunc2(".hugo2-6");
                                               
                                } else {
                                                //wallet only checked
                                                hideHugoFunc2(".hugo2-1");     
                                }
               
                               
                } else if ($("#cover2-0").is(":checked")) {
                               
                                if ($("#sim2-0").is(":checked")) {
                                               
                                                if ($("#pass2-0").is(":checked")) {
                                                               
                                                                //cover/sim/pass only checked
                                                                hideHugoFunc2(".hugo2-14");                                                  
                                                               
                                                } else {
                                                               
                                                                //cover/sim only checked
                                                                hideHugoFunc2(".hugo2-8");                     
                                                }
                                               
                                } else if ($("#pass2-0").is(":checked")) {
                                                               
                                                //cover/pass only checked
                                                hideHugoFunc2(".hugo2-9");                                                                     
                                               
                                } else {
                                               
                                                //cover only checked
                                                hideHugoFunc2(".hugo2-2");                                                     
                                               
                                }
 
                               
                } else if ($("#sim2-0").is(":checked")) {
                               
                                               
                                                if ($("#pass2-0").is(":checked")) {
                                                               
                                                                //sim/pass only checked
                                                                hideHugoFunc2(".hugo2-10");                                                  
                                                               
                                                } else {
                                                               
                                                                //sim only checked
                                                                hideHugoFunc2(".hugo2-3");                     
                                                }             
 
                } else if ($("#pass2-0").is(":checked")) {
                                               
                                //pass only checked
                                hideHugoFunc2(".hugo2-4");                     
                                                               
                                                                               
                } else {
                                //default
                                hideHugoFunc2(".hugo2-0");     
                }
               
                if ($("#wallet2-1").is(":checked")) {
                                $(".walletStolen li").removeClass("selected")
                }
                if ($("#cover2-1").is(":checked")) {
                                $(".lostLuggage li").removeClass("selected")
                }
                if ($("#sim2-1").is(":checked")) {
                                $(".pilotLate li").removeClass("selected")
                }
                if ($("#pass2-1").is(":checked")) {
                                $(".busHijacked li").removeClass("selected")
                }      

  
   if ($("#wallet2-0").is(":checked")) {
   $('.wallet').removeClass('hide');
   }
   if ($("#wallet2-1").is(":checked")) {
    $(".wallet").addClass("hide");
  }
  
   if ($("#cover2-0").is(":checked")) {
   $('.luggageLost').removeClass('hide');
   }
   if ($("#cover2-1").is(":checked")) {
    $(".luggageLost").addClass("hide");
  }
  
   if ($("#sim2-0").is(":checked")) {
   $('.pilot').removeClass('hide');
   }
   if ($("#sim2-1").is(":checked")) {
    $(".pilot").addClass("hide");
  }
  
   if ($("#pass2-0").is(":checked")) {
   $('.bus').removeClass('hide');
   }
   if ($("#pass2-1").is(":checked")) {
    $(".bus").addClass("hide");
  }
 
/* End Second Group */


}