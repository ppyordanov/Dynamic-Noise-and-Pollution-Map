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
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
                into
                electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
                release of
                Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
                Aldus PageMaker including versions of Lorem Ipsum.
                </p>
            </div>
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
                <input type="checkbox" name="mode" id="userroutes" value="ROUTES" checked> Show/Hide
            </label>

            <div id="routesOptions">
                <label>
                    <input type="checkbox" name="infoDisplayRoute"> Disable Information
                </label>

                <div class="input-group input-group-sm">
                    <span class="input-group-addon">Thickness:</span>
                    <input type="text" class="form-control" id="thicknessRoutes" placeholder="px" aria-describedby="sizing-addon3">
                </div>
                <div class="input-group input-group-sm">
                    <span class="input-group-addon">Opacity:&emsp;</span>
                    <input type="text" class="form-control" id="opacityRoutes" placeholder="%" aria-describedby="sizing-addon3">
                </div>

                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                    scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
                    into
                    electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
                    release of
                    Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
                    Aldus PageMaker including versions of Lorem Ipsum.
                </p>

            </div>

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
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                    scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
                    into
                    electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
                    release of
                    Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
                    Aldus PageMaker including versions of Lorem Ipsum.
                </p>

            </div>
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
                                <input type="radio" name="gradient" value="hsl"  checked> HSL
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
                                <input type="checkbox" name="outline" > Outline
                            </label>(Show/Hide)

                        </div>
                        <div class="col-xs-4 col-md-4 col-md-4">

                            <label>
                                <input type="radio" name="gradient" value="rgb" > RGB
                            </label>

                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xs-4 col-md-4 col-md-4">

                            <label>
                                <input type="radio" name="gridValue" value="no2AVG" > NO2
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
                        <div class="col-xs-4 col-md-4 col-md-4"></div>
                        <div class="col-xs-4 col-md-4 col-md-4">

                            <div class="input-group">
                                <span class="input-group-addon"> Tile Size: </span>
                                <input type="text" class="form-control" placeholder="meters" id="tileSize">
                            </div>

                        </div>
                        <div class="col-xs-4 col-md-4 col-md-4">

                            <label>
                                <input type="radio" name="scale" value="relative"  checked> Relative
                            </label>

                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xs-4 col-md-4 col-md-4"></div>
                        <div class="col-xs-4 col-md-4 col-md-4">

                            <div class="input-group">
                                <span class="input-group-addon"> Outline Opacity:</span>
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
                        <div class="col-xs-4 col-md-4 col-md-4"></div>
                        <div class="col-xs-4 col-md-4 col-md-4">

                            <div class="input-group">
                                <span class="input-group-addon"> Tile  Opacity: </span>
                                <input type="text" class="form-control" placeholder="%" id="tileOpacity">
                            </div>

                        </div>
                        <div class="col-xs-4 col-md-4 col-md-4"></div>
                    </div>

                </div>

                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                    scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
                    into
                    electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
                    release of
                    Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
                    Aldus PageMaker including versions of Lorem Ipsum.
                </p>

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
                                <input type="radio" name="noiseColor" value="green" >
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
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                    scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
                    into
                    electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
                    release of
                    Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
                    Aldus PageMaker including versions of Lorem Ipsum.
                </p>

            </div>
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
