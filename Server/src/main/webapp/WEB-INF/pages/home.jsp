<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="en">
<head>


    <link type="text/css" href="${pageContext.request.contextPath}/resources/bs/css/bootstrap.css" rel="stylesheet"/>
    <link type="text/css" href="${pageContext.request.contextPath}/resources/main.css" rel="stylesheet"/>
    <script src="${pageContext.request.contextPath}/resources/bs/js/jquery-1.11.1.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/bs/js/bootstrap.js"></script>

    <script src="//code.jquery.com/ui/1.11.2/jquery-ui.js"></script>
    <link rel="stylesheet" href="//code.jquery.com/ui/1.11.2/themes/smoothness/jquery-ui.css">
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

<c:set var="navigation" value="navigation.jsp"/>
<c:set var="map" value="map.jsp"/>
<c:set var="modals" value="modals.jsp"/>

<jsp:include page="${navigation}"></jsp:include>
<jsp:include page="${map}"></jsp:include>
<jsp:include page="${modals}"></jsp:include>

</body>
</html>