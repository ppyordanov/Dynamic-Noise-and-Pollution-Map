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


                    <!-- ACCORDION -->
                    <div class="panel-group" id="accordionF" role="tablist" aria-multiselectable="true">
                        <div class="panel panel-default">
                            <div class="panel-heading" role="tab" id="headingOneF">
                                <h4 class="panel-title">
                                    <a data-toggle="collapse" data-parent="#accordionF" href="#collapseOneF"
                                       aria-expanded="true" aria-controls="collapseOneF">
                                        Noise
                                    </a>
                                </h4>
                            </div>
                            <div id="collapseOneF" class="panel-collapse collapse in" role="tabpanel"
                                 aria-labelledby="headingOneF">
                                <div class="panel-body">

                                     <span>
                                     Noise (dB)
                                    <div id="noise" class="slider"></div>
                                    </span>

                                </div>
                            </div>
                        </div>

                        <div class="panel panel-default">
                            <div class="panel-heading" role="tab" id="headingTwoF">
                                <h4 class="panel-title">
                                    <a class="collapsed" data-toggle="collapse" data-parent="#accordionF"
                                       href="#collapseTwoF" aria-expanded="false" aria-controls="collapseTwoF">
                                        Carbon Monoxide (CO)
                                    </a>
                                </h4>
                            </div>
                            <div id="collapseTwoF" class="panel-collapse collapse" role="tabpanel"
                                 aria-labelledby="headingTwoF">
                                <div class="panel-body">

                                    <span>
                                        CO (ppm)
                                        <div id="co" class="slider"></div>
                                    </span>

                                </div>
                            </div>
                        </div>

                        <div class="panel panel-default">
                            <div class="panel-heading" role="tab" id="headingThreeF">
                                <h4 class="panel-title">
                                    <a class="collapsed" data-toggle="collapse" data-parent="#accordionF"
                                       href="#collapseThreeF" aria-expanded="false" aria-controls="collapseThreeF">
                                        Nitrogen Dioxide (NO2)
                                    </a>
                                </h4>
                            </div>
                            <div id="collapseThreeF" class="panel-collapse collapse" role="tabpanel"
                                 aria-labelledby="headingThreeF">
                                <div class="panel-body">

                                    <span>
                                        NO2 (ppm)
                                        <div id="no2" class="slider"></div>
                                    </span>

                                </div>
                            </div>
                        </div>

                    </div>

                </div>


            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="value_apply" data-dismiss="modal">Apply</button>
            </div>
        </div>
    </div>
</div>
</div>