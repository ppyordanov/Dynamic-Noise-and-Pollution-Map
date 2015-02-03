<!-- NAVIGATION -->

<nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
    <div class="container-fluid">
        <!-- UG MAP BRAND -->
        <div class="navbar-header">
            <a class="navbar-brand" href="#">
                <img class="logopos" width="55" height="35" src="${pageContext.request.contextPath}/resources/images/site_logo.png"> UG Map
                </a>

            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                    data-target="#nav-collapse">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>

        </div>

        <!-- NAVIGATION LINKS -->
        <div class="collapse navbar-collapse" id="nav-collapse">
            <ul class="nav navbar-nav">


                <li><a href="#" data-toggle="modal" data-target="#styles"><span class="glyphicon glyphicon-pencil"
                                                                                aria-hidden="true"></span> Styles</a>
                </li>
                <li><a href="#" data-toggle="modal" data-target="#modes"><span class=" glyphicon glyphicon-eye-open"
                                                                               aria-hidden="true"></span> Modes</a></li>
                <li><a href="#" data-toggle="modal" data-target="#values"><span class="glyphicon glyphicon-wrench"
                                                                                aria-hidden="true"></span> Filters</a>
                </li>
                <li><a href="#" data-toggle="modal" data-target="#routes"><span class="glyphicon glyphicon-random"
                                                                                aria-hidden="true"></span> Routes</a>
                </li>
                <li><a href="#" data-toggle="modal" data-target="#locations"><span
                        class="glyphicon glyphicon-map-marker" aria-hidden="true"></span> Locations</a></li>

            </ul>


            <ul class="nav navbar-nav navbar-right">
                <li><a href="#" data-toggle="modal" data-target="#devices"><span class="glyphicon glyphicon-hdd"
                                                                                 aria-hidden="true"></span> Devices</a>
                </li>
                <li><a href="#" data-toggle="modal" data-target="#client"><span class="glyphicon glyphicon-phone"
                                                                                aria-hidden="true"></span> Client</a>
                </li>
                <li><a href="#" data-toggle="modal" data-target="#sck"><img
                        src="${pageContext.request.contextPath}/resources/images/sck_logo4.png" width="23" height="23">SCK</a>
                </li>
                <li><a href="#" data-toggle="modal" data-target="#about">About</a></li>
            </ul>

        </div>
        <!-- NAVIGATION LINKS -->
    </div>
    <!-- CONTAINER END -->
</nav>