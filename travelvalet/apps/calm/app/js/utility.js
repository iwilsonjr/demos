// JavaScript Document


$(document).bind('pageinit', function(){
//Start JQuery Code
//$.mobile.pushStateEnabled = false; $.mobile.ajaxEnabled = false; $.mobile.hashListeningEnabled = true; $.mobile.linkBindingEnabled = false;
 $.mobile.ajaxEnabled = false;
  //Menu
  $("#menu").toggle(function(){
    openMenu();
    return false;    
  }, function(){
    closeMenu();    
    return false;    
  });
  
/*  $("#menuSlider").swipeleft(function(){
    openMenu();  
  });
  
  $("#menuSlider").swiperight(function(){
    closeMenu();  
  });
*/
  $("#menu").swipeleft(function(){
    openMenu();  
  });
  
  $("#menu").swiperight(function(){
    closeMenu();  
  });  
  
  if(!$("body").hasClass("home")){
    $(".mediateSelector").delegate("a", "click", function(){
      
      //Link
      $(".mediateSelector li").removeClass("selected");
      $(this).parent().addClass("selected");
      
      //Related Content
      $(".mediateBlock").addClass("hide");
      $($(this).attr("href")).removeClass("hide");
      $($(this).attr("href") + " .mediateLister li:gt(0)").addClass("hide");  
      $($(this).attr("href") + " .mediateLister li:eq(0)").removeClass("hide");      
      
      $($(this).attr("href") + " .displaySelector li").removeClass("selected");
      $($(this).attr("href") + " .displaySelector li:eq(0)").addClass("selected");        
      return false;
    });
    
    $(".displaySelector").delegate("a", "click", function(){
      
      //Link
      $(".displaySelector li").removeClass("selected");
      $(this).parent().addClass("selected");
      
      //Related Content
      $(".mediateLister li").addClass("hide");
      $($(this).attr("href")).removeClass("hide");
      
      return false;
    });
  };  

  
//End JQuery Code
});

function openMenu(){
  $("#menuSlider").removeClass("closeMenu").addClass("displayMenu");
  $("#menu").addClass("menuSelected");
  if($("#siteNav").height() < $("#container").height()) {
    $("#menuSlider").height($("#siteNav").height());
  }
}

function closeMenu(){
  $("#menuSlider").addClass("closeMenu");
  $("#menu").removeClass("menuSelected");  
  $("#menuSlider").css("height","auto");    
}