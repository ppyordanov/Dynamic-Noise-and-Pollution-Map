/**
 * Created by Peter Yordanov on 25.1.2015 г..
 */

/* CONSTANTS + GLOBAL VARIABLES */

//MEASURE CLIENT-SIDE LOADING PERFORMANCE
var loadingStart = Date.now();

var minLatBounds = 55.870056;
var maxLatBounds = 55.876209;
var minLonBounds = -4.297637;
var maxLonBounds = -4.282997;

/* testing purposes
 var minLatBounds = 55.0;
 var maxLatBounds = 56.875209;
 var minLonBounds = -3.278797;
 var maxLonBounds = -5.297637;
 */

var centerLat = 55.872912;
var centerLon = -4.289657;
var center = new google.maps.LatLng(centerLat, centerLon);
var origin = new google.maps.LatLng(maxLatBounds, minLonBounds);


/* ROUTE GENERATION */

var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var starting_point = null;
var destination_point = null;
var sp_Name = null;
var dp_Name = null;
var mode = null;

/* USER NAVIGATION */

var destination = new google.maps.LatLng( 0, 0 );
var source = center;
var userWatch;
var currentUserLocation;
var currentlyTrackingDestination = false;
var currentlyTrackingLocation = true;

var GRID = [];
var HEAT_MAP;
var POINT_DATA = [];
var POINT_VISUALIZATION = [];
var ROUTE_DATA = [];
var locationARR = [];
var USER_ROUTE_DATA = [];
var infowindow = new google.maps.InfoWindow();

var mostRecentTime = null;
var oldestTime = null;
var mostRecentTimeRange = new Date(2000,1,1);
var oldestTimeRange = new Date();

var maxNoise = null;
var minNoise = null;
var minRangeNoise = 0;
var maxRangeNoise = Number.MAX_SAFE_INTEGER;

var maxCO = null;
var minCO = null;
var minRangeCO = 0;
var maxRangeCO = Number.MAX_SAFE_INTEGER;

var maxNO2 = null;
var minNO2 = null;
var minRangeNO2 = 0;
var maxRangeNO2 = Number.MAX_SAFE_INTEGER;

var minBattery = 0;
var maxBattery = 100;

var baseStep = 0.001;
var maxTilesX = 1000;
var maxTilesY = 1000;
var tileSize = 50;

var absoluteMinNoise = 50; // in dB, decibels
var absoluteMaxNoise = 130;
var absoluteMinCO = 0; //in ppm, parts per million
var absoluteMaxCO = 30; //30-40 dangerous
var absoluteMinNO2 = 0; //in ppm, parts per million
var absoluteMaxNO2 = 150;

var absoluteMaxRouteDistance = 1500; //1.5km
var absoluteMaxRouteDuration = 15 * 60;//duration in seconds, 15 minutes

var noiseMultiplier = 0.20; //20% weight
var coMultiplier = 0.20; //20% weight
var no2Multiplier = 0.58; //58% weight
var routeDistanceMultiplier = 0.01; //1% weight
var routeDurationMultiplier = 0.01; //1% weight

var variableSwitch = {"distance": true, "duration": true, "noise":true, "co": true, "no2":true};

var maximumOverallPollutionIndex = 0;
calculateMaximumOverallPollutionIndex();

var baseWalkingTimePerMeter = 0.775; //seconds

var id;
var noise;
var co;
var no2;
var timestamp;
var battery;
var latitude;
var longitude;
var position;

var map;
var image = '/resources/images/sck_logo4.png';
var userLocationImage = '/resources/images/user_location.gif';
var larger_image='/resources/images/user_device_scaled.png';
var profile_image='/resources/images/profile2.png';
var marker;
var content;
var styledContent;
var popup = new google.maps.InfoWindow({});


var disableRouteInfoWindow = false;
var disableMarkerInfoWindow = false;
var disableGridInfoWindow = false;

var colors = ["green", "yellow", "orange", "red"];


