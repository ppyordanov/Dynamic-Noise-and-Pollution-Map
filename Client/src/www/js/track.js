var location_id = null;
var route_data = [];
var route_id = '';

document.addEventListener("deviceready", function(){

    if(navigator.network.connection.type == Connection.NONE){
        $("#connection").html('You need to be connected to the Internet to use this application.');
            //.attr("data-icon", "delete")
            //.button('refresh');
    }

});


$("#start").live('click',function(){

    location_id = navigator.geolocation.watchPosition(
        //SUCCESS
        function(current_location){
            route_data.push(current_location);
        },
        //FAIL
        function(error_message){
            console.log(error_message);
        },
        //update every 30 seconds
        { enableHighAccuracy:true,frequency:30000}
    );

    route_id = $("#route_id").val();
    var time_now;
    if(route_id ==''){
        time_now = new Date().toLocaleString();
        route_id = "Route " + time_now;
    }


    $("#clear").hide();
    $("#status").html("tracking in progress");
    $("#stop").show();

});

$("#stop").live('click', function(){

    navigator.geolocation.clearWatch(route_id);
    window.localStorage.setItem(route_id, JSON.stringify(route_data));
    //RESET
    route_id=null;
    route_data=[];

    $("#route_id").val("");
    $("#status").html("completed tracking");

});


$("#clear").live('click', function(){

    window.localStorage.clear();

});

$('#history').live('pageshow', function () {

    route_number = window.localStorage.length;
    $("#route_number").html("Routes:" + route_number);

    $("#list").empty();

    var route;

    for(i=0; i<route_number; i++){
        route = window.localStorage.key(i);
        $("#list").append("<li><a href='#route' data-ajax='false'>" + route + "</a></li>");
    }
    $("#list").listview('refresh');

});

$("#list li a").live('click', function(){

    $("#route").attr("route_id", $(this).text());

});

$('#route').live('pageshow', function(){


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

    for(i=0; i<data.length; i++){
        route_coordinates.push(new google.maps.LatLng(current_route_data[i].coords.latitude, current_route_data[i].coords.longitude));
    }

    var route_display = new google.maps.Polyline({
        path: trackCoords,
        strokeColor: "#999999",
        strokeOpacity: 1.0,
        strokeWeight: 3
    });

    route_display.setMap(map);


});