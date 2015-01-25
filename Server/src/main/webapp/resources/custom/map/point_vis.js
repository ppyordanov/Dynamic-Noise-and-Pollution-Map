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

    var noisePercentage = rangePercentage(dataReading.noise, minNoise, maxNoise);
    var pollutionOptions = {
        //strokeColor: '#FF0000',
        //strokeOpacity: 0.8,
        strokeWeight: 0,
        fillColor: '#FF0000',
        fillOpacity: noisePercentage / 100,
        center: position,
        map: map,
        visible: visible,
        radius: noisePercentage/10
    };

    var circle = new google.maps.Circle(pollutionOptions);
    var element = {"circle": circle, "noise": dataReading.noise, "co": dataReading.co, "no2": dataReading.no2};

    //bindWindow(circle, num);
    POINT_VISUALIZATION.push(element);
}