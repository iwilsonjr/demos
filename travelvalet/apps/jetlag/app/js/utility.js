// JavaScript Document
window.onload = function() {
    setTimeout(function(){window.scrollTo(0, 1);}, 1);
}

//Add to Home - iPhone/iOS only
var addToHomeConfig = {
	message: 'Install this web app on<br />your iPhone: tap %icon and then &lsquo;<strong>Add to Home</strong>&rsquo;<br />Screen.',
	returningVisitor: false,		// Show the message only to returning visitors (ie: don't show it the first time)
	//expire: 720,
	touchIcon: true,
	bottomOffset: 20
};


$(document).ready(function(){
//Start JQuery Code

	$.mobile.ajaxEnabled = false;
	
	/* Site Menu */
	$("#menuLink").toggle(function(){
		$("body").removeClass("closeNavigation").addClass("openNavigation");
	}, function(){
		$("body").removeClass("openNavigation").addClass("closeNavigation");
	})
	$("#menuLink").swipeleft(function() {
    	$("body").removeClass("closeNavigation").addClass("openNavigation");
	});
	$("#menuLink").swiperight(function() {
		$("body").removeClass("openNavigation").addClass("closeNavigation");
	});

	//Initialize Forms (Site-wide)
	var initialLabel = displayLabel();	
	$("#answer").text(initialLabel);
	var initialChoice = radioChecked();
	displayLabelImg(initialChoice, "initial");
		
	//Initialize Counter
	if ($(".displayBox").hasClass("flipCounter")) flipCounter("initial", initialLabel, '');
			
	//Radio Button Selector
	$("#next, #prev").on("click",function(){
		
		//Initialization
		var choices = $("form input[type='radio']").length - 1;
		var button = $(this).attr("id");
		var form = $("form").attr("id");	
				
		//Find pointer
		i = radioChecked();
		
		//For Flip Counter Only
		if ($(".displayBox").hasClass("flipCounter")) {
			textlabel = displayLabel();	
			flipCounter(button, textlabel, i);
		}
		
		//Removed checked
		$("form input[type='radio']:eq(" + i + ")").removeAttr("checked");
		
		//Checked next/previous one
		if (button == "next") {
			
			if (i < choices) {
				 i = i + 1;
			} else {
				 i = 0;	
			}
			
		} else {
			
			if (i == 0) {
				 i = choices;
			} else {
				 i = i - 1;	
			}
		}
		
		//New checked radio button
		$("form input[type='radio']:eq(" + i + ")").attr("checked", "checked");	
		
		//Answer Field
		textlabel = displayLabel();
		$("#answer").text(textlabel);
		if (!$(".displayBox").hasClass("flipCounter")) {
			displayLabelImg(i,button);
		}		
		
		return false;
	});
	
		
//End JQuery Code
});	

//Find Checked Button
function radioChecked(){
	var i = 0;
	
	$("form input[type='radio']").each(function(index){
		if ($(this).attr("checked")) {
			i = index;
		}
	});
	return i;
};
	  
//Display label/buttonwell
function displayLabel(){
	id = $("form input[type='radio']:checked").attr("id");
	label = $("[for=" + id + "]").text();
	return label;
}

//Display Label Image
function displayLabelImg(count, motion){
	
	//Initialization
	var flag = $("form input[type='radio']").length - 1;
	var imgStop = -1 * ($(".displayBox img").width() - 580);
	
	//Initial Value
	if (motion == "initial") {
				
		imgStop = -1 * ((count + 1) * 290);
		$(".displayBox img").css("left", imgStop + "px");
		
	} else {	
	
		//Fade Transitions
		if ($(".displayBox").hasClass("sleepCounter")) {
			
			$(".displayBox img").fadeOut(100, function(){
				if (motion == "next") {
					if (count == 0){	
						$(this).css("left","-290px");
					} else {
						$(this).animate({left: "-=290"}, 10);
					}
				} else {
					if (count == flag){	
						$(this).css("left", imgStop + "px");	
					} else {
						$(this).animate({left: "+=290"}, 10);
					}
				}
				$(this).fadeIn(100);
			});	
		
		} else {
		
			//Slide Transitions
			if (motion == "next") {
				$(".displayBox img").animate({left: "-=290"}, 200, function(){
					if (count == 0){	
						$(this).css("left","-290px");
					}
				});	
			} else {
				$(".displayBox img").animate({left: "+=290"}, 200, function(){
					if (count == flag){	
						$(".displayBox img").css("left", imgStop + "px");	
					}
				});
			}	
	
		}
		
	}

}

//Flipping functionality
function flipCounter(direction, label, j) {
	
	//Initialize & Reset
	$(".front .flipTR").removeClass("flipOutX");
	$(".front .flipBR").removeClass("flipInX");		
	$(".front .flipTR").width();
	$(".front .flipBR").width();
	
	$(".front .flipTL").removeClass("flipOutX");
	$(".front .flipBL").removeClass("flipInX");		
	$(".front .flipTL").width();
	$(".front .flipBL").width();	
	
	//Digits
	tens = label.substring(0,1);
	ones = label.substring(1,2);
	onesNext = "0";
	tensNext = "0";
	
	//Faces setup
	if (direction == "next"){
	
		//Next
		if ((ones == "9") && (tens == "0")) {
			tensNext = "1";
			onesNext = "0";
		} else if ((ones == "4") && (tens == "1")) {
			tensNext = "0";
			onesNext = "3";				
		} else {
			onesNext = parseInt(label.substring(1,2)) + 1;
		}
		
	} else {
		
		//Previous
		if ((ones == "0") && (tens == "1")) {
			tensNext = "0";
			onesNext = "9";
		} else if ((ones == "3") && (tens == "0")) {
			tensNext = "1";
			onesNext = "4";				
		} else {
			onesNext = parseInt(label.substring(1,2)) - 1;
		}
			
	}
	
	//Number Placement			
	$(".front .flipTL span").text(tens);
	$(".front .flipBL span").text(tensNext);
	$(".back .flipTL span").text(tensNext);
	$(".back .flipBL span").text(tens);	
	
	$(".front .flipTR span").text(ones);
	$(".front .flipBR span").text(onesNext);
	$(".back .flipTR span").text(onesNext);
	$(".back .flipBR span").text(ones);	
	
	//Flipper Action
	if (direction != "initial") {
		
		//Tens		
		if (direction == "next"){
			
			if ((ones == "9") || (j == 11)) {
				$(".front .flipTL").addClass("flipOutX");
				$(".front .flipBL").addClass("flipInX");
			}
			
		} else {
	
			if ((ones == "0") || (j == 0)) {
				$(".front .flipTL").addClass("flipOutX");
				$(".front .flipBL").addClass("flipInX");
			}
					
		}
		
		//Ones
		$(".front .flipTR").addClass("flipOutX");
		$(".front .flipBR").addClass("flipInX");
	
	}
	
}

/* Prevent links from opening in Safari when running as iOS web app */

(function(a,b,c){if(c in b&&b[c]){var d,e=a.location,f=/^(a|html)$/i;a.addEventListener("click",function(a){d=a.target;while(!f.test(d.nodeName))d=d.parentNode;"href"in d&&(d.href.indexOf("http")||~d.href.indexOf(e.host))&&(a.preventDefault(),e.href=d.href)},!1)}})(document,window.navigator,"standalone");