/**
 * Created by Peter Yordanov on 25.1.2015 г..
 */


/* POINT VISUALIZATION */

function generatePointVis(dataReading, visible, map, num) {

    /*
     var labelText = '<div>Noise: ' + dataReading.noise + '</div>';
     var myOptions = {
     content: labelText,
     boxStyle: {
     background: '#000',
     textAlign: "center",
     fontSize: "8pt"
     },
     position:position,
     closeBoxURL: ""
     };
     var label = new InfoBox(myOptions);
     label.setMap(map);
     */

    var noiseRadius = rangePercentage(dataReading.noise, minNoise, maxNoise) / 10;
    var coRadius = rangePercentage(dataReading.co, minCO, maxCO) / 10;
    var no2Radius = rangePercentage(dataReading.no2, minNO2, maxNO2) / 10;


    var pollutionOptions = {
        //strokeColor: '#FF0000',
        //strokeOpacity: 0.8,
        strokeWeight: 0,
        fillColor: '#FF0000',
        fillOpacity: noiseRadius / 10,
        center: position,
        map: map,
        visible: visible,
        radius: noiseRadius
    };

    var noiseCircle = new google.maps.Circle(pollutionOptions);
    var coCircle = new google.maps.Circle(pollutionOptions);
    var no2Circle = new google.maps.Circle(pollutionOptions);

    var element = {noiseCircle: noiseCircle, coCircle: coCircle, no2Circle: no2Circle, noise: noiseRadius, co: coRadius, no2: no2Radius};

    //bindWindow(circle, num);
    POINT_VISUALIZATION.push(element);
}