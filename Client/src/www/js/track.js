var location_id = null;
var route_data = [];
var context_data = [];
var route_id = '';
var MIN_INTERVAL = 500;
var DEFAULT_WINDOW = 30*1000;
var WINDOW = DEFAULT_WINDOW;
var popup = new google.maps.InfoWindow({});
var map;
var probe = 0;

var trackIntervalId;
var sample_data;
var DATA_SOURCE = 'http://api.smartcitizen.me/v0.0.1/084122509ae13c389bf752915861249cff652249/lastpost.json';

document.addEventListener("deviceready", function(){

    if(navigator.network.connection.type == Connection.NONE){
        $("#connection").html('You need to be connected to the Internet to use this application.');
            //.attr("data-icon", "delete")
            //.button('refresh');
    }

});

//getSCKData();
function getSCKData(location, routeId)
{
    sample_data = {
        no2: "",
        co: "",
        noise: "",
        battery: "",
        latitude: "",
        longitude: "",
        routeId: ""
    };


    var json_obj = getSCKReading(DATA_SOURCE);

    var no2 = json_obj.devices[0].posts.no2;
    var co = json_obj.devices[0].posts.co;
    var noise = json_obj.devices[0].posts.noise;
    var battery = json_obj.devices[0].posts.bat;

    var latitude = location.coords.latitude;
    var longitude = location.coords.longitude;

    sample_data.no2 = no2;
    sample_data.co = co;
    sample_data.noise = noise;
    sample_data.battery = battery;
    sample_data.latitude = latitude;
    sample_data.longitude = longitude;
    sample_data.routeId = routeId;
    context_data.push(sample_data);

    $("#probe").html("<br>Probe " + probe + "<br>noise " + noise + "<br>co " + co + "<br> no2 "+ no2 + "<br> battery "+ battery + "<br> latitude "+ latitude + "<br> longitude "+ longitude);
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

function generateData(current_location){

    var date = new Date();
    var time_ms = date.getTime();

    route_data.push(current_location);
    getSCKData(current_location, time_ms);

}

function localize(){

    var options = {
        enableHighAccuracy: true,
        timeout:5000,
        maximumAge: 0
    };

    var GEO_LOCATION = {};

    /*

     navigator.geolocation.getCurrentPosition(

     //SUCCESS
     function(start_location){

     generateData(start_location);
     console.log("tracking from: " + start_location);

     },
     //FAIL
     function(error_message){
     console.log(error_message);
     }, options

     );


     */

    var start_location_loaded = false

    location_id = navigator.geolocation.watchPosition(
        //SUCCESS
        function(current_location){

            //trackIntervalId = setInterval(generateData(current_location), WINDOW);
            GEO_LOCATION.location = current_location;

            if(start_location_loaded==false){
                generateData(GEO_LOCATION.location);
                start_location_loaded = true;
            }

        },
        //FAIL
        function(error_message){
            console.log(error_message);
        },
        options

    );

    trackIntervalId = setInterval(function(){

        generateData(GEO_LOCATION.location);

    }, WINDOW);

}

$("#start").live('click',function(){

    //checking time window value
    //window at least 30 seconds
    var winVal = $("#window").val();
    if(winVal!='' && isNaN(winVal)==false && winVal >= 30000){
        WINDOW = parseInt(winVal);
    }

    //alert(WINDOW);

    //update location every x seconds, 30 by default
    localize();


    route_id = $("#route_id").val();
    $("#window").val(WINDOW);

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

    //stop getting current location
    clearInterval(trackIntervalId);

    navigator.geolocation.clearWatch(location_id);
    //JSONroute = JSON.stringify(context_data);
    window.localStorage.setItem(route_id,JSON.stringify(route_data));
/*
    $.ajax({
        url:"http://127.0.0.1:8080/addRoute",
        //url:"http://178.62.100.239:8080/addRoute",
        type:"GET",
        //crossDomain: true,
        dataType: "jsonp",
        //contentType: "application/javascript",
        data: "{'go'}",
        async: false,
        cache: false,
        processData:false,
        success: function(response)
    {
        console.log(response);
        return response;
    }});
*/

    //if there is data to be transmitted, send to server
    if(context_data.length !=0){

        /*
        var nSample = Math.floor(WINDOW/MIN_INTERVAL);
        //alert(nSample);
        var filteredContextData = [];
        for(var i=0;i<context_data.length;i+=nSample){
            filteredContextData.push(context_data[i]);
        }

        var dataReadings2 ={json:JSON.stringify(context_data)};
        var dataReadings ={json:JSON.stringify(filteredContextData)};

        console.log(dataReadings2);
        console.log(dataReadings);
        */

        var dataReadings ={json:JSON.stringify(context_data)};
        console.log(dataReadings);


        //alert for debugging
        //alert(context_data[0].latitude + " " + context_data[1].latitude);

        $.ajax({
            type: 'POST',
            //url: "http://127.0.0.1:8080/addRoute",
            //url:"http://178.62.100.239/addRoute",
            url:"http://ugmap.me/addRoute",
            data: dataReadings,
            dataType: "json",
            success: function(response)
            {
                console.log(response);
            }
        });

    }

    //RESET
    route_id=null;
    route_data=[];
    context_data=[];

    $("#route_id").val("");
    $("#status").html("completed tracking and transmitted data to server");

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

        /*
        marker = new google.maps.Marker({
            position: position,
            optimized: false,
            clickable: true,
            map: map
        });
        */
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