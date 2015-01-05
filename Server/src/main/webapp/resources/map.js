var minLatBounds = 55.870056;
var maxLatBounds = 55.875209;
var minLonBounds = -4.278797;
var maxLonBounds = -4.297637;

/* testing purposes
 var minLatBounds = 55.0;
 var maxLatBounds = 56.875209;
 var minLonBounds = -3.278797;
 var maxLonBounds = -5.297637;
 */

var centerLat = 55.872912;
var centerLon = -4.289657;
var center = new google.maps.LatLng(centerLat, centerLon);

var maxNoise = 100;
var maxCO = 500;
var maxNO2 = 20;
var maxBattery = 100;

var id;
var noise;
var co;
var no2;
var timestamp;
var battery;
var latitude;
var longitude;
var position;

var map;
var image = '/resources/sck_logo5.png';
var marker;
var content;
var styledContent;
var popup = new google.maps.InfoWindow({});

var progress;
var progressContent;

$(document).ready(function () {

    $('#style0').click(function () {
        map.setMapTypeId('CLASSIC');
    });
    $('#style1').click(function () {
        map.setMapTypeId('GRAYSCALE_DEFAULT');
    });
    $('#style2').click(function () {
        map.setMapTypeId('BLUE_HUE');
    });
    $('#style3').click(function () {
        map.setMapTypeId('DARK_BLUE');
    });
    $('#style4').click(function () {
        map.setMapTypeId('CLEAN_CLASSIC');
    });
    $('#style5').click(function () {
        map.setMapTypeId('ROADS');
    });

});

function randomPosGen(lowLatBounds, highLatBounds, lowLonBounds, highLonBounds) {

    var center;

    var multiplier = 10000000;
    var lat = Math.random() * ((highLatBounds - lowLatBounds) * multiplier) + lowLatBounds * multiplier;
    var lon = Math.random() * ((highLonBounds - lowLonBounds) * multiplier) + lowLonBounds * multiplier;

    center = new google.maps.LatLng(lat / multiplier, lon / multiplier);
    return center;

}

function progressEvaluate(value, benchmark) {

    progress = (value / benchmark) * 100;
    progressContent = '<div class="progress"><div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style="width: ' + progress + '%"><span class="sr-only">45% Complete</span></div></div>';
    return progressContent;
}


function addPopUp(marker, content) {


    google.maps.event.addListener(marker, 'mouseover', function (e) {
        console.log(e);
        popup.setContent(content);
        popup.open(map, marker);
    });


}

function convertToRGB(n) {
    var B = 0;
    var R = Math.floor((255 * n) / 100);
    var G = Math.floor((255 * (100 - n)) / 100);
    var RGB = "rgb(" + R + "," + G + "," + B + ")";
    return RGB;
}

function convertToHSV(n) {
    return null;
}


function generateMarker(dataReading) {

    id = dataReading.id;
    noise = dataReading.noise;
    co = dataReading.co;
    no2 = dataReading.no2;
    //alert(dataReadings[i].timestamp);
    battery = dataReading.battery;
    latitude = dataReading.latitude;
    longitude = dataReading.longitude;
    position = new google.maps.LatLng(latitude, longitude);


    var pinIcon = new google.maps.MarkerImage(
        image,
        new google.maps.Size(30, 30)
    );

    marker = new google.maps.Marker({
        position: position,
        map: map,
        //animation: google.maps.Animation.DROP,
        icon: pinIcon
    });

    content = "Noise: " + noise + progressEvaluate(noise, maxNoise) + "CO: " + co + progressEvaluate(co, maxCO) + "NO2: " + no2 + progressEvaluate(no2, maxNO2) + "Battery: " + battery + progressEvaluate(battery, maxBattery);
    styledContent = '<div class="mapPopUp">' + content + '</div>';

    addPopUp(marker, styledContent);

}

function generateRoute(newRoute) {

    var route = new google.maps.Polyline({
        path: newRoute,
        strokeColor: "#2196f3",
        strokeOpacity: 0.5,
        strokeWeight: 10
    });
    route.setMap(map);

}

function populateMap() {
    for (var i = 0; i < routes.length; i++) {
        var routeDR = dataReadings[routes[i].id];
        var newRoute = [];
        for (var j = 0; j < routeDR.length; j++) {

            generateMarker(routeDR[j]);
            var pos = new google.maps.LatLng(routeDR[j].latitude, routeDR[j].longitude);
            newRoute.push(pos);

        }

        generateRoute(newRoute);

    }
}

function setStyles() {

    map.mapTypes.set('CLASSIC', styledMap0);
    map.mapTypes.set('GRAYSCALE_DEFAULT', styledMap1);
    map.mapTypes.set('BLUE_HUE', styledMap2);
    map.mapTypes.set('DARK_BLUE', styledMap3);
    map.mapTypes.set('CLEAN_CLASSIC', styledMap4);
    map.mapTypes.set('ROADS', styledMap5);
    map.setMapTypeId('GRAYSCALE_DEFAULT');

}

function init_map() {

    var myOptions = {
        zoom: 16,
        minZoom: 16,
        maxZoom: 18,
        center: center,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: false
    };

    map = new google.maps.Map(
        document.getElementById("gmap_canvas"),
        myOptions);

    var frameBorder = new google.maps.LatLngBounds(
        new google.maps.LatLng(minLatBounds, maxLonBounds),
        new google.maps.LatLng(maxLatBounds, minLonBounds)
    );

    var lastCenter = map.getCenter();

    google.maps.event.addListener(map, 'center_changed', function () {
        if (frameBorder.contains(map.getCenter())) {

            // save last position within specified bounds
            lastCenter = map.getCenter();
            return;
        }

        map.panTo(lastCenter);
    });

    populateMap();
    setStyles();

}

google.maps.event.addDomListener(window, 'load', init_map);

