/**
 * Created by Peter Yordanov on 28.1.2015 г..
 */


/* LOCATIONS */

var places = [
    {label: "Adam Smith Building", loc: [55.873727, -4.289915]},
    {label: "Boyd Orr Building", loc: [55.873525, -4.292630]},
    {label: "Stevenson Building", loc: [55.872863, -4.285314]},
    {label: "University Library", loc: [55.873257, -4.288472]},
    {label: "Main Building", loc: [55.871948, -4.288302]},
    {label: "University Library", loc: [55.873257, -4.288472]},
    {label: "Kelvin Building", loc: [55.871809, -4.291616]},
    {label: "Sir Alexander Stone Building", loc: [55.873539, -4.290988]},
    {label: "Hunterian Art Gallery", loc: [55.873022, -4.288998]},
    {label: "McMillan Reading Room", loc: [55.872739, -4.287979]},
    {label: "Rankine Building", loc: [55.872474, -4.285683]},
    {label: "Thomson Building", loc: [55.871502, -4.286885]},
    {label: "James Watt Building", loc: [55.871014, -4.286831]},
    {label: "Davidson Building", loc: [55.870945, -4.291450]},
    {label: "Wolfson Building", loc: [55.870852, -4.292088]},
    {label: "Graham Kerr Building", loc: [55.871457, -4.293054]},
    {label: "Western Infirmary Lecture Theatre", loc: [55.871956, -4.294180]},
    {label: "Bower Building", loc: [55.872384, -4.291466]},
    {label: "Wolfson Medical School Building", loc: [55.873148, -4.293478]},
    {label: "Sir Alwyn Williams Building", loc: [55.873949, -4.291857]},
    {label: "LilyBank House", loc: [55.874033, -4.290484]},
    {label: "Mathematics Buildind", loc: [55.873280, -4.291777]},
    {label: "Hetherington Building", loc: [55.874198, -4.288843]},
    {label: "Fraser Building", loc: [55.873106, -4.287748]},
    {label: "Wellington Church", loc: [55.872486, -4.287078]},
    {label: "Kelvin Gallery", loc: [55.871827, -4.289122]},
    {label: "Sir Charles Wilson Building", loc: [55.872627, -4.284068]},
    {label: "Sir Graeme Davies Building", loc: [55.873311, -4.294223]},
    {label: "Gregory Building", loc: [55.874060, -4.292882]},
    {label: "Hillhead High School", loc: [55.874265, -4.285447]},
    {label: "Florentine House", loc: [55.873587, -4.287909]},
    {label: "Glasgow University Union", loc: [55.872633, -4.284855]},
    {label: "Queen Margaret Union", loc: [55.873701, -4.291456]}

];


$(document).ready(function () {

    var locationsContent = "<div class='panel-group' id='accordionL' role='tablist' aria-multiselectable='true'>";
    var content = null;
    var index = 0;

    places.sort(compareFieldValue);

    places.forEach(function (entry) {


                content = "<b>Latitude:</b> " + entry.loc[0] + "<br>" + "<b>Longitude:</b>" + entry.loc[1];
                content += "<button type='button' class='btn btn-primary right' onclick='panAndZoom(" + entry.loc[0] + "," + entry.loc[1] + ");' data-dismiss='modal'>View</button>";
                locationsContent +=
                "<div class='panel panel-default'><div class='panel-heading' role='tab' id='heading" + index + "'>" +
                "<h4 class='panel-title'><a data-toggle='collapse' data-parent='#accordionL' href='#collapse" + index + "' aria-expanded='false' aria-controls='collapse" + index + "'>" + entry.label + "  </a></h4></div>" +
                " <div id='collapse" + index + "' class='panel-collapse collapse' role='tabpanel' aria-labelledby='heading" + index + "'>" +
                " <div class='panel-body'>" + content + "</div></div></div>";

            index++;
        }
    );
    locationsContent += "</div>";
    $('#locationsAccordion').html(locationsContent);

    $('#view').on('click', function () {});

});

function panAndZoom(latitude, longitude){
    var center = new google.maps.LatLng(latitude,longitude);
    map.panTo(center);
    map.setZoom(18);
}

function compareFieldValue(a,b) {
    if (a.label < b.label)
        return -1;
    if (a.label > b.label)
        return 1;
    return 0;
}