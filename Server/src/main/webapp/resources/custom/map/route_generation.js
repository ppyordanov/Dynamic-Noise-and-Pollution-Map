/**
 * Created by Peter Yordanov on 26.1.2015 г..
 */

/* ROUTE GENERATION */

var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var starting_point = null;
var destination_point = null;
var mode = null;

var USER_ROUTE_DATA = [];

$(document).ready(function () {

    directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap(map);

    var places = [
        {label:"Adam Smith Building", loc:[55.873727, -4.289915]},
        {label:"Boyd Orr Building", loc:[55.873525, -4.292630]},
        {label:"Stevenson Building", loc:[55.872863, -4.285314]},
        {label:"University Library", loc:[55.873257, -4.288472]},
        {label:"Main Building", loc:[55.871948, -4.288302]}
    ];

    $( "#sourcePlace" ).autocomplete({
        source: places,
        select: function(event, ui) {
            starting_point = new google.maps.LatLng(ui.item.loc[0], ui.item.loc[1]);
        }
    });
    $( "#destinationPlace" ).autocomplete({
        source: places,
        select: function(event, ui) {
            destination_point = new google.maps.LatLng(ui.item.loc[0], ui.item.loc[1]);
        }
    });

    $('#route_apply').on('click', function() {

        var sourceLat,sourceLng, destinationLat, destinationLng;
        if($( "#sourceLat").val()!="" && $( "#sourceLng").val()!=""){
            sourceLat = parseFloat($( "#sourceLat").val());
            sourceLng = parseFloat($( "#sourceLng").val());
            if(sourceLat!=NaN && sourceLng!=NaN){
                starting_point = new google.maps.LatLng(sourceLat, sourceLng);
            }
        }
        if($( "#destinationLat").val()!="" && $( "#destinationLng").val()!=""){
            destinationLat = parseFloat($( "#destinationLat").val());
            destinationLng = parseFloat($( "#destinationLng").val());
            if(destinationLat!=NaN && destinationLng!=NaN){
                destination_point = new google.maps.LatLng(destinationLat, destinationLng);
            }
        }

        USER_ROUTE_DATA.forEach(function (entry) {entry.data["route"].set("map",null);});
        USER_ROUTE_DATA = [];
        generateUserRoutes();

    });

});

function identifyBestRoute(){
    var index = 0;
    var lowestScore = Number.MAX_SAFE_INTEGER;
    USER_ROUTE_DATA.forEach(function (entry) {
        if(entry.score<lowestScore){
            lowestScore = entry.score;
        }
    });
    USER_ROUTE_DATA.forEach(function (entry) {
        if(entry.score==lowestScore){
            //#7FE817
            entry.data.route.set("strokeColor", "#4caf50");
            //entry.data.route.set("strokeOpacity", 0.7);
        }
    });
}

function calculateTime(seconds){
    var minutes = Math.floor(seconds / 60);
    var sec_remaining = seconds - minutes*60;
    return  "Duration: " + minutes + " min. " + sec_remaining + " sec." + "<br>";
}

function generateUserRoutes() {

    mode = $( "#mode").val();

    var request = {
        origin: starting_point,
        destination: destination_point,
        provideRouteAlternatives:true,
        travelMode: google.maps.TravelMode[mode],
        unitSystem: google.maps.UnitSystem.IMPERIAL
    };
    // alert("ds");
    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {

            for (var i = 0; i<response.routes.length; i++) {
                var route = response.routes[i].overview_path;
                var routeDistance = response.routes[i].legs[0].distance.value; //meters
                var routeDuration = response.routes[i].legs[0].duration.value; //seconds
                var timeFormatted = calculateTime(routeDuration);
                //alert(route);
                //alert(response.routes.length);
/*
                var routeShot = new google.maps.Polyline({
                    path: route,
                    strokeColor: "#2196f3",
                    strokeOpacity: 0.5,
                    strokeWeight: 10,
                    fillOpacity: 0.0,
                    map: map,
                    visible: true
                });
*/
/*
                new google.maps.DirectionsRenderer({
                    map: map,
                    directions: response,
                    routeIndex: i
                });
*/
                var noiseSUM=0, coSUM=0, no2SUM=0;
                var validCount=0;
                for(var j=0;j<route.length;j++){
                    var loc = getGridLocation(route[j]);
                    var block = GRID[loc];
                    if(block){
                        if(block.coAVG.count>0) {
                            coSUM += block.coAVG.sum / block.coAVG.count;
                            noiseSUM += block.noiseAVG.sum / block.noiseAVG.count;
                            no2SUM +=block.no2AVG.sum/block.noiseAVG.count;

                            validCount++;
                        }
                    }

                }
                //alert(coSUM);
                var noiseAVG = noiseSUM/validCount;
                var coAVG = coSUM/validCount;
                var no2AVG = no2SUM/validCount;

                //variable weights can be changed
                var score = noiseAVG*1 + coAVG*1 + no2AVG*2 + routeDistance*0.01 + routeDuration*0.01;
                var routeDATA = generateRoute(route, noiseAVG, coAVG , no2AVG, routeDistance, timeFormatted, score);
                USER_ROUTE_DATA.push({"data":routeDATA,"score": score});
            }

            if(USER_ROUTE_DATA.length>1){
                identifyBestRoute();
            }
            //directionsDisplay.setDirections(response);
        }
    });
}
