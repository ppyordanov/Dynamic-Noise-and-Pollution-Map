/**
 * Created by Peter Yordanov on 25.1.2015 г..
 */


/* HEAT_MAP */


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