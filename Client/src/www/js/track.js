

document.addEventListener("deviceready", function(){

    if(navigator.network.connection.type == Connection.NONE){
        $("#connection").html('You need to be connected to the Internet to use this application.');
            //.attr("data-icon", "delete")
            //.button('refresh');
    }

});


var location_id = null;
var route_data = [];
var route_id = '';

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
        $("#route_id").hide();
        $("#start").hide();
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

    $("#route_id").val("").show();
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
        $("#list").append("<li><a href='#info' data-ajax='false'>" + route + "</a></li>");
    }
    $("#list").listview('refresh');

});

$("#list li a").live('click', function(){

    $("#info").attr("route_id", $(this).text());

});