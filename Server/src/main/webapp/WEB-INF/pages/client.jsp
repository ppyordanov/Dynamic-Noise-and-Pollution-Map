<!-- CLIENT -->


<!-- Client Modal -->
<div class="modal fade" id="client" tabindex="-1" role="dialog" aria-labelledby="client" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                        aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">Client</h4>
            </div>
            <div class="modal-body">

                <p>
                    You can read more about the client application here:
                </p>

                <div class="container-fluid">
                    <p>
                        The client application for data collection can be downloaded using the links below. It supports Android 1.9 and up(.apk file included) as well as Windows Mobile (.xap file included). It can be used to pair with any Smart Citizen Kit device and transmit information to this server.
                    </p>
                    <div class="row">
                        <div class="col-sm-4" align="center" >

                            <a href="${pageContext.request.contextPath}/resources/client/compiled/dnpcm_android.apk"><img src="${pageContext.request.contextPath}/resources/images/android.png" /></a><br><br>
                            <b>Android</b>

                        </div>

                        <div class="col-sm-4" align="center">

                            <a href="${pageContext.request.contextPath}/resources/client/compiled/dnpcm_windows_mobile.xap"><img src="${pageContext.request.contextPath}/resources/images/windows.png" /></a><br><br>
                            <b>Windows Phone</b>

                        </div>

                        <div class="col-sm-4" align="center">

                            <a href="#"><img src="${pageContext.request.contextPath}/resources/images/ios.png" /></a><br><br>
                            <b>Apple iOS Coming Soon</b>

                        </div>
                    </div>

                    <div class="row" align="center">
                        <br>
                        <a href="#"><img src="${pageContext.request.contextPath}/resources/images/app_data.png" /></a>

                    </div>
                </div>


            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-dismiss="modal">OK</button>
            </div>
        </div>
    </div>
</div>