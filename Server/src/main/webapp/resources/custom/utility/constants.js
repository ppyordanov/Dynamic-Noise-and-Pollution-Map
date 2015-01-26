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

var GRID = [];
var HEAT_MAP;
var POINT_DATA = [];
var POINT_VISUALIZATION = [];
var ROUTE_DATA = [];
var locationARR = [];
var infowindow = new google.maps.InfoWindow();

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
var marker;
var content;
var styledContent;
var popup = new google.maps.InfoWindow({});


var disableRouteInfoWindow = false;
var disableMarkerInfoWindow = false;
var disableGridInfoWindow = false;


