import React, { useEffect, useRef, useState, useContext } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Linking,
    SafeAreaView,
} from 'react-native';
import type { Region } from 'react-native-maps';
import RNMapView, { LatLng } from 'react-native-maps';
import MapView from 'react-native-map-clustering';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import {
    areRegionsMatching,
    getCurrentLocation,
    getFocusedCoordinates,
    handleGeolocationError,
} from '../utils/geolocation';
import Icon from '../components/Icon';
import LocationDetails from '../components/LocationDetails/LocationDetailsBottomSheet';
import MapMarker from '../components/Markers';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { BASE_MAP_STYLE_LIGHT, Constants } from '../lib/Constants';
import { Colors } from '../lib/Colors';
import { Shadows } from '../lib/Shadows';
import { LocationsDataContext } from '../../App';
import SearchBar from '../components/SearchBar';
import { StackNavigation, TabsParamList } from '../lib/Navigation';
import { useNavigation } from '@react-navigation/native';
import MapFilterButtonsRow from '../components/MapFilterButtonsRow';
import { VerticalSpacer } from '../components/Spacers';
import { LocationData } from '../api/locations';
import SharedLocationMarker from '../components/SharedLocationMarker';
import { shareCurrentLocation } from '../utils/sharing';
import { PrivateEventData, getPrivateEvent } from '../api/events';

type Props = BottomTabScreenProps<TabsParamList, 'Map'>;

export default function MapScreen({ route }: Props) {
    const navigation = useNavigation<StackNavigation>();
    const locationsData = useContext(LocationsDataContext);

    const mapViewRef = useRef<RNMapView>(null);
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const [region, setRegion] = useState<Region>({
        latitude: 50.065638899794024,
        longitude: 19.91969686063426,
        ...Constants.DEFAULT_REGION_DELTA,
    });

    const [sharedLocationCoordinates, setSharedLocationCoordinates] =
        useState<LatLng | null>(null);
    const [privateEventDetails, setPrivateEventDetails] =
        useState<PrivateEventData | null>(null);
    const [selectedMarkerID, setSelectedMarkerID] = useState<string>('');
    const [settingsButtonEnabled, setSettingsButtonEnabled] = useState(true);
    const [searchButtonEnabled, setSearchButtonEnabled] = useState(true);
    const [followUserLocation, setFollowUserLocation] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [currentRegion, setCurrentRegion] = useState<Region | null>(null);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const { coordinates, eventID } = route.params || {};

    useEffect(() => {
        navigation.setOptions({ headerShown: false });
        const focusedCoordinates = getFocusedCoordinates(
            route.params,
            locationsData,
        );
        if (coordinates) {
            setSharedLocationCoordinates(coordinates);
        }
        if (eventID) {
            // TODO Proper loading
            const loadPrivateEventData = async () => {
                const eventData = await getPrivateEvent(eventID);
                if (eventData) {
                    setPrivateEventDetails(eventData);
                    mapViewRef.current?.animateToRegion(
                        {
                            ...eventData.coordinate,
                            ...Constants.DEFAULT_REGION_DELTA,
                        },
                        500,
                    );
                }
            };
            loadPrivateEventData();
        }
        if (focusedCoordinates) {
            mapViewRef.current?.animateToRegion(
                {
                    ...focusedCoordinates,
                    ...Constants.DEFAULT_REGION_DELTA,
                },
                500,
            );
        }
    }, [coordinates, locationsData, navigation, eventID, route.params]);

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

    const handleMapReady = async () => {
        await getInitialRegion();

        const url = await Linking.getInitialURL();
        if (
            url?.includes('coordinates') &&
            mapViewRef.current &&
            sharedLocationCoordinates
        ) {
            mapViewRef.current.animateToRegion(
                {
                    ...sharedLocationCoordinates,
                    ...Constants.DEFAULT_ZOOMED_IN_REGION_DELTA,
                },
                500,
            );
        }
    };

    const handleMapPress = () => {
        bottomSheetModalRef.current?.forceClose();
        setSelectedMarkerID('');
    };

    const handleSettingsPress = () => {
        // Prevent multiple taps and delay navigation to allow bottom sheet dismiss
        if (!settingsButtonEnabled) {
            return;
        }

        if (selectedMarkerID === '') {
            navigation.navigate('Settings');
        } else {
            bottomSheetModalRef.current?.forceClose();
            setSettingsButtonEnabled(false);
            setTimeout(() => {
                navigation.navigate('Settings');
                setSelectedMarkerID('');
                setSettingsButtonEnabled(true);
            }, 100);
        }
    };

    const handleSearchPress = () => {
        // Prevent multiple taps and delay navigation to allow bottom sheet dismiss
        if (!searchButtonEnabled) {
            return;
        }

        if (selectedMarkerID === '') {
            navigation.navigate('Search');
        } else {
            bottomSheetModalRef.current?.forceClose();
            setSearchButtonEnabled(false);
            setTimeout(() => {
                navigation.navigate('Search');
                setSelectedMarkerID('');
                setSearchButtonEnabled(true);
            }, 100);
        }
    };

    const shouldDisplayMarker = (marker: LocationData) => {
        return (
            selectedCategories.length === 0 ||
            (selectedCategories.length > 0 &&
                selectedCategories.includes(marker.category))
        );
    };

    return (
        <View style={styles.container}>
            <MapView
                followsUserLocation={followUserLocation}
                onMapReady={async () => await handleMapReady()}
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
                {Object.values(locationsData)
                    .filter(shouldDisplayMarker)
                    .map(location => (
                        <MapMarker
                            data={location}
                            coordinate={location.coordinate}
                            mapViewRef={mapViewRef}
                            bottomSheetModalRef={bottomSheetModalRef}
                            key={`marker_${location.id}`}
                            isSelected={selectedMarkerID === location.id}
                            selectMarker={setSelectedMarkerID}
                        />
                    ))}
                {sharedLocationCoordinates && (
                    <SharedLocationMarker
                        coordinate={sharedLocationCoordinates}
                        mapViewRef={mapViewRef}
                        bottomSheetModalRef={bottomSheetModalRef}
                        isSelected={selectedMarkerID === 'SHARED'}
                        selectMarker={() => setSelectedMarkerID('SHARED')}
                    />
                )}
                {privateEventDetails && (
                    <SharedLocationMarker
                        coordinate={privateEventDetails.coordinate}
                        mapViewRef={mapViewRef}
                        bottomSheetModalRef={bottomSheetModalRef}
                        isSelected={selectedMarkerID === 'PRIVATE_EVENT'}
                        selectMarker={() =>
                            setSelectedMarkerID('PRIVATE_EVENT')
                        }
                    />
                )}
            </MapView>
            <SafeAreaView style={styles.safeView}>
                <SearchBar
                    onMenuPress={handleSettingsPress}
                    onSearchPress={handleSearchPress}
                />
                <VerticalSpacer height={Constants.SPACING_UNIT_8} />
                <MapFilterButtonsRow
                    selectedCategories={selectedCategories}
                    setSelectedCategories={setSelectedCategories}
                />
            </SafeAreaView>

            <LocationDetails
                bottomSheetModalRef={bottomSheetModalRef}
                selectedLocationID={selectedMarkerID}
                locationCoordinates={sharedLocationCoordinates}
                privateEventDetails={privateEventDetails}
                onMenuPress={handleSettingsPress}
                onSearchPress={handleSearchPress}
            />
            <View style={styles.opacityOverlay}>
                <TouchableOpacity
                    activeOpacity={
                        Constants.TOUCHABLE_OPACITY_ACTIVE_OPACITY_SOFT
                    }
                    onPress={animateToUserRegion}
                    onLongPress={shareCurrentLocation}>
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
                                    : Colors.inactiveGray
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
    opacityOverlay: {
        position: 'absolute',
        bottom: Constants.SPACING_UNIT_10,
        right: Constants.SPACING_UNIT_10,
    },
    locationButton: {
        width: Constants.TAP_UNIT_MAP_ICONS,
        height: Constants.TAP_UNIT_MAP_ICONS,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Constants.BORDER_RADIUS_LARGE,
        borderColor: Colors.accentGreen,
        backgroundColor: Colors.bgWhite,
    },
    safeView: {
        position: 'absolute',
        top: 0,
    },
    locationIcon: {
        marginTop: 2,
        marginRight: 2,
        width: 22,
        height: 22,
    },
});
