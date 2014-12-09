<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="en">
<head>


    <link type="text/css" href="${pageContext.request.contextPath}/resources/bs/css/bootstrap.css" rel="stylesheet"/>
    <link type="text/css" href="${pageContext.request.contextPath}/resources/main.css" rel="stylesheet"/>
    <script src="${pageContext.request.contextPath}/resources/bs/js/jquery-1.11.1.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/bs/js/bootstrap.min.js"></script>


    <script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script>
    <script src="${pageContext.request.contextPath}/resources/map_styles.js"></script>
    <script src="${pageContext.request.contextPath}/resources/map.js"></script>

    <script type="text/javascript">
        var dataReadings = [];
        var dataReading;


        <c:forEach items="${dataReadingsModels}" var="element">

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


        dataReadings.push(dataReading);
        </c:forEach>


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