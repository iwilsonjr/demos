$(document).ready(function(){
//Start JQuery Code

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

//End JQuery Code
});	