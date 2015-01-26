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

    /*
     $('#style0').click(function () {
     map.setMapTypeId('CLASSIC');
     });
     $('#style1').click(function () {
     map.setMapTypeId('GRAYSCALE_DEFAULT');
     });
     $('#style2').click(function () {
     map.setMapTypeId('BLUE_HUE');
     });
     $('#style3').click(function () {
     map.setMapTypeId('DARK_BLUE');
     });
     $('#style4').click(function () {
     map.setMapTypeId('CLEAN_CLASSIC');
     });
     $('#style5').click(function () {
     map.setMapTypeId('ROADS');
     });
     $('#style6').click(function () {
     map.setMapTypeId(styledMap6);
     });

     */

    $('#grid').on('click', function() {
        var selected = $(this).val();

        if(selected) {
            $("input[name*='gridValue']").prop('disabled', !$(this).is(':checked'));
            $("input[name*='outline']").prop('disabled', !$(this).is(':checked'));
            $("input[name*='gradient']").prop('disabled', !$(this).is(':checked'));
        }
    });


    $('#style_apply').click(function () {
        var selected = $("input:radio[name='style']:checked").val();
        if (selected == 'SATELLITE') {
            map.setMapTypeId(styledMap6);
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


});




function retrieveModes() {
    var selectedModes = [];
    $("input[name*='mode']").each(function () {
        var value = (this.checked ? true : false);
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