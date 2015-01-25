/**
 * Created by Peter Yordanov on 25.1.2015 г..
 */

/* MARKERS ROUTES */

function addPopUp(marker, content) {


    google.maps.event.addListener(marker, 'mouseover', function (e) {
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

    var styledContent = generatePopUpContent(noise, co, no2, battery, null);

    addPopUp(marker, styledContent);

    var entry = {"marker": marker, "noise": noise, "no2": no2, "co": co};
    POINT_DATA.push(entry);

}

function generatePopUpContent(noise, co, no2, battery, dataLength){
    var content;
    if(dataLength!=null){
        content = "<b>Route:</b> " + dataLength.toString() + " data points" + "<br>";
    }
    else{
        content = "<b>Data Reading</b><br>";
    }
    content += "Noise: " + noise.toPrecision(3) + " dB" + progressEvaluate(noise, minNoise, maxNoise) ;
    content += "CO: " + co.toPrecision(3) + " ppm" + progressEvaluate(co, minCO, maxCO);
    content += "NO2: " + no2.toPrecision(3) + " ppm" + progressEvaluate(no2, minNO2, maxNO2) ;
    content += "Battery: " + battery + " %" + progressEvaluate(battery, minBattery, maxBattery);
    var styledContent = '<div class="mapPopUp">' + content + '</div>';

    return styledContent;
}

function generateRoute(newRoute, noiseSUM, coSUM, no2SUM) {

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
    var noiseAVG = noiseSUM / dataPoints;
    var coAVG = coSUM / dataPoints;
    var no2AVG = no2SUM / dataPoints;
    var routeDATA = {"route": route, "noiseAVG": noiseAVG, "coAVG": coAVG, "no2AVG": no2AVG};

    var styledContent = generatePopUpContent(noiseAVG, coAVG, no2AVG, 100, dataPoints);

    google.maps.event.addListener(route, 'mouseover', function (event) {
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


    ROUTE_DATA.push(routeDATA);

}

function progressEvaluate(value, min, max) {

    var progress = rangePercentage(value, min, max);
    var value = progress;
    var progressContent = '<div class="progress"><div class="progress-bar progress-bar-striped active" role="progressbar" style="width: ' + progress + '%"><span class="sr-only"></span></div></div>';
    return progressContent;
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

            noiseSUM += dr.noise;
            coSUM += dr.co;
            no2SUM += dr.no2;


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