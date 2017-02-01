

var showFlightInfo = function (ucName,AIndex, FIndex, DivId) {
    /*alert("AIndex : " + AIndex);
    alert("FIndex : " + FIndex);
    alert("DivID : " + DivId);*/
    //var objName ='ucMLResults_ucMLAvail_lvMLAvailabilities_ucFlightData_' + DivId + '_lvFlightResults_' + DivId + '_divFlightSegments_0';
    var objName = ucName + '_lvMultilegFlights_ucMLAvail_' + AIndex + '_lvMLAvailabilities_' + AIndex + '_ucFlightData_' + FIndex + '_lvFlightResults_' + FIndex + '_divFlightSegments_0';
    //alert(objName);
    showlayer(objName);
}

