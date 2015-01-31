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

        if (opacity !== "" && (opacity > 0 && opacity <= 1)) {
            HEAT_MAP.set('opacity', opacity);
        }
        else {
            HEAT_MAP.set('opacity', 0.5);
        }
        if (radius!== "" && radius > 0) {
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


    if(value){
        var thickness = parseInt($("#thicknessRoutes").val());
        var opacity = parseInt($("#opacityRoutes").val()) / 100;
        ROUTE_DATA.forEach(function (entry) {
            if(thickness !== NaN && thickness >0){
                entry["route"].set("strokeWeight", thickness);
            }
            if(opacity !== NaN && (opacity>0 && opacity <=1)){
                entry["route"].set("strokeOpacity", opacity);
            }
        });

    }

}

function togglePointVis(value) {

    //var variable = $('input[name=pointsValue]:checked').val();
    var radiusSize;
    var color;
    var variable;

    POINT_VISUALIZATION.forEach(function (entry) {

        $('input[name=pointsValue]:checked').each(function() {
            variable = $(this).val();
            color = $('input[name=' + variable +'Color]:checked').val();
            radiusSize = parseInt($('input[name='+ variable + 'Radius]:checked').val());
            //alert(color);
            entry[variable + "Circle"].set("visible", value);
            entry[variable + "Circle"].set("radius", entry[variable]*radiusSize);
            entry[variable + "Circle"].set("fillOpacity", entry[variable] / 10);
            entry[variable + "Circle"].set("fillColor" , color);
        });
        $('input[name=pointsValue]:not(:checked)').each(function() {
            variable = $(this).val();
            entry[variable + "Circle"].set("visible", false);
        });
    });
}