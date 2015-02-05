/**
 * Created by Peter Yordanov on 2.2.2015 г..
 */

function getSCKData(location, routeId) {
    sample_data = {
        no2: "",
        co: "",
        noise: "",
        battery: "",
        latitude: "",
        longitude: "",
        routeId: "",
        timestamp: "",
        light: "",
        hum: "",
        temp: ""
    };


    var json_obj = getSCKReading();

    var no2 = json_obj.devices[0].posts.no2;
    var co = json_obj.devices[0].posts.co;
    var noise = json_obj.devices[0].posts.noise;
    var battery = json_obj.devices[0].posts.bat;
    //var timestamp = json_obj.devices[0].posts.timestamp;
    var timestamp = new Date();
    var id = json_obj.devices[0].id;
    //var light = json_obj.devices[0].light;
    //var humidity = json_obj.devices[0].hum;
    //var temperature = json_obj.devices[0].temperature;

    var latitude = location.coords.latitude;
    var longitude = location.coords.longitude;

    sample_data.no2 = no2;
    sample_data.co = co;
    sample_data.noise = noise;
    sample_data.battery = battery;
    sample_data.latitude = latitude;
    sample_data.longitude = longitude;
    sample_data.routeId = routeId;
    sample_data.deviceId = id;
    sample_data.timestamp = timestamp;
    context_data.push(sample_data);

    $("#probe").html("<br><b>Probe:</b> " +
        probe + "<br><b>Noise:</b> " + noise + " dB" +
        "<br><b>CO:</b> " + co + " kOhm" +
        "<br><b>NO2:</b> " + no2 + " kOhm" +
        "<br><b>Battery:</b> " + battery + " %" +
        "<br><b>Latitude:</b> " + latitude +
        "<br><b>Longitude:</b> " + longitude +
        "<br><b>Time:</b> " + timestamp);
    probe++;


}

function getDeviceData(){

    /*
     var form_data = {
     "devices": [
     {
     "id": "12a",
     "title": "12a",
     "description": "12a",
     "location": "12a",
     "city": "12a",
     "country": "12a"
     }
     ]
     };
     */

    var form_data = {
        devices: [
            {
                id: "",
                title: "",
                description: "",
                location: "",
                created: "",
                kit_version: ""
            }
        ]
    };

    return JSON.parse($.ajax({
        type: "POST",
        url: DATA_SOURCE,
        data: form_data,
        async: false,
        global: false,
        dataType: "json",
        success: function (response) {
            console.log(response);
            return response;
        }
    }).responseText);

}

function getUserData() {
    var form_data = {
        "me": {
            "id": "",
            "username": "",
            "city": "",
            "country": "",
            "website": "",
            "email": "",
            "created": ""
        }
    };

    return JSON.parse($.ajax({
        type: "POST",
        url: DS2,
        data: form_data,
        async: false,
        global: false,
        dataType: "json",
        success: function (response) {
            console.log(response);
            return response;
        }
    }).responseText);
}

function getSCKReading() {

    var form_data = {
        devices: [
            {
                id:"",
                posts: {
                    timestamp: "",
                    temp: "",
                    hum: "",
                    co: "",
                    no2: "",
                    light: "",
                    noise: "",
                    bat: ""
                }
            }
        ]
    };
    return JSON.parse($.ajax({
        type: "POST",
        url: DATA_SOURCE,
        data: form_data,
        async: false,
        global: false,
        dataType: "json",
        success: function (response) {
            console.log(response);
            return response;
        }
    }).responseText);
}

function generateData(current_location) {

    var date = new Date();
    var time_ms = date.getTime();

    route_data.push(current_location);
    getSCKData(current_location, time_ms);

}

function localize() {

    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    var GEO_LOCATION = {};

    var start_location_loaded = false;

    location_id = navigator.geolocation.watchPosition(
        //SUCCESS
        function (current_location) {

            //trackIntervalId = setInterval(generateData(current_location), WINDOW);
            GEO_LOCATION.location = current_location;

            if (start_location_loaded == false) {
                generateData(GEO_LOCATION.location);
                start_location_loaded = true;
            }

        },
        //FAIL
        function (error_message) {
            console.log(error_message);
        },
        options
    );

    trackIntervalId = setInterval(function () {

        generateData(GEO_LOCATION.location);

    }, WINDOW);

}