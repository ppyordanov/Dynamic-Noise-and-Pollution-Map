/**
 * Created by Peter Yordanov on 9.3.2015 г..
 */

/* USER NAVIGATOR */


function renderMarker( map, marker, latitude, longitude ) {


    source = new google.maps.LatLng( latitude, longitude );
    marker.set("position", source);
    map.panTo( source );

    if(currentlyTrackingDestination){
        if(retrieveDistance(source, destination)<50){
            currentlyTrackingDestination = false;
            alert("You have reached your destination!");
            navigator.geolocation.clearWatch(userWatch);
            console.log("Stopped watching for location changes.");
        }
    }

}