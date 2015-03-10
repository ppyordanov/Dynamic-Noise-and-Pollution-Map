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
    The visualization modes above can be used to gain a cpomprehensive data understanding as
    the environment information can be filtered by variable, accuracy and can also be aggregated to discover correlations and build a matrix data representation.Please choose the map mode you would like renderred:
</p>


<div id="modes_options">

<!-- ACCORDION -->
<div class="panel-group" id="accordionM" role="tablist" aria-multiselectable="true">
<div class="panel panel-primary">
    <div class="panel-heading" role="tab" id="headingOneM">
        <h4 class="panel-title">
            <a class="collapsed" data-toggle="collapse" data-parent="#accordionM" href="#collapseOneM"
               aria-expanded="true" aria-controls="collapseOneM">
                Data Points
            </a>
        </h4>
    </div>
    <div id="collapseOneM" class="panel-collapse collapse" role="tabpanel"
         aria-labelledby="headingOneM">
        <div class="panel-body">

            <label>
                <input type="checkbox" name="mode" id="markers" value="MARKERS" checked> Show/Hide
            </label>

            <div id="markersOptions">
                <label>
                    <input type="checkbox" name="infoDisplayMarker"> Disable Information
                </label>

                <p>
                    This mode shows and hides sensor reading data markers. They are visible on the map space by default but can be hidden using the controls above. The environmental data (noise, CO, NO2, battery, available on hover han also be endabled/ disabled).
                </p>
            </div>
        </div>
    </div>
</div>

<div class="panel panel-primary">
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
                <input type="checkbox" name="mode" id="userroutes" value="ROUTES" checked> Show/Hide
            </label>

            <div id="routesOptions">
                <label>
                    <input type="checkbox" name="infoDisplayRoute"> Disable Information
                </label>

                <div class="input-group input-group-sm">
                    <span class="input-group-addon">Thickness:</span>
                    <input type="text" class="form-control" id="thicknessRoutes" placeholder="px"
                           aria-describedby="sizing-addon3">
                </div>
                <div class="input-group input-group-sm">
                    <span class="input-group-addon">Opacity:&emsp;</span>
                    <input type="text" class="form-control" id="opacityRoutes" placeholder="%"
                           aria-describedby="sizing-addon3">
                </div>

                <p>
                    Route poly-lines and information pop-ups can be disabled/enabled using the controls above. Route pop-ups show the aggregated environment variable data for all of its data points (the average is displayed). Configuration options such as route path thickness and opacity are also present for producing combined vizualisations with multiple features.
                </p>

            </div>

        </div>
    </div>
</div>

<div class="panel panel-primary">
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
                <input type="checkbox" name="mode" id="heatmap" value="HEAT_MAP"> Show/Hide
            </label>

            <div id="heatmapOptions">

                <div class="input-group">
                    <span class="input-group-addon"> Radius:&emsp;&emsp; </span>
                    <input type="text" class="form-control" placeholder="px" id="radiusHeat">
                </div>
                <div class="input-group">
                    <span class="input-group-addon"> Opacity size: </span>
                    <input type="text" class="form-control" placeholder="%" id="opacityHeat">
                </div>


                <p>
                    The heat map can be used to identify the campus areas where the data point concentration is highest. This can be used to infer where the dynamic noise and pollution campus map is most accurate. The route and opacity can also be controlled to match the desired scaling and for producing combined vizualisations.
                </p>

            </div>
        </div>
    </div>
</div>

<div class="panel panel-primary">
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

            <div id="gridOptions">


                <div class="container-fluid">
                    <div class="row">
                        <div class="col-xs-4 col-md-4 col-md-4"><b>Variables</b></div>
                        <div class="col-xs-4 col-md-4 col-md-4"><b>Grid</b></div>
                        <div class="col-xs-4 col-md-4 col-md-4"><b>Gradient</b></div>
                    </div>

                    <div class="row">
                        <div class="col-xs-4 col-md-4 col-md-4">

                            <label>
                                <input type="radio" name="gridValue" value="noiseAVG" checked> Noise
                            </label>


                        </div>
                        <div class="col-xs-4 col-md-4 col-md-4">

                            <label>
                                <input type="checkbox" name="infoDisplayGrid"> Disable Information
                            </label>

                        </div>
                        <div class="col-xs-4 col-md-4 col-md-4">

                            <label>
                                <input type="radio" name="gradient" value="hsl" checked> HSL
                            </label>(cleaner)

                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xs-4 col-md-4 col-md-4">

                            <label>
                                <input type="radio" name="gridValue" value="coAVG"> CO
                            </label>

                        </div>
                        <div class="col-xs-4 col-md-4 col-md-4">

                            <label>
                                <input type="checkbox" name="outline"> Outline
                            </label>(Show/Hide)

                        </div>
                        <div class="col-xs-4 col-md-4 col-md-4">

                            <label>
                                <input type="radio" name="gradient" value="rgb"> RGB
                            </label>

                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xs-4 col-md-4 col-md-4">

                            <label>
                                <input type="radio" name="gridValue" value="no2AVG"> NO2
                            </label>

                        </div>
                        <div class="col-xs-4 col-md-4 col-md-4">

                            <b> Controls </b>

                        </div>
                        <div class="col-xs-4 col-md-4 col-md-4">

                            <b> Data Scaling </b>

                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xs-4 col-md-4 col-md-4">Tile Size: </div>
                        <div class="col-xs-4 col-md-4 col-md-4">

                            <div class="input-group">
                                <input type="text" class="form-control" placeholder="meters" id="tileSize">
                            </div>

                        </div>
                        <div class="col-xs-4 col-md-4 col-md-4">

                            <label>
                                <input type="radio" name="scale" value="relative" checked> Relative
                            </label>

                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xs-4 col-md-4 col-md-4">Outline Opacity: </div>
                        <div class="col-xs-4 col-md-4 col-md-4">

                            <div class="input-group">
                                <input type="text" class="form-control" placeholder="%" id="outlineOpacity">
                            </div>

                        </div>
                        <div class="col-xs-4 col-md-4 col-md-4">

                            <label>
                                <input type="radio" name="scale" value="absolute"> Absolute
                            </label>

                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xs-4 col-md-4 col-md-4">Tile Opacity: </div>
                        <div class="col-xs-4 col-md-4 col-md-4">

                            <div class="input-group">
                                <input type="text" class="form-control" placeholder="%" id="tileOpacity">
                            </div>

                        </div>
                        <div class="col-xs-4 col-md-4 col-md-4"></div>
                    </div>

                </div>

                <p>
                    This map overlay is used to show the values for the environmental variables (noise, CO, NO2) on the map as a square indexed matrix - grid. The configuration options include variable selection, enabling/ disabling pop-up information on click, showing/hiding the grid cells outling. Other options are the gradient choice - using HSL (red-yellow-green) it is easier to identify the middle value range while RGB (which uses red-green) allows for more comprehensive comparison between any pair of cells. Data scaling can also be controlled - relative data scaling allows users to identify the most polluted areas in the campus as the range of the data is always constrained to the maximum value in the current data set. Using absolute scaling, however, allows users to see the information in relation to the norms imposed by the government and uses the following data constraints in terms of maximum values (calculated in ppm /parts per million/ and dB correspondingly): 30-40 ppm is the danger threshold for CO, while for NO2 this is 150-160 ppm (it is not that toxic). In terms of noise, the pain threshold is around 130-150 dB and this is used for its scaling. In order to improve the accuracy of the grid, the matrix cell size can be controlled. The minimum size is 10 m, while the default one is 50 m. The opacity of the cells' filling and outline can be controlled as well.
                </p>

            </div>
        </div>

    </div>
</div>

<div class="panel panel-primary">
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
                <input type="checkbox" name="mode" id="pointvis" value="POINT_VIS"> Show/Hide
            </label>

            <div id="pointvisOptions">


                <div class="container-fluid">
                    <div class="row">
                        <div class="col-xs-4 col-md-4"><b>Variables</b></div>
                        <div class="col-xs-4 col-md-4"><b>Radius Size</b></div>
                        <div class="col-xs-4 col-md-4"><b>Color</b></div>
                    </div>

                    <div class="row">
                        <div class="col-xs-4 col-md-4">

                            <label>
                                <input type="checkbox" name="pointsValue" value="noise"> Noise
                            </label> (1)

                        </div>
                        <div class="col-xs-4 col-md-4">

                            <label>
                                <input type="radio" name="noiseRadius" value="1" checked>
                            </label>
                            <label>
                                <input type="radio" name="coRadius" value="1" checked>
                            </label>
                            <label>
                                <input type="radio" name="no2Radius" value="1" checked>
                            </label> x1

                        </div>
                        <div class="col-xs-4 col-md-4">

                            <label>
                                <input type="radio" name="noiseColor" value="blue" checked>
                            </label>
                            <label>
                                <input type="radio" name="coColor" value="blue">
                            </label>
                            <label>
                                <input type="radio" name="no2Color" value="blue">
                            </label>
                            <button type="button" class="btn btn-primary disabled"></button>

                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xs-4 col-md-4">

                            <label>
                                <input type="checkbox" name="pointsValue" value="co"> CO
                            </label> (2)

                        </div>
                        <div class="col-xs-4 col-md-4">

                            <label>
                                <input type="radio" name="noiseRadius" value="2">
                            </label>
                            <label>
                                <input type="radio" name="coRadius" value="2">
                            </label>
                            <label>
                                <input type="radio" name="no2Radius" value="2">
                            </label> x2

                        </div>
                        <div class="col-xs-4 col-md-4">

                            <label>
                                <input type="radio" name="noiseColor" value="green">
                            </label>
                            <label>
                                <input type="radio" name="coColor" value="green" checked>
                            </label>
                            <label>
                                <input type="radio" name="no2Color" value="green">
                            </label>
                            <button type="button" class="btn btn-success disabled"></button>

                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xs-4 col-md-4">


                            <label>
                                <input type="checkbox" name="pointsValue" value="no2"> NO2
                            </label> (3)

                        </div>
                        <div class="col-xs-4 col-md-4">

                            <label>
                                <input type="radio" name="noiseRadius" value="4">
                            </label>
                            <label>
                                <input type="radio" name="coRadius" value="4">
                            </label>
                            <label>
                                <input type="radio" name="no2Radius" value="4">
                            </label> x4

                        </div>
                        <div class="col-xs-4 col-md-4">

                            <label>
                                <input type="radio" name="noiseColor" value="red">
                            </label>
                            <label>
                                <input type="radio" name="coColor" value="red">
                            </label>
                            <label>
                                <input type="radio" name="no2Color" value="red" checked>
                            </label>
                            <button type="button" class="btn btn-danger disabled"></button>

                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xs-4 col-md-4"></div>
                        <div class="col-xs-4 col-md-4">

                            <label>
                                <input type="radio" name="noiseRadius" value="10">
                            </label>
                            <label>
                                <input type="radio" name="coRadius" value="10">
                            </label>
                            <label>
                                <input type="radio" name="no2Radius" value="10">
                            </label> x10

                        </div>
                        <div class="col-xs-4 col-md-4">

                            <label>
                                <input type="radio" name="noiseColor" value="orange">
                            </label>
                            <label>
                                <input type="radio" name="coColor" value="orange">
                            </label>
                            <label>
                                <input type="radio" name="no2Color" value="orange">
                            </label>

                            <button type="button" class="btn btn-warning disabled"></button>

                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xs-4 col-md-4"></div>
                        <div class="col-xs-4 col-md-4">1&emsp;2&emsp;3</div>
                        <div class="col-xs-4 col-md-4">1&emsp;2&emsp;3</div>
                    </div>

                </div>

                <p>
                    The grid map and marker visualization allow only a single variable to be rendered on the map surface at any given time. In order to be able to inspect all of the variables simultaneously, the point visualization mode has been designed. It allows users to plot the three main variables on the map, choosing different color codings and scaling the radius (using multipliers as follows: x1, x2, x4, x10) for each one. This makes maximum values very easy to inspect and enables users to be able to conclude whether there are correlations in the locations where max/min values for noise, CO and NO2 are recorded.
                </p>

            </div>
        </div>
    </div>
</div>

</div>


</div>


</div>
<div class="modal-footer">
    <button type="button" class="btn btn-success" id="mode_apply" data-dismiss="modal">Apply</button>
    <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
</div>
</div>
</div>
</div>

<!-- ACCORDION -->

<!--


-->
