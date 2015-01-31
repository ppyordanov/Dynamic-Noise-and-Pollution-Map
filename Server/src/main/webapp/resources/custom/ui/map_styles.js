//DEFAULT
var style0 = [
    {}
];

//GRAYSCALE
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
            { visibility: "on" }
        ]
    }
];

//BLUE HUE
var style2 = [
    {
        stylers: [
            { hue: "#2196f3" },
            { saturation: 50 },
            { gamma: 1 }
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
            { visibility: "on" }
        ]
    },

    {
        featureType: "water",
        elementType: "geometry.fill",
        stylers: [
            { visibility: "on" },
            { color: "#ffa066" },
            { lightness: 50 }
        ]
    }
];

//DARK BLUE
var style3 = [
    {"featureType": "water", "stylers": [
        {"color": "#021019"}
    ]},
    {"featureType": "landscape", "stylers": [
        {"color": "#08304b"}
    ]},
    {"featureType": "poi", "elementType": "geometry", "stylers": [
        {"color": "#0c4152"},
        {"lightness": 5}
    ]},
    {"featureType": "road.highway", "elementType": "geometry.fill", "stylers": [
        {"color": "#000000"}
    ]},
    {"featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [
        {"color": "#0b434f"},
        {"lightness": 25}
    ]},
    {"featureType": "road.arterial", "elementType": "geometry.fill", "stylers": [
        {"color": "#000000"}
    ]},
    {"featureType": "road.arterial", "elementType": "geometry.stroke", "stylers": [
        {"color": "#0b3d51"},
        {"lightness": 16}
    ]},
    {"featureType": "road.local", "elementType": "geometry", "stylers": [
        {"color": "#000000"}
    ]},
    {"elementType": "labels.text.fill", "stylers": [
        {"color": "#ffffff"}
    ]},
    {"elementType": "labels.text.stroke", "stylers": [
        {"color": "#000000"},
        {"lightness": 13}
    ]},
    {"featureType": "transit", "stylers": [
        {"color": "#146474"}
    ]},
    {"featureType": "administrative", "elementType": "geometry.fill", "stylers": [
        {"color": "#000000"}
    ]},
    {"featureType": "administrative", "elementType": "geometry.stroke", "stylers": [
        {"color": "#144b53"},
        {"lightness": 20},
        {"weight": 1.4}
    ]},
    {
        featureType: "road",
        elementType: "labels",
        stylers: [
            { visibility: "on" }
        ]
    }
];

//CLEAN CLASSIC
var style4 = [
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#ffffff"
            },
            {
                "saturation": -100
            },
            {
                "lightness": 100
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#ffffff"
            },
            {
                "saturation": -100
            },
            {
                "gamma": -100
            },
            {
                "lightness": 100
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "hue": "#000000"
            },
            {
                "saturation": -100
            },
            {
                "lightness": -100
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
            {
                "hue": "#ffffff"
            },
            {
                "saturation": -100
            },
            {
                "lightness": 100
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#ffffff"
            },
            {
                "saturation": -100
            },
            {
                "lightness": 100
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#ffffff"
            },
            {
                "saturation": 0
            },
            {
                "lightness": 100
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "hue": "#000000"
            },
            {
                "saturation": 0
            },
            {
                "lightness": -100
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "labels",
        "stylers": [
            {
                "hue": "#ffffff"
            },
            {
                "saturation": 0
            },
            {
                "lightness": 100
            },
            {
                "visibility": "off"
            }
        ]
    }
];

//SATELLITE
var style6 = google.maps.MapTypeId.SATELLITE;

var styledMap0 = new google.maps.StyledMapType(style0, {name: "Styled Map 1"});
var styledMap1 = new google.maps.StyledMapType(style1, {name: "Styled Map 2"});
var styledMap2 = new google.maps.StyledMapType(style2, {name: "Styled Map 3"});
var styledMap3 = new google.maps.StyledMapType(style3, {name: "Styled Map 4"});
var styledMap4 = new google.maps.StyledMapType(style4, {name: "Styled Map 6"});
var styledMap5 = google.maps.MapTypeId.SATELLITE;

var styles = [styledMap0, styledMap1, styledMap2, styledMap3, styledMap4, styledMap5];