<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="en">
<head>


    <link type="text/css" href="${pageContext.request.contextPath}/resources/external/bs/css/bootstrap.css"
          rel="stylesheet"/>
    <link type="text/css" href="${pageContext.request.contextPath}/resources/custom/main.css" rel="stylesheet"/>
    <link type="text/css" href="${pageContext.request.contextPath}/resources/external/jquery/jquery-ui.css"
          rel="stylesheet"/>

    <script src="${pageContext.request.contextPath}/resources/external/jquery/jquery-1.11.1.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/external/bs/js/bootstrap.js"></script>
    <script src="${pageContext.request.contextPath}/resources/external/jquery/jquery-ui.js"></script>

    <script type="text/javascript"
            src="https://maps.googleapis.com/maps/api/js?v=3.8&libraries=geometry,visualization&sensor=false"></script>
    <script src="${pageContext.request.contextPath}/resources/custom/map_styles.js"></script>
    <script src="${pageContext.request.contextPath}/resources/custom/map.js"></script>

    <!-- <script type="text/javascript" src="http://google-maps-utility-library-v3.googlecode.com/svn/trunk/infobox/src/infobox.js"></script>


</head>

<body>

<c:set var="parser" value="parse.jsp"/>
<c:set var="navigation" value="navigation.jsp"/>
<c:set var="map" value="map.jsp"/>
<c:set var="styles" value="styles.jsp"/>
<c:set var="modes" value="modes.jsp"/>
<c:set var="filters" value="filters.jsp"/>

<jsp:include page="${parser}"></jsp:include>
<jsp:include page="${navigation}"></jsp:include>
<jsp:include page="${map}"></jsp:include>
<jsp:include page="${styles}"></jsp:include>
<jsp:include page="${modes}"></jsp:include>
<jsp:include page="${filters}"></jsp:include>

</body>
</html>