/**
 * Created by Peter Yordanov on 25.1.2015 г..
 */

/* MARKERS ROUTES */

var mouseover = "mouseover";
var mouseout = "mouseout";
var click = "click";

var pinIcon = {
    url: image,
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(15, 15),
    scaledSize: new google.maps.Size(30, 30)
};

function addPopUp(marker, content, trigger) {


    google.maps.event.addListener(marker, trigger, function (e) {
        if (disableMarkerInfoWindow) {
            return;
        }
        console.log(e);
        popup.setContent(content);
        popup.open(map, marker);
    });


}

function generateRouteMarkers(source, destination, pointArray) {
    //alert(source + " " + destination);
    var srcLoc = pointArray[0];
    var destLoc = pointArray[pointArray.length - 1];

    var sourceMarker = new google.maps.Marker({
        position: srcLoc,
        map: map,
        animation: google.maps.Animation.DROP,
        icon: pinIcon,
        visible: true
    });
    var destinationMarker = new google.maps.Marker({
        position: destLoc,
        map: map,
        animation: google.maps.Animation.DROP,
        icon: pinIcon,
        visible: true
    });

    var sourceContent = '<div class="mapPopUp">' + "<b>Starting Point:</b> " + source + "<br>" + "<img class='streetViewImage' src='https://maps.googleapis.com/maps/api/streetview?size=250x150&location=" + srcLoc.lat() + "," + srcLoc.lng() + "&heading=34&pitch=10&fov=120'>"; //+"<br>" + "<b>Latitude: </b>" + srcLoc.lat() + "<br><b>Longitude: </b>" + srcLoc.lng() + "</div>";
    var destinationContent = '<div class="mapPopUp">' + "<b>Destination:</b> " + destination + "<br>" + "<img class='streetViewImage' src='https://maps.googleapis.com/maps/api/streetview?size=250x150&location=" + destLoc.lat() + "," + destLoc.lng() + "&heading=34&pitch=10&fov=120'>"; //+"<br>" + "<b>Latitude: </b>" + destLoc.lat() + "<br><b>Longitude: </b>" + destLoc.lng() + "</div>";

    addPopUp(sourceMarker, sourceContent, click);
    addPopUp(destinationMarker, destinationContent, click);

    USER_ROUTE_DATA.push({"data": {"route": sourceMarker}, "score": null});
    USER_ROUTE_DATA.push({"data": {"route": destinationMarker}, "score": null});
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
    timestamp = dataReading.timestamp;

    position = new google.maps.LatLng(latitude, longitude);

    marker = new google.maps.Marker({
        position: position,
        map: map,
        animation: google.maps.Animation.DROP,
        icon: pinIcon,
        visible: true
    });

    var styledContent = generatePopUpContent(noise, co, no2, battery, 0, null, null, null, null, null);

    addPopUp(marker, styledContent, mouseover);

    var entry = {"marker": marker, "noise": noise, "no2": no2, "co": co, "time": timestamp};
    POINT_DATA.push(entry);

}

/*
 dataTYpe coding

 - null = data reading
 - <=0 = grid tile
 - >0 = route
 */
function generatePopUpContent(noise, co, no2, battery, typeData, routeDistance, routeDuration, score, id, dataCount) {
    var content;
    var valueType = "(avg)";
    var overall = "";
    if (typeData != null && typeData > 0) {
        content = "<b>Route " + id + "</b> (" + typeData + " data points" + ")<br>";
        if (variableSwitch.distance) {
            content += "Distance: " + routeDistance + " m" + "<br>";
        }
        if (routeDuration) {
            if (variableSwitch.duration) {
                content += routeDuration;
            }
            overall = "<b>Overall Pollution Index:</b> " + rangePercentage(score, 0, maximumOverallPollutionIndex).toPrecision(3) + "%<br>" + progressEvaluate(score, 0, maximumOverallPollutionIndex);
        }
        else {
            content += calculateTime((routeDistance * baseWalkingTimePerMeter));
        }
    }
    else if (typeData < 0) {
        content = "<b>Grid Index: </b>" + (typeData * (-1)) + "<br>";
        content += "Data Readings: " + dataCount + "<br>";
    }
    else if (typeData == 0) {
        valueType = "";
        content = "<b>Data Reading</b><br>";
    }

    if (variableSwitch.noise) {
        content += "Noise" + valueType + ": " + noise.toPrecision(3) + " dB" + progressEvaluate(noise, minNoise, maxNoise);
    }
    if (variableSwitch.co) {
        content += "CO" + valueType + ": " + co.toPrecision(3) + " ppm" + progressEvaluate(co, minCO, maxCO);
    }
    if (variableSwitch.no2) {
        content += "NO2" + valueType + ": " + no2.toPrecision(3) + " ppm" + progressEvaluate(no2, minNO2, maxNO2);
    }

    if (valueType == "") {
        content += "Battery: " + battery + " %" + progressEvaluate(battery, minBattery, maxBattery);
    }
    content += overall;
    var styledContent = '<div class="mapPopUp">' + content + '</div>';

    return styledContent;
}

function generateRoute(newRoute, noiseAVG, coAVG, no2AVG, distance, duration, score, id) {

    var route = new google.maps.Polyline({
        path: newRoute,
        strokeColor: "#2196f3",
        strokeOpacity: 0.5,
        strokeWeight: 10,
        fillOpacity: 0.0,
        map: map,
        visible: true
    });

    var dataPoints = newRoute.length;
    var routeDATA = {"route": route, "noiseAVG": noiseAVG, "coAVG": coAVG, "no2AVG": no2AVG};
    var styledContent = generatePopUpContent(noiseAVG, coAVG, no2AVG, null, dataPoints, distance, duration, score, id, null);

    google.maps.event.addListener(route, click, function (event) {
        if (disableRouteInfoWindow) {
            return;
        }
        infowindow.setContent(styledContent);
        infowindow.setPosition(event.latLng);
        infowindow.open(map);
    });
    google.maps.event.addListener(route, mouseover, function (event) {
        this.set("strokeWeight", this.get("strokeWeight") + 5);
    });
    google.maps.event.addListener(route, mouseout, function () {
        this.set("strokeWeight", this.get("strokeWeight") - 5);
    });


    return routeDATA;
}

function progressEvaluate(value, min, max) {

    var progress = rangePercentage(value, min, max);
    var value = progress;
    var progressContent = '<div class="progress"><div class="progress-bar progress-bar-striped active" role="progressbar" style="width: ' + progress + '%"><span class="sr-only"></span></div></div>';
    return progressContent;
}

//distance in meters
function retrieveDistance(loc1, loc2) {
    return parseInt((google.maps.geometry.spherical.computeDistanceBetween(loc1, loc2).toFixed(2)));
}

function populateMap() {
    for (var i = 0; i < routes.length; i++) {
        var routeDR = dataReadings[routes[i].id];
        if (routeDR) {
            var newRoute = [];

            var noiseSUM = null;
            var coSUM = null;
            var no2SUM = null;

            //distance in meters
            var distance = 0;
            var nextIndex = 0;
            for (var j = 0; j < routeDR.length; j++) {

                var dr = routeDR[j];

                noiseSUM += dr.noise;
                coSUM += dr.co;
                no2SUM += dr.no2;


                //updateValueRange(dr);

                if (j + 1 < routeDR.length) {
                    nextIndex = j + 1;
                }
                var visible = false;
                generateMarker(dr, visible, map);
                generatePointVis(dr, visible, map, i);
                var nextPos = new google.maps.LatLng(routeDR[nextIndex].latitude, routeDR[nextIndex].longitude);
                var pos = new google.maps.LatLng(dr.latitude, dr.longitude);
                newRoute.push(pos);
                locationARR.push(pos);
                aggregateGrid(pos, dr);

                //distance
                distance += retrieveDistance(pos, nextPos);

            }

            //alert(distance);
            var routeDATA = generateRoute(newRoute, noiseSUM / newRoute.length, coSUM / newRoute.length, no2SUM / newRoute.length, distance, null, null, i + 1); //routes[i].id);
            ROUTE_DATA.push(routeDATA);
        }
    }
}


function updateGridAggregation() {
    for (var i = 0; i < routes.length; i++) {
        var routeDR = dataReadings[routes[i].id];
        if (routeDR) {
            for (var j = 0; j < routeDR.length; j++) {
                var dr = routeDR[j];
                var pos = new google.maps.LatLng(dr.latitude, dr.longitude);
                aggregateGrid(pos, dr);
            }
        }
    }
}

function identifyValueRange() {

    var noiseARR = [];
    var coARR = [];
    var no2ARR = [];
    var timeARR = [];

    for (var i = 0; i < routes.length; i++) {
        var routeDR = dataReadings[routes[i].id];
        if (routeDR) {
            for (var j = 0; j < routeDR.length; j++) {

                var dr = routeDR[j];

                noiseARR.push(dr.noise);
                coARR.push(dr.co);
                no2ARR.push(dr.no2);
                timeARR.push(dr.timestamp);
                //alert(timestamp);

            }
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
    var gon = [new Date(2000, 1, 20), new Date(2011, 1, 20), new Date(2015, 3, 20)];
    mostRecentTime = new Date(Math.max.apply(null, gon));
    oldestTime = new Date(Math.min.apply(null, gon));

    //alert(mostRecentTime + " " + oldestTime);

    //DEBUG
    //alert(maxNO2 + " NO2 " + minNO2 + " " + maxCO + " CO " + minCO + " " + maxNoise + " Noise " + minNoise);
}

function updateValueRange(dr) {

    var localMinN = 0;
    var localMaxN = 0;

}