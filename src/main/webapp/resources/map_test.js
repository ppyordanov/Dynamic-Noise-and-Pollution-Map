var minLatBounds = 55.870056;
var maxLatBounds = 55.875209;
var minLonBounds = -4.278797;
var maxLonBounds = -4.297637;

function randomPosGen(lowLatBounds, highLatBounds, lowLonBounds, highLonBounds) {

    var center;

    var multiplier = 10000000;
    var lat = Math.random() * ((highLatBounds - lowLatBounds) * multiplier) + lowLatBounds * multiplier;
    var lon = Math.random() * ((highLonBounds - lowLonBounds) * multiplier) + lowLonBounds * multiplier;

    center = new google.maps.LatLng(lat / multiplier, lon / multiplier);


    return center;

}

var styledMap = new google.maps.StyledMapType(styles[0],
    {name: "Styled Map"});


function progressEvaluate(value, benchmark) {


    var progress = (value / benchmark);
    return progress;
}


function init_map() {

    var myOptions = {
        zoom: 16,
        minZoom: 16,
        maxZoom: 18,
        center: new google.maps.LatLng(55.872912, -4.289657),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: false
    };

    map = new google.maps.Map(
        document.getElementById("gmap_canvas"),
        myOptions);

    var frameBorder = new google.maps.LatLngBounds(
        new google.maps.LatLng(55.870056, -4.297637),
        new google.maps.LatLng(55.875209, -4.278797)
    );

    var lastCenter = map.getCenter();

    google.maps.event.addListener(map, 'center_changed', function () {
        if (frameBorder.contains(map.getCenter())) {

            lastCenter = map.getCenter();
            return;
        }

        map.panTo(lastCenter);
    });


    var radiusNoise;
    var radiusPollution;
    var latitude, longitude, position;


    for (var i = 0; i < dataReadings.length / 50; i++) {

        radiusNoise = parseFloat(dataReadings[i].noise) / 5;
        radiusPollution = (parseFloat(dataReadings[i].co) + parseFloat(dataReadings[i].no2)) / 10;
        latitude = parseFloat(dataReadings[i].latitude);
        longitude = parseFloat(dataReadings[i].longitude);
        position = new google.maps.LatLng(latitude, longitude);

        var pollutionOptions = {
            //strokeColor: '#FF0000',
            //strokeOpacity: 0.8,
            strokeWeight: 0,
            fillColor: '#FF0000',
            fillOpacity: progressEvaluate(dataReadings[i].co, 500),
            map: map,
            label: 'gogodi',
            center: position,
            //center: campusMap[reading].center,
            radius: radiusPollution
        };

        var noiseOptions = {
            //strokeColor: '#FF0000',
            //strokeOpacity: 0.8,
            strokeWeight: 0,
            fillColor: '#00FF00',
            fillOpacity: progressEvaluate(dataReadings[i].noise, 100),
            map: map,
            center: position,
            radius: radiusNoise
        };


        pollutionCircle = new google.maps.Circle(pollutionOptions);
        noiseCircle = new google.maps.Circle(noiseOptions);

    }

    map.mapTypes.set('map_style', styledMap);
    map.setMapTypeId('map_style');

}

google.maps.event.addDomListener(window, 'load', init_map);

