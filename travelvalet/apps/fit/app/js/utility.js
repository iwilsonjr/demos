// JavaScript Document

$(document).bind('pageinit', function(){
//Start JQuery Code

	//Mobile Initialization
	//$.mobile.pushStateEnabled = false; 
	//$.mobile.ajaxEnabled = false; 
	//$.mobile.hashListeningEnabled = false; 
	$.mobile.linkBindingEnabled = false;

	//Menu
	$("#menu").toggle(function(){
		openMenu();
		return false;		
	}, function(){
		closeMenu();		
		return false;		
	});

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
	} else {
		//Home Screen Animation, animation controlled by CSS, see main.css
		$(".containerWrapper").append("<span id=\"layer1\"></span><span id=\"layer2\"></span>");
	};  
	
	//Locate Functionality
	
	$("#locationList").delegate("a", "click, tap", function(){
		$("#locateContainer").removeClass("closeMap").addClass("openMap");
		$("#back").removeClass("hide");
		return false;
	});	
	
	$("#back").bind("click, tap", function(){
		$("#locateContainer").addClass("closeMap");
		$(this).addClass("hide");		
		return false;		
	});	
	
//End JQuery Code
});

function openMenu(){
	$("#menuSlider").removeClass("closeMenu").addClass("displayMenu");
	$("#menu").addClass("menuSelected");
	$("#back").css("z-index", "1");
/*	if($("#siteNav").height() < $("#container").height()) {
		$("#menuSlider").height($("#siteNav").height());
	}*/
}

function closeMenu(){
	$("#menuSlider").addClass("closeMenu");
	$("#menu").removeClass("menuSelected");	
	$("#back").css("z-index", "3");	
/*	$("#menuSlider").css("height","auto");	*/	
}