/**
 * Created by Peter Yordanov on 25.1.2015 г..
 */


/* GRID MAP */

function generateGrid(tileSize) {

    var northWestStart = origin;
    var heightTilesN = maxTilesY;
    var widthTilesN = maxTilesX;
    var tileSizeMeters = tileSize;

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
            var strokeO = 0;
            if (FILL == "gray") {
                fillO = 0;
                //strokeO =0;
            }

            var tileOptions = {
                //strokeColor: "#FF0000",
                strokeColor: "#000000",
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


function bindWindow(rectangle, indexNumber) {
    google.maps.event.addListener(rectangle, 'click', function (event) {

        if (disableGridInfoWindow) {
            return;
        }
        var i = indexNumber;
        var content = generatePopUpContent(calculateAverage(GRID[i]["noiseAVG"]["sum"], GRID[i]["noiseAVG"]["count"]), calculateAverage(GRID[i]["coAVG"]["sum"], GRID[i]["coAVG"]["count"]), calculateAverage(GRID[i]["no2AVG"]["sum"], GRID[i]["no2AVG"]["count"]), 0, (-1 - i),null,null,null,null, GRID[i]["no2AVG"]["count"]);
        infowindow.setContent(content);
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


function aggregateGrid(location, dataReading) {

    var gridIndex = getGridLocation(location);

    //if such grid tile exists, update information and aggregate data
    if (GRID[gridIndex]) {

        GRID[gridIndex]["noiseAVG"]["sum"] += dataReading.noise;
        GRID[gridIndex]["noiseAVG"]["count"]++;
        var noiseSum = GRID[gridIndex]["noiseAVG"]["sum"];
        var noiseCount = GRID[gridIndex]["noiseAVG"]["count"];
        var noiseAverage = calculateAverage(noiseSum, noiseCount);
        var noisePercentage = rangePercentage(noiseAverage, minNoise, maxNoise);

        GRID[gridIndex]["coAVG"]["sum"] += dataReading.co;
        GRID[gridIndex]["coAVG"]["count"]++;
        var coSum = GRID[gridIndex]["coAVG"]["sum"];
        var coCount = GRID[gridIndex]["coAVG"]["count"];
        var coAverage = coSum / coCount;
        var coPercentage = rangePercentage(coAverage, minCO, maxCO);

        GRID[gridIndex]["no2AVG"]["sum"] += dataReading.no2;
        GRID[gridIndex]["no2AVG"]["count"]++;
        var no2Sum = GRID[gridIndex]["no2AVG"]["sum"];
        var no2Count = GRID[gridIndex]["no2AVG"]["count"];
        var no2Average = no2Sum / no2Count;
        var no2Percentage = rangePercentage(no2Average, minNO2, maxNO2);

        //TESTING
        //alert("Noise AVG grid tile: " + noiseAverage + " MIN: " + minNoise + " MAX: " + maxNoise + " noise avg sum " + noiseSum + " noise count" + noiseCount);
        //alert(coPercentage);
        //alert(coPercentage);
        GRID[gridIndex]["tile"].set("fillColor", convertToHSL(noisePercentage));
        GRID[gridIndex]["tile"].set("fillOpacity", 0.5);
    }


}


//forEach better in terms of performance changed from a conventional for loop
function toggleGrid(value) {

    if (value) {

        var gridValue = $("input[name=gridValue]:checked").val();
        var outline = $('input[name=outline]:checked').val();
        var scale = $('input[name=scale]:checked').val();
        var outlineOpacity = parseInt($("#outlineOpacity").val()) / 100;
        var tileOpacity = parseInt($("#tileOpacity").val()) / 100;
        var colorGradient = $('input[name=gradient]:checked').val();
        var normal = (scale == "absolute");
        var outlineVis = 0;
        var fillVis = 0.35;
        disableGridInfoWindow = $('input[name=infoDisplayGrid]:checked').val();

        if (tileOpacity != null && (tileOpacity > 0 && tileOpacity <= 1)) {
            fillVis = tileOpacity;
        }
        if (outline) {
            if (outlineOpacity != null && (outlineOpacity > 0 && outlineOpacity <= 1)) {
                outlineVis = outlineOpacity;
            }
            else {
                outlineVis = 1;
            }
        }


        if (parseInt($("#tileSize").val()) >= 10) {
            var tileSize = $("#tileSize").val();
            GRID.forEach(function (entry) {
                entry["tile"].set("map", null);
            });
            GRID = [];
            generateGrid(tileSize);
            updateGridAggregation();
        }

        var max, min;
        if (gridValue == 'noiseAVG') {
            if (normal) {
                min = absoluteMinNoise;
                max = absoluteMaxNoise;
            }
            else {
                min = minNoise;
                max = maxNoise;
            }
        }
        else if (gridValue == 'coAVG') {
            if (normal) {
                min = absoluteMinCO;
                max = absoluteMaxCO;
            }
            else {
                min = minCO;
                max = maxCO;
            }
        }
        else {
            if (normal) {
                min = absoluteMinNO2;
                max = absoluteMaxNO2;
            }
            else {
                min = minNO2;
                max = maxNO2;
            }
        }

        GRID.forEach(function (entry) {
            var sum = entry[gridValue]["sum"];
            var count = entry[gridValue]["count"];
            var average = calculateAverage(sum, count);
            var percentage = rangePercentage(average, min, max);
            var fillOp = entry["tile"].fillOpacity;
            entry["tile"].set("fillColor", convertToColor(percentage, colorGradient));
            entry["tile"].set("strokeOpacity", outlineVis);
            if (fillOp > 0) {
                entry["tile"].set("fillOpacity", fillVis);
            }
        });


    }

    GRID.forEach(function (entry) {
        entry["tile"].set("visible", value);
    });
}
