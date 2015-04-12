/**
 * Created by Peter Yordanov on 28.1.2015 г..
 */


/* LOCATIONS */

var places;

function findClosestCampusLocation(source){
    var closest = "";
    var currentMinimumDistance = Number.MAX_VALUE;
    var location, distance;
    places.forEach(function (entry) {
        location = new google.maps.LatLng(entry.loc[0], entry.loc[1]);
        distance = retrieveDistance(source, location);
        if(distance<currentMinimumDistance){
            currentMinimumDistance = distance;
            closest = entry;
        }
    });
    return closest;
}

$(document).ready(function () {

    $.getJSON("/resources/locations/locations.json", function(json) {
        places = json; //load locations from file
        places.sort(compareFieldValue);

        var locationsContent = "<div class='panel-group' id='accordionL' role='tablist' aria-multiselectable='true'>";
        var content = null;
        var index = 0;
        var sViewImage;
        places.forEach(function (entry) {
                sViewImage = "<img class='streetViewImage' src='https://maps.googleapis.com/maps/api/streetview?size=200x120&location=" + entry.loc[0] + "," + entry.loc[1] + "&heading=34&pitch=10&fov=120'>";
                content = "<div class='row'><div class='col-xs-6 col-md-6'>" + sViewImage + "</div>";
                content += "<div class='col-xs-6 col-md-6'></div><b>Latitude:</b> " + entry.loc[0] + "<br>" + "<b>Longitude:</b>" + entry.loc[1];
                content += "<br><button type='button' class='btn btn-primary left' onclick='panAndZoom(" + entry.loc[0] + "," + entry.loc[1] + ");' data-dismiss='modal'>View</button>";
                content += "</div>";
                locationsContent+=
                    "<div class='panel panel-primary'><div class='panel-heading' role='tab' id='heading" + index + "'>" +
                    "<h4 class='panel-title'><a class='collapsed' data-toggle='collapse' data-parent='#accordionL' href='#collapse" + index + "' aria-expanded='false' aria-controls='collapse" + index + "'>" + entry.label + "  </a></h4></div>" +
                    " <div id='collapse" + index + "' class='panel-collapse collapse' role='tabpanel' aria-labelledby='heading" + index + "'>" +
                    " <div class='panel-body'>" + content + "</div></div></div>";

                index++;
            }
        );
        locationsContent += "</div>";
        $('#locationsAccordion').html(locationsContent);
    });

    $('#view').on('click', function () {
    });

});