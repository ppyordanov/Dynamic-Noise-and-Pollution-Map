/**
 * Created by Peter Yordanov on 8.1.2015 г..
 */


/* CONTROLS */

function toggleHeatMap(value) {
    //HEAT_MAP.setMap(HEAT_MAP.getMap() ? null : map);
    if (value) {
        HEAT_MAP.setMap(map);
        var radius = parseInt($("#radiusHeat").val());
        var opacity = parseInt($("#opacityHeat").val()) / 100;

        if (opacity != null && (opacity > 0 && opacity <= 1)) {
            HEAT_MAP.set('opacity', opacity);
        }
        else {
            HEAT_MAP.set('opacity', 0.5);
        }
        if (radius > 0) {
            HEAT_MAP.set('radius', radius);
        }
        else {
            HEAT_MAP.set('radius', 50);
        }
    }
    else {
        HEAT_MAP.setMap(null);
    }
}

function toggleMarkers(value) {

    disableMarkerInfoWindow = $('input[name=infoDisplayMarker]:checked').val();

    POINT_DATA.forEach(function (entry) {
        entry["marker"].set("visible", value);
    });
}

function toggleRoutes(value) {

    disableRouteInfoWindow = $('input[name=infoDisplayRoute]:checked').val();

    ROUTE_DATA.forEach(function (entry) {
        entry["route"].set("visible", value);
    });
}

function togglePointVis(value) {

    var variable = $('input[name=pointsValue]:checked').val();

    POINT_VISUALIZATION.forEach(function (entry) {
        entry["circle"].set("visible", value);
        entry["circle"].set("radius", entry[variable]);
        entry["circle"].set("fillOpacity", entry[variable] / 10);
    });
}