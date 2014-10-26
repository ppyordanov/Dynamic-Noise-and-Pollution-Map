<!DOCTYPE html>
<html lang="en">
<head>


    <link type="text/css" href="${pageContext.request.contextPath}/resources/css/bootstrap.css" rel="stylesheet"/>
    <link type="text/css" href="${pageContext.request.contextPath}/resources/main.css" rel="stylesheet"/>
    <script src="${pageContext.request.contextPath}/resources/js/jquery-1.11.1.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/js/bootstrap.min.js"></script>


    <script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script>
    <script src="${pageContext.request.contextPath}/resources/map.js"></script>

    <!--
    <script type="text/javascript">

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
            center: new google.maps.LatLng(55.872912, -4.289657),
            pollution: 2714856
        };
        campusMap['ug2'] = {
            center: new google.maps.LatLng(55.872915, -4.289657),
            pollution: 100000
        };
        campusMap['ug3'] = {
            center: new google.maps.LatLng(55.872633, -4.285449),
            pollution: 300000
        };

        var dataCircle;


        function init_map() {

            var myOptions = {
                zoom: 16,
                minZoom: 16,
                maxZoom: 18,
                center: new google.maps.LatLng(55.872912, -4.289657),
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                disableDefaultUI: true};

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
                content: "<b>The Breslin</b><br/>2880 Broadway<br/> New York" });


            google.maps.event.addListener(marker, "click", function () {
                infowindow.open(map, marker);
            });
            infowindow.open(map, marker);



            for (var reading in campusMap) {
                var dataOptions = {
                    strokeColor: '#FF0000',
                    strokeOpacity: 0.8,
                    strokeWeight: 0,
                    fillColor: '#FF0000',
                    fillOpacity: 0.35,
                    map: map,
                    center: campusMap[reading].center,
                    radius: Math.sqrt(campusMap[reading].pollution) /100
                };
                // Add the circle for this city to the map.
                dataCircle = new google.maps.Circle(dataOptions);
            }

            map.mapTypes.set('map_style', styledMap);
            map.setMapTypeId('map_style');

        }

        google.maps.event.addDomListener(window, 'load', init_map);


    </script>

-->

</head>
<body>


<nav class="navbar navbar-default" role="navigation">
    <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">UG Map</a>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
                <li class="active"><a href="#">Link</a></li>
                <li><a href="#">Link</a></li>

                <!--
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown <span class="caret"></span></a>
                    <ul class="dropdown-menu" role="menu">
                        <li><a href="#">Action</a></li>
                        <li><a href="#">Another action</a></li>
                        <li><a href="#">Something else here</a></li>
                        <li class="divider"></li>
                        <li><a href="#">Separated link</a></li>
                        <li class="divider"></li>
                        <li><a href="#">One more separated link</a></li>
                    </ul>
                </li>
                -->

            </ul>

            <!--
            <form class="navbar-form navbar-left" role="search">
                <div class="form-group">
                    <input type="text" class="form-control" placeholder="Search">
                </div>
                <button type="submit" class="btn btn-default">Submit</button>
            </form>
            -->
            <ul class="nav navbar-nav navbar-right">
                <button type="button" class="btn btn-default navbar-btn">Sign in</button>
                <button type="button" class="btn btn-default navbar-btn">Register</button>
            </ul>
        </div><!-- /.navbar-collapse -->
    </div><!-- /.container-fluid -->
</nav>

<div class="container fill">
    <div id="gmap_canvas"></div>
</div>

</div>
</body>
</html>