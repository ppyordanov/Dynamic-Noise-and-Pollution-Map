/**
 * Created by Peter Yordanov on 25.1.2015 г..
 */

/* MARKERS ROUTES */

function addPopUp(marker, content) {


    google.maps.event.addListener(marker, 'mouseover', function (e) {
        if(disableMarkerInfoWindow){
            return;
        }
        console.log(e);
        popup.setContent(content);
        popup.open(map, marker);
    });


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
        visible: true
    });

    var styledContent = generatePopUpContent(noise, co, no2, battery, 0, null);

    addPopUp(marker, styledContent);

    var entry = {"marker": marker, "noise": noise, "no2": no2, "co": co};
    POINT_DATA.push(entry);

}

/*
dataTYpe coding

- null = data reading
- <=0 = grid tile
- >0 = route
 */
function generatePopUpContent(noise, co, no2, battery, typeData, routeData){
    var content;
    var valueType = "(avg)";
    if(typeData!=null && typeData>0){
        content = "<b>Route</b> (" + typeData + " data points" + ")<br>";
        content += "Distance: " + routeData+ " m" + "<br>";
    }
    else if(typeData<0){
        content = "<b>Grid Index: </b>" + (typeData*(-1)) + "<br>";
    }
    else if(typeData==0){
        valueType="";
        content = "<b>Data Reading</b><br>";
    }
    content += "Noise" + valueType + ": " + noise.toPrecision(3) + " dB" + progressEvaluate(noise, minNoise, maxNoise) ;
    content += "CO" + valueType + ": " + co.toPrecision(3) + " ppm" + progressEvaluate(co, minCO, maxCO);
    content += "NO2" + valueType + ": " + no2.toPrecision(3) + " ppm" + progressEvaluate(no2, minNO2, maxNO2) ;

    if(valueType==""){
        content += "Battery: " + battery + " %" + progressEvaluate(battery, minBattery, maxBattery);
    }
    var styledContent = '<div class="mapPopUp">' + content + '</div>';

    return styledContent;
}

function generateRoute(newRoute, noiseAVG, coAVG, no2AVG, distance) {

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
    var styledContent = generatePopUpContent(noiseAVG, coAVG, no2AVG, 100, dataPoints, distance, null);

    google.maps.event.addListener(route, 'mouseover', function (event) {
        if(disableRouteInfoWindow){
            return;
        }
        infowindow.setContent(styledContent);
        infowindow.setPosition(event.latLng);
        infowindow.open(map);
    });
    google.maps.event.addListener(route, 'mouseover', function (event) {
        this.set("strokeWeight", 15);
    });
    google.maps.event.addListener(route, 'mouseout', function () {
        this.set("strokeWeight", 10);
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
function retrieveDistance(loc1, loc2){
    return parseInt((google.maps.geometry.spherical.computeDistanceBetween(loc1, loc2).toFixed(2)));
}

function populateMap() {
    for (var i = 0; i < routes.length; i++) {
        var routeDR = dataReadings[routes[i].id];
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

            if(j+1<routeDR.length){
                nextIndex=j+1;
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
        var routeDATA = generateRoute(newRoute, noiseSUM/newRoute.length, coSUM/newRoute.length, no2SUM/newRoute.length, distance);
        ROUTE_DATA.push(routeDATA);
    }
}


function updateGridAggregation() {
    for (var i = 0; i < routes.length; i++) {
        var routeDR = dataReadings[routes[i].id];
        for (var j = 0; j < routeDR.length; j++) {
            var dr = routeDR[j];
            var pos = new google.maps.LatLng(dr.latitude, dr.longitude);
            aggregateGrid(pos, dr);
        }
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