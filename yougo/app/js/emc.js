// JavaScript Document

$("[name='emc1']").click(function(){
	manageExistingConditions();
});
$("[name='emc2']").click(function(){
	manageExistingConditions();
});

function manageExistingConditions() {
	if (($("[name='emc1']:checked").val() == "Yes")  || ($("[name='emc2']:checked").val() == "Yes")) {
		$("#yesCondition").removeClass("hide");
		$(".buttonWell").addClass("emcWell");
	} else {
		$("#yesCondition").addClass("hide");  
		$(".buttonWell").removeClass("emcWell");		    
	}  
}