var minLatBounds = 55.870056;
var maxLatBounds = 55.875209;
var minLonBounds = -4.278797;
var maxLonBounds = -4.297637;

function randomPosGen(lowLatBounds, highLatBounds, lowLonBounds, highLonBounds){

    var center;

    var multiplier = 10000000;
    var lat = Math.random() * ((highLatBounds - lowLatBounds)*multiplier) + lowLatBounds*multiplier;
    var lon = Math.random() * ((highLonBounds - lowLonBounds)*multiplier) + lowLonBounds*multiplier;

    center = new google.maps.LatLng(lat/multiplier, lon/multiplier);


    return center;

}

var styles = [
    {
        stylers: [
            { hue: "#00ffe6" },
            { saturation: -20 }
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
        elementType: "labels",
        stylers: [
            { visibility: "off" }
        ]
    }
];

var styledMap = new google.maps.StyledMapType(styles,
    {name: "Styled Map"});

var campusMap = {};
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


var dataCircle;


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

    google.maps.event.addListener(map, 'center_changed', function() {
        if (frameBorder.contains(map.getCenter())) {
            // still within valid bounds, so save the last valid position
            lastCenter = map.getCenter();
            return;
        }

        // not valid anymore => return to last valid position
        map.panTo(lastCenter);
    });


    marker = new google.maps.Marker({
        map: map, position: new google.maps.LatLng(55.872912, -4.289657)});

    infowindow = new google.maps.InfoWindow({
        content: "<b>Macintosh house</b><br/>description" });


    google.maps.event.addListener(marker, "click", function () {
        infowindow.open(map, marker);
    });
    infowindow.open(map, marker);



    for (var reading in campusMap) {

        var position = randomPosGen(minLatBounds, maxLatBounds, minLonBounds,maxLonBounds);

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
            radius: Math.sqrt(campusMap[reading].pollution) /40
        };

        var noiseOptions = {
            //strokeColor: '#FF0000',
            //strokeOpacity: 0.8,
            strokeWeight: 0,
            fillColor: '#999999',
            fillOpacity: 0.35,
            map: map,
            center: randomPosGen(minLatBounds, maxLatBounds, minLonBounds,maxLonBounds),
            radius: Math.sqrt(campusMap[reading].pollution) /40
        };
        // Add the circle for this city to the map.
        pollutionCircle = new google.maps.Circle(pollutionOptions);
        noiseCircle = new google.maps.Circle(noiseOptions);
    }

    map.mapTypes.set('map_style', styledMap);
    map.setMapTypeId('map_style');

}

google.maps.event.addDomListener(window, 'load', init_map);

