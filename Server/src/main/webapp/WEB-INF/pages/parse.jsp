<!-- PARSER -->

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<script type="text/javascript">

    var dataReadings = {};
    var dataReading;
    var devices=[];
    var device;
    var users = [];
    var user;

    var routes = [];
    var route;

    <c:forEach items="${userModels}" var="element">
        user = {};
        user.id = "${element.id}";
        user.userName = "${element.userName}";
        user.city = "${element.city}";
        user.country = "${element.country}";
        user.website = "${element.website}";
        user.email = "${element.email}";
        user.created = "${element.created}";

        users.push(user);
    </c:forEach>

    <c:forEach items="${deviceModels}" var="element">
        device = {};
        device.id = "${element.id}";
        device.title = "${element.title}";
        device.description = "${element.description}";
        device.location = "${element.location}";
        device.created = "${element.created}";
        device.kitVersion = "${element.kitVersion}";
        device.userId = "${element.userId}";

        devices.push(device);
    </c:forEach>
    //alert(users.length + " " + devices.length);

    <c:forEach items="${dataReadingModels}" var="element">
    dataReading = {};
    dataReading["id"] = "${element.id}";
    dataReading["routeId"] = "${element.routeId}";
    dataReading["deviceId"] = "${element.deviceId}";
    var timestamp = Date.parse("${element.timestamp}");
    if (isNaN(timestamp)==false)
    {
        dataReading["timestamp"] =  new Date(timestamp);
        //alert(dataReading.timestamp);
    }
    dataReading["latitude"] = "${element.latitude}";
    dataReading["longitude"] = "${element.longitude}";
    //conversion
    var basePPMtokOhm = 75;
    var rawCO = ${element.co};
    var rawNO2 = ${element.no2};
    dataReading["noise"] = ${element.noise};
    dataReading["co"] = (rawCO / basePPMtokOhm);
    dataReading["no2"] = (rawNO2 / basePPMtokOhm);
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
    //alert(routes.length + " " + Object.keys(dataReadings).length);

</script>