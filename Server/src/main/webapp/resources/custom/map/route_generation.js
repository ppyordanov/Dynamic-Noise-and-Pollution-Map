/**
 * Created by Peter Yordanov on 26.1.2015 г..
 */

/* ROUTE GENERATION */


$(document).ready(function () {

    directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap(map);
    var closest;

    toggleUserTracking(currentlyTrackingLocation);

    $('#startTracking').on('click', function () {
        userWatch = navigator.geolocation.watchPosition(function (position) {
            renderMarker(map, currentUserLocation, position.coords.latitude, position.coords.longitude);
        });
        currentUserLocation.set("visible", true);
        currentlyTrackingLocation = true;
        toggleUserTracking(currentlyTrackingLocation);
        renderLocationData(source, currentlyTrackingLocation);
    });

    $('#stopTracking').on('click', function () {
        navigator.geolocation.clearWatch(userWatch);
        currentUserLocation.set("visible", false);
        currentlyTrackingLocation = false;
        toggleUserTracking(currentlyTrackingLocation);
        renderLocationData(source, currentlyTrackingLocation);
    });

    $('#locationsCheck').on('click', function () {
        renderLocationData(source, currentlyTrackingLocation);
    });
    $('#routesCheck').on('click', function () {
        closest = findClosestCampusLocation(source);
        starting_point = new google.maps.LatLng(closest.loc[0], closest.loc[1]);
        sp_Name = closest.label;
        $("#sourcePlace").autocomplete({
            source: places,
            select: function (event, ui) {
                starting_point = new google.maps.LatLng(ui.item.loc[0], ui.item.loc[1]);
                sp_Name = ui.item.label;
                $("#sourceLat").val(starting_point.lat());
                $("#sourceLng").val(starting_point.lng());
            }
        }).val(sp_Name).data('autocomplete');

        $("#destinationPlace").autocomplete({
            source: places,
            select: function (event, ui) {
                destination_point = new google.maps.LatLng(ui.item.loc[0], ui.item.loc[1]);
                dp_Name = ui.item.label;
                $("#destinationLat").val(destination_point.lat());
                $("#destinationLng").val(destination_point.lng());
            }
        });

        $("#sourceLat").val(starting_point.lat());
        $("#sourceLng").val(starting_point.lng());

        if (destination_point != null) {
            $("#destinationLat").val(destination_point.lat());
            $("#destinationLng").val(destination_point.lng());
        }

    });

    $('#route_hide').on('click', function () {
        USER_ROUTE_DATA.forEach(function (entry) {
            entry.data["route"].set("map", null);
        });
    });

    $('#route_apply').on('click', function () {

        currentlyTrackingDestination = true;
        //starting_point = source;

        //hide markers and routes
        toggleMarkers(false);
        toggleRoutes(false);

        /* USER NAVIGATOR */
        destination = destination_point;
        //currentUserLocation.set("visible", true);

        /*        userWatch = navigator.geolocation.watchPosition(function (position) {
         renderMarker(map, currentUserLocation, position.coords.latitude, position.coords.longitude);
         });*/


        //RANK STATISTICS
        variableSwitch.distance = $("#distanceStat").is(':checked');
        variableSwitch.duration = $("#durationStat").is(':checked');
        variableSwitch.noise = $("#noiseStat").is(':checked');
        variableSwitch.co = $("#coStat").is(':checked');
        variableSwitch.no2 = $("#no2Stat").is(':checked');

        if (variableSwitch.distance) {
            routeDistanceMultiplier = defaultRouteDistanceMultiplier;
        } else {
            routeDistanceMultiplier = 0;
        }
        if (variableSwitch.duration) {
            routeDurationMultiplier = defaultRouteDurationMultiplier;
        } else {
            routeDistanceMultiplier = 0;
        }
        if (variableSwitch.noise) {
            noiseMultiplier = defaultNoiseMultiplier;
        } else {
            noiseMultiplier = 0;
        }
        if (variableSwitch.co) {
            coMultiplier = defaultCoMultiplier;
        } else {
            coMultiplier = 0;
        }
        if (variableSwitch.no2) {
            no2Multiplier = defaultNo2Multiplier;
        } else {
            no2Multiplier = 0;
        }

        calculateMaximumOverallPollutionIndex();

        USER_ROUTE_DATA.forEach(function (entry) {
            entry.data["route"].set("map", null);
        });
        USER_ROUTE_DATA = [];
        if(destination != null){
            generateUserRoutes();
        }

    });

});

function renderLocationData(source, track) {
    var closest = findClosestCampusLocation(source);
    var sViewImage;
    var content;
    if(track){
        sViewImage = "<img class='streetViewImage' src='https://maps.googleapis.com/maps/api/streetview?size=200x120&location=" + closest.loc[0] + "," + closest.loc[1] + "&heading=34&pitch=10&fov=120'>";
        content =
            "<div class='panel panel-success'><div class='panel-heading'><h3 class='panel-title'>" + closest.label + "</h3></div><div class='panel-body'><span class='left'>" +
            "<div class='row'><div class='col-xs-6 col-md-6'>" + sViewImage + "</div>" +
            "<div class='col-xs-6 col-md-6'></div>" + "<span class='right'><b>Latitude:</b> " + closest.loc[0] + "<br>" + "<b>Longitude:</b>" + closest.loc[1] +
            "<br><br><button type='button' class='btn btn-primary' onclick='panAndZoom(" + closest.loc[0] + "," + closest.loc[1] + ");' data-dismiss='modal'>View</button></span></div>" +
            "</div></div>";
    }
    else{
        content = "<b>Stopped watching for location changes.</b>";
        console.log(sViewImage);
    }
    $('#currentLocation').html(content);
}

function identifyBestRoute() {
    //var lowestScore = Number.MAX_SAFE_INTEGER;

    var scores = [];
    var scoresColors = [];
    USER_ROUTE_DATA.forEach(function (entry) {
        if (entry.score !== null) {
            scores.push(entry.score);
        }
    });
    //alert(scores.length);
    scores = scores.sort(compareIntegers);
    for (var i = 0; i < scores.length; i++) {
        if (i < colors.length) {
            scoresColors[scores[i]] = colors[i];
        }
        else {
            scoresColors[scores[i]] = colors[colors.length - 1]; //always red
        }
    }
    USER_ROUTE_DATA.forEach(function (entry) {
        if (entry.score !== null) {
            entry.data.route.set("strokeColor", scoresColors[entry.score]);
        }
        /*
         if (entry.score !== null && entry.score == lowestScore) {
         //#7FE817
         entry.data.route.set("strokeColor", "#4caf50");
         //entry.data.route.set("strokeOpacity", 0.7);
         }
         */
    });
}

function calculateTime(seconds) {
    var minutes = Math.floor(seconds / 60);
    var sec_remaining = seconds - minutes * 60;
    return  "Duration: " + minutes + " min. " + Math.floor(sec_remaining) + " sec." + "<br>";
}

function toggleUserTracking(track) {
    if (track) {
        $('#startTracking').attr('disabled', 'disabled');
        $('#stopTracking').removeAttr('disabled');
    }
    else {
        $('#stopTracking').attr('disabled', 'disabled');
        $('#startTracking').removeAttr('disabled');
    }

}

function generateUserRoutes() {

    mode = $("#mode").val();
    //alert(starting_point);
    var request = {
        origin: starting_point,
        destination: destination_point,
        provideRouteAlternatives: true,
        travelMode: google.maps.TravelMode[mode],
        unitSystem: google.maps.UnitSystem.METRIC
    };
    // alert("ds");
    directionsService.route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {

            for (var i = 0; i < response.routes.length; i++) {
                var route = response.routes[i].overview_path;
                var routeDistance = response.routes[i].legs[0].distance.value; //meters
                var routeDuration = response.routes[i].legs[0].duration.value; //seconds
                var timeFormatted = calculateTime(routeDuration);
                var noiseSUM = 0, coSUM = 0, no2SUM = 0;
                var validCount = 0;
                for (var j = 0; j < route.length; j++) {
                    var loc = getGridLocation(route[j]);
                    var block = GRID[loc];
                    if (block) {
                        if (block.count > 0) {
                            coSUM += block.coAVG.sum / block.count;
                            noiseSUM += block.noiseAVG.sum / block.count;
                            no2SUM += block.no2AVG.sum / block.count;

                            validCount++;
                        }
                    }

                }
                //alert(coSUM);
                var noiseAVG = noiseSUM / validCount;
                var coAVG = coSUM / validCount;
                var no2AVG = no2SUM / validCount;

                //variable weights can be changed
                var score = noiseAVG * noiseMultiplier + coAVG * coMultiplier + no2AVG * no2Multiplier + routeDistance * routeDistanceMultiplier + routeDuration * routeDurationMultiplier;
                var routeDATA = generateRoute(route, noiseAVG, coAVG, no2AVG, routeDistance, timeFormatted, score, i + 1);

                USER_ROUTE_DATA.push({"data": routeDATA, "score": score});
            }

            generateRouteMarkers(sp_Name, dp_Name, route);
            //2 elements for route markers
            if (USER_ROUTE_DATA.length > 3) {
                identifyBestRoute();
            }
            //directionsDisplay.setDirections(response);
        }
    });
}
