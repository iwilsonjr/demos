// JavaScript Document

/* Initialization */
var heights = [];  

$(document).ready(function(){
//Start JQuery Code

	var sticky = new Waypoint.Sticky({
	  element: $("#planSummary")
	});

	//Benefits Display
	$(".benefitsLink").on("click keypress", function(){

		$(".benefitsTable").toggleClass("openBenefits");						

		if($(this).text().search("all") > -1) {
			$(".benefitsLink").text("Compare fewer benefits");
		} else {
			$(".benefitsLink").text("Compare all benefits");		
		};

		return false;
	});


	//Tabs
	$(".planSelector a").on("click keypress", function(){
		
		$(".plans").addClass("hide");			
		$($(this).attr("href")).removeClass("hide");

		$(".planSelector li").removeClass("selected");
		$(this).parent("li").addClass("selected");

		return false;
	});

	//Group Plans Selector
	$(".groupSelector a").on("click keypress", function(){
		
		$(".groupPlans").addClass("hide");			
		$($(this).attr("href")).removeClass("hide");

		$("#plan-1, #plan-3").removeClass("hide");
		/*$(".extras").addClass("hide");	*/	

		/*$(".plans").each(function( index ) {
			if (!$(this).hasClass("hide")) {
				var planId = $(this).attr("id").replace("plan-","");	
				$("#extras-" + planId).removeClass("hide");						
			}				
		});	*/	

		$(".planSelector li").removeClass("selected");
		$(".planSelector li:first-child").addClass("selected");



		return false;
	});	

	//Select Plan - Initialize
	if ($("input:radio[name='selectPlan']").is(":checked")) {
		thisSelection = $("input:radio[name='selectPlan']:checked");
		$(".plans").removeClass("selected");		
		thisSelection.parents(".plans").addClass("selected");	
		thisSelection.siblings("label").text("Selected");
		$(".extras").addClass("hide");
		$("#extras-" + thisSelection.val() + ", .buttonWell").removeClass("hide");		
		$("[type='submit']").removeAttr("disabled");			
		//alert($("input:radio[name='selectPlan']:checked").val());
	}


	//Select Plan
	$("[name='selectPlan']").on("click keypress", function(){
		var id = $(this).val();
		$(".extras").addClass("hide");
		$("#extras-" + id + ", .buttonWell").removeClass("hide"); /* Changed 7/15/15 */
		$("[type='submit']").removeAttr("disabled"); /* Added 7/15/15 */
		$(".selectPlan label").text("Select");
		$(this).siblings("label").text("Selected");
		$(".plans").removeClass("selected");		
		$(this).parents(".plans").addClass("selected");
	});


	/*if (document.body.clientWidth > 980) {
		//adjustGrid();						
	}

	//Tabs
	$(window).resize(function(){
		
		if (document.body.clientWidth > 980) {
			//adjustGrid();						
		} else {
			//$(".excess").css("height", "auto");
		}

	});*/

	//Added Coverage
	/*$(".checkItem label").on("click keypress", function(){
		if ($(this).siblings("input").prop("checked")) {
			$(this).text("Add");
		} else {
			$(this).text("Added");			
		}
	})*/



//End JQuery Code
});

function adjustGrid() { 
    //Top
   $(".excess").each(function (i) {
		heights[i] = $(this).height();
   });  
      
   test = heights.sort(function(a,b){return b - a});
   $(".excess").height(test[0]);                         
 
}