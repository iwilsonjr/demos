//calm app location functionality js; authored by jn 7-12-12
//declare vars
var uAreHere;  //location coordinates
var marker;  //user location marker object
var zoomDefault = 15;  //default zoom value
var zoomCorrection = 1;  //adjust map zoom
var markers = [];  //markers array  
var iterator = 0;  //loop counter for markers
var calmSpots = []; //search results array
var calmSpotsReference = []; //reference token for detail lookup on each spot when clicked
var map;  //google map
var icon = new google.maps.MarkerImage("files/images/icons/icon-location.png");  //custom icon (addtl params available)
var geocoder = new google.maps.Geocoder(); // run constructor to create geocoder object to convert address to latlng
//use infobubble library (must be included on page)
var infowindow =  new InfoBubble({//call constructor
    content: '',
  zIndex: 100,
  shadowStyle: 1,
  padding: 3,
  backgroundColor: '#393b3e',
  borderRadius: 10,
  arrowSize: 12,
  borderWidth: 0,
  borderColor: '#393b3e',
  disableAutoPan: false,
  hideCloseButton: false,
  arrowPosition: 50,
  backgroundClassName: 'bubbleClass',
  arrowStyle: 1,
  minWidth: 225,
  minHeight: 54
});
//default map while wait for permission and if user doesn't give permission to locate device
var defaultMap = new google.maps.LatLng(0,0);
var mapOptions = {
      zoom: 0,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: defaultMap,
    scaleControl: false,
    streetViewControl: false,
    mapTypeControl: false,
      overviewMapControl: false,
    zoomControl: false
    };

//--jquery binds--//

//toggle list/map in viewport
/*$("#listview").toggle(function(){
  $("#locationPlaces").addClass("hide");
  $("#locationList").removeClass("hide");    
}, function(){
  $("#locationPlaces").removeClass("hide");
  $("#locationList").addClass("hide");
});*/

//if they deny location access and/or send address by form, first convert address to LatLng
$('#locate').click(function() {
   deleteOverlays() //remove any existing markers
   geocodeIt(); //get latlng
   document.activeElement.blur();//make keyboard retract
});

//this is for the GO submission on iphone which is a submit even though there is no submit input on the form
$('#locationForm').submit(
 function() {
 deleteOverlays() //remove any existing markers
 geocodeIt();  //get latlng
 document.activeElement.blur();//make keyboard retract
 return false;
 })


//clear form
$('#location').val('');

//show default map to start or if navigator coordinate retrieval fails  
map = new google.maps.Map(document.getElementById("locationPlaces"),
            mapOptions);

//base function
//get the device location on page load and provide callbacks for error and timeout
if (navigator.geolocation) {
navigator.geolocation.getCurrentPosition(GetLocation,showError,{timeout:7000});
}
else{$("locationPlaces").html("Geolocation is not supported by this browser.");}

//or get form location and convert to latlng user google geocoder
function codeAddress(address) {
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
           uAreHere = results[0].geometry.location
       initialize(uAreHere);
      }
    
    else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  }///

//create a google LatLng object and pass to initialize
function GetLocation(location) {
    uAreHere = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);
    //reverse lookup to populate form input
  getNearest = reverseLookUp(uAreHere);
   initialize();
}///

//set up google map
function initialize() {
 
   //do vicinity search
  var request = {
    location: uAreHere,
    //radius: '8000', not compatible with rankBy argument
    types: ['spa','gym'],
    rankBy: google.maps.places.RankBy.DISTANCE
     };
   
  service = new google.maps.places.PlacesService(map);
  service.search(request, handleResponse);
}///

//convert response to array of results and build list
function handleResponse(results,status) {
  var place = "";  //ul of places
  if (status == google.maps.places.PlacesServiceStatus.OK) {  
    for (var i = 0; i < results.length; i++) {
      //build arrays for marker locations
      calmSpots[i] = results[i].geometry.location;
          //build array of reference tokens for detail lookup on click event
      calmSpotsReference[i] = results[i].reference;
          //build ul
      //place = place + "<li>" + results[i].name + "<br />" + results[i].vicinity + "</li>";
          }
  //$("#locationList ol").prepend(place);  //append list to DOM
    drop();  //add markers to map
  }
  else {alert('Sorry, no results for this location.')}
  
}///

//loop through array and use drop animation to put markers on map by calling addMarker on each iteration
function drop() {
  var bounds = new google.maps.LatLngBounds();  //set a bounds object to calculate ne/sw coords
  for (var i = 0; i < calmSpots.length; i++) {
    bounds.extend(calmSpots[i]); //add marker coords to bounds object properties
    setTimeout(function() {
        addMarker();
      }, i * 150); //controls the drop timing
    }
  map.fitBounds(bounds); //zoom map to bounds size
  fitBoundsZoom = map.getZoom();  //get the zoom calculated by fitBounds method
  map.setZoom(fitBoundsZoom + zoomCorrection)  //adjust it
  //map.setCenter(bounds.getCenter()); //center at bounds center
  map.setCenter(uAreHere);  //center at user location

}///

//  
function addMarker() {
  //marker var and options
  var calmMarker = new google.maps.Marker({
      position: calmSpots[iterator],
      map: map,
      draggable: false,
    //clickable: true,
      icon: icon,
      animation: google.maps.Animation.DROP
    })
  //get detail token
  var calmMarkerDetails = {reference: calmSpotsReference[iterator]};
  //bind click event to each marker
    google.maps.event.addListener(calmMarker, 'click', function() {
      //call the places api to get details
    service.getDetails(calmMarkerDetails, function(details, status) {
      //check for no website data
    //var webSite = details.website;
    //if (typeof(webSite) !== "undefined" && webSite != "") {webSite = "<a target='_blank' href='"+details.website + "'>"+details.website+"</a><br />"}
   // else {webSite = "No web site listed<br />";}
    //build the infobubble content
    //infowindow.setContent(details.name+"<br />"+details.vicinity+"<br />"+webSite+details.formatted_phone_number+"<br />"+"<a target='_blank' href='http://maps.google.com/maps?saddr="+uAreHere+"&daddr="+details.formatted_address+"'>Directions</a>");
    infowindow.setContent(details.name);	
      //open the bubble
    infowindow.open(map, calmMarker);
      });
      //bind listener to close infowindow if click anywere on map
    google.maps.event.addListener(map, "click", function(){
      infowindow.close();
      });

   });
  //show user's location with normal marker after map calls finish
  if(calmSpots.length - 1 == iterator){
  marker = new google.maps.Marker({
            map: map,
            position: uAreHere,
      pixelOffset: 5,
      title: "Your Location"
        });
  }
   markers.push(calmMarker);  //array of markers; use to remove later
   iterator++;
  //alert(markers);alert(iterator);
}///  

//convert address from form to latlng
function geocodeIt(){
  var addressForm = $('#location').val();
  $("#locationList ol").children().remove();
  iterator = 0;
  if (addressForm != "") {
      codeAddress(addressForm);
  }
  else {alert('Please enter a location.');}
}

//convert latlng to nearest address and populate form
function reverseLookUp(uAreHere) {
    geocoder.geocode({'latLng': uAreHere}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[0]) {
      getNearest = results[0].formatted_address;
      populateInput(getNearest);
        }
      }
     else {
        alert("Geocoder failed due to: " + status);
     }
    });
  }///

//pass value to form
function populateInput(getNearest) {
  $("#location").val(getNearest);
  }

function showError(error){
 
  switch(error.code)  
  {  
    case error.PERMISSION_DENIED:
      //alert("User did not share geolocation data");  
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

}///

function deleteOverlays() {
  //remove calm locations
  if (markers) {
    for (i in markers) {
      markers[i].setMap(null);
    }
    markers.length = 0;
  }
  marker.setMap(null); //remove user location
}