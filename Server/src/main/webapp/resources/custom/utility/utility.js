/* UTILITY FUNCTIONS */

function randomPosGen(lowLatBounds, highLatBounds, lowLonBounds, highLonBounds) {

    var center;

    var multiplier = 10000000;
    var lat = Math.random() * ((highLatBounds - lowLatBounds) * multiplier) + lowLatBounds * multiplier;
    var lon = Math.random() * ((highLonBounds - lowLonBounds) * multiplier) + lowLonBounds * multiplier;

    center = new google.maps.LatLng(lat / multiplier, lon / multiplier);
    return center;

}

function rangePercentage(value, min, max) {
    return (value - min) / (max - min) * 100;
}

function calculateAverage(sum, count) {
    return sum / count;
};

function logPageLoadingTime() {
    var loadingComplete = Date.now();
    var userLoadTime = loadingComplete - performance.timing.navigationStart;
    console.log("Page Loading Time: " + userLoadTime + " ms");
    console.log(locationARR);
}

//RED-GREEN gradient - red, green, blue
function convertToRGB(n) {
    var B = 0;
    var R = Math.floor((255 * n) / 100);
    var G = Math.floor((255 * (100 - n)) / 100);
    var RGB = "rgb(" + R + "," + G + "," + B + ")";
    return RGB;
}

//RED-YELLOW-GREEN better gradient - hue,satuartion, lightness
function convertToHSL(n) {
    var H = (1 - n / 100) * 120; //scale between 0 and 120 degrees
    var HSL = "hsl(" + H + ",100%,50%)";
    return HSL;
}

function convertToPPM(value) {
    var basePPMtokOhm = 75;
    return value / basePPMtokOhm;
}

//convert to HSL or RGB depending on input parameters
function convertToColor(n, type) {
    var color = null;
    if (type == 'hsl') {
        color = convertToHSL(n);
    }
    else {
        color = convertToRGB(n);
    }
    return color;
}


function convertToHSV(n) {
    var S = Math.abs(n - 50) / 50;
    var H = Math.floor((100 - n) * 120 / 100);
}

function calculateMaximumOverallPollutionIndex() {
    maximumOverallPollutionIndex = absoluteMaxNoise * noiseMultiplier + absoluteMaxCO * coMultiplier +
        absoluteMaxNO2 * no2Multiplier + absoluteMaxRouteDistance * routeDistanceMultiplier + absoluteMaxRouteDuration * routeDurationMultiplier;
}

function compareIntegers(a, b) {
    return a - b;
}

//some color testing for the grid map implementation
var cols = ["gray"];
for (var i = 1; i <= 100; i++) {
    cols[i] = convertToHSL(i);
}
//var cols=["red","green","yellow","orange","gray"]
console.log(cols);

function compareFieldValue(a, b) {
    if (a.label < b.label)
        return -1;
    if (a.label > b.label)
        return 1;
    return 0;
}

function panAndZoom(latitude, longitude) {
    var center = new google.maps.LatLng(latitude, longitude);
    map.panTo(center);
    map.setZoom(18);
}

function formatDate(dateParam) {
    var months = ["January", "February", "March",
        "April", "May", "June", "July", "August", "September",
        "October", "November", "December"];

    var date = dateParam.getDate();
    var month = dateParam.getMonth();
    var year = dateParam.getFullYear();
    return date + "-" + months[month]
        + "-" + year;

}
