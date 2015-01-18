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
var origin = new google.maps.LatLng(maxLatBounds, minLonBounds);

var GRID = [];
var HEAT_MAP;
var POINT_DATA = [];
var POINT_VISUALIZATION = [];
var ROUTE_DATA = [];
var locationARR = [];
var infowindow = new google.maps.InfoWindow();

var maxNoise = null;
var minNoise = null;
var minRangeNoise = 0;
var maxRangeNoise = Number.MAX_SAFE_INTEGER;

var maxCO = null;
var minCO = null;
var minRangeCO = 0;
var maxRangeCO = Number.MAX_SAFE_INTEGER;

var maxNO2 = null;
var minNO2 = null;
var minRangeNO2 = 0;
var maxRangeNO2 = Number.MAX_SAFE_INTEGER;

var minBattery = 0;
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
var image = '/resources/images/sck_logo4.png';
var marker;
var content;
var styledContent;
var popup = new google.maps.InfoWindow({});

$(document).ready(function () {

    logPageLoadingTime();

    //hide collapsed menu on click
    $('.nav a').on('click', function () {
        $(".navbar-toggle").click();
    });

    /*
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

     */


    $('#style_apply').click(function () {
        var selected = $("input:radio[name='style']:checked").val();
        if (selected == 'SATELLITE') {
            map.setMapTypeId(styledMap6);
        }
        else {
            map.setMapTypeId(selected);
        }

        /*
         $(".alert").removeClass("in").show();
         $(".alert").delay(200).addClass("in").fadeOut(1500);
         */
    });

    $('#mode_apply').click(function () {
        var selected = retrieveModes();
        renderMap(selected);
    });


});


function retrieveModes() {
    var selectedModes = [];
    $('#modes_options :checkbox').each(function () {
        var value = (this.checked ? true : false);
        //alert(value);
        selectedModes.push(value);
    });
    return selectedModes;
}

function renderMap(modes) {

    toggleMarkers(modes[0]);
    toggleRoutes(modes[1]);
    toggleHeatMap(modes[2]);
    toggleGrid(modes[3]);
    togglePointVis(modes[4]);

}


function logPageLoadingTime() {
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

function calculateAverage(sum, count) {
    return sum / count;
};

function addPopUp(marker, content) {


    google.maps.event.addListener(marker, 'mouseover', function (e) {
        console.log(e);
        popup.setContent(content);
        popup.open(map, marker);
    });


}

function generateHeatMap() {
    var points = new google.maps.MVCArray(locationARR);
    //alert(points.length);
    HEAT_MAP = new google.maps.visualization.HeatmapLayer({
        data: points,
        radius: 50,
        map: null
    });

    //HEAT_MAP.setMap(map);
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

function generateGrid() {

    var northWestStart = origin;
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
                bounds: new google.maps.LatLngBounds(newSouth, newEast),
                visible: false
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
    var check = 0;

    /*
     var sw = new google.maps.LatLng(origin.lat(), location.lng());
     var ne = new google.maps.LatLng(location.lat(), origin.lng());

     var dist = google.maps.geometry.spherical.computeDistanceBetween(origin,ne);
     var dist2 = google.maps.geometry.spherical.computeDistanceBetween(location, sw);
     alert((dist+dist2)/100);
     */

    for (var i = 0; i < GRID.length; i++) {
        if (GRID[i]["tile"].bounds.contains(location)) {
            gridLocation = i;
        }
    }

    return gridLocation;
}

function generateMarker(dataReading, visible, map) {

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
        animation: google.maps.Animation.DROP,
        icon: pinIcon,
        visible: visible
    });

    content = "Noise: " + noise + progressEvaluate(noise, minNoise, maxNoise) + "CO: " + co + progressEvaluate(co, minCO, maxCO) + "NO2: " + no2 + progressEvaluate(no2, minNO2, maxNO2) + "Battery: " + battery + progressEvaluate(battery, minBattery, maxBattery);
    styledContent = '<div class="mapPopUp">' + content + '</div>';

    addPopUp(marker, styledContent);

    var entry = {"marker": marker, "noise": noise, "no2": no2, "co": co};
    POINT_DATA.push(entry);

}

function generateRoute(newRoute, noiseSUM, coSUM, no2SUM) {

    var route = new google.maps.Polyline({
        path: newRoute,
        strokeColor: "#2196f3",
        strokeOpacity: 0.5,
        strokeWeight: 10,
        fillOpacity: 0.0,
        map: map,
        visible: false
    });

    var dataPoints = newRoute.length;
    var routeDATA = {"route": route, "noiseAVG": noiseSUM / dataPoints, "coAVG": coSUM / dataPoints, "no2AVG": no2SUM / dataPoints};

    /*
     google.maps.event.addListener(route, 'click', function (event) {
     infowindow.setContent("Route: " + newRoute.length + " data points");
     infowindow.setPosition(event.latLng);
     infowindow.open(map);
     });
     google.maps.event.addListener(route, 'mouseover', function (event) {
     this.set("strokeWeight", 15);
     });
     google.maps.event.addListener(route, 'mouseout', function () {
     this.set("strokeWeight", 10);
     });
     */

    ROUTE_DATA.push(routeDATA);

}

function populateMap() {
    for (var i = 0; i < routes.length; i++) {
        var routeDR = dataReadings[routes[i].id];
        var newRoute = [];

        var noiseSUM = null;
        var coSUM = null;
        var no2SUM = null;

        for (var j = 0; j < routeDR.length; j++) {

            var dr = routeDR[j];

            noiseSUM += parseFloat(dr.noise);
            coSUM += parseFloat(dr.co);
            no2SUM += parseFloat(dr.no2);


            //updateValueRange(dr);

            var visible = false;
            generateMarker(dr, visible, map);
            generatePointVis(dr, visible, map, i);
            var pos = new google.maps.LatLng(dr.latitude, dr.longitude);
            newRoute.push(pos);
            locationARR.push(pos);
            aggregateGrid(pos, dr);

        }


        generateRoute(newRoute, noiseSUM, coSUM, no2SUM);

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

        GRID[gridIndex]["noiseAVG"]["sum"] += parseFloat(dataReading.noise);
        GRID[gridIndex]["noiseAVG"]["count"]++;
        var noiseSum = GRID[gridIndex]["noiseAVG"]["sum"];
        var noiseCount = GRID[gridIndex]["noiseAVG"]["count"];
        var noiseAverage = calculateAverage(noiseSum, noiseCount);
        var noisePercentage = rangePercentage(noiseAverage, minNoise, maxNoise);

        GRID[gridIndex]["coAVG"]["sum"] += parseFloat(dataReading.co);
        GRID[gridIndex]["coAVG"]["count"]++;
        var coSum = GRID[gridIndex]["coAVG"]["sum"];
        var coCount = GRID[gridIndex]["coAVG"]["count"];
        var coAverage = coSum / coCount;
        var coPercentage = rangePercentage(coAverage, minCO, maxCO);

        GRID[gridIndex]["no2AVG"]["sum"] += parseFloat(dataReading.no2);
        GRID[gridIndex]["no2AVG"]["count"]++;
        var no2Sum = GRID[gridIndex]["no2AVG"]["sum"];
        var no2Count = GRID[gridIndex]["no2AVG"]["count"];
        var no2Average = no2Sum / no2Count;
        var no2Percentage = rangePercentage(no2Average, minNO2, maxNO2);

        //TESTING
        //alert("Noise AVG grid tile: " + noiseAverage + " MIN: " + minNoise + " MAX: " + maxNoise + " noise avg sum " + noiseSum + " noise count" + noiseCount);
        //alert(coPercentage);
        //alert(coPercentage);
        GRID[gridIndex]["tile"].set("fillColor", convertToRGB(no2Percentage));
        GRID[gridIndex]["tile"].set("fillOpacity", 0.5);
    }


}

//forEach better in terms of performance changed from a conventional for loop
function toggleGrid(value) {
    GRID.forEach(function (entry) {
        entry["tile"].set("visible", value);
    });
}

function toggleHeatMap(value) {
    //HEAT_MAP.setMap(HEAT_MAP.getMap() ? null : map);
    if (value) {
        HEAT_MAP.setMap(map);
    }
    else {
        HEAT_MAP.setMap(null);
    }
}

function toggleMarkers(value) {
    POINT_DATA.forEach(function (entry) {
        entry["marker"].set("visible", value);
    });
}

function toggleRoutes(value) {
    ROUTE_DATA.forEach(function (entry) {
        entry["route"].set("visible", value);
    });
}

function togglePointVis(value) {
    POINT_VISUALIZATION.forEach(function (entry) {
        entry["circle"].set("visible", value);
    });
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
    generateGrid();
    //generatePointVis();
    populateMap();
    generateHeatMap();


    //CONTROLS

    $("#noise").slider({
        orientation: "horizontal",
        range: true,
        min: Math.floor(minNoise),
        max: Math.floor(maxNoise),
        slide: function (event, ui) {
            $("#noise_level").val(ui.values[ 0 ] + " - " + ui.values[ 1 ]);
        },

        change: function (event, ui) {
            minRangeNoise = ui.values[0];
            maxRangeNoise = ui.values[1];
            //generateGrid();
            renderData();
        },

        stop: function (event, ui) {
            minRangeNoise = ui.values[0];
            maxRangeNoise = ui.values[1];
        }
    });

    /*
     $( "#co" ).slider({
     orientation: "horizontal",
     range: true,
     min:Math.floor(minCO),
     max:Math.floor(maxCO),
     slide: function( event, ui ) {
     $( "#co_level" ).val(ui.values[ 0 ] + " - " + ui.values[ 1 ] );
     }
     });

     $( "#no2" ).slider({
     orientation: "horizontal",
     range: true,
     min:Math.floor(minNO2),
     max:Math.floor(maxNO2),
     slide: function( event, ui ) {
     $( "#no2_level" ).val(ui.values[ 0 ] + " - " + ui.values[ 1 ] );
     }
     });

     */
    $('#value_apply').click(function () {

        /*
         //generateGrid();
         toggleMarkers(false);
         POINT_DATA=[];
         ROUTE_DATA=[];
         POINT_VISUALIZATION = [];
         locationARR=[];

         populateMap();
         generateHeatMap();

         */
    });
}

function renderData() {

    locationARR = [];

    for (var index = POINT_DATA.length - 1; index >= 0; index--) {

        var pDataEntry = POINT_DATA[index];
        var pVisEntry = POINT_VISUALIZATION[index];

        if (pDataEntry["noise"] >= minRangeNoise && pDataEntry["noise"] <= maxRangeNoise) {
            pDataEntry["marker"].set("map", map);
            pVisEntry["circle"].set("map", map);
            locationARR.push(pDataEntry["marker"].getPosition());
        }
        else {
            pDataEntry["marker"].set("map", null);
            pVisEntry["circle"].set("map", null);
        }
    }

    /*
     POINT_DATA.forEach(function (entry) {
     if(entry["noise"]>=minRangeNoise && entry["noise"]<=maxRangeNoise){
     entry["marker"].set("map", map);
     locationARR.push(entry["marker"].position);
     }
     else{
     entry["marker"].set("map", null);
     }

     });

     POINT_VISUALIZATION.forEach(function (entry) {
     if(entry["noise"]>=minRangeNoise && entry["noise"]<=maxRangeNoise){
     entry["circle"].set("map", map);
     }
     else{
     entry["circle"].set("map", null);
     }
     });

     */

    ROUTE_DATA.forEach(function (entry) {
        if (entry["noiseAVG"] >= minRangeNoise && entry["noiseAVG"] <= maxRangeNoise) {
            entry["route"].set("map", map);
        }
        else {
            entry["route"].set("map", null);
        }
    });

    alert(locationARR.length);
    HEAT_MAP.setData(locationARR);

}

function generatePointVis(dataReading, visible, map, num) {

    /*
     var labelText = '<div>Noise: ' + dataReading.noise + '</div>';
     var myOptions = {
     content: labelText,
     boxStyle: {
     background: '#000',
     textAlign: "center",
     fontSize: "8pt"
     },
     position:position,
     closeBoxURL: ""
     };
     var label = new InfoBox(myOptions);
     label.setMap(map);
     */

    var noisePercentage = rangePercentage(dataReading.noise, minNoise, maxNoise);
    var pollutionOptions = {
        //strokeColor: '#FF0000',
        //strokeOpacity: 0.8,
        strokeWeight: 0,
        fillColor: '#FF0000',
        fillOpacity: noisePercentage / 100,
        center: position,
        map: map,
        visible: visible,
        radius: noisePercentage
    };

    var circle = new google.maps.Circle(pollutionOptions);
    var element = {"circle": circle, "noise": dataReading.noise, "co": dataReading.co, "no2": dataReading.no2};

    //bindWindow(circle, num);
    POINT_VISUALIZATION.push(element);
}

google.maps.event.addDomListener(window, 'load', init_map);

