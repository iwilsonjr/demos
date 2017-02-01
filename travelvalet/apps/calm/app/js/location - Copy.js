// JavaScript Document




var map;
var service;
var infowindow;
var position;
var geocoder;

//Location Window
$("#listview").toggle(function(){
	$("#locationPlaces").addClass("hide");
	$("#locationList").removeClass("hide");		
}, function(){
	$("#locationPlaces").removeClass("hide");
	$("#locationList").addClass("hide");
});


//Loading Google Maps JS/Geolocation
function loadScript() {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "http://maps.googleapis.com/maps/api/js?libraries=geocode&key=AIzaSyBAKg9FWizD5Rh4njG0eQVUPglg7LyYi-4&sensor=true";/*&callback=getSourceDestination*/
  document.body.appendChild(script);	
  var script2 = document.createElement("script");
  script2.type = "text/javascript";
  script2.src = "http://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyBAKg9FWizD5Rh4njG0eQVUPglg7LyYi-4&sensor=true";/*&callback=getSourceDestination*/
  document.body.appendChild(script2);
  //if (navigator.geolocation) navigator.geolocation.getCurrentPosition(getSourceDestination, errorDirection); //If client has GeoLocation API, use it
  initialize();
}

  function initialize() {
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(-34.397, 150.644);
    var myOptions = {
      zoom: 8,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
  }
		
//Google Maps Place Search
/*function getSourceDestination(position){*/
	
/*	if (navigator.geolocation) {
		latitude = position.coords.latitude;
		longitude = position.coords.longitude;
	} else {
		
	}*/
	

$("#locationForm").submit(function(){alert('hi');
	
  var address = $("#location").val();
  alert(address);
  geocoder.geocode( { 'address': address}, function(results, status) {
	if (status == google.maps.GeocoderStatus.OK) {
	  map.setCenter(results[0].geometry.location);
	  var marker = new google.maps.Marker({
		  map: map,
		  position: results[0].geometry.location
	  });
	  alert(results);
	} else {
	  alert("Geocode was not successful for the following reason: " + status);
	}
  });	
		
	return false;
});

function getLatLong(response){
	alert(response);
}

/*function getSourceDestination(){	
	
	var pointLocation = new google.maps.LatLng(latitude,longitude);
	
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
}*/

//Geolocation Error Handling
function errorDirection(error){
 
	switch(error.code)  
	{  
		case error.PERMISSION_DENIED: 
			alert("User did not share geolocation data");  
		break;  

		case error.POSITION_UNAVAILABLE: 
			alert("Could not detect current position");  
		break;  

		case error.TIMEOUT: 
			alert("Retrieving position timed out");  
		break;  

		default: 
			alert("Unknown Error");  
		break;  
	} 

}

//Get/Display Location Information
/*function markLocations(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {  
  var place = "";
    for (var i = 0; i < results.length; i++) {
      place = "<li>" + results[i].name + "<br />" + results[i].vicinity + "</li>"; 
      createMarker(results[i]);
    }
	$("#locationList ul").prepend(place);
  }
}*/

//Create Map Markers
/*function createMarker(){

}*/

//Load (Async) Script
window.onload = loadScript();
