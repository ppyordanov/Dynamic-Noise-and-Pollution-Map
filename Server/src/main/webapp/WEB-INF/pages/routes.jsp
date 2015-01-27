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

                <b>Starting Point</b>
                <div class="input-group input-group-sm">
                    <span class="input-group-addon">Place:&emsp;&emsp;</span>
                    <input type="text" name="place" id="sourcePlace" class="form-control" placeholder="building" aria-describedby="sizing-addon3">
                </div>
                <div class="input-group input-group-sm">
                    <span class="input-group-addon">Latitude:&emsp;</span>
                    <input type="text" class="form-control" id="sourceLat" placeholder="lat" aria-describedby="sizing-addon3">
                </div>
                <div class="input-group input-group-sm">
                    <span class="input-group-addon">Longitude:</span>
                    <input type="text" class="form-control" id="sourceLng" placeholder="lng" aria-describedby="sizing-addon3">
                </div>

                <b>Destination</b>
                <div class="input-group input-group-sm">
                    <span class="input-group-addon">Place:&emsp;&emsp;</span>
                    <input type="text" name="place" id="destinationPlace" class="form-control" placeholder="building" aria-describedby="sizing-addon3">
                </div>
                <div class="input-group input-group-sm">
                    <span class="input-group-addon">Latitude:&emsp;</span>
                    <input type="text" class="form-control" id="destinationLat" placeholder="lat" aria-describedby="sizing-addon3">
                </div>
                <div class="input-group input-group-sm">
                    <span class="input-group-addon">Longitude:</span>
                    <input type="text" class="form-control"  id="destinationLng" placeholder="lng" aria-describedby="sizing-addon3">
                </div>


            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="route_apply" data-dismiss="modal">Apply</button>
            </div>
        </div>
    </div>
</div>