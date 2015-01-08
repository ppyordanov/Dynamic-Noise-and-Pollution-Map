var minLatBounds = 55.870056;
var maxLatBounds = 55.876209;
var minLonBounds = -4.297637;
var maxLonBounds = -4.282997;

/* testing purposes
 var minLatBounds = 55.0;
 var maxLatBounds = 56.875209;
 var minLonBounds = -3.278797;
 var maxLonBounds = -5.297637;
 */

var centerLat = 55.872912;
var centerLon = -4.289657;
var center = new google.maps.LatLng(centerLat, centerLon);

var GRID = [];
var infowindow = new google.maps.InfoWindow();

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
    var S = Math.abs(n - 50) / 50;
    var H = Math.floor((100 - n) * 120 / 100);
}

var cols = ["gray"];
for (var i = 1; i <= 100; i++) {
    cols[i] = convertToRGB(i);
}
//var cols=["red","green","yellow","orange","gray"]
console.log(cols);

function drawGrid() {

    var northWestStart = new google.maps.LatLng(maxLatBounds, minLonBounds);
    var heightTilesN = 100;
    var widthTilesN = 100;
    var tileSizeMeters = 100;

    var northAngleDegrees = 0;
    var southAngleDegrees = 180;
    var eastAngleDegrees = 90;
    var westAngleDegrees = -90;

    var east = google.maps.geometry.spherical.computeOffset(northWestStart, tileSizeMeters, eastAngleDegrees);
    var south = google.maps.geometry.spherical.computeOffset(northWestStart, tileSizeMeters, southAngleDegrees);

    for (var heightTiles = 0; heightTiles < heightTilesN; heightTiles++) {

        newEast = google.maps.geometry.spherical.computeOffset(east, heightTiles * tileSizeMeters, southAngleDegrees);
        newSouth = google.maps.geometry.spherical.computeOffset(south, heightTiles * tileSizeMeters, southAngleDegrees);

        if (newSouth.lat() < minLatBounds) {
            break;
        }

        for (var widthTiles = 0; widthTiles < widthTilesN; widthTiles++) {

            if (newSouth.lng() > maxLonBounds) {
                //alert(newSouth.lat() + " " + newSouth.lng());
                break;
            }
            var tile = new google.maps.Rectangle();
            //var FILL = cols[Math.floor(Math.random()*cols.length)];
            var FILL = "gray";
            var fillO = 0.5;
            var strokeO = 1;
            if (FILL == "gray") {
                fillO = 0;
                //strokeO =0;
            }

            var tileOptions = {
                strokeColor: "#FF0000",
                strokeOpacity: strokeO,
                strokeWeight: 0.35,
                fillColor: FILL,
                fillOpacity: fillO,
                map: map,
                bounds: new google.maps.LatLngBounds(newSouth, newEast)
            };
            tile.setOptions(tileOptions);
            //tile.set("fillColor", "gray");
            GRID.push(tile);
            bindWindow(tile, GRID.length - 1);

            var newEast = google.maps.geometry.spherical.computeOffset(newEast, tileSizeMeters, eastAngleDegrees);
            var newSouth = google.maps.geometry.spherical.computeOffset(newSouth, tileSizeMeters, eastAngleDegrees);
        }

    }
}

function bindWindow(rectangle, num) {
    google.maps.event.addListener(rectangle, 'click', function (event) {
        var location = new google.maps.LatLng(55.876096, -4.285301);
        infowindow.setContent("Tile:  " + num + " DATA:" + GRID[num].bounds.getNorthEast().lat() + " GRID " + getGridLocation(location));
        infowindow.setPosition(event.latLng);

        /*
         var marker = new google.maps.Marker({
         position: GRID[num].bounds.getNorthEast(),
         map: map
         });
         marker = new google.maps.Marker({
         position: GRID[num].bounds.getSouthWest(),
         map: map
         });
         */
        infowindow.open(map);
    });
}

function getGridLocation(location) {

    //var location = new google.maps.LatLng(latitude,longitude);
    var gridLocation = null;
    for (var i = 0; i < GRID.length; i++) {
        if (GRID[i].bounds.contains(location)) {
            gridLocation = i;
        }
    }

    return gridLocation;
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

            var dr = routeDR[j];
            generateMarker(dr);
            var pos = new google.maps.LatLng(routeDR[j].latitude, routeDR[j].longitude);
            newRoute.push(pos);

            aggregateGrid(pos, dr);

        }

        generateRoute(newRoute);

    }
}

function aggregateGrid(location, dataReading) {

    var gridIndex = getGridLocation(location);
    if (GRID[gridIndex]) {
        GRID[gridIndex].set("fillColor", convertToRGB(dataReading.noise - 20));
        GRID[gridIndex].set("fillOpacity", 0.5);
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
        disableDefaultUI: false,
        mapTypeControl: false,
        panControl: true,
        panControlOptions: {
            position: google.maps.ControlPosition.TOP_LEFT
        },
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.LARGE,
            position: google.maps.ControlPosition.TOP_LEFT
        },

        scaleControl: true,
        streetViewControl: true

    };

    map = new google.maps.Map(
        document.getElementById("gmap_canvas"),
        myOptions);

    var frameBorder = new google.maps.LatLngBounds(
        new google.maps.LatLng(minLatBounds, minLonBounds),
        new google.maps.LatLng(maxLatBounds, maxLonBounds)
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

    setStyles();
    drawGrid();
    populateMap();

}

google.maps.event.addDomListener(window, 'load', init_map);

