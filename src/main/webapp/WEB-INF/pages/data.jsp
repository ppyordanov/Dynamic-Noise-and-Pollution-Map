<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="en">

<body>

<b>Test DB</b>

<p>
    Records inserted in the database: <c:out value='${readingsSize}'/>
</p>

<p>
    DATA:
</p>

<c:forEach items="${dataReadings}" var="dataReading">

    <c:out value="${dataReading.timestamp}"/>

</c:forEach>


<p>
    RESULT:<c:out value='${time}'/>
</p>


</body>
</html>