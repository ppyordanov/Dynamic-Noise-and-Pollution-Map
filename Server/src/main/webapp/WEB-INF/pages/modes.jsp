<!-- MODES -->

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


                <div id="modes_options">

                    <!-- ACCORDION -->
                    <div class="panel-group" id="accordionM" role="tablist" aria-multiselectable="true">
                        <div class="panel panel-default">
                            <div class="panel-heading" role="tab" id="headingOneM">
                                <h4 class="panel-title">
                                    <a data-toggle="collapse" data-parent="#accordionM" href="#collapseOneM"
                                       aria-expanded="true" aria-controls="collapseOneM">
                                        Markers
                                    </a>
                                </h4>
                            </div>
                            <div id="collapseOneM" class="panel-collapse collapse in" role="tabpanel"
                                 aria-labelledby="headingOneM">
                                <div class="panel-body">

                                    <label>
                                        <input type="checkbox" name="mode" value="MARKERS" checked> Show/Hide
                                    </label>

                                    <label>
                                        <input type="checkbox" name="infoDisplayMarker"> Disable Information
                                    </label>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

                                </div>
                            </div>
                        </div>

                        <div class="panel panel-default">
                            <div class="panel-heading" role="tab" id="headingTwoM">
                                <h4 class="panel-title">
                                    <a class="collapsed" data-toggle="collapse" data-parent="#accordionM"
                                       href="#collapseTwoM" aria-expanded="false" aria-controls="collapseTwoM">
                                        Routes
                                    </a>
                                </h4>
                            </div>
                            <div id="collapseTwoM" class="panel-collapse collapse" role="tabpanel"
                                 aria-labelledby="headingTwoM">
                                <div class="panel-body">

                                    <label>
                                        <input type="checkbox" name="mode" value="ROUTES" checked> Show/Hide
                                    </label>
                                    <label>
                                        <input type="checkbox" name="infoDisplayRoute"> Disable Information
                                    </label>
                                    description

                                </div>
                            </div>
                        </div>

                        <div class="panel panel-default">
                            <div class="panel-heading" role="tab" id="headingThreeM">
                                <h4 class="panel-title">
                                    <a class="collapsed" data-toggle="collapse" data-parent="#accordionM"
                                       href="#collapseThreeM" aria-expanded="false" aria-controls="collapseThreeM">
                                        Heat Map
                                    </a>
                                </h4>
                            </div>
                            <div id="collapseThreeM" class="panel-collapse collapse" role="tabpanel"
                                 aria-labelledby="headingThreeM">
                                <div class="panel-body">

                                    <label>
                                        <input type="checkbox" name="mode" value="HEAT_MAP"> Show/Hide
                                    </label>
                                    <div class="input-group">
                                        <span class="input-group-addon"> Radius: </span>
                                        <input type="text" class="form-control" placeholder="px" id="radiusHeat">
                                    </div>
                                    <div class="input-group">
                                        <span class="input-group-addon"> Opacity size: </span>
                                        <input type="text" class="form-control" placeholder="%" id="opacityHeat">
                                    </div>
                                    description

                                </div>
                            </div>
                        </div>

                        <div class="panel panel-default">
                            <div class="panel-heading" role="tab" id="headingFourM">
                                <h4 class="panel-title">
                                    <a class="collapsed" data-toggle="collapse" data-parent="#accordionM"
                                       href="#collapseFourM" aria-expanded="false" aria-controls="collapseFourM">
                                        Grid
                                    </a>
                                </h4>
                            </div>
                            <div id="collapseFourM" class="panel-collapse collapse" role="tabpanel"
                                 aria-labelledby="headingFourM">
                                <div class="panel-body">

                                    <label>
                                        <input type="checkbox" name="mode" id="grid" value="GRID"> Show/Hide
                                    </label>

                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s<p>

                                    <div class="container-fluid">

                                        <div class="row">
                                            <div class="col-xs-4 col-md-4">Variables</div>
                                            <div class="col-xs-4 col-md-4">Grid</div>
                                            <div class="col-xs-4 col-md-4">Gradient</div>
                                        </div>

                                        <div class="row">
                                            <div class="col-xs-4 col-md-4">

                                                <label>
                                                    <input type="radio" name="gridValue" value="noiseAVG" disabled="true" checked> Noise
                                                </label>

                                            </div>
                                            <div class="col-xs-4 col-md-4">

                                                <label>
                                                    <input type="checkbox" name="outline" disabled="true"> Outline
                                                </label>(Show/Hide)

                                                <label>
                                                    <input type="checkbox" name="infoDisplayGrid"> Disable Information
                                                </label>

                                            </div>
                                            <div class="col-xs-4 col-md-4">

                                                <label>
                                                    <input type="radio" name="gradient" value="hsl" disabled="true" checked> HSL
                                                </label>(cleaner)

                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-xs-4 col-md-4">


                                                <label>
                                                    <input type="radio" name="gridValue" value="coAVG" disabled="true"> CO
                                                </label>


                                            </div>
                                            <div class="col-xs-4 col-md-4">

                                                <div class="input-group">
                                                    <span class="input-group-addon"> Tile size:</span>
                                                    <input type="text" class="form-control" placeholder="meters" id="tileSize">
                                                </div>

                                            </div>
                                            <div class="col-xs-4 col-md-4">

                                                <label>
                                                    <input type="radio" name="gradient" value="rgb" disabled="true"> RGB
                                                </label>

                                                <br>

                                                <label>
                                                    <input type="radio" name="scale" value="relative" checked> Relative
                                                </label>
                                                <label>
                                                    <input type="radio" name="scale" value="absolute"> Absolute
                                                </label>

                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-xs-4 col-md-4">

                                                <label>
                                                    <input type="radio" name="gridValue" value="no2AVG" disabled="true"> NO2
                                                </label>

                                            </div>
                                            <div class="col-xs-4 col-md-4">

                                                <div class="input-group">
                                                    <span class="input-group-addon"> out op:</span>
                                                    <input type="text" class="form-control" placeholder="meters" id="outlineOpacity">
                                                </div>

                                            </div>
                                            <div class="col-xs-4 col-md-4">

                                                <div class="input-group">
                                                    <span class="input-group-addon"> Tile  op:</span>
                                                    <input type="text" class="form-control" placeholder="meters" id="tileOpacity">
                                                </div>

                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>

                        <div class="panel panel-default">
                            <div class="panel-heading" role="tab" id="headingFiveM">
                                <h4 class="panel-title">
                                    <a class="collapsed" data-toggle="collapse" data-parent="#accordionM"
                                       href="#collapseFiveM" aria-expanded="false" aria-controls="collapseFiveM">
                                        Point Visualization
                                    </a>
                                </h4>
                            </div>
                            <div id="collapseFiveM" class="panel-collapse collapse" role="tabpanel"
                                 aria-labelledby="headingFiveM">
                                <div class="panel-body">

                                    <label>
                                        <input type="checkbox" name="mode" value="POINT_VIS"> Show/Hide
                                    </label>

                                    <label>
                                        <input type="checkbox" name="labels"> Show/Hide Labels
                                    </label>


                                    <label>
                                        <input type="radio" name="pointsValue" value="noise"  checked> Noise
                                    </label>

                                    <label>
                                        <input type="radio" name="pointsValue" value="co" > CO
                                    </label>

                                    <label>
                                        <input type="radio" name="pointsValue" value="no2" > NO2
                                    </label>

                                    description

                                </div>
                            </div>
                        </div>

                    </div>


                </div>


            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="mode_apply" data-dismiss="modal">Apply</button>
            </div>
        </div>
    </div>
</div>

<!-- ACCORDION -->

<!--


-->
