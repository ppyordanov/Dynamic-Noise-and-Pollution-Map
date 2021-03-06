function setStyles() {

    map.mapTypes.set('CLASSIC', styledMap0);
    map.mapTypes.set('GRAYSCALE_DEFAULT', styledMap1);
    map.mapTypes.set('BLUE_HUE', styledMap2);
    map.mapTypes.set('DARK_BLUE', styledMap3);
    map.mapTypes.set('ROADS', styledMap4);
    map.setMapTypeId('GRAYSCALE_DEFAULT');


}

function init_map() {

    var myOptions = {
        zoom: 16,
        minZoom: 8,//15,
        maxZoom: 18,//18,
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


    /* USER NAVIGATOR */
    currentUserLocation = new google.maps.Marker({
        position: null,
        map: map,
        animation: google.maps.Animation.DROP,
        icon: userLocationIcon,
        title:"Current user location.",
        visible: true,
        optimized: false
    });
    var content = "You are here.";
    addPopUp(currentUserLocation, content, click);

    userWatch = navigator.geolocation.watchPosition(function (position) {
        renderMarker(map, currentUserLocation, position.coords.latitude, position.coords.longitude);
    });

    /* copy location on map click */
    google.maps.event.addListener(map, "click", function(event) {
        var lat = event.latLng.lat();
        var lng = event.latLng.lng();
        var loc = new google.maps.LatLng(lat, lng);
        var dest = findClosestCampusLocation(loc);
        $("#destinationPlace").val(dest.label).data('autocomplete');
        dp_Name = dest.label;
        destination_point = new google.maps.LatLng(dest.loc[0], dest.loc[1]);
    });

    setStyles();
    identifyValueRange();
    generateGrid(tileSize);
    //generatePointVis();
    populateMap();
    generateHeatMap();

    generateDevicesContent();
    generateUsersContent();

    //data points and routes number
    $("#dp").html("There are currently <b>" + POINT_DATA.length + "</b> data readings in the database.<br>");
    $("#rn").html("There are currently <b>" + routes.length + "</b> routes in the database.<br>");

    //map exploration data render
    mapExplorationProgress(exploredCellNumber, cellTotalNumber);

    //CONTROLS

    $("#noise").slider({
        orientation: "horizontal",
        range: true,
        min: Math.floor(minNoise),
        max: Math.ceil(maxNoise),
        values: [ Math.floor(minNoise), Math.floor(maxNoise) ],
        step: baseStep,
        slide: function (event, ui) {
            var v1 = ui.values[ 0 ];
            var v2 = ui.values[ 1 ];
            $("#noise").find(".ui-slider-handle").eq(0).text(v1);
            $("#noise").find(".ui-slider-handle").eq(1).text(v2);
        },
        stop: function (event, ui) {
            minRangeNoise = ui.values[0];
            maxRangeNoise = ui.values[1];
            renderData();
        }
    });
    minRangeNoise = minNoise;
    maxRangeNoise = maxNoise;
    $("#noise").find(".ui-slider-handle").eq(0).text(minNoise.toFixed(2));
    $("#noise").find(".ui-slider-handle").eq(1).text(maxNoise.toFixed(2));

    $("#co").slider({
        orientation: "horizontal",
        range: true,
        min: Math.floor(minCO),
        max: Math.ceil(maxCO),
        values: [ Math.floor(minCO),Math.ceil(maxCO) ],
        step: baseStep,
        slide: function (event, ui) {
            //$( "#co_level" ).val(ui.values[ 0 ] + " - " + ui.values[ 1 ] );
            var v1 = ui.values[ 0 ];
            var v2 = ui.values[ 1 ];
            $("#co").find(".ui-slider-handle").eq(0).text(v1);
            $("#co").find(".ui-slider-handle").eq(1).text(v2);
        },
        stop: function (event, ui) {
            minRangeCO = ui.values[0];
            maxRangeCO = ui.values[1];
            renderData();
        }
    });
    minRangeCO = minCO;
    maxRangeCO = maxCO;
    $("#co").find(".ui-slider-handle").eq(0).text(minCO.toFixed(2));
    $("#co").find(".ui-slider-handle").eq(1).text(maxCO.toFixed(2));

    $("#no2").slider({
        orientation: "horizontal",
        range: true,
        min: Math.floor(minNO2),
        max: Math.ceil(maxNO2),
        values: [  Math.floor(minNO2), Math.ceil(maxNO2) ],
        step: baseStep,
        slide: function (event, ui) {
            var v1 = ui.values[ 0 ];
            var v2 = ui.values[ 1 ];
            //$( "#no2_level" ).val(ui.values[ 0 ] + " - " + ui.values[ 1 ] );
            $("#no2").find(".ui-slider-handle").eq(0).text(v1);
            $("#no2").find(".ui-slider-handle").eq(1).text(v2);
        },
        stop: function (event, ui) {
            minRangeNO2 = ui.values[0];
            maxRangeNO2 = ui.values[1];
            renderData();
        }
    });
    minRangeNO2 = minNO2;
    maxRangeNO2 = maxNO2;
    $("#no2").find(".ui-slider-handle").eq(0).text(minNO2.toFixed(2));
    $("#no2").find(".ui-slider-handle").eq(1).text(maxNO2.toFixed(2));

    var dayMS = 24*60*60*1000;
    var timeBase=oldestTime.getTime()/dayMS;
    var maxDays = mostRecentTime.getTime()/dayMS-timeBase;
    $("#timeRange").text("Time (days between " + formatDate(oldestTime) + " and " + formatDate(mostRecentTime) + ")");
    $("#time").slider({
        orientation: "horizontal",
        range: true,
        min: 0,
        max: maxDays,
        values: [ 0,  maxDays],
        step: 1,
        slide: function (event, ui) {
            //$( "#co_level" ).val(ui.values[ 0 ] + " - " + ui.values[ 1 ] );
            var v1 = ui.values[ 0 ];
            var v2 = ui.values[ 1 ];
            $("#time").find(".ui-slider-handle").eq(0).text(v1);
            $("#time").find(".ui-slider-handle").eq(1).text(v2);
        },
        stop: function (event, ui) {
            oldestTimeRange = new Date((parseInt(ui.values[0])+timeBase-1)*dayMS);
            mostRecentTimeRange = new Date((parseInt(ui.values[1])+timeBase+1)*dayMS);
            $("#timeRange").text("Time (days between " + formatDate(oldestTimeRange) + " and " + formatDate(mostRecentTimeRange) + ")");
            renderData();
        }
    });
    oldestTimeRange = new Date((timeBase)*dayMS);
    mostRecentTimeRange = new Date((maxDays+timeBase)*dayMS);
    $("#time").find(".ui-slider-handle").eq(0).text("0");
    $("#time").find(".ui-slider-handle").eq(1).text(maxDays.toFixed(0).toString());


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
        //alert(pDataEntry["time"]);
        if ((pDataEntry["noise"] >= minRangeNoise && pDataEntry["noise"] <= maxRangeNoise) &&
            (pDataEntry["co"] >= minRangeCO && pDataEntry["co"] <= maxRangeCO) &&
            (pDataEntry["no2"] >= minRangeNO2 && pDataEntry["no2"] <= maxRangeNO2)
            && (pDataEntry["time"] >= oldestTimeRange && pDataEntry["time"] <= mostRecentTimeRange)
            ) {
            //alert(pDataEntry["marker"].getPosition());
            pDataEntry["marker"].set("map", map);
            pVisEntry["noiseCircle"].set("map", map);
            pVisEntry["no2Circle"].set("map", map);
            pVisEntry["coCircle"].set("map", map);
            locationARR.push(pDataEntry["marker"].getPosition());
        }
        else {
            pDataEntry["marker"].set("map", null);
            pVisEntry["noiseCircle"].set("map", null);
            pVisEntry["no2Circle"].set("map", null);
            pVisEntry["coCircle"].set("map", null);
        }
    }
    $('.locARR').html("(" + locationARR.length + " data readings)");

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
        if ((entry["noiseAVG"] >= minRangeNoise && entry["noiseAVG"] <= maxRangeNoise) &&
            (entry["coAVG"] >= minRangeCO && entry["coAVG"] <= maxRangeCO) &&
            (entry["no2AVG"] >= minRangeNO2 && entry["no2AVG"] <= maxRangeNO2)) {
            entry["route"].set("map", map);
        }
        else {
            entry["route"].set("map", null);
        }
    });

    //alert(locationARR.length);
    HEAT_MAP.setData(locationARR);

}

google.maps.event.addDomListener(window, 'load', init_map);

