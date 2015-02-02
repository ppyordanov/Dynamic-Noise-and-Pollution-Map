/**
 * Created by Peter Yordanov on 25.1.2015 г..
 */

/* USER INTERFACE */

$(document).ready(function () {

    //$("#loader_container").hide();

    logPageLoadingTime();

    //hide collapsed menu on click
    $('.nav a').on('click', function () {
        $(".navbar-toggle").click();
    });


    $('#style0').click(function () {
        map.setMapTypeId('CLASSIC');
    });
    $('#style1').click(function () {
        map.setMapTypeId(styledMap5);
    });
    $('#style2').click(function () {
        map.setMapTypeId('GRAYSCALE_DEFAULT');
    });
    $('#style3').click(function () {
        map.setMapTypeId('BLUE_HUE');
    });
    $('#style4').click(function () {
        map.setMapTypeId('DARK_BLUE');
    });
    $('#style5').click(function () {
        map.setMapTypeId('ROADS');
    });

    $('#styleDropdown .dropdown-menu').on({
        "click": function (e) {
            e.stopPropagation();
        }
    });
    $('#uiDropdown .dropdown-menu').on({
        "click": function (e) {
            e.stopPropagation();
        }
    });


    $('#accordionM').find('input[type=checkbox]:checked').removeAttr('checked');

    $("#gridOptions :input").attr("disabled", true);
    $("#heatmapOptions :input").attr("disabled", true);
    $("#pointvisOptions :input").attr("disabled", true);
    $("#markersOptions :input").attr("disabled", true);
    $("#routesOptions :input").attr("disabled", true);

    $('#grid').on('click', function () {
        $("#gridOptions :input").attr("disabled", !$('#grid').is(':checked'));
    });
    $('#markers').on('click', function () {
        $("#markersOptions :input").attr("disabled", !$('#markers').is(':checked'));
    });
    $('#userroutes').on('click', function () {
        $("#routesOptions :input").attr("disabled", !$('#userroutes').is(':checked'));
    });
    $('#heatmap').on('click', function () {
        $("#heatmapOptions :input").attr("disabled", !$('#heatmap').is(':checked'));
    });
    $('#pointvis').on('click', function () {
        $("#pointvisOptions :input").attr("disabled", !$('#pointvis').is(':checked'));
    });


    $('#style_apply').click(function () {
        var selected = $("input:radio[name='style']:checked").val();
        if (selected == 'SATELLITE') {
            map.setMapTypeId(styledMap5);
        }
        else {
            map.setMapTypeId(selected);
        }

        /*
         $(".alert").removeClass("in").show();
         $(".alert").delay(200).addClass("in").fadeOut(1500);
         */
    });

    $('#mode_apply').click(function () {
        var selected = retrieveModes();
        renderMap(selected);
    });


    $("#UI").click(function () {
        toggleMapControls()
    });

    $("#endisUI").click(function () {
        var value = (this.checked ? true : false);
        if (value) {
            $('#UI').find('input[type=checkbox]').prop("checked", true);
        }
        else {
            $('#UI').find('input[type=checkbox]:checked').removeAttr('checked');
        }
        toggleMapControls();
    });

});


//update values;
//toggleMapControls();

function toggleMapControls() {

    $("input[name*='styleOpts']").each(function () {
        var value = (this.checked ? true : false);
        var type = $(this).attr("value");
        map.set(type, value);
    });

}


function retrieveModes() {
    var selectedModes = [];
    $("input[name*='mode']").each(function () {
        var value = (this.checked ? true : false);
        //alert(value);
        selectedModes.push(value);
    });
    return selectedModes;
}

function renderMap(modes) {

    toggleMarkers(modes[0]);
    toggleRoutes(modes[1]);
    toggleHeatMap(modes[2]);
    toggleGrid(modes[3]);
    togglePointVis(modes[4]);

}