export const Constants = {
    BORDER_UNIT_8: 8,
    TAP_UNIT_48: 48,
    TAP_UNIT_MAP_ICONS: 48,
    SPACING_UNIT_24: 24,
    MARGIN_UNIT_24: 24,
    SPACING_UNIT_20: 20,
    SPACING_UNIT_16: 16,
    SPACING_UNIT_10: 10,
    SPACING_UNIT_8: 8,
    BORDER_RADIUS_SMALL: 8,
    BORDER_RADIUS_MEDIUM: 12,
    BORDER_RADIUS_BUTTON: 16,
    BORDER_RADIUS_LARGE: 24,
    TOUCHABLE_OPACITY_ACTIVE_OPACITY: 0.5,
    TOUCHABLE_OPACITY_ACTIVE_OPACITY_SOFT: 0.7,
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
