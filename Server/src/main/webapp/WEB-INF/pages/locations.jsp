<!-- LOCATIONS-->


<!-- Locations Modal -->
<div class="modal fade" id="locations" tabindex="-1" role="dialog" aria-labelledby="locations" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                        aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">Locations</h4>
            </div>
            <div class="modal-body">

                <!-- <div id="pano" class="sView"></div> -->

                <p>
                    This application tracks your geo-location as you move. You can track your location by using the red dot on the map as well as
                    disable and enable this funcionality via
                    the buttons below. You are currently closest to:
                    <div id="currentLocation"></div>
                </p>

                <a href="#" id="startTracking" class="btn btn-primary">Start Tracking</a>
                <a href="#" id="stopTracking" class="btn btn-primary">Stop Tracking</a>
                <br><br>
                <p>
                    Browse university campus locations below:
                </p>

                <!-- ACCORDION -->
                <div id="locationsAccordion"></div>


            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>