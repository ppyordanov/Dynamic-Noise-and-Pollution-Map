<!-- PARSER -->

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

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

    //conversion
    var basePPMtokOhm = 75;
    var rawCO = ${element.co};
    var rawNO2 = ${element.no2};

    dataReading["noise"] = ${element.noise};
    dataReading["co"] = (rawCO/basePPMtokOhm);
    dataReading["no2"] = (rawNO2/basePPMtokOhm);
    dataReading["battery"] = ${element.battery};

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