var minLatBounds = 55.870056;
var maxLatBounds = 55.875209;
var minLonBounds = -4.278797;
var maxLonBounds = -4.297637;

function randomPosGen(lowLatBounds, highLatBounds, lowLonBounds, highLonBounds) {

    var center;

    var multiplier = 10000000;
    var lat = Math.random() * ((highLatBounds - lowLatBounds) * multiplier) + lowLatBounds * multiplier;
    var lon = Math.random() * ((highLonBounds - lowLonBounds) * multiplier) + lowLonBounds * multiplier;

    center = new google.maps.LatLng(lat / multiplier, lon / multiplier);


    return center;

}


var style1 = [
    {
        stylers: [
            { hue: "#00ffe6" },
            { saturation: -100 }
        ]
    },
    {
        featureType: "road",
        elementType: "geometry",
        stylers: [
            { lightness: 100 },
            { visibility: "simplified" }
        ]
    },
    {
        featureType: "road",
        elementType: "labels",
        stylers: [
            { visibility: "off" }
        ]
    }
];

var style2 = [
    {
        stylers: [
            { hue: "#ff9f67" },
            { saturation: -20 },
            { gamma: 1.50 }
        ]
    },{
        featureType: "road",
        elementType: "geometry",
        stylers: [
            { lightness: 100 },
            { visibility: "simplified" }
        ]
    },{
        featureType: "road",
        elementType: "labels.text.stroke",
        stylers: [
            { visibility: "off" }
        ]
    },

    {
        featureType: "water",
        elementType: "geometry.fill",
        stylers: [
            { visibility: "on" },
            { color: "#ffa066" },
            { lightness: 80 }
        ]
    }
];

var styles = [style1, style2];

var styledMap = new google.maps.StyledMapType(styles[0],
    {name: "Styled Map"});

var campusMap = {};
var dataCircle = {};

campusMap['ug1'] = {
    //center: new google.maps.LatLng(55.872912, -4.289657),
    pollution: 2714856,
    noise: 3000000
};
campusMap['ug2'] = {
    pollution: 100000,
    noise: 4000000
};
campusMap['ug3'] = {
    pollution: 300000,
    noise: 6000000

};
campusMap['ug4'] = {
    pollution: 300000,
    noise: 6000000

};
campusMap['ug5'] = {
    pollution: 300000,
    noise: 6000000

};
campusMap['ug6'] = {
    pollution: 300000,
    noise: 6000000

};
campusMap['ug7'] = {
    pollution: 300000,
    noise: 6000000

};
campusMap['ug8'] = {
    pollution: 300000,
    noise: 6000000

};



function progressEvaluate(value, benchmark){


    var progress = (value/benchmark)*100;
    var progressContent ='<div class="progress"><div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style="width: '+ progress + '%"><span class="sr-only">45% Complete</span></div></div>'
    return progressContent;
}



function init_map() {

    var myOptions = {
        zoom: 16,
        minZoom: 16,
        maxZoom: 18,
        center: new google.maps.LatLng(55.872912, -4.289657),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: false
    };

    map = new google.maps.Map(
        document.getElementById("gmap_canvas"),
        myOptions);

    var frameBorder = new google.maps.LatLngBounds(
        new google.maps.LatLng(55.870056, -4.297637),
        new google.maps.LatLng(55.875209, -4.278797)
    );

    var lastCenter = map.getCenter();

    google.maps.event.addListener(map, 'center_changed', function () {
        if (frameBorder.contains(map.getCenter())) {
            // still within valid bounds, so save the last valid position
            lastCenter = map.getCenter();
            return;
        }

        // not valid anymore => return to last valid position
        map.panTo(lastCenter);
    });

    /*

    marker = new google.maps.Marker({
        map: map, position: new google.maps.LatLng(55.872912, -4.289657)});

    infowindow = new google.maps.InfoWindow({
        content: "<b>Macintosh house</b><br/>description" });




    google.maps.event.addListener(marker, "click", function () {
        infowindow.open(map, marker);
    });
    infowindow.open(map, marker);


    */



    //alert(dataReadings[0].co);
    var radiusNoise;
    var radiusPollution;
    var latitude, longitude, position;


/*
    for (var i=0;i<dataReadings.length/50;i++) {

        radiusNoise = parseFloat(dataReadings[i].noise)/5;
        radiusPollution =parseFloat(dataReadings[i].co)/5;
        latitude = parseFloat(dataReadings[i].latitude);
        longitude = parseFloat(dataReadings[i].longitude);
        position = new google.maps.LatLng(latitude, longitude);

        var pollutionOptions = {
            //strokeColor: '#FF0000',
            //strokeOpacity: 0.8,
            strokeWeight: 0,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            map: map,
            label: 'gogodi',
            center: position,
            //center: campusMap[reading].center,
            radius: radiusPollution
        };

        var noiseOptions = {
            //strokeColor: '#FF0000',
            //strokeOpacity: 0.8,
            strokeWeight: 0,
            fillColor: '#00FF00',
            fillOpacity: 0.35,
            map: map,
            center: position,
            radius: radiusNoise
        };

        pollutionCircle = new google.maps.Circle(pollutionOptions);
        noiseCircle = new google.maps.Circle(noiseOptions);
    }

*/
    var popup;
    var marker;

    var maxNoise = 500;
    var maxCO = 500;
    var maxNO2 = 500;
    var maxBattery = 100;



    for (var i=0;i<dataReadings.length/50;i++) {

        id = dataReadings[i].id;
        noise = parseFloat(dataReadings[i].noise);
        co =parseFloat(dataReadings[i].co);
        no2 =parseFloat(dataReadings[i].no2);
        //alert(dataReadings[i].timestamp);
        battery = parseFloat(dataReadings[i].battery);
        latitude = parseFloat(dataReadings[i].latitude);
        longitude = parseFloat(dataReadings[i].longitude);

        //position =randomPosGen(minLatBounds, maxLatBounds, minLonBounds, maxLonBounds);
        position = new google.maps.LatLng(latitude, longitude);

        var image = '/resources/sck_logo4.png';


        var marker = new google.maps.Marker({
            position: position,
            map: map,
            animation: google.maps.Animation.DROP,
            icon: image
        });

        var content = "Noise: " + noise.toString() + progressEvaluate(noise,maxNoise) + "CO: " + co.toString() + progressEvaluate(co,maxCO) + "NO2: " + no2.toString() + progressEvaluate(no2, maxNO2) + "Battery: " + battery.toString() + progressEvaluate(battery,maxBattery);
        var styledContent = '<div class="mapPopUp">' + content + '</div>';
        var popup = new google.maps.InfoWindow({});
        popup=new google.maps.InfoWindow({
            content: "Loading.."

        });



        google.maps.event.addListener(marker, 'mouseover', function(e) {
            console.log(e);
            popup.setContent(styledContent);
            popup.open(map, this);
        });

/*
        pollutionCircle = new google.maps.Circle(pollutionOptions);
        noiseCircle = new google.maps.Circle(noiseOptions);
        */
    }

    map.mapTypes.set('map_style', styledMap);
    map.setMapTypeId('map_style');

}

google.maps.event.addDomListener(window, 'load', init_map);

