<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="en">
<head>


    <link type="text/css" href="${pageContext.request.contextPath}/resources/bs/css/bootstrap.css" rel="stylesheet"/>
    <link type="text/css" href="${pageContext.request.contextPath}/resources/main.css" rel="stylesheet"/>
    <script src="${pageContext.request.contextPath}/resources/bs/js/jquery-1.11.1.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/bs/js/bootstrap.js"></script>


    <script type="text/javascript"
            src="https://maps.googleapis.com/maps/api/js?v=3.8&libraries=geometry,visualization&sensor=false"></script>
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


<nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
    <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">

            <a class="navbar-brand" href="#">UG Map</a>

            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                    data-target="#nav-collapse">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>

        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="nav-collapse">
            <ul class="nav navbar-nav">


                <li><a href="#" data-toggle="modal" data-target="#styles">Styles</a></li>
                <li><a href="#" data-toggle="modal" data-target="#modes">Modes</a></li>

            </ul>
        </div>
        <!-- /.navbar-collapse -->
    </div>
    <!-- /.container-fluid -->
</nav>

<!-- Style Modal -->
<div class="modal fade" id="styles" tabindex="-1" role="dialog" aria-labelledby="styles" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                        aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">Styles</h4>
            </div>
            <div class="modal-body">

                <p>
                    Please choose the map style you would like renderred:
                </p>


                <label>
                    <input type="radio" name="style" value="CLASSIC"> Classic
                </label>
                description
                <br>
                <label>
                    <input type="radio" name="style" value="SATELLITE"> Satellite
                </label>
                description
                <br>
                <label>
                    <input type="radio" name="style" value="GRAYSCALE_DEFAULT"> Grayscale
                </label>
                description
                <br>
                <label>
                    <input type="radio" name="style" value="BLUE_HUE"> Blue Hue
                </label>
                description
                <br>
                <label>
                    <input type="radio" name="style" value="DARK_BLUE"> Dark Blue
                </label>
                description
                <br>
                <label>
                    <input type="radio" name="style" value="CLEAN_CLASSIC"> Clean Classic
                </label>
                description
                <br>
                <label>
                    <input type="radio" name="style" value="ROADS"> Roads
                </label>
                description

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="style_apply" data-dismiss="modal">Apply</button>
            </div>
        </div>
    </div>
</div>

<!-- Mode Modal -->
<div class="modal fade" id="modes" tabindex="-1" role="dialog" aria-labelledby="modes" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                        aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">Styles</h4>
            </div>
            <div class="modal-body">

                <p>
                    Please choose the map mode you would like renderred:
                </p>

                <p>

                <div id="modes_options">
                    <label>
                        <input type="checkbox" name="mode" value="MARKERS"> Markers(No Overlay)
                    </label>
                    description
                    <br>
                    <label>
                        <input type="checkbox" name="mode" value="ROUTES"> Routes
                    </label>
                    description
                    <br>
                    <label>
                        <input type="checkbox" name="mode" value="HEAT_MAP"> Heat Map (Sample Concentration)
                    </label>
                    description
                    <br>
                    <label>
                        <input type="checkbox" name="mode" value="GRID"> Grid
                    </label>
                    description
                </div>
                </p>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="mode_apply" data-dismiss="modal">Apply</button>
            </div>
        </div>
    </div>
</div>


<div class="container fill">

    <div id="gmap_canvas"></div>

</div>

</body>
</html>