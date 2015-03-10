/**
 * Created by Peter Yordanov on 28.1.2015 г..
 */


/* LOCATIONS */

var places = [
    {label: "Adam Smith Building", loc: [55.873727, -4.289915]},
    {label: "Boyd Orr Building", loc: [55.873339, -4.293115]},
    {label: "Stevenson Building", loc: [55.872937, -4.285628]},
    {label: "University Library", loc: [55.873103, -4.288686]},
    {label: "Main Building", loc: [55.871402, -4.288514]},
    {label: "Kelvin Building", loc: [55.871809, -4.291616]},
    {label: "Sir Alexander Stone Building", loc: [55.873539, -4.290988]},
    {label: "Hunterian Art Gallery", loc: [55.872930, -4.288815]},
    {label: "McMillan Reading Room", loc: [55.872513, -4.288069]},
    {label: "Rankine Building", loc: [55.872474, -4.285683]},
    {label: "Thomson Building", loc: [55.871502, -4.286885]},
    {label: "James Watt North Building", loc: [55.871432, -4.286365]},
    {label: "Davidson Building", loc: [55.871203, -4.291460]},
    {label: "Wolfson Building", loc: [55.870852, -4.292088]},
    {label: "Graham Kerr Building", loc: [55.871457, -4.293054]},
    {label: "Western Infirmary Lecture Theatre", loc: [55.871956, -4.294180]},
    {label: "Bower Building", loc: [55.872384, -4.291466]},
    {label: "Wolfson Medical School Building", loc: [55.872784, -4.293219]},
    {label: "Sir Alwyn Williams Building", loc: [55.873746, -4.292042]},
    {label: "LilyBank House", loc: [55.874033, -4.290484]},
    {label: "Mathematics Building", loc: [55.873280, -4.291777]},
    {label: "Hetherington Building", loc: [55.874198, -4.288843]},
    {label: "Fraser Building", loc: [55.873106, -4.287748]},
    {label: "Wellington Church", loc: [55.872486, -4.287078]},
    {label: "Kelvin Gallery", loc: [55.871827, -4.289122]},
    {label: "Sir Charles Wilson Building", loc: [55.872504, -4.284410]},
    {label: "Gregory Building", loc: [55.874107, -4.292782]},
    {label: "Hillhead High School", loc: [55.874265, -4.285447]},
    {label: "Florentine House", loc: [55.873587, -4.287909]},
    {label: "Glasgow University Union", loc: [55.872436, -4.284695]},
    {label: "Queen Margaret Union", loc: [55.873701, -4.291456]},
    {label: "BHF Cardiovascular Research Centre", loc: [55.873087, -4.294970]},
    {label: "Sir Graeme Davis Building", loc: [55.873301, -4.294230]},
    {label: "West Medical Building", loc: [55.870827, -4.292631]},
    {label: "Stair Building", loc: [55.871745, -4.290625]},
    {label: "The Square Building", loc: [55.872265, -4.289981]},
    {label: "James Watt South Building", loc: [55.871016, -4.286875]},
    {label: "Southpark House", loc: [55.873879, -4.287073]},
    {label: "Lilybank Gardens", loc: [55.874523, -4.291601]},
    {label: "Saint Andrew's Building", loc: [55.871514, -4.279415]},
    {label: "John McIntyre Building", loc: [55.872173, -4.288745]},
    {label: "Heatherington House", loc: [55.872918, -4.291214]},
    {label: "George Service House", loc: [55.872846, -4.291128]},
    {label: "Robertson Building", loc: [55.870558, -4.296647]},
    {label: "Joseph Black Building", loc: [55.871991, -4.293372]},
    {label: "Anderson College", loc: [55.870140, -4.296501]},
    {label: "Pontecorvo Building", loc: [55.870169, -4.297109]},
    {label: "University Gardens", loc: [55.873022, -4.290470]},
    {label: "Gilmorehill Centre", loc:[55.872138, -4.284572]}

];


function findClosestCampusLocation(source){
    var closest = "";
    var currentMinimumDistance = Number.MAX_VALUE;
    var location;
    places.forEach(function (entry) {
        location = new google.maps.LatLng(entry.loc[0], entry.loc[1]);
        if(retrieveDistance(source, location)<currentMinimumDistance){
            currentMinimumDistance = retrieveDistance(source, location);
            closest = entry;
        }
    });

    return closest;
}

$(document).ready(function () {

    var locationsContent = "<div class='panel-group' id='accordionL' role='tablist' aria-multiselectable='true'>";
    var content = null;
    var index = 0;

    places.sort(compareFieldValue);

    /*
    var streetViewOptions = {
        position: new google.maps.LatLng(55.873701, -4.291456),
        pov: {
            heading: 34,
            pitch: 10
        },
        linksControl: false,
        panControl: false,
        disableDefaultUI: true
    };

    var map2 = new google.maps.Map(
        document.getElementById("pano"),
        {position: new google.maps.LatLng(55.873701, -4.291456)});
    //streetViewOptions.position = new google.maps.LatLng(55.873701, -4.291456);
    var sViewSetup = new google.maps.StreetViewPanorama(document.getElementById('pano'), streetViewOptions);
    map2.setStreetView(sViewSetup);
    */
    var sViewImage;
    places.forEach(function (entry) {

            sViewImage = "<img class='streetViewImage' src='https://maps.googleapis.com/maps/api/streetview?size=200x120&location=" + entry.loc[0] + "," + entry.loc[1] + "&heading=34&pitch=10&fov=120'>";
            content = "<div class='row'><div class='col-xs-6 col-md-6'>" + sViewImage + "</div>";
            content += "<div class='col-xs-6 col-md-6'></div><b>Latitude:</b> " + entry.loc[0] + "<br>" + "<b>Longitude:</b>" + entry.loc[1];
            content += "<br><button type='button' class='btn btn-primary left' onclick='panAndZoom(" + entry.loc[0] + "," + entry.loc[1] + ");' data-dismiss='modal'>View</button>";
            content += "</div>";
            //content +="<div class='sView' id='sView" + index + "'></div>";
            locationsContent+=
                "<div class='panel panel-primary'><div class='panel-heading' role='tab' id='heading" + index + "'>" +
                "<h4 class='panel-title'><a class='collapsed' data-toggle='collapse' data-parent='#accordionL' href='#collapse" + index + "' aria-expanded='false' aria-controls='collapse" + index + "'>" + entry.label + "  </a></h4></div>" +
                " <div id='collapse" + index + "' class='panel-collapse collapse' role='tabpanel' aria-labelledby='heading" + index + "'>" +
                " <div class='panel-body'>" + content + "</div></div></div>";

            index++;

            /*
            var process= $( content).find('div');
            process.appendTo("#time");
            var map = new google.maps.Map(process);
            streetViewOptions.position = new google.maps.LatLng(entry.loc[0], entry.loc[1]);
            var sViewSetup = new google.maps.StreetViewPanorama(process, streetViewOptions);
            map.setStreetView(sViewSetup);
            */

        }
    );
    locationsContent += "</div>";
    $('#locationsAccordion').html(locationsContent);


    $('#view').on('click', function () {
    });

});