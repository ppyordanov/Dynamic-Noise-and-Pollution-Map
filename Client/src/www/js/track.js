var location_id = null;
var route_data = [];
var context_data = [];
var route_id = '';
var WINDOW = 3000;
var popup = new google.maps.InfoWindow({});
var map;
var probe = 0;

var sample_data = {
    no: "",
    co2: "",
    noise: ""
};

document.addEventListener("deviceready", function(){

    if(navigator.network.connection.type == Connection.NONE){
        $("#connection").html('You need to be connected to the Internet to use this application.');
            //.attr("data-icon", "delete")
            //.button('refresh');
    }

});

var DATA_SOURCE = 'http://api.smartcitizen.me/v0.0.1/084122509ae13c389bf752915861249cff652249/lastpost.json';

//getSCKData();
function getSCKData()
{


    var json_obj = getSCKReading(DATA_SOURCE);

    var no2 = json_obj.devices[0].posts.no2;
    var co = json_obj.devices[0].posts.co;
    var noise = json_obj.devices[0].posts.noise;

    sample_data.no2 = no2;
    sample_data.co = co;
    sample_data.noise = noise;
    context_data.push(sample_data);

    $("#probe").html("<br>Probe " + probe + "<br>noise " + noise + "<br>co " + co + "<br> no2 "+ no2);
    probe++;


}


function getSCKReading(){

    var form_data = {
        devices: [{
            id: "",
            title: "",
            description: "",
            location: "",
            city: "",
            country: "",
            exposure: "",
            elevation: "",
            geo_lat: "",
            geo_long: "",
            created: "",
            last_insert_datetime: "",
            posts: {
                timestamp: "",
                temp: "",
                hum: "",
                co: "",
                no2: "",
                light: "",
                noise: "",
                bat: "",
                panel: "",
                nets: "",
                insert_datetime: ""
            }
        }]
    };


    return JSON.parse($.ajax({
        type: "POST",
        url: DATA_SOURCE,
        data: form_data,
        async:false,
        global:false,
        dataType: "json",
        success: function(response)
        {
            console.log(response);
            return response;
        }
    }).responseText);

}

/*
function generateMarker(position, context_data){

    marker = new google.maps.Marker({
        position: position,
        optimized: false,
        clickable: true,
        map: map
    });

    addPopUp(marker, context_data);
}

function addPopUp(marker, content) {


    google.maps.event.addListener(marker, 'çlick', function (e) {

        alert("come on0");
        console.log(e);
        popup.setContent(content);
        popup.open(map, marker);
    });
    popup.open(map, marker);

}
*/


$("#start").live('click',function(){

    WINDOW = parseInt($("#window").val());

    if(WINDOW==''){
        WINDOW=3000;
    }

    location_id = navigator.geolocation.watchPosition(
        //SUCCESS
        function(current_location){
            route_data.push(current_location);
            getSCKData();

        },
        //FAIL
        function(error_message){
            console.log(error_message);
        },
        //update every 30 seconds
        { enableHighAccuracy:true,frequency:WINDOW}
    );

    route_id = $("#route_id").val();
    var time_now;
    if(route_id ==''){
        time_now = new Date().toLocaleString();
        route_id = "Route " + time_now;
        $("#route_id").val(route_id);
    }


    //$("#clear").hide();
    $("#status").html("tracking in progress");
    //$("#stop").show();

});

$("#stop").live('click', function(){

    navigator.geolocation.clearWatch(location_id);
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

$('#home').live('pageshow', function () {

    $("#status").val("");

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
    //$("#list").listview('refresh');

});

$("#history a").live('click', function(){

    $("#route").attr("route_id", $(this).text());

});

$('#route').live('pageshow', function(){

    var current_route_id = $(this).attr("route_id");
    var current_route_data = window.localStorage.getItem(current_route_id);
    current_route_data = JSON.parse(current_route_data);
    //alert(current_route_data[0]);
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
    for(i=0; i<current_route_data.length; i++){
        position = new google.maps.LatLng(current_route_data[i].coords.latitude, current_route_data[i].coords.longitude);
        route_coordinates.push(position);

        marker = new google.maps.Marker({
            position: position,
            optimized: false,
            clickable: true,
            map: map
        });
/*
        google.maps.event.addListener(marker, 'çlick', function (e) {

            alert("come on0");
            console.log(e);
            popup.setContent(content);
            popup.open(map, this);
        });
        popup.open(map, marker);
*/

    }

    var route_display = new google.maps.Polyline({
        path: route_coordinates,
        strokeColor: "#000000",
        strokeOpacity: 1.0,
        strokeWeight: 1
    });

    route_display.setMap(map);


});