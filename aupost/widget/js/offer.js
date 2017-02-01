// JavaScript Document

$(document).ready(function(){
//Start JQuery Code

	//Select Plan
	$("[name='selectPlan']").on("click keypress", function(){
		var id = $(this).attr("id").replace("selectPlan-","");
		$(".extras, .buttonWell").removeClass("hide"); 
		$("[type='submit']").removeAttr("disabled");
		$(this).siblings("label").text("Selected");
	});

//End JQuery Code
});

