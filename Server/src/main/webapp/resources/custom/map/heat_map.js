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