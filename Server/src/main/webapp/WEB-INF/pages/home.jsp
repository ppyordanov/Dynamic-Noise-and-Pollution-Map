<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="en">
<head>

    <%-- Metadata information included for on-page SEO optimization --%>
    <title>UG Map</title>
    <meta name="title" content="Glasgow University Dynamic Noise and Pollution Campus Map">
    <meta name="description" content="The project&quot;s goal is building a dynamic noise and pollution campus map via using the innovative Smart Citizen Kit board
     developed by the company FabLab in Barcelona, Spain.">
    <meta name="keywords" content="sck, smart citizen, smart citizen kit, i-o-t, web application, mobile application, University of Glasgow">
    <meta name="author" content="Petar Yordanov (ppyordanov)">


    <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />

    <link type="text/css" href="${pageContext.request.contextPath}/resources/external/bs/css/bootstrap.css"
          rel="stylesheet"/>
    <link type="text/css" href="${pageContext.request.contextPath}/resources/custom/css/main.css" rel="stylesheet"/>
    <link type="text/css" href="${pageContext.request.contextPath}/resources/external/jquery/jquery-ui.css"
          rel="stylesheet"/>

    <script src="${pageContext.request.contextPath}/resources/external/jquery/jquery-1.11.1.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/external/bs/js/bootstrap.js"></script>
    <script src="${pageContext.request.contextPath}/resources/external/jquery/jquery-ui.js"></script>
    <script src="${pageContext.request.contextPath}/resources/external/jquery/jquery.ui.touch-punch.min.js"></script>

    <script type="text/javascript"
            src="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,visualization&sensor=false"></script>

    <script src="${pageContext.request.contextPath}/resources/custom/utility/utility.js"></script> <!--replaced-->
    <script src="${pageContext.request.contextPath}/resources/custom/utility/constants_global.js"></script>
    <script src="${pageContext.request.contextPath}/resources/custom/map/locations.js"></script>
    <script src="${pageContext.request.contextPath}/resources/custom/ui/map_styles.js"></script>
    <script src="${pageContext.request.contextPath}/resources/custom/map/users_devices.js"></script>
    <script src="${pageContext.request.contextPath}/resources/custom/map/map.js"></script>
    <script src="${pageContext.request.contextPath}/resources/custom/map/markers_routes.js"></script>
    <script src="${pageContext.request.contextPath}/resources/custom/map/grid_map.js"></script>
    <script src="${pageContext.request.contextPath}/resources/custom/map/heat_map.js"></script>
    <script src="${pageContext.request.contextPath}/resources/custom/map/point_vis.js"></script>
    <script src="${pageContext.request.contextPath}/resources/custom/map/controls.js"></script>
    <script src="${pageContext.request.contextPath}/resources/custom/map/route_generation.js"></script>
    <script src="${pageContext.request.contextPath}/resources/custom/map/navigator.js"></script>
    <script src="${pageContext.request.contextPath}/resources/custom/ui/user_interface.js"></script>

<%--
    <script type="text/javascript"
            src="http://google-maps-utility-library-v3.googlecode.com/svn/trunk/infobox/src/infobox.js"></script>
--%>


</head>

<body>

<div id="loader_container">
    <img id="loader" alt="" src="${pageContext.request.contextPath}/resources/images/loader.gif"/>
</div>

<c:set var="parser" value="parse.jsp"/>
<c:set var="navigation" value="navigation.jsp"/>
<c:set var="map" value="map.jsp"/>
<c:set var="styles" value="styles.jsp"/>
<c:set var="modes" value="modes.jsp"/>
<c:set var="filters" value="filters.jsp"/>
<c:set var="routes" value="routes.jsp"/>
<c:set var="locations" value="locations.jsp"/>
<c:set var="devices" value="devices.jsp"/>
<c:set var="client" value="client.jsp"/>
<c:set var="sck" value="sck.jsp"/>
<c:set var="about" value="about.jsp"/>

<jsp:include page="${parser}"></jsp:include>
<jsp:include page="${navigation}"></jsp:include>
<jsp:include page="${map}"></jsp:include>
<jsp:include page="${styles}"></jsp:include>
<jsp:include page="${modes}"></jsp:include>
<jsp:include page="${filters}"></jsp:include>
<jsp:include page="${routes}"></jsp:include>
<jsp:include page="${locations}"></jsp:include>
<jsp:include page="${devices}"></jsp:include>
<jsp:include page="${client}"></jsp:include>
<jsp:include page="${sck}"></jsp:include>
<jsp:include page="${about}"></jsp:include>

</body>
</html>