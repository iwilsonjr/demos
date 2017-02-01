var jsonPaxDetails = []; //public value for Paxjson
var listAdult = []; //to assign all dropdown id of adult
var listChild = []; //to assign all dropdown id of child
var SeleTours = []; // To assign the pax for each tours

//Function to create a dummy Pax item per call - for the required number of passengers
var samplePax = function (paxtype) {
    this.PaxID = 0;
    this.PaxType = paxtype;
    this.Address1 = "XXX";
    this.Address2 = "XXX"
    this.BirthDate = "XXX";
    this.CardHolderName = "XXX";
    this.City = "XXX";
    this.CountryCode = "XXX";
    this.CustomerId = "XXX";
    this.Email = "XXX";
    this.ExtensionData = "XXX";
    this.Fax = "XXX";
    this.PaxAge = "XXX";
    this.PaxName = "fname";
    this.PaxLastName = "lname";
    this.PostalCode = "XXX";
    this.TelephoneDayTime = "XXX";
    this.TelephoneEvening = "XXX";
    this.TelephoneMobile = "XXX"
    this.Title = "title";
}

//to get the hiddenfield value from booking.aspx & assging to public variable
function InitializePaxInfo() {
    try {
        var data = document.getElementById("hfPaxDetails").value; //identify the hiddenfield variable
        jsonPaxDetails = jQuery.parseJSON(data); //parsing to json object
        findTour();
        //BindingValues();

        InitializePaxList();
        BindingValues();
    }
    catch (ex) {
    }
}

function getPAXJson() {
    try {
        //var data = document.getElementById("hfPaxDetails").value; //identify the hiddenfield variable
        //jsonPaxDetails = jQuery.parseJSON(data); //parsing to json object
        //findTour();
        //InitializePaxList();
        //BindingValues();
    }
    catch (ex) {
    }
}

//Function to Initialize the Pax Info with dummy values
function InitializePaxList() {

    //Adding Adult Pax List
    if (SeleTours.length > 0) {
        var PCount = 0;
        for (var index = 0; index < SeleTours.length; index++) {
            PCount = 0;;
            if (SeleTours[index].TOccup != null
                && SeleTours[index].TOccup != undefined) {
                PCount = parseInt(SeleTours[index].TOccup.ACount) + parseInt(SeleTours[index].TOccup.CCount);
                if (SeleTours[index].TOccup.PList.length == 0
                        || SeleTours[index].TOccup.PList.length != PCount
                        || !IsValidPaxData(SeleTours[index])) {
                    SeleTours[index].TOccup.PList = [];

                    //Adding Adult PaxList
                    var AdultIndex = 0;
                    var ChildIndex = 0;
                    for (var AIndex = 0; AIndex < SeleTours[index].TOccup.ACount; AIndex++) {
                        SeleTours[index].TOccup.PList.push(new samplePax("Adult"));
                    }

                    //Adding Child PaxList
                    for (var CIndex = 0; CIndex < SeleTours[index].TOccup.CCount; CIndex++) {
                        SeleTours[index].TOccup.PList.push(new samplePax("Child"));
                    }
                    AdultIndex = 0;
                    ChildIndex = GetChildIndex();
                    SeleTours[index] = AssignDefaultPaxIDs(SeleTours[index], AdultIndex, ChildIndex);
                }
            }
        }
        //SetNewPaxInformation();
        GetTourPaxDetails();
    }
}

function IsValidPaxData(SelectedTour) {
    var isValid = true;
    if (SelectedTour.TOccup != null
            && SelectedTour.TOccup.PList != null
            && SelectedTour.TOccup.PList.length > 0) {
        for (var PaxIndex = 0; PaxIndex < SelectedTour.TOccup.PList.length; PaxIndex++) {
            if (SelectedTour.TOccup.PList[PaxIndex].PaxID == null) {
                isValid = false;
            }
        }
    }
    return isValid;
}

function GetChildIndex() {
    var CIndex = 0;

    try {
        if (jsonPaxDetails != null
            && jsonPaxDetails.length > 0) {
            for (var PIndex = 0; PIndex < jsonPaxDetails.length; PIndex++) {
                if (jsonPaxDetails[PIndex].PassengerType == "Child") {
                    CIndex = jsonPaxDetails[PIndex].PassengerID;
                    break;
                }
            }
        }
    }
    catch (ex) {
    }
    return CIndex;
}
//Function to assign default PaxIDs at the time of generating the new PList for a tour
function AssignDefaultPaxIDs(SelectedTour, AdultIndex, ChildIndex) {
    try {
        if (SelectedTour.TOccup.PList != null
                    || SelectedTour.TOccup.PList != undefined) {
            for (var PIndex = 0; PIndex < SelectedTour.TOccup.PList.length; PIndex++) {
                if (SelectedTour.TOccup.PList[PIndex].PaxType == "Adult") {
                    SelectedTour.TOccup.PList[PIndex].PaxID = AdultIndex;
                    SelectedTour.TOccup.PList[PIndex].PaxAge = 13;
                    AdultIndex++;
                }
                else {
                    SelectedTour.TOccup.PList[PIndex].PaxID = ChildIndex;
                    SelectedTour.TOccup.PList[PIndex].PaxAge = 2;
                    ChildIndex++;
                }
            }
        }
    }
    catch (error) {
    }
    return SelectedTour;
}

//fires when ever changes occurs on usercontrol
//for entering the firstname and surname of the passengers
//start of pax name add in dropdown
function OnChange(textID, type, hdnID) {
    try {
        var text = document.getElementById(textID).value;
        var index = document.getElementById(hdnID).value;
        OnChangeValue(text, type, index, 0);
//        if (jsonPaxDetails != null) {
//            for (var i = 0; i < jsonPaxDetails.length; i++) {
//                if (type == 'title' && i == index) {
//                    jsonPaxDetails[i].Title = text;
//                }

//                //Common for both the Child and Infant
//                if (jsonPaxDetails[i].Title == '') {
//                    if (jsonPaxDetails[i].PassengerType == 'Child' || jsonPaxDetails[i].PassengerType == 'Infant') {
//                        jsonPaxDetails[i].Title = 'Mstr.';
//                    }
//                    else {
//                        jsonPaxDetails[i].Title = 'Mr.';
//                    }
//                }

//                //Setting the text as First Name
//                if (type == 'first' && i == index) {
//                    jsonPaxDetails[i].FirstName = text;
//                }

//                //Setting the text as Sur Name
//                if (type == 'last' && i == index) {
//                    jsonPaxDetails[i].SurName = text;
//                }
//            }
//            var selectexdJSon = JSON.stringify(jsonPaxDetails);
//            $("#hfPaxDetails").val(selectexdJSon);
//        }

//        //Setting the Name Change details 
//        //in the Selected Tours pax list
//        if (SeleTours.length > 0) {
//            for (var TourIndex = 0; TourIndex < SeleTours.length; TourIndex++) {
//                if (SeleTours[TourIndex].TOccup.PList != null
//                    && SeleTours[TourIndex].TOccup.PList != undefined) {
//                    for (var PIndex = 0; PIndex < SeleTours[TourIndex].TOccup.PList.length; PIndex++) {
//                        SeleTours[TourIndex] = SetSelectedPaxDetail(SeleTours[TourIndex], SeleTours[TourIndex].TOccup.PList[PIndex].PaxID, TourIndex, PIndex);
//                    }
//                }
//            }
//        }
//        BindingValues();
    }
    catch (error) {
    }
}

function OnChangePax(firstname, surname, index, paxLoginId) {
    ShowbookingpageLoading();
    OnChangeValue(firstname, 'first', index, paxLoginId);
    OnChangeValue(surname, 'last', index, paxLoginId);
	setTimeout("HidebookingpLoading()", 2000);
}

function OnChangeValue(text, type, index, paxLoginId) {
    try {
        if (jsonPaxDetails != null) {
            for (var i = 0; i < jsonPaxDetails.length; i++) {
                if (type == 'title' && i == index) {
                    jsonPaxDetails[i].Title = text;
                }

                //Common for both the Child and Infant
                if (jsonPaxDetails[i].Title == '') {
                    if (jsonPaxDetails[i].PassengerType == 'Child' || jsonPaxDetails[i].PassengerType == 'Infant') {
                        jsonPaxDetails[i].Title = 'Mstr.';
                    }
                    else {
                        jsonPaxDetails[i].Title = 'Mr.';
                    }
                }

                //Setting the text as First Name
                if (type == 'first' && i == index) {
                    jsonPaxDetails[i].FirstName = text;
                }
                if (i == index && paxLoginId > 0) {
                    jsonPaxDetails[i].OldPassengerID = paxLoginId;
                }

                //Setting the text as Sur Name
                if (type == 'last' && i == index) {
                    jsonPaxDetails[i].SurName = text;
                }
            }
            var selectexdJSon = JSON.stringify(jsonPaxDetails);
            $("#hfPaxDetails").val(selectexdJSon);
        }

        //Setting the Name Change details 
        //in the Selected Tours pax list
        if (SeleTours.length > 0) {
            for (var TourIndex = 0; TourIndex < SeleTours.length; TourIndex++) {
                if (SeleTours[TourIndex].TOccup.PList != null
                    && SeleTours[TourIndex].TOccup.PList != undefined) {
                    for (var PIndex = 0; PIndex < SeleTours[TourIndex].TOccup.PList.length; PIndex++) {
                        SeleTours[TourIndex] = SetSelectedPaxDetail(SeleTours[TourIndex], SeleTours[TourIndex].TOccup.PList[PIndex].PaxID, TourIndex, PIndex);
                    }
                }
            }
        }
        BindingValues();
    }
    catch (error) {
    }
}

// ------start of Tour occupancy-------
//fires when ever the name dropdownlist changes
//to get the json value from hiddenfield
function OnDDLChange(ddlID, hdnID, paxType, index, TourPaxCount, TourIndex) {
    try {
        var value;
        var ddlObj = document.getElementById(ddlID);
        if (ddlObj != null) {
            value = ddlObj.value;
        }
        //var Toccup = [];
        var SelTours;
        SelTours = getToccup(hdnID); //getting the hiddenfield value        

        if (SelTours != null
                && SelTours != undefined) {
            //Toccup.PList.push(sample);
            //if PList of the Tour Occupancy is null
            if (SelTours.TOccup.PList == undefined
            || SelTours.TOccup.PList == null) {
                SelTours.TOccup.PList = [];
            }

            //if PList of the TourOccupancy does not have a passenger item
            if (SelTours.TOccup.PList.length == 0) {
                for (var count = 0; count < TourPaxCount; count++) {
                    SelTours.TOccup.PList.push(sample);
                }
            }

            //If the Pax Information does not exist in the Pax List
            if (!IsPaxExists(SelTours.TOccup, value, index)) {
                if (SelTours.TOccup.PList[index] != null
                        && SelTours.TOccup.PList[index] != undefined) {

                    //Setting the sample detail with the Pax Id and Pax Type information
                    //SelTours[TourIndex].TOccup.PList[index].PaxID = value;
                    //SelTours[TourIndex].TOccup.PList[index].PaxType = paxType;

                    SelTours = SetSelectedPaxDetail(SelTours, value, TourIndex, index);
                    setToccup(hdnID, SelTours, TourIndex); //assigning the hiddenfield value
                }
            }
        }
    }
    catch (error) {
        alert(error);
    }
}



// to get all the dropdownlist ids from tour usercontrol
function findTour() {

    try {
        //getting all the dropdownlist by identifing the PANEL from parent DIV
        //divtourbox parent
        //adultPanel panel
        //ddlAdult dropdownlist
        if (listAdult.length == 0) {
            var divAdult = $('div[id*=divtourbox]').find('div[id*=adultPanel]').find('select[name*=ddlAdult]');
            if (listAdult != null && divAdult != null && divAdult.length > listAdult.length) {
                for (var i = 0; i < divAdult.length; i++) {
                    listAdult.push(divAdult[i].id);
                }
            }
        }

        if (listChild.length == 0) {
            var divChild = $('div[id*=divtourbox]').find('div[id*=childPanel]').find('select[name*=ddlChild]');
            if (listChild != null && divChild != null && divChild.length > listChild.length) {
                for (var i = 0; i < divChild.length; i++) {
                    listChild.push(divChild[i].id);
                }
            }
        }
        GetTourPaxDetails();
    }
    catch (error) {
    }
}




//to bind the values to the Dropdownlist
function BindingValues() {
    try {
        var PCount = 0;
        var paxAdult = []; //adult name list
        var paxChild = []; //child name list
        //------------------to check the values of title,firstname,lastname is null and assign as blankspace for null------
        if (jsonPaxDetails != null) {
            if (jsonPaxDetails.length > 0) {
                for (var index = 0; index < jsonPaxDetails.length; index++) {
                    if (jsonPaxDetails[index].PassengerType == 'Adult') {
                        // for adult
                        if (jsonPaxDetails[index].Title == null) {
                            jsonPaxDetails[index].Title = "";
                        }
                        if (jsonPaxDetails[index].FirstName == null) {
                            jsonPaxDetails[index].FirstName = "";
                        }
                        if (jsonPaxDetails[index].SurName == null) {
                            jsonPaxDetails[index].SurName = "";
                        }
                        //concating & appending the name list for adult
                        paxAdult.push(jsonPaxDetails[index].Title + " " + jsonPaxDetails[index].FirstName + " " + jsonPaxDetails[index].SurName);
                    }
                    else {
                        // for child
                        if (jsonPaxDetails[index].PassengerType == 'Child') {
                            if (jsonPaxDetails[index].Title == null) {
                                jsonPaxDetails[index].Title = "";
                            }
                            if (jsonPaxDetails[index].FirstName == null) {
                                jsonPaxDetails[index].FirstName = "";
                            }
                            if (jsonPaxDetails[index].SurName == null) {
                                jsonPaxDetails[index].SurName = "";
                            }
                            //concating & appending the name list for child
                            paxChild.push(jsonPaxDetails[index].Title + " " + jsonPaxDetails[index].FirstName + " " + jsonPaxDetails[index].SurName);
                        }
                    }
                }
            }
        }
        //-----------------end--------------

        var PLIST = []; //TOccup list per tour

        //-------------remove the already exsist data from dropdown adult-----------
        for (var index = 0; index < listAdult.length; index++) {

            var len = document.getElementById(listAdult[index]).options.length;
            for (i = 0; i < len; i++) {
                document.getElementById(listAdult[index]).remove(0); //It is 0 (zero) intentionally
            }
        }
        //------------------end----------

        //--------------read json and assign to dropdown list for adult
        for (var index = 0; index < listAdult.length; index++) {
            if (SeleTours.length > index) {
                //SeleTours[index].TOccup.PList = [];
            }
            for (var innerindex = 0; innerindex < paxAdult.length; innerindex++) {
                var opt = document.createElement("option");

                document.getElementById(listAdult[index]).options.add(opt);
                opt.text = paxAdult[innerindex];
                opt.value = innerindex;
                //PCount++;
                var fname = '';
                var lname = '';
                var title = '';
                var paxnames = opt.text.split(" ");

                if (opt.text.split(" ").length == 3) {
                    title = paxnames[0];
                    fname = paxnames[1];
                    lname = paxnames[2];
                }
                else if (opt.text.split(" ").length = 2) {
                    title = opt.text.split(" ")[0];
                    fname = opt.text.split(" ")[1];
                }

                if (index == innerindex) {
                    if (opt.text != '') {
                        opt.selected = true;
                    }
                }
                PCount++;
            }

        }


        //------------------end----------

        //-------------remove the already exsist data from dropdown Child-----------
        for (var index = 0; index < listChild.length; index++) {

            var len = document.getElementById(listChild[index]).options.length;
            for (i = 0; i < len; i++) {
                document.getElementById(listChild[index]).remove(0); //It is 0 (zero) intentionally
            }
        }
        //------------------end----------



        //--------------read json and assign to dropdown list for child

        for (var index = 0; index < listChild.length; index++) {

            for (var innerindex = 0; innerindex < paxChild.length; innerindex++) {
                var opt = document.createElement("option");

                document.getElementById(listChild[index]).options.add(opt);
                opt.text = paxChild[innerindex];
                opt.value = paxAdult.length+ innerindex;

                var fname = '';
                var lname = '';
                var title = '';
                var paxnames = opt.text.split(" ");

                if (opt.text.split(" ").length == 3) {
                    title = paxnames[0];
                    fname = paxnames[1];
                    lname = paxnames[2];
                }
                else if (opt.text.split(" ").length = 2) {
                    title = opt.text.split(" ")[0];
                    fname = opt.text.split(" ")[1];
                }


                if (index == innerindex) {
                    if (opt.text != " ") {
                        opt.selected = true;
                    }
                }
                PCount++;
            }
        }


        SetControlValues();
        ResetPaxInfo();
        //SetNewPaxInformation();
        //GetTourPaxDetails();
        //ResetPaxInfo();
    }
    catch (error) {
    }
    //------------------end----------
}



//To get the Tour Pax Information from Hidden Fields and to assign them in SeleTours
function GetTourPaxDetails() {
    try {
        SetNewPaxInformation();
        var hdf = $('div[id*=divtourbox]').find('div[id*=divhdf]').find('input[id*=hdnfTours]');
        if (hdf.length > 0) {
            /*if (hdf[0].value != '' && hdf[0].value != null) {
            SeleTours = jQuery.parseJSON(hdf[0].value);
            }*/
            for (var index = 0; index < hdf.length; index++) {
                SeleTours[index] = jQuery.parseJSON(hdf[index].value);
            }
        }
    }
    catch (error) {
    }
}

//To get the Tour Pax Information from SeleTours and to assign them in Hidden Fields
function SetNewPaxInformation() {
    //Reseting the name info
    /*var hdf = $('div[id*=divtourbox]').find('div[id*=divhdf]').find('input[id*=hdnfTours]');
    $(hdf).val(JSON.stringify(SeleTours));*/
    try {
        
        var hdf = $('div[id*=divtourbox]').find('div[id*=divhdf]').find('input[id*=hdnfTours]');
        if (SeleTours != null
            && SeleTours.length == hdf.length) {

            //Resetting Pax Information to store the actual name of pax from jsonPaxDetails
            for (var TIndex = 0; TIndex < SeleTours.length; TIndex++) {
                for (var PIndex = 0; PIndex < SeleTours[TIndex].TOccup.PList.length; PIndex++) {
                    SeleTours[TIndex] =  SetSelectedPaxDetail(SeleTours[TIndex], SeleTours[TIndex].TOccup.PList[PIndex].PaxID, TIndex, PIndex)
                }
            }
                 
            for (var index = 0; index < hdf.length; index++) {
                $(hdf[index]).val(JSON.stringify(SeleTours[index]));
            }
        }
    }
    catch (error) {
    }
}

//Function to assign the Selected Pax information in respective Tour related controls
function SetControlValues() {
        var CurrentTourIndex = 0;
    var CurrentOption = 0;

    var TotalAdultCount = listAdult.length;
    var TotalChildCount = listChild.length;

    var CurrAdultCount = 0;
    var CurrChildCount = 0;
    var ValueSet = false;
    try {
        for (var TourIndex = 0; TourIndex < SeleTours.length; TourIndex++) {
            PIndex = 0;
            if (SeleTours[TourIndex].TOccup != null) {
                if (SeleTours[TourIndex].TOccup.PList != null
                    && SeleTours[TourIndex].TOccup.PList.length > 0) {
                    
                    for (var PIndex = 0; PIndex < SeleTours[TourIndex].TOccup.PList.length; PIndex++) {
                    if (SeleTours[TourIndex].TOccup.PList[PIndex].PaxType == "Adult") {
                        ValueSet = false;
                            var objAdultDD = document.getElementById(listAdult[CurrAdultCount]);
                            if (objAdultDD != null) {
                                for (i = 0; i < objAdultDD.length; i++) {
                                    if (objAdultDD.options[i].value == SeleTours[TourIndex].TOccup.PList[PIndex].PaxID
                                        && ValueSet == false) {
                                        objAdultDD.selectedIndex = i;
                                        ValueSet = true;
                                        CurrAdultCount++;
                                    }
                                }
                            }
                            //document.getElementById(listAdult[CurrAdultCount]).value = SeleTours[TourIndex].TOccup.PList[PIndex].PaxID;
                            
                        }
                        else {
                            var objChildDD = document.getElementById(listChild[CurrChildCount]);
                            ValueSet = false;
                            if (objChildDD != null) {
                                for (i = 0; i < objChildDD.length; i++) {
                                    if (objChildDD.options[i].value == SeleTours[TourIndex].TOccup.PList[PIndex].PaxID
                                            && ValueSet == false) {
                                        objChildDD.selectedIndex = i;
                                        ValueSet = true;
                                        CurrChildCount++;
                                    }
                                }
                            }
                            //document.getElementById(listChild[CurrChildCount]).value = SeleTours[TourIndex].TOccup.PList[PIndex].PaxID;
                           
                        }
                    }

                }
            }
        }
    }
    catch (error) {
    }
}


//Updating the Name and other information for the selectd Pax
//called when a value in Pax Drop Down gets changed
function SetSelectedPaxDetail(SelectedTour, PaxIndex, TourIndex, index) {
    try {
        if (jsonPaxDetails != null
            && jsonPaxDetails != undefined) {
            if (jsonPaxDetails.length > 0
                        && jsonPaxDetails[PaxIndex] != null) {
                for (var PIndex = 0; PIndex < jsonPaxDetails.length; PIndex++) {
                    if (jsonPaxDetails[PIndex].PassengerID == PaxIndex) {
                        SelectedTour.TOccup.PList[index].PaxID = PaxIndex;
                        SelectedTour.TOccup.PList[index].PaxName = jsonPaxDetails[PaxIndex].FirstName;
                        SelectedTour.TOccup.PList[index].PaxLastName = jsonPaxDetails[PaxIndex].SurName;
                        SelectedTour.TOccup.PList[index].Title = jsonPaxDetails[PaxIndex].Title;
                        SelectedTour.TOccup.PList[index].PaxType = jsonPaxDetails[PaxIndex].PassengerType;

                        if(jsonPaxDetails[PaxIndex].OldPassengerID>0)
                            SelectedTour.TOccup.PList[index].Fax = jsonPaxDetails[PaxIndex].OldPassengerID;

                        if (jsonPaxDetails[PaxIndex].PassengerType == "Adult") {
                            SelectedTour.TOccup.PList[index].PaxAge = 13;
                        } else {
                            SelectedTour.TOccup.PList[index].PaxAge = 2;
                        }
                    }
                }
            }
        }
    }
    catch (error) {
    }
    return SelectedTour;
}

//Function to checked whether the Tour Occupancy has the new selected Pax Index in the list already
function IsPaxExists(tourOccupancy,PaxIndex, Index) {
    var IsExists = false;
    try {
        if (tourOccupancy.PList != undefined
            && tourOccupancy.PList.length > 0) {
            //for (var PIndex = 0; PIndex < tourOccupancy.PList.length; PIndex++) {
            if (tourOccupancy.PList[Index].PaxID == PaxIndex) {
                    IsExists = true;
                }
            //}
        }
    }
    catch (error) {
    }
    return IsExists;
}


//to assig the hiddenfield value to json
function getToccup(hdnID) {
    var Tours;
    try {
        var data = document.getElementById(hdnID).value; //identify the hiddenfield variable
        //alert("data : " + data);
        Tours = jQuery.parseJSON(data); //parsing to json object
    }
    catch (error) {
    }
    return Tours;
}


//to assign the json value to hiddenfield
function setToccup(hdnID, SelTour, TourIndex) {
    try {
        var selectexdJSon = JSON.stringify(SelTour); //stringify the json object and assign back to hiddenfield
        document.getElementById(hdnID).value = selectexdJSon; //assigning the values to hiddenfield
        SeleTours[TourIndex] = SelTour;
        //Generating the new paxlist
        ResetPaxInfo();
        SetNewPaxInformation();
    }
    catch (error) {
    }
}

//Function to generate the New Pax  list if a change is made on the Passenger user Control
function ResetPaxInfo() {
    try {
        var NewPaxList = [];
        for (var k = 0; k < SeleTours.length; k++) {
            NewPaxList.push(SeleTours[k].TOccup);
        }
        $("#hfpaxlistPerTour").val(JSON.stringify(NewPaxList));
    }
    catch (error) {
    }
}



/*

//------------start -------function occurs while control changes
//to get the all the controls & get the values assign it to the json
function allTourValues() {
    var divParent = $('div[id*=divtourbox]');
    var divAdult = $('div[id*=divtourbox]').find('div[id*=adultPanel]').find('select[name*=ddlAdult]');
    var divChild = $('div[id*=divtourbox]').find('div[id*=childPanel]').find('select[name*=ddlChild]');
    var hdf = $('div[id*=divtourbox]').find('div[id*=divhdf]').find('input[id*=hdnfTours]');
   
    for (var iindex = 0; iindex < divParent.length; iindex++) 
    {
        var Toccup = [];
       
        Toccup = jQuery.parseJSON(hdf[iindex].value);     

        for (var index = 0; index < Toccup.ACount; index++)
        {
            Toccup = assignValuesToccup(Toccup, divAdult[index].value, 'Adult');
        }

        for (var index = 0; index < Toccup.CCount; index++)
        {
            Toccup = assignValuesToccup(Toccup, divChild[index].value, 'Child');
        }

        hdf[iindex].value = JSON.stringify(Toccup); //stringify the json object and assigning the values to hiddenfield      
    }
}

//check for duplication and assign values to The Toccup Json
//Toccup --->Json value
//paxID ---->Input of control value
//paxType---->Input of Paxtype
function assignValuesToccup(Toccup, paxID, paxType)
{
    //var ResToccup = Toccup;
    //ResToccup.PList = [];
    var PLIST = [];

    if (Toccup.PList[0] == null) {//check for null
        var sample = new samplePax();
        sample.PaxID = paxID;
        sample.PaxType = paxType;
        Toccup.PList.push(sample);      
    }
    else {
        for (var index = 0; index < Toccup.PList.length; index++) 
        {
            if (Toccup.PList[index].PaxID != paxID && Toccup.PList[index].PaxType != paxType)
            {
                //check for duplication

                var sample = new samplePax();
                sample.PaxID = paxID;
                sample.PaxType = paxType;
                //Toccup.PList.push(sample);
                PLIST.push(sample);           
            }
        }

        for (var i = 0; i < PLIST.length; i++)
        {
            Toccup.PList.push(PLIST[i]); // = PLIST;
        }
    }
    return Toccup;
}
//------------------end-----------------

*/