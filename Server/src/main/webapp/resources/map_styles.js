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
            { visibility: "off" }
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
            { visibility: "off" }
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
    ]}
];

//CLEAN CLASSIC
var style4 = [
    {"featureType": "administrative", "stylers": [
        {"visibility": "off"}
    ]},
    {"featureType": "poi", "stylers": [
        {"visibility": "simplified"}
    ]},
    {"featureType": "road", "elementType": "labels", "stylers": [
        {"visibility": "simplified"}
    ]},
    {"featureType": "water", "stylers": [
        {"visibility": "simplified"}
    ]},
    {"featureType": "transit", "stylers": [
        {"visibility": "simplified"}
    ]},
    {"featureType": "landscape", "stylers": [
        {"visibility": "simplified"}
    ]},
    {"featureType": "road.highway", "stylers": [
        {"visibility": "off"}
    ]},
    {"featureType": "road.local", "stylers": [
        {"visibility": "on"}
    ]},
    {"featureType": "road.highway", "elementType": "geometry", "stylers": [
        {"visibility": "on"}
    ]},
    {"featureType": "water", "stylers": [
        {"color": "#84afa3"},
        {"lightness": 50}
    ]},
    {"stylers": [
        {"saturation": -17},
        {"gamma": 0.36}
    ]},
    {"featureType": "transit.line", "elementType": "geometry", "stylers": [
        {"color": "#3f518c"}
    ]}
];

//ROADS
var style5 = [
    {"elementType": "labels.text", "stylers": [
        {"visibility": "off"}
    ]},
    {"elementType": "labels.icon", "stylers": [
        {"visibility": "off"}
    ]},
    {"elementType": "geometry.stroke", "stylers": [
        {"visibility": "off"}
    ]},
    {"featureType": "water", "elementType": "geometry.fill", "stylers": [
        {"color": "#0099cc"}
    ]},
    {"featureType": "road", "elementType": "geometry.fill", "stylers": [
        {"color": "#00314e"}
    ]},
    {"featureType": "transit.line", "elementType": "geometry.fill", "stylers": [
        {"visibility": "on"},
        {"color": "#f0f0f0"}
    ]},
    {"featureType": "landscape.man_made", "stylers": [
        {"color": "#adbac9"}
    ]},
    {"featureType": "landscape.natural", "stylers": [
        {"color": "#adb866"}
    ]},
    {"featureType": "poi", "stylers": [
        {"color": "#f7c742"}
    ]},
    {"featureType": "poi.park", "stylers": [
        {"color": "#adb866"}
    ]},
    {"featureType": "transit.station", "elementType": "geometry.fill", "stylers": [
        {"color": "#ff8dd3"}
    ]},
    {"featureType": "transit.station", "stylers": [
        {"color": "#ff8dd3"}
    ]},
    {"featureType": "transit.line", "elementType": "geometry.fill", "stylers": [
        {"visibility": "on"},
        {"color": "#808080"}
    ]},
    {}
];

//SATELLITE
var style6 =google.maps.MapTypeId.SATELLITE;

var styledMap0 = new google.maps.StyledMapType(style0, {name: "Styled Map 1"});
var styledMap1 = new google.maps.StyledMapType(style1, {name: "Styled Map 2"});
var styledMap2 = new google.maps.StyledMapType(style2, {name: "Styled Map 3"});
var styledMap3 = new google.maps.StyledMapType(style3, {name: "Styled Map 4"});
var styledMap4 = new google.maps.StyledMapType(style4, {name: "Styled Map 5"});
var styledMap5 = new google.maps.StyledMapType(style5, {name: "Styled Map 6"});
var styledMap6 = google.maps.MapTypeId.SATELLITE;

var styles = [styledMap0, styledMap1, styledMap2, styledMap3, styledMap4, styledMap5,styledMap6];