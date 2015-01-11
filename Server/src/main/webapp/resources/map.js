//MEASURE CLIENT-SIDE LOADING PERFORMANCE
var loadingStart = Date.now();

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

var maxNoise = null;
var minNoise = null;
var rangeNoise = null;

var maxCO = null;
var minCO = null;
var rangeCO = null;

var maxNO2 = null;
var minNO2 = null;
var rangeNO2 = null;

var minBattery = 0;
var maxBattery = 100;

var locationARR = [];

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

$(document).ready(function () {

    logPageLoadingTime();

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
    $('#style6').click(function () {
        map.setMapTypeId(styledMap6);
    });

});

function logPageLoadingTime(){
    var loadingComplete = Date.now();
    var userLoadTime = loadingComplete - performance.timing.navigationStart;
    console.log("Page Loading Time: " + userLoadTime + " ms");
    console.log(locationARR);
}

function randomPosGen(lowLatBounds, highLatBounds, lowLonBounds, highLonBounds) {

    var center;

    var multiplier = 10000000;
    var lat = Math.random() * ((highLatBounds - lowLatBounds) * multiplier) + lowLatBounds * multiplier;
    var lon = Math.random() * ((highLonBounds - lowLonBounds) * multiplier) + lowLonBounds * multiplier;

    center = new google.maps.LatLng(lat / multiplier, lon / multiplier);
    return center;

}

function progressEvaluate(value, min, max) {

    var progress = rangePercentage(value, min, max);
    var value = progress;
    /*
    if(min==0 && max==100){
        value = 100-progress;
    }
    var barRGB = convertToRGB(value);
    */
    //alert(value + " " + range + " " + progress);
    //var progressContent = '<div class="progress"><div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style="background-color:' + barRGB + '; width: ' + progress + '%"><span class="sr-only"></span></div></div>';
    var progressContent = '<div class="progress"><div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style="width: ' + progress + '%"><span class="sr-only"></span></div></div>';
    return progressContent;
}

function rangePercentage(value, min, max) {

    return (value - min) / (max - min) * 100;

}

function calculateAverage(sum, count){
    return sum/count;
};

function addPopUp(marker, content) {


    google.maps.event.addListener(marker, 'mouseover', function (e) {
        console.log(e);
        popup.setContent(content);
        popup.open(map, marker);
    });


}

function displayHeatMap(){
    var points = new google.maps.MVCArray(locationARR);
    //alert(points.length);
    var heatmap = new google.maps.visualization.HeatmapLayer({
        data: points
    });

    heatmap.setMap(map);
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

function displayGrid() {

    var northWestStart = new google.maps.LatLng(maxLatBounds, minLonBounds);
    var heightTilesN = 1000;
    var widthTilesN = 1000;
    var tileSizeMeters = 50;

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

            var tileDATA = {"tile": tile, "noiseAVG": {"sum": 0, "count": 0}, "coAVG": {"sum": 0, "count": 0}, "no2AVG": {"sum": 0, "count": 0}};

            GRID.push(tileDATA);
            bindWindow(tile, GRID.length - 1);

            var newEast = google.maps.geometry.spherical.computeOffset(newEast, tileSizeMeters, eastAngleDegrees);
            var newSouth = google.maps.geometry.spherical.computeOffset(newSouth, tileSizeMeters, eastAngleDegrees);
        }

    }
}

function bindWindow(rectangle, num) {
    google.maps.event.addListener(rectangle, 'click', function (event) {
        var location = new google.maps.LatLng(55.876096, -4.285301);
        infowindow.setContent("Tile:  " + num + " DATA:" + GRID[num]["tile"].bounds.getNorthEast().lat() + " GRID " + getGridLocation(location));
        infowindow.setPosition(event.latLng);

        /*
         var marker = new google.maps.Marker({
         position: GRID[num]["tile"].bounds.getNorthEast(),
         map: map
         });
         marker = new google.maps.Marker({
         position: GRID[num]["tile"].bounds.getSouthWest(),
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
        if (GRID[i]["tile"].bounds.contains(location)) {
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

    content = "Noise: " + noise + progressEvaluate(noise, minNoise, maxNoise) + "CO: " + co + progressEvaluate(co, minCO, maxCO) + "NO2: " + no2 + progressEvaluate(no2, minNO2, maxNO2) + "Battery: " + battery + progressEvaluate(battery, minBattery, maxBattery);
    styledContent = '<div class="mapPopUp">' + content + '</div>';

    addPopUp(marker, styledContent);

}

function generateRoute(newRoute) {

    var route = new google.maps.Polyline({
        path: newRoute,
        strokeColor: "#2196f3",
        strokeOpacity: 0.5,
        strokeWeight: 10,
        fillOpacity:0.0
    });

    /*
    google.maps.event.addListener(route, 'mouseover', function() {
        this.set("strokeWeight",15);
    });
    google.maps.event.addListener(route, 'mouseout', function() {
        this.set("strokeWeight",10);
    });
    */


    route.setMap(map);

}

function populateMap() {
    for (var i = 0; i < routes.length; i++) {
        var routeDR = dataReadings[routes[i].id];
        var newRoute = [];
        for (var j = 0; j < routeDR.length; j++) {

            var dr = routeDR[j];

            //updateValueRange(dr);
            generateMarker(dr);
            var pos = new google.maps.LatLng(routeDR[j].latitude, routeDR[j].longitude);
            newRoute.push(pos);
            locationARR.push(pos);
            aggregateGrid(pos, dr);

        }

        generateRoute(newRoute);

    }
}

function identifyValueRange() {

    var noiseARR = [];
    var coARR = [];
    var no2ARR = [];

    for (var i = 0; i < routes.length; i++) {
        var routeDR = dataReadings[routes[i].id];
        for (var j = 0; j < routeDR.length; j++) {

            var dr = routeDR[j];

            noiseARR.push(dr.noise);
            coARR.push(dr.co);
            no2ARR.push(dr.no2);

        }
    }

    maxNoise = Math.max.apply(null, noiseARR);
    minNoise = Math.min.apply(null, noiseARR);
    rangeNoise = maxNoise - minNoise;

    maxCO = Math.max.apply(null, coARR);
    minCO = Math.min.apply(null, coARR);
    rangeCO = maxCO - minCO;

    maxNO2 = Math.max.apply(null, no2ARR);
    minNO2 = Math.min.apply(null, no2ARR);
    rangeNO2 = maxNO2 - minNO2;

    //DEBUG
    //alert(maxNO2 + " NO2 " + minNO2 + " " + maxCO + " CO " + minCO + " " + maxNoise + " Noise " + minNoise);
}

function updateValueRange(dr) {

    var localMinN = 0;
    var localMaxN = 0;

}

function aggregateGrid(location, dataReading) {

    var gridIndex = getGridLocation(location);

    //if such grid tile exists, update information and aggregate data
    if (GRID[gridIndex]) {

        GRID[gridIndex]["noiseAVG"]["sum"]+=parseFloat(dataReading.noise);
        GRID[gridIndex]["noiseAVG"]["count"]++;
        var noiseSum = GRID[gridIndex]["noiseAVG"]["sum"];
        var noiseCount = GRID[gridIndex]["noiseAVG"]["count"];
        var noiseAverage = calculateAverage(noiseSum,noiseCount);
        var noisePercentage = rangePercentage(noiseAverage, minNoise, maxNoise);

        GRID[gridIndex]["coAVG"]["sum"]+=parseFloat(dataReading.co);
        GRID[gridIndex]["coAVG"]["count"]++;
        var coSum = GRID[gridIndex]["coAVG"]["sum"];
        var coCount = GRID[gridIndex]["coAVG"]["count"];
        var coAverage = coSum/coCount;
        var coPercentage = rangePercentage(coAverage, minCO, maxCO);

        GRID[gridIndex]["no2AVG"]["sum"]+=parseFloat(dataReading.no2);
        GRID[gridIndex]["no2AVG"]["count"]++;
        var no2Sum = GRID[gridIndex]["no2AVG"]["sum"];
        var no2Count = GRID[gridIndex]["no2AVG"]["count"];
        var no2Average = no2Sum/no2Count;
        var no2Percentage = rangePercentage(no2Average, minNO2, maxNO2);

        //TESTING
        //alert("Noise AVG grid tile: " + noiseAverage + " MIN: " + minNoise + " MAX: " + maxNoise + " noise avg sum " + noiseSum + " noise count" + noiseCount);
        //alert(coPercentage);
        //alert(coPercentage);
        GRID[gridIndex]["tile"].set("fillColor", convertToRGB(no2Percentage));
        GRID[gridIndex]["tile"].set("fillOpacity", 0.5);
    }


}


function setStyles() {

    map.mapTypes.set('CLASSIC', styledMap0);
    map.mapTypes.set('GRAYSCALE_DEFAULT', styledMap1);
    map.mapTypes.set('BLUE_HUE', styledMap2);
    map.mapTypes.set('DARK_BLUE', styledMap3);
    map.mapTypes.set('CLEAN_CLASSIC', styledMap4);
    map.mapTypes.set('ROADS', styledMap5);
    //map.mapTypes.set('SATELLITE', styledMap6);
    map.setMapTypeId('GRAYSCALE_DEFAULT');

}

function init_map() {

    var myOptions = {
        zoom: 16,
        minZoom: 15,
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
    identifyValueRange();
    //displayGrid();
    populateMap();
    //displayHeatMap();
}

google.maps.event.addDomListener(window, 'load', init_map);

