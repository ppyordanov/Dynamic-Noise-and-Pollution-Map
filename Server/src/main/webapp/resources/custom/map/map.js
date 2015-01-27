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
    generateGrid(tileSize);
    //generatePointVis();
    populateMap();
    generateHeatMap();


    //CONTROLS

    $("#noise").slider({
        orientation: "horizontal",
        range: true,
        min: Math.floor(minNoise),
        max: Math.ceil(maxNoise),
        step: baseStep,
        slide: function (event, ui) {
            var v1 = ui.values[ 0 ];
            var v2 = ui.values[ 1 ];
            $("#noise").find(".ui-slider-handle").eq(0).text(v1);
            $("#noise").find(".ui-slider-handle").eq(1).text(v2);

            //$("#noise_level").val(v1 + " - " + v2);
        },

        /*
         change: function (event, ui) {
         minRangeNoise = ui.values[0];
         maxRangeNoise = ui.values[1];
         //generateGrid();
         },
         */

        stop: function (event, ui) {
            minRangeNoise = ui.values[0];
            maxRangeNoise = ui.values[1];
            renderData();
            alert(locationARR.length);
        }
    });


    $("#co").slider({
        orientation: "horizontal",
        range: true,
        min: Math.floor(minCO),
        max: Math.ceil(maxCO),
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
            alert(locationARR.length);
        }
    });

    $("#no2").slider({
        orientation: "horizontal",
        range: true,
        min: Math.floor(minNO2),
        max: Math.ceil(maxNO2),
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
            alert(locationARR.length);
        }
    });


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

        if ((pDataEntry["noise"] >= minRangeNoise && pDataEntry["noise"] <= maxRangeNoise) &&
            (pDataEntry["co"] >= minRangeCO && pDataEntry["co"] <= maxRangeCO) &&
            (pDataEntry["no2"] >= minRangeNO2 && pDataEntry["no2"] <= maxRangeNO2)) {
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

