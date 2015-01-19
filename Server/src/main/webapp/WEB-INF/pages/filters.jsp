<!-- SLIDERS -->

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
                    <span>
                        Noise
                        <div id="noise" class="slider"></div>
                    </span>

                    <span>
                        CO
                        <div id="co" class="slider"></div>
                    </span>

                    <span>
                        NO2
                        <div id="no2" class="slider"></div>
                    </span>


                    <!--<input type="text" id="no2_level" readonly>
                </span>


                <!--
                                    <br>
                healthy values
                <br>
                -->


                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" id="value_apply" data-dismiss="modal">Apply</button>
                </div>
            </div>
        </div>
    </div>
</div>