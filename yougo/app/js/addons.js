// JavaScript Document


//Help Tips - Initialize
$(".help").each(function()
{  
  var contentHelp = $($(this).attr("href")).html();
  
  $(this).qtip({
	  content: {
		 text: contentHelp,
		 button: true
	  },
	   show: 'click',		
	   hide: 'click' 
  });
});

$(".help").click(function(){
	$(".qtip").qtip("hide");	
  return false; 
});

function hideHugoFunc(img){
	setTimeout(function(){
		$(".hugoBlock img").removeClass("showHugo");
		$(img).addClass("showHugo");	
	}, 500);
}

//Hugo Logic - Changed 2/3/14
function checkHugo(){
  
	if ($("#cover-0").is(":checked") && $("#sim-0").is(":checked") && $("#pass-0").is(":checked") && $("#cancel-0").is(":checked")){
		
		hideHugoFunc(".hugo-1111");	// all - 1111

	//Three Active	

	} else if ($("#cover-0").is(":checked") && $("#sim-0").is(":checked") && $("#pass-0").is(":checked")) {
		
		hideHugoFunc(".hugo-1110");	// 1110

	} else if ($("#cover-0").is(":checked") && $("#sim-0").is(":checked") && $("#cancel-0").is(":checked")) {
		
		hideHugoFunc(".hugo-1101");	// 1101

	} else if ($("#cover-0").is(":checked") && $("#pass-0").is(":checked") && $("#cancel-0").is(":checked")) {
		
		hideHugoFunc(".hugo-1011");	// 1011

	} else if ($("#sim-0").is(":checked") && $("#pass-0").is(":checked") && $("#cancel-0").is(":checked")) {
		
		hideHugoFunc(".hugo-0111");	// 0111	

	//Two Active	

	} else if ($("#cover-0").is(":checked") && $("#sim-0").is(":checked")) {
		
		hideHugoFunc(".hugo-1100");	// 1100	

	} else if ($("#cover-0").is(":checked") && $("#pass-0").is(":checked")) {
		
		hideHugoFunc(".hugo-1010");	// 1010		

	} else if ($("#cover-0").is(":checked") && $("#cancel-0").is(":checked")) {
		
		hideHugoFunc(".hugo-1001");	// 1001

	} else if ($("#sim-0").is(":checked") && $("#cancel-0").is(":checked")) {
		
		hideHugoFunc(".hugo-0101");	// 0101

	} else if ($("#sim-0").is(":checked") && $("#pass-0").is(":checked")) {
		
		hideHugoFunc(".hugo-0110");	// 0110

	} else if ($("#pass-0").is(":checked") && $("#cancel-0").is(":checked")) {
		
		hideHugoFunc(".hugo-0011");	// 0011		

	//One Active

	} else if ($("#cover-0").is(":checked")) {
		
		hideHugoFunc(".hugo-1000");	// 1000	

	} else if ($("#sim-0").is(":checked")) {
		
		hideHugoFunc(".hugo-0100");	// 0100

	} else if ($("#pass-0").is(":checked")) {
		
		hideHugoFunc(".hugo-0010");	// 0010		

	} else if ($("#cancel-0").is(":checked")) {
		
		hideHugoFunc(".hugo-0001");	// 0001

	//None	

	} else {

		hideHugoFunc(".hugo-0000");	// default - 0000

	}
	
	if ($("#cover-0").is(":checked")) {
		$("#addon-1").addClass("showAddOn");
	} else {
		$("#addon-1").removeClass("showAddOn");
	}
	
	if ($("#sim-0").is(":checked")) {
		$("#addon-2").addClass("showAddOn");
	} else {
		$("#addon-2").removeClass("showAddOn");
	}	
	
	if ($("#pass-0").is(":checked")) {
		$("#addon-3").addClass("showAddOn");
	} else {
		$("#addon-3").removeClass("showAddOn");
	}	

	if ($("#cancel-0").is(":checked")) {
		$("#addon-4").addClass("showAddOn");
	} else {
		$("#addon-4").removeClass("showAddOn");
	}
}

$("[type='radio']").click(function(){
	var coverToggle = $(this).parent("li");
	coverToggle.addClass("selected");
	coverToggle.siblings("li").removeClass("selected");		
	checkHugo();
});


//Remove Options - Table
$(".remove").click(function(){
	var tableRemove = $(this).parents("tr");
	var test = {};
	var test2 = {};

	tableRemove.removeClass("showAddOn");

	//Form
	switch(tableRemove.attr("id")){
		case "addon-1":
			test = $("#cover-0");	
			test2 = $("#cover-1");	
		break;
		case "addon-2":
			test = $("#sim-0");	
			test2 = $("#sim-1");	
		break;
		case "addon-3":
			test = $("#pass-0");
			test2 = $("#pass-1");					
		break;
		case "addon-4": //Added 2/3/14
			test = $("#cancel-0");
			test2 = $("#cancel-1");					
		break;		
	}

	var coverToggle = test.parent("li");
	coverToggle.removeClass("selected");
	coverToggle.siblings("li").addClass("selected");
			
	test.removeAttr("checked");
	test2.prop("checked", true);

	checkHugo();
	return false;
})
