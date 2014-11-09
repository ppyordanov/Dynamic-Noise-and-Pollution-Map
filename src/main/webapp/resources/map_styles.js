var style1 = [
    {
        stylers: [
            { hue: "#00ffe6" },
            { saturation: -100 }
        ]
    },
    {
        featureType: "road",
        elementType: "geometry",
        stylers: [
            { lightness: 100 },
            { visibility: "simplified" }
        ]
    },
    {
        featureType: "road",
        elementType: "labels",
        stylers: [
            { visibility: "off" }
        ]
    }
];

var style2 = [
    {
        stylers: [
            { hue: "#ff9f67" },
            { saturation: -20 },
            { gamma: 1.50 }
        ]
    },
    {
        featureType: "road",
        elementType: "geometry",
        stylers: [
            { lightness: 100 },
            { visibility: "simplified" }
        ]
    },
    {
        featureType: "road",
        elementType: "labels.text.stroke",
        stylers: [
            { visibility: "off" }
        ]
    },

    {
        featureType: "water",
        elementType: "geometry.fill",
        stylers: [
            { visibility: "on" },
            { color: "#ffa066" },
            { lightness: 80 }
        ]
    }
];

var styles = [style1, style2];