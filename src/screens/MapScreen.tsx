import React, { useRef, useState } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Dimensions,
    TextInput,
} from 'react-native';
import type { Region } from 'react-native-maps';
import RNMapView from 'react-native-maps';
import MapView from 'react-native-map-clustering';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import {
    areRegionsMatching,
    getCurrentLocation,
    handleGeolocationError,
} from '../geolocation';
import Icon from '../components/Icon';
import LocationDetails from '../components/LocationDetails/LocationDetailsBottomSheet';
import MapMarker, { MarkerType } from '../components/Markers';

import { BASE_MAP_STYLE_LIGHT, Constants } from '../lib/Constants';
import { Colors } from '../lib/Colors';
import { Shadows } from '../lib/Shadows';

const markerData = [
    {
        id: '1',
        coordinate: {
            latitude: 50.0680619382141,
            longitude: 19.912568786594342,
        },
        type: MarkerType.FACULTY,
    },
    {
        id: '2',
        coordinate: {
            latitude: 50.0676808597424,
            longitude: 19.907067919115676,
        },
        type: MarkerType.DORM,
    },
    {
        id: '3',
        coordinate: {
            latitude: 50.06881234813738,
            longitude: 19.906789494394012,
        },
        type: MarkerType.DORM,
    },
    {
        id: '4',
        coordinate: {
            latitude: 50.06805101572392,
            longitude: 19.90836342605491,
        },
        type: MarkerType.CLUB,
    },
    {
        id: '5',
        coordinate: {
            latitude: 50.06774111788259,
            longitude: 19.909685755094717,
        },
        type: MarkerType.FACULTY,
    },
    {
        id: '6',
        coordinate: {
            latitude: 50.068376,
            longitude: 19.90676,
        },
        type: MarkerType.SHOP,
    },
] as const;

export default function MapScreen() {
    const mapViewRef = useRef<RNMapView>(null);
    const inputRef = useRef<TextInput>(null);
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const [region, setRegion] = useState<Region>({
        latitude: 50.065638899794024,
        longitude: 19.91969686063426,
        ...Constants.DEFAULT_REGION_DELTA,
    });

    const [selectedMarkerID, setSelectedMarkerID] = useState<string>('');
    const [followUserLocation, setFollowUserLocation] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [currentRegion, setCurrentRegion] = useState<Region | null>(null);

    const onRegionChangeComplete = (newRegion: Region) => {
        setCurrentRegion(newRegion);

        setIsAnimating(false);
    };

    const onRegionChange = (newRegion: Region) => {
        if (currentRegion === null) {
            setFollowUserLocation(false);
        } else if (
            !isAnimating &&
            followUserLocation &&
            !areRegionsMatching(newRegion, currentRegion)
        ) {
            setFollowUserLocation(false);
        }
    };

    const animateToUserRegion = async () => {
        const position = await getCurrentLocation().catch(
            handleGeolocationError,
        );
        setIsAnimating(true);
        if (position) {
            const { latitude, longitude } = position.coords;
            const userRegion = {
                latitude,
                longitude,
                ...Constants.DEFAULT_REGION_DELTA,
            };
            setCurrentRegion(userRegion);
            mapViewRef.current?.animateToRegion(userRegion, 1000);
            setFollowUserLocation(true);
        }
    };

    const getInitialRegion = async () => {
        const position = await getCurrentLocation();
        if (position) {
            const { latitude, longitude } = position.coords;
            setRegion({
                latitude,
                longitude,
                ...Constants.DEFAULT_REGION_DELTA,
            });
            setFollowUserLocation(true);
        }
    };

    const handleMapPress = () => {
        inputRef.current?.blur();
        bottomSheetModalRef.current?.dismiss();
        setSelectedMarkerID('');
    };

    const shouldDisplayMarker = () => {
        // TODO: Proper marker filtering
        return true;
    };

    return (
        <View style={styles.container}>
            <MapView
                followsUserLocation={followUserLocation}
                onMapReady={async () => await getInitialRegion()}
                onRegionChangeComplete={onRegionChangeComplete}
                onRegionChange={onRegionChange}
                customMapStyle={BASE_MAP_STYLE_LIGHT}
                provider="google"
                toolbarEnabled={false}
                showsIndoorLevelPicker={false}
                ref={mapViewRef}
                zoomTapEnabled={false}
                region={region}
                showsMyLocationButton={false}
                showsUserLocation
                onPress={handleMapPress}
                minPoints={3}
                style={styles.map}>
                {markerData.filter(shouldDisplayMarker).map(marker => (
                    <MapMarker
                        data={marker}
                        coordinate={marker.coordinate}
                        mapViewRef={mapViewRef}
                        bottomSheetModalRef={bottomSheetModalRef}
                        key={`marker_${marker.id}`}
                        isSelected={selectedMarkerID === marker.id}
                        selectMarker={setSelectedMarkerID}
                    />
                ))}
            </MapView>

            <View style={[styles.searchBar, Shadows.depth2]}>
                <TextInput
                    ref={inputRef}
                    placeholder="Search..."
                    style={styles.searchBarInput}
                />
            </View>

            <LocationDetails
                bottomSheetModalRef={bottomSheetModalRef}
                selectedLocationID={selectedMarkerID}
            />

            <View style={styles.opacityOverlay}>
                <TouchableOpacity onPress={animateToUserRegion}>
                    <View style={[styles.locationButton, Shadows.depth2]}>
                        <Icon
                            asset={
                                followUserLocation
                                    ? 'Location'
                                    : 'EmptyLocation'
                            }
                            color={
                                followUserLocation
                                    ? Colors.accentGreen
                                    : Colors.black
                            }
                            style={styles.locationIcon}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    map: { flex: 1 },
    searchBar: {
        position: 'absolute',
        width: Dimensions.get('window').width - 2 * Constants.MARGIN_UNIT_24,
        backgroundColor: 'white',
        height: Constants.MARGIN_UNIT_24 + Constants.SPACING_UNIT_16,
        top: 48,
        borderRadius: Constants.BORDER_UNIT_8,
        paddingHorizontal: Constants.BORDER_UNIT_8,
        marginHorizontal: Constants.MARGIN_UNIT_24,
        justifyContent: 'center',
    },
    searchBarInput: {
        lineHeight: 20,
        fontSize: 16,
    },
    opacityOverlay: {
        position: 'absolute',
        bottom: 8,
        right: 8,
    },
    locationButton: {
        width: Constants.TAP_UNIT_48,
        height: Constants.TAP_UNIT_48,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 16,
        borderColor: Colors.accentGreen,
        backgroundColor: Colors.bgWhite,
    },
    locationIcon: { width: 28, height: 28 },
});
