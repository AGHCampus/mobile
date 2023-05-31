export const Constants = {
    BORDER_UNIT_8: 8,
    TAP_UNIT_48: 48,
    MARGIN_UNIT_24: 24,
    SPACING_UNIT_16: 16,
    DEFAULT_REGION_DELTA: {
        latitudeDelta: 0.002,
        longitudeDelta: 0.005,
    },
    DEFAULT_ZOOMED_IN_REGION_DELTA: {
        latitudeDelta: 0.002,
        longitudeDelta: 0.002,
    },
} as const;

export const BASE_MAP_STYLE_LIGHT = [
    {
        featureType: 'administrative',
        elementType: 'geometry',
        stylers: [
            {
                visibility: 'off',
            },
        ],
    },
    {
        featureType: 'landscape.man_made',
        elementType: 'labels.text',
        stylers: [
            {
                visibility: 'off',
            },
        ],
    },
    {
        featureType: 'poi',
        stylers: [
            {
                visibility: 'off',
            },
        ],
    },
    {
        featureType: 'road',
        elementType: 'labels.icon',
        stylers: [
            {
                visibility: 'off',
            },
        ],
    },
    {
        featureType: 'transit',
        stylers: [
            {
                visibility: 'off',
            },
        ],
    },
];
