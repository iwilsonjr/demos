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

	//Switches between single and AMT products for desktop
      $(".groupSelector a").on("click keypress", function(){
        var selectedPlan = "";
        var selectedGroup = "";    
        // if a plan is selected this will hide or show the add coverages depending on whether the selected plan is in the selected group
        if($('input[name=selectPlan]:checked').val()) {
         selectedPlan = $('input[name=selectPlan]:checked').val();     
         selectedGroup = $('input[name=selectPlan]:checked').parent().parent().parent().parent().attr('id');
         if(selectedGroup == $(this).attr("href").replace(/\#/,"")) { /* if the selected product is in the selected group show extrans and continue button. */
          $('#extras_'+selectedPlan).removeClass('hide');
          $('.buttonWell').eq(0).removeClass('hide');
         }
         else { /* if the selected product is not in the selected group hide extras and continue button. */
          $('.extras').addClass('hide'); 
          $('.buttonWell').eq(0).addClass('hide');
         }   
        }    
        $(".groupPlans").addClass("hide");      
        $($(this).attr("href")).removeClass("hide");    
    $('.plans',$($(this).attr("href"))).eq(0).removeClass('hide');
    
       // $("#plan-1, #plan-3").removeClass("hide");
        $(".planSelector li").removeClass("selected");
        $(".planSelector li:first-child").addClass("selected");
        return false;
      }); 
    
    //Switches between single and AMT products for mobile
      $(".mGroupSelector a").on("click keypress", function(){
    //  alert("GOT HERE");
        var selectedPlan = "";
        var selectedGroup = "";    
        // if a plan is selected this will hide or show the add coverages depending on whether the selected plan is in the selected group
        if($('input[name=selectPlan]:checked').val()) {
         selectedPlan = $('input[name=selectPlan]:checked').val(); 
     if(selectedPlan == $('ul.planSelector li.selected a').attr("href").replace(/\#plan-/,"") && $('#'+$('input[name=selectPlan]:checked').parent().parent().parent().parent().attr('id')+' plans').eq(0).hasClass('hide')) { /* if the selected product is in the selected group show extrans and continue button. */     
          $('#extras_'+selectedPlan).removeClass('hide');
          $('.buttonWell').eq(0).removeClass('hide');      
         }
         else { /* if the selected product is not in the selected group hide extras and continue button. */
          $('.extras').addClass('hide'); 
          $('.buttonWell').eq(0).addClass('hide');
         }   
        }    
        $(".groupPlans").addClass("hide");      
        $($(this).attr("href")).removeClass("hide");    
    $('.plans',$($(this).attr("href"))).eq(0).removeClass('hide');
    
       // $("#plan-1, #plan-3").removeClass("hide");
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