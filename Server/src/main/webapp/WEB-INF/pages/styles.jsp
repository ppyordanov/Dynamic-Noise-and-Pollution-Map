<!-- STYLES-->


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
                <!--

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
                                    <input type="radio" name="style" value="ROADS"> Roads
                                </label>
                                description
                -->

                <!-- STYLE DROPDOWN -->
                <div class="btn-group" id="styleDropdown">
                    <a href="#" class="btn btn-primary">Styles</a>
                    <a href="#" class="btn btn-primary dropdown-toggle" data-toggle="dropdown"><span
                            class="caret"></span></a>
                    <ul class="dropdown-menu">
                        <li><a id="style0" href="#">Classic</a></li>
                        <li><a id="style1" href="#">Satellite</a></li>
                        <li><a id="style2" href="#">Grayscale (Default)</a></li>
                        <li><a id="style3" href="#">Blue Hue</a></li>
                        <li><a id="style4" href="#">Dark Blue</a></li>
                        <li><a id="style5" href="#">Roads</a></li>
                        <li class="divider"></li>
                        <li><a href="#">Disable/ Enable UI Controls</a></li>
                        <li>
                            <a href="#">
                                <label>
                                    <input type="checkbox" name="styleUI" id="endisUI" value="disableDefaultUI" checked>
                                    UI Controls
                                </label>
                            </a>
                        </li>

                    </ul>
                </div>
                <!-- STYLE DROPDOWN -->

                <!-- UI DROPDOWN -->
                <div class="btn-group" id="uiDropdown">
                    <a href="#" class="btn btn-primary">Controls</a>
                    <a href="#" class="btn btn-primary dropdown-toggle" data-toggle="dropdown"><span
                            class="caret"></span></a>
                    <ul class="dropdown-menu">


                        <div id="UI">

                            <li>UI Controls</li>
                            <li class="divider"></li>
                            <li>

                                <label>
                                    <input type="checkbox" name="styleOpts" value="panControl" checked> Pan Control
                                </label>

                            </li>
                            <li>

                                <label>
                                    <input type="checkbox" name="styleOpts" value="zoomControl" checked> Zoom Control
                                </label>

                            </li>
                            <li>

                                <label>
                                    <input type="checkbox" name="styleOpts" value="scaleControl" checked> Scale Control
                                </label>

                            </li>
                            <li>

                                <label>
                                    <input type="checkbox" name="styleOpts" value="streetViewControl" checked> Street
                                    View
                                    Control
                                </label>
                            </li>
                            <li class="divider"></li>
                            <li>Shortcuts</li>
                            <li class="divider"></li>
                            <li>
                                <label>
                                    <input type="checkbox" name="styleOpts" value="keyboardShortcuts" checked> Keyboard
                                    Shortcuts
                                </label>

                            </li>
                            <li>

                                <label>
                                    <input type="checkbox" name="styleOpts" value="disableDoubleClickZoom" checked>
                                    Disable Double Click Zoom
                                </label>

                            </li>
                            <li>

                                <label>
                                    <input type="checkbox" name="styleOpts" value="scrollwheel" checked> Scroll Wheel
                                </label>

                            </li>
                        </div>

                    </ul>
                </div>
                <!-- UI DROPDOWN -->

                <br><br>

                <p>
                    Hint: styles allow you to view different aspects of the map. For instance, using the sattelite view, you can zoom in and use the tilted mode in order to have a better notion of where you are currently located.
                    Controls can be used to enable/ disable keyboard shortcuts as well as control the appearance of the map&quot;s UI controls.
                </p>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>


