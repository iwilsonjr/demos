navigator.geolocation.getCurrentPosition(GetLocation);
function GetLocation(location) {
    //alert(location.coords.latitude);
    //alert(location.coords.longitude);
    //alert(location.coords.accuracy);
	initialize(location.coords.latitude,location.coords.longitude, location.coords.accuracy);
}

//need action if result is no??

function initialize(lat, long, acc){	
	
	var pointLocation = new google.maps.LatLng(lat, long);
	
	var map = new google.maps.Map(document.getElementById('locationPlaces'),{
	  center: pointLocation,
	  zoom: 15,
	  mapTypeId: google.maps.MapTypeId.ROADMAP
	});
	
	var request = {
	  location: pointLocation,
	  radius: '50',
	  types: ['food']
	};	
	
  service = new google.maps.places.PlacesService(map);
  service.search(request, markLocations);	
}

function markLocations(results, status, map) {
	
	alert(results);
	alert(status);
  if (status == google.maps.places.PlacesServiceStatus.OK) {  
  var place = "";
    for (var i = 0; i < results.length; i++) {
      place = "<li>" + results[i].name + "<br />" + results[i].vicinity + "</li>"; 
      alert(results[i].geometry.location.lng());
	  createMarker(results[i], map);
    }
	$("#locationList ul").prepend(place);
  }
}

function createMarker(results, mapIn){
	//alert(results.lat);
	var map = mapIn
	var GLat = results.geometry.location.lat()
	alert(GLat);
	var GLng = results.geometry.location.lng()
    alert(GLng);
	var myLatLng = new google.maps.LatLng(GLat,GLng);
	alert(myLatLng);
    var marker = new google.maps.Marker({
        position: myLatLng, 
        map: map,
        title: "test"
    });   }