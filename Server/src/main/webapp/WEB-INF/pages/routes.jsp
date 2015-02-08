<!-- Routes->


<!-- Routes Modal -->
<div class="modal fade" id="routes" tabindex="-1" role="dialog" aria-labelledby="routes" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                        aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">Routes</h4>
            </div>
            <div class="modal-body">


                <div class='panel panel-primary'>
                    <div class='panel-heading'><h3 class='panel-title'>Travel Mode</h3></div>
                    <div class='panel-body'>

                        <span class='left'>

                        <p>
                            Please select a travel mode, a starting point and a destination:
                        </p>


                        <div class="form-group">
                            <label for="mode">Travel Mode:</label>
                            <select class="form-control" id="mode">
                                <option value="WALKING">Walking</option>
                                <option value="BICYCLING">Bicycling</option>
                                <option value="DRIVING">Driving</option>
                                <option value="TRANSIT">Transit</option>
                            </select>
                        </div>

                        </span>

                        <span class="right">

                            <img id='userImage' src='${pageContext.request.contextPath}/resources/images/user_device_scaled.png'>

                        </span>
                    </div>
                </div>

                <div class='panel panel-primary'>
                    <div class='panel-heading'><h3 class='panel-title'>Journey Planner</h3></div>
                    <div class='panel-body'>

                        <span class='left'>


                            <b>Starting Point</b>

                            <div class="input-group input-group-sm">
                                <span class="input-group-addon">Place:&emsp;&emsp;</span>
                                <input type="text" name="place" id="sourcePlace" class="form-control"
                                       placeholder="building"
                                       aria-describedby="sizing-addon3">
                            </div>
                            <div class="input-group input-group-sm">
                                <span class="input-group-addon">Latitude:&emsp;</span>
                                <input type="text" class="form-control" id="sourceLat" placeholder="lat"
                                       aria-describedby="sizing-addon3">
                            </div>
                            <div class="input-group input-group-sm">
                                <span class="input-group-addon">Longitude:</span>
                                <input type="text" class="form-control" id="sourceLng" placeholder="lng"
                                       aria-describedby="sizing-addon3">
                            </div>

                            <b>Destination</b>

                            <div class="input-group input-group-sm">
                                <span class="input-group-addon">Place:&emsp;&emsp;</span>
                                <input type="text" name="place" id="destinationPlace" class="form-control"
                                       placeholder="building"
                                       aria-describedby="sizing-addon3">
                            </div>
                            <div class="input-group input-group-sm">
                                <span class="input-group-addon">Latitude:&emsp;</span>
                                <input type="text" class="form-control" id="destinationLat" placeholder="lat"
                                       aria-describedby="sizing-addon3">
                            </div>
                            <div class="input-group input-group-sm">
                                <span class="input-group-addon">Longitude:</span>
                                <input type="text" class="form-control" id="destinationLng" placeholder="lng"
                                       aria-describedby="sizing-addon3">
                            </div>

                        </span>

                        <span class='right'>
                            <br>
                            <b>Route Statistics</b>
                            <br><br>
                            <label>
                                <input type="checkbox" name="statistics" id="distanceStat" checked> Distance
                            </label><br>
                            <label>
                                <input type="checkbox" name="statistics" id="durationStat" checked> Duration
                            </label><br>
                            <label>
                                <input type="checkbox" name="statistics" id="noiseStat" checked> Noise (average dB)
                            </label><br>
                            <label>
                                <input type="checkbox" name="statistics" id="coStat" checked> CO (average ppm)
                            </label><br>
                            <label>
                                <input type="checkbox" name="statistics" id="no2Stat" checked> NO2 (average ppm)
                            </label>

                        </span>
                    </div>
                </div>


            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="route_apply" data-dismiss="modal">Apply</button>
            </div>
        </div>
    </div>
</div>