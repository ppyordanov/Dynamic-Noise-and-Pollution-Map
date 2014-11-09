var minLatBounds = 55.870056;
var maxLatBounds = 55.875209;
var minLonBounds = -4.278797;
var maxLonBounds = -4.297637;
var centerLat = 55.872912;
var centerLon = -4.289657;
var center = new google.maps.LatLng(centerLat,centerLon);

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
var image = '/resources/sck_logo4.png';
var marker;
var content;
var styledContent;
var popup = new google.maps.InfoWindow({});

var styledMap = new google.maps.StyledMapType(styles[0], {name: "Styled Map"});

var progress;
var progressContent;

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


function addPopUp(marker, content){


    google.maps.event.addListener(marker, 'mouseover', function (e) {
        console.log(e);
        popup.setContent(content);
        popup.open(map, marker);
    });



}

function generateMarker(dataReading){

    id = dataReading.id;
    noise = parseFloat(dataReading.noise);
    co = parseFloat(dataReading.co);
    no2 = parseFloat(dataReading.no2);
    //alert(dataReadings[i].timestamp);
    battery = parseFloat(dataReading.battery);
    latitude = parseFloat(dataReading.latitude);
    longitude = parseFloat(dataReading.longitude);
    position = new google.maps.LatLng(latitude, longitude);


    marker = new google.maps.Marker({
        position: position,
        map: map,
        //animation: google.maps.Animation.DROP,
        icon: image
    });

    content = "Noise: " + noise + progressEvaluate(noise, maxNoise) + "CO: " + co + progressEvaluate(co, maxCO) + "NO2: " + no2 + progressEvaluate(no2, maxNO2) + "Battery: " + battery + progressEvaluate(battery, maxBattery);
    styledContent = '<div class="mapPopUp">' + content + '</div>';

    addPopUp(marker, styledContent);

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

            // save last position within specivied bounds
            lastCenter = map.getCenter();
            return;
        }

        map.panTo(lastCenter);
    });


    for (var i = 0; i < dataReadings.length/50; i++) {

        generateMarker(dataReadings[i]);

    }

    map.mapTypes.set('map_style', styledMap);
    map.setMapTypeId('map_style');

}

google.maps.event.addDomListener(window, 'load', init_map);

