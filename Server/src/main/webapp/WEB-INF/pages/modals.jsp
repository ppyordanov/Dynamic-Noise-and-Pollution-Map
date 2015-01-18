<!-- MODALS -->


<!-- Style Modal -->
<div class="modal fade" id="styles" tabindex="-1" role="dialog" aria-labelledby="styles" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                        aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">Styles</h4>
            </div>
            <div class="modal-body">

                <p>
                    Please choose the map style you would like renderred:
                </p>


                <label>
                    <input type="radio" name="style" value="CLASSIC"> Classic
                </label>
                description
                <br>
                <label>
                    <input type="radio" name="style" value="SATELLITE"> Satellite
                </label>
                description
                <br>
                <label>
                    <input type="radio" name="style" value="GRAYSCALE_DEFAULT"> Grayscale
                </label>
                description
                <br>
                <label>
                    <input type="radio" name="style" value="BLUE_HUE"> Blue Hue
                </label>
                description
                <br>
                <label>
                    <input type="radio" name="style" value="DARK_BLUE"> Dark Blue
                </label>
                description
                <br>
                <label>
                    <input type="radio" name="style" value="CLEAN_CLASSIC"> Clean Classic
                </label>
                description
                <br>
                <label>
                    <input type="radio" name="style" value="ROADS"> Roads
                </label>
                description

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="style_apply" data-dismiss="modal">Apply</button>
            </div>
        </div>
    </div>
</div>

<!-- Mode Modal -->
<div class="modal fade" id="modes" tabindex="-1" role="dialog" aria-labelledby="modes" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                        aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">Modes</h4>
            </div>
            <div class="modal-body">

                <p>
                    Please choose the map mode you would like renderred:
                </p>

                <p>

                <div id="modes_options">
                    <label>
                        <input type="checkbox" name="mode" value="MARKERS"> Markers(No Overlay)
                    </label>
                    description
                    <br>
                    <label>
                        <input type="checkbox" name="mode" value="ROUTES"> Routes
                    </label>
                    description
                    <br>
                    <label>
                        <input type="checkbox" name="mode" value="HEAT_MAP"> Heat Map (Sample Concentration)
                    </label>
                    description
                    <br>
                    <label>
                        <input type="checkbox" name="mode" value="GRID"> Grid
                    </label>
                    description
                    <br>
                    <label>
                        <input type="checkbox" name="mode" value="POINT_VIS"> Point Visualization
                    </label>
                    description

                labels idea

                </div>
                </p>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="mode_apply" data-dismiss="modal">Apply</button>
            </div>
        </div>
    </div>
</div>


<!-- Slider Modal -->
<div class="modal fade" id="values" tabindex="-1" role="dialog" aria-labelledby="filters" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                        aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">Filters</h4>
            </div>
            <div class="modal-body">

                <p>
                    Please configure the map using the sliders below:
                </p>


                <div id="values_options">
                    <label>
                        Noise
                        <div id="noise" class="slider"></div>
                        <input type="text" id="noise_level" readonly>
                    </label>
                    <br>
                <!--
                    healthy values
                    <br>
                    <label>
                        CO
                        <div id="co" class="slider"></div>
                        <input type="text" id="co_level" readonly>
                    </label>
                    <br>
                    healthy values
                    <br>
                    <label>
                        NO2
                        <div id="no2" class="slider"></div>
                        <input type="text" id="no2_level" readonly>
                    </label>
                    <br>
                    healthy values
                    <br>
                    -->
                </div>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="value_apply" data-dismiss="modal">Apply</button>
            </div>
        </div>
    </div>
</div>