import React, { useEffect, useRef, useState, useMemo } from 'react';
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
import { LatLng } from 'react-native-maps';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import {
    areRegionsMatching,
    getCurrentLocation,
    handleGeolocationError,
} from '../utils/geolocation';
import Icon from '../components/Icon';
import LocationDetails from '../components/LocationDetails/LocationDetailsBottomSheet';
import MapMarker, {
    MarkerType,
    getMarkerTypeByCategory,
} from '../components/Markers';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import { BASE_MAP_STYLE_LIGHT, Constants } from '../lib/Constants';
import { Colors } from '../lib/Colors';
import { Shadows } from '../lib/Shadows';
import { TabsParamList } from './navigationTypes';
import { TEMP_LOCATIONS_DATA } from '../lib/MockedData';

type Props = BottomTabScreenProps<TabsParamList, 'Map'>;

export interface MarkerData {
    id: string;
    coordinate: LatLng;
    type: MarkerType;
}

export default function MapScreen({ route, navigation }: Props) {
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

    const { eventLocation } = route.params ?? { eventLocation: null };

    useEffect(() => {
        navigation.setOptions({ headerShown: false });
        if (eventLocation) {
            mapViewRef.current?.animateToRegion(
                {
                    ...eventLocation,
                    ...Constants.DEFAULT_REGION_DELTA,
                },
                500,
            );
        }
    }, [navigation, eventLocation]);

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

    const markerData: MarkerData[] = useMemo(
        () =>
            Object.entries(TEMP_LOCATIONS_DATA).map(
                ([id, { coordinate, category }]) => ({
                    id,
                    coordinate,
                    type: getMarkerTypeByCategory(category),
                }),
            ),
        [],
    );

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
                <TouchableOpacity
                    activeOpacity={Constants.TOUCHABLE_OPACITY_ACTIVE_OPACITY}
                    onPress={animateToUserRegion}>
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
        borderRadius: Constants.BORDER_RADIUS_MEDIUM,
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
        borderRadius: Constants.BORDER_RADIUS_LARGE,
        borderColor: Colors.accentGreen,
        backgroundColor: Colors.bgWhite,
    },
    locationIcon: { width: 28, height: 28 },
});
