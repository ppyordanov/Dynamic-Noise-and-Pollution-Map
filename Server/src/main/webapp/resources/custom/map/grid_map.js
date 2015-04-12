/**
 * Created by Peter Yordanov on 25.1.2015 г..
 */


/* GRID MAP */

var cellTotalNumber;
var exploredCellNumber;

function generateGrid(tileSize) {

    var northWestStart = origin;
    var heightTilesN = maxTilesY;
    var widthTilesN = maxTilesX;
    var tileSizeMeters = tileSize;

    var northAngleDegrees = 0;
    var southAngleDegrees = 180;
    var eastAngleDegrees = 90;
    var westAngleDegrees = -90;

    cellTotalNumber = 0;
    exploredCellNumber = 0;

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

            var tileDATA = {tile: tile, noiseAVG: {sum: 0}, coAVG: {sum: 0}, no2AVG: {sum: 0}, count: 0};

            GRID.push(tileDATA);
            bindWindow(tile, GRID.length - 1);

            var newEast = google.maps.geometry.spherical.computeOffset(newEast, tileSizeMeters, eastAngleDegrees);
            var newSouth = google.maps.geometry.spherical.computeOffset(newSouth, tileSizeMeters, eastAngleDegrees);

            cellTotalNumber++; //count the number of cells in the grid matrix
        }

    }
}


function bindWindow(rectangle, indexNumber) {
    google.maps.event.addListener(rectangle, 'click', function (event) {

        if (disableGridInfoWindow) {
            return;
        }
        var i = indexNumber;
        var content = generatePopUpContent(calculateAverage(GRID[i]["noiseAVG"]["sum"], GRID[i]["count"]), calculateAverage(GRID[i]["coAVG"]["sum"], GRID[i]["count"]), calculateAverage(GRID[i]["no2AVG"]["sum"], GRID[i]["count"]), 0, (-1 - i), null, null, null, null, GRID[i]["count"]);
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

function mapExplorationProgress(exploredCellNumber, cellTotalNumber){

    var exploredPercentage = rangePercentage(exploredCellNumber, 0, cellTotalNumber);
    $("#explorationPercentage").html("<b>Grid map exploration progress (" + exploredPercentage.toFixed(2) + "%):</b>");
    $("#explorationData").html(progressEvaluate(exploredCellNumber, 0, cellTotalNumber));

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

        if(GRID[gridIndex]["count"] == 0){ //check if the cell has been explored
            exploredCellNumber++; //if not, increment counter
        }
        GRID[gridIndex]["count"]++;
        GRID[gridIndex]["noiseAVG"]["sum"] += dataReading.noise;
        GRID[gridIndex]["coAVG"]["sum"] += dataReading.co;
        GRID[gridIndex]["no2AVG"]["sum"] += dataReading.no2;
        //TESTING
        //alert("Noise AVG grid tile: " + noiseAverage + " MIN: " + minNoise + " MAX: " + maxNoise + " noise avg sum " + noiseSum + " noise count" + noiseCount);
        //GRID[gridIndex]["tile"].set("fillColor", convertToHSL(noisePercentage));
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


        if (parseInt($("#tileSize").val()) >= 20) {
            var tileSize = $("#tileSize").val();
            GRID.forEach(function (entry) {
                entry["tile"].set("map", null);
            });
            GRID = [];
            generateGrid(tileSize);
            updateGridAggregation();

        }

        //map exploration update data render
        mapExplorationProgress(exploredCellNumber, cellTotalNumber);

        var max, min;

        if (normal) {
            if (gridValue == 'noiseAVG') {
                min = absoluteMinNoise;
                max = absoluteMaxNoise;
            }
            else if (gridValue == 'coAVG') {
                min = absoluteMinCO;
                max = absoluteMaxCO;
            }
            else {
                min = absoluteMinNO2;
                max = absoluteMaxNO2;
            }
        }
        else {
            if (gridValue == 'noiseAVG') {
                min = minNoise;
                max = maxNoise;
            }
            else if (gridValue == 'coAVG') {
                min = minCO;
                max = maxCO;
            }
            else {
                min = minNO2;
                max = maxNO2;
            }
        }

        GRID.forEach(function (entry) {
            var sum = entry[gridValue]["sum"];
            var count = entry["count"];
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
