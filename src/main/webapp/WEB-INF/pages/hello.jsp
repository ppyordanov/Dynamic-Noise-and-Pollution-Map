<!DOCTYPE html>
<html lang="en">
<head>


    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
    <style>
        #gmap_canvas {
            display:block;
            position:absolute;
            height:auto;
            bottom:0;
            top:0;
            left:0;
            right:0;
        }

        html, body {
            width:100%;height:100%;margin:0;padding:0;
        }

        .fill {
            top: 50px;
            left: 0;
            right: 0;
            bottom: 0;
            position: absolute;
            width: auto;
            height: auto;
        }



    </style>
    <script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script>

    <script type="text/javascript">
        var citymap = {};
        citymap['chicago'] = {
            center: new google.maps.LatLng(55.872912, -4.289657),
            population: 2714856
        };
        citymap['newyork'] = {
            center: new google.maps.LatLng(55.872915, -4.289657),
            population: 8405837
        };
        citymap['losangeles'] = {
            center: new google.maps.LatLng(58.872912, -6.289657),
            population: 3857799
        };
        citymap['vancouver'] = {
            center: new google.maps.LatLng(54.872912, -5.289657),
            population: 603502
        };

        var cityCircle;


        function init_map() {
            var myOptions = {
                zoom: 16,
                center: new google.maps.LatLng(55.872912, -4.289657),
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                disableDefaultUI: true};

            map = new google.maps.Map(
                    document.getElementById("gmap_canvas"),
                    myOptions);

            marker = new google.maps.Marker({
                map: map, position: new google.maps.LatLng(55.872912, -4.289657)});

            infowindow = new google.maps.InfoWindow({
                content: "<b>The Breslin</b><br/>2880 Broadway<br/> New York" });


            google.maps.event.addListener(marker, "click", function () {
                infowindow.open(map, marker);
            });
            infowindow.open(map, marker);



            for (var city in citymap) {
                var populationOptions = {
                    strokeColor: '#FF0000',
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: '#FF0000',
                    fillOpacity: 0.35,
                    map: map,
                    center: citymap[city].center,
                    radius: Math.sqrt(citymap[city].population) /100
                };
                // Add the circle for this city to the map.
                cityCircle = new google.maps.Circle(populationOptions);
            }

        }
        google.maps.event.addDomListener(window, 'load', init_map);



    </script>


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