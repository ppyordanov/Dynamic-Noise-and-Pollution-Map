var location_id = null;
var route_data = [];
var context_data = [];
var route_id = '';
var MIN_INTERVAL = 500;
var DEFAULT_WINDOW = 30 * 1000;
var WINDOW = DEFAULT_WINDOW;
var popup = new google.maps.InfoWindow({});
var map;
var probe = 0;

var device = {};
var user = {};

var trackIntervalId;
var sample_data;

var SCK_API_CODE = "084122509ae13c389bf752915861249cff652249";
var DATA_SOURCE;
var DS2;


function init() {
    $('#connection').prop('disabled', true).addClass('ui-disabled');

    //get default API code
    $("#sckapicode").val(SCK_API_CODE);

    $('#stop').hide();
    if ((navigator.network.connection.type === 'none' || navigator.network.connection.type === null || navigator.network.connection.type === 'unknown' )) {
        $('#connection').html('Not Connected');
        $('#start').prop('disabled', true).addClass('ui-disabled');
    }

}


$("#start").live('click', function () {
    //checking time window value
    //window at least 30 seconds
    $("#start").hide();
    $("#stop").show();
    var winVal = $("#window").val();
    if (winVal != '' && isNaN(winVal) == false && winVal >= 30000) {
        WINDOW = parseInt(winVal);
    }

    //Retrieve API code
    var sckAPIval = $("#sckapicode").val();
    DATA_SOURCE = 'http://api.smartcitizen.me/v0.0.1/' + sckAPIval + '/lastpost.json';
    DS2 = 'http://api.smartcitizen.me/v0.0.1/' + sckAPIval + '/me.json';

    route_id = $("#route_id").val();
    $("#window").val(WINDOW);

    var time_now;

    if (route_id == '' || route_id == 'null') {
        time_now = new Date().toLocaleString();
        route_id = "Route " + time_now;
        $("#route_id").val(route_id);
    }

    //update location every x seconds, 30 by default
    localize();

    var userData = getUserData();
    var deviceData = getDeviceData();


    user.id = userData.me.id;
    user.userName = userData.me.username;
    user.city = userData.me.city;
    user.country = userData.me.country;
    user.website = userData.me.website;
    user.email = userData.me.email;
    user.created = userData.me.created;

    device.id = deviceData.devices[0].id;
    device.title = deviceData.devices[0].title;
    device.description = deviceData.devices[0].description;
    device.created = deviceData.devices[0].created;
    device.location = deviceData.devices[0].location;

    //$("#clear").hide();
    $('<div class="ui-body ui-body-c abs">Tracking in progress!</div>').insertAfter('#route_data').delay(3000).fadeOut();
    //$("#stop").show();

});

$("#stop").live('click', function () {

    $("#stop").hide();
    $("#start").show();

    //stop getting current location
    clearInterval(trackIntervalId);

    navigator.geolocation.clearWatch(location_id);
    window.localStorage.setItem(route_id, JSON.stringify(route_data));

    //if there is data to be transmitted, send to server
    if (context_data.length != 0) {
        var dataReadings = {context: JSON.stringify(context_data),
            user: JSON.stringify(user),
            device: JSON.stringify(device)};
        console.log(dataReadings);
        $.ajax({
            type: 'POST',
            //url: "http://127.0.0.1:8080/addRoute",
            //url:"http://178.62.100.239/addRoute",
            url: "http://ugmap.me/addRoute",
            data: dataReadings,
            dataType: "json",
            success: function (response) {
                console.log(response);
            }
        });
    }
    //RESET
    route_id = null;
    route_data = [];
    context_data = [];
    $("#route_id").val("");
    $('<div class="ui-body ui-body-c abs">Completed tracking and transmitted data to the server!</div>').insertAfter('#route_data').delay(3000).fadeOut();
});


$("#clear").live('click', function () {
    window.localStorage.clear();
    location.reload();
});

$('#home').live('pageshow', function () {

    $("#status").val("");

});

$('#history').live('pageshow', function () {

    route_number = window.localStorage.length;
    $("#route_number").html("Routes:" + route_number);
    $("#list").empty();
    var route;
    for (i = 0; i < route_number; i++) {
        route = window.localStorage.key(i);
        $("#list").append('<a class="rButton" href="#route" data-role="button" data-mini="true">' + route + '</a><br>');
    }

});

$("#history a").live('click', function () {
    $("#route").attr("route_id", $(this).text());
});

$('#route').live('pageshow', function () {

    var current_route_id = $(this).attr("route_id");
    var current_route_data = window.localStorage.getItem(current_route_id);
    current_route_data = JSON.parse(current_route_data);
    var route_location = new google.maps.LatLng(current_route_data[0].coords.latitude, current_route_data[0].coords.longitude);
    var myOptions = {
        zoom: 15,
        center: route_location,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    var route_coordinates = [];
    var position;
    var marker;
    for (i = 0; i < current_route_data.length; i++) {
        position = new google.maps.LatLng(current_route_data[i].coords.latitude, current_route_data[i].coords.longitude);
        route_coordinates.push(position);
    }

    var route_display = new google.maps.Polyline({
        path: route_coordinates,
        strokeColor: "#2196f3",
        strokeOpacity: 0.5,
        strokeWeight: 8
    });

    route_display.setMap(map);


});