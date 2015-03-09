/**
 * Created by Peter Yordanov on 9.3.2015 г..
 */

/* USER NAVIGATOR */


function renderMarker( map, marker, latitude, longitude ) {

    source = new google.maps.LatLng( latitude, longitude );
    marker.setPosition( source);
    map.panTo( source );

    if(retrieveDistance(source, destination)<50){
        alert("You have reached your destination!");
        navigator.geolocation.clearWatch(userWatch);
        console.log("Stopped watching for location changes.");
    }

}