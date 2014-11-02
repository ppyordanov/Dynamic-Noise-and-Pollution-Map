<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="en">

<body>

<h3>Test MySQL DB</h3>

<img src="http://www.mysql.com/common/logos/logo-mysql-110x57.png" width="110" height="57" alt="MySQL"/>


<p>
    DATA: skipped
</p>

<%--
<c:forEach items="${dataReadings}" var="dataReading">

    <c:out value="${dataReading.timestamp}"/>

</c:forEach>

--%>


<p>
    <b>RESULT:</b>
</p>


<p>
    <b>Insert single record:</b>
    <br>
    <c:out value='${insertSingle}'/>
</p>

<p>
    <b>Insert real data (SIM):</b>
    <br>
    <c:out value='${insertRealData}'/>
    <b>Data size:</b>
    <br>
    <c:out value='${realDataSize}'/> * 5000
</p>

<p>
    <b>Update single record:<b>
        <br>
        <c:out value='${updateSingle}'/>
</p>

<p>
    <b>Get single record:</b>
    <br>
    <c:out value='${getSingle}'/>
</p>

<p>
    <b>Delete single record:</b>
    <br>
    <c:out value='${deleteSingle}'/>
</p>

<p>
    <b>Get all records:</b>
    <br>
    <c:out value='${getAll}'/>
</p>

<p>
<h5>TOTAL:</h5>
<br>
<c:out value='${totalTime}'/>
</p>


</body>
</html>