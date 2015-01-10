<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="en">
<head>


    <link type="text/css" href="${pageContext.request.contextPath}/resources/bs/css/bootstrap.css" rel="stylesheet"/>
    <link type="text/css" href="${pageContext.request.contextPath}/resources/main.css" rel="stylesheet"/>
    <script src="${pageContext.request.contextPath}/resources/bs/js/jquery-1.11.1.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/bs/js/bootstrap.min.js"></script>


    <script type="text/javascript"
            src="https://maps.googleapis.com/maps/api/js?v=3.8&libraries=geometry&sensor=false"></script>
    <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=visualization"></script>
    <script src="${pageContext.request.contextPath}/resources/map_styles.js"></script>
    <script src="${pageContext.request.contextPath}/resources/map.js"></script>

    <script type="text/javascript">

        var dataReadings = {};
        var dataReading;

        var routes = [];
        var route;


        <c:forEach items="${dataReadingModels}" var="element">

        dataReading = {};

        dataReading["id"] = "${element.id}";
        dataReading["routeId"] = "${element.routeId}";
        dataReading["deviceId"] = "${element.deviceId}";
        dataReading["timestamp"] = "${element.timestamp}";
        dataReading["latitude"] = "${element.latitude}";
        dataReading["longitude"] = "${element.longitude}";
        dataReading["noise"] = "${element.noise}";
        dataReading["co"] = "${element.co}";
        dataReading["no2"] = "${element.no2}";
        dataReading["battery"] = "${element.battery}";

        var routeId = dataReading["routeId"];

        if (!(routeId in dataReadings)) {
            dataReadings[routeId] = [];
        }
        dataReadings[routeId].push(dataReading);

        </c:forEach>

        <c:forEach items="${routeModels}" var="element">

        route = {};
        route["id"] = "${element.id}";
        route["deviceId"] = "${element.deviceId}";

        routes.push(route);
        </c:forEach>
        console.log(dataReadings);
        //alert(routes.length);

    </script>


</head>
<body>


<nav class="navbar navbar-inverse" role="navigation">
    <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                    data-target="#bs-example-navbar-collapse-1">
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


                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">Styles <span class="caret"></span></a>
                    <ul class="dropdown-menu" role="menu">
                        <li><a id="style0" href="#">Classic</a></li>
                        <li><a id="style1" href="#">Grayscale</a></li>
                        <li><a id="style2" href="#">Blue hue</a></li>
                        <li><a id="style3" href="#">Dark blue</a></li>
                        <li><a id="style4" href="#">Clean classic</a></li>
                        <li><a id="style5" href="#">Roads</a></li>
                        <li><a id="style6" href="#">Satellite</a></li>
                    </ul>
                </li>

                <!-- PROTOTYPE -->
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">Configuration <span class="caret"></span></a>
                    <ul class="dropdown-menu" role="menu">
                        <li class="divider">map mode</li>
                        <li><a href="#">grid</a></li>
                        <li><a href="#">data points</a></li>
                        <li><a href="#">heat map (concentration)</a></li>
                        <li><a href="#">default(no overlay)</a></li>
                        <li class="divider">grid options</li>
                        <li><a href="#">tile size</a></li>
                        <li><a href="#">tile options</a></li>
                        <li class="divider"></li>
                        <li><a href="#">routes display</a></li>
                        <li><a href="#">routes options</a></li>
                        <li class="divider"></li>
                        <li><a href="#">markers display</a></li>
                        <li class="divider"></li>
                        <li><a href="#">grid frame display</a></li>
                        <li><a href="#">grid frame options</a></li>
                        <li class="divider"></li>
                        <li><a href="#">no data color/opacity</a></li>
                    </ul>
                </li>

                <!-- PROTOTYPE -->
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">Filters <span class="caret"></span></a>
                    <ul class="dropdown-menu" role="menu">
                        <li><a href="#">CO</a></li>
                        <li><a href="#">NO2</a></li>
                        <li><a href="#">Noise</a></li>
                    </ul>
                </li>

                <!-- PROTOTYPE -->
                <li><a href="#">Routes</a></li>
                <li><a href="#">Locations</a></li>
                <li><a href="#">Client</a></li>
                <li><a href="#">About</a></li>

            </ul>

            <!--
            <form class="navbar-form navbar-left" role="search">
                <div class="form-group">
                    <input type="text" class="form-control" placeholder="Search">
                </div>
                <button type="submit" class="btn btn-default">Submit</button>
            </form>
            -->

            <!-- PROTOTYPE -->
            <ul class="nav navbar-nav navbar-right">
                <!-- <button type="button" class="btn btn-default navbar-btn">Dashboard</button> -->
                <button type="button" class="btn btn-default navbar-btn">Sign in</button>
                <button type="button" class="btn btn-default navbar-btn">Register</button>
            </ul>
        </div>
        <!-- /.navbar-collapse -->
    </div>
    <!-- /.container-fluid -->
</nav>

<div class="container fill">
    <div id="gmap_canvas"></div>
</div>

</div>
</body>
</html>