
/*This script for show the loading image for every action and it ll be hide after the datatransferred. */

function ShowLoading() {

//    var divload = document.getElementById('divLoading');

//    if (divload != 'undefined') {
//        divload.style.visibility = 'visible';
//        //alert('Show');
//    }

    ShowbookingLoading();
    return true;
}

function HideLoading() {
    
//    var divload = document.getElementById('divLoading');

//    if (divload != 'undefined') {
//        divload.style.visibility = 'hidden';
//       // alert('hide');
//    }
    HidebookingLoading();
}

//loading images when booking
function ShowbookingLoading()
{
    if (document.getElementById("backgroundPopup") != 'undefined')
    {
		/*IE 7,8,9 Loading issue*/
		/*var curImg = $("#backgroundPopup #divLoading").html();
		$("#backgroundPopup #divLoading img").remove();
		$("#backgroundPopup #divLoading").html(curImg);*/
		/*IE 7,8,9 Loading issue ends*/
		
        document.getElementById("backgroundPopup").style.visibility = 'visible';
    }
}
function HidebookingLoading()
{
    if (document.getElementById("backgroundPopup") != 'undefined')
    {
        document.getElementById("backgroundPopup").style.visibility = 'hidden';
    }
}

function ShowbookingpageLoading() {
    ShowbookingLoading();
    if (document.getElementById("UpdateProgress1") != 'undefined') {
        document.getElementById("UpdateProgress1").style.display = 'block';
    }
}
function HidebookingpLoading() {
    HidebookingLoading();
    if (document.getElementById("UpdateProgress1") != 'undefined') {

        document.getElementById("UpdateProgress1").style.display = 'none';
    }
}